module.exports=function(app){
    app.get("/jogo", function(req, res){
        if(req.session.autorizar){
            app.app.controllers.jogo.jogo(app, req, res);
        }else{
            app.app.controllers.index.home(app, req, res);
        }
    })
    app.get("/sair", function(req,res){
        app.app.controllers.jogo.sair(app,req,res);
    })
    app.get("/pergaminhos", function(req,res){
        app.app.controllers.jogo.pergaminhos(app,req,res);
    })
    app.get("/aldeoes", function(req,res){
        app.app.controllers.jogo.aldeoes(app,req,res);
    })
    app.post("/acaoSudito", function(req,res){
        app.app.controllers.jogo.acaoSudito(app,req,res);
    })
    app.get("/revogarAcao", function(req,res){
        app.app.controllers.jogo.revogarAcao(app,req,res);
    })
}