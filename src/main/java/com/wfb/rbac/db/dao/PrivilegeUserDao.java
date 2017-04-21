package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.PrivilegeUserEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PrivilegeUserDao extends HibernateBaseDao<PrivilegeUserEntity> {
    public PrivilegeUserDao(){
        super(PrivilegeUserEntity.class, "id");
    }

}
