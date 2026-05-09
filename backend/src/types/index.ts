// User types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: "owner" | "renter" | "both";
  avatar_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// Vehicle types
export interface Vehicle {
  id: string;
  owner_id: string;
  name: string;
  type: "car" | "bike" | "scooter";
  category: string;
  image_url: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  price_per_hour: number;
  price_per_day: number;
  location: string;
  available: boolean;
  rating: number;
  features: string[];
  created_at: string;
  updated_at: string;
}

// Booking types
export interface Booking {
  id: string;
  vehicle_id: string;
  renter_id: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  pickup_location: string;
  return_location: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  fullName: string;
}

export interface AuthSession {
  token: string;
  expiresIn: number;
  user: User;
}
