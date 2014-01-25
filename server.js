// vim:set ts=2 sw=2 et:
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var mapping = {
  '/': '/index.html',
  '/css/styles.css': '/css/styles.css',
  '/swfobject.js': '/swfobject.js',
};

function handler (req, res) {
  fs.readFile(__dirname + (mapping[req.url] || mapping['/']),
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

app.listen(8000);
function randomRoom(){
  do {
    for (var room = ''; room.length < 3;) // possibly increase that
      room += Math.random().toString(36)[2] || '0';
  } while (room in io.sockets.manager.rooms);
  return room;
}

io.sockets.on('connection', function (socket) {
  socket.on('new room', function (){
    var room = randomRoom();
    socket.emit('new room', room);
    join(room);
  });
  socket.on('join room', join);
  function join (room) {
    socket.join(room);
    var curSong = room + '-' + randomRoom(); // trash
    var state = 'stopped', veto = 0;
    function stop(){
      console.log('client stopped', curSong);
    }
    socket.on('start song', function(data) {
      curSong = room + '-' + data.streamId;
      veto = 0;
      console.log('client started', curSong);
      if (state == 'started')
        io.sockets.in(room).emit('stop song');
      state = 'started';
      io.sockets.in(room).emit('start song', data);
    });
    socket.on('stop song', function(data) {
      if (state == 'stopped')
        return;
      state = 'stopped';
      stop();
    });
    socket.on('vote', function(data) {
      console.log('song', curSong, 'vote', data.good);
      io.sockets.in(room).emit('vote', data);
      if ((veto += !data.good) >= 10)
        io.sockets.in(room).emit('stop song');
    });
  }
});
