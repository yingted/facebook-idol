// vim:set ts=2 sw=2 et:
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var mapping = {
  '/': '/index.html',
  '/io.js': '/node_modules/socket.io/node_modules/socket.io-client/lib/io.js',
  '/webrtc.io.js': '/webrtc.io-client/lib/webrtc.io.js',
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
var webRTC = require('webrtc.io').listen(8001);
function randomRoom(){
  do {
    for (var room = ''; room.length < 3;)
      room += Math.random().toString(36)[2] || '0';
  } while (room in io.sockets.manager.rooms);
  return room;
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
