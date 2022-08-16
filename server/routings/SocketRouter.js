const logger = require("../tools/logger");

const EVENT = {
    GET_TABLE: "getTable"
}

module.exports = class SocketRouter {
    constructor(io, db) {
        this.io = io;
        this.db = db;
    }

    setEvents = socket => {
        for (const evntKey in EVENT) {
            this.setEvent(socket, EVENT[evntKey]);
        }
    }

    setEvent = (socket, eventName) => {
        logger.ws(`set event --> ${eventName}`)
        socket.on(eventName, async payload =>  {
            console.log(eventName);
            await this.handle(eventName, this[eventName], socket, payload);
        });
    }

    handle = async (eventName, fun, socket, payload) => {
        const start = Date.now();
        logger.ws("start " + eventName)
        try {
            await fun(socket, payload);
        }
        catch(err) {
            logger.error("ws error occured");
            console.log(err);
        }
        finally {
            const millis = Date.now() - start;
            logger.ws(`ms elapsed = ${millis}`);
        }
    }

    getTable = async (socket, payload) => {
        const collectionName = payload.collection;
        const values = await this.db.getAll(collectionName);
        socket.emit(collectionName, values);
    };
};