package com.example.financetracker.mapper;

import com.example.financetracker.dto.AccountInvitationResponse;
import com.example.financetracker.model.AccountInvitation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AccountInvitationsMapper {
    @Mapping(source = "account.name", target = "accountName")
    @Mapping(source = "account.id", target = "accountId")
    AccountInvitationResponse toDto(AccountInvitation accountInvitation);

    AccountInvitation toEntity(AccountInvitationResponse accountInvitationResponse);
}
