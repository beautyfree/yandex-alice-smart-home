import type { CorsOptions } from 'cors';
import configureCors from 'cors';
import type { Application } from 'express';

class CORS {
  public mount(app: Application): Application {
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
    const options: CorsOptions = {
      origin: allowedOrigins,
    };
    app.use(configureCors(options));

    return app;
  }
}

export const cors = new CORS();
