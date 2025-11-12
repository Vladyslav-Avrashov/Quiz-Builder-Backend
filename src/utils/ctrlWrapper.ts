import type { Request, Response, NextFunction } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const ctrlWrapper = (ctrl: Controller): AsyncMiddleware => {
  const func: AsyncMiddleware = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
