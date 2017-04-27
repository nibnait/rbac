package com.wfb.rbac.api.resultModel.user;

import java.util.Map;

/**
 * 可以更新的权限 model
 */
public class UpdatePermissionModel {
    private Map<String, Integer> permissionMap;

    public Map<String, Integer> getPermissionMap() {
        return permissionMap;
    }

    public void setPermissionMap(Map<String, Integer> permissionMap) {
        this.permissionMap = permissionMap;
    }
}
