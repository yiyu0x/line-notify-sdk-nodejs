const request = require('request')

class LINE_Notify_SDK {
    constructor(client_id, client_secret, redirect_uri) {
        if (client_id === undefined || client_secret === undefined || redirect_uri === undefined)
            throw new Error('The arguments client_id, client_secret, redirect_uri is required.')

        this.client_id = client_id
        this.client_secret = client_secret
        this.redirect_uri = redirect_uri
    }

    set_Oauth_URL(response_type, scope, state) {

        const get_Oauth_URL = () => {            
            const Oauth_URL = 'https://notify-bot.line.me/oauth/authorize?' + 
	        'response_type=' + response_type + 
	        '&client_id=' + this.client_id + 
	        '&redirect_uri=' + this.redirect_uri +
	        '&scope=' + scope +
	        '&state=' + state
	        return Oauth_URL
        }

        return get_Oauth_URL
    }

    get_userinfo_by_token(token) {
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

    get_token_by_code(client_secret, client_code) {
	    return new Promise((reslove, reject) => {
	        request.post({
	            url: 'https://notify-bot.line.me/oauth/token',
	            form: {
	                grant_type: 'authorization_code',
	                code: client_code,
	                redirect_uri: this.redirect_uri,
	                client_id: this.client_id,
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
}

module.exports = LINE_Notify_SDK