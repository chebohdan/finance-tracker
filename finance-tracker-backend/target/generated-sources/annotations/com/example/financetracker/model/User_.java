package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(User.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class User_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String BIRTHDAY = "birthday";
	public static final String FIRST_NAME = "firstName";
	public static final String LAST_NAME = "lastName";
	public static final String ACCOUNT_INVITATION_INVITEE = "accountInvitationInvitee";
	public static final String ACCOUNT_INVITATION_INVITER = "accountInvitationInviter";
	public static final String USER_CREDENTIALS = "userCredentials";
	public static final String USER_ACCOUNTS = "userAccounts";
	public static final String ACCOUNTS = "accounts";
	public static final String EMAIL = "email";

	
	/**
	 * @see com.example.financetracker.model.User#birthday
	 **/
	public static volatile SingularAttribute<User, LocalDate> birthday;
	
	/**
	 * @see com.example.financetracker.model.User#firstName
	 **/
	public static volatile SingularAttribute<User, String> firstName;
	
	/**
	 * @see com.example.financetracker.model.User#lastName
	 **/
	public static volatile SingularAttribute<User, String> lastName;
	
	/**
	 * @see com.example.financetracker.model.User#accountInvitationInvitee
	 **/
	public static volatile ListAttribute<User, AccountInvitation> accountInvitationInvitee;
	
	/**
	 * @see com.example.financetracker.model.User#accountInvitationInviter
	 **/
	public static volatile ListAttribute<User, AccountInvitation> accountInvitationInviter;
	
	/**
	 * @see com.example.financetracker.model.User#userCredentials
	 **/
	public static volatile SingularAttribute<User, UserCredentials> userCredentials;
	
	/**
	 * @see com.example.financetracker.model.User#userAccounts
	 **/
	public static volatile ListAttribute<User, UserAccount> userAccounts;
	
	/**
	 * @see com.example.financetracker.model.User#accounts
	 **/
	public static volatile ListAttribute<User, Account> accounts;
	
	/**
	 * @see com.example.financetracker.model.User
	 **/
	public static volatile EntityType<User> class_;
	
	/**
	 * @see com.example.financetracker.model.User#email
	 **/
	public static volatile SingularAttribute<User, String> email;

}

