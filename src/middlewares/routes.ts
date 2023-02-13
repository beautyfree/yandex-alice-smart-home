import type { Application } from 'express';

import router from '../routes';

class Routes {
  public mount(app: Application): Application {
    app.use(router);

    return app;
  }
}

export const routes = new Routes();
