package com.example.financetracker.service;

import com.example.financetracker.dto.AccountInvitationRequest;
import com.example.financetracker.dto.AccountInvitationResponse;
import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.exception.UserNotFoundException;
import com.example.financetracker.mapper.AccountInvitationsMapper;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.AccountInvitation;
import com.example.financetracker.model.EAccountInvitationStatus;
import com.example.financetracker.model.User;
import com.example.financetracker.repo.AccountInvitationsRepository;
import com.example.financetracker.repo.AccountRepository;
import com.example.financetracker.repo.UserRepository;
import com.example.financetracker.specifictation.AccountInvitationSpecifications;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for managing account invitations.
 */
@Service
@AllArgsConstructor
public class AccountInvitationsService {

    private static final Logger log = LoggerFactory.getLogger(AccountInvitationsService.class);

    private final AccountInvitationsRepository accountInvitationsRepository;
    private final AccountRepository accountRepository;
    private final AccountInvitationsMapper accountInvitationsMapper;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    /**
     * Retrieves account invitations for a user, grouped by their status.
     *
     * @param userId the ID of the user
     * @param type   the type of invitations: "incoming" or "outgoing"
     * @return a map of invitation status to list of invitations
     */
    public Map<EAccountInvitationStatus, List<AccountInvitationResponse>> getInvitations(Long userId, String type) {
        log.info("Fetching {} invitations for userId={}", type, userId);

        Specification<AccountInvitation> specification = (root, query, cb) -> null;

        if ("incoming".equals(type)) {
            specification = specification.and(AccountInvitationSpecifications.inviteeIdEquals(userId));
        } else if ("outgoing".equals(type)) {
            specification = specification.and(AccountInvitationSpecifications.inviterIdEquals(userId));
        }

        List<AccountInvitationResponse> accountInvitationsResponses = accountInvitationsRepository.findAll(specification)
                .stream()
                .map(accountInvitationsMapper::toDto)
                .toList();

        log.debug("Found {} invitations for userId={}", accountInvitationsResponses.size(), userId);

        return accountInvitationsResponses
                .stream()
                .collect(Collectors.groupingBy(AccountInvitationResponse::getStatus));
    }

    /**
     * Creates a new account invitation.
     *
     * @param userId                   the ID of the user sending the invitation
     * @param accountInvitationRequest the request containing invitee, account, and role
     * @return the created account invitation as a response DTO
     * @throws UserNotFoundException    if the inviter or invitee does not exist
     * @throws AccountNotFoundException if the specified account does not exist
     */
    public AccountInvitationResponse createInvitation(Long userId, AccountInvitationRequest accountInvitationRequest) {
        log.info("Creating invitation from userId={} to invitee='{}' for accountId={}",
                userId, accountInvitationRequest.getInviteeUsername(), accountInvitationRequest.getAccountId());

        User inviter = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("Inviter not found: userId={}", userId);
                    return new UserNotFoundException(userId);
                });

        User invitee = userRepository.findByUsername(accountInvitationRequest.getInviteeUsername())
                .orElseThrow(() -> {
                    log.error("Invitee not found: username={}", accountInvitationRequest.getInviteeUsername());
                    return new UserNotFoundException(accountInvitationRequest.getInviteeUsername());
                });

        Account account = accountRepository.findById(accountInvitationRequest.getAccountId())
                .orElseThrow(() -> {
                    log.error("Account not found: accountId={}", accountInvitationRequest.getAccountId());
                    return new AccountNotFoundException(accountInvitationRequest.getAccountId());
                });

        AccountInvitation accountInvitation = new AccountInvitation();
        accountInvitation.setInviter(inviter);
        accountInvitation.setInvitee(invitee);
        accountInvitation.setAccount(account);
        accountInvitation.setStatus(EAccountInvitationStatus.PENDING);
        accountInvitation.setCreatedAt(LocalDateTime.now());

        AccountInvitation savedInvitation = accountInvitationsRepository.save(accountInvitation);

        log.info("Invitation created: id={} from userId={} to inviteeId={}",
                savedInvitation.getId(), userId, invitee.getId());

        notificationService.sendInvitationNotification(inviter, invitee, account.getName());

        return accountInvitationsMapper.toDto(savedInvitation);
    }
}
