import { supabase } from "../config/supabase.js";
import type { ApiResponse, User } from "../types/index.js";

export interface UpdateUserProfileInput {
  full_name?: string;
  phone?: string;
  user_type?: "owner" | "renter" | "both";
  avatar_url?: string;
  verified?: boolean;
}

function isSchemaMissingError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) {
    return false;
  }

  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (error.message?.toLowerCase().includes("does not exist") ?? false)
  );
}

export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

    if (error) {
      if (isSchemaMissingError(error)) {
        return {
          success: false,
          error: {
            code: "SCHEMA_NOT_READY",
            message: "The users table is not available yet.",
          },
          timestamp: new Date().toISOString(),
        };
      }

      if (error.code === "PGRST116") {
        return {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User profile not found.",
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
    const message = err instanceof Error ? err.message : "Failed to fetch user profile";
    return {
      success: false,
      error: {
        code: "USER_FETCH_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function getUserByEmail(email: string): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

    if (error) {
      if (isSchemaMissingError(error)) {
        return {
          success: false,
          error: {
            code: "SCHEMA_NOT_READY",
            message: "The users table is not available yet.",
          },
          timestamp: new Date().toISOString(),
        };
      }

      if (error.code === "PGRST116") {
        return {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User profile not found.",
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
    const message = err instanceof Error ? err.message : "Failed to fetch user profile";
    return {
      success: false,
      error: {
        code: "USER_FETCH_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function updateUserById(
  userId: string,
  updates: UpdateUserProfileInput
): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      if (isSchemaMissingError(error)) {
        return {
          success: false,
          error: {
            code: "SCHEMA_NOT_READY",
            message: "The users table is not available yet.",
          },
          timestamp: new Date().toISOString(),
        };
      }

      if (error.code === "PGRST116") {
        return {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "User profile not found.",
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
    const message = err instanceof Error ? err.message : "Failed to update user profile";
    return {
      success: false,
      error: {
        code: "USER_UPDATE_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function createUserProfile(profile: {
  id?: string;
  email: string;
  full_name: string;
  phone?: string | undefined;
  user_type?: "owner" | "renter" | "both" | undefined;
}): Promise<ApiResponse<User>> {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          ...profile,
          user_type: profile.user_type ?? "renter",
          verified: false,
        },
      ])
      .select("*")
      .single();

    if (error) {
      if (isSchemaMissingError(error)) {
        return {
          success: false,
          error: {
            code: "SCHEMA_NOT_READY",
            message: "The users table is not available yet.",
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
    const message = err instanceof Error ? err.message : "Failed to create user profile";
    return {
      success: false,
      error: {
        code: "USER_CREATE_ERROR",
        message,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
