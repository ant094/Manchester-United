

$('#logo').attr('src', 'images/ManchesterUnitedFC.png');
// digunakan untuk menampilkan sideNav saat di Klik
$('.sidenav').sidenav();

// digunakan untuk menanganni click navigasi
let page = '';
$('.subNav').click(function () {
    page = $(this).attr('href');
    loadContent(page);
    $('.sidenav').sidenav('close');
});

//digunakan untuk menampilkan content
page = getUrl(window.location.hash);
loadContent(page.url);

//Function untuk menampilkan Kontent dengan ajax 
function loadContent(url) {

// Variabel Untuk tangani Error
 url = getUrl(url.substr(1));

const link = "pages/" + url.url+ ".html";
$('#title').text(url.url);
$.get(link, function (dataSearch) {
    $(".body-content").html(dataSearch);
 
     switch (url.url){
            case "home":
                   navigasiActive('PLAYER');
                   async function home() {
                       const dataPlayer = await getPlayers();
                       document.getElementById("playerTabel").innerHTML = viewPlayer(dataPlayer);
                   }
                   home();
                break;
             case "match":
                    navigasiActive('MATCH');
                    async function match() {
                        const dataMatch = await getMatch();
                        document.getElementById("matchTabel").innerHTML = viewMatch(dataMatch);
                        document.querySelectorAll("div .match").forEach(function (elm) {
                            elm.addEventListener("click", function () {
                                let page = elm.getAttribute("href");
                                loadContent(page);
                            });
                        });
                    }
                    match();
                break;
            case "matchId":
               async function matchId(id) {
                   const dataMatchId  = await getMatchId(id);
                   const dataStanding = await getStanding();
                   
                   document.getElementById("matchTabelId").innerHTML    = viewMatchId(dataMatchId);
                   document.getElementById("standingsTabel").innerHTML  = viewStanding(dataStanding);

                   const save         = document.getElementById('save');
                   save.addEventListener('click', async function() {
                        const data    = {
                            key         : "matchId-" + url.id,
                            head2head   : dataMatchId.head2head,
                            match       : dataMatchId.match,
                            standings   : dataStanding.standings
                        }
                        const titleMatch = document.getElementById('titleMatch').innerHTML;
                        saveInDB(data, titleMatch);
                    });
                }

                    navigasiActive('MATCH')
                    matchId(url.id);
                break;
            case "standing":
                 async function standing() {
                    const dataStanding = await getStanding();
                    document.getElementById("standingsTabel").innerHTML = viewStanding(dataStanding);
                    const save         = document.getElementById('save');
                    save.addEventListener('click', async function () {
                            const data= {
                                 key        : "standings",
                                 standings  : dataStanding.standings
                            }
                              saveInDB(data, 'Standings');
                          });
                    }

                    navigasiActive('STANDING');
                    standing();
                  break;

                  case "saved":
                      getAll().then(function (data) {
                        const dataSaved = data.length === 0 ? viewError("Nothing saved yet!") : viewSaved(data);
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

                        navigasiActive('SAVED');
                    break;

                  case 'savedId':
                        if (url.id !== "standings") {
                            url.id = "matchId-"+url.id;
                        }
                      
                        getById(url.id).then(function (data) {
                            data = viewSavedId(data)
                            document.getElementById("tableSavedId").innerHTML = data.standing;
                            document.getElementById("listSavedId").innerHTML  = data.matchId;
                        });
                        navigasiActive('SAVED');
                    break;
          }
    }).fail(
        function(){
        $(".body-content").html(viewError("Page not found!"));
        }
    );
      
}


