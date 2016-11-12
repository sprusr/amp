var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var p2p = require('socket.io-p2p-server').Server;

io.use(p2p);

io.on('connection', function (socket) {
  socket.on('ready', function (data) {
    socket.broadcast.emit('ready', data);
  });
})

app.use(express.static('public'));

http.listen(8000, function(){
  console.log('listening on *:8000');
});
