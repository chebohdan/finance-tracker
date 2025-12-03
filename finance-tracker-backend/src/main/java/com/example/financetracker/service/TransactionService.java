package com.example.financetracker.service;

import com.example.financetracker.dto.CategoryPredictionResponse;
import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
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
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionCategorizationService categorizationService;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;
    private final TransactionMapper transactionMapper;


    public TransactionResponse createTransaction(TransactionRequest request, Long userId) {
        Transaction transaction = transactionMapper.toEntity(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        transaction.setUser(user);
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Auto-categorization is enabled
        if (Boolean.TRUE.equals(account.getAutoCategorization())) {
            try {
                CategoryPredictionResponse prediction =
                        categorizationService.predictCategory(request.getName());

                if (prediction != null && prediction.getCategoryName() != null && !prediction.getCategoryName().isBlank()) {
                    transaction.setTransactionCategory(
                            transactionCategoryRepository.findOne(TransactionCategorySpecifications.byCategoryNameAndUserId(prediction.getCategoryName(), account.getId()))
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
                System.err.println("Auto-categorization failed: " + e.getMessage());
            }
            // Manual categorization
        } else if (request.getCategoryId() != null) {
            transaction.setTransactionCategory(
                    transactionCategoryRepository.findById(request.getCategoryId())
                            .orElseThrow(() -> new RuntimeException("Category not found"))
            );
        }
        Transaction savedTransaction = transactionRepository.save(transaction);
        return transactionMapper.toResponse(savedTransaction);
    }
}
