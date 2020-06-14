const baseUrl = "https://api.football-data.org"

function statusResponse(response) {
    if (response.status != 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        console.log("lolos");
        
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


function getPlayers(){
            if ("caches" in window) {
                caches.match(baseUrl + "/v2/teams/66").then(function (response) {
                    if (response) {
                    response.json().then(function (data) {
                        document.getElementById("playerTabel").innerHTML = player(data);
                    });
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
                     .then(function (data) {
                          document.getElementById("playerTabel").innerHTML = player(data);
                     })
                     .catch(error);
            
}

function getStanding() {
   if ("caches" in window) {
       caches.match(baseUrl + "/v2/competitions/2021/standings").then(function (response) {
           if (response) {
               response.json().then(function (data) {
                   document.getElementById("standingsTabel").innerHTML = standing(data);
               });
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
      .then(function (data) {
          document.getElementById("standingsTabel").innerHTML = standing(data);
      }).catch(error);

        let save = document.getElementById('save');

        function saveContent() {
            console.log("click Save Masuk");
        }
        save.addEventListener('click', saveContent);
        
}

function getMatch() {
    if ("caches" in window) {
        caches.match(baseUrl + "/v2/teams/66/matches?status=SCHEDULED").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    document.getElementById("matchTabel").innerHTML = match(data);
 document.querySelectorAll("div .match").forEach(function (elm) {
         elm.addEventListener("click", function () {
             let page = elm.getAttribute("href");
             loadContent(page);
         });
     });

                });
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
        .then(function (data) {

            
             document.getElementById("matchTabel").innerHTML = match(data);
  document.querySelectorAll("div .match").forEach(function (elm) {
          elm.addEventListener("click", function () {
              let page = elm.getAttribute("href");
              loadContent(page);
          });
      });
        }).catch(error);

}

function getMatchId(id) {
    
 if ("caches" in window) {
     caches.match(baseUrl + "/v2/matches/" + id).then(function (response) {
         if (response) {
             response.json().then(function (data) {
          document.getElementById("matchTabelId").innerHTML = matchId(data);
             });
         }
     });
 }

    fetch(baseUrl + "/v2/matches/"+id, {
            headers: {
                "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
            }
        })
        .then(statusResponse)
        .then(json)
        .then(function (data) {
            document.getElementById("matchTabelId").innerHTML = matchId(data);
        });
}
