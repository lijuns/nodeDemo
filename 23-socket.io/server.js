var express = require('express');
var path = require('path');
var app = express();

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.send('我是服务器');
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send('来自服务器的消息:' + msg);
    })
});

server.listen(3000);