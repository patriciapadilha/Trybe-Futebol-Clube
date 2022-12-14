import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exceptions';

const httpErrorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpException;
  if (err && status) {
    res.status(status || 500).json({ message });
  } 

};

export default httpErrorHandler;
