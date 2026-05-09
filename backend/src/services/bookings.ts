import { supabase } from "../config/supabase.js";

export async function listBookings(filters?: {
  renter_id?: string;
  owner_id?: string;
  vehicle_id?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase.from("bookings").select("*");

    if (filters?.renter_id) {
      query = query.eq("renter_id", filters.renter_id);
    }
    // owner_id filtering requires a join or is not supported directly without advanced postgrest features
    // If needed we can add a view or join, but for now we skip direct owner_id filter.
    if (filters?.vehicle_id) {
      query = query.eq("vehicle_id", filters.vehicle_id);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const limit = filters?.limit && filters.limit > 0 ? filters.limit : 20;
    const offset = filters?.offset && filters.offset >= 0 ? filters.offset : 0;
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: { message: error.message, details: (error as any).details } };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: { message: error.message || "Failed to list bookings", details: error } };
  }
}

export async function getBookingById(id: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { success: false, error: { message: error.message, details: (error as any).details } };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: { message: error.message || "Failed to fetch booking", details: error } };
  }
}

export async function createBooking(bookingData: any) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      return { success: false, error: { message: error.message, details: (error as any).details } };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: { message: error.message || "Failed to create booking", details: error } };
  }
}

export async function updateBooking(id: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: { message: error.message, details: (error as any).details } };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: { message: error.message || "Failed to update booking", details: error } };
  }
}

export async function deleteBooking(id: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: { message: error.message, details: (error as any).details } };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: { message: error.message || "Failed to delete booking", details: error } };
  }
}
