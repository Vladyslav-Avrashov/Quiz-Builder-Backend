import createError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = createError(404, 'Route not found');
  next(error);
};
