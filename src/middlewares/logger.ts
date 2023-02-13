import type { Application } from 'express';
import morgan from 'morgan';

import { stream } from '../config/winston';

class Logger {
  public mount(app: Application): Application {
    switch (process.env.NODE_ENV) {
      case 'development':
        app.use(morgan('dev', { stream }));

        break;
      case 'production':
        app.use(morgan('common', { stream }));

        break;
      default:
        app.use(morgan('tiny', { stream }));
    }

    return app;
  }
}

export const logger = new Logger();
