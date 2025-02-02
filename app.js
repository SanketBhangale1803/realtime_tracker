const express = require('express');
const app = express();
const path = require('path');

const http = require('http');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server);

io.on('connection', function(socket){
    socket.on('send-location', function(data){
        io.emit('receive-location', { id: socket.id, ...data });
    });
    socket.on('disconnect', function(){
        io.emit('user-disconnected', socket.id);
    })
});

app.get('/', function(req,res){
res.render('index');
});

server.listen(3000,function(req,res){
console.log('App running on PORT 3000');
});