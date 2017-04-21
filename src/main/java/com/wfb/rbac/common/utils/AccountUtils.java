package com.wfb.rbac.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AccountUtils {

    public static boolean isMobileNo(String mobiles) {
        // Pattern p = Pattern.compile("^((13[0-9])|(14[5,7,9])|(15[^4,\\D])|(17[0,5,7,8])|(18[0,5-9]))\\d{8}$");
        Pattern p = Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$");
        Matcher m = p.matcher(mobiles);
        return m.matches();
    }

    public static boolean isEmail(String email) {
        if (null == email || "".equals(email)) {
            return false;
        }
        //        Pattern p = Pattern.compile("\\w+@(\\w+.)+[a-z]{2,3}"); //简单匹配
        Pattern p = Pattern.compile("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");//复杂匹配
        Matcher m = p.matcher(email);
        return m.matches();
    }
}

