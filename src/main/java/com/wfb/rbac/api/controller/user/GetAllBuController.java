package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.db.dao.DepartmentDao;
import com.wfb.rbac.db.entity.DepartmentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class GetAllBuController {
    @Autowired
    private DepartmentDao departmentDao;

    @RequestMapping("/getAllBu")
    public ApiResultModel getAllBu(){
        List<DepartmentEntity> allBu = departmentDao.findAll();
        return ResultBuilder.getSuccess(allBu);
    }
}
