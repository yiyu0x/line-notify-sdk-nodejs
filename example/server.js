require('dotenv').config()
const express = require('express')
const app = express()
const notifySDK = require('../index');
const notify = new notifySDK()

app.get('/cb', async (req, res) => {
    const clientCode = req.query.code
    res.end()
    console.log('Code : ',clientCode)

    let token;
    try {
        token = await notify.getToken(clientCode)
        console.log('Token : ',token)
    } catch (error) {
        console.log(error)
    }
})

app.get('/', (req, res) => {
    const url = notify.generateOauthURL('RANDOMSTATE')
    console.log(url)
    res.redirect(url) // default is 302 temporarily redirect.
})

const port = 3000
app.listen(port, () => console.log(`Please register LINE Nofity on : http://localhost:${port}`))
