const { createLogger, format, transports, addColors } = require('winston');
const { combine, colorize, label, timestamp, printf } = format;

let myCustomFormat = format.combine(
  colorize({ all: true }),
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
  printf(
    (info) =>
      ` ${info.label} ${info.timestamp}  [${info.level}] : ${info.message}`
  )
);

const myLevels = {
  info: 0,
  warn: 0,
  error: 0,
  debug: 0,
  ws: 0,
  http: 0,
}

addColors({
  info: 'bold blue', // fontStyle color
  warn: 'italic yellow',
  error: 'bold red',
  http: 'green',
  debug: 'green',
  ws: 'blue',
});


const logger = createLogger({
  levels: myLevels,
  transports: [new transports.Console({ format: combine(myCustomFormat) })],
});

module.exports = logger