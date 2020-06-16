const CACHE_NAME = 'ManchesterUnitedFC-v1';
var urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    "/images/AFCBournemouth.png",
    "/images/ArsenalFC.png",
    "/images/AstonVillaFC.png",
    "/images/Brighton&HoveAlbionFC.png",
    "/images/BurnleyFC.png",
    "/images/ChelseaFC.png",
    "/images/CrystalPalaceFC.png",
    "/images/EvertonFC.png",
    "/images/LeicesterCityFC.png",
    "/images/LiverpoolFC.png",
    "/images/ManchesterCityFC.png",
    "/images/ManchesterUnitedFC.png",
    "/images/NewcastleUnitedFC.png",
    "/images/NorwichCityFC.png",
    "/images/SheffieldUnitedFC.png",
    "/images/SouthamptonFC.png",
    "/images/TottenhamHotspurFC.png",
    "/images/WatfordFC.png",
    "/images/WestHamUnitedFC.png",
    "/images/WolverhamptonWanderersFC.png",
    "images/icons/icon-72x72.png",
    "images/icons/icon-96x96.png",
    "images/icons/icon-128x128.png",
    "images/icons/icon-144x144.png",
    "images/icons/icon-152x152.png",
    "images/icons/icon-192x192.png",
    "images/icons/icon-384x384.png",
    "images/icons/icon-512x512.png",
    '/pages/home.html',
    '/pages/match.html',
    '/pages/matchId.html',
    '/pages/standing.html',
    '/css/style.css',
    '/css/materialize.min.css',
    '/js/jquery.min.js',
    '/js/materialize.min.js',
    '/js/helper.js',
    '/js/api.js',
    '/js/script.js'
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.url.includes('football-data.org')) {
        event.respondWith(async function () {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) return cachedResponse;
            const networkResponse = await fetch(event.request);
            event.waitUntil(
                cache.put(event.request, networkResponse.clone())
            );
            return networkResponse;
        }())
    } else {

        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});




self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: 'Current Standings',
        image: '/images/premier-league.jpg',
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});