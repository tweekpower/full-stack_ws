const config = require("../config");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const logger = require("./tools/logger");
const path = require("path");
const Database = require("./tools/database");
const SocketRouter = require("./routings/socketRouter");
const io = new Server(server);
const db = new Database();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.send("hello");
});


server.listen(config.server.port, async () => {
    logger.info(`Server start listenning on ${config.server.host}:${config.server.port}`);
    try {
        await db.init();
        const socketRouter = new SocketRouter(io, db);
        io.on('connection', (socket) => {
            try {
            logger.ws('a user connected');
            socketRouter.setEvents(socket);
            }
            catch(err) {
                logger.error("WS initializing problem occured");
                console.log(err);
            }
        });
    }
    catch (err) {
        logger.error("Initializing problem");
        console.log(err);
    }
});