package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(RefreshToken.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class RefreshToken_ extends com.example.financetracker.model.BaseEntity_ {

	public static final String REFRESH_TOKEN = "refreshToken";

	
	/**
	 * @see com.example.financetracker.model.RefreshToken
	 **/
	public static volatile EntityType<RefreshToken> class_;
	
	/**
	 * @see com.example.financetracker.model.RefreshToken#refreshToken
	 **/
	public static volatile SingularAttribute<RefreshToken, String> refreshToken;

}

