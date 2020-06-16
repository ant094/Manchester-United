// digunakan untuk menampilkan sideNav saat di Klik
$('.sidenav').sidenav();

// digunakan untuk menanganni click navigasi
$('.subNav').click(function () {
    page = $(this).attr('href');
    loadContent(page);
    $('.sidenav').sidenav('close');
});

//digunakan untuk menampilkan content
var page = window.location.hash;

if (page == "") {
    page = '#home';
} 
loadContent(page);

function checkUrl(url) {
    let urlId = '';
    if (url == "") {
        url     = 'home';
    } else if (url.substr(0, 7) === "matchId") {
        urlId   = url.substr(8);
        url     = "matchId";
    } else if (url.substr(0, 7) ==="savedId") {
        urlId  = url.substr(8);
        url     = "savedId";
    }

    return resultUrl = [url, urlId];
}

//Function untuk menampilkan Kontent dengan ajax 
function loadContent(url) {

// Variabel Untuk tangani Error
 url = checkUrl(url);

const link = "pages/" + url[0]+ ".html";
$('#title').text(page.substr(1));
$.get(link, function (dataSearch) {
    $(".body-content").html(dataSearch);
 
     switch (url[0]){
            case "home":
                   getPlayers();
                  break;

             case "match":
                  getMatch();
                  break;

            case "matchId":
               async function matchId(id) {
                   const dataMatchId  = await getMatchId(id);
                   const dataStanding = await getStanding();
                   
                   document.getElementById("matchTabelId").innerHTML    = templateMatchId(dataMatchId);
                   document.getElementById("standingsTabel").innerHTML  = templateStanding(dataStanding);

                   const save         = document.getElementById('save');
                   save.addEventListener('click', async function() {
                        const data    = {
                            key         : "matchId-" + url[1],
                            head2head   : dataMatchId.head2head,
                            match       : dataMatchId.match,
                            standings   : dataStanding.standings
                        }
                        const titleMatch = document.getElementById('titleMatch').innerHTML;
                        saveStandingDB(data, titleMatch);
                    });
                }
                matchId(url[1]);
                  break;

            case "standing":
                 async function standing() {
                    const dataStanding = await getStanding();
                    document.getElementById("standingsTabel").innerHTML = templateStanding(dataStanding);
                    const save         = document.getElementById('save');
                    
                    async function saveContent() {
                             const data = {
                                 key: "standings",
                                 standings: dataStanding.standings
                             }
                              saveStandingDB(data, 'Standings');
                          }
                     save.addEventListener('click', saveContent);
                    }
                    standing();
                  break;

                  case "saved":
                      getAll().then(function (data) {
                        const dataSaved = data.length === 0 ? templateError("Nothing saved yet!") : templateSaved(data);
                        document.getElementById("listSaved").innerHTML = dataSaved;
                           document.querySelectorAll("div .match").forEach(function (elm) {
                               elm.addEventListener("click", function () {
                                   loadContent(elm.getAttribute("href"));
                               });
                           });
                           document.querySelectorAll("div .delete").forEach(function (elm) {
                               elm.addEventListener("click", function () {
                                    const id    = elm.getAttribute("id");
                                    const title = elm.getAttribute("value");
                                    deleteDBId(id, title);
                                    loadContent("#saved");
                               });
                           });
                        });
                        break;

                  case 'savedId':
                      if (url[1] !== "standings") {
                          url[1] = "matchId-"+url[1];
                      }
                      
                        getById(url[1]).then(function (data) {
                            data = templateSavedId(data)
                            document.getElementById("tableSavedId").innerHTML = data[0];
                            document.getElementById("listSavedId").innerHTML  = data[1];
                        });
                      break;
          }
       
    }).fail(
        function(){
        $(".body-content").html(templateError("Page not found!"));
        }
    );
      
}


