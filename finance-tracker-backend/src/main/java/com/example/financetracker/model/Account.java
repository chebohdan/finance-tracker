package com.example.financetracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account extends BaseEntity {

    @NotNull
    @NotEmpty
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @NotNull
    @Min(0)
    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;

    @OneToMany(mappedBy = "account")
    private List<TransactionCategory> transactionCategories;

    @OneToMany(mappedBy = "account")
    private List<AccountInvitation> invitations;

    @OneToMany(mappedBy = "account", cascade =  CascadeType.ALL)
    private List<UserAccount> userAccounts;
}
