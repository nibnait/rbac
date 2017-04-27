package com.wfb.rbac.api.helper;

import com.wfb.rbac.common.utils.AccountUtils;
import org.apache.commons.lang3.StringUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@Resource
public class LoginHelper {
    public static boolean checkUserPhone(String nickname) {
        if (StringUtils.isNotBlank(nickname) && AccountUtils.isMobileNo(nickname)) {
            return true;
        } else {
            return false;
        }
    }
    public static boolean checkCaptcha(String code, HttpSession session) {
        String sessionCaptcha;
        try {
            sessionCaptcha = (String) session.getAttribute("captcha");
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        if (sessionCaptcha !=null && sessionCaptcha.toUpperCase().equals(code.toUpperCase())){
            return true;
        }
        return false;
    }
}
