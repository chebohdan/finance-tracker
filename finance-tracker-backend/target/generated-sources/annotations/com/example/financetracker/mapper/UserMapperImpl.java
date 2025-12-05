package com.example.financetracker.mapper;

import com.example.financetracker.dto.UserAccountResponse;
import com.example.financetracker.model.User;
import com.example.financetracker.model.UserAccount;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-04T15:30:54+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserAccountResponse toUserAccountResponse(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }

        UserAccountResponse userAccountResponse = new UserAccountResponse();

        userAccountResponse.setId( userAccountUserId( userAccount ) );
        userAccountResponse.setFirstName( userAccountUserFirstName( userAccount ) );
        userAccountResponse.setLastName( userAccountUserLastName( userAccount ) );
        userAccountResponse.setEmail( userAccountUserEmail( userAccount ) );
        userAccountResponse.setAccountRole( userAccount.getAccountRole() );

        return userAccountResponse;
    }

    private Long userAccountUserId(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }
        User user = userAccount.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String userAccountUserFirstName(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }
        User user = userAccount.getUser();
        if ( user == null ) {
            return null;
        }
        String firstName = user.getFirstName();
        if ( firstName == null ) {
            return null;
        }
        return firstName;
    }

    private String userAccountUserLastName(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }
        User user = userAccount.getUser();
        if ( user == null ) {
            return null;
        }
        String lastName = user.getLastName();
        if ( lastName == null ) {
            return null;
        }
        return lastName;
    }

    private String userAccountUserEmail(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }
        User user = userAccount.getUser();
        if ( user == null ) {
            return null;
        }
        String email = user.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }
}
