declare module "line-notify-sdk" {
    interface Dictionary<T> {
        [key: string]: T;
    }
    
    export class notifySDK{
        constructor(clientID?:string, clientSecret?:string, redirectURI?:string);
        checkArgsIsSet():void;
        generateOauthURL(state:string,form_post?:boolean):string;
        getToken(clientCode:string):Promise<string|Dictionary<string>>;
        getStatus(tokrn:string):Promise<Dictionary<string>>;
        revoke(token:string):Promise<Dictionary<string>>;
        notify(token?:string,message?:string, imageThumbnail?:string, imageFullsize?:string, stickerPackageId?:string, stickerId?:string, notificationDisabled?:boolean):Promise<Dictionary<string>>;
    }

}