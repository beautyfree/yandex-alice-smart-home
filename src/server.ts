import express from 'express';

import { cors, error, http, logger, routes } from './middlewares';

const app = express();

// Configure CORS
cors.mount(app);

// Configure http
http.mount(app);

// Configure logger
logger.mount(app);

// Configure routes
routes.mount(app);

// Configure error handlers
error.mount(app);

// Configure error handlers

// alerts();

// Configure port
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
