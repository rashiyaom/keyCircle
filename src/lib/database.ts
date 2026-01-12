import { supabase } from "@/lib/supabase";

// =====================================================
// TYPES
// =====================================================

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  user_type: "student" | "general";
  avatar_url: string | null;
  bio: string | null;
  date_of_birth: string | null;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  created_at: string;
  updated_at: string;
}

export interface AadhaarVerification {
  id: string;
  user_id: string;
  aadhaar_number: string;
  aadhaar_last_4: string | null;
  verified: boolean;
  verified_at: string | null;
  verification_method: string | null;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  address_type: "home" | "work" | "other";
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  method_type: "card" | "upi" | "netbanking" | "wallet";
  provider: string | null;
  last_4_digits: string | null;
  upi_id: string | null;
  account_holder_name: string | null;
  is_default: boolean;
  is_verified: boolean;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface DrivingLicense {
  id: string;
  user_id: string;
  license_number: string;
  issue_date: string;
  expiry_date: string;
  license_type: string | null;
  issuing_state: string | null;
  document_url: string | null;
  verified: boolean;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_rides: number;
  hours_saved: number;
  rating: number;
  total_reviews: number;
  rewards_points: number;
  total_spent: number;
  total_earned: number;
  created_at: string;
  updated_at: string;
}

// =====================================================
// PROFILE OPERATIONS
// =====================================================

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data;
};

export const updateProfile = async (
  userId: string,
  updates: Partial<Profile>
): Promise<boolean> => {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    return false;
  }
  return true;
};

export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  // Update profile with new avatar URL
  await updateProfile(userId, { avatar_url: publicUrl });

  return publicUrl;
};

// =====================================================
// AADHAAR VERIFICATION OPERATIONS
// =====================================================

export const getAadhaarVerification = async (
  userId: string
): Promise<AadhaarVerification | null> => {
  const { data, error } = await supabase
    .from("aadhaar_verifications")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned
    console.error("Error fetching aadhaar:", error);
    return null;
  }
  return data;
};

export const saveAadhaarVerification = async (
  userId: string,
  aadhaarNumber: string,
  verified: boolean = true
): Promise<boolean> => {
  const last4 = aadhaarNumber.slice(-4);

  const { error } = await supabase.from("aadhaar_verifications").upsert({
    user_id: userId,
    aadhaar_number: aadhaarNumber,
    aadhaar_last_4: last4,
    verified,
    verified_at: verified ? new Date().toISOString() : null,
    verification_method: "otp",
  });

  if (error) {
    console.error("Error saving aadhaar:", error);
    return false;
  }
  return true;
};

// =====================================================
// ADDRESS OPERATIONS
// =====================================================

export const getAddresses = async (userId: string): Promise<Address[]> => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_primary", { ascending: false });

  if (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
  return data || [];
};

export const getPrimaryAddress = async (
  userId: string
): Promise<Address | null> => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .eq("is_primary", true)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching primary address:", error);
    return null;
  }
  return data;
};

export const addAddress = async (
  userId: string,
  address: Omit<Address, "id" | "user_id" | "created_at" | "updated_at">
): Promise<boolean> => {
  // If this is primary, unset other primary addresses
  if (address.is_primary) {
    await supabase
      .from("addresses")
      .update({ is_primary: false })
      .eq("user_id", userId);
  }

  const { error } = await supabase.from("addresses").insert({
    user_id: userId,
    ...address,
  });

  if (error) {
    console.error("Error adding address:", error);
    return false;
  }
  return true;
};

export const updateAddress = async (
  addressId: string,
  updates: Partial<Address>
): Promise<boolean> => {
  const { error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", addressId);

  if (error) {
    console.error("Error updating address:", error);
    return false;
  }
  return true;
};

export const deleteAddress = async (addressId: string): Promise<boolean> => {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) {
    console.error("Error deleting address:", error);
    return false;
  }
  return true;
};

// =====================================================
// PAYMENT METHOD OPERATIONS
// =====================================================

export const getPaymentMethods = async (
  userId: string
): Promise<PaymentMethod[]> => {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false });

  if (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }
  return data || [];
};

export const addPaymentMethod = async (
  userId: string,
  paymentMethod: Omit<
    PaymentMethod,
    "id" | "user_id" | "created_at" | "updated_at"
  >
): Promise<boolean> => {
  // If this is default, unset other default methods
  if (paymentMethod.is_default) {
    await supabase
      .from("payment_methods")
      .update({ is_default: false })
      .eq("user_id", userId);
  }

  const { error } = await supabase.from("payment_methods").insert({
    user_id: userId,
    ...paymentMethod,
  });

  if (error) {
    console.error("Error adding payment method:", error);
    return false;
  }
  return true;
};

export const deletePaymentMethod = async (
  methodId: string
): Promise<boolean> => {
  const { error } = await supabase
    .from("payment_methods")
    .delete()
    .eq("id", methodId);

  if (error) {
    console.error("Error deleting payment method:", error);
    return false;
  }
  return true;
};

// =====================================================
// DRIVING LICENSE OPERATIONS
// =====================================================

export const getDrivingLicense = async (
  userId: string
): Promise<DrivingLicense | null> => {
  const { data, error } = await supabase
    .from("driving_licenses")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching license:", error);
    return null;
  }
  return data;
};

export const saveDrivingLicense = async (
  userId: string,
  license: Omit<DrivingLicense, "id" | "user_id" | "created_at" | "updated_at">
): Promise<boolean> => {
  const { error } = await supabase.from("driving_licenses").upsert({
    user_id: userId,
    ...license,
  });

  if (error) {
    console.error("Error saving license:", error);
    return false;
  }
  return true;
};

export const uploadLicenseDocument = async (
  userId: string,
  file: File
): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-license-${Date.now()}.${fileExt}`;
  const filePath = `licenses/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading license:", uploadError);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("documents").getPublicUrl(filePath);

  return publicUrl;
};

// =====================================================
// USER STATS OPERATIONS
// =====================================================

export const getUserStats = async (
  userId: string
): Promise<UserStats | null> => {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching stats:", error);
    return null;
  }
  return data;
};

export const updateUserStats = async (
  userId: string,
  updates: Partial<UserStats>
): Promise<boolean> => {
  const { error } = await supabase
    .from("user_stats")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating stats:", error);
    return false;
  }
  return true;
};
