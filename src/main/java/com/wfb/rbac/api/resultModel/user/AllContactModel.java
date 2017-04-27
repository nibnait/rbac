package com.wfb.rbac.api.resultModel.user;

import java.util.List;

public class AllContactModel {
    private String buName;
    private List<UserInfo> userInfoList;

    public String getBuName() {
        return buName;
    }

    public void setBuName(String buName) {
        this.buName = buName;
    }

    public List<UserInfo> getUserInfoList() {
        return userInfoList;
    }

    public void setUserInfoList(List<UserInfo> userInfoList) {
        this.userInfoList = userInfoList;
    }
}
