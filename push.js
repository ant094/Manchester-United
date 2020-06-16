var webPush = require('web-push');

const vapidKeys = {
"publicKey": "BOmQQ0sRwtRPau8fkFxV5Uh0Ydqhb62tRQZM5MywhfR9xHxB6dC5NkERb_WeCgs8MyyEjvrOzRlWTHxQQ4qAr10",
"privateKey": "kfjVPBCUyYH7xx2VhigZp-fhPI1ruN-Dm81L5hGeyW0"
};



webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fRTgerCcUJM:APA91bE4NhWgLfUxr0Oab1hFMdWjtUpE4VgT45Jh8HYeJjj-LP40-nl-LhKgY4usLfDNqMcl7vlR1QbHFwJE9O0UGpW02gfh_oBPAdVfkpCtHeXXi-nhnrE5n-olN4wsVXodzxV-nu-P",
    "keys": {
        "p256dh": "BMEZbUFUhHf0L2puBS0nCelqYz5AjAM45+VTul8sTdj2UX1HuUjuAMgnvHmc3DjVAqujw/4PeESEWnVOIDZOokI=",
        "auth": "KwIjp92AyQ+8kwPnDjVShw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '125815189331',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
