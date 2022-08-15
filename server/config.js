require("dotenv").config();
const env = process.env.NODE_ENV || "dev";

const config = {
    dev: {
        server: {
            port: process.env.SERVER_PORT || 3000,
            host: process.env.SERVER_HOST || "localhost",
            logs: {
                path: "./server/logs/debug.log"
            }
        }
    }
}

module.exports = config[env];