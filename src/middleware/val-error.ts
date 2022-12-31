import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (const err of errors.array()) {
      const message: string = err.msg as string;
      return res.status(422).json({ message });
    }
  }
  next();
};