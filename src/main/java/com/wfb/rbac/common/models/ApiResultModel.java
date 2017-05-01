package com.wfb.rbac.common.models;

/**
 * 通用API返回结果
 */
public class ApiResultModel {

    protected int status;

    protected Object data;

    protected String msg;

    public ApiResultModel() {
    }

    public ApiResultModel(int status, Object data, String msg) {
        this.status = status;
        this.data = data;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public ApiResultModel setStatus(int status) {
        this.status = status;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ApiResultModel setData(Object data) {
        this.data = data;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public ApiResultModel setMsg(String msg) {
        this.msg = msg;
        return this;
    }
}

