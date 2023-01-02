/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response, NextFunction } from 'express';
import { LogType } from '../constants/Log_Type.enum';
import { ActionKey } from '../constants/action_key.enum';
import { GenericType } from '../constants/generic_type.enum';
import LOGGER from '../models/logger';
import { IError } from '../middleware/errorHandler';
import moment from 'moment';
//req .body interface
interface ILogger {
  user_id: string, device_id: string, generic_id: string, generic_type: GenericType, action_key: ActionKey, action_value: string, log_type: LogType
}
// PaginationParams interface
interface IPaginationParams {
  from: string,
  to: string,
  page: number,
  limit: number,
}

// create a new log
export const postLog = (req: Request, res: Response, next: NextFunction) => {
  const requestBody: ILogger = req.body as ILogger;
  LOGGER.create(requestBody)
    .then(() => {
      res.status(200).send({ message: "Added successfully" });
    })
    .catch((error: IError) => {
      if (error.name == "ValidationError") {
        next(new Error('Failed to add logger'));
      } next(error);
    });

};

//get log with pagination
export const getLogs = (req: Request, res: Response, next: NextFunction) => {
  
  const requestQuery: IPaginationParams = req.query as unknown as IPaginationParams;
  const { from, to, page, limit } = requestQuery;

  if (from && to && page && limit) {
    const fromDate = new Date(from) ;
    const toDate = new Date(to);
    
    const aggregateQuery = LOGGER.aggregate([{
      $match:
      {
        createdAt:
        {
          '$gte': fromDate,
          '$lte': toDate,
        },
      },
    },
    ]);
    const options = {
      page: page,
      limit: limit,
    };
    LOGGER.aggregatePaginate(aggregateQuery, options, (err, result) => {
      if (err) {
        next(err);
      } else {
      res.status(200).json({ message: "success", data: result });
      //res.render("logs",{result});
      }
    });
  } else {
    res.status(422).send({ message: "Unprocessable entry" });
  }

};




// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
// const fromDate = moment(req.query.from as string,'YYYY-MM-DD[T]HH:mm:ss.Dz SS:SS').format('YYYY-MM-DD[T]HH:mm:ss.Dz+SS:SS') ?? new Date().valueOf();
// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
// const toDate =  moment(req.query.to as string,'YYYY-MM-DD[T]HH:mm:ss SS:SS').format('YYYY-MM-DD[T]HH:mm:ss+SS:SS') ?? new Date(new Date().getTime() - (1000 * 60 * 60)).valueOf();
// const fromDate= new Date(from) ?? new Date();
// const toDate = new Date(to)?? new Date(new Date().getTime() - (1000 * 60 * 60));

// const options = {
//   page: parseInt(req.params.page) || 1,
//   limit: parseInt(req.params.limit) || 10,
// };


export const filter = (req: Request, res: Response, next: NextFunction) => {
  const requestBody: IPaginationParams = req.body as unknown as IPaginationParams;
  const { from, to, page, limit } = requestBody;
  const fromDate=new Date(from);
  const toDate=new Date(to);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  res.status(300).redirect(`/api/log?from=${fromDate}&to=${toDate}&page=${page}&limit=${limit}`);
}
