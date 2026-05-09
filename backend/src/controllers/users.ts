import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response.js";
import { createUserProfile, getUserById, updateUserById } from "../services/users.js";

function getRouteParamId(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

export async function handleGetUser(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "User id is required");
    return;
  }

  const result = await getUserById(id);

  if (!result.success) {
    sendError(res, 404, result.error?.message ?? "Unable to fetch user profile", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleCreateUser(req: Request, res: Response): Promise<void> {
  const { email, full_name, phone, user_type } = req.body ?? {};

  if (!email || !full_name) {
    sendError(res, 400, "Email and full name are required");
    return;
  }

  const result = await createUserProfile({
    email,
    full_name,
    phone,
    user_type,
  });

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to create user profile", result.error?.details);
    return;
  }

  sendSuccess(res, result.data, 201);
}

export async function handleUpdateUser(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "User id is required");
    return;
  }

  const result = await updateUserById(id, req.body ?? {});

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to update user profile", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}
