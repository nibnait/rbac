package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.RoleEntity;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class RoleDao extends HibernateBaseDao<RoleEntity> {
    public RoleDao(){
        super(UserEntity.class, "id");
    }

}
