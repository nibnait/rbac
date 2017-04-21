## 登录相关

### 1. 验证码获取

#### URL：/api/login/getCaptcha

#### 请求方式：GET/POST

#### 参数列表：无需参数

#### 返回结果说明：返回验证码图片流

### 2. 用户登录

#### URL：/api/login

#### 请求方式：GET

#### 参数列表：

参数名|类型|必选|说明
-----|---|----|---|
userPhone|String|√|用户名
password|String|√|密码
code|String|√|图片验证码上的文字
role|int|√|角色 1：普通客户 2：企业账号

#### 返回结果说明：返回无结果数据，如在客户端请注意保存Cookie

#### 返回JSON示例：
```js
{
    "status": 0,
    "data": {
        "userId": "fd7917c5312a4e818e3ae58bb997e9e4"
    }
}
```

