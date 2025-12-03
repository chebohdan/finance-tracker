package com.example.financetracker.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long userId) {
        super("Could not find a User with id: " + userId);
    }

    public UserNotFoundException(String inviteeUsername) {
        super("Could not find a User with name: " + inviteeUsername);

    }
}
