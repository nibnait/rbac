package com.wfb.rbac.api.controller.login;

import com.wfb.rbac.api.helper.LoginHelper;
import com.wfb.rbac.api.resultModel.login.LoginResult;
import com.wfb.rbac.common.*;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.UserEntity;
import com.wfb.rbac.service.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @RequestMapping("/login")
    public ApiResultModel doLogin(@RequestParam String logName, @RequestParam String password,
                                  @RequestParam String code, HttpSession session) {
        if (StringUtils.isEmpty(code)) {
            return ErrorsResult.CAPTCHA_NOT_BLANK;
        }
        if (!LoginHelper.checkCaptcha(code, session)) {
            return ErrorsResult.CAPTCHA_ILLEGAL;
        }
        UserEntity user = userDao.findBy("logName", logName);
        if (user != null) {
            if (checkPassword(user, password)) {
                //登录成功
                LoginResult result = new LoginResult(user.getId());
                return ResultBuilder.getSuccess(result);
            } else {
                return ErrorsResult.PASSWORD_ERROR;
            }
        } else {
            return ErrorsResult.USER_NOT_EXISTED;
        }
    }

    private boolean checkPassword(UserEntity user, String password) {
        return user.getPassword().equals(password);
    }
}