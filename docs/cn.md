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

導入模組和初始化 SDK。不需要環境變數來發送通知

```javascript
const notifySDK = require('line-notify-sdk')
const notify = new notifySDK()
```

### 獲取令牌狀態
> *notify.getStatus(token)*

`return` **[promise]** 解析為 **[object]**

例子：
```javascript
嘗試 {
    const info = await notify.getStatus(token)
    // info : { status: 200, message: 'ok', targetType: 'USER', target: 'yiyu0x' }
} 捕捉（錯誤）{
    // 錯誤：{狀態：4xx，消息：'無效的訪問令牌或來自 LINE 的其他訊息'}
}
```
### 發送通知

> *notify.notify(token, message, imageThumbnail, imageFullsize,stickerPackageId,stickerId,notificationDisabled)*

返回： [promise] 解析為 [object]

例子：
```javascript
// 發送消息
notify.notify(token, 'hello').then((body) => {
    控制台日誌（正文）
    //{ 狀態：200，消息：'ok' }
}).catch((e)=>console.log(e))

// 發送貼紙
notify.notify(token, '這是我的貼紙', '', '', 1, 1).then((body) => {
    控制台日誌（正文）
}).catch((e)=>console.log(e))
```

### 撤銷令牌

> *notify.revoke(token)*

`return` **[promise]** 解析為 **[object]**

例子：
```javascript
// 撤銷令牌
notify.revoke(token).then((body) => {
console.log(body)//{ status: 200, message: 'ok' }
}).catch((e)=>console.log(e))
```

# 其他

- 在 `example/server.js` 中使用 Express 伺服器的示例身份驗證
- `example/notify.js` 中的示例通知

# API 速率限制

> 参考：[LINE 文档](https://notify-bot.line.me/doc/en/)

每個服務上可以調用 API 的次数是有限制的。
預設数量為 1000。

限制是每個訪問令牌。

API 速率限制狀態，可以在 API 的回應 header 中檢查。

|标题名称 |描述
|:----------:|:-------------
| X-RateLimit-Limit |每小時 API 調用次數限制
| X-RateLimit-Remaining |可能的剩餘 API 調用次数
| X-RateLimit-ImageLimit |每小時上傳圖片的限制
| X-RateLimit-ImageRemaining |可能剩餘上傳圖片的數量
| X-RateLimit-Reset |限制重置的時間（UTC 纪元秒）
