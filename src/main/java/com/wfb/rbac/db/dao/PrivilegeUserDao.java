package com.wfb.rbac.db.dao;

import com.wfb.rbac.db.entity.PrivilegeUserEntity;
import org.hibernate.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PrivilegeUserDao extends HibernateBaseDao<PrivilegeUserEntity> {
    public PrivilegeUserDao(){
        super(PrivilegeUserEntity.class, "id");
    }

    public List<PrivilegeUserEntity> findAllByRoleAndBu(Integer buId, Integer roleId) {
        ensureSession();
        return session.createQuery("from PrivilegeUserEntity u where u.buId= :buId and u.roleId= :roleId")
                .setString("buId", String.valueOf(buId))
                .setString("roleId", String.valueOf(roleId))
                .list();
    }
}
