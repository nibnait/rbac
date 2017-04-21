package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.common.*;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    /**
     * 更新个人信息
     * @param userId
     * @return
     */
    @RequestMapping("/user/updateInfo/{userId}")
    public ApiResultModel updatePersonInfo(@RequestParam String userId,
                                           @RequestParam(required = false) String email,
                                           @RequestParam(required = false) String birthday,
                                           @RequestParam(required = false) String idnum,
                                           @RequestParam(required = false) String nickname,
                                           @RequestParam(required = false) String realname,
                                           @RequestParam(required = false) String phone,
                                           @RequestParam(required = false) String province,
                                           @RequestParam(required = false) String city,
                                           @RequestParam(required = false) String town,
                                           @RequestParam(required = false) String address,
                                           @RequestParam(required = false) String job,
                                           @RequestParam(required = false) String newLoginPassword,
                                           @RequestParam(required = false) String transpwd,
                                           @RequestParam(required = false) double balance,
                                           @RequestParam(required = false) String sex){
        UserEntity user = userDao.findById(userId);
        if (user != null) {


            return null;
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }

    /**
     * 获取个人信息
     * @param userId
     * @return
     */
    @RequestMapping("/user/{userId}")
    public ApiResultModel getUserInfo(String userId){
        UserEntity user = userDao.findBy("userId", userId);
        if (user != null) {


            return null;
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }
}
