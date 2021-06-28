import winston from 'winston';
 
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.simple(),   winston.format.printf(msg => 
    winston.format.colorize().colorize(msg.level, `${msg.level}: ${msg.message}`)
  )),
  defaultMeta: { service: 'api-server' },
  transports: [
    new winston.transports.Console(),
  ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.colorize(),
//   }));
// }

export default logger;