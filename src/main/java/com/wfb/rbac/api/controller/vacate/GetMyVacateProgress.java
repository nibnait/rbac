package com.wfb.rbac.api.controller.vacate;

import com.wfb.rbac.api.resultModel.vacate.VacateResultModel;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.common.utils.TimeUtils;
import com.wfb.rbac.db.dao.DataDicDao;
import com.wfb.rbac.db.dao.UserDao;
import com.wfb.rbac.db.dao.VacateDao;
import com.wfb.rbac.db.entity.DataDicEntity;
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
public class GetMyVacateProgress {

    @Autowired
    public VacateDao vacateDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private DataDicDao dataDicDao;

    @RequestMapping("/myVacates")
    public ApiResultModel getMyVacates(@RequestParam(required = true) String userId){

        List<VacateEntity> vacateEntityList = vacateDao.findAllBy("userId", Integer.valueOf(userId));
        List<DataDicEntity> allApprovalStatus = dataDicDao.findAllBy("keyword", "审核状态");
        List<VacateResultModel> resultModelList = new ArrayList<>();
        for (VacateEntity vacateEntity : vacateEntityList) {
            VacateResultModel resultModel = convertVacateResultModel(vacateEntity, allApprovalStatus);
            resultModelList.add(resultModel);
        }
        return ResultBuilder.getSuccess(resultModelList);
    }

    private VacateResultModel convertVacateResultModel(VacateEntity entity, List<DataDicEntity> allApprovalStatus) {
        VacateResultModel resultModel = new VacateResultModel();
        UserEntity user = userDao.findBy("id", entity.getUserId());
        resultModel.setUserName(user.getName());
        resultModel.setBuName(user.getBuName());
        resultModel.setWorkNo(user.getWorkNo());
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
}
