package com.example.financetracker.mapper;

import com.example.financetracker.dto.AccountInvitationResponse;
import com.example.financetracker.dto.UserResponse;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.AccountInvitation;
import com.example.financetracker.model.User;
import java.time.LocalDate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-03T10:58:38+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class AccountInvitationsMapperImpl implements AccountInvitationsMapper {

    @Override
    public AccountInvitationResponse toDto(AccountInvitation accountInvitation) {
        if ( accountInvitation == null ) {
            return null;
        }

        AccountInvitationResponse accountInvitationResponse = new AccountInvitationResponse();

        accountInvitationResponse.setAccountName( accountInvitationAccountName( accountInvitation ) );
        accountInvitationResponse.setAccountId( accountInvitationAccountId( accountInvitation ) );
        accountInvitationResponse.setId( accountInvitation.getId() );
        accountInvitationResponse.setInviter( userToUserResponse( accountInvitation.getInviter() ) );
        accountInvitationResponse.setInvitee( userToUserResponse( accountInvitation.getInvitee() ) );
        accountInvitationResponse.setStatus( accountInvitation.getStatus() );
        accountInvitationResponse.setRole( accountInvitation.getRole() );
        accountInvitationResponse.setCreatedAt( accountInvitation.getCreatedAt() );

        return accountInvitationResponse;
    }

    @Override
    public AccountInvitation toEntity(AccountInvitationResponse accountInvitationResponse) {
        if ( accountInvitationResponse == null ) {
            return null;
        }

        AccountInvitation accountInvitation = new AccountInvitation();

        accountInvitation.setId( accountInvitationResponse.getId() );
        accountInvitation.setInviter( userResponseToUser( accountInvitationResponse.getInviter() ) );
        accountInvitation.setInvitee( userResponseToUser( accountInvitationResponse.getInvitee() ) );
        accountInvitation.setStatus( accountInvitationResponse.getStatus() );
        accountInvitation.setRole( accountInvitationResponse.getRole() );
        accountInvitation.setCreatedAt( accountInvitationResponse.getCreatedAt() );

        return accountInvitation;
    }

    private String accountInvitationAccountName(AccountInvitation accountInvitation) {
        if ( accountInvitation == null ) {
            return null;
        }
        Account account = accountInvitation.getAccount();
        if ( account == null ) {
            return null;
        }
        String name = account.getName();
        if ( name == null ) {
            return null;
        }
        return name;
    }

    private Long accountInvitationAccountId(AccountInvitation accountInvitation) {
        if ( accountInvitation == null ) {
            return null;
        }
        Account account = accountInvitation.getAccount();
        if ( account == null ) {
            return null;
        }
        Long id = account.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected UserResponse userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String firstName = null;
        String lastName = null;
        String email = null;
        LocalDate birthday = null;

        id = user.getId();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        email = user.getEmail();
        birthday = user.getBirthday();

        UserResponse userResponse = new UserResponse( id, firstName, lastName, email, birthday );

        return userResponse;
    }

    protected User userResponseToUser(UserResponse userResponse) {
        if ( userResponse == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.firstName( userResponse.getFirstName() );
        user.lastName( userResponse.getLastName() );
        user.email( userResponse.getEmail() );
        user.birthday( userResponse.getBirthday() );

        return user.build();
    }
}
