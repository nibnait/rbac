# 基本JSON数据说明

## 基本注意事项
#### 时间格式：```yyyy-MM-dd HH:mm:ss，例：2016-09-14 18:25:36```
#### 成功返回：status为0时成功，其他情况均视为失败

## 无错误,成功时
status为0，有结果时data字段存在，无结果时，data字段不存在（如：创建、更新等操作）
```js
{"status":0,"data":xxx,"msg":xxx}
```
```js
{"status":0,"msg":xxx}
```

## 所有列表API正常返回遵循以下结构
### 即：data字段为array，包含列表信息和分页信息
```js
{
    "status":0,
    "data":{
        "dataList":[a,b,c],
        "pageInfo": {
            everyPage: 10,
            totalCount: 12,
            totalPage: 2,
            currentPage: 2,
            beginIndex: 10,
            hasPrePage: true,
            hasNextPage: false
        }
    }
    "msg":xxx
}
```

## 所有详情API正常返回遵循以下结构
### 即：data字段为obj，直接包含详情对象
```js
{
    "status":0,
    "data":{
        "a":"xxx",
        "b":"xxx",
        "c":"xxx"        
    }
    "msg":xxx
}
```

## HTTP错误
由Tomcat返回

## 请求错误
如参数不完整,签名错误等,status为-1开头
```js
{"status":-101,"msg":"参数错误"}
```
```js
{"status":-102,"msg":"签名错误"}
```

## 业务逻辑错误
如用户名密码错误,记录不存在等,status为-2开头
```js
{"status":-201,"msg":"用户名或密码错误"}
```
```js
{"status":-202,"msg":"用户不存在"}
```
```js
{"status":-203,"msg":"用户未激活"}
```
```js
{"status":-204,"msg":"用户未登录"}
```
```js
{"status":-205,"msg":"用户已存在"}
```
```js
{"status":-206,"msg":"用户名不合法"}
```

## 数据库/服务器错误
status以-5开头,表示服务器捕捉异常,但未进行处理
```js
{"status":-501,"msg":"数据库错误"}
```

## 未知错误
status为-9,表示服务器异常未捕获,未进行处理
```js
{"status":-9,"msg":"未知错误"}
```