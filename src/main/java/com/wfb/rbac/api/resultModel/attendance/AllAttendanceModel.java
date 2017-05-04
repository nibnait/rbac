package com.wfb.rbac.api.resultModel.attendance;

import java.util.List;
import java.util.Map;

public class AllAttendanceModel {
    //本月签到总次数
    private Integer totalCount;

    //截止当前 未签到次数
    private Integer notCheckCount;

    private Map<String, Integer> attendanceMap;

    private Integer userId;
    private String name;
    private String roleName;
    private String workNo;
    private String buName;

    public Map<String, Integer> getAttendanceMap() {
        return attendanceMap;
    }

    public void setAttendanceMap(Map<String, Integer> attendanceMap) {
        this.attendanceMap = attendanceMap;
    }
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getBuName() {
        return buName;
    }

    public void setBuName(String buName) {
        this.buName = buName;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

    public Integer getNotCheckCount() {
        return notCheckCount;
    }

    public void setNotCheckCount(Integer notCheckCount) {
        this.notCheckCount = notCheckCount;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWorkNo() {
        return workNo;
    }

    public void setWorkNo(String workNo) {
        this.workNo = workNo;
    }
}
