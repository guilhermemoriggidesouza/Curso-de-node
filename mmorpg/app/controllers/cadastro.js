module.exports.cadastro = function(app, req, res){
    res.render("cadastro", {validar : {}, dados : {}});
}
module.exports.cadastrar = function(app, req, res){
    let dadosForm = req.body;

    req.assert("nome", "nome não pode ser vazio").notEmpty();
    req.assert("usuario", "usuario não pode ser vazio").notEmpty();
    req.assert("senha", "senha não pode ser vazia").notEmpty();
    req.assert("casa", "por favor assinale uma casa").notEmpty();

    var erros =  req.validationErrors();

    if(erros){
        res.render("cadastro", {validar : erros, dados : dadosForm});
    }else{
        var conect = app.config.conect;
        var usuario =  new app.app.modells.Usuarios(conect);
        var jogo = new app.app.modells.Jogo(conect);

        usuario.inserirUser(dadosForm, req, res);
        jogo.gerarParametros(dadosForm.usuario, req, res)

        
    }
}