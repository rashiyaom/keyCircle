import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response.js";
import { createVehicle, deleteVehicle, getVehicleById, listVehicles, updateVehicle } from "../services/vehicles.js";

function getRouteParamId(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

export async function handleListVehicles(req: Request, res: Response): Promise<void> {
  const filters: any = {};
  if (typeof req.query.type === "string") filters.type = req.query.type;
  if (typeof req.query.available === "string") filters.available = req.query.available === "true";
  if (typeof req.query.location === "string") filters.location = req.query.location;
  if (typeof req.query.search === "string") filters.search = req.query.search;

  const limit = parseInt(req.query.limit as string, 10);
  if (!isNaN(limit)) filters.limit = limit;
  
  const offset = parseInt(req.query.offset as string, 10);
  if (!isNaN(offset)) filters.offset = offset;

  const result = await listVehicles(filters);

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to list vehicles", result.error?.details);
    return;
  }

  sendSuccess(res, result.data ?? []);
}

export async function handleGetVehicle(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Vehicle id is required");
    return;
  }

  const result = await getVehicleById(id);

  if (!result.success) {
    sendError(res, 404, result.error?.message ?? "Unable to fetch vehicle", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleCreateVehicle(req: Request, res: Response): Promise<void> {
  const { owner_id, name, type } = req.body ?? {};

  if (!owner_id || !name || !type) {
    sendError(res, 400, "Owner id, name, and type are required");
    return;
  }

  if (req.user?.userId !== owner_id) {
    sendError(res, 403, "You can only create vehicles for yourself");
    return;
  }

  const result = await createVehicle(req.body ?? {});

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to create vehicle", result.error?.details);
    return;
  }

  sendSuccess(res, result.data, 201);
}

export async function handleUpdateVehicle(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Vehicle id is required");
    return;
  }

  const existingVehicle = await getVehicleById(id);
  if (!existingVehicle.success || !existingVehicle.data) {
    sendError(res, 404, "Vehicle not found");
    return;
  }

  if (req.user?.userId !== existingVehicle.data.owner_id) {
    sendError(res, 403, "You can only update your own vehicles");
    return;
  }

  const result = await updateVehicle(id, req.body ?? {});

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to update vehicle", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleDeleteVehicle(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Vehicle id is required");
    return;
  }

  const existingVehicle = await getVehicleById(id);
  if (!existingVehicle.success || !existingVehicle.data) {
    sendError(res, 404, "Vehicle not found");
    return;
  }

  if (req.user?.userId !== existingVehicle.data.owner_id) {
    sendError(res, 403, "You can only delete your own vehicles");
    return;
  }

  const result = await deleteVehicle(id);

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to delete vehicle", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}
