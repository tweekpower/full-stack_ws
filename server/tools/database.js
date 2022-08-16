const config = require('../../config');
const logger = require('./logger');

const { MongoClient } = require("mongodb");

module.exports = class Database {
    constructor() {
        this.db = undefined;
    }
    init = async () => {
        const client = new MongoClient(config.db.url);
        try {
            this.db = client.db(config.db.name);
            logger.info("Connected successfully to server");
        }
        catch(err) {
            logger.error("Database fail");
            console.console.log(err);
            await client.close();
        }
    }
    addOne = async (collection, value) => {
        try {
            logger.info(`Adding value to ${collection}`);
            this.db.collection(collection).insertOne(value);
        }
        catch (err) {
            logger.error(err);
            console.log(err);
        }
    }
    getAll = async (collection) => {
        try {
            logger.info(`get all values from ${collection}`);
            return this.db.collection(collection).find({}).toArray();
        }
        catch(err) {
            logger.error(err);
            console.log(err)
        }
    }
};