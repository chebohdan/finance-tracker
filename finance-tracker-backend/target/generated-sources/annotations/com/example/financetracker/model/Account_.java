package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;

@StaticMetamodel(Account.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Account_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String OWNER = "owner";
	public static final String AUTO_CATEGORIZATION = "autoCategorization";
	public static final String BALANCE = "balance";
	public static final String TRANSACTION_CATEGORIES = "transactionCategories";
	public static final String INVITATIONS = "invitations";
	public static final String NAME = "name";
	public static final String USER_ACCOUNTS = "userAccounts";
	public static final String TRANSACTIONS = "transactions";

	
	/**
	 * @see com.example.financetracker.model.Account#owner
	 **/
	public static volatile SingularAttribute<Account, User> owner;
	
	/**
	 * @see com.example.financetracker.model.Account#autoCategorization
	 **/
	public static volatile SingularAttribute<Account, Boolean> autoCategorization;
	
	/**
	 * @see com.example.financetracker.model.Account#balance
	 **/
	public static volatile SingularAttribute<Account, BigDecimal> balance;
	
	/**
	 * @see com.example.financetracker.model.Account#transactionCategories
	 **/
	public static volatile ListAttribute<Account, TransactionCategory> transactionCategories;
	
	/**
	 * @see com.example.financetracker.model.Account#invitations
	 **/
	public static volatile ListAttribute<Account, AccountInvitation> invitations;
	
	/**
	 * @see com.example.financetracker.model.Account#name
	 **/
	public static volatile SingularAttribute<Account, String> name;
	
	/**
	 * @see com.example.financetracker.model.Account#userAccounts
	 **/
	public static volatile ListAttribute<Account, UserAccount> userAccounts;
	
	/**
	 * @see com.example.financetracker.model.Account#transactions
	 **/
	public static volatile ListAttribute<Account, Transaction> transactions;
	
	/**
	 * @see com.example.financetracker.model.Account
	 **/
	public static volatile EntityType<Account> class_;

}

