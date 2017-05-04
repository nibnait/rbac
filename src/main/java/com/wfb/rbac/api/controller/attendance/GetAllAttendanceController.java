package com.wfb.rbac.api.controller.attendance;

import com.wfb.rbac.api.resultModel.attendance.AllAttendanceModel;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.AttendanceDao;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.entity.AttendanceEntity;
import com.wfb.rbac.db.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@RestController
@RequestMapping("/attendance")
public class GetAllAttendanceController {
    @Autowired
    private AttendanceDao attendanceDao;

    @Autowired
    private UserDao userDao;

    @RequestMapping("/getAllAttendance")
    public ApiResultModel getAllAtten(@RequestParam(required = true) String userId){
        UserEntity user = userDao.findBy("id", Integer.valueOf(userId));
        List<AttendanceEntity> attendanceEntities = attendanceDao.findAllBy("userId", Integer.valueOf(userId));
        AllAttendanceModel allAttendanceModel = new AllAttendanceModel();
        allAttendanceModel.setTotalCount(attendanceEntities.size());
        allAttendanceModel.setNotCheckCount(LocalDateTime.now().getDayOfMonth()-attendanceEntities.size());
        allAttendanceModel.setUserId(Integer.valueOf(userId));
        allAttendanceModel.setWorkNo(user.getWorkNo());
        allAttendanceModel.setName(user.getName());
        allAttendanceModel.setRoleName(user.getRoleName());
        allAttendanceModel.setBuName(user.getBuName());
        Map<String, Integer> attendanceMap = new HashMap<>();
        //初始化 attendanceList
        for (int i = 0; i < TimeUtils.getLengthOfMonth(); i++) {
            LocalDateTime date = LocalDateTime.now().minusDays(LocalDateTime.now().getDayOfMonth()).plusDays(Long.parseLong(i+""));
            Date theDate = Date.from(date.atZone(ZoneId.systemDefault()).toInstant());
            attendanceMap.put(TimeUtils.getDate(theDate), Integer.valueOf(0));
        }
        //将有签到的日子变为1
        for (AttendanceEntity entity: attendanceEntities){
            String date1 = TimeUtils.getDate(entity.getCheckDate());
            attendanceMap.put(TimeUtils.getDate(entity.getCheckDate()), Integer.valueOf(1));
        }
        allAttendanceModel.setAttendanceMap(attendanceMap);
        return ResultBuilder.getSuccess(allAttendanceModel);
    }
}
