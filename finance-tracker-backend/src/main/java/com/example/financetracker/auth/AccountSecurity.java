package com.example.financetracker.auth;

import com.example.financetracker.exception.AccountNotFoundException;
import com.example.financetracker.exception.UserAccountNotFoundException;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.EUserAccountRole;
import com.example.financetracker.model.UserAccount;
import com.example.financetracker.model.UserAccountId;
import com.example.financetracker.repo.AccountRepository;
import com.example.financetracker.repo.UserAccountRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountSecurity {
    private final AccountRepository accountRepository;
    private final UserAccountRepository userAccountRepository; // needed for direct lookup
    private static final Logger log = LoggerFactory.getLogger(AccountSecurity.class);

    public boolean hasAccess(Long userId, Long accountId) {
        UserAccountId uaId = new UserAccountId(userId, accountId);
        return userAccountRepository.findById(uaId).isPresent();
    }

    public boolean isOwner(Long userId, Long accountId) {
        UserAccountId uaId = new UserAccountId(userId, accountId);
        return userAccountRepository.findById(uaId)
                .map(ua -> ua.getRole() == EUserAccountRole.OWNER)
                .orElse(false);
    }


}
