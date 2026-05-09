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
  const result = await listVehicles({
    type: typeof req.query.type === "string" ? req.query.type : undefined,
    available:
      typeof req.query.available === "string"
        ? req.query.available === "true"
        : undefined,
    location: typeof req.query.location === "string" ? req.query.location : undefined,
    search: typeof req.query.search === "string" ? req.query.search : undefined,
  });

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

  const result = await deleteVehicle(id);

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to delete vehicle", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}
