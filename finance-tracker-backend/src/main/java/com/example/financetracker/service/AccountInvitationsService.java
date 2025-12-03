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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AccountInvitationsService {
    private final AccountInvitationsRepository accountInvitationsRepository;
    private final AccountRepository accountRepository;
    private final AccountInvitationsMapper accountInvitationsMapper;
    private final UserRepository userRepository;
    private final NotificationService notificationService;


    public Map<EAccountInvitationStatus, List<AccountInvitationResponse>> getInvitations(Long userId, String type) {

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

        return accountInvitationsResponses
                .stream()
                .collect(Collectors.groupingBy(AccountInvitationResponse::getStatus));
    }

    //TODO add access validation
    public AccountInvitationResponse createInvitation(Long userId, AccountInvitationRequest accountInvitationRequest) {
        User inviter = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        User invitee = userRepository.findByUsername(accountInvitationRequest.getInviteeUsername())
                .orElseThrow(() -> new UserNotFoundException(accountInvitationRequest.getInviteeUsername()));

        Account account = accountRepository.findById(accountInvitationRequest.getAccountId())
                .orElseThrow(() -> new AccountNotFoundException(accountInvitationRequest.getAccountId()));

        AccountInvitation accountInvitation = new AccountInvitation();
        accountInvitation.setInviter(inviter);
        accountInvitation.setInvitee(invitee);
        accountInvitation.setAccount(account);
        accountInvitation.setRole(accountInvitationRequest.getRole());
        accountInvitation.setStatus(EAccountInvitationStatus.PENDING);
        accountInvitation.setCreatedAt(LocalDateTime.now());

        AccountInvitation savedInvitation = accountInvitationsRepository.save(accountInvitation);

        notificationService.sendInvitationNotification(inviter, invitee, account.getName());

        return accountInvitationsMapper.toDto(savedInvitation);
    }
}
