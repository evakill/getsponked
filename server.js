var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
 console.log('Connected to MongoDb!');
});
mongoose.connect(process.env.MONGODB_URI);


io.on('connection', function(socket) {
  console.log('connected');
  socket.on('lands', function(degree){
    io.emit('degree', degree);
  })

  socket.on('saveTask', function(item) {
    TaskModel.find({ name: item.name }, function(err, res){
      if (err) {
        console.log('Error', err);
      } else if (res.length > 0) {
        console.log('Task with that name already exists');
      } else if (item.name && item.instructions) {
        const newTask = new TaskModel({
          type: 'Group',
          name: item.name,
          instructions: item.instructions,
        });
        newTask.save((err, user) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Task Saved');
          }
        });
      }
    })
  })
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 1337;
server.listen(port, function(){
  console.log('listening on ' + port);
})
