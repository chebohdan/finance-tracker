package com.example.financetracker.specifictation;

import com.example.financetracker.model.Transaction;
import org.springframework.data.jpa.domain.Specification;

public class TransactionSpecifications {
    private TransactionSpecifications() {

    }

    public static Specification<Transaction> byAccountId(Long accountId){
        return (root, cq, cb) -> cb.equal(root.get("account").get("id"), accountId);
    }
}
