/**
 * Aadhaar eKYC Verification Service
 * Integrates with Surepass API for Aadhaar OTP verification
 */

import axios from 'axios';

// API Configuration
const SUREPASS_BASE_URL = 'https://kyc-api.surepass.io/api/v1';
const SUREPASS_TOKEN = import.meta.env.VITE_SUREPASS_TOKEN;

// Types
export interface AadhaarOTPResponse {
  success: boolean;
  message: string;
  data?: {
    client_id: string;
    otp_sent: boolean;
    if_number: boolean;
    valid_aadhaar: boolean;
  };
  error?: string;
}

export interface AadhaarVerifyResponse {
  success: boolean;
  message: string;
  data?: {
    full_name: string;
    aadhaar_number: string;
    dob: string;
    gender: string;
    address: {
      country: string;
      dist: string;
      state: string;
      po: string;
      loc: string;
      vtc: string;
      subdist: string;
      street: string;
      house: string;
      landmark: string;
    };
    profile_image?: string;
  };
  error?: string;
}

/**
 * Validate Aadhaar number format
 */
export const validateAadhaarNumber = (aadhaar: string): boolean => {
  // Remove spaces and hyphens
  const cleanAadhaar = aadhaar.replace(/[\s-]/g, '');
  
  // Check if it's exactly 12 digits
  if (!/^\d{12}$/.test(cleanAadhaar)) {
    return false;
  }
  
  // Verhoeff algorithm for Aadhaar validation
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];
  
  let c = 0;
  const digits = cleanAadhaar.split('').reverse().map(Number);
  
  for (let i = 0; i < digits.length; i++) {
    c = d[c][p[i % 8][digits[i]]];
  }
  
  return c === 0;
};

/**
 * Format Aadhaar number with spaces (XXXX XXXX XXXX)
 */
export const formatAadhaarNumber = (aadhaar: string): string => {
  const cleaned = aadhaar.replace(/[\s-]/g, '');
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return aadhaar;
};

/**
 * Get last 4 digits of Aadhaar (for storage)
 */
export const getAadhaarLast4 = (aadhaar: string): string => {
  const cleaned = aadhaar.replace(/[\s-]/g, '');
  return cleaned.slice(-4);
};

/**
 * Mask Aadhaar number (XXXX XXXX 1234)
 */
export const maskAadhaarNumber = (aadhaar: string): string => {
  const cleaned = aadhaar.replace(/[\s-]/g, '');
  if (cleaned.length !== 12) return aadhaar;
  return `XXXX XXXX ${cleaned.slice(-4)}`;
};

/**
 * Step 1: Send OTP to Aadhaar-linked mobile number
 */
export const initiateAadhaarOTP = async (aadhaarNumber: string): Promise<AadhaarOTPResponse> => {
  try {
    // Validate Aadhaar number first
    if (!validateAadhaarNumber(aadhaarNumber)) {
      return {
        success: false,
        message: 'Invalid Aadhaar number. Please check and try again.',
        error: 'INVALID_AADHAAR',
      };
    }

    const cleanAadhaar = aadhaarNumber.replace(/[\s-]/g, '');

    // Check if API is configured
    if (!SUREPASS_TOKEN) {
      console.warn('Surepass API token not configured. Using mock mode.');
      // Mock response for development
      return {
        success: true,
        message: 'OTP sent successfully to registered mobile number',
        data: {
          client_id: `mock_${Date.now()}`,
          otp_sent: true,
          if_number: true,
          valid_aadhaar: true,
        },
      };
    }

    // Call Surepass API to send OTP
    const response = await axios.post(
      `${SUREPASS_BASE_URL}/aadhaar-v2/generate-otp`,
      {
        id_number: cleanAadhaar,
      },
      {
        headers: {
          Authorization: `Bearer ${SUREPASS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds
      }
    );

    if (response.data.success) {
      return {
        success: true,
        message: 'OTP sent successfully to your Aadhaar-linked mobile number',
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to send OTP',
        error: 'OTP_SEND_FAILED',
      };
    }
  } catch (error: any) {
    console.error('Aadhaar OTP initiation error:', error);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timeout. Please try again.',
        error: 'TIMEOUT',
      };
    }
    
    if (error.response?.status === 429) {
      return {
        success: false,
        message: 'Too many requests. Please try again after some time.',
        error: 'RATE_LIMIT',
      };
    }

    return {
      success: false,
      message: error.response?.data?.message || 'Failed to send OTP. Please try again.',
      error: 'API_ERROR',
    };
  }
};

/**
 * Step 2: Verify OTP and get Aadhaar details
 */
export const verifyAadhaarOTP = async (
  clientId: string,
  otp: string
): Promise<AadhaarVerifyResponse> => {
  try {
    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return {
        success: false,
        message: 'Invalid OTP format. Please enter 6 digits.',
        error: 'INVALID_OTP_FORMAT',
      };
    }

    // Mock mode for development
    if (!SUREPASS_TOKEN) {
      console.warn('Surepass API token not configured. Using mock mode.');
      
      // Accept test OTP: 123456
      if (otp === '123456') {
        return {
          success: true,
          message: 'Aadhaar verified successfully',
          data: {
            full_name: 'Test User',
            aadhaar_number: 'XXXX XXXX 1234',
            dob: '01-01-1990',
            gender: 'M',
            address: {
              country: 'India',
              dist: 'Test District',
              state: 'Test State',
              po: 'Test PO',
              loc: 'Test Location',
              vtc: 'Test VTC',
              subdist: 'Test Subdist',
              street: 'Test Street',
              house: '123',
              landmark: 'Near Test Landmark',
            },
          },
        };
      } else {
        return {
          success: false,
          message: 'Invalid OTP. Please try again.',
          error: 'INVALID_OTP',
        };
      }
    }

    // Call Surepass API to verify OTP
    const response = await axios.post(
      `${SUREPASS_BASE_URL}/aadhaar-v2/submit-otp`,
      {
        client_id: clientId,
        otp: otp,
      },
      {
        headers: {
          Authorization: `Bearer ${SUREPASS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    if (response.data.success) {
      return {
        success: true,
        message: 'Aadhaar verified successfully',
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'OTP verification failed',
        error: 'VERIFICATION_FAILED',
      };
    }
  } catch (error: any) {
    console.error('Aadhaar OTP verification error:', error);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        message: 'Request timeout. Please try again.',
        error: 'TIMEOUT',
      };
    }

    return {
      success: false,
      message: error.response?.data?.message || 'OTP verification failed. Please try again.',
      error: 'API_ERROR',
    };
  }
};

/**
 * Check if verification is available (API configured)
 */
export const isVerificationAvailable = (): boolean => {
  return !!SUREPASS_TOKEN || import.meta.env.DEV; // Always available in dev mode
};
