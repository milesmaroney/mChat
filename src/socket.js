const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const Options = require('./config');
const demoData = require('./demoMessages');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

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

setInterval(() => {
  io.emit('message', {
    id: uuidv4(),
    username:
      demoData.usernames[Math.floor(Math.random() * demoData.usernames.length)],
    color: demoData.colors[Math.floor(Math.random() * demoData.colors.length)],
    timestamp: moment().format(),
    message:
      demoData.messages[Math.floor(Math.random() * demoData.messages.length)],
  });
}, 8000);

server.listen(3001, () => {
  console.log(`listening on ${Options.host}:3001`);
});
