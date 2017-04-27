package com.wfb.rbac.api.controller.vacate;

import com.wfb.rbac.common.ErrorsResult;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.dao.VacateDao;
import com.wfb.rbac.db.entity.UserEntity;
import com.wfb.rbac.db.entity.VacateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vacate")
public class ApprovalVacateController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private VacateDao vacateDao;

    @RequestMapping("/LeaderApproval")
    public ApiResultModel LeaderApprovalVacate(@RequestParam(required = true) String userId,
                                         @RequestParam(required = true) String operate,
                                         @RequestParam(required = true) String idea,
                                         @RequestParam(required = true) String vacateId){
        UserEntity user = userDao.findBy("id", Integer.parseInt(userId));
        Integer roleId = user.getRoleId();
        Integer buId = user.getBuId();
        if (roleId == 2) {
            VacateEntity entity = vacateDao.findBy("id", Integer.parseInt(vacateId));
            entity.setLeaderIdea(idea);
            entity.setLeaderOperation(Integer.parseInt(operate));
            if (TimeUtils.getDurationDay(entity.getBeginDate(), entity.getEndDate()) > 30){
                entity.setStatus(3);
            } else {
                entity.setStatus(2);
            }
            if (vacateDao.update(entity)) {
                return ResultBuilder.getNoDataSuccess("审批完成");
            } else {
                return ErrorsResult.DB_ERROR;
            }
        } else if (buId == 1){
            VacateEntity entity = vacateDao.findBy("id", Integer.parseInt(vacateId));
            entity.setHrIdea(idea);
            entity.setHrOperation(Integer.parseInt(operate));
            entity.setStatus(4);
            if (vacateDao.update(entity)) {
                return ResultBuilder.getNoDataSuccess("审批完成");
            } else {
                return ErrorsResult.DB_ERROR;
            }
        } else {
            return ErrorsResult.NO_PERMISSION;
        }
    }
}
