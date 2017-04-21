package com.wfb.rbac.service.user;

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

}
