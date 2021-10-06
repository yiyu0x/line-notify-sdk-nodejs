const request = require('request')

class LINE_Notify_SDK {
    constructor(client_id, client_secret, redirect_uri) {
        this.client_id = client_id
        this.client_secret = client_secret
        this.redirect_uri = redirect_uri
    }

    check_args_is_set() {
        if (this.client_id === undefined || this.client_secret === undefined || this.redirect_uri === undefined)
            throw new Error('The arguments client_id, client_secret, redirect_uri is required.')
        else
            return true
    }

    set_Oauth_URL(response_type, scope, state,form_post=null) {
        
        this.check_args_is_set()
        
        const get_Oauth_URL = () => {            
            const Oauth_URL = 'https://notify-bot.line.me/oauth/authorize?' + 
	        'response_type=' + response_type + 
	        '&client_id=' + this.client_id + 
	        '&redirect_uri=' + this.redirect_uri +
	        '&scope=' + scope +
	        '&state=' + state
	    if (form_post) Oauth_URL += '&response_mode=form_post'
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

        this.check_args_is_set()
        
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
	
    notify(token, message, imageThumbnail, imageFullsize, stickerPackageId, stickerId, notificationDisabled) {
        return new Promise((reslove, reject) => {
	        request.post({
                url: 'https://notify-api.line.me/api/notify',
                headers: {
	                Authorization: `Bearer ${token}`
	            },
	            form: {
	                message, imageThumbnail, imageFullsize, stickerPackageId, stickerId, notificationDisabled
	            }
	        }, function(error, response, body) {
	            if (!error && response.statusCode === 200) {
	                reslove(JSON.parse(body))
	            } else {
	                reject('[error] in notify()')
	            }
	        })
        })
    }

    revoke_token(token) {
        return new Promise((reslove, reject) => {
            request.post({
                url: 'https://notify-api.line.me/api/revoke',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    reslove(JSON.parse(body))
                } else {
                    reject('[error] in notify()')
                }
            })
        })
    }
}

module.exports = LINE_Notify_SDK
