import type { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../services/auth.js";
import { sendError } from "../utils/response.js";

declare global {
  namespace Express {
    interface Request {
      user?: import("../types/index.js").AuthTokenPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    sendError(res, 401, "Authorization header is missing");
    return;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    sendError(res, 401, "Invalid authorization format. Use Bearer <token>");
    return;
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    sendError(res, 401, "Invalid or expired token");
    return;
  }

  req.user = payload;
  next();
}
