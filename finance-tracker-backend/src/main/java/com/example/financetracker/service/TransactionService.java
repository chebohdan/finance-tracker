package com.example.financetracker.service;

import com.example.financetracker.dto.CategoryPredictionResponse;
import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.exception.CategoryNotFoundException;
import com.example.financetracker.mapper.TransactionMapper;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionCategory;
import com.example.financetracker.model.User;
import com.example.financetracker.repo.AccountRepository;
import com.example.financetracker.repo.TransactionCategoryRepository;
import com.example.financetracker.repo.TransactionRepository;
import com.example.financetracker.repo.UserRepository;
import com.example.financetracker.specifictation.TransactionCategorySpecifications;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;

    private final TransactionMapper transactionMapper;

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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found: userId={}", userId);
                    return new RuntimeException("User not found");
                });
        log.info("Creating transaction for user {}, name={}, amount={}", userId, user.getUserCredentials().getUsername(), request.getAmount());
        transaction.setUser(user);
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> {
                    log.error("Account not found: accountId={}",accountId);
                    return new RuntimeException("User not found");
                });

        if (Boolean.TRUE.equals(account.getAutoCategorization())) {
            log.info("Auto-categorization enabled. Predicting category for '{}'", request.getName());
            try {
                CategoryPredictionResponse prediction =
                        categorizationService.predictCategory(request.getName());
                if (prediction != null && prediction.getCategoryName() != null && !prediction.getCategoryName().isBlank()) {
                    log.info("Predicted category '{}'", prediction.getCategoryName());
                    transaction.setTransactionCategory(
                            transactionCategoryRepository.findOne(TransactionCategorySpecifications.byCategoryNameAndAccountId(prediction.getCategoryName(), account.getId()))
                                    .orElseGet(() -> {
                                        TransactionCategory transactionCategory = TransactionCategory
                                                .builder()
                                                .name(prediction.getCategoryName())
                                                .account(account)
                                                .build();
                                        return transactionCategoryRepository.save(transactionCategory);
                                    })
                    );
                }
            } catch (Exception e) {
                // AI Service Failure
                log.error("Auto-categorization failed: {}", e.getMessage());
            }
            // Manual categorization
        } else if (request.getCategoryId() != null) {
            TransactionCategory category = transactionCategoryRepository
                    .findById(request.getCategoryId())
                    .orElseThrow(() -> {
                        log.error("Category not found: categoryId={}", request.getCategoryId());
                        return new CategoryNotFoundException(request.getCategoryId());
                    });
            transaction.setTransactionCategory(category);
        }
        Transaction savedTransaction = transactionRepository.save(transaction);
        account.setBalance(account.getBalance().add(transaction.getAmount()));
        log.debug("Updated account balance for accountId={} -> newBalance={}",
                account.getId(), account.getBalance());
        return transactionMapper.toResponse(savedTransaction);
    }
}
