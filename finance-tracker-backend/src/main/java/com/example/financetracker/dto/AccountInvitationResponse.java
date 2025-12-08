package com.example.financetracker.dto;

import com.example.financetracker.model.EAccountInvitationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountInvitationResponse {
    private Long id;
    private UserResponse inviter;
    private UserResponse invitee;
    private EAccountInvitationStatus status;
    private String accountName;
    private Long accountId;
    private LocalDateTime createdAt;
}
