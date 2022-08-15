const config = require("../config");

const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `
  if (metadata) {
    msg += JSON.stringify(metadata)
  }
  return msg
});

const myLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  ws: 4,
  debug: 5
};

const logger = createLogger({
  levels: myLevels,
  format: combine(
    format.colorize(),
    splat(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error'
    })
  ]
});

module.exports = logger