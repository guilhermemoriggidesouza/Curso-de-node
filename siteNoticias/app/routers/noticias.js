
module.exports = function(app){
    app.get("/noticias", function(req, res){
        app.app.controller.noticiascont.noticias(app,req,res);

    });
    app.get("/noticia", function(req, res){
        app.app.controller.noticiascont.noticia(app,req,res);
    });
}