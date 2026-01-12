import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
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
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: "student" | "general";
  avatar_url?: string;
  aadhaar_verified: boolean;
  aadhaar_last_4?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  payment_method?: string;
  card_last_4?: string;
  license_number?: string;
  license_expiry?: string;
  license_verified: boolean;
}

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Form states for each section
  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    payment_method: "",
    card_last_4: "",
  });

  const [licenseInfo, setLicenseInfo] = useState({
    license_number: "",
    license_expiry: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/signin");
        return;
      }

      // Get user data from session and localStorage
      const storedProfile = localStorage.getItem(`profile_${session.user.id}`);
      const profileData = storedProfile ? JSON.parse(storedProfile) : {};

      const userData: UserProfile = {
        id: session.user.id,
        email: session.user.email || "",
        full_name:
          profileData.full_name ||
          session.user.user_metadata?.full_name ||
          "",
        phone: profileData.phone || session.user.user_metadata?.phone || "",
        user_type: profileData.user_type || session.user.user_metadata?.user_type || "general",
        avatar_url:
          profileData.avatar_url || session.user.user_metadata?.picture || "",
        aadhaar_verified:
          profileData.aadhaar_verified ||
          session.user.user_metadata?.aadhaar_verified ||
          false,
        aadhaar_last_4:
          profileData.aadhaar_last_4 ||
          session.user.user_metadata?.aadhaar_last_4,
        address: profileData.address || "",
        city: profileData.city || "",
        state: profileData.state || "",
        pincode: profileData.pincode || "",
        payment_method: profileData.payment_method || "",
        card_last_4: profileData.card_last_4 || "",
        license_number: profileData.license_number || "",
        license_expiry: profileData.license_expiry || "",
        license_verified: profileData.license_verified || false,
      };

      setUser(userData);
      setPersonalInfo({
        full_name: userData.full_name,
        phone: userData.phone,
        email: userData.email,
      });
      setAddressInfo({
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        pincode: userData.pincode || "",
      });
      setPaymentInfo({
        payment_method: userData.payment_method || "",
        card_last_4: userData.card_last_4 || "",
      });
      setLicenseInfo({
        license_number: userData.license_number || "",
        license_expiry: userData.license_expiry || "",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const saveToLocalStorage = (updatedData: Partial<UserProfile>) => {
    if (!user) return;

    const updatedProfile = { ...user, ...updatedData };
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
    setUser(updatedProfile);
  };

  const handleSavePersonalInfo = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call

    saveToLocalStorage({
      full_name: personalInfo.full_name,
      phone: personalInfo.phone,
    });

    setSaving(false);
    setEditMode(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveAddress = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    saveToLocalStorage(addressInfo);

    setSaving(false);
    setEditMode(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSavePayment = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    saveToLocalStorage(paymentInfo);

    setSaving(false);
    setEditMode(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveLicense = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    saveToLocalStorage({
      ...licenseInfo,
      license_verified: true,
    });

    setSaving(false);
    setEditMode(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate upload - convert to base64 for demo
    const reader = new FileReader();
    reader.onloadend = () => {
      saveToLocalStorage({ avatar_url: reader.result as string });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 pb-20">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">Changes saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-stone-200 sticky top-0 z-40 backdrop-blur-lg bg-white/80"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
            <h1 className="text-2xl font-display font-bold text-stone-900">
              My Profile
            </h1>
          </div>
          <div className="text-sm text-stone-500">Complete your profile</div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border-4 border-white shadow-lg">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-accent" />
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-accent text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                aria-label="Upload profile picture"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </label>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-display font-bold text-stone-900 mb-2">
                {user?.full_name || "Guest User"}
              </h2>
              <p className="text-stone-600 mb-3">{user?.email}</p>
              <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium capitalize">
                  {user?.user_type}
                </span>
                {user?.aadhaar_verified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Aadhaar Verified
                  </span>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-1">
                {Math.round(
                  ((user?.full_name ? 1 : 0) +
                    (user?.phone ? 1 : 0) +
                    (user?.address ? 1 : 0) +
                    (user?.payment_method ? 1 : 0) +
                    (user?.license_number ? 1 : 0) +
                    (user?.aadhaar_verified ? 1 : 0)) *
                    (100 / 6)
                )}
                %
              </div>
              <p className="text-sm text-stone-500">Complete</p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  Personal Information
                </h3>
                <p className="text-sm text-stone-500">
                  Update your personal details
                </p>
              </div>
            </div>
            {editMode !== "personal" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode("personal")}
                className="text-accent hover:text-accent/80"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          <div className="p-6">
            {editMode === "personal" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={personalInfo.full_name}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, full_name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    value={personalInfo.email}
                    disabled
                    className="w-full bg-stone-50"
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSavePersonalInfo}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(null)}
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm text-stone-500">Full Name</p>
                    <p className="text-base font-medium text-stone-900 mt-1">
                      {user?.full_name || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm text-stone-500">Phone Number</p>
                    <p className="text-base font-medium text-stone-900 mt-1">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm text-stone-500">Email Address</p>
                    <p className="text-base font-medium text-stone-900 mt-1">
                      {user?.email}
                    </p>
                  </div>
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Verified
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  Address Details
                </h3>
                <p className="text-sm text-stone-500">
                  Your residential address
                </p>
              </div>
            </div>
            {editMode !== "address" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode("address")}
                className="text-accent hover:text-accent/80"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {user?.address ? "Edit" : "Add"}
              </Button>
            )}
          </div>

          <div className="p-6">
            {editMode === "address" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Street Address
                  </label>
                  <Textarea
                    value={addressInfo.address}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, address: e.target.value })
                    }
                    placeholder="Enter your complete address"
                    rows={3}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      City
                    </label>
                    <Input
                      value={addressInfo.city}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, city: e.target.value })
                      }
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      State
                    </label>
                    <Input
                      value={addressInfo.state}
                      onChange={(e) =>
                        setAddressInfo({ ...addressInfo, state: e.target.value })
                      }
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Pincode
                  </label>
                  <Input
                    value={addressInfo.pincode}
                    onChange={(e) =>
                      setAddressInfo({ ...addressInfo, pincode: e.target.value })
                    }
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSaveAddress}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Address
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(null)}
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : user?.address ? (
              <div className="space-y-2">
                <p className="text-base text-stone-900">{user.address}</p>
                <p className="text-base text-stone-900">
                  {user.city}, {user.state} - {user.pincode}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 mb-4">No address added yet</p>
                <Button
                  variant="outline"
                  onClick={() => setEditMode("address")}
                  size="sm"
                >
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  Payment Method
                </h3>
                <p className="text-sm text-stone-500">
                  Add your payment details
                </p>
              </div>
            </div>
            {editMode !== "payment" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode("payment")}
                className="text-accent hover:text-accent/80"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                {user?.payment_method ? "Edit" : "Add"}
              </Button>
            )}
          </div>

          <div className="p-6">
            {editMode === "payment" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="payment-type" className="block text-sm font-medium text-stone-700 mb-2">
                    Payment Type
                  </label>
                  <select
                    id="payment-type"
                    value={paymentInfo.payment_method}
                    onChange={(e) =>
                      setPaymentInfo({
                        ...paymentInfo,
                        payment_method: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    aria-label="Select payment type"
                  >
                    <option value="">Select payment type</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="wallet">Wallet</option>
                  </select>
                </div>

                {paymentInfo.payment_method &&
                  paymentInfo.payment_method !== "upi" &&
                  paymentInfo.payment_method !== "wallet" && (
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Card Last 4 Digits
                      </label>
                      <Input
                        value={paymentInfo.card_last_4}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            card_last_4: e.target.value,
                          })
                        }
                        placeholder="1234"
                        maxLength={4}
                      />
                    </div>
                  )}

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSavePayment}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Payment Method
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(null)}
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : user?.payment_method ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Payment Type</p>
                  <p className="text-base font-medium text-stone-900 capitalize">
                    {user.payment_method.replace("_", " ")}
                    {user.card_last_4 && ` •••• ${user.card_last_4}`}
                  </p>
                </div>
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Added
                </span>
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 mb-4">No payment method added</p>
                <Button
                  variant="outline"
                  onClick={() => setEditMode("payment")}
                  size="sm"
                >
                  Add Payment Method
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Driving License */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  Driving License
                </h3>
                <p className="text-sm text-stone-500">
                  Required for vehicle rentals
                </p>
              </div>
            </div>
            {editMode !== "license" && !user?.license_verified && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode("license")}
                className="text-accent hover:text-accent/80"
              >
                <Upload className="w-4 h-4 mr-2" />
                {user?.license_number ? "Update" : "Upload"}
              </Button>
            )}
          </div>

          <div className="p-6">
            {editMode === "license" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    License Number
                  </label>
                  <Input
                    value={licenseInfo.license_number}
                    onChange={(e) =>
                      setLicenseInfo({
                        ...licenseInfo,
                        license_number: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="DL-1234567890123"
                    className="w-full uppercase"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={licenseInfo.license_expiry}
                    onChange={(e) =>
                      setLicenseInfo({
                        ...licenseInfo,
                        license_expiry: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Your license details will be verified
                    within 24 hours. You'll receive a notification once verified.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSaveLicense}
                    disabled={saving}
                    className="flex-1"
                  >
                    {saving ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit for Verification
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(null)}
                    disabled={saving}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : user?.license_number ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-stone-500 mb-1">License Number</p>
                    <p className="text-base font-medium text-stone-900">
                      {user.license_number}
                    </p>
                  </div>
                  {user.license_verified ? (
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-amber-600 text-sm flex items-center gap-1">
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Under Review
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Expiry Date</p>
                  <p className="text-base font-medium text-stone-900">
                    {user.license_expiry
                      ? new Date(user.license_expiry).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "Not provided"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 mb-4">No license uploaded yet</p>
                <Button
                  variant="outline"
                  onClick={() => setEditMode("license")}
                  size="sm"
                >
                  Upload License
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Aadhaar Status (Read-only) */}
        {user?.aadhaar_verified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">
                      Aadhaar Verification
                    </h3>
                    <p className="text-sm text-stone-600">
                      Verified •••• {user.aadhaar_last_4}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <Check className="w-5 h-5" />
                  Verified
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
