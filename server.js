var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');


io.on('connection', function(socket) {
  console.log('connected');
  socket.on('lands', function(degree){
    io.emit('degree', degree);
  })
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 1337;
server.listen(port, function(){
  console.log('listening');
})
