package com.example.financetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountResponse {
    private Long id;
    private String name;
    private BigDecimal balance;
    private Boolean autoCategorization;
    private List<TransactionResponse> transactions;
    private List<TransactionCategoryResponse> transactionCategories;
    private List<UserAccountResponse> userAccounts;
}
