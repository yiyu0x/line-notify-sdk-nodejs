interface Dictionary<T> {
    [key: string]: T;
}

declare namespace sdk {
    interface notifySDK{
        checkArgsIsSet():void;
        generateOauthURL(state:string,form_post?:boolean):string;
        getToken(clientCode:string):string|Dictionary<string>;
        getStatus(tokrn:string):Dictionary<string>;
        revoke(token:string):Dictionary<string>;
        notify(token?:string,message?:string, imageThumbnail?:string, imageFullsize?:string, stickerPackageId?:string, stickerId?:string, notificationDisabled?:boolean):Dictionary<string>;
    }


}

declare var notifySDK: sdk.notifySDK;
export = notifySDK;
export as namespace notifySDK;