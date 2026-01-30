package com.example.financetracker.service;

import com.example.financetracker.dto.*;
import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.exception.CategoryNotFoundException;
import com.example.financetracker.exception.UserAccountNotFoundException;
import com.example.financetracker.mapper.TransactionCategoryMapper;
import com.example.financetracker.mapper.TransactionMapper;
import com.example.financetracker.model.*;
import com.example.financetracker.repo.*;
import com.example.financetracker.specifictation.TransactionCategorySpecifications;
import com.example.financetracker.specifictation.TransactionSpecifications;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service responsible for creating and managing financial transactions.
 * Handles category assignment (manual or AI-based), balance updates,
 * and persistence of transaction data.
 */
@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionCategorizationService categorizationService;

    private final TransactionRepository transactionRepository;
    private final UserAccountRepository userAccountRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;

    private final TransactionMapper transactionMapper;
    private final TransactionCategoryMapper transactionCategoryMapper;

    private static final Logger log = LoggerFactory.getLogger(TransactionService.class);

    /**
     * Creates a new transaction and updates the account balance.
     *
     * @param userId    the ID of the user creating the transaction
     * @param accountId account ID
     * @param request   the transaction details
     * @return the saved transaction as a response DTO
     */
    @Transactional
    public TransactionResponse createTransaction(Long userId, Long accountId, TransactionRequest request) {
        Transaction transaction = transactionMapper.toEntity(request);

        // Fetch user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found: userId={}", userId);
                    return new RuntimeException("User not found");
                });
        transaction.setUser(user);
        log.info("Creating transaction for user {}, name={}, amount={}", userId, user.getUserCredentials().getUsername(), request.getAmount());

        // Fetch account
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("Account not found: accountId={}", accountId);
                    return new RuntimeException("Account not found");
                });
        transaction.setAccount(account);

        // Fetch UserAccount to check auto-categorization for this user
        UserAccountId userAccountId = new UserAccountId();
        userAccountId.setUserId(userId);
        userAccountId.setAccountId(accountId);
        UserAccount userAccount = userAccountRepository.findById(userAccountId)
                .orElseThrow(() -> new UserAccountNotFoundException(userId, accountId));

        if (Boolean.TRUE.equals(userAccount.getAutoCategorization())) {
            log.info("Auto-categorization enabled for userId={} on accountId={}. Predicting category for '{}'",
                    userId, accountId, request.getName());
            try {
                CategoryPredictionResponse prediction =
                        categorizationService.predictCategory(request.getName());
                if (prediction != null && prediction.getCategoryName() != null && !prediction.getCategoryName().isBlank()) {
                    log.info("Predicted category '{}'", prediction.getCategoryName());
                    transaction.setTransactionCategory(
                            transactionCategoryRepository.findOne(
                                            TransactionCategorySpecifications.byCategoryNameAndAccountId(
                                                    prediction.getCategoryName(), account.getId()))
                                    .orElseGet(() -> {
                                        TransactionCategory transactionCategory = TransactionCategory.builder()
                                                .name(prediction.getCategoryName())
                                                .account(account)
                                                .build();
                                        return transactionCategoryRepository.save(transactionCategory);
                                    })
                    );
                }
            } catch (Exception e) {
                log.error("Auto-categorization failed: {}", e.getMessage());
            }
        } else if (request.getCategoryId() != null) {
            // Manual categorization
            TransactionCategory category = transactionCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> {
                        log.error("Category not found: categoryId={}", request.getCategoryId());
                        return new CategoryNotFoundException(request.getCategoryId());
                    });
            transaction.setTransactionCategory(category);
        }

        // Update account balance
        account.setBalance(account.getBalance().add(transaction.getAmount()));
        Transaction savedTransaction = transactionRepository.save(transaction);

        log.debug("Updated account balance for accountId={} -> newBalance={}", account.getId(), account.getBalance());

        return transactionMapper.toResponse(savedTransaction);
    }

    @Transactional
    public TransactionCategoryResponse createTransactionCategory(
            Long accountId,
            TransactionCategoryRequest transactionCategoryRequest
    ) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        // Optional: check for duplicate category name in this account
        boolean exists = account.getTransactionCategories().stream()
                .anyMatch(c -> c.getName().equalsIgnoreCase(transactionCategoryRequest.getName()));
        if (exists) {
            throw new IllegalArgumentException(
                    "Category with name '" + transactionCategoryRequest.getName() + "' already exists in this account"
            );
        }

        TransactionCategory category = new TransactionCategory();
        category.setName(transactionCategoryRequest.getName());
        category.setAccount(account);

        TransactionCategory saved = transactionCategoryRepository.save(category);

        return transactionCategoryMapper.toResponse(saved);
    }

    public Page<TransactionResponse> getTransactionsByAccountId(Long accountId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Transaction> transactions = transactionRepository.findAll(TransactionSpecifications.byAccountId(accountId), pageable);
        return transactions.map(transactionMapper::toResponse);
    }
}
