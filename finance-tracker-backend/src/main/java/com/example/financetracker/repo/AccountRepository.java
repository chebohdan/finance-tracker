package com.example.financetracker.repo;

import com.example.financetracker.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {
    @Modifying
    @Query("UPDATE Account a SET a.autoCategorization = :enabled WHERE a.id = :id")
    int updateAutoCategorization(@Param("id") Long id, @Param("enabled") boolean enabled);


}
