require('dotenv').config();
const notifySDK = require('../index');
const notify = new notifySDK();

( async () => {
    
    const token = process.env.TOKEN

    // Get Token Status
    let status;
    try {
        status = await notify.getStatus(token)
    } catch (error) {
        console.log(error)
    }
    console.log(token, status)
    //{ status: 200, message: 'ok', targetType: 'USER', target: 'YOUR-USER-NAME' }

    
    // Send Text Message
    notify.notify(token, 'hello')
    
        .then((result) => {
            console.log(result)
        })
        
        .catch((e)=>{
            console.log(e)
        })

    // Send Sticker
    notify.notify(token, 'Here is my sticker', null,null, 1, 1)
        .then((result) => {
            console.log(result)
        })
        
        .catch((e)=>{
            console.log(e)
        })

    // Revoke Token
    notify.revoke(token)
        .then((result) => {
            console.log(result)
        })
        
        .catch((e)=>{
            console.log(e)
        })

})();




