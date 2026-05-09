import type { Response } from "express";
import type { ApiResponse } from "../types/index.js";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number = 500,
  message: string = "Internal server error",
  details?: Record<string, unknown>
): void => {
  const error: NonNullable<ApiResponse<null>["error"]> = {
    code: statusCode.toString(),
    message,
  };

  if (details) {
    error.details = details;
  }

  const response: ApiResponse<null> = {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  };
  res.status(statusCode).json(response);
};

// Middleware for error handling
export const errorHandler = (
  err: any,
  req: any,
  res: Response,
  next: any
): void => {
  console.error("Error:", err);

  if (err.isJoi) {
    sendError(res, 400, "Validation error", {
      details: err.details,
    });
    return;
  }

  if (err.status === 401) {
    sendError(res, 401, "Unauthorized");
    return;
  }

  if (err.status === 403) {
    sendError(res, 403, "Forbidden");
    return;
  }

  if (err.status === 404) {
    sendError(res, 404, "Not found");
    return;
  }

  sendError(res, err.status || 500, err.message || "Internal server error");
};
