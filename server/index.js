const config = require("./config");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const logger = require("./tools/logger");
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("hello");
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(config.server.port, () => {
    logger.ws("test");
    console.log('listening on *:' + config.server.port);
});