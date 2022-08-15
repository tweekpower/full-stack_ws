const config = require('../../config');
const logger = require('./logger');

var MongoClient = require('mongodb').MongoClient;

module.exports = class Database {
    constructor() {
        this.db = undefined;
    }
    init = async () => {
        try {
            logger.info(`Trying to connect to ${config.db.url}/${config.db.name}`)
            this.db = await MongoClient.connect(`${config.db.url}/${config.db.name}`);
            logger.info(`MongoDb connected`);
        }
        catch (err) {
            logger.error(err);
            console.log(err)
        }
    }
    add = async (collection, value) => {
        try {
            logger.info(`Adding value to ${collection}`)
            this.db.collection(collection).insertOne(value);
        }
        catch (err) {
            logger.error(err);
            console.log(err)
        }
    }
};