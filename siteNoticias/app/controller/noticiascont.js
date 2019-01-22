module.exports.noticias =  function(app, req, res){
    let conect = app.config.dbConect();
    let noticias = new app.app.model.NoticiasModel(conect);
    
    noticias.getNoticias(function(error, valor){
        res.render("noticias/noticias.ejs", {noticias : valor});
    });
}
module.exports.noticia = function(app, req, res){
    let conect = app.config.dbConect();
    let id = req.query;
    let noticia = new app.app.model.NoticiasModel(conect);

    noticia.getNoticia(id, function(error, valor){
        res.render("noticias/noticia.ejs", {noticias : valor});
    });
           
        //res.render("noticias/noticia.ejs");
 
}