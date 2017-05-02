package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.AttendanceEntity;
import org.springframework.stereotype.Component;

@Component
public class AttendanceDao extends HibernateBaseDao<AttendanceEntity>{
    public AttendanceDao(){
        super(AttendanceEntity.class, "id");
    }
}
