package com.example.financetracker.specifictation;

import com.example.financetracker.model.TransactionCategory;
import org.springframework.data.jpa.domain.Specification;

public class TransactionCategorySpecifications {

    private TransactionCategorySpecifications(){
        throw new IllegalStateException("Utility class");
    }

    public static Specification<TransactionCategory> byCategoryNameAndAccountId(String categoryName, Long accountId) {
        return (root, criteriaQuery, cb) -> cb.and(
                cb.equal(root.get("name"), categoryName),
                cb.equal(root.get("account").get("id"), accountId)
        );
    }
}
