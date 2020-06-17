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
    "endpoint": "https://fcm.googleapis.com/fcm/send/eg-P3hv8qng:APA91bHlvzFFyIPGG9WU6VV4AyjsyTlkL1qZBTWC2KZyoEpzH411F6NgN1qs7F3t2GzNwEZOvdW45EYoFnlE-dhct_u2vBLNv_B0isqjF9E7mzCptp1R_ByXF3b9VNU7aKx1TZlz921n",
    "keys": {
        "p256dh": " BJfuJl1WZPgIkCUG1ERpm6DP4FEdVIjD9MfR3qCa2itNDEskVifs+vxICRdS5ieEYbr1oxzvSORxtMGCQXfcrAw=",
        "auth": "OuteMT5ICArzPKdYRQfjKg=="
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
