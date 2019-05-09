var express = require('express');
var bodyParser = require('body-parser');
var mongoDB = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var multiparty = require('connect-multiparty');
var fs = require('fs');
//var assert = require("assert");

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());
app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    
    next();
})

var port = 8080;

app.listen(port)

console.log("servidor ouvindo em "+port);

app.get('/', function(req, res){
    res.send({msg: 'olá'});
})
const url = "mongodb://localhost:27017";
var name = 'instagram';
var mongodb = function(dados){

    mongoDB.connect(url,{ useNewUrlParser : true }, function(err, client){
        //assert.equals(null, err);
        const db = client.db(name);
        query(db, dados);
        client.close()
    })
}
function query(db, dados){
    var collection = db.collection(dados.collection)
        if(dados.operacao == "inserir"){
            collection.insertOne(dados.dados, dados.callback);
        }else if(dados.operacao == "select"){
            collection.find().toArray(dados.callback);
        }else if(dados.operacao == "selectParams"){
            collection.find(objectId(dados.dado)).toArray(dados.callback);
        }else if(dados.operacao == "updateParams"){
            collection.updateOne({_id : objectId(dados.gett)}, 
                                {$push : {
                                        comentario : {
                                            id_comentario: new objectId(),
                                            comentario: dados.bodyy
                                        }
                                    }
                                },{}, dados.callback);
            console.log(dados.bodyy);
        }else if(dados.operacao == "deleteParams"){
            collection.updateMany({}, 
                                {$pull: {
                                        comentario : {
                                            id_comentario: dados.gett,
                                        }
                                    }
                                },{multi:true}, dados.callback);
            //console.log(dados.gett);
        }
}
app.post('/api', function(req, res){
    
    console.log(req.files);
    var date = new Date();
    var time_stamp = date.getTime();

    var nomeArquivo = time_stamp+"_"+req.files.arquivo.originalFilename;

    var path_origem = req.files.arquivo.path;
    var path_destino = "./uploads/" + nomeArquivo;
    
    fs.rename(path_origem, path_destino, function(err){
        if(err){
            res.status(500).json({error:err});
            return;
        }
        var dado ={
            url_imagem : nomeArquivo,
            titulo : req.body.titulo
        };

        var dados = {
            collection : "colectionSelect",
            operacao : "inserir",
            dados : dado,
            callback : function(err, result){
                console.log(result);
                res.send(result);
            }
        }
        mongodb(dados);
    })
    /*
    
    */
})
app.get('/api', function(req, res){
    var dados = {
        collection : "colectionSelect",
        operacao : "select",
        callback : function(err, result){
            console.log(result[0].comentario);
            res.send(result);
        }
    }
    mongodb(dados);
})
app.get('/uploads/:imagem', function(req, res){
    var img= req.params.imagem;

    fs.readFile('./uploads/'+img, function(err, content){
        if(err){
            res.status(400).json(err);
            console.log(err);
            return
        }
        res.writeHead(200, {'content-type':'image/jpg'})
        res.end(content);
    })
})
app.get('/api/:id', function(req, res){
    var dados = {
        collection : "colectionSelect",
        dado : req.params.id,
        operacao : "selectParams",
        callback : function(err, result){
            if(err){
                res.send(err);
            }else{
                res.send(result);
                console.log(req.params.id);
            }
        }
    }
    mongodb(dados);
})
app.put('/api/:id', function(req, res){
    res.header('Content-type','application/json');
    console.log(req.params.id);
    console.log(req.body.comentario);
    var dados = {
        collection : "colectionSelect",
        gett : req.params.id,
        bodyy : req.body.comentario,
        operacao : "updateParams",
        callback : function(err, result){
            if(err){
                res.send(err);
                console.log(err);
            }else{
                res.send(result);
                console.log(result);
            }
        }
    }
    mongodb(dados);
})
app.delete('/api/:id', function(req, res){
    console.log(req.params.id)
    var dados = {
        collection : "colectionSelect",
        gett : req.params.id,
        operacao : "deleteParams",
        callback : function(err, result){
            if(err){
                res.send(err);
                console.log(err);
            }else{
                res.send(result);
                console.log(result);
            }
        }
    }
    mongodb(dados);
})