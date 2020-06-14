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
console.log(page);
loadContent(page);

//Function untuk menampilkan Kontent dengan ajax 
function loadContent(url) {

// Variabel Untuk tangani Error
    const error = `<article class="text-justify fs-content">
        <div class="card-panel xl-mt-0 xl-mt-1 content">
            <div div class = "row text-center" >
                    <p>
                        Halaman Tidak Ditemukan!
                    </p>
                    <a href="/" class="brand-logo subNav"><u><i>Back to home</i></u></a>
                </div>
            </div>
        </div>
    </article>`;

if (url.substr(1,7) == "matchId") {
    url = "#matchId";
}

const link = "pages/" + url.substr(1) + ".html";
$('#title').text(page.substr(1));
$.get(link, function (dataSearch) {
    $(".body-content").html(dataSearch);

     let url    = window.location.hash.substr(1);
     let id     = "";

if (url == "") {
    url = 'home';
}

 if (url.substr(0, 7) == "matchId") {
     id = url.substr(8);
     url = "matchId";
 }
 
     switch (url){
              case "home":
                    getPlayers();
                  break;
              case "match":
                  console.log(document.getElementById('save'));
                  getMatch();
                  break;
              case "matchId":
                  getStanding();
                  
                  break;
              case "standing":
                  getStanding();
                  break;
              default:
                  console.log("Error");
          }
       
    }).fail(
        function(){
        $(".body-content").html(error);
        }
    );
      
}


