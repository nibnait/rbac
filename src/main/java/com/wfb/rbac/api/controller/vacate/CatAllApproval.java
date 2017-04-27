package com.wfb.rbac.api.controller.vacate;

import com.wfb.rbac.api.resultModel.vacate.VacateResultModel;
import com.wfb.rbac.common.ErrorsResult;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.*;
import com.wfb.rbac.db.entity.DataDicEntity;
import com.wfb.rbac.db.entity.PrivilegeUserEntity;
import com.wfb.rbac.db.entity.UserEntity;
import com.wfb.rbac.db.entity.VacateEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/vacate")
public class CatAllApproval {
    @Autowired
    private UserDao userDao;
    @Autowired
    private PrivilegeUserDao privilegeUserDao;
    @Autowired
    private VacateDao vacateDao;
    @Autowired
    private DataDicDao dataDicDao;

    @RequestMapping("/allApproval")
    public ApiResultModel getAllApproval(@RequestParam(required = true) String userId){
        ApiResultModel resultModel = null;
        UserEntity user = userDao.findBy("id", Integer.parseInt(userId));
        if (checkPermission(userId, user)){
            Integer status = getStatus(user);
            List<VacateEntity> allVacateList = vacateDao.findAllBy("status", status);
            List<VacateResultModel> allVacate = new ArrayList<>();
            List<Integer> allUserIds = getAllBuUserIds(user.getBuId());
            List<DataDicEntity> allApprovalStatus = dataDicDao.findAllBy("keyword", "审核状态");
            for (VacateEntity entity : allVacateList){
                if (checkVacateUserBu(entity, allUserIds)){
                    allVacate.add(convertVacateResultModel(entity, allApprovalStatus));
                }
            }
            resultModel = ResultBuilder.getSuccess(allVacate);
        } else {
            resultModel = ErrorsResult.NO_PERMISSION;
        }
        return resultModel;
    }

    private Integer getStatus(UserEntity user) {
        Integer buId = user.getBuId();
        Integer roleId = user.getRoleId();
        if (buId == 1 && roleId ==1){
            return 2;   //hr审核中
        } else if (buId == 1 && roleId == 2) {
            return 3;   //hr经理审核中
        } else {
            return 1;   //部门经理审核中
        }


    }

    private VacateResultModel convertVacateResultModel(VacateEntity entity, List<DataDicEntity> allApprovalStatus) {
        VacateResultModel resultModel = new VacateResultModel();
        UserEntity user = userDao.findBy("id", entity.getUserId());
        resultModel.setUserName(user.getName());
        resultModel.setPhoneNum(entity.getPhoneNum());
        resultModel.setDescrition(entity.getDescrition());
        resultModel.setCreateAt(TimeUtils.getDate(entity.getCreateAt()));
        resultModel.setStatus(getStatus(entity.getStatus(), allApprovalStatus));
        resultModel.setLeaderIdea(entity.getLeaderIdea()==null?"":entity.getLeaderIdea());
        resultModel.setLeaderOperation(entity.getLeaderOperation()==null?0:entity.getLeaderOperation());
        resultModel.setHrIdea(entity.getHrIdea()==null?"":entity.getHrIdea());
        resultModel.setHrOperation(entity.getHrOperation()==null?0:entity.getHrOperation());
        resultModel.setBeginDate(TimeUtils.getDate(entity.getBeginDate()));
        resultModel.setEndDate(TimeUtils.getDate(entity.getEndDate()));
        resultModel.setType(entity.getType());
        resultModel.setDays(TimeUtils.getDurationDay(entity.getBeginDate(), entity.getEndDate()));
        return resultModel;
    }

    private String getStatus(Integer status, List<DataDicEntity> allApprovalStatus) {
        for (DataDicEntity dataDicEntity : allApprovalStatus){
            if (dataDicEntity.getDdCode() == status){
                return dataDicEntity.getDdName();
            }
        }
        return "";
    }

    private boolean checkVacateUserBu(VacateEntity entity, List<Integer> allUserIds) {
        Integer userId = entity.getUserId();
        return allUserIds.contains(userId);
    }

    private List<Integer> getAllBuUserIds(Integer buId) {
        List<UserEntity> allUsers = userDao.findAllBy("buId", buId);
        List<Integer> result = new ArrayList<>();
        for (UserEntity entity : allUsers) {
            result.add(entity.getId());
        }
        return result;
    }

    private boolean checkPermission(String userId, UserEntity user) {
        //检查权限
        List<PrivilegeUserEntity> allByRoleAndBu = privilegeUserDao.findAllByRoleAndBu(user.getBuId(), user.getRoleId());
        for (PrivilegeUserEntity privilegeUserEntity : allByRoleAndBu){
            if (privilegeUserEntity.getPrivilegeId() == 14){
                return true;
            }
        }
        return false;
    }
}
