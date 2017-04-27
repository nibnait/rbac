package com.wfb.rbac.api.resultModel.login;

public class LoginResult {
    private Integer userId;

    public LoginResult(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
