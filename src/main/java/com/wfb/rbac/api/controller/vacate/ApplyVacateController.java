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

import java.io.UnsupportedEncodingException;
import java.util.Date;

@RestController
@RequestMapping("/vacate")
public class ApplyVacateController {
    @Autowired
    private UserDao userDao;

    @Autowired
    private VacateDao vacateDao;

    @RequestMapping("/apply")
    public ApiResultModel applyVacate(@RequestParam(required = true) String userId,
                                      @RequestParam(required = true) String phoneNum,
                                      @RequestParam(required = true) String type,
                                      @RequestParam(required = true) String descrition,
                                      @RequestParam(required = true) String beginDate,
                                      @RequestParam(required = true) String endDate) throws UnsupportedEncodingException {
        ApiResultModel resultModel = null;
            VacateEntity vacateEntity = new VacateEntity();
            vacateEntity.setId(vacateDao.count()+1);
            vacateEntity.setUserId(Integer.parseInt(userId));
            vacateEntity.setCreateAt(new Date());
            vacateEntity.setStatus(1);
            vacateEntity.setPhoneNum(phoneNum);
            vacateEntity.setType(type);
            vacateEntity.setDescrition(descrition);
            vacateEntity.setBeginDate(TimeUtils.parseDate(beginDate));
            vacateEntity.setEndDate(TimeUtils.parseDate(endDate));
            if (vacateDao.insert(vacateEntity)){
                resultModel = ResultBuilder.getNoDataSuccess("添加成功");
            } else {
                resultModel = ErrorsResult.DB_ERROR;
            }
        return resultModel;
    }
}
