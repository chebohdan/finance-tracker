package com.example.financetracker.auth;

import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.EAccountRole;
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

    public boolean canView(Long authUserId, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new AccountNotFoundException(accountId));

        if (authUserId.equals(account.getOwner().getId())) {
            return true;
        }
        boolean hasViewPermission  = account.getUserAccounts().stream().anyMatch(
                ua -> authUserId.equals(ua.getUser().getId()) && (EAccountRole.EDITOR.equals(ua.getAccountRole()) || EAccountRole.VIEWER.equals(ua.getAccountRole())));
        if (!hasViewPermission) {
            log.warn("View denied for userId={} on accountId={}", authUserId, accountId);
        }
        return hasViewPermission;
    }

    public boolean canEdit(Long authUserId, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(() -> new AccountNotFoundException(accountId));

        if (authUserId.equals(account.getOwner().getId())) {
            return true;
        }
        boolean hasEditPermission = account.getUserAccounts().stream().anyMatch(
                ua -> authUserId.equals(ua.getUser().getId()) && EAccountRole.EDITOR.equals(ua.getAccountRole()));
        if (!hasEditPermission) {
            log.warn("Edit denied for userId={} on accountId={}", authUserId, accountId);
        }
        return hasEditPermission;
    }
}
