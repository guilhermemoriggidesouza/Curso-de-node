module.exports.jogo = function(app, req, res){
    
    var conect = app.config.conect;
    var jogo = new app.app.modells.Jogo(conect);
    var usuario = req.session.usuario;
    
    var error = '';
    if(req.query.error == 'a'){
        error = "a";
    }else if(req.query.error == 'b'){
        error = "b";
    }else if(req.query.error == 'c'){
        error = "c";
    }

    jogo.iniciaJogo(req, res, usuario, error);
    //res.render("jogo", {img : req.session.casa});
    

}
module.exports.sair = function(app, req, res){
    req.session.destroy(function(err,){
        res.render("index", {validar:{}});
    })
}
module.exports.pergaminhos = function(app, req, res){
    console.log("oi");
    var conect = app.config.conect;
    var jogo = new app.app.modells.Jogo(conect);

    var usuario = req.session.usuario;

    jogo.getAcoes(usuario, req, res)
    
}
module.exports.aldeoes = function(app, req, res){
        res.render("aldeoes");
}
module.exports.acaoSudito = function(app, req, res){
    var dados = req.body;

    req.assert("acao", "selecione uma ação").notEmpty();
    req.assert("quantidade", "selecione uma quantidade").notEmpty();

    var erros = req.validationErrors();
    
    if(erros){
        res.redirect("jogo?error=a");
    }else{
        var conect = app.config.conect;
        var jogo = new app.app.modells.Jogo(conect);
        
        dados.usuario = req.session.usuario;
        jogo.acao(dados);
        
        res.redirect("jogo?error=b");
    }
    
}
module.exports.revogarAcao = function(app, req, res){
    var _id = req.query._id;
    var conect = app.config.conect;
    var jogo = new app.app.modells.Jogo(conect);

    jogo.revogarAcao(_id, res);
}