const { createLogger, format, transports } = require('winston');
import path from 'path'

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'vintage-vibes' },
  transports: [
    new transports.File({ filename: path.join(__dirname, 'error.log') }),
    new transports.File({ filename: path.join(__dirname, 'combined.log') })
  ],
});

logger.stream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};

export { logger };
