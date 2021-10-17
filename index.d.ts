export = notifySDK;
declare class notifySDK {
    /**
     * SDK Contructor. If no paramaters passed, loads from environment
     * @param {string} clientID
     * @param {string} clientSecret
     * @param {string} redirectURI
     */
    constructor(clientID?: string, clientSecret?: string, redirectURI?: string);

    /**
     * Checks for availability of LINE Notify client variables
     * @returns {void}
     */
    checkArgsIsSet(): void;

    /**
     * Generates OauthURL
     * @param {string} state
     * @param {boolean} formPost
     * @returns {string}
     */
    generateOauthURL(state: string, formPost?: boolean): string;

    /**
     * GET - TOKEN
     * @param {string} clientCode
     * @returns {string}
     */
    getToken(clientCode: string): string;

    /**
     * GET - STATUS of the LINE Notify token
     * @param {string} token
     * @returns {{[key:string]:any}}
     */
    getStatus(token: string): {[key:string]:any};

    /**
     * POST - REVOKE token
     * @param {string} token
     * @returns {{[key:string]:any}}
     */
    revoke(token: string): {[key:string]:any};

    /**
     * POST - Notify Message
     * @param {string} token
     * @returns {{[key:string]:any}}
     */
    notify(token: string, message: string, imageThumbnail?: string, imageFullsize?: string, stickerPackageId?: string, stickerId?: string, notificationDisabled?: boolean): {[key:string]:any};
}
