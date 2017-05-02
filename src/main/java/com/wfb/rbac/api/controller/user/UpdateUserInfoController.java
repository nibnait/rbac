package com.wfb.rbac.api.controller.user;

import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.wfb.rbac.api.resultModel.user.UpdatePermissionModel;
import com.wfb.rbac.api.resultModel.user.UserInfo;
import com.wfb.rbac.common.*;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.PrivilegeDao;
import com.wfb.rbac.db.dao.PrivilegeUserDao;
import com.wfb.rbac.db.dao.RoleDao;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.PrivilegeEntity;
import com.wfb.rbac.db.entity.PrivilegeUserEntity;
import com.wfb.rbac.db.entity.UserEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UpdateUserInfoController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PrivilegeDao privilegeDao;

    @Autowired
    private PrivilegeUserDao privilegeUserDao;

    @RequestMapping("/checkPermission")
    public ApiResultModel checkPermission(String userId){
        UserEntity user = userDao.findBy("id", Integer.valueOf(userId));
        if (user != null) {
            UpdatePermissionModel permissionModel = new UpdatePermissionModel();
            Map<String, Integer> permissionMap = new HashMap<>();
            List<PrivilegeUserEntity> privilegeUserEntities = privilegeUserDao.findAllByRoleAndBu(user.getBuId(), user.getRoleId());
            //先将此角色下的所有权限设为0
            Integer privilegeId = privilegeUserEntities.get(0).getPrivilegeId();
            String pid = privilegeDao.findBy("id", privilegeId).getPid();
            List<PrivilegeEntity> allprivileges = privilegeDao.findAllBy("pid", pid);
            for (PrivilegeEntity privilegeEntity : allprivileges) {
                String privilegeName = privilegeEntity.getName();
                permissionMap.put(privilegeName, 0);
            }
            // 再将此角色拥有的权限设为1
            for (PrivilegeUserEntity entity : privilegeUserEntities) {
                Integer privilegeId1 = entity.getPrivilegeId();
                PrivilegeEntity privilegeEntity = privilegeDao.findBy("id", privilegeId1);
                String privilegeName = privilegeEntity.getName();
                permissionMap.put(privilegeName, 1);
            }
            permissionModel.setPermissionMap(permissionMap);
            return ResultBuilder.getSuccess(permissionModel);
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }

    /**
     * 更新个人信息
     * @param userId
     * @return
     */
    @RequestMapping("/updateInfo")
    public ApiResultModel updatePersonInfo(@RequestParam String userId,
                                           @RequestParam(required = false) String name,
                                           @RequestParam(required = false) String password,
                                           @RequestParam(required = false) String birthday,
                                           @RequestParam(required = false) String address,
                                           @RequestParam(required = false) String sex,
                                           @RequestParam(required = false) String idnum,
                                           @RequestParam(required = false) String buName,
                                           @RequestParam(required = false) String phoneNum,
                                           @RequestParam(required = false) String roleName,
                                           @RequestParam(required = false) String image){
        UserEntity user = userDao.findBy("id", Integer.parseInt(userId));
        if (user != null) {
            if (name !=null) {
                user.setName(name);
            }
            if (password !=null) {
                user.setPassword(password);
            }
            if (birthday !=null) {
                user.setBirthday((TimeUtils.parseDate(birthday)));
            }
            if (address != null) {
                user.setAddress(address);
            }
            if (sex != null) {
                user.setSex(sex);
            }
            if (idnum != null) {
                user.setIdnum(idnum);
            }
            if (buName != null) {
                user.setBuName(buName);
            }
            if (phoneNum != null) {
                user.setPhoneNum(phoneNum);
            }
            if (roleName != null) {
                user.setRoleName(roleName);
            }
            if (image != null) {
                user.setImage(image);
            }
            userDao.update(user);
            return ResultBuilder.getNoDataSuccess("更新成功");
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }
}
