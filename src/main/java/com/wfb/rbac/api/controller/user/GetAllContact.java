package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.common.*;
import com.wfb.rbac.api.resultModel.user.AllContactModel;
import com.wfb.rbac.api.resultModel.user.UserInfo;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.DepartmentDao;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.DepartmentEntity;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class GetAllContact {

    @Autowired
    private UserDao userDao;

    @Autowired
    private DepartmentDao departmentDao;

    @RequestMapping("/getAllContact")
    public ApiResultModel getAllContact(){
        List<AllContactModel> contactList = new ArrayList<>();
        List<DepartmentEntity> allDepartment = departmentDao.findAll();
        for (DepartmentEntity departmentEntity : allDepartment) {
            AllContactModel allContactModel = new AllContactModel();
            allContactModel.setBuName(departmentEntity.getName());
            List<UserEntity> userEntityList = userDao.findAllBy("buId", departmentEntity.getId());
            List<UserInfo> userInfoList = new ArrayList<>();
            for (UserEntity userEntity : userEntityList) {
                UserInfo userInfo = convert2UserInfo(userEntity);
                userInfoList.add(userInfo);
            }
            allContactModel.setUserInfoList(userInfoList);
            contactList.add(allContactModel);
        }
        return ResultBuilder.getSuccess(contactList);
    }

    private UserInfo convert2UserInfo(UserEntity user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName()==null?"":user.getName());
        userInfo.setRoleName(user.getRoleName()==null?"":user.getRoleName());
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
        userInfo.setPassword(user.getPassword()==null?"":user.getPassword());
        return userInfo;
    }
}
