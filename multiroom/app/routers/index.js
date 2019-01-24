module.exports = function(app){
    app.get("/", function(req,res){
        app.app.controllers.indexCont.home(app, req, res);
    })
    
}