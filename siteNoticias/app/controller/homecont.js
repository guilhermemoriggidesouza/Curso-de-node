module.exports.home = function(app, req, res){
    var connect = app.config.dbConect();
    var noticias =  new app.app.model.NoticiasModel(connect);

    noticias.getUltimasNoticias(function(error, valor){
        res.render("home/index.ejs", {noticias : valor});
    })
}