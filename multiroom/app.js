var app = require("./config/server");

var server = app.listen(3000, function(){
    console.log("server on")
})

var io = require("socket.io").listen(server);

app.set("io",io);

io.on("connection", function(socket){
    console.log("conectou");

    socket.on("disconnect", function(){
        console.log("deconectou");
    })

    socket.on("msgChat", function(data){
        socket.broadcast.emit("msgPadrao", {apelido : data.apelido, msg : data.msg});
        socket.emit("msgPadrao", {apelido : data.apelido, msg : data.msg});
        
        //socket para participantes
        if(data.relacao == 0){
            socket.broadcast.emit("chatParticipantes", {apelido : data.apelido});
            socket.emit("chatParticipantes", {apelido : data.apelido});
        }
    })
})