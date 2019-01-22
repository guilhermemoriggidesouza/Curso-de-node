module.exports = function(app){
    app.get("/admin", function(req, res){
        app.app.controller.admincont.formAddNoticias(app, req, res);
    });

    app.post("/noticias/salvar", function(req, res){
        app.app.controller.admincont.adicionarNoticias(app, req, res);
    })
}