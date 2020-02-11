# LINE-Notify-SDK

官方尚未提供 Notify SDK，故自己打造 Node.js 第三方 LINE Notify SDK。

## 使用說明

## 初始化

引入模組以及初始化，參數必須填滿

```javascript
const Notify_SDK = require('./line-notify-sdk')
const sdk = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)
```

## 設定/取得 認證連結

### sdk.set_Oauth_URL(response_type, scope, state)
回傳值為一 `function`，呼叫該 function 可以取得認證連結

範例：
```javascript
const get_Oauth_URL = sdk.set_Oauth_URL('code', 'notify', 'im_a_token')
const Oauth_URL = get_Oauth_URL()
```
詳請請閱讀 [LINE notify doc](https://notify-bot.line.me/doc/en/) 之 `GET https: //notify-bot.line.me/oauth/authorize`

## 取得用戶 token

### sdk.get_token_by_code(client_secret, client_code)
回傳值為一 `Promise`，Promise 回傳值為一 `string`，即用戶 token

## 取得用戶資料
### sdk.get_userinfo_by_token(token)
回傳值為一 `Promise`，Promise 回傳值為一 `object`（範例 { status: 200, message: 'ok', targetType: 'USER', target: 'YOUR-USER-NAME' }）

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
    //{ status: 200, message: 'ok', targetType: 'USER', target: 'YOUR-USER-NAME' }
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
