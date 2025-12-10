package com.example.financetracker.exception;

import com.example.financetracker.model.UserAccountId;
public class UserAccountNotFoundException extends RuntimeException {
    public UserAccountNotFoundException(Long userId, Long accountId) {
        super("Could not find UserAccount with userId="
                + userId
                + " and accountId="
                + accountId);
    }
}