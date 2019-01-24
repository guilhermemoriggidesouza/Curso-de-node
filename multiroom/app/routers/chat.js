module.exports = function(app){
    app.post("/chat", function(req,res){
        app.app.controllers.chatCont.chatPost(app, req, res);
    })
}