package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.DataDicEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataDicDao extends HibernateBaseDao<DataDicEntity> {
    public DataDicDao() {
        super(DataDicEntity.class, "id");
    }

}
