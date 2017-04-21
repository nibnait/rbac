package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.api.resultModel.user.UserInfo;
import com.wfb.rbac.common.*;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.DepartmentDao;
import com.wfb.rbac.db.dao.RoleDao;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetUserInfoController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private DepartmentDao buDao;

    /**
     * 获取个人信息
     * @param userId
     * @return
     */
    @RequestMapping("/user")
    public ApiResultModel getUserInfo(String userId){
        UserEntity user = userDao.findBy("id", Integer.valueOf(userId));
        if (user != null) {
            UserInfo userInfo = convert2UserInfo(user);
            return ResultBuilder.getSuccess(userInfo);
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }

    private UserInfo convert2UserInfo(UserEntity user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setName(user.getName()==null?"":user.getName());
        userInfo.setRoleName(user.getRoleName()==null?"":null);
        userInfo.setLogName(user.getLogName()==null?"":user.getLogName());
        userInfo.setBirthday(user.getBirthday()==null?"": TimeUtils.getDate(user.getBirthday()));
        userInfo.setWorkNo(user.getWorkNo()==null?"":user.getWorkNo());
        userInfo.setEmail(user.getEmail()==null?"":user.getEmail());
        userInfo.setAddress(user.getAddress()==null?"":user.getAddress());
        userInfo.setSex(user.getSex()==null?"":user.getSex());
        userInfo.setBuName(user.getBuName()==null?"":user.getBuName());
        userInfo.setIdnum(user.getIdnum()==null?"":user.getIdnum());
        userInfo.setImage(user.getImage()==null?"":user.getImage());
        userInfo.setPhoneNum(user.getPhoneNum()==null?"":user.getPhoneNum());
        userInfo.setRegisterTime(user.getRegisterTime()==null?"":TimeUtils.getDate(user.getRegisterTime()));
        return userInfo;
    }

}
