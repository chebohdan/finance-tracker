package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(TransactionCategory.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class TransactionCategory_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String NAME = "name";
	public static final String TRANSACTIONS = "transactions";
	public static final String ACCOUNT = "account";

	
	/**
	 * @see com.example.financetracker.model.TransactionCategory#name
	 **/
	public static volatile SingularAttribute<TransactionCategory, String> name;
	
	/**
	 * @see com.example.financetracker.model.TransactionCategory#transactions
	 **/
	public static volatile ListAttribute<TransactionCategory, Transaction> transactions;
	
	/**
	 * @see com.example.financetracker.model.TransactionCategory
	 **/
	public static volatile EntityType<TransactionCategory> class_;
	
	/**
	 * @see com.example.financetracker.model.TransactionCategory#account
	 **/
	public static volatile SingularAttribute<TransactionCategory, Account> account;

}

