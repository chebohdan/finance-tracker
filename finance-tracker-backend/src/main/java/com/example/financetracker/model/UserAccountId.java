package com.example.financetracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserAccountId {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "account_id")
    private String accountId;
}
