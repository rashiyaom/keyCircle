import { supabase } from "../config/supabase.js";
import type { ApiResponse } from "../types/index.js";

/**
 * Database Service
 * Handles schema setup, migrations, and connection verification
 */

interface SchemaCheckResult {
  hasUsers: boolean;
  hasVehicles: boolean;
  hasBookings: boolean;
  totalTables: number;
  status: "ready" | "needs_setup";
}

/**
 * Verify database connection
 */
export async function verifyConnection(): Promise<ApiResponse<{ connected: boolean }>> {
  try {
    const { error } = await supabase.from("users").select("id", { head: true, count: "exact" }).limit(1);

    if (error) {
      return {
        success: false,
        data: { connected: false },
        error: {
          code: "SCHEMA_NOT_READY",
          message: "Supabase is reachable, but the database schema has not been created yet.",
          details: {
            hint: "Run the initial schema migration file in backend/src/migrations/001_init_schema.sql.",
          },
        },
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data: { connected: true },
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    return {
      success: false,
      data: { connected: false },
      error: {
        code: "SCHEMA_NOT_READY",
        message: "Supabase is reachable, but the database schema has not been created yet.",
        details: {
          hint: "Run backend/src/migrations/001_init_schema.sql in Supabase.",
        },
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Check current schema status
 */
export async function checkSchemaStatus(): Promise<ApiResponse<SchemaCheckResult>> {
  try {
    // Check if main tables exist by counting records
    const tables = ["users", "vehicles", "bookings"];
    let existingTables = 0;

    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact" }).limit(1);
        if (!error) {
          existingTables++;
        }
      } catch (e) {
        // Table doesn't exist
      }
    }

    return {
      success: true,
      data: {
        hasUsers: existingTables > 0,
        hasVehicles: existingTables > 1,
        hasBookings: existingTables > 2,
        totalTables: existingTables,
        status: existingTables === 3 ? "ready" : "needs_setup",
      },
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Schema check failed";
    return {
      success: false,
      error: {
        code: "SCHEMA_CHECK_ERROR",
        message: errorMessage,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Get table row counts
 */
export async function getTableStats(): Promise<
  ApiResponse<{
    users: number;
    vehicles: number;
    bookings: number;
  }>
> {
  try {
    const tables = ["users", "vehicles", "bookings"];
    const counts: Record<string, number> = {};

    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact" }).limit(1);

        if (!error && count !== null) {
          counts[table] = count;
        }
      } catch (e) {
        counts[table] = 0;
      }
    }

    return {
      success: true,
      data: {
        users: counts["users"] || 0,
        vehicles: counts["vehicles"] || 0,
        bookings: counts["bookings"] || 0,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to get table stats";
    return {
      success: false,
      error: {
        code: "STATS_ERROR",
        message: errorMessage,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Create a test user
 */
export async function createTestUser(email: string, name: string) {
  try {
    const { data, error } = await supabase.from("users").insert([
      {
        email,
        full_name: name,
        user_type: "both",
        verified: true,
      },
    ]);

    if (error) throw error;

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to create test user";
    return {
      success: false,
      error: {
        code: "CREATE_USER_ERROR",
        message: errorMessage,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
