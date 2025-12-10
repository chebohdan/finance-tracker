package com.example.financetracker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class UserAccountId {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "account_id")
    private Long accountId;
}
