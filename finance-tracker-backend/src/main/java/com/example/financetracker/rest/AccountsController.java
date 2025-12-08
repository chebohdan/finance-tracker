package com.example.financetracker.rest;

import com.example.financetracker.dto.*;
import com.example.financetracker.model.UserCredentials;
import com.example.financetracker.service.AccountService;
import com.example.financetracker.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@AllArgsConstructor
public class AccountsController {

    private final AccountService accountService;
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getUsersAccounts(@AuthenticationPrincipal UserCredentials userCredentials) {
        List<AccountResponse> accountResponse = accountService.getUsersAccounts(userCredentials.getId());
        return ResponseEntity.ok(accountResponse);
    }

    @GetMapping("/{accountId}")
    @PreAuthorize("@accountSecurity.hasAccess(#userCredentials.id, #accountId)")
    public ResponseEntity<AccountResponse> getAccountById(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long accountId) {
        AccountResponse accountResponse = accountService.getAccountById(accountId);
        return ResponseEntity.ok(accountResponse);
    }

    @PostMapping()
    public ResponseEntity<AccountResponse> createAccount(@AuthenticationPrincipal UserCredentials userCredentials, @RequestBody AccountRequest accountRequest) {
        AccountResponse accountResponse = accountService.createAccount(userCredentials.getId(), accountRequest);
        return ResponseEntity.ok(accountResponse);
    }

    @PatchMapping("/{accountId}/auto-categorization")
    @PreAuthorize("@accountSecurity.hasAccess(#userCredentials.id, #accountId)")
    public ResponseEntity<AutoCategorizationUpdateResponse> updateAutoCategorization(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long accountId, @RequestBody AutoCategorizationUpdateRequest autoCategorizationUpdateRequest) {
        AutoCategorizationUpdateResponse autoCategorizationUpdateResponse = accountService.updateAutoCategorization(accountId, autoCategorizationUpdateRequest);
        return ResponseEntity.ok(autoCategorizationUpdateResponse);
    }

    @PostMapping("/{accountId}/transactions")
    @PreAuthorize("@accountSecurity.hasAccess(#userCredentials.id, #accountId)")
    public ResponseEntity<TransactionResponse> createTransaction(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long accountId,  @RequestBody TransactionRequest transactionRequest) {
        TransactionResponse transactionResponse = transactionService.createTransaction(userCredentials.getId(), accountId, transactionRequest);
        return ResponseEntity.ok(transactionResponse);
    }

    @DeleteMapping ("/{accountId}")
    @PreAuthorize("@accountSecurity.isOwner(#userCredentials.id, #accountId)")
    public ResponseEntity<Void> deleteAccount(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.noContent().build();
    }
}
