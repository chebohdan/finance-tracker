package com.example.financetracker.mapper;

import com.example.financetracker.dto.TransactionCategoryRequest;
import com.example.financetracker.dto.TransactionCategoryResponse;
import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionCategoryMapper {
    TransactionCategory toEntity(TransactionCategoryRequest transactionCategoryRequest);
    TransactionCategoryResponse toResponse(TransactionCategory transactionCategory);
}
