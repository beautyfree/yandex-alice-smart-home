import type { RequestHandler } from 'express';
import type core from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import type { Schema } from 'zod';
import { ZodError } from 'zod';

import type { ApiError } from '../error';
import { ErrorCode } from '../error';

export const validate =
  <
    P = core.ParamsDictionary,
    ResBody = unknown,
    ReqBody = unknown,
    ReqQuery = core.Query,
    Locals extends Record<string, unknown> = Record<string, unknown>,
  >(
    schema: Schema,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
  async (req, _res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError: ApiError = {
          name: 'ValidatorError',
          message: 'ValidatorError',
          errorCode: ErrorCode.VALIDATION_ERRORS,
          httpCode: StatusCodes.BAD_REQUEST,
          validationErrors: error.errors,
          isOperational: true,
        };

        return next(validationError);
      }

      next(error);
    }
  };
