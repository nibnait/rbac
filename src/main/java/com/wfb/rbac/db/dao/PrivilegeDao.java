package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.PrivilegeEntity;
import org.springframework.stereotype.Component;

@Component
public class PrivilegeDao extends HibernateBaseDao<PrivilegeEntity> {
    public PrivilegeDao(){
        super(PrivilegeEntity.class, "id");
    }
}
