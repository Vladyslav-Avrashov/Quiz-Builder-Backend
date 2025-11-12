import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';
import type { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(createHttpError(400, error.message));
      } else {
        next(createHttpError(400, 'Invalid request body'));
      }
    }
  };

  return func;
};
