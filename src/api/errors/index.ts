import { Response, NextFunction } from "express";

export const sendHttpError = async (
  error: any,
  res: Response,
  next: NextFunction
) => {
  error.isOperational
    ? res.status(error.httpCode).json({
        statusCode: error.httpCode,
        error: error.name,
        message: error.message,
        keys: error.sourceKeys,
      })
    : error.name === "MongoError"
    ? res.status(500).json(error)
    : next(error);
};
