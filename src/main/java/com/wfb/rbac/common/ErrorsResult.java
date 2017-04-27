package com.wfb.rbac.common;

import com.wfb.rbac.common.models.ApiResultModel;

public interface ErrorsResult {

    /**
     * -1xx 请求错误
     */
    ApiResultModel PARAM_ERROR = ResultBuilder.getError(-101, "参数错误");

    ApiResultModel SIGN_ERROR = ResultBuilder.getError(-102, "签名错误");

    /**
     * -2xx 逻辑错误
     */
    ApiResultModel USER_NOT_EXISTED = ResultBuilder.getError(-202, "用户不存在");

    ApiResultModel PASSWORD_ERROR = ResultBuilder.getError(-202, "密码错误");

    ApiResultModel ROLE_NOT_BLANK = ResultBuilder.getError(-203, "角色不能为空");

    ApiResultModel ROLE_ILLEGAL = ResultBuilder.getError(-204, "roleId不合法");

    ApiResultModel NOT_LOGIN = ResultBuilder.getError(-205, "用户名未登录");

    ApiResultModel USER_EXISTED = ResultBuilder.getError(-206, "用户已存在");

    ApiResultModel ACCOUNT_ILLEGAL = ResultBuilder.getError(-207, "用户名不合法");

    ApiResultModel EMAIL_ILLEGAL = ResultBuilder.getError(-207, "邮箱不合法");

    ApiResultModel CAPTCHA_ILLEGAL = ResultBuilder.getError(-208, "验证码错误");

    ApiResultModel CAPTCHA_NOT_BLANK = ResultBuilder.getError(-209, "验证码为空");

    ApiResultModel NO_PERMISSION = ResultBuilder.getError(-210, "权限不足");

    /**
     * -5xx 数据库\服务器错误
     */
    ApiResultModel DB_ERROR = ResultBuilder.getError(-501, "数据库错误");
    ApiResultModel FILE_ERROR = ResultBuilder.getError(-501, "文件读取异常");
    ApiResultModel UPLOAD_ERROR = ResultBuilder.getError(-501, "上传失败");

    /**
     * -9 未知错误
     */
    ApiResultModel UNKNOWN_ERROR = ResultBuilder.getError(-9, "未知错误");
}
