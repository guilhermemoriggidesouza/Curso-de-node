function Usuarios(conect){
    this._connect = conect;
}
Usuarios.prototype.inserirUser = function(usuario, req, res){
    var dados = {
        operacao: "inserir",
        usuarios: usuario,
        collection: "usuarios",
        callback: function(err, result) {
            console.log(result);
            
            res.render("index", {validar: {}});
            }
        };
        
    this._connect(dados);
}
Usuarios.prototype.autenticar = function(dados, req, res){
    var dados = {
        operacao: "select",
        usuarios: dados,
        collection: "usuarios",
        callback: function(err, result) {
                //console.log(result);

                if(result[0] != undefined){
                    req.session.autorizar = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;

                }
                if(req.session.autorizar == true){
                    res.redirect("jogo");
                }else{
                    res.render("index", {validar: {}});
                }
            }
        };
        
    this._connect(dados);
}
module.exports = function(){
    return Usuarios;
}