# LINE-Notify-SDK

官方尚未提供 Notify SDK，對於開發者來說非常不便。該專案為第三方 Node.js LINE Notify SDK。

官方提供之 API 共分為 Authentication 以及 Notification 系列，此 SDK 也粗略分為這兩類。

Authentication 系列必須在初始化時設定好 `client_id`, `client_secret`, `redirect_uri`，對應之 API 如下：

- GET  https://notify-bot.line.me/oauth/authorize 
    - *sdk.set_Oauth_URL(response_type, scope, state)*
- GET  https://notify-api.line.me/api/status
    - *sdk.get_userinfo_by_token(token)*
- POST https://notify-bot.line.me/oauth/token
    - *sdk.get_token_by_code(client_secret, client_code)*

Notification 系列則是只需要有 token 即可使用，如下：

- POST https://notify-api.line.me/api/notify
    - *sdk.notify(token, message, imageThumbnail, imageFullsize, stickerPackageId, stickerId, notificationDisabled)*
    （token 必填，其他選填即可。）
- POST https://notify-api.line.me/api/revoke
    - *sdk.revoke_token(token)*

# 安裝 Installation

`npm install line-notify-sdk`

# 使用說明 Usage

## Authentication

### 初始化 initialization

Import module and initial sdk object. Constructor's arguments are all requied.
引入模組以及初始化，參數必須填滿。

```javascript
const Notify_SDK = require('line-notify-sdk')
const sdk = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)
```

### 設定/取得 認證連結 | set/get authentication link

*sdk.set_Oauth_URL(response_type, scope, state)*

return： [func]

Example ：
```javascript
const get_Oauth_URL = sdk.set_Oauth_URL('code', 'notify', 'im_a_token')
const Oauth_URL = get_Oauth_URL()
```

### 取得使用者 token, 使用者名稱 | get user token and user name
*sdk.get_token_by_code(client_secret, client_code)*

return： [promise] 回傳 [string]


*sdk.get_userinfo_by_token(token)*

return： [promise] 回傳 [object]

Example：
```javascript
const token = await sdk.get_token_by_code(client_secret, client_code)
//token: ZnCpYyTJq7_this_is_user_token_alxj8nWpzBl1
const info = await sdk.get_userinfo_by_token(token)
//info : { status: 200, message: 'ok', targetType: 'USER', target: 'yiyu0x' }
```

## Notification

### 初始化 initialization

Import module and initial sdk object. Constructor's arguments are allow empty.
引入模組並且初始化，建構子參數可以為空。

```javascript
const Notify_SDK = require('line-notify-sdk')
const sdk = new Notify_SDK()
```

### 發送 notification | send notification

*sdk.notify(token, message, imageThumbnail, imageFullsize, stickerPackageId, stickerId, notificationDisabled)*

return： [promise] 回傳 [object]

Example：
```javascript
// notice a message
sdk.notify(token, 'hello').then((body) => {
    console.log(body)//{ status: 200, message: 'ok' }
})

// notify a sticker
sdk.notify(token, 'Here is my sticker', '', '', 1, 1).then((body) => {
    console.log(body)
})
```

### 註銷 token | revoke token

*sdk.revoke_token(token)*

return： [promise] 回傳 [object]

Example：
```javascript
// revoke token
sdk.revoke_token(token).then((body) => {
	console.log(body)//{ status: 200, message: 'ok' }
})
//若成功，會收到：與「XXX」的連動已解除
```

# 其他 | others

範例認證用的 server 在 `example/server.js`, 需要在該目錄建立 `.env` 並且設定：

```
client_id=
client_secret=
redirect_uri=
```
