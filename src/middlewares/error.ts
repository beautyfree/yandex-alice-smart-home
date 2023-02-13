import type { Application, ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ZodIssue } from 'zod';

import { logger } from '../config/winston';

export enum ErrorCode {
  INTERNAL_ERROR = 'internal_error',
  VALIDATION_ERRORS = 'validation_errors',
}

export type ApiError = {
  httpCode?: StatusCodes;
  errorCode?: ErrorCode;
  name?: string;
  message?: string;
  validationErrors?: ZodIssue[];
  isOperational?: boolean;
};

const errorMiddleware: ErrorRequestHandler = (
  err: Error & ApiError,
  _req,
  res,
  _next,
) => {
  const status = err.httpCode || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).send({
    httpCode: status,
    errorCode: err.errorCode || ErrorCode.INTERNAL_ERROR,
    message: err.message || err.name,
    validationErrors: err.validationErrors || [],
  });
};

const errorLogger: ErrorRequestHandler = (
  err: Error & ApiError,
  _req,
  _res,
  next,
) => {
  if (err.isOperational) {
    logger.info(err);
  } else {
    logger.error(err.stack);
  }

  next(err);
};

class ErrorMiddleware {
  public mount(app: Application): Application {
    app.use(errorLogger);
    app.use(errorMiddleware);

    return app;
  }
}

export class GenericJupiterError extends Error {
  constructor(info?: string) {
    const genericMessage = 'Jupiter answered with an internal error';

    super(info || genericMessage);
  }
}

export const error = new ErrorMiddleware();
