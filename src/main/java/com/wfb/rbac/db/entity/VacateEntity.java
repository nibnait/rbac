package com.wfb.rbac.db.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "apply_vacate", schema = "rbac", catalog = "")
public class VacateEntity {
    private Integer id;
    private Integer userId;
    private String phoneNum;
    private String descrition;
    private Date createAt;
    private Integer status;
    private String leaderIdea;
    private Integer leaderOperation;
    private String hrIdea;
    private Integer hrOperation;
    private Date beginDate;
    private Date endDate;
    private String type;

    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
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

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
