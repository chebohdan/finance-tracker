package com.example.financetracker.mapper;

import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.model.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    public Transaction toEntity(TransactionRequest request);

    @Mapping(source = "transactionCategory.name", target = "categoryName")
    @Mapping(source = "transactionCategory.id", target = "categoryId")
    public TransactionResponse toResponse(Transaction transaction);
}
