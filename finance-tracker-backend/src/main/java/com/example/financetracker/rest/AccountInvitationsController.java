package com.example.financetracker.rest;

import com.example.financetracker.dto.AccountInvitationRequest;
import com.example.financetracker.dto.AccountInvitationResponse;
import com.example.financetracker.dto.InvitationDecisionRequest;
import com.example.financetracker.model.EAccountInvitationStatus;
import com.example.financetracker.model.UserCredentials;
import com.example.financetracker.service.AccountInvitationsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/invitations")
@AllArgsConstructor
public class AccountInvitationsController {
    private final AccountInvitationsService accountInvitationsService;

    @GetMapping
    public ResponseEntity<Map<EAccountInvitationStatus, List<AccountInvitationResponse>>> getAccountInvitations(
            @AuthenticationPrincipal UserCredentials userCredentials,
            @RequestParam String type
    ) {
        Map<EAccountInvitationStatus, List<AccountInvitationResponse>> invitationsResponseMap = accountInvitationsService.getInvitations(userCredentials.getId(), type);
        return ResponseEntity.ok(invitationsResponseMap);
    }

    @PostMapping
    public ResponseEntity<AccountInvitationResponse> createAccountInvitation(
            @AuthenticationPrincipal UserCredentials userCredentials,
            @RequestBody AccountInvitationRequest accountInvitationRequest
    ) {
        AccountInvitationResponse accountInvitationResponse = accountInvitationsService.createInvitation(userCredentials.getId(), accountInvitationRequest);
        return ResponseEntity.ok(accountInvitationResponse);
    }

    @PatchMapping("/{invitationId}")
    public ResponseEntity<AccountInvitationResponse> acceptInvitation(
            @AuthenticationPrincipal UserCredentials userCredentials,
            @PathVariable Long invitationId,
            @RequestBody InvitationDecisionRequest invitationDecisionRequest
            ) {
        AccountInvitationResponse accountInvitationResponse = accountInvitationsService.respondToInvitation(invitationId,invitationDecisionRequest);
        return ResponseEntity.ok(accountInvitationResponse);
    }

}
