module.exports.formAddNoticias = function(app, req, res){
    res.render("admin/form_add_noticia.ejs", {validar : {}, noticia : {}});

}
module.exports.adicionarNoticias = function(app, req, res){
    let noticias = req.body;

        req.assert("titulo", "titulo é obrigatorio").notEmpty();
        req.assert("resumo", "resumo é obrigatorio").notEmpty();
        req.assert("resumo", "resumo é inválido").len(10,100);
        req.assert("autor", "autor é obrigatorio").notEmpty();
        req.assert("data", "data é obrigatoria").notEmpty(); 
        req.assert("noticia", "noticia é obrigatoria").notEmpty();
        
        var erros = req.validationErrors();
        if(erros){
            res.render("admin/form_add_noticia.ejs", {validar : erros, noticia : noticias});
            return;
        }

        let now = new Date;
        let dia = now.getDate().toString();
        let year = now.getFullYear().toString();
        let mes = now.getMonth().toString();
        let hour = now.getHours().toString();
        let minutes = now.getMinutes().toString();
        let seconds = now.getSeconds().toString();

        let data = [];
        data = [year+"-"+mes+"-"+dia+" "+hour+":"+minutes+":"+seconds, "hero"];

        let connect = app.config.dbConect();
        let adicionar = new app.app.model.NoticiasModel(connect);

        adicionar.adicionarNoticia(noticias, data, function(error, valor){
            if(error){
                res.send(error);
            }else{
                res.redirect("/noticias");
            }
        });
}