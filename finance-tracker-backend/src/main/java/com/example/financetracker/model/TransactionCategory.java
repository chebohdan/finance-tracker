package com.example.financetracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "transaction_category")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionCategory extends BaseEntity {
    @Column(name = "name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "transactionCategory")
    private List<Transaction> transactions;
}
