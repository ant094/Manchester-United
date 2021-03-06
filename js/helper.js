// Blok Kode untuk mengatur Url dan Id
function getUrl(url) {
    let id = '';
    if (url == "") {
        url = '#home';
    } else if (url.substr(0, 7) === "matchId") {
        id  = url.substr(8);
        url = "matchId";
    } else if (url.substr(0, 7) === "savedId") {
        id  = url.substr(8);
        url = "savedId";
    }

    return resultUrl = {
        url: url,
        id: id
    };
}

// Blok kode untuk mengaktifkan warna navigasi yang aktif
function navigasiActive(nav) {
    $('.subNav').each(function () {
        $(this).parent().removeClass("active");
        let allNav = $(this).text();
        if (allNav == nav) {
            $(this).parent().addClass("active");
        }
    });
}

// Blok kode untuk mengubah angka bulan menjadi bulan
function getMonth(e) {
    let month = '';
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

// Blok Kode untuk menyusun Tanggal dengan Format Internasional
function getDate(text) {
    const day    = text.substr(8, 2);
    const month  = text.substr(5, 2);
    const year   = text.substr(0, 4);

    let dateText = getMonth(month);
    dateText     = dateText + " " + day + " " + " " + year;
    return dateText;
}

// Blok Kode untuk menghitung Umur
function getAge(date) {
    const year  = Number(date.substr(0, 4));
    const month = Number(date.substr(5, 2)) - 1;
    const day   = Number(date.substr(7, 2));
    const today = new Date();
    let age     = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
        }
    return age;
}