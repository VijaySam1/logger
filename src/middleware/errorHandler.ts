import { Request, Response, NextFunction } from 'express';

export interface IError {
  name?: string;
  status?: number;
  message?: string;
}

export const methodNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err: IError = new Error('Method Not Found');
  err.status = 405;
  next(err);
};

//404 err handler
export const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
  const err: IError = new Error('Page Not Found');
  err.status = 404;
  next(err);
};

//custom err handler
export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status, message = 'something went wrong' }: IError = err;
  if (err.name == "ValidationError") {
    res.status(422).send({ message });
  }
  else if (err.name == "MongoError") {
    res.status(400).send({ message });
  } else {
    res.status(status || 500).send({ message });
  }

};