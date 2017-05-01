package com.wfb.rbac.api.controller.vacate;

import com.wfb.rbac.api.resultModel.vacate.VacateType;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.db.dao.DataDicDao;
import com.wfb.rbac.db.entity.DataDicEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/vacate")
public class GetAllVacateTypeController {

    @Autowired
    private DataDicDao dataDicDao;

    @RequestMapping("/allType")
    public ApiResultModel getAllVacateType(){
        List<DataDicEntity> allType = dataDicDao.findAllBy("keyword", "假期类型");
        List<VacateType> vacateTypeList = new ArrayList<>();
        for (DataDicEntity vacate : allType) {
            VacateType vacateType = new VacateType();
            vacateType.setCode(vacate.getDdCode());
            vacateType.setName(vacate.getDdName());
            vacateTypeList.add(vacateType);
        }
        return ResultBuilder.getSuccess(vacateTypeList);
    }
}
