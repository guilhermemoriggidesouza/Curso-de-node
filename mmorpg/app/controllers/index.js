module.exports.home = function(app, req, res){
    res.render("index", {validar : {}});
}
module.exports.autenticar = function(app, req, res){
    var dados = req.body;

    req.assert("usuario", "usuario não pode ser vazio").notEmpty();
    req.assert("senha", "senha não pode ser vazia"). notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validar : erros});
    }else{
        var conect = app.config.conect;
        var usuario =  new app.app.modells.Usuarios(conect);

        usuario.autenticar(dados, req, res);
    }
}