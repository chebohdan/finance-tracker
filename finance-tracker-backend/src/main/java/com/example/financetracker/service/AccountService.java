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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final UserRepository userRepository;

    public List<AccountResponse> getUsersAccounts(Long userId) {
        List<Account> accounts = accountRepository.findAll(AccountSpecifications.byUserId(userId));
        return accounts.stream().map(accountMapper::toResponse).toList();
    }

    public AccountResponse getAccountById(Long userId, Long accountId) {
        Account account = accountRepository.findById(accountId).orElseThrow(()-> new AccountNotFoundException(accountId));
        if(!account.getOwner().getId().equals(userId)){
            throw new AccessDeniedException("Access denied");
        }
        boolean allowed = account.getUserAccounts()
                .stream()
                .anyMatch(u -> u.getUser().getId().equals(userId));
        if(!allowed){
            throw new AccessDeniedException("Access denied");
        }
        return accountMapper.toResponse(account);
    }

    public AccountResponse createAccount(Long userId, AccountRequest accountRequest) {
        Account account = accountMapper.toEntity(accountRequest);
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException(userId));
        account.setOwner(user);
        account.setAutoCategorization(true);
        Account createdAccount = accountRepository.save(account);
        return accountMapper.toResponse(createdAccount);
    }

    @Transactional
    public AutoCategorizationUpdateResponse updateAutoCategorization(Long userId, Long accountId, AutoCategorizationUpdateRequest autoCategorizationUpdateRequest) {
        Account account = accountRepository.findById(accountId).orElseThrow(()-> new AccountNotFoundException(accountId));
        boolean allowed = account.getUserAccounts().stream().anyMatch(u -> u.getUser().getId().equals(userId));
        if(!account.getOwner().getId().equals(userId) && !allowed){
            throw new AccessDeniedException("Access denied");
        }
        account.setAutoCategorization(autoCategorizationUpdateRequest.getAutoCategorization());
        int updatedRows = accountRepository.updateAutoCategorization(account.getId(), autoCategorizationUpdateRequest.getAutoCategorization());
        if(updatedRows == 0){
            throw new RuntimeException("Update failed");
        }
        return new AutoCategorizationUpdateResponse(autoCategorizationUpdateRequest.getAutoCategorization());
    }
}
