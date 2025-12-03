package com.example.financetracker.rest;

import com.example.financetracker.dto.*;
import com.example.financetracker.model.EAccountInvitationStatus;
import com.example.financetracker.model.UserCredentials;
import com.example.financetracker.service.AccountInvitationsService;
import com.example.financetracker.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@AllArgsConstructor
public class AccountsController {

    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getUsersAccounts(@AuthenticationPrincipal UserCredentials userCredentials) {
        List<AccountResponse> accountResponse = accountService.getUsersAccounts(userCredentials.getId());
        return ResponseEntity.ok(accountResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccountById(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long id) {
        AccountResponse accountResponse = accountService.getAccountById(userCredentials.getId(), id);
        return ResponseEntity.ok(accountResponse);
    }

    @PostMapping()
    public ResponseEntity<AccountResponse> createAccount(@AuthenticationPrincipal UserCredentials userCredentials, @RequestBody AccountRequest accountRequest) {
        AccountResponse accountResponse = accountService.createAccount(userCredentials.getId(), accountRequest);
        return ResponseEntity.ok(accountResponse);
    }

    @PatchMapping("/{id}/auto-categorization")
    public ResponseEntity<AutoCategorizationUpdateResponse> updateAutoCategorization(@AuthenticationPrincipal UserCredentials userCredentials, @PathVariable Long id, @RequestBody AutoCategorizationUpdateRequest autoCategorizationUpdateRequest) {
        AutoCategorizationUpdateResponse autoCategorizationUpdateResponse = accountService.updateAutoCategorization(userCredentials.getId(), id, autoCategorizationUpdateRequest);
        return ResponseEntity.ok(autoCategorizationUpdateResponse);
    }
}
