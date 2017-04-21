## 我的账户

### 根据userId获取个人信息
#### URL:/api/user/{userId}
#### 请求方式：GET
#### 参数列表：无
#### 返回示例：
```
{
  "status": 0,
  "data": {
    "userId": "1",
    "address": "",
    "birthday": "",
    "email": "",
    "idnum": "",
    "image": "",
    "nickname": "",
    "phone": "15129076522",
    "realname": "",
    "registertime": "2017-04-02 15:48:13",
    "role": 2,
    "province": "",
    "city": "",
    "town": "",
    "job": "",
    "sex": "",
    "balance": 0.0
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
email|String|可选|邮箱
sex|String|可选|性别
birthday|String|可选|出生日期
idnum|String|可选|身份证号
nickname|String|可选|昵称
newPassword|String|可选|登录密码
realname|String|可选|真实姓名
province|String|可选|省份
city|String|可选|城市
town|String|可选|区县
address|String|可选|详细地址
job|String|可选|职业
newLoginPassword|String|可选|登录密码
transpwd|String|可选|交易密码
balance|String|可选|充值金额

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

### 获取所有省份信息
#### URL:/api/user/province
#### 请求方式：GET
#### 参数列表：无
#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "code": "110000",
      "name": "北京市"
    },
    {
      "code": "120000",
      "name": "天津市"
    }
  ]
}
```

### 根据provinceCode 获取此省份下的所有城市列表
#### URL:/api/user/city
#### 请求方式：GET
#### 参数列表：
参数名|类型|必选|说明
-----|---|----|---|
code|String|√|省份代码
#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "code": "130100",
      "name": "石家庄市"
    },
    {
      "code": "130200",
      "name": "唐山市"
    },
    {
      "code": "130300",
      "name": "秦皇岛市"
    }
  ]
}
```

### 根据cityCode 获取此城市下的所有区县列表
#### URL:/api/user/town
#### 请求方式：GET
#### 参数列表：
参数名|类型|必选|说明
-----|---|----|---|
code|String|√|城市代码
#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "code": "110101",
      "name": "东城区"
    },
    {
      "code": "110102",
      "name": "西城区"
    },
    {
      "code": "110103",
      "name": "崇文区"
    }
  ]
}
```


