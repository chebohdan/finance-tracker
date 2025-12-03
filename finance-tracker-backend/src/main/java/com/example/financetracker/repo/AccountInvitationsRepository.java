package com.example.financetracker.repo;

import com.example.financetracker.model.AccountInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AccountInvitationsRepository extends JpaRepository<AccountInvitation, Long>, JpaSpecificationExecutor<AccountInvitation> {
}
