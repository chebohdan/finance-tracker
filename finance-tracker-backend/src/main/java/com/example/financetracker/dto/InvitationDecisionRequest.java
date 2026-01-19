package com.example.financetracker.dto;

import com.example.financetracker.model.EAccountInvitationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvitationDecisionRequest {
    private EAccountInvitationStatus status;
}
