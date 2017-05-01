package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.VacateEntity;
import org.springframework.stereotype.Component;

@Component
public class VacateDao extends HibernateBaseDao<VacateEntity> {
    public VacateDao(){
        super(VacateEntity.class, "id");
    }
}
