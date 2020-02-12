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
