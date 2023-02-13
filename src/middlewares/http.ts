import type { Application } from 'express';
import express from 'express';
import helmet from 'helmet';

class Http {
  public mount(app: Application): Application {
    app.use(express.json());
    app.use(helmet());
    app.enable('trust proxy');

    return app;
  }
}

export const http = new Http();
