function Jogo(connection){
    this._connect = connection;
}
Jogo.prototype.gerarParametros = function(usuario, req, res){
    var dados = {
        operacao: "inserir",
        usuarios: { 
                    usuario: usuario,
                    moeda: 15,
                    suditos: 10,
                    temor: Math.floor(Math.random()*1000),
                    sabedoria: Math.floor(Math.random()*1000),
                    comercio: Math.floor(Math.random()*1000),
                    magia:  Math.floor(Math.random()*1000)
                  },
        collection: "jogo",
        callback: function(err, result) {
            //console.log(result);
            
            res.render("index", {validar: {}});
            }
        };
        
    this._connect(dados);
}
Jogo.prototype.iniciaJogo = function(req, res, dado, error){
    var dados = {
        operacao: "selectAcoes",
        usuarios: dado,
        collection: "jogo",
        callback: function(err, result) {
            res.render("jogo", {result: result, img: req.session.casa, error: error});
        }
    };
    this._connect(dados);
}
Jogo.prototype.acao = function(dadosAcao){

    var date = new Date();
    
    var tempo = 0;
    var gold = 0; 

    if(parseInt(dadosAcao.acao) == 1){
        tempo = 1*60*60000;
        gold = -2 * parseInt(dadosAcao.quantidade); 
    }else if(parseInt(dadosAcao.acao) == 2){
        tempo = 2*60*60000;
        gold = -3 * parseInt(dadosAcao.quantidade); 
    }else if(parseInt(dadosAcao.acao) == 3){
        tempo = 5*60*60000;
        gold = -1 * parseInt(dadosAcao.quantidade); 
    }else if(parseInt(dadosAcao.acao) == 4){
        tempo = 5*60*60000;
        gold = -1 * parseInt(dadosAcao.quantidade); 
    }

    dadosAcao.fimAcao = date.getTime()+tempo;
    dadosAcao.decMoedas = gold;

    var dados = {
        operacao: "acoes",
        dados: dadosAcao,
        collection: "acoes",
        callback: function(err, result) {
            //console.log(dadosAcao);
        }
    };
    this._connect(dados);
}
Jogo.prototype.getAcoes = function(dado, req, res){
    
    var dados = {
        operacao: "selectAcoesDois",
        usuarios: dado,
        collection: "acoes",
        callback: function(err, result) {
            res.render("pergaminhos", {result: result});
        }
    };
    this._connect(dados);
}
Jogo.prototype.revogarAcao = function(_id, res){
    
    var dados = {
        operacao: "remover",
        _id: _id,
        collection: "acoes",
        callback: function(err, result) {
            res.redirect("jogo?error=c");
        }
    };
    this._connect(dados);
}

module.exports = function(){
    return Jogo;
}