# line-notify-sdk-nodejs

> 本專案為第三方 LINE Notify SDK。

LINE 官方未提供 Notify 功能的 SDK。對開發者來說不方便。

官方 LINE Notify API 提供了 `Authentication` 和 `Notification` 的端點，這個專案也是如此。

### 身份驗證 API

1.`GET` https://notify-bot.line.me/oauth/authorize
    - *notify.generateOauthURL(state)*

2.`POST` https://notify-bot.line.me/oauth/token
    - *notify.getToken(client_code)*
    
### 通知 API
- `GET` https://notify-api.line.me/api/status
    - *notify.getStatus(token)*
- `POST` https://notify-api.line.me/api/notify
    - *notify.notify(token, message, imageThumbnail, imageFullsize,stickerPackageId,stickerId,notificationDisabled)*
- `POST` https://notify-api.line.me/api/revoke
    - *notify.revoke(token)*

## 安裝

`npm install line-notify-sdk`

## 用法

## 驗證

### 1. 初始化

匯入模組和初始 sdk 物件。如果您的環境中有預設變數，則建構函式的引數是可選的。

```javascript
const notifySDK = require('line-notify-sdk')
const notify = new notifySDK(clientID,clientSecret,redirectURI)
// 这些参数是可选的，如果你有
// 环境中的默认变量
```
默認環境變數
```md
LINE_NOTIFY_CLIENT_ID=
LINE_NOTIFY_CLIENT_SECRET=
LINE_NOTIFY_REDIRECT_URI=
```

### 2. 生成認證連結

> *notify.generateOauthURL(state)*

`返回` **[字符串]**

例子 ：
```javascript
const url = notify.generateOauthURL('somerandomstate')
```

### 3. 從代碼中獲取令牌
> *notify.getToken(clientCode)*

`return` **[promise]** 解析为 **[string]**

例子：
```javascript
const token = await notify.getToken(clientCode)
//令牌：ZnCpYyTJq7_this_is_user_token_alxj8nWpzBl1
```


## 通知

### 初始化

导入模块和初始 sdk 对象。不需要环境变量来发送通知

```javascript
const notifySDK = require('line-notify-sdk')
const notify = new notifySDK()
```

### 獲取令牌狀態
> *notify.getStatus(token)*

`return` **[promise]** 解析为 **[object]**

例子：
```javascript
尝试 {
    const info = await notify.getStatus(token)
    // info : { status: 200, message: 'ok', targetType: 'USER', target: 'yiyu0x' }
} 捕捉（错误）{
    //错误：{状态：4xx，消息：'无效的访问令牌或来自LINE的其他消息'}
}
```
### 發送通知

> *notify.notify(token, message, imageThumbnail, imageFullsize,stickerPackageId,stickerId,notificationDisabled)*

返回： [promise] 解析为 [object]

例子：
```javascript
// 发送消息
notify.notify(token, 'hello').then((body) => {
    控制台日志（正文）
    //{ 状态：200，消息：'ok' }
}).catch((e)=>console.log(e))

// 发送贴纸
notify.notify(token, '这是我的贴纸', '', '', 1, 1).then((body) => {
    控制台日志（正文）
}).catch((e)=>console.log(e))
```

### 撤销令牌

> *notify.revoke(token)*

`return` **[promise]** 解析为 **[object]**

例子：
```javascript
// 撤销令牌
notify.revoke(token).then((body) => {
console.log(body)//{ status: 200, message: 'ok' }
}).catch((e)=>console.log(e))
```

# 其他

- 在 `example/server.js` 中使用 Express 服务器的示例身份验证
- `example/notify.js` 中的示例通知

# API 速率限制

> 参考：[LINE 文档](https://notify-bot.line.me/doc/en/)

每个服务上可以调用 API 的次数是有限制的。
默认数量设置为 1000。

限制是每个访问令牌。

API 速率限制状态，可以在 API 的响应头中检查。

|标题名称 |描述
|:----------:|:-------------
| X-RateLimit-Limit |每小时API调用次数限制
| X-RateLimit-Remaining |可能的剩余 API 调用次数
| X-RateLimit-ImageLimit |每小时上传图片的限制
| X-RateLimit-ImageRemaining |可能剩余上传图片的数量
| X-RateLimit-Reset |限制重置的时间（UTC纪元秒）
