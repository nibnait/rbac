package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.UserEntity;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDao extends HibernateBaseDao<UserEntity> {
    public UserDao(){
        super(UserEntity.class, "id");
    }

}
