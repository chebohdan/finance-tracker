package com.example.financetracker.repo;

import com.example.financetracker.model.UserAccount;
import com.example.financetracker.model.UserAccountId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, UserAccountId> {
}
