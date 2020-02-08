require('dotenv').config()
const request = require('request')
const express = require('express')
const client_id = process.env.client_id
const app = express()

const get_userinfo_by_token = (token) => {
	return new Promise((reslove, reject) => {
		request({
			url: 'https://notify-api.line.me/api/status',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
    			reslove(JSON.parse(body))
    		} else {
    			reject('[error] in get_userinfo_by_token()')
    		}
		})
	})
}

const get_token_by_code = (client_secret, client_code) => {
	return new Promise((reslove, reject) => {
		request.post({
			url: 'https://notify-bot.line.me/oauth/token',
			form: {
				grant_type: 'authorization_code',
				code: client_code,
				redirect_uri: process.env.redirect_uri,
				client_id: client_id,
				client_secret: client_secret
			}
		}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
    			reslove(JSON.parse(body).access_token)
    		} else {
    			reject('[error] in get_token_by_code()')
    		}
		})
	})
}

app.get('/cb', async (req, res) => {
	const client_code = req.query.code
	res.end()
	const client_secret = process.env.client_secret
	const token = await get_token_by_code(client_secret, client_code)
	const info = await get_userinfo_by_token(token)
	//{ status: 200, message: 'ok', targetType: 'USER', target: 'YOUR-USER-NAME' }
	console.log(info, token)
})

app.get('/', (req, res) => {
	const response_type = 'code'
	const redirect_uri = process.env.redirect_uri
	const scope = 'notify'
	const state = 'im_a_token'
	const OAuth_URL = 'https://notify-bot.line.me/oauth/authorize?' + 'response_type=' + response_type + 
			    													  '&client_id=' + client_id + 
				    												  '&redirect_uri=' + redirect_uri +
					    											  '&scope=' + scope +
						    										  '&state=' + state
	res.redirect(OAuth_URL) // default is 302 temporarily redirect.
})

const port = 3000
app.listen(port, () => console.log(`Please regist LINE Nofity on : http://localhost:${port}`))