package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.DataDicEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataDicDao extends HibernateBaseDao<DataDicEntity> {
    public DataDicDao() {
        super(DataDicEntity.class, "dicId");
    }


    public List<DataDicEntity> getAllTags() {
        ensureSession();
        return session.createQuery("from DataDicEntity where keyword = '项目标签'")
                .list();
    }
}
