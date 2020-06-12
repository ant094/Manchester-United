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

let id="264634";
if (url.substr(1,7) == "matchId") {
    id  = url.substr(9); 
    url = "#matchId";
}

const link = "pages/" + url.substr(1) + ".html";
$('#title').text(page.substr(1));
$.get(link, function (dataSearch) {
    $(".body-content").html(dataSearch);
      
          
       
    }).fail(
        function(){
        $(".body-content").html(error);
        }
    );

switch (url.substr(1)) {
    case "home":
        getTeam();
        break;
    case "match":
        getMatch();
        
        break;
    case "matchId":
        getMatchId(id);
        getStanding();
        break;
    case "standing":
        getStanding();
        break;
    default:
        console.log("Error");
        
}
      
}


