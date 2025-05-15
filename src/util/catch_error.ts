import { Response } from "express";
import { HttpError } from "http-errors";

const catchError = (res: Response, error: unknown) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      message: error.message,
    });
    return;
  }
  console.error("Lỗi:", error);
  return res.status(500).json({
    message: `Server error ${error}`,
  });
};

export default catchError;
