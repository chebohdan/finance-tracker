package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(UserAccount.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class UserAccount_ {

	public static final String USER_ACCOUNT_ID = "userAccountId";
	public static final String ACCOUNT_ROLE = "accountRole";
	public static final String USER = "user";
	public static final String ACCOUNT = "account";

	
	/**
	 * @see com.example.financetracker.model.UserAccount#userAccountId
	 **/
	public static volatile SingularAttribute<UserAccount, UserAccountId> userAccountId;
	
	/**
	 * @see com.example.financetracker.model.UserAccount#accountRole
	 **/
	public static volatile SingularAttribute<UserAccount, EAccountRole> accountRole;
	
	/**
	 * @see com.example.financetracker.model.UserAccount
	 **/
	public static volatile EntityType<UserAccount> class_;
	
	/**
	 * @see com.example.financetracker.model.UserAccount#user
	 **/
	public static volatile SingularAttribute<UserAccount, User> user;
	
	/**
	 * @see com.example.financetracker.model.UserAccount#account
	 **/
	public static volatile SingularAttribute<UserAccount, Account> account;

}

