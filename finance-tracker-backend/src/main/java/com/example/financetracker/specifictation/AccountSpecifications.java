package com.example.financetracker.specifictation;

import com.example.financetracker.model.Account;
import com.example.financetracker.model.Account_;
import com.example.financetracker.model.User_;
import org.springframework.data.jpa.domain.Specification;

public class AccountSpecifications {
    private AccountSpecifications() {
    }

    public static Specification<Account> byUserId(Long userId) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(
                root.get(Account_.owner).get(User_.id), userId));
    }
}
