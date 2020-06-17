const baseUrl = "https://api.football-data.org"

// Blok Kode untuk check respon dari fetch
function statusResponse(response) {
    if (response.status != 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok Kode Untuk Mengambil data Player
function getPlayers(){
  return new Promise((resolve, reject) =>{
        if ("caches" in window) {
            caches.match(baseUrl + "/v2/teams/66").then(function (response) {
                if (response) {
                    resolve(response.json());
                }
            });
        }

        fetch(baseUrl + "/v2/teams/66", {
                headers: {
                    "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
                }
            })
            .then(statusResponse)
            .then(json)
            .then(data => resolve(data)).catch(error => reject(error));
  });
}

// Blok Kode Untuk Mengambil data Klasemen
function getStanding() {
    return new Promise((resolve,reject)=>{
        if ("caches" in window) {
            caches.match(baseUrl + "/v2/competitions/2021/standings").then(function (response) {
                if (response) {
                        resolve(response.json());
                }
            });
        }

        fetch(baseUrl + "/v2/competitions/2021/standings", {
                headers: {
                    "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
                }
            })
            .then(statusResponse)
            .then(json)
            .then(data => resolve(data)).catch(error=>reject(error));
    });
}

// Blok Kode Untuk Mengambil data Pertandingan
function getMatch() {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(baseUrl + "/v2/teams/66/matches?status=SCHEDULED").then(function (response) {
                if (response) {
                    resolve(response.json());
                }
            });
        }

        fetch(baseUrl + "/v2/teams/66/matches?status=SCHEDULED", {
                headers: {
                    "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
                }
            })
            .then(statusResponse)
            .then(json)
            .then(data => resolve(data)).catch(error => reject(error));
    });
}

// Blok Kode Untuk Mengambil data Pertandingan berdasarkan Id
function getMatchId(id) {
    return new Promise((resolve,reject)=>{
        if ("caches" in window) {
            caches.match(baseUrl + "/v2/matches/" + id).then(function (response) {
                if (response) {
                resolve(response.json());
                }
            });
        }

        fetch(baseUrl + "/v2/matches/" + id, {
                headers: {
                    "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
                }
            })
            .then(statusResponse)
            .then(json)
            .then(data => resolve(data))
            .catch(error => reject(error));
        });   
}
