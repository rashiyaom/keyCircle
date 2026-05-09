import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Car,
  Bike,
  Zap,
  Upload,
  Shield,
  CheckCircle2,
  X,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface VehicleForm {
  vehicleName: string;
  vehicleType: "bike" | "scooty" | "cycle" | "car" | "";
  registrationNumber: string;
  registrationYear: string;
  fuelType: string;
  seats: string;
  transmission: string;
  hourlyRate: string;
  location: string;
  description: string;
  ownerName: string;
  ownerPhone: string;
}

interface FormErrors {
  [key: string]: string;
}

const Share = () => {
  const navigate = useNavigate();
  const { user: authUser, isAuthenticated: authIsAuthenticated } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<VehicleForm>({
    vehicleName: "",
    vehicleType: "",
    registrationNumber: "",
    registrationYear: "",
    fuelType: "",
    seats: "",
    transmission: "",
    hourlyRate: "",
    location: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    const checkAuth = async () => {
      // Check dummy auth first
      if (authIsAuthenticated && authUser) {
        setIsAuthenticated(true);
        setCurrentUser(authUser);
        setFormData(prev => ({
          ...prev,
          ownerName: authUser.name || "",
        }));
        return;
      }

      // Fallback to Supabase
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setCurrentUser(session?.user || null);
      
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          ownerName: session.user.user_metadata?.full_name || "",
        }));
      }
    };
    checkAuth();
  }, [authUser, authIsAuthenticated]);

  const vehicleTypes = [
    { id: "bike", label: "Bike", icon: Bike },
    { id: "scooty", label: "Scooty", icon: Zap },
    { id: "cycle", label: "Cycle", icon: Bike },
    { id: "car", label: "Car", icon: Car },
  ];

  const validateRegistrationNumber = (regNo: string): boolean => {
    const regexPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    return regexPattern.test(regNo.replace(/\s/g, ''));
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateYear = (year: string): boolean => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(year);
    return yearNum >= 1990 && yearNum <= currentYear;
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.vehicleName.trim() || formData.vehicleName.length < 3) {
      errors.vehicleName = "Vehicle name must be at least 3 characters";
    }

    if (!formData.vehicleType) {
      errors.vehicleType = "Please select a vehicle type";
    }

    if (!validateRegistrationNumber(formData.registrationNumber)) {
      errors.registrationNumber = "Invalid registration number (e.g., MH12AB1234)";
    }

    if (!validateYear(formData.registrationYear)) {
      errors.registrationYear = "Enter a valid year (1990-2026)";
    }

    if (!formData.fuelType) {
      errors.fuelType = "Please select fuel type";
    }

    if (!formData.seats || parseInt(formData.seats) < 1) {
      errors.seats = "Enter valid number of seats";
    }

    if (!formData.transmission) {
      errors.transmission = "Please select transmission type";
    }

    if (!formData.hourlyRate || parseInt(formData.hourlyRate) < 10) {
      errors.hourlyRate = "Minimum hourly rate is ₹10";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.description.trim() || formData.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }

    if (!formData.ownerName.trim()) {
      errors.ownerName = "Owner name is required";
    }

    if (!validatePhone(formData.ownerPhone)) {
      errors.ownerPhone = "Enter valid 10-digit mobile number";
    }

    if (uploadedImages.length === 0) {
      errors.images = "Please upload at least one vehicle image";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof VehicleForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setUploadedImages(prev => [...prev, ...newImages]);
            if (formErrors.images) {
              setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.images;
                return newErrors;
              });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!validateForm()) {
      const firstError = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = uploadedImages[0] || "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop";
      const ownerRating = 5.0;

      const { data, error } = await supabase
        .from('vehicles')
        .insert([
          {
            name: formData.vehicleName,
            type: formData.vehicleType,
            registration_number: formData.registrationNumber,
            registration_year: parseInt(formData.registrationYear),
            fuel_type: formData.fuelType,
            seats: parseInt(formData.seats),
            transmission: formData.transmission,
            price_per_hour: parseInt(formData.hourlyRate),
            location: formData.location,
            description: formData.description,
            owner_name: formData.ownerName,
            owner_phone: formData.ownerPhone,
            owner_license: null,
            owner_rating: ownerRating,
            owner_id: currentUser?.id,
            image_url: imageUrl,
            images: uploadedImages,
            verified: true,
            available: true,
            distance: "1.0 km",
          }
        ])
        .select();

      if (error) {
        console.error('Error inserting vehicle:', error);
        alert('Failed to add vehicle. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        navigate('/marketplace');
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-display font-bold text-stone-900 mb-4">
                Vehicle Listed Successfully!
              </h1>
              <p className="text-lg text-stone-600 mb-8">
                Your {formData.vehicleName} is now available for rent. Riders can view and book it on the marketplace.
              </p>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-[#a3b87c]" />
                  <span className="text-sm font-medium text-stone-700">Verified Listing</span>
                </div>
                <p className="text-sm text-stone-600">
                  Your vehicle will appear in both Rent and Marketplace sections immediately.
                </p>
              </div>
              <button
                onClick={() => navigate('/marketplace')}
                className="bg-[#a3b87c] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors shadow-lg"
              >
                View in Marketplace
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-stone-50 px-6 py-3 rounded-full border border-stone-200 mb-6">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-[#a3b87c] rounded-full animate-ping" />
                <div className="relative w-2 h-2 bg-[#a3b87c] rounded-full" />
              </div>
              <span className="text-stone-600 text-sm font-medium">Earn Money</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-display font-bold text-stone-900 mb-6 leading-[1.1]">
              Share Your Ride<br /><span className="text-stone-600">Earn Extra Income</span>
            </h1>
            <p className="text-xl text-stone-600 font-body max-w-2xl mx-auto">
              List your vehicle and start earning money when you're not using it
            </p>
          </div>
          {!isAuthenticated && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div><div className="text-sm font-medium text-amber-900 mb-1">Sign in required</div>
                  <button onClick={() => navigate('/auth')} className="text-sm text-[#a3b87c] hover:text-[#8a9a68] font-medium">Go to Sign In →</button>
                </div>
              </div>
            </div>
          )}
          {isAuthenticated && currentUser && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div><div className="text-sm font-medium text-green-900">Verified Owner</div><div className="text-xs text-green-700">{currentUser.email}</div></div>
              </div>
            </div>
          )}
          <div className="bg-white border border-stone-200 rounded-[32px] p-8 shadow-sm">
            <div className="space-y-8">
              {/* Vehicle Type Selection */}
              <div>
                <label className="text-lg font-display font-bold text-stone-900 mb-4 block">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleInputChange('vehicleType', type.id as any)}
                      className={`p-6 rounded-2xl border-2 transition-all ${
                        formData.vehicleType === type.id
                          ? 'border-[#a3b87c] bg-[#a3b87c]/5'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <type.icon className={`w-8 h-8 mx-auto mb-3 ${
                        formData.vehicleType === type.id ? 'text-[#a3b87c]' : 'text-stone-400'
                      }`} />
                      <div className={`text-sm font-medium ${
                        formData.vehicleType === type.id ? 'text-stone-900' : 'text-stone-600'
                      }`}>
                        {type.label}
                      </div>
                    </button>
                  ))}
                </div>
                {formErrors.vehicleType && (
                  <p className="text-xs text-red-500 mt-2">{formErrors.vehicleType}</p>
                )}
              </div>

              {/* Vehicle Details */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Vehicle Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Vehicle Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="vehicleName"
                      value={formData.vehicleName}
                      onChange={(e) => handleInputChange('vehicleName', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.vehicleName ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="e.g., Honda Activa 6G"
                    />
                    {formErrors.vehicleName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.vehicleName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value.toUpperCase())}
                      className={`w-full bg-stone-50 border ${
                        formErrors.registrationNumber ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="MH12AB1234"
                    />
                    {formErrors.registrationNumber && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.registrationNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Registration Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="registrationYear"
                      value={formData.registrationYear}
                      onChange={(e) => handleInputChange('registrationYear', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.registrationYear ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="2024"
                      min="1990"
                      max="2026"
                    />
                    {formErrors.registrationYear && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.registrationYear}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Fuel Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={(e) => handleInputChange('fuelType', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.fuelType ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    >
                      <option value="">Select fuel type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Manual">Manual (Cycle)</option>
                    </select>
                    {formErrors.fuelType && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.fuelType}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Number of Seats <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={(e) => handleInputChange('seats', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.seats ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="2"
                      min="1"
                    />
                    {formErrors.seats && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.seats}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Transmission <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.transmission ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    >
                      <option value="">Select transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                    {formErrors.transmission && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.transmission}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing & Location */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Pricing & Location
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Hourly Rate (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.hourlyRate ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="150"
                      min="10"
                    />
                    {formErrors.hourlyRate && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.hourlyRate}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.location ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="Koramangala, Bangalore"
                    />
                    {formErrors.location && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.location}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full bg-stone-50 border ${
                        formErrors.description ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all resize-none`}
                      placeholder="Describe your vehicle, its condition, and any special features..."
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Owner Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.ownerName ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="Your full name"
                    />
                    {formErrors.ownerName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.ownerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.ownerPhone ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {formErrors.ownerPhone && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.ownerPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Vehicle Images <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-4">
                  <label className="block">
                    <div className={`border-2 border-dashed ${
                      formErrors.images ? 'border-red-500' : 'border-stone-300'
                    } rounded-2xl p-8 text-center hover:border-[#a3b87c] transition-all cursor-pointer bg-stone-50`}>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-stone-400" />
                      <p className="text-stone-700 font-medium mb-2">
                        Click to upload vehicle images
                      </p>
                      <p className="text-sm text-stone-500">
                        Upload clear photos of your vehicle (PNG, JPG up to 10MB each)
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {formErrors.images && (
                    <p className="text-xs text-red-500">{formErrors.images}</p>
                  )}

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border-2 border-stone-200">
                          <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isAuthenticated}
                  className="w-full bg-[#a3b87c] text-white py-4 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Listing Your Vehicle...
                    </span>
                  ) : (
                    'List My Vehicle'
                  )}
                </button>
                <p className="text-xs text-center text-stone-500 mt-4">
                  By submitting, you agree to our terms and conditions. Your vehicle will be verified before going live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Share;
