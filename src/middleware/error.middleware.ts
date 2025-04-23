import { Request, Response, NextFunction } from "express";
// import { BadRequestError } from '../utils/appError';

const asyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next).catch(next));
  };
};

export default asyncError;