package com.example.financetracker.specifictation;

import com.example.financetracker.model.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class AccountSpecifications {
    private AccountSpecifications() {
    }

    public static Specification<Account> byUserId(Long userId) {
        return ((root, query, cb) -> {
            Join<Account, UserAccount> accountUserJoin = root.join(Account_.USER_ACCOUNTS, JoinType.LEFT);
            return cb.or(
                    cb.equal(root.get(Account_.OWNER).get(User_.ID), userId),
                    cb.equal(accountUserJoin.get(UserAccount_.USER).get(User_.ID), userId)
            );
        });
    }
}
