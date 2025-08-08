import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncError = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  });
};

export default asyncError;