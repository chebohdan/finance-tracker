package com.example.financetracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserAccount {
    @EmbeddedId
    private UserAccountId userAccountId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("accountId")
    private Account account;
}
