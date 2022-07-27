import pino from 'pino';
import { config } from './config';

export const logger = pino({
    level: config.LOG_LEVEL,
    useLevel: 'debug',
    transport:
        process.env.NODE_ENV !== 'production'
            ? {
                  target: 'pino-pretty',
                  options: {
                      colorize: true
                  }
              }
            : undefined
});
