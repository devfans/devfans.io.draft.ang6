// lib
const winston = require('winston');
const label = winston.format.label({ label: 'devfans.io'})
const timestamp = winston.format.timestamp()
const format = winston.format.printf(info=>`${info.timestamp} [${info.label}] ${info.level}: ${typeof(info.message) == 'string'? info.message: JSON.stringify(info.message)}`)

const file = new winston.transports.File({ filename: 'devfans.log'})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    label, timestamp, format
  ),
  // format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File({ filename: 'dcemonitor-error.log', level: 'error'}),
    // new winston.transports.File({ filename: 'dcemonitor.log'})
  ]
});

logger.add(new winston.transports.Console({
    format,
    level: 'info',
    colorize: true,
    label,
    timestamp,
    prettyPrint: true,
}));

logger.prodReady = () => {
  logger.info(`Started...`)
  // logger.clear().add(file)
}

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
module.exports = logger;

