import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;

const myFormat = printf((info) => `${info.timestamp} [${__filename}] ${info.level}: ${info.message}`);

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console()],
});

export default logger;
