package com.wfb.rbac.api.resultModel.vacate;

import java.util.Date;

public class VacateResultModel {
    private String userName;
    private String phoneNum;
    private String descrition;
    private String createAt;
    private String status;
    private String leaderIdea;
    private Integer leaderOperation;
    private String hrIdea;
    private Integer hrOperation;
    private String beginDate;
    private String endDate;
    private String type;
    private Integer days;   //天数
    private String workNo;
    private String buName;

    public String getWorkNo() {
        return workNo;
    }

    public void setWorkNo(String workNo) {
        this.workNo = workNo;
    }

    public String getBuName() {
        return buName;
    }

    public void setBuName(String buName) {
        this.buName = buName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getDescrition() {
        return descrition;
    }

    public void setDescrition(String descrition) {
        this.descrition = descrition;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLeaderIdea() {
        return leaderIdea;
    }

    public void setLeaderIdea(String leaderIdea) {
        this.leaderIdea = leaderIdea;
    }

    public Integer getLeaderOperation() {
        return leaderOperation;
    }

    public void setLeaderOperation(Integer leaderOperation) {
        this.leaderOperation = leaderOperation;
    }

    public String getHrIdea() {
        return hrIdea;
    }

    public void setHrIdea(String hrIdea) {
        this.hrIdea = hrIdea;
    }

    public Integer getHrOperation() {
        return hrOperation;
    }

    public void setHrOperation(Integer hrOperation) {
        this.hrOperation = hrOperation;
    }

    public String getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(String beginDate) {
        this.beginDate = beginDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }
}
