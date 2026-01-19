package com.example.financetracker.exception;

public class AccountInvitationNotFoundException extends RuntimeException{
    public AccountInvitationNotFoundException(Long invitationId){
        super("Could not find account invitation with id: " + invitationId);
    }

}
