import jwt from "jsonwebtoken";
import type { ApiResponse, AuthSession, AuthTokenPayload, User } from "../types/index.js";
import { createUserProfile, getUserByEmail, getUserById } from "./users.js";

const JWT_SECRET = process.env.JWT_SECRET || "keycircle-dev-secret";
const JWT_EXPIRES_IN = "7d";
const JWT_EXPIRES_SECONDS = 60 * 60 * 24 * 7;

export interface SignUpInput {
  email: string;
  full_name: string;
  phone?: string;
  user_type?: "owner" | "renter" | "both";
}

export interface LoginInput {
  email: string;
}

function toAuthSession(user: User): AuthSession {
  const payload: AuthTokenPayload = {
    userId: user.id,
    email: user.email,
    fullName: user.full_name,
  };

  return {
    token: jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
    expiresIn: JWT_EXPIRES_SECONDS,
    user,
  };
}

export async function signUp(input: SignUpInput): Promise<ApiResponse<AuthSession>> {
  const createdUserResult = await createUserProfile({
    email: input.email,
    full_name: input.full_name,
    phone: input.phone,
    user_type: input.user_type,
  });

  if (!createdUserResult.success || !createdUserResult.data) {
    return {
      success: false,
      error: createdUserResult.error ?? {
        code: "AUTH_SIGNUP_ERROR",
        message: "Unable to create user profile.",
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    data: toAuthSession(createdUserResult.data),
    timestamp: new Date().toISOString(),
  };
}

export async function login(input: LoginInput): Promise<ApiResponse<AuthSession>> {
  const userResult = await getUserByEmail(input.email);

  if (!userResult.success || !userResult.data) {
    return {
      success: false,
      error: {
        code: "AUTH_LOGIN_ERROR",
        message: "User not found. Please sign up first.",
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    data: toAuthSession(userResult.data),
    timestamp: new Date().toISOString(),
  };
}

export async function getCurrentUser(userId: string): Promise<ApiResponse<User>> {
  return getUserById(userId);
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function refreshAuthToken(user: User): AuthSession {
  return toAuthSession(user);
}
