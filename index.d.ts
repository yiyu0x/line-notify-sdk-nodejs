declare function notifySDK(clientID?:string, clientSecret?:string, redirectURI?:string):notifySDK.notifySDK;

declare namespace notifySDK {

    interface notifySDK {
        checkArgsIsSet():void;
        generateOauthURL(state:string,form_post?:boolean):string;
        getToken(clientCode:string):Promise<string|{[key: string]: string}>;
        getStatus(tokrn:string):Promise<{[key: string]: string}>;
        revoke(token:string):Promise<{[key: string]: string}>;
        notify(token?:string,message?:string, imageThumbnail?:string, imageFullsize?:string, stickerPackageId?:string, stickerId?:string, notificationDisabled?:boolean):Promise<{[key: string]: string}>;
    }
}

export = notifySDK;