module.exports.chatPost =  function(app, req, res){
    let recebidos = req.body;

    req.assert("apelido", "Nome ou apelido são obrigatorios taok?").notEmpty();
    req.assert("apelido", "a cuestão é q tem aumentar issae, ou ta mt grande, não sei to com bolsa de coco taok ?").len(3,15);
    
    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validar : erros});
        console.log(erros)
        return;
    }

    app.get("io").emit("msgPadrao", {apelido : recebidos.apelido, msg:" acabou de conectar"})

    res.render("chat", {dados : recebidos});
}
module.exports.chatGet = function(app, req, res){
    res.render("chat", {dados : recebidos});
}