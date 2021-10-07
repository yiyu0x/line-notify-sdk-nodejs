const Notify_SDK = require('../line-notify-sdk')
const sdk = new Notify_SDK()

const token = 'xxx'

sdk.notify(token, 'hello')

    .then((result) => {
        console.log(result)
    })
    
    .catch((e)=>{
        console.log(e)
    })

sdk.notify(token, 'Here is my sticker', '', '', 1, 1).then((body) => {
    console.log(body)
})

sdk.revoke_token(token).then((body) => {
    console.log(body)
})