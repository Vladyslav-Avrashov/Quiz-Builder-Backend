import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import type { Request, Response, NextFunction } from 'express';

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(createHttpError(400, 'Route parameter :id is missing'));
  }

  if (!isValidObjectId(id)) {
    return next(createHttpError(404, `Invalid ID: ${id}`));
  }

  next();
};
