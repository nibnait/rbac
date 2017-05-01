## 假期的申请与审批

### 获取所有假期类型
#### URL：/api/vacate/allType
#### 请求方式：GET
#### 参数列表：无
#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "code": 1,
      "name": "年假"
    },
    {
      "code": 2,
      "name": "病假"
    },
    {
      "code": 3,
      "name": "婚假"
    },
    {
      "code": 4,
      "name": "事假"
    },
    {
      "code": 5,
      "name": "产假"
    },
    {
      "code": 6,
      "name": "丧假"
    },
    {
      "code": 7,
      "name": "工伤"
    },
    {
      "code": 8,
      "name": "陪产假"
    },
    {
      "code": 9,
      "name": "哺乳假"
    },
    {
      "code": 10,
      "name": "产检假"
    },
    {
      "code": 11,
      "name": "加班转调休"
    },
    {
      "code": 12,
      "name": "福利带薪假"
    },
    {
      "code": 13,
      "name": "补签到"
    }
  ]
}
```

### 申请假期
#### URL：/api/vacate/apply
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id
phoneNum|String|√|假期联系手机号
type|String|√|请假类型
descrition|String|√|说明
beginDate|String|√/开始时间
endDate|String|√|结束时间

#### 返回示例：
```
{
  "status": 0,
  "msg": "添加成功"
}
```

### 查看所有待我审批的项目
#### URL：/api/vacate/allApproval
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id

#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "userName": "root",
      "phoneNum": "1",
      "descrition": "蛋疼？",
      "createAt": "2017-04-27",
      "status": "部门经理审核中",
      "leaderIdea": "",
      "leaderOperation": 0,
      "hrIdea": "",
      "hrOperation": 0,
      "beginDate": "2017-04-03",
      "endDate": "2017-04-22",
      "type": "事假",
<<<<<<< HEAD
      "days": 19
=======
      "days": 19,
      "workNo":001,
      "buName":"技术部",
>>>>>>> master
    }
  ]
}
```

### 批准或驳回项目
#### URL：/api/vacate/approval
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id
operate|Integer|√|操作|1、2
idea|String|√|意见
vacateId|String|√|假条Id

#### 返回示例：
```
{
  "status": 0,
  "msg": "审批完成"
}
<<<<<<< HEAD
```
=======
```

### 查看我的所有假条的审核进度
#### URL：/api/vacate/myVacates
#### 请求方式：GET
#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userId|String|√|用户id

#### 返回示例：
```
{
  "status": 0,
  "data": [
    {
      "userName": "root",
      "phoneNum": "1",
      "descrition": "蛋疼？",
      "createAt": "2017-04-27",
      "status": "部门经理审核中",
      "leaderIdea": "",
      "leaderOperation": 0,
      "hrIdea": "",
      "hrOperation": 0,
      "beginDate": "2017-04-03",
      "endDate": "2017-04-22",
      "type": "事假",
      "days": 19,
      "workNo":001,
      "buName":"技术部",
    },

    {
      "userName": "root",
      "phoneNum": "23",
      "descrition": "啊手动阀",
      "createAt": "2017-04-27",
      "status": "部门经理审核中",
      "leaderIdea": "",
      "leaderOperation": 0,
      "hrIdea": "",
      "hrOperation": 0,
      "beginDate": "2017-04-01",
      "endDate": "2017-04-29",
      "type": "事假",
      "days": 28,
      "workNo":001,
      "buName":"技术部",
    }
  ]
}
```
>>>>>>> master
