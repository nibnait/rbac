package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.common.Constants;
import com.wfb.rbac.common.ErrorsResult;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.UserEntity;
import com.wfb.rbac.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.Date;

@RestController
@RequestMapping("/user")
public class AddUserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;
    
    @RequestMapping("/addUser")
    private ApiResultModel addUser(@RequestParam(required = true) String userId,
                                   @RequestParam(required = true) String name,
                                   @RequestParam(required = true) String roleName,
                                   @RequestParam(required = true) String password,
                                   @RequestParam(required = true) String workNo,
                                   @RequestParam(required = true) String email,
                                   @RequestParam(required = true) String birthday,
                                   @RequestParam(required = true) String address,
                                   @RequestParam(required = true) String sex,
                                   @RequestParam(required = true) String idnum,
                                   @RequestParam(required = true) String buName,
                                   @RequestParam(required = true) String phoneNum,
                                   @RequestParam(required = true) String image,
                                   @RequestParam(required = true) String logName,
                                   @RequestParam(required = true) Integer roleId,
                                   @RequestParam(required = true) Integer buId) throws UnsupportedEncodingException {
        ApiResultModel resultModel = null;
        //验证userId是否又权限
        UserEntity user = userDao.findBy("id", Integer.parseInt(userId));
        if (user.getBuId() == 1) {
            UserEntity userEntity = new UserEntity();
            userEntity.setRegisterTime(new Date());
            userEntity.setName(name);
            userEntity.setRoleName(roleName);
            userEntity.setPassword(password);
            userEntity.setLogName(logName);
            userEntity.setWorkNo(workNo);
            userEntity.setEmail(email);
            userEntity.setBirthday(TimeUtils.parseDate(birthday));
            userEntity.setAddress(address);
            userEntity.setSex(sex);
            userEntity.setIdnum(idnum);
            userEntity.setBuName(buName);
            userEntity.setRoleId(roleId);
            userEntity.setBuId(buId);
            userEntity.setPhoneNum(phoneNum);
            userEntity.setImage(image);
            Integer result = userService.doRegister(userEntity);
            resultModel = convertReaultModel(result);
        } else {
            resultModel = ErrorsResult.NO_PERMISSION;
        }
        return resultModel;
    }
    private ApiResultModel convertReaultModel(Integer result) {
        ApiResultModel resultModel = new ApiResultModel();
        if (result == Constants.SUCCESS) {
            resultModel = ResultBuilder.getNoDataSuccess("添加成功");
        } else if (result == Constants.USER_EXISTED) {
            resultModel = ErrorsResult.USER_EXISTED;
        } else if (result ==  Constants.DB_ERROR) {
            resultModel = ErrorsResult.DB_ERROR;
        } else {
            resultModel = ErrorsResult.UNKNOWN_ERROR;
        }
        return resultModel;
    }

}
