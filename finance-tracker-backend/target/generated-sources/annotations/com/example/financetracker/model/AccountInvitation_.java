package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

@StaticMetamodel(AccountInvitation.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class AccountInvitation_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String CREATED_AT = "createdAt";
	public static final String ROLE = "role";
	public static final String INVITER = "inviter";
	public static final String ACCOUNT = "account";
	public static final String INVITEE = "invitee";
	public static final String STATUS = "status";

	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#createdAt
	 **/
	public static volatile SingularAttribute<AccountInvitation, LocalDateTime> createdAt;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#role
	 **/
	public static volatile SingularAttribute<AccountInvitation, EAccountRole> role;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#inviter
	 **/
	public static volatile SingularAttribute<AccountInvitation, User> inviter;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation
	 **/
	public static volatile EntityType<AccountInvitation> class_;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#account
	 **/
	public static volatile SingularAttribute<AccountInvitation, Account> account;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#invitee
	 **/
	public static volatile SingularAttribute<AccountInvitation, User> invitee;
	
	/**
	 * @see com.example.financetracker.model.AccountInvitation#status
	 **/
	public static volatile SingularAttribute<AccountInvitation, EAccountInvitationStatus> status;

}

