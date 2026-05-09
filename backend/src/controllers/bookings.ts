import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response.js";
import {
  listBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/bookings.js";

function getRouteParamId(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }
  return null;
}

export async function handleListBookings(req: Request, res: Response): Promise<void> {
  const filters: any = {};
  if (typeof req.query.renter_id === "string") filters.renter_id = req.query.renter_id;
  if (typeof req.query.owner_id === "string") filters.owner_id = req.query.owner_id;
  if (typeof req.query.vehicle_id === "string") filters.vehicle_id = req.query.vehicle_id;
  if (typeof req.query.status === "string") filters.status = req.query.status;

  const limit = parseInt(req.query.limit as string, 10);
  if (!isNaN(limit)) filters.limit = limit;
  
  const offset = parseInt(req.query.offset as string, 10);
  if (!isNaN(offset)) filters.offset = offset;

  const result = await listBookings(filters);

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to list bookings", result.error?.details);
    return;
  }

  sendSuccess(res, result.data ?? []);
}

export async function handleGetBooking(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Booking id is required");
    return;
  }

  const result = await getBookingById(id);

  if (!result.success) {
    sendError(res, 404, result.error?.message ?? "Unable to fetch booking", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleCreateBooking(req: Request, res: Response): Promise<void> {
  const { vehicle_id, renter_id } = req.body ?? {};

  if (!vehicle_id || !renter_id) {
    sendError(res, 400, "vehicle_id and renter_id are required");
    return;
  }

  if (req.user?.userId !== renter_id) {
    sendError(res, 403, "You can only create bookings for yourself");
    return;
  }

  const result = await createBooking(req.body ?? {});

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to create booking", result.error?.details);
    return;
  }

  sendSuccess(res, result.data, 201);
}

export async function handleUpdateBooking(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Booking id is required");
    return;
  }

  const existingBooking = await getBookingById(id);
  if (!existingBooking.success || !existingBooking.data) {
    sendError(res, 404, "Booking not found");
    return;
  }

  if (req.user?.userId !== existingBooking.data.renter_id) {
    sendError(res, 403, "You can only update your own bookings");
    return;
  }

  const result = await updateBooking(id, req.body ?? {});

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to update booking", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}

export async function handleDeleteBooking(req: Request, res: Response): Promise<void> {
  const id = getRouteParamId(req.params.id);

  if (!id) {
    sendError(res, 400, "Booking id is required");
    return;
  }

  const existingBooking = await getBookingById(id);
  if (!existingBooking.success || !existingBooking.data) {
    sendError(res, 404, "Booking not found");
    return;
  }

  if (req.user?.userId !== existingBooking.data.renter_id) {
    sendError(res, 403, "You can only delete your own bookings");
    return;
  }

  const result = await deleteBooking(id);

  if (!result.success) {
    sendError(res, 400, result.error?.message ?? "Unable to delete booking", result.error?.details);
    return;
  }

  sendSuccess(res, result.data);
}
