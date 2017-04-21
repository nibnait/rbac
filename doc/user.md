## 我的账户

### 根据userId获取个人信息
#### URL:/api/user
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|Integer|√|userId

#### 请求方式：GET
#### 参数列表：无
#### 返回示例：
```
{
  "status": 0,
  "data": {
    "name": "root",
    "roleName": "",
    "logName": "admin",
    "workNo": "",
    "email": "",
    "address": "",
    "birthday": "",
    "sex": "",
    "buName": "",
    "idnum": "",
    "image": "",
    "phoneNum": "",
    "registerTime": ""
  }
}
```

### 根据userId获取可以修改的信息的列表
#### URL：/api/user/checkPermission
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id

#### 返回实例：
```
{
  "status": 0,
  "data": {
    "permissionMap": {
      "birthday": 1,
      "image": 1,
      "password": 1,
      "address": 1,
      "sex": 1,
      "name": 0,
      "roleName": 0,
      "phoneNum": 1,
      "idnum": 0,
      "buName": 0
    }
  }
}
```


### 修改个人信息
#### URL：/api/user/update
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id
name|String|可选|真实姓名
password|String|可选|登录密码
birthday|String|可选|出生日期
idnum|String|可选|身份证号
address|String|可选|详细地址
sex|String|可选|性别
buName|String|可选|部门名称
phoneNum|String|可选|手机号
roleName|String|可选|职位
image|String|可选|头像

#### 返回实例：
```
{
  "status": 0,
  "msg": "更新成功"
}

{
  "status": -202,
  "msg": "用户不存在"
}
```

### 上传头像
#### URL：/api/user/uploadHeadImage
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id
fileBase64|String|√|图片文件的base64编码

#### 返回实例：
```
{
  "status": 0,
  "data": {
     "url":"xxx"
  }
}

{
  "status": -202,
  "msg": "用户不存在"
}
```

## 联系人模块

### 添加员工信息
#### URL：/api/user/addUser
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id

#### 返回示例：
```

```


### 获取公司所有人的公开信息
#### URL：/api/user/getAllContact
#### 请求方式：GET
#### 参数列表：无
#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "buName": "人力资源",
      "userInfoList": [
        {
          "name": "root",
          "roleName": "",
          "logName": "admin",
          "workNo": "",
          "email": "",
          "address": "",
          "birthday": "",
          "sex": "",
          "buName": "",
          "idnum": "",
          "image": "",
          "phoneNum": "",
          "registerTime": ""
        }
      ]
    },
    {
      "buName": "技术部",
      "userInfoList": [
        {
          "name": "吴方兵",
          "roleName": "",
          "logName": "wfb",
          "workNo": "",
          "email": "",
          "address": "",
          "birthday": "",
          "sex": "",
          "buName": "",
          "idnum": "",
          "image": "",
          "phoneNum": "",
          "registerTime": ""
        }
      ]
    },
    {
      "buName": "运营部",
      "userInfoList": []
    },
    {
      "buName": "销售部",
      "userInfoList": []
    }
  ]
}

```

