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
    "/images/logo/icon.png",
    "/images/logo/android-icon-192x192-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-180x180-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-152x152-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-144x144-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-120x120-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-114x114-dunplab-manifest-2820.png",
    "/images/logo/favicon-96x96-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-76x76-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-72x72-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-60x60-dunplab-manifest-2820.png",
    "/images/logo/apple-icon-57x57-dunplab-manifest-2820.png",
    "/images/logo/favicon-32x32-dunplab-manifest-2820.png",
    "/images/logo/favicon-16x16-dunplab-manifest-2820.png",
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

// Digunakan untuk Intall service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Digunakan untuk mengambil cache yang sedang aktifkan 
// dan Mencocokkan apakah sama atau beda

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName += CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Digunakan untuk  Memuat/mengaktifkan Cache
self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});







