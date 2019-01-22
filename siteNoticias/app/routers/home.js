module.exports = function(app){
    app.get("/", function(req, res){
        app.app.controller.homecont.home(app, req, res);
    });
}