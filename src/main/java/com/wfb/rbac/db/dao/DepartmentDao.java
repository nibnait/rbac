package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.DepartmentEntity;
import org.springframework.stereotype.Component;

@Component
public class DepartmentDao extends HibernateBaseDao<DepartmentEntity>{
    public DepartmentDao(){
        super(DepartmentEntity.class, "id");
    }

}
