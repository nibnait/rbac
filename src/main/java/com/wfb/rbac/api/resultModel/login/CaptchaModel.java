package com.wfb.rbac.api.resultModel.login;

import com.google.gson.annotations.SerializedName;

/**
 * CaptchaModel
 */
public class CaptchaModel {

    @SerializedName("captchaData")
    private String CaptchaData;

    @SerializedName("codeKey")
    private String CodeKey;

    public String getCaptchaData() {
        return CaptchaData;
    }

    public void setCaptchaData(String captchaData) {
        CaptchaData = "data:image/png;base64," + captchaData;
    }

    public String getCodeKey() {
        return CodeKey;
    }

    public void setCodeKey(String codeKey) {
        CodeKey = codeKey;
    }
}
