package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

@StaticMetamodel(Notification.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Notification_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String CREATED_AT = "createdAt";
	public static final String READ = "read";
	public static final String SENDER = "sender";
	public static final String RECIPIENT = "recipient";
	public static final String MESSAGE = "message";

	
	/**
	 * @see com.example.financetracker.model.Notification#createdAt
	 **/
	public static volatile SingularAttribute<Notification, LocalDateTime> createdAt;
	
	/**
	 * @see com.example.financetracker.model.Notification#read
	 **/
	public static volatile SingularAttribute<Notification, Boolean> read;
	
	/**
	 * @see com.example.financetracker.model.Notification#sender
	 **/
	public static volatile SingularAttribute<Notification, User> sender;
	
	/**
	 * @see com.example.financetracker.model.Notification#recipient
	 **/
	public static volatile SingularAttribute<Notification, User> recipient;
	
	/**
	 * @see com.example.financetracker.model.Notification#message
	 **/
	public static volatile SingularAttribute<Notification, String> message;
	
	/**
	 * @see com.example.financetracker.model.Notification
	 **/
	public static volatile EntityType<Notification> class_;

}

