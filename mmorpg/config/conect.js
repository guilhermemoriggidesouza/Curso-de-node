var mongo = require("mongodb").MongoClient;
var assert = require("assert");
var objectID = require("mongodb").ObjectId

const url = "mongodb://localhost:27017";
const dbName = "got";

var mongodb = function(dados){
    mongo.connect(url, { useNewUrlParser: true }, function(err, client){
        assert.equal(null, err);
        console.log("conectado no banco");
        const db = client.db(dbName);
        query(db, dados);
        client.close();
    })
}
function query(db, dados){
    var collection = db.collection(dados.collection);
    //console.log(dados.collection);
    if(dados.operacao == "inserir"){
        collection.insertOne(dados.usuarios, dados.callback);
        //console.log("inseriu");
    }else if(dados.operacao == "select"){
        collection.find({usuario: dados.usuarios.usuario, senha:dados.usuarios.senha}).toArray(dados.callback);
        //console.log(dados.usuarios.usuario);
    }else if(dados.operacao == "selectAcoes"){
       //console.log(dados.usuarios);
        collection.find({usuario: dados.usuarios}).toArray(dados.callback);
    }else if(dados.operacao == "acoes"){
        console.log(dados.dados.usuario);
        collection.insertOne(dados.dados, dados.callback);
        var collectwo = db.collection("jogo");
        collectwo.updateOne({usuario: dados.dados.usuario},{$inc: {moeda: dados.dados.decMoedas}});
    }else if(dados.operacao == "selectAcoesDois"){
        var date = new Date();
        var segundosAtuais = date.getTime();
        collection.find({usuario: dados.usuarios, fimAcao: {$gt: segundosAtuais}}).toArray(dados.callback);
    }else if(dados.operacao == "remover"){
        //console.log(dados.usuarios);
        var _id = objectID(dados._id);
         collection.remove({_id: _id}, dados.callback);
    }
}
module.exports = function(){
    return mongodb;
}