package com.example.financetracker.repo;

import com.example.financetracker.model.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, Long>, JpaSpecificationExecutor<TransactionCategory> {

}
