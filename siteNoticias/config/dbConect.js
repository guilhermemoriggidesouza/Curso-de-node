var mysql =  require("mysql");

var connDb =  function(){
    console.log("conectado no mysql");
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database : "noticias",
    });
}
module.exports = function(){
        console.log("conecção pronta para uso");
        return connDb;
}