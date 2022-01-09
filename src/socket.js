const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const Options = require('./config');

const PORT = Options.host === 'http://localhost' ? ':3000' : '';

const io = new Server(server, {
  cors: {
    origin: `${Options.host}${PORT}`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(3001, () => {
  console.log(`listening on ${Options.host}:3001`);
});
