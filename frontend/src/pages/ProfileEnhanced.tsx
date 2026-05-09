import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  Camera,
  Save,
  X,
  Check,
  Shield,
  Edit2,
  Upload,
  Calendar,
  Home,
  AlertCircle,
  CheckCircle2,
  IdCard,
  Heart,
  Car,
} from "lucide-react";

interface UserProfile {
  // Personal Information
  id: string;
  email: string;
  full_name: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  date_of_birth: string;
  gender: "male" | "female" | "other" | "";
  avatar_url?: string;

  // Address Information
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;

  // Verification Documents
  aadhaar_number: string;
  aadhaar_verified: boolean;
  pan_number: string;
  pan_verified: boolean;

  // Driving License
  license_number: string;
  license_issue_date: string;
  license_expiry: string;
  license_state: string;
  license_verified: boolean;

  // Rental Preferences
  preferred_vehicle_types: string[];
  rental_purpose: string;
  
  // Account Status
  user_type: "student" | "general" | "premium";
  account_verified: boolean;
  profile_completion: number;
}

interface FormErrors {
  [key: string]: string;
}

export default function ProfileEnhanced() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("personal");
  
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    email: "",
    full_name: "",
    phone: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    date_of_birth: "",
    gender: "",
    avatar_url: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    aadhaar_number: "",
    aadhaar_verified: false,
    pan_number: "",
    pan_verified: false,
    license_number: "",
    license_issue_date: "",
    license_expiry: "",
    license_state: "",
    license_verified: false,
    preferred_vehicle_types: [],
    rental_purpose: "",
    user_type: "general",
    account_verified: false,
    profile_completion: 0,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Check if user is authenticated
      if (!user) {
        navigate("/signin");
        return;
      }

      // Load profile data from localStorage
      const storedProfile = localStorage.getItem(`profile_${user.id}`);
      const profileData = storedProfile ? JSON.parse(storedProfile) : {};

      const userData: UserProfile = {
        id: user.id,
        email: user.email || "",
        full_name: profileData.full_name || user.name || "",
        phone: profileData.phone || "",
        emergency_contact_name: profileData.emergency_contact_name || "",
        emergency_contact_phone: profileData.emergency_contact_phone || "",
        date_of_birth: profileData.date_of_birth || "",
        gender: profileData.gender || "",
        avatar_url: profileData.avatar_url || "",
        address_line1: profileData.address_line1 || "",
        address_line2: profileData.address_line2 || "",
        city: profileData.city || "",
        state: profileData.state || "",
        pincode: profileData.pincode || "",
        country: profileData.country || "India",
        aadhaar_number: profileData.aadhaar_number || "",
        aadhaar_verified: profileData.aadhaar_verified || false,
        pan_number: profileData.pan_number || "",
        pan_verified: profileData.pan_verified || false,
        license_number: profileData.license_number || "",
        license_issue_date: profileData.license_issue_date || "",
        license_expiry: profileData.license_expiry || "",
        license_state: profileData.license_state || "",
        license_verified: profileData.license_verified || false,
        preferred_vehicle_types: profileData.preferred_vehicle_types || [],
        rental_purpose: profileData.rental_purpose || "",
        user_type: profileData.user_type || "general",
        account_verified: profileData.account_verified || false,
        profile_completion: calculateProfileCompletion(profileData),
      };

      setFormData(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const calculateProfileCompletion = (data: any): number => {
    const fields = [
      data.full_name,
      data.phone,
      data.emergency_contact_name,
      data.emergency_contact_phone,
      data.date_of_birth,
      data.gender,
      data.address_line1,
      data.city,
      data.state,
      data.pincode,
      data.aadhaar_number,
      data.license_number,
      data.license_expiry,
    ];
    const filledFields = fields.filter(field => field && field.toString().trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  // Validation Functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateAadhaar = (aadhaar: string): boolean => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaar.replace(/\s/g, ''));
  };

  const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const validateLicense = (license: string): boolean => {
    const licenseRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{11}$/;
    return license.length >= 10 && licenseRegex.test(license.replace(/\s/g, ''));
  };

  const validatePincode = (pincode: string): boolean => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateAge = (dob: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const validateLicenseExpiry = (expiry: string): boolean => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    return expiryDate > today;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Personal Information
    if (!formData.full_name || formData.full_name.length < 3) {
      errors.full_name = "Full name must be at least 3 characters";
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = "Enter valid 10-digit mobile number starting with 6-9";
    }

    if (formData.emergency_contact_phone && !validatePhone(formData.emergency_contact_phone)) {
      errors.emergency_contact_phone = "Enter valid 10-digit mobile number";
    }

    if (formData.date_of_birth && !validateAge(formData.date_of_birth)) {
      errors.date_of_birth = "You must be at least 18 years old";
    }

    // Address Information
    if (formData.pincode && !validatePincode(formData.pincode)) {
      errors.pincode = "Enter valid 6-digit PIN code";
    }

    // Documents
    if (formData.aadhaar_number && !validateAadhaar(formData.aadhaar_number)) {
      errors.aadhaar_number = "Enter valid 12-digit Aadhaar number";
    }

    if (formData.pan_number && !validatePAN(formData.pan_number)) {
      errors.pan_number = "Enter valid PAN (e.g., ABCDE1234F)";
    }

    // License
    if (formData.license_number && !validateLicense(formData.license_number)) {
      errors.license_number = "Enter valid Indian driving license (e.g., AA00 00000000000)";
    }

    if (formData.license_expiry && !validateLicenseExpiry(formData.license_expiry)) {
      errors.license_expiry = "License expiry date must be in the future";
    }

    if (formData.license_expiry && formData.license_issue_date) {
      const issueDate = new Date(formData.license_issue_date);
      const expiryDate = new Date(formData.license_expiry);
      if (expiryDate <= issueDate) {
        errors.license_expiry = "Expiry date must be after issue date";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      const firstError = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);

    try {
      if (!user) {
        navigate("/signin");
        return;
      }

      // Calculate updated profile completion
      const updatedData = {
        ...formData,
        profile_completion: calculateProfileCompletion(formData),
      };

      // Save to localStorage
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedData));

      setFormData(updatedData);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "documents", label: "Documents", icon: Shield },
    { id: "license", label: "Driving License", icon: FileText },
    { id: "preferences", label: "Preferences", icon: Car },
  ];

  const vehicleTypes = ["Bike", "Scooty", "Cycle", "Car"];
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Puducherry", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Andaman and Nicobar Islands"
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#a3b87c] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Profile saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold text-stone-900 mb-4">
              Complete Your Profile
            </h1>
            <p className="text-xl text-stone-600">
              Provide your details to rent vehicles and build trust in the community
            </p>

            {/* Profile Completion */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-700">Profile Completion</span>
                <span className="text-2xl font-bold text-[#a3b87c]">{formData.profile_completion}%</span>
              </div>
              <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${formData.profile_completion}%` }}
                  transition={{ duration: 1 }}
                  className="absolute inset-y-0 left-0 bg-[#a3b87c] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-[#a3b87c] text-white shadow-lg'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-stone-200 rounded-[32px] p-8 shadow-sm"
          >
            {/* Personal Information */}
            {activeSection === "personal" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-6">
                  Personal Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.full_name ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="Enter your full legal name"
                    />
                    {formErrors.full_name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-stone-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-stone-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      maxLength={10}
                      className={`w-full bg-stone-50 border ${
                        formErrors.phone ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="10-digit mobile number"
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                      className={`w-full bg-stone-50 border ${
                        formErrors.date_of_birth ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    />
                    {formErrors.date_of_birth && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.date_of_birth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 border-t border-stone-200 pt-6 mt-2">
                    <h3 className="text-lg font-display font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Emergency Contact
                    </h3>
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Emergency Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergency_contact_name"
                      value={formData.emergency_contact_name}
                      onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                      placeholder="Full name of emergency contact"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Emergency Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergency_contact_phone"
                      value={formData.emergency_contact_phone}
                      onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                      maxLength={10}
                      className={`w-full bg-stone-50 border ${
                        formErrors.emergency_contact_phone ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="10-digit mobile number"
                    />
                    {formErrors.emergency_contact_phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.emergency_contact_phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Address Section */}
            {activeSection === "address" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-6">
                  Address Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address_line1"
                      value={formData.address_line1}
                      onChange={(e) => handleInputChange('address_line1', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                      placeholder="House/Flat No., Building Name"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address_line2"
                      value={formData.address_line2}
                      onChange={(e) => handleInputChange('address_line2', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                      placeholder="Street, Area, Landmark"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                    >
                      <option value="">Select state</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      maxLength={6}
                      className={`w-full bg-stone-50 border ${
                        formErrors.pincode ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="6-digit PIN code"
                    />
                    {formErrors.pincode && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.pincode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      disabled
                      className="w-full bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-stone-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Documents Section */}
            {activeSection === "documents" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-6">
                  Identity Documents
                </h2>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-900 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Your documents are securely stored and used only for verification purposes
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Aadhaar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="aadhaar_number"
                      value={formData.aadhaar_number}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handleInputChange('aadhaar_number', value);
                      }}
                      maxLength={12}
                      className={`w-full bg-stone-50 border ${
                        formErrors.aadhaar_number ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="12-digit Aadhaar number"
                    />
                    {formErrors.aadhaar_number && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.aadhaar_number}
                      </p>
                    )}
                    {formData.aadhaar_verified && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      name="pan_number"
                      value={formData.pan_number}
                      onChange={(e) => handleInputChange('pan_number', e.target.value.toUpperCase())}
                      maxLength={10}
                      className={`w-full bg-stone-50 border ${
                        formErrors.pan_number ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="ABCDE1234F"
                    />
                    {formErrors.pan_number && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.pan_number}
                      </p>
                    )}
                    {formData.pan_verified && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Driving License Section */}
            {activeSection === "license" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-6">
                  Driving License Details
                </h2>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-900 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    A valid driving license is required to rent motorized vehicles
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="license_number"
                      value={formData.license_number}
                      onChange={(e) => handleInputChange('license_number', e.target.value.toUpperCase())}
                      className={`w-full bg-stone-50 border ${
                        formErrors.license_number ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="AA00 00000000000"
                    />
                    {formErrors.license_number && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.license_number}
                      </p>
                    )}
                    {formData.license_verified && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      name="license_issue_date"
                      value={formData.license_issue_date}
                      onChange={(e) => handleInputChange('license_issue_date', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="license_expiry"
                      value={formData.license_expiry}
                      onChange={(e) => handleInputChange('license_expiry', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-stone-50 border ${
                        formErrors.license_expiry ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    />
                    {formErrors.license_expiry && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.license_expiry}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Issuing State
                    </label>
                    <select
                      name="license_state"
                      value={formData.license_state}
                      onChange={(e) => handleInputChange('license_state', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                    >
                      <option value="">Select issuing state</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === "preferences" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-stone-900 mb-6">
                  Rental Preferences
                </h2>

                <div>
                  <label className="text-sm text-stone-700 font-medium mb-3 block">
                    Preferred Vehicle Types
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {vehicleTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          const types = formData.preferred_vehicle_types.includes(type)
                            ? formData.preferred_vehicle_types.filter(t => t !== type)
                            : [...formData.preferred_vehicle_types, type];
                          handleInputChange('preferred_vehicle_types', types);
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-center ${
                          formData.preferred_vehicle_types.includes(type)
                            ? 'border-[#a3b87c] bg-[#a3b87c]/10 text-stone-900'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <Car className={`w-6 h-6 mx-auto mb-2 ${
                          formData.preferred_vehicle_types.includes(type) ? 'text-[#a3b87c]' : 'text-stone-400'
                        }`} />
                        <div className="text-sm font-medium">{type}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-stone-700 font-medium mb-2 block">
                    Primary Rental Purpose
                  </label>
                  <select
                    value={formData.rental_purpose}
                    onChange={(e) => handleInputChange('rental_purpose', e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                  >
                    <option value="">Select rental purpose</option>
                    <option value="daily-commute">Daily Commute</option>
                    <option value="weekend-trips">Weekend Trips</option>
                    <option value="business">Business Travel</option>
                    <option value="leisure">Leisure/Tourism</option>
                    <option value="emergency">Emergency Use</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-stone-200">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-stone-100 text-stone-700 py-4 rounded-xl font-medium hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#a3b87c] text-white py-4 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
