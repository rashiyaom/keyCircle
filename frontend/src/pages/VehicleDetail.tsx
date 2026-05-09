import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Fuel, Users, Settings, Shield, CheckCircle2, Calendar, Clock, User, Phone, Mail, AlertCircle, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  fuel: string;
  seats: number;
  transmission: string;
  location: string;
  owner: string;
  mileage: string;
  features: string[];
  description?: string;
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

// Mock data - same source as Marketplace so vehicle IDs resolve
const allVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Honda City",
    type: "car",
    category: "Car",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop",
    rating: 4.8,
    reviews: 120,
    price: 1200,
    fuel: "Petrol",
    seats: 5,
    transmission: "Automatic",
    location: "Bangalore",
    owner: "Rajesh Kumar",
    mileage: "12 km/l",
    features: ["AC", "Power Steering", "ABS"],
    description: "Well-maintained Honda City with automatic transmission. Perfect for city drives and weekend getaways. Fully insured and sanitized after every trip.",
  },
  {
    id: 2,
    name: "Royal Enfield Bullet",
    type: "bike",
    category: "Bike",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    rating: 4.6,
    reviews: 95,
    price: 400,
    fuel: "Petrol",
    seats: 2,
    transmission: "Manual",
    location: "Bangalore",
    owner: "Arjun Singh",
    mileage: "35 km/l",
    features: ["Kickstart", "Classic Design"],
    description: "Iconic Royal Enfield Bullet — perfect for those weekend rides. Regularly serviced and in great condition.",
  },
  {
    id: 3,
    name: "Bajaj Pulsar",
    type: "bike",
    category: "Bike",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    rating: 4.5,
    reviews: 85,
    price: 350,
    fuel: "Petrol",
    seats: 2,
    transmission: "Manual",
    location: "Bangalore",
    owner: "Vikram Patil",
    mileage: "40 km/l",
    features: ["Digital Display", "LED Lights"],
    description: "Sporty Bajaj Pulsar with digital console and LED lighting. Fuel efficient and fun to ride.",
  },
  {
    id: 4,
    name: "Hyundai i20",
    type: "car",
    category: "Car",
    image: "https://images.unsplash.com/photo-1555109307-f7d9daaf91e1?w=800&h=600&fit=crop",
    rating: 4.7,
    reviews: 110,
    price: 1100,
    fuel: "Diesel",
    seats: 5,
    transmission: "Manual",
    location: "Bangalore",
    owner: "Priya Sharma",
    mileage: "15 km/l",
    features: ["AC", "Power Windows", "ABS"],
    description: "Reliable Hyundai i20 with diesel engine for great mileage. Clean interior, fully insured.",
  },
  {
    id: 5,
    name: "Ather 450X",
    type: "scooter",
    category: "Scooter",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 150,
    price: 300,
    fuel: "Electric",
    seats: 2,
    transmission: "Automatic",
    location: "Bangalore",
    owner: "Suresh Kumar",
    mileage: "100 km/charge",
    features: ["Fast Charging", "GPS Navigation"],
    description: "Premium electric scooter with fast charging and built-in GPS navigation. Zero emissions, smooth ride.",
  },
  {
    id: 6,
    name: "TVS Jupiter",
    type: "scooter",
    category: "Scooter",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop",
    rating: 4.4,
    reviews: 75,
    price: 250,
    fuel: "Petrol",
    seats: 2,
    transmission: "Automatic",
    location: "Bangalore",
    owner: "Meena Devi",
    mileage: "50 km/l",
    features: ["Fuel Efficient", "Comfortable"],
    description: "Comfortable and fuel-efficient TVS Jupiter. Perfect for daily commute and short trips.",
  },
];

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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

  useEffect(() => {
    // Load vehicle by ID
    const found = allVehicles.find((v) => String(v.id) === id);
    setVehicle(found || null);
    setLoading(false);

    // Pre-fill form if authenticated
    if (user) {
      setBookingForm((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [id, user]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!bookingForm.fullName.trim() || bookingForm.fullName.length < 3) errors.fullName = "Full name must be at least 3 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email)) errors.email = "Please enter a valid email";
    if (!/^[6-9]\d{9}$/.test(bookingForm.phone)) errors.phone = "Please enter a valid 10-digit number";
    if (!bookingForm.pickupDate) errors.pickupDate = "Please select a pickup date";
    if (!bookingForm.pickupTime) errors.pickupTime = "Please select a pickup time";
    if (!bookingForm.duration || parseInt(bookingForm.duration) < 1) errors.duration = "Duration must be at least 1 hour";
    if (vehicle?.type !== "cycle" && bookingForm.licenseNumber.length < 10) errors.licenseNumber = "Please enter a valid license number";
    if (!/^[6-9]\d{9}$/.test(bookingForm.emergencyContact)) errors.emergencyContact = "Please enter a valid emergency contact";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const ne = { ...prev };
        delete ne[field];
        return ne;
      });
    }
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: { pathname: `/vehicle/${id}` } } });
      return;
    }
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowBookingModal(false);
      alert("Booking request sent successfully! Owner will contact you shortly.");
      setBookingForm({ fullName: user?.name || "", email: user?.email || "", phone: "", pickupDate: "", pickupTime: "", duration: "1", licenseNumber: "", emergencyContact: "" });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center pt-40">
          <div className="w-16 h-16 border-4 border-stone-200 border-t-[#a3b87c] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center pt-40 gap-6">
          <h1 className="text-4xl font-display font-bold text-stone-900">Vehicle Not Found</h1>
          <p className="text-stone-600">The vehicle you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate("/marketplace")} className="px-6 py-3 bg-[#a3b87c] text-white rounded-xl font-medium hover:bg-[#8a9a68] transition-colors">
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Back Button */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors mb-6 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Image */}
          <div>
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-stone-100">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex items-center gap-1 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                <Star className="w-4 h-4 text-[#a3b87c] fill-[#a3b87c]" />
                <span className="text-sm font-bold text-stone-900">{vehicle.rating}</span>
                <span className="text-xs text-stone-500">({vehicle.reviews})</span>
              </div>
            </div>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#a3b87c] uppercase tracking-widest mb-2">{vehicle.category}</span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-stone-900 mb-3">{vehicle.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-stone-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{vehicle.location}</span>
              </div>
              <span className="text-stone-300">•</span>
              <span className="text-sm text-stone-600">by <span className="font-semibold text-stone-800">{vehicle.owner}</span></span>
            </div>

            <p className="text-stone-600 leading-relaxed mb-8">{vehicle.description || "No description available."}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                <Fuel className="w-5 h-5 text-stone-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-stone-900">{vehicle.fuel}</div>
                <div className="text-xs text-stone-500">Fuel</div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                <Users className="w-5 h-5 text-stone-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-stone-900">{vehicle.seats}</div>
                <div className="text-xs text-stone-500">Seats</div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                <Settings className="w-5 h-5 text-stone-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-stone-900">{vehicle.transmission}</div>
                <div className="text-xs text-stone-500">Transmission</div>
              </div>
              <div className="bg-stone-50 rounded-2xl p-4 text-center border border-stone-100">
                <Shield className="w-5 h-5 text-stone-400 mx-auto mb-2" />
                <div className="text-sm font-semibold text-stone-900">{vehicle.mileage}</div>
                <div className="text-xs text-stone-500">Mileage</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-display font-bold text-stone-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span key={f} className="px-4 py-2 text-sm rounded-full bg-stone-50 border border-stone-200 text-stone-700 font-medium">{f}</span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto bg-stone-50 rounded-[24px] p-6 border border-stone-200 flex items-center justify-between">
              <div>
                <div className="text-3xl font-display font-bold text-stone-900">₹{vehicle.price.toLocaleString()}</div>
                <div className="text-sm text-stone-500">per day</div>
              </div>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/signin", { state: { from: { pathname: `/vehicle/${id}` } } });
                    return;
                  }
                  setShowBookingModal(true);
                }}
                className="px-8 py-4 bg-[#a3b87c] text-white rounded-xl font-semibold text-lg hover:bg-[#8a9a68] transition-colors shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 rounded-t-[32px] flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-stone-900">Book {vehicle.name}</h2>
                <p className="text-sm text-stone-600 mt-1">Complete the form to request booking</p>
              </div>
              <button onClick={() => { setShowBookingModal(false); setFormErrors({}); }} className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-stone-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">Personal Information</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={bookingForm.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className={`w-full bg-stone-50 border ${formErrors.fullName ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="Enter your full name" />
                    {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Email <span className="text-red-500">*</span></label>
                    <input type="email" value={bookingForm.email} onChange={(e) => handleInputChange("email", e.target.value)} className={`w-full bg-stone-50 border ${formErrors.email ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="your@email.com" />
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" value={bookingForm.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className={`w-full bg-stone-50 border ${formErrors.phone ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="10-digit mobile number" maxLength={10} />
                    {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Emergency Contact <span className="text-red-500">*</span></label>
                    <input type="tel" value={bookingForm.emergencyContact} onChange={(e) => handleInputChange("emergencyContact", e.target.value)} className={`w-full bg-stone-50 border ${formErrors.emergencyContact ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="10-digit mobile number" maxLength={10} />
                    {formErrors.emergencyContact && <p className="text-xs text-red-500 mt-1">{formErrors.emergencyContact}</p>}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-display font-bold text-stone-900 mb-4">Booking Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Pickup Date <span className="text-red-500">*</span></label>
                    <input type="date" value={bookingForm.pickupDate} onChange={(e) => handleInputChange("pickupDate", e.target.value)} min={new Date().toISOString().split("T")[0]} className={`w-full bg-stone-50 border ${formErrors.pickupDate ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} />
                    {formErrors.pickupDate && <p className="text-xs text-red-500 mt-1">{formErrors.pickupDate}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Pickup Time <span className="text-red-500">*</span></label>
                    <input type="time" value={bookingForm.pickupTime} onChange={(e) => handleInputChange("pickupTime", e.target.value)} className={`w-full bg-stone-50 border ${formErrors.pickupTime ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} />
                    {formErrors.pickupTime && <p className="text-xs text-red-500 mt-1">{formErrors.pickupTime}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-stone-700 font-medium mb-2 block">Duration (hours) <span className="text-red-500">*</span></label>
                    <input type="number" value={bookingForm.duration} onChange={(e) => handleInputChange("duration", e.target.value)} min="1" className={`w-full bg-stone-50 border ${formErrors.duration ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="Minimum 1 hour" />
                    {formErrors.duration && <p className="text-xs text-red-500 mt-1">{formErrors.duration}</p>}
                    <div className="mt-2 p-3 bg-stone-100 rounded-lg">
                      <div className="text-sm text-stone-700">
                        Estimated Total: <span className="font-bold text-stone-900">₹{vehicle.price * (parseInt(bookingForm.duration) || 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* License */}
              {vehicle.type !== "cycle" && (
                <div>
                  <h3 className="text-lg font-display font-bold text-stone-900 mb-4">License Information</h3>
                  <input type="text" value={bookingForm.licenseNumber} onChange={(e) => handleInputChange("licenseNumber", e.target.value.toUpperCase())} className={`w-full bg-stone-50 border ${formErrors.licenseNumber ? "border-red-500" : "border-stone-200"} rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#a3b87c]`} placeholder="AA00 00000000000" />
                  {formErrors.licenseNumber && <p className="text-xs text-red-500 mt-1">{formErrors.licenseNumber}</p>}
                </div>
              )}

              {/* Submit */}
              <button onClick={handleBooking} disabled={isSubmitting} className="w-full bg-[#a3b87c] text-white py-4 rounded-xl font-medium hover:bg-[#8a9a68] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-lg">
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit Booking Request"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default VehicleDetail;
