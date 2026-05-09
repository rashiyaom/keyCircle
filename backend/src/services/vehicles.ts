import { supabaseAdmin } from "../config/supabase.js";
import type { ApiResponse, Vehicle } from "../types/index.js";

export interface VehicleFilters {
  type?: string;
  available?: boolean;
  location?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface VehicleInput {
  owner_id: string;
  name: string;
  type: "car" | "bike" | "scooter" | "van" | "truck";
  category?: string;
  image_url?: string;
  fuel_type?: string;
  transmission?: string;
  seats?: number;
  price_per_hour?: number;
  price_per_day?: number;
  location?: string;
  available?: boolean;
  rating?: number;
  features?: string[];
}

function schemaNotReady(message = "The vehicles table is not available yet."): ApiResponse<never> {
  return {
    success: false,
    error: {
      code: "SCHEMA_NOT_READY",
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

function mapVehicleFeatures(features: string[] | undefined): string | undefined {
  return features ? features.join(",") : undefined;
}

export async function listVehicles(filters: VehicleFilters): Promise<ApiResponse<Vehicle[]>> {
  try {
    let query = supabaseAdmin.from("vehicles").select("*").order("created_at", { ascending: false });

    if (filters.type) {
      query = query.eq("type", filters.type);
    }

    if (typeof filters.available === "boolean") {
      query = query.eq("available", filters.available);
    }

    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,category.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }

    const limit = filters.limit && filters.limit > 0 ? filters.limit : 20;
    const offset = filters.offset && filters.offset >= 0 ? filters.offset : 0;
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") {
        return schemaNotReady();
      }
      throw error;
    }

    return {
      success: true,
      data: data ?? [],
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to list vehicles";
    return {
      success: false,
      error: {
        code: "VEHICLE_LIST_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getVehicleById(vehicleId: string): Promise<ApiResponse<Vehicle>> {
  try {
    const { data, error } = await supabaseAdmin.from("vehicles").select("*").eq("id", vehicleId).single();

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") {
        return schemaNotReady();
      }

      if (error.code === "PGRST116") {
        return {
          success: false,
          error: {
            code: "VEHICLE_NOT_FOUND",
            message: "Vehicle not found.",
          },
          timestamp: new Date().toISOString(),
        };
      }

      throw error;
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch vehicle";
    return {
      success: false,
      error: {
        code: "VEHICLE_FETCH_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function createVehicle(input: VehicleInput): Promise<ApiResponse<Vehicle>> {
  try {
    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .insert([
        {
          ...input,
          features: mapVehicleFeatures(input.features),
          available: input.available ?? true,
          rating: input.rating ?? 0,
        },
      ])
      .select("*")
      .single();

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") {
        return schemaNotReady();
      }
      throw error;
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create vehicle";
    return {
      success: false,
      error: {
        code: "VEHICLE_CREATE_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function updateVehicle(vehicleId: string, updates: Partial<VehicleInput>): Promise<ApiResponse<Vehicle>> {
  try {
    const payload = {
      ...updates,
      ...(updates.features ? { features: mapVehicleFeatures(updates.features) } : {}),
    };

    const { data, error } = await supabaseAdmin.from("vehicles").update(payload).eq("id", vehicleId).select("*").single();

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") {
        return schemaNotReady();
      }

      if (error.code === "PGRST116") {
        return {
          success: false,
          error: {
            code: "VEHICLE_NOT_FOUND",
            message: "Vehicle not found.",
          },
          timestamp: new Date().toISOString(),
        };
      }

      throw error;
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update vehicle";
    return {
      success: false,
      error: {
        code: "VEHICLE_UPDATE_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function deleteVehicle(vehicleId: string): Promise<ApiResponse<{ deleted: boolean }>> {
  try {
    const { error } = await supabaseAdmin.from("vehicles").delete().eq("id", vehicleId);

    if (error) {
      if (error.code === "42P01" || error.code === "PGRST205") {
        return schemaNotReady();
      }
      throw error;
    }

    return {
      success: true,
      data: { deleted: true },
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete vehicle";
    return {
      success: false,
      error: {
        code: "VEHICLE_DELETE_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
