import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MapPin, Search, Star, Shield, CheckCircle2, X, Calendar, Clock, User, Phone, Mail, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Vehicle {
  id: number;
  name: string;
  type: "bike" | "scooty" | "cycle" | "car";
  image: string;
  pricePerHour: number;
  ownerRating: number;
  ownerName: string;
  distance: string;
  verified: boolean;
  location: string;
  specs: {
    fuel: string;
    seats: number;
    transmission: string;
  };
}

interface BookingForm {
  fullName: string;
  email: string;
  phone: string;
  pickupDate: string;
  pickupTime: string;
  duration: string;
  licenseNumber: string;
  emergencyContact: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pickupDate?: string;
  pickupTime?: string;
  duration?: string;
  licenseNumber?: string;
  emergencyContact?: string;
}

const Rent = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    fullName: "",
    email: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
    duration: "1",
    licenseNumber: "",
    emergencyContact: "",
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setCurrentUser(session?.user || null);
      
      // Pre-fill user data if authenticated
      if (session?.user) {
        setBookingForm(prev => ({
          ...prev,
          email: session.user.email || "",
          fullName: session.user.user_metadata?.full_name || "",
        }));
      }
    };
    checkAuth();
  }, []);

  // Fetch vehicles from Supabase
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('available', true);

        if (error) {
          console.error('Error fetching vehicles:', error);
          return;
        }

        // Map database fields to UI format
        const mappedVehicles: Vehicle[] = (data || []).map((vehicle: any) => ({
          id: vehicle.id,
          name: vehicle.name,
          type: vehicle.type as "bike" | "scooty" | "cycle" | "car",
          image: vehicle.image_url || vehicle.images?.[0] || "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
          pricePerHour: vehicle.price_per_hour,
          ownerRating: vehicle.owner_rating || 4.5,
          ownerName: vehicle.owner_name || "Owner",
          distance: vehicle.distance || "N/A",
          verified: vehicle.verified || false,
          location: vehicle.location || "Bangalore",
          specs: {
            fuel: vehicle.fuel_type || "Petrol",
            seats: vehicle.seats || 2,
            transmission: vehicle.transmission || "Manual",
          },
        }));

        setVehicles(mappedVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateLicense = (license: string): boolean => {
    // Indian DL format: AA00 00000000000
    const licenseRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{11}$/;
    return license.length >= 10 && licenseRegex.test(license.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!bookingForm.fullName.trim() || bookingForm.fullName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters";
    }

    if (!validateEmail(bookingForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validatePhone(bookingForm.phone)) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number";
    }

    if (!bookingForm.pickupDate) {
      errors.pickupDate = "Please select a pickup date";
    } else {
      const selectedDate = new Date(bookingForm.pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.pickupDate = "Pickup date cannot be in the past";
      }
    }

    if (!bookingForm.pickupTime) {
      errors.pickupTime = "Please select a pickup time";
    }

    if (!bookingForm.duration || parseInt(bookingForm.duration) < 1) {
      errors.duration = "Duration must be at least 1 hour";
    }

    if (selectedVehicle?.type !== "cycle" && !validateLicense(bookingForm.licenseNumber)) {
      errors.licenseNumber = "Please enter a valid driving license number";
    }

    if (!validatePhone(bookingForm.emergencyContact)) {
      errors.emergencyContact = "Please enter a valid emergency contact number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsSubmitting(false);
      setShowBookingModal(false);
      setSelectedVehicle(null);
      // Show success message (you can add a toast here)
      alert('Booking request sent successfully! Owner will contact you shortly.');
      setBookingForm({
        fullName: currentUser?.user_metadata?.full_name || "",
        email: currentUser?.email || "",
        phone: "",
        pickupDate: "",
        pickupTime: "",
        duration: "1",
        licenseNumber: "",
        emergencyContact: "",
      });
    }, 2000);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType = !vehicleType || vehicle.type === vehicleType;
    const matchesLocation = !searchLocation || 
      vehicle.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-3 bg-stone-50 px-6 py-3 rounded-full border border-stone-200 mb-6">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-[#a3b87c] rounded-full animate-ping" />
                <div className="relative w-2 h-2 bg-[#a3b87c] rounded-full" />
              </div>
              <span className="text-stone-600 text-sm font-medium">Available Now</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-stone-900 mb-6 leading-[1.1]">
              Rent a Ride
              <br />
              <span className="text-stone-600">Near You</span>
            </h1>

            <p className="text-xl text-stone-600 font-body">
              Browse verified vehicles from trusted owners in your neighborhood
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white border border-stone-200 rounded-[32px] p-8 shadow-sm">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-stone-700 font-medium mb-2 block">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                >
                  <option value="">All Types</option>
                  <option value="bike">Bike</option>
                  <option value="scooty">Scooty</option>
                  <option value="cycle">Cycle</option>
                  <option value="car">Car</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="text-sm text-stone-700 font-medium mb-2 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#a3b87c]"></div>
                <p className="mt-4 text-stone-600">Loading vehicles...</p>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-stone-700">No vehicles available at the moment.</p>
                <p className="text-sm text-stone-500 mt-2">Try adjusting your search filters.</p>
              </div>
            ) : (
              filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    setShowBookingModal(true);
                  }}
                  className="group bg-white border border-stone-200 rounded-[24px] overflow-hidden hover:shadow-xl hover:border-[#a3b87c] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {vehicle.verified && (
                      <div className="absolute top-3 right-3 bg-[#a3b87c] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {vehicle.distance}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-display font-bold text-stone-900 mb-2">
                      {vehicle.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#a3b87c] text-[#a3b87c]" />
                        <span className="text-stone-900 text-sm font-medium">
                          {vehicle.ownerRating}
                        </span>
                      </div>
                      <span className="text-stone-400 text-sm">•</span>
                      <span className="text-stone-600 text-sm">{vehicle.ownerName}</span>
                    </div>

                    <div className="text-xs text-stone-500 mb-4 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {vehicle.location}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                      <div>
                        <div className="text-2xl font-display font-bold text-stone-900">
                          ₹{vehicle.pricePerHour}
                        </div>
                        <div className="text-xs text-stone-500">per hour</div>
                      </div>
                      <button className="bg-[#a3b87c] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors shadow-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 rounded-t-[32px] flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-stone-900">
                  Book {selectedVehicle.name}
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  Complete the form to request booking
                </p>
              </div>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedVehicle(null);
                  setFormErrors({});
                }}
                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>

            {/* Vehicle Summary */}
            <div className="p-6 bg-stone-50 border-b border-stone-200">
              <div className="flex gap-4">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-stone-900">
                    {selectedVehicle.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 fill-[#a3b87c] text-[#a3b87c]" />
                    <span className="text-sm text-stone-600">
                      {selectedVehicle.ownerRating} • {selectedVehicle.ownerName}
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold text-stone-900 mt-2">
                    ₹{selectedVehicle.pricePerHour}
                    <span className="text-sm font-normal text-stone-500">/hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="p-6 space-y-6">
              {/* Authentication Status */}
              {isAuthenticated && currentUser && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-900">Verified User</div>
                    <div className="text-xs text-green-700">{currentUser.email}</div>
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="text-sm font-medium text-amber-900 mb-2">
                    Please sign in to continue
                  </div>
                  <button
                    onClick={() => navigate('/auth')}
                    className="text-sm text-[#a3b87c] hover:text-[#8a9a68] font-medium"
                  >
                    Go to Sign In →
                  </button>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bookingForm.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.fullName ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.email ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.phone ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.emergencyContact ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                    {formErrors.emergencyContact && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.emergencyContact}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                  Booking Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Pickup Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={bookingForm.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full bg-stone-50 border ${
                        formErrors.pickupDate ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    />
                    {formErrors.pickupDate && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.pickupDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Pickup Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      value={bookingForm.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                      className={`w-full bg-stone-50 border ${
                        formErrors.pickupTime ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                    />
                    {formErrors.pickupTime && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.pickupTime}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Duration (hours) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={bookingForm.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      min="1"
                      className={`w-full bg-stone-50 border ${
                        formErrors.duration ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="Minimum 1 hour"
                    />
                    {formErrors.duration && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.duration}</p>
                    )}
                    <div className="mt-2 p-3 bg-stone-100 rounded-lg">
                      <div className="text-sm text-stone-700">
                        Estimated Total:{" "}
                        <span className="font-bold text-stone-900">
                          ₹{selectedVehicle.pricePerHour * (parseInt(bookingForm.duration) || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Information (not required for cycles) */}
              {selectedVehicle.type !== 'cycle' && (
                <div>
                  <h3 className="text-lg font-display font-bold text-stone-900 mb-4">
                    License Information
                  </h3>
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">
                      Driving License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={bookingForm.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value.toUpperCase())}
                      className={`w-full bg-stone-50 border ${
                        formErrors.licenseNumber ? 'border-red-500' : 'border-stone-200'
                      } rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c] focus:border-transparent transition-all`}
                      placeholder="AA00 00000000000"
                    />
                    {formErrors.licenseNumber && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.licenseNumber}</p>
                    )}
                    <p className="text-xs text-stone-500 mt-1">
                      Enter your valid Indian driving license number
                    </p>
                  </div>
                </div>
              )}

              {/* Vehicle Specs */}
              <div className="bg-stone-50 rounded-xl p-4">
                <h3 className="text-sm font-display font-bold text-stone-900 mb-3">
                  Vehicle Specifications
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-stone-500 mb-1">Fuel</div>
                    <div className="text-sm font-medium text-stone-900">
                      {selectedVehicle.specs.fuel}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-stone-500 mb-1">Seats</div>
                    <div className="text-sm font-medium text-stone-900">
                      {selectedVehicle.specs.seats}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-stone-500 mb-1">Type</div>
                    <div className="text-sm font-medium text-stone-900">
                      {selectedVehicle.specs.transmission}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleBooking}
                disabled={isSubmitting || !isAuthenticated}
                className="w-full bg-[#a3b87c] text-white py-4 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Submit Booking Request'
                )}
              </button>

              <p className="text-xs text-center text-stone-500">
                By submitting, you agree to our terms and conditions. The owner will review your
                request and contact you shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Rent;
