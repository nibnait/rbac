package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import com.wfb.rbac.db.dao.RoleDao;
import com.wfb.rbac.db.entity.RoleEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class GetAllRoleController {
    @Autowired
    private RoleDao roleDao;

    @RequestMapping("/getAllRole")
    public ApiResultModel getAllRole(){
        List<RoleEntity> allRole = roleDao.findAll();
        return ResultBuilder.getSuccess(allRole);
    }

}
