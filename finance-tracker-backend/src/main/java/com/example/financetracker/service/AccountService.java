package com.example.financetracker.service;

import com.example.financetracker.dto.AccountRequest;
import com.example.financetracker.dto.AccountResponse;
import com.example.financetracker.dto.AutoCategorizationUpdateRequest;
import com.example.financetracker.dto.AutoCategorizationUpdateResponse;
import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.exception.UserNotFoundException;
import com.example.financetracker.mapper.AccountMapper;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.User;
import com.example.financetracker.repo.AccountRepository;
import com.example.financetracker.repo.UserRepository;
import com.example.financetracker.specifictation.AccountSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for managing user accounts.
 */
@Service
@RequiredArgsConstructor
public class AccountService {

    private static final Logger log = LoggerFactory.getLogger(AccountService.class);

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final UserRepository userRepository;

    /**
     * Retrieves all accounts belonging to a specific user.
     *
     * @param userId the ID of the user
     * @return a list of account response DTOs
     */
    public List<AccountResponse> getUsersAccounts(Long userId) {
        log.info("Fetching accounts for userId={}", userId);
        List<Account> accounts = accountRepository.findAll(AccountSpecifications.byUserId(userId));
        return accounts.stream().map(accountMapper::toResponse).toList();
    }

    /**
     * Retrieves a single account by its ID
     *
     * @param userId    the ID of the user
     * @param accountId the ID of the account
     * @return the account response DTO
     * @throws AccessDeniedException    if the user does not have access
     * @throws AccountNotFoundException if the account does not exist
     */
    public AccountResponse getAccountById(Long userId, Long accountId) {
        log.info("Fetching accountId={} for userId={}", accountId, userId);
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));
        return accountMapper.toResponse(account);
    }

    /**
     * Creates a new account for a user.
     *
     * @param userId         the ID of the user
     * @param accountRequest the account request DTO
     * @return the created account response DTO
     * @throws UserNotFoundException if the user does not exist
     */
    public AccountResponse createAccount(Long userId, AccountRequest accountRequest) {
        log.info("Creating new account for userId={}", userId);
        Account account = accountMapper.toEntity(accountRequest);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        account.setOwner(user);
        account.setAutoCategorization(true);

        Account createdAccount = accountRepository.save(account);
        log.info("Account created with id={} for userId={}", createdAccount.getId(), userId);

        return accountMapper.toResponse(createdAccount);
    }

    /**
     * Updates the auto-categorization setting of an account.
     *
     * @param userId                          the ID of the user performing the update
     * @param accountId                       the ID of the account to update
     * @param autoCategorizationUpdateRequest the request containing the new setting
     * @return the response DTO with the updated setting
     * @throws AccessDeniedException    if the user does not have permission
     * @throws AccountNotFoundException if the account does not exist
     * @throws RuntimeException         if the update fails
     */
    @Transactional
    public AutoCategorizationUpdateResponse updateAutoCategorization(
            Long userId,
            Long accountId,
            AutoCategorizationUpdateRequest autoCategorizationUpdateRequest
    ) {
        log.info("Updating auto-categorization for accountId={} by userId={}", accountId, userId);

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        account.setAutoCategorization(autoCategorizationUpdateRequest.getAutoCategorization());

        int updatedRows = accountRepository.updateAutoCategorization(
                account.getId(),
                autoCategorizationUpdateRequest.getAutoCategorization()
        );

        if (updatedRows == 0) {
            log.error("Failed to update auto-categorization for accountId={}", accountId);
            throw new RuntimeException("Update failed");
        }

        log.info("Auto-categorization updated for accountId={} to {}", accountId, autoCategorizationUpdateRequest.getAutoCategorization());
        return new AutoCategorizationUpdateResponse(autoCategorizationUpdateRequest.getAutoCategorization());
    }
}
