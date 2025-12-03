package com.example.financetracker.exception;

public class AccountNotFoundException extends RuntimeException{
    public AccountNotFoundException(Long accountId){
        super("Could not find account with id: " + accountId);
    }
}
