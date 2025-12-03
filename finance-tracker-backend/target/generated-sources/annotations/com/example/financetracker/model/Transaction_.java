package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;
import java.time.LocalDate;

@StaticMetamodel(Transaction.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Transaction_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String AMOUNT = "amount";
	public static final String NAME = "name";
	public static final String TRANSACTION_CATEGORY = "transactionCategory";
	public static final String DESCRIPTION = "description";
	public static final String TRANSACTION_DATE = "transactionDate";
	public static final String USER = "user";
	public static final String ACCOUNT = "account";

	
	/**
	 * @see com.example.financetracker.model.Transaction#amount
	 **/
	public static volatile SingularAttribute<Transaction, BigDecimal> amount;
	
	/**
	 * @see com.example.financetracker.model.Transaction#name
	 **/
	public static volatile SingularAttribute<Transaction, String> name;
	
	/**
	 * @see com.example.financetracker.model.Transaction#transactionCategory
	 **/
	public static volatile SingularAttribute<Transaction, TransactionCategory> transactionCategory;
	
	/**
	 * @see com.example.financetracker.model.Transaction#description
	 **/
	public static volatile SingularAttribute<Transaction, String> description;
	
	/**
	 * @see com.example.financetracker.model.Transaction#transactionDate
	 **/
	public static volatile SingularAttribute<Transaction, LocalDate> transactionDate;
	
	/**
	 * @see com.example.financetracker.model.Transaction
	 **/
	public static volatile EntityType<Transaction> class_;
	
	/**
	 * @see com.example.financetracker.model.Transaction#user
	 **/
	public static volatile SingularAttribute<Transaction, User> user;
	
	/**
	 * @see com.example.financetracker.model.Transaction#account
	 **/
	public static volatile SingularAttribute<Transaction, Account> account;

}

