const axios = require('axios').default;
var FormData = require('form-data');

class notifySDK {

	/**
	 * SDK Contructor. If no paramaters passed, loads from environment
	 * @param {String} clientID 
	 * @param {String} clientSecret 
	 * @param {String} redirectURI 
	 */
	constructor(clientID, clientSecret, redirectURI) {
		this.clientID = clientID || process.env.LINE_NOTIFY_CLIENT_ID;
		this.clientSecret = clientSecret || process.env.LINE_NOTIFY_CLIENT_SECRET;
		this.redirectURI = redirectURI || process.env.LINE_NOTIFY_REDIRECT_URI;
		this.oauthBaseURI = 'https://notify-bot.line.me/oauth';
		this.apiBaseURI = 'https://notify-api.line.me/api';
	}

	/**
	 * Checks for availability of LINE Notify client variables
	 * @returns {Boolean}
	 */
	checkArgsIsSet() {
		if (this.clientID === undefined || this.clientSecret === undefined || this.redirectURI === undefined)
			throw new Error('The arguments clientID, clientSecret, redirectURI is required');
		else
			return true;
	};

	/**
	 * Generates OauthURL
	 * @param {String} state 
	 * @param {Boolean} formPost 
	 * @returns {String}
	 */
	generateOauthURL(state, formPost = false) {

		let oauthURL = this.oauthBaseURI + '/authorize?' +
			'response_type=code' + 
			'&scope=notify' +
			'&client_id=' + this.clientID +
			'&redirect_uri=' + this.redirectURI +
			'&state=' + state

		if (formPost) oauthURL += '&response_mode=form_post';
		return oauthURL;

	};

	/**
	 * GET - TOKEN
	 * @param {String} clientCode
	 * @returns {String}
	 */
	getToken(clientCode) {

        this.checkArgsIsSet()

		let form = new FormData()
		form.append('grant_type','authorization_code')
		form.append('code',clientCode)
		form.append('redirect_uri',this.redirectURI)
		form.append('client_id',this.clientID)
		form.append('client_secret',this.clientSecret)

		return new Promise((resolve, reject) => {

			axios.post(`${this.oauthBaseURI}/token`,form,{headers:form.getHeaders()})
			.then(function (response) {
				resolve(response.data.access_token);
			})
			.catch(function (error) {
				reject(error.toJSON());
			});

		});
        
    }

	/**
	 * GET - STATUS of the LINE Notify token
	 * @param {String} token 
	 * @returns {Object}
	 */
	getStatus(token) {
		return new Promise((resolve, reject) => {

			axios.get(`${this.apiBaseURI}/status`, {
				headers:{Authorization:`Bearer ${token}`}
			})
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error.toJSON());
			});

		});
	};
	
	/**
	 * POST - REVOKE token
	 * @param {String} token 
	 * @returns {Object}
	 */
	revoke(token) {
		return new Promise((resolve, reject) => {

			axios.post(`${this.apiBaseURI}/revoke`,null, {
				headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/x-www-form-urlencoded'}
			})
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error.toJSON());
			});

		});
	};
	
	/**
	 * POST - Notify Message
	 * @param {String} token 
	 * @returns {Object}
	 */
	notify(token,message, imageThumbnail, imageFullsize, stickerPackageId, stickerId, notificationDisabled) {
		return new Promise((resolve, reject) => {

			let form = new FormData()
			if (message) form.append('message',message);
			else reject('Message is required');

			if (imageThumbnail) form.append('imageThumbnail',imageThumbnail);
			if (imageFullsize) form.append('imageFullsize',imageFullsize);
			if (stickerPackageId) form.append('stickerPackageId',stickerPackageId);
			if (stickerId) form.append('stickerId',stickerId);
			if (notificationDisabled) form.append('notificationDisabled','true');

			let headers = form.getHeaders()
			headers['Authorization']=`Bearer ${token}`

			axios.post(`${this.apiBaseURI}/notify`, form,{
				headers:headers
			})
			
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (error) {
				reject(error.toJSON());
			})

		});
	};
}

module.exports = notifySDK