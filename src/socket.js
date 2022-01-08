const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
