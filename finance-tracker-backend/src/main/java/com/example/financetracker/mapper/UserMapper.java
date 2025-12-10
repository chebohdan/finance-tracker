package com.example.financetracker.mapper;

import com.example.financetracker.dto.UserAccountResponse;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.UserAccount;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "userAccountId.userId", target = "userId")
    @Mapping(source = "userAccountId.accountId", target = "accountId")
    @Mapping(source = "user.firstName", target = "firstName")
    @Mapping(source = "user.lastName", target = "lastName")
    @Mapping(source = "user.email", target = "email")
    UserAccountResponse toUserAccountResponse(UserAccount userAccount);
}
