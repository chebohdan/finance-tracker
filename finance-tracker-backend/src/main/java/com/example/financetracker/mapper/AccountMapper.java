package com.example.financetracker.mapper;

import com.example.financetracker.dto.AccountRequest;
import com.example.financetracker.dto.AccountResponse;
import com.example.financetracker.model.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {TransactionMapper.class, UserMapper.class})
public interface AccountMapper {

    public AccountResponse toResponse(Account account);
    public Account toEntity(AccountRequest account);
}
