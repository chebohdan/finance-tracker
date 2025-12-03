package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(UserCredentials.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class UserCredentials_ {

	public static final String PASSWORD = "password";
	public static final String ROLES = "roles";
	public static final String ID = "id";
	public static final String USER = "user";
	public static final String USERNAME = "username";

	
	/**
	 * @see com.example.financetracker.model.UserCredentials#password
	 **/
	public static volatile SingularAttribute<UserCredentials, String> password;
	
	/**
	 * @see com.example.financetracker.model.UserCredentials#roles
	 **/
	public static volatile ListAttribute<UserCredentials, ERole> roles;
	
	/**
	 * @see com.example.financetracker.model.UserCredentials#id
	 **/
	public static volatile SingularAttribute<UserCredentials, Long> id;
	
	/**
	 * @see com.example.financetracker.model.UserCredentials
	 **/
	public static volatile EntityType<UserCredentials> class_;
	
	/**
	 * @see com.example.financetracker.model.UserCredentials#user
	 **/
	public static volatile SingularAttribute<UserCredentials, User> user;
	
	/**
	 * @see com.example.financetracker.model.UserCredentials#username
	 **/
	public static volatile SingularAttribute<UserCredentials, String> username;

}

