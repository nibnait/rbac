package com.wfb.rbac.api.controller.attendance;

import com.wfb.rbac.common.ErrorsResult;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.AttendanceDao;
import com.wfb.rbac.db.entity.AttendanceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance")
public class CheckInController {

    @Autowired
    private AttendanceDao attendanceDao;

    @RequestMapping("/checkIn")
    public ApiResultModel checkIn(@RequestParam(required = true) String userId,
                                  @RequestParam(required = true) String checkDate){
        AttendanceEntity attendanceEntity = new AttendanceEntity();
        attendanceEntity.setId(attendanceDao.count()+1);
        attendanceEntity.setUserId(Integer.valueOf(userId));
        attendanceEntity.setCheckDate(TimeUtils.parseDate(checkDate));
        if (attendanceDao.insert(attendanceEntity)){
            return ResultBuilder.getNoDataSuccess("请假成功");
        }else {
            return ErrorsResult.DB_ERROR;
        }
    }

}
