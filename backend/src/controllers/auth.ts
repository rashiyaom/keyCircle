import type { Request, Response } from "express";
import { verifyAuthToken, getCurrentUser, login, refreshAuthToken, signUp } from "../services/auth.js";
import { sendError, sendSuccess } from "../utils/response.js";

function getBearerToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export async function handleSignUp(req: Request, res: Response): Promise<void> {
  const { email, full_name, phone, user_type } = req.body ?? {};

  if (!email || !full_name) {
    sendError(res, 400, "Email and full name are required");
    return;
  }

  const result = await signUp({ email, full_name, phone, user_type });

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to sign up", result.error?.details);
    return;
  }

  sendSuccess(res, result.data, 201);
}

export async function handleLogin(req: Request, res: Response): Promise<void> {
  const { email } = req.body ?? {};

  if (!email) {
    sendError(res, 400, "Email is required");
    return;
  }

  const result = await login({ email });

  if (!result.success) {
    sendError(res, 404, result.error?.message ?? "Unable to log in", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleGetMe(req: Request, res: Response): Promise<void> {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    sendError(res, 401, "Authorization token is required");
    return;
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    sendError(res, 401, "Invalid or expired token");
    return;
  }

  const result = await getCurrentUser(payload.userId);
  if (!result.success) {
    sendError(res, 404, result.error?.message ?? "Unable to load user", result.error?.details);
    return;
  }

  sendSuccess(res, {
    user: result.data,
    tokenPayload: payload,
  });
}

export async function handleRefresh(req: Request, res: Response): Promise<void> {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    sendError(res, 401, "Authorization token is required");
    return;
  }

  const payload = verifyAuthToken(token);
  if (!payload) {
    sendError(res, 401, "Invalid or expired token");
    return;
  }

  const userResult = await getCurrentUser(payload.userId);
  if (!userResult.success || !userResult.data) {
    sendError(res, 404, userResult.error?.message ?? "Unable to refresh session", userResult.error?.details);
    return;
  }

  sendSuccess(res, refreshAuthToken(userResult.data));
}

export async function handleLogout(req: Request, res: Response): Promise<void> {
  sendSuccess(res, { loggedOut: true });
}
