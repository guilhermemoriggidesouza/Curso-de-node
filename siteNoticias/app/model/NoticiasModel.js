
function NoticiasModel(connection){
    this._connection = connection;
}
NoticiasModel.prototype.getNoticias = function(callback){
     this._connection.query("select * from noticias order by id desc",callback);
}
NoticiasModel.prototype.getNoticia = function(id, callback){
     console.log(id.id);
     this._connection.query("select * from noticias where id = "+ id.id, callback);
}
NoticiasModel.prototype.adicionarNoticia = function(noticia, data, callback){
     this._connection.query("insert into noticias values(NULL, '"+noticia['titulo']+"','"+noticia['noticia']+"','"+data[0]+"', '"+noticia["resumo"]+"', '"+noticia["autor"]+"', '"+noticia["date"]+"')", callback);
}
NoticiasModel.prototype.getUltimasNoticias = function(callback){
     this._connection.query("select * from noticias order by id desc limit 5",callback);
}
module.exports = function(){
    return NoticiasModel;
}