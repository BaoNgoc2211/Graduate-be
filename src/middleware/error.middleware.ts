import { Request, Response, NextFunction } from "express";
// import { BadRequestError } from '../utils/appError';

// const asyncError = (fn: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next).catch(next));
//   };
// };
const asyncError = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  });
};



export default asyncError;