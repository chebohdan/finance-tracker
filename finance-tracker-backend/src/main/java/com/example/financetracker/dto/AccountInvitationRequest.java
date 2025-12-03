package com.example.financetracker.dto;

import com.example.financetracker.model.EAccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountInvitationRequest {
    private String inviteeUsername;
    private EAccountRole  role;
    private Long accountId;
}
