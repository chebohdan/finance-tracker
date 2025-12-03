package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EmbeddableType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(UserAccountId.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class UserAccountId_ {

	public static final String ACCOUNT_ID = "accountId";
	public static final String USER_ID = "userId";

	
	/**
	 * @see com.example.financetracker.model.UserAccountId#accountId
	 **/
	public static volatile SingularAttribute<UserAccountId, String> accountId;
	
	/**
	 * @see com.example.financetracker.model.UserAccountId
	 **/
	public static volatile EmbeddableType<UserAccountId> class_;
	
	/**
	 * @see com.example.financetracker.model.UserAccountId#userId
	 **/
	public static volatile SingularAttribute<UserAccountId, String> userId;

}

