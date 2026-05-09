import { Response } from "express";
import { ApiResponse } from "../types/index.js";
export const sendSuccess = (res, data, statusCode = 200, message) => {
    const response = {
        success: true,
        data,
        timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(response);
};
export const sendError = (res, statusCode = 500, message = "Internal server error", details) => {
    const response = {
        success: false,
        error: message,
        timestamp: new Date().toISOString(),
    };
    if (details) {
        response.details = details;
    }
    res.status(statusCode).json(response);
};
// Middleware for error handling
export const errorHandler = (err, req, res, next) => {
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
//# sourceMappingURL=response.js.map