package com.example.financetracker.auth;

import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.model.Account;
import com.example.financetracker.repo.AccountRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountSecurity {
    private final AccountRepository accountRepository;
    private static final Logger log = LoggerFactory.getLogger(AccountSecurity.class);

    public boolean hasAccess(Long userId, Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        return account.getOwner().getId().equals(userId) ||
                account.getUserAccounts().stream()
                        .anyMatch(ua -> ua.getUser().getId().equals(userId));
    }

    public boolean isOwner(Long userId, Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        return account.getOwner().getId().equals(userId);
    }


}
