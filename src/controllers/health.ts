import type { RequestHandler } from 'express';

export const healthController: RequestHandler = (_req, res) => {
  res.send({
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
};
