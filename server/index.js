const config = require("../config");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const logger = require("./tools/logger");
const path = require("path");
const Database = require("./tools/database");
const io = new Server(server);
const db = new Database();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.send("hello");
});

io.on('connection', (socket) => {
    logger.ws('a user connected');
});

server.listen(config.server.port, config.server.host, async () => {
    logger.info(`Server start listenning on ${config.server.host}:${config.server.port}`);
});