package com.example.financetracker.model;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.MappedSuperclassType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(BaseEntity.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class BaseEntity_ {

	public static final String ID = "id";

	
	/**
	 * @see com.example.financetracker.model.BaseEntity#id
	 **/
	public static volatile SingularAttribute<BaseEntity, Long> id;
	
	/**
	 * @see com.example.financetracker.model.BaseEntity
	 **/
	public static volatile MappedSuperclassType<BaseEntity> class_;

}

