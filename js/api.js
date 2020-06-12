const baseUrl = "https://api.football-data.org"

function getMonth(e){
    let month;
    switch (e) {
        case "01":
            month = "Jan";
            break;
        case "02":
            month = "Feb";
            break;
        case "03":
            month = "Mar";
            break;
        case "04":
            month = "Apr";
            break;
        case "05":
            month = "May";
            break;
        case "06":
            month = "Jun";
            break;
        case "07":
            month = "Jul";
            break;
        case "08":
            month = "Aug";
            break;
        case "09":
            month = "Sep";
            break;
        case "10":
            month = "Oct";
            break;
        case "11":
            month = "Nov";
            break;
        case "12":
            month = "Dec";
            break;
        default:
            month = "Error";
        }
        return month;
}

function formatDate(text) {
    const day       = text.substr(8,2);
    const month     = text.substr(5,2);
    const year      = text.substr(0,4);

    let dateText    = getMonth(month);
    dateText        = dateText + " "+day+" "+" "+year;
    return dateText;
  }

function getDate(date ) {
     const year   = Number(date.substr(0, 4));
     const month  = Number(date.substr(5, 2)) - 1;
     const day    = Number(date.substr(7, 2));
     const today  = new Date();
     let age    = today.getFullYear() - year;
     if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
         age--;
     }
     return age;
  }

function status(response) {
    if (response.status !== 200) {
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


function getTeam(){



fetch(baseUrl + "/v2/teams/66", {
    headers: {
        "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
    }
})
.then(status)
.then(json)
.then(function (data) {
     let articlesHTML = " ";
     let no = 1;
    data.squad.forEach(data => {
               if (data.shirtNumber != null) {

let age = getDate(data.dateOfBirth);
     articlesHTML += `
                     <tr>
                         <td>${no++}</td>
                         <td>${data.name}</td>
                         <td class="hide-on-small-only">${data.nationality}</td>
                         <td class="hide-on-small-only">${age}</td>
                         <td>${data.position}</td>
                         <td>${data.shirtNumber}</td>
                     </tr>`;
               }
            });
            document.getElementById("playerTabel").innerHTML = articlesHTML;
  }).catch(error);

   if ("caches" in window) {
       caches.match(baseUrl + "/v2/teams/66").then(function (response) {
           if (response) {
               response.json().then(function (data) {

                   let articlesHTML = " ";
                   let no = 1;
                   data.squad.forEach(data => {
                       if (data.shirtNumber != null) {

                           let age = getDate(data.dateOfBirth);
                           articlesHTML += `
                     <tr>
                         <td>${no++}</td>
                         <td>${data.name}</td>
                         <td class="hide-on-small-only">${data.nationality}</td>
                         <td class="hide-on-small-only">${age}</td>
                         <td>${data.position}</td>
                         <td>${data.shirtNumber}</td>
                     </tr>`;
                       }
                   });
                   document.getElementById("playerTabel").innerHTML = articlesHTML;
               });
           }
       });
   }
}

function getStanding() {

    fetch(baseUrl + "/v2/competitions/2021/standings", {
            headers: {
                "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            let articlesHTML = " ";

let standings = data.standings[0].table;
        standings.forEach(data => {
                    articlesHTML += `
                     <tr>
                         <td>${data.position}</td>
                         <td> 
                       <span>
                         <img src="../images/${data.team.name.split(" ").join("")}.png" alt="" class="img-standing"></span> <span class="hide-on-small-only ">${data.team.name}</span>
                       </td>
                         <td>${data.playedGames}</td>
                         <td>${data.won}</td>
                         <td>${data.draw}</td>
                         <td>${data.lost}</td>
                         <td>${data.goalDifference}</td>
                         <td>${data.goalsAgainst}</td>
                         <td>${data.goalsFor}</td>
                         <td>${data.points}</td>
                     </tr>`;
                    });
                    
            document.getElementById("standingsTabel").innerHTML = articlesHTML;
        });

        if ("caches" in window) {
            caches.match(baseUrl + "/v2/competitions/2021/standings").then(function (response) {
                if (response) {
                    response.json().then(function (data) {

                        let articlesHTML = " ";
                        let standings = data.standings[0].table;
                        standings.forEach(data => {
                            articlesHTML += `
                     <tr>
                         <td>${data.position}</td>
                         <td> 
                       <span>
                         <img src="../images/${data.team.name.split(" ").join("")}.png" alt="" class="img-standing"></span> <span class="hide-on-small-only ">${data.team.name}</span>
                       </td>
                         <td>${data.playedGames}</td>
                         <td>${data.won}</td>
                         <td>${data.draw}</td>
                         <td>${data.lost}</td>
                         <td>${data.goalDifference}</td>
                         <td>${data.goalsAgainst}</td>
                         <td>${data.goalsFor}</td>
                         <td>${data.points}</td>
                     </tr>`;
                        });

                        document.getElementById("standingsTabel").innerHTML = articlesHTML;

                    });
                }
            });
        }
        
}

function getMatch() {
    fetch(baseUrl + "/v2/teams/66/matches?status=SCHEDULED", {
            headers: {
                "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            let articlesHTML = "";
            for (let i = 0; i < 6; i++) {
                let element = data.matches[i];
                // console.log(element);
                let homeTeam = element.homeTeam.name.split(" ").join("");
                let awayTeam = element.awayTeam.name.split(" ").join("");
                let matchDate = formatDate(element.utcDate);
                
              articlesHTML += `
              <a href="#matchId-${element.id}" class="match" >
              <div class="col s12 m12 l6 ">
                     <div class="card-panel pb-3">
                        <div class="row">
                            <div class="col s12 center-align"><b>Match Day ${element.matchday}</b></div>
                            <div class="col s4 center-align"> <img class="img-match" src="../images/${homeTeam}.png" alt=""> </div>
                            <div class="col s4 center-align vs-match" >
                            <p>VS</p>
                            <p class="fs-date">${matchDate}</p></div>
                            <div class="col s4 center-align"> <img class="img-match" src="../images/${awayTeam}.png" alt=""> </div>
                        </div>
                     </div>
                     </div>
                     </a>
            `;
        }
                
             document.getElementById("matchTabel").innerHTML = articlesHTML;
  document
      .querySelectorAll("div .match")
      .forEach(function (elm) {
          elm.addEventListener("click", function () {
              let page = elm.getAttribute("href");
              loadContent(page);
          });
      });
        });

        

}

function getMatchId(id) {
    fetch(baseUrl + "/v2/matches/"+id, {
            headers: {
                "X-Auth-Token": "df4db72cbc114ae9a1edf7e19f7315b1"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
  let articlesHTML = "";

  let homeTeam          = data.match.homeTeam.name.split(" ").join("");
  let awayTeam          = data.match.awayTeam.name.split(" ").join("");
  let matchDate         = formatDate(data.match.utcDate);
  let matchTime         = data.match.utcDate.substr(11,5);
  let headtoheadHome    = data.head2head.homeTeam;
  let headtoheadAway    = data.head2head.awayTeam;

             articlesHTML += `<div class="col l12 ">
                     <div class="card-panel">
                        <div class="row">
                            <div class="col s12 center-align"> <h5><b>Match Day ${data.match.matchday}</b></h5> </div>
                            <div class="col s4 center-align"> <img class="img-matchId"  src="../images/${homeTeam}.png" alt=""> </div>
                            <div div class = "col s4 center-align vs-matchId" >
                            <p>${matchDate}</p>
                            <p ><b>VS</b></p>
                            <p>${matchTime}</p></div>
                            <div class="col s4 center-align"> <img class="img-matchId" src="../images/${awayTeam}.png" alt=""> </div>
                            <div class="col s12 m6 l6"  >
                            Wins: ${headtoheadHome.wins} Draws: ${headtoheadHome.draws} Losses: ${headtoheadHome.losses}
                            </div>
                            <div div class = "col s12 m6 l6 right-align hide-on-small-only" >
                               Wins: ${headtoheadAway.wins} Draws: ${headtoheadAway.draws} Losses: ${headtoheadAway.losses}
                            </div>
                            <div class="col s12 m6 l6 line-matchId" >Venue: ${data.match.venue}</div>
                            <div class="col s12 m6 l6 right-align line-matchId" >Competition: ${data.match.competition.name}</div>
                        </div>
                     </div>
                 </div>
              `;

                   document.getElementById("matchTabelId").innerHTML = articlesHTML;
            
        });
}
