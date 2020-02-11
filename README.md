# LINE-Notify-SDK

官方尚未提供 Notify SDK，對於開發者來說非常不便。該專案為第三方 Node.js LINE Notify SDK。

官方提供之 API 共有：
- GET  https://notify-bot.line.me/oauth/authorize 
    - sdk.set_Oauth_URL(response_type, scope, state)
- GET  https://notify-api.line.me/api/status
    - sdk.get_userinfo_by_token(token)
- POST https://notify-bot.line.me/oauth/token
    - sdk.get_token_by_code(client_secret, client_code)
- POST https://notify-api.line.me/api/notify
    - sdk.notify(token, message)
- POST https://notify-api.line.me/api/revoke
    - sdk.revoke_token(token)

參數型態全部皆為字串。

# 使用說明

# 取得使用者 token, 使用者名稱 相關 API

## 初始化
引入模組以及初始化，參數必須填滿。

```javascript
const Notify_SDK = require('./line-notify-sdk')
const sdk = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)
```

## 設定/取得 認證連結

對應[官方](https://notify-bot.line.me/doc/en/)  `GET https: //notify-bot.line.me/oauth/authorize`
### sdk.set_Oauth_URL(response_type, scope, state)
回傳值為一 `function`，呼叫該 function 可以取得認證連結

範例：
```javascript
const get_Oauth_URL = sdk.set_Oauth_URL('code', 'notify', 'im_a_token')
const Oauth_URL = get_Oauth_URL()
```
## 取得用戶 token

對應[官方]((https://notify-bot.line.me/doc/en/))  `POST https://notify-bot.line.me/oauth/token`

### sdk.get_token_by_code(client_secret, client_code)
回傳值為一 `Promise`，Promise 回傳值為一 `string`，即用戶 token

（`client_code` 從自行架設的 callback URL 取得，文末有範例）

## 取得用戶資料（名稱、群組或個人）

對應[官方]((https://notify-bot.line.me/doc/en/))  `GET https://notify-api.line.me/api/status`

### sdk.get_userinfo_by_token(token)
回傳值為一 `Promise`，Promise 回傳值為一 `object`

範例：
```
{ status: 200, message: 'ok', targetType: 'USER', target: 'YOUR-USER-NAME' }
```

## 範例程式

```javascript
require('dotenv').config()
const express = require('express')
const app = express()
const Notify_SDK = require('./line-notify-sdk')
const sdk = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)

app.get('/cb', async (req, res) => {
    const client_code = req.query.code
    res.end()
    const client_secret = process.env.client_secret
    const token = await sdk.get_token_by_code(client_secret, client_code)
    const info = await sdk.get_userinfo_by_token(token)
    console.log(info, token)
})

app.get('/', (req, res) => {
    const get_Oauth_URL = sdk.set_Oauth_URL('code', 'notify', 'im_a_token')
    const Oauth_URL = get_Oauth_URL()
    res.redirect(Oauth_URL) // default is 302 temporarily redirect.
})

const port = 3000
app.listen(port, () => console.log(`Please regist LINE Nofity on : http://localhost:${port}`))
````

# 發送 notify, 註銷 token 相關 API

## 初始化

建構子參數可以為空。

```javascript
const Notify_SDK = require('./line-notify-sdk')
const sdk = new Notify_SDK()
```

## 發送 notify

對應[官方]((https://notify-bot.line.me/doc/en/))  `POST https://notify-api.line.me/api/notify`

目前只支援傳送訊息（不支援圖片、貼圖）

### sdk.notify(token, message)

回傳值為官方 API 回傳之物件。

範例：
```
{ status: 200, message: 'ok' }
```

## 註銷 token

對應[官方]((https://notify-bot.line.me/doc/en/))  `POST https://notify-api.line.me/api/revoke`

### sdk.revoke_token(token)

回傳值為官方 API 回傳之物件。

範例：
```
{ status: 200, message: 'ok' }
```

## 範例程式

```javascript
const Notify_SDK = require('./line-notify-sdk')
const sdk = new Notify_SDK()
sdk.notify('Fb95yOp0w4qfQfIWG2s7PthRldEgsZD7KHnvBRLadAQ', 'hello').then((body) => {
	console.log(body)
})
sdk.revoke_token('Fb95yOp0w4qfQfIWG2s7PthRldEgsZD7KHnvBRLadAQ').then((body) => {
	console.log(body)
})
//若成功，會收到：與「XXX」的連動已解除
```