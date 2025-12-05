package com.example.financetracker.mapper;

import com.example.financetracker.dto.TransactionRequest;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.dto.UserResponse;
import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionCategory;
import com.example.financetracker.model.User;
import java.time.LocalDate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-04T15:30:53+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class TransactionMapperImpl implements TransactionMapper {

    @Override
    public Transaction toEntity(TransactionRequest request) {
        if ( request == null ) {
            return null;
        }

        Transaction transaction = new Transaction();

        transaction.setName( request.getName() );
        transaction.setDescription( request.getDescription() );
        transaction.setAmount( request.getAmount() );
        transaction.setTransactionDate( request.getTransactionDate() );

        return transaction;
    }

    @Override
    public TransactionResponse toResponse(Transaction transaction) {
        if ( transaction == null ) {
            return null;
        }

        TransactionResponse transactionResponse = new TransactionResponse();

        transactionResponse.setCategoryName( transactionTransactionCategoryName( transaction ) );
        transactionResponse.setId( transaction.getId() );
        transactionResponse.setName( transaction.getName() );
        transactionResponse.setDescription( transaction.getDescription() );
        transactionResponse.setAmount( transaction.getAmount() );
        transactionResponse.setTransactionDate( transaction.getTransactionDate() );
        transactionResponse.setUser( userToUserResponse( transaction.getUser() ) );

        return transactionResponse;
    }

    private String transactionTransactionCategoryName(Transaction transaction) {
        if ( transaction == null ) {
            return null;
        }
        TransactionCategory transactionCategory = transaction.getTransactionCategory();
        if ( transactionCategory == null ) {
            return null;
        }
        String name = transactionCategory.getName();
        if ( name == null ) {
            return null;
        }
        return name;
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
}
