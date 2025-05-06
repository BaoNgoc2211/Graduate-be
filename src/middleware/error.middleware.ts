import { Request, Response, NextFunction } from "express";
// import { BadRequestError } from '../utils/appError';

const asyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next).catch(next));
  };
};
// const asyncError = (fn: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => {
//       console.error("❌ Error in async handler:", err); // 👈 Log lỗi chi tiết
//       res.status(500).json({ message: "Internal Server Error", error: err.message });
//     });
//   };
// };


export default asyncError;