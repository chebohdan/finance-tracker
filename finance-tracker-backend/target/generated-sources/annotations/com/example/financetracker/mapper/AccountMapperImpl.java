package com.example.financetracker.mapper;

import com.example.financetracker.dto.AccountRequest;
import com.example.financetracker.dto.AccountResponse;
import com.example.financetracker.dto.TransactionCategoryResponse;
import com.example.financetracker.dto.TransactionResponse;
import com.example.financetracker.dto.UserAccountResponse;
import com.example.financetracker.model.Account;
import com.example.financetracker.model.Transaction;
import com.example.financetracker.model.TransactionCategory;
import com.example.financetracker.model.UserAccount;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-04T15:30:53+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.2 (Amazon.com Inc.)"
)
@Component
public class AccountMapperImpl implements AccountMapper {

    @Autowired
    private TransactionMapper transactionMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public AccountResponse toResponse(Account account) {
        if ( account == null ) {
            return null;
        }

        AccountResponse accountResponse = new AccountResponse();

        accountResponse.setId( account.getId() );
        accountResponse.setName( account.getName() );
        accountResponse.setBalance( account.getBalance() );
        accountResponse.setAutoCategorization( account.getAutoCategorization() );
        accountResponse.setTransactions( transactionListToTransactionResponseList( account.getTransactions() ) );
        accountResponse.setTransactionCategories( transactionCategoryListToTransactionCategoryResponseList( account.getTransactionCategories() ) );
        accountResponse.setUserAccounts( userAccountListToUserAccountResponseList( account.getUserAccounts() ) );

        return accountResponse;
    }

    @Override
    public Account toEntity(AccountRequest account) {
        if ( account == null ) {
            return null;
        }

        Account account1 = new Account();

        account1.setName( account.getName() );
        account1.setBalance( account.getBalance() );

        return account1;
    }

    protected List<TransactionResponse> transactionListToTransactionResponseList(List<Transaction> list) {
        if ( list == null ) {
            return null;
        }

        List<TransactionResponse> list1 = new ArrayList<TransactionResponse>( list.size() );
        for ( Transaction transaction : list ) {
            list1.add( transactionMapper.toResponse( transaction ) );
        }

        return list1;
    }

    protected TransactionCategoryResponse transactionCategoryToTransactionCategoryResponse(TransactionCategory transactionCategory) {
        if ( transactionCategory == null ) {
            return null;
        }

        String id = null;
        String name = null;

        if ( transactionCategory.getId() != null ) {
            id = String.valueOf( transactionCategory.getId() );
        }
        name = transactionCategory.getName();

        TransactionCategoryResponse transactionCategoryResponse = new TransactionCategoryResponse( id, name );

        return transactionCategoryResponse;
    }

    protected List<TransactionCategoryResponse> transactionCategoryListToTransactionCategoryResponseList(List<TransactionCategory> list) {
        if ( list == null ) {
            return null;
        }

        List<TransactionCategoryResponse> list1 = new ArrayList<TransactionCategoryResponse>( list.size() );
        for ( TransactionCategory transactionCategory : list ) {
            list1.add( transactionCategoryToTransactionCategoryResponse( transactionCategory ) );
        }

        return list1;
    }

    protected List<UserAccountResponse> userAccountListToUserAccountResponseList(List<UserAccount> list) {
        if ( list == null ) {
            return null;
        }

        List<UserAccountResponse> list1 = new ArrayList<UserAccountResponse>( list.size() );
        for ( UserAccount userAccount : list ) {
            list1.add( userMapper.toUserAccountResponse( userAccount ) );
        }

        return list1;
    }
}
