package com.example.financetracker.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long categoryId){
        super("Could not find category with id: " + categoryId);
    }
}
