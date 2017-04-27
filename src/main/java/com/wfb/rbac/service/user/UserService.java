package com.wfb.rbac.service.user;

import com.wfb.rbac.common.Constants;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.util.Date;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public Integer doRegister(UserEntity userEntity){
        int result;
        userEntity.setId(userDao.count()+1);
        if (userDao.findBy("logName", userEntity.getLogName()) != null){
            result = Constants.USER_EXISTED;
        } else {
            result = userDao.insert(userEntity) ? Constants.SUCCESS : Constants.DB_ERROR;
        }
        return result;
    }
}
