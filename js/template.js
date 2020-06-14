function player(data) {
     let articlesHTML = "";
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
    return articlesHTML;
  }

  function standing(data) { 
       let articlesHTML = "";
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

          return articlesHTML;
   }

   function match(data) {
       let articlesHTML = "";
       for (let i = 0; i < 6; i++) {
           let element = data.matches[i];

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
       return articlesHTML;
     }

  function matchId() {
        let articlesHTML = "";

        let homeTeam = data.match.homeTeam.name.split(" ").join("");
        let awayTeam = data.match.awayTeam.name.split(" ").join("");
        let matchDate = formatDate(data.match.utcDate);
        let matchTime = data.match.utcDate.substr(11, 5);
        let headtoheadHome = data.head2head.homeTeam;
        let headtoheadAway = data.head2head.awayTeam;

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
              return articlesHTML;
  }  