// Blok kode untuk membuat IndexDB
var dbPromised = idb.open("manchester-united", 1, function (upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
        keyPath: "key"
    });
    articlesObjectStore.createIndex("post_title", "post_title", {
        unique: false
    });
});

// Blok kode untuk menyimpan data pada Object Store articles
function saveInDB(data,title) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("articles", "readwrite");
            let store = tx.objectStore("articles");
            store.add(data);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: title+' Saved',
                classes: 'rounded toastcenter green',
            });
        }).catch(function () {
             M.toast({
                 html: title + ' Previusly Saved',
                 classes: 'rounded toastcenter yellow darken-2',
             });
          });
    }
    
// Blok kode untuk mengambil semua data yang ada di article
function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.getAll();
            })
            .then(function (articles) {
                resolve(articles);
            });
    });
}

// Blok kode untuk mengambil data berdasarkan Id
function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.get(id);
            })
            .then(function (article) {
                resolve(article);
            });
    });
}

// Blok kode untuk menghapus data berdasarkan Id
function deleteDBId(id, title) {
    return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
        var tx = db.transaction('articles', 'readwrite');
        var store = tx.objectStore('articles');
        store.delete(id);
        return tx.complete;
    }).then(function () {
        M.toast({
            html: title + ' Deleted',
            classes: 'rounded toastcenter red darken-3',
        });
    });
});
}