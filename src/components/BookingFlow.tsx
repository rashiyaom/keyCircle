import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  CreditCard,
  Calendar,
  Navigation as NavIcon,
  Key,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Vehicle {
  id: number;
  name: string;
  type: string;
  image: string;
  pricePerHour: number;
  ownerName: string;
  ownerRating: number;
  verified: boolean;
  pickupLocation?: string;
  rules: {
    fuelPolicy: string;
    damagePolicy: string;
    usageRules: string[];
  };
}

interface BookingFlowProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingFlow = ({ vehicle, isOpen, onClose, onSuccess }: BookingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    startTime: "",
    duration: [2],
    pickupLocation: "",
    returnLocation: "",
    sameAsPickup: true,
    agreedToRules: false,
  });

  const totalSteps = 4;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setBookingData({
        startDate: "",
        startTime: "",
        duration: [2],
        pickupLocation: "",
        returnLocation: "",
        sameAsPickup: true,
        agreedToRules: false,
      });
    }
  }, [isOpen]);

  // Initialize pickup location from vehicle when modal opens
  useEffect(() => {
    if (isOpen && vehicle?.pickupLocation) {
      setBookingData((prev) => ({
        ...prev,
        pickupLocation: vehicle.pickupLocation || "",
      }));
    }
  }, [isOpen, vehicle]);

  if (!vehicle) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    // Handle payment and booking confirmation
    setCurrentStep(5); // Success screen
    // After showing success, call onSuccess and close
    setTimeout(() => {
      onSuccess();
      // Don't reset here - let useEffect handle it when modal closes
    }, 2500);
  };

  const handleClose = () => {
    onClose();
    // Reset will happen via useEffect when isOpen becomes false
  };

  const calculatePrice = () => {
    const basePrice = vehicle.pricePerHour * bookingData.duration[0];
    const platformFee = basePrice * 0.1; // 10% platform fee
    const securityDeposit = basePrice * 0.2; // 20% security deposit
    return {
      basePrice,
      platformFee,
      securityDeposit,
      total: basePrice + platformFee + securityDeposit,
    };
  };

  const price = calculatePrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-xl rounded-t-3xl border-t border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Book Your Ride
                  </h2>
                  <p className="text-stone-400 text-sm mt-1">{vehicle.name}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all ${
                      step <= currentStep
                        ? "bg-accent w-8"
                        : "bg-white/20 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {/* STEP 1: TIME & DURATION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-2">
                        When do you need it?
                      </h3>
                      <p className="text-stone-400">Select your start time and duration</p>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <Label className="text-white mb-2 block">Start Date</Label>
                      <Input
                        type="date"
                        value={bookingData.startDate}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, startDate: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="h-14 bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    {/* Time Picker */}
                    <div>
                      <Label className="text-white mb-2 block">Start Time</Label>
                      <Input
                        type="time"
                        value={bookingData.startTime}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, startTime: e.target.value })
                        }
                        className="h-14 bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    {/* Duration Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-white text-lg">
                          Duration: {bookingData.duration[0]} hour{bookingData.duration[0] > 1 ? "s" : ""}
                        </Label>
                        <div className="text-accent font-semibold">
                          ₹{vehicle.pricePerHour * bookingData.duration[0]}/hr
                        </div>
                      </div>

                      {/* Visual Clock Ring */}
                      <div className="relative mb-6">
                        <motion.div
                          className="w-32 h-32 mx-auto relative"
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {/* Glow effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <svg className="w-full h-full transform -rotate-90 relative z-10">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="hsl(75, 35%, 45%)"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${(bookingData.duration[0] / 12) * 351.86} 351.86`}
                              initial={false}
                              animate={{
                                strokeDasharray: `${(bookingData.duration[0] / 12) * 351.86} 351.86`,
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              style={{ filter: "drop-shadow(0 0 8px hsl(75, 35%, 45%))" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <Clock className="w-8 h-8 text-accent" />
                          </div>
                        </motion.div>
                      </div>

                      <Slider
                        value={bookingData.duration}
                        onValueChange={(value) =>
                          setBookingData({ ...bookingData, duration: value })
                        }
                        min={1}
                        max={12}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-stone-400 text-sm">
                        <span>1 hour</span>
                        <span>12 hours</span>
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white">Available for your selected time</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PICKUP & RETURN */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-2">
                        Where will you collect it?
                      </h3>
                      <p className="text-stone-400">Set pickup and return locations</p>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-white/5 rounded-2xl h-64 flex items-center justify-center border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-800/50 to-stone-900/50" />
                      <div className="relative z-10 text-center">
                        <MapPin className="w-12 h-12 text-accent mx-auto mb-3" />
                        <p className="text-stone-400">Map view will be displayed here</p>
                      </div>
                      {/* Animated Pins */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="absolute top-1/4 left-1/3 w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg z-20"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-accent/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg z-20"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-500/30"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        />
                      </motion.div>
                      {/* Route Line */}
                      <motion.svg
                        className="absolute inset-0 w-full h-full z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.path
                          d="M 25% 25% Q 50% 50% 75% 75%"
                          stroke="hsl(75, 35%, 45%)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </motion.svg>
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <Label className="text-white mb-2 block">Pickup Location</Label>
                      <Input
                        value={vehicle.pickupLocation || bookingData.pickupLocation}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, pickupLocation: e.target.value })
                        }
                        placeholder="Enter pickup location"
                        className="h-14 bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    {/* Same as Pickup Toggle */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                      <div>
                        <Label className="text-white font-semibold">Return to same location</Label>
                        <p className="text-stone-400 text-sm">Return vehicle to pickup point</p>
                      </div>
                      <Switch
                        checked={bookingData.sameAsPickup}
                        onCheckedChange={(checked) =>
                          setBookingData({ ...bookingData, sameAsPickup: checked })
                        }
                      />
                    </div>

                    {/* Return Location (if different) */}
                    {!bookingData.sameAsPickup && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Label className="text-white mb-2 block">Return Location</Label>
                        <Input
                          value={bookingData.returnLocation}
                          onChange={(e) =>
                            setBookingData({ ...bookingData, returnLocation: e.target.value })
                          }
                          placeholder="Enter return location"
                          className="h-14 bg-white/10 border-white/20 text-white"
                        />
                      </motion.div>
                    )}

                    {/* Trust Hint */}
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-stone-300 text-sm flex items-start gap-2">
                        <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        Exact location shared only after confirmation
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: OWNER RULES & CONFIRMATION */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-2">
                        Agree & Proceed
                      </h3>
                      <p className="text-stone-400">Review owner's rules and policies</p>
                    </div>

                    {/* Owner Rules Cards */}
                    <div className="space-y-4">
                      {/* Fuel Policy */}
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <NavIcon className="w-6 h-6 text-accent" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">Fuel Policy</h4>
                            <p className="text-stone-400 text-sm">
                              {vehicle.rules.fuelPolicy === "user-pays"
                                ? "You are responsible for fuel costs during rental"
                                : vehicle.rules.fuelPolicy === "owner-pays"
                                ? "Owner covers fuel costs"
                                : "Fuel costs are shared"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Damage Policy */}
                      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Shield className="w-6 h-6 text-red-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">Damage Responsibility</h4>
                            <p className="text-stone-400 text-sm">
                              {vehicle.rules.damagePolicy === "owner-insured"
                                ? "Vehicle is insured by owner"
                                : vehicle.rules.damagePolicy === "user-liable"
                                ? "You are liable for any damages"
                                : "Shared responsibility for damages"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Usage Rules */}
                      {vehicle.rules.usageRules && vehicle.rules.usageRules.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <AlertCircle className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold mb-2">Usage Rules</h4>
                              <ul className="space-y-2">
                                {vehicle.rules.usageRules.map((rule, index) => (
                                  <li key={index} className="text-stone-400 text-sm flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    <span>{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Agreement Checkbox */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/5 rounded-xl p-5 border border-white/10 cursor-pointer"
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          agreedToRules: !bookingData.agreedToRules,
                        })
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            bookingData.agreedToRules
                              ? "bg-accent border-accent"
                              : "border-white/30 bg-white/5"
                          }`}
                        >
                          {bookingData.agreedToRules && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                        <div>
                          <Label className="text-white font-semibold cursor-pointer">
                            I agree to the owner's rules
                          </Label>
                          <p className="text-stone-400 text-sm mt-1">
                            By proceeding, you acknowledge and accept all terms
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* STEP 4: FINAL REVIEW */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-3xl font-bold text-white mb-2">
                        Your Ride Summary
                      </h3>
                      <p className="text-stone-400">Review your booking details</p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                      {/* Vehicle Image & Info */}
                      <div className="flex items-start gap-4 mb-6">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg mb-1">{vehicle.name}</h4>
                          <p className="text-stone-400 text-sm capitalize">{vehicle.type}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {vehicle.verified && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400 text-xs">★</span>
                              <span className="text-stone-400 text-xs">{vehicle.ownerRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="space-y-4 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-stone-400">
                            <Calendar className="w-4 h-4" />
                            <span>Date & Time</span>
                          </div>
                          <div className="text-white text-right">
                            <p className="font-semibold">
                              {bookingData.startDate || "Not set"} at{" "}
                              {bookingData.startTime || "Not set"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-stone-400">
                            <Clock className="w-4 h-4" />
                            <span>Duration</span>
                          </div>
                          <span className="text-white font-semibold">
                            {bookingData.duration[0]} hour{bookingData.duration[0] > 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-stone-400">
                            <MapPin className="w-4 h-4" />
                            <span>Pickup</span>
                          </div>
                          <span className="text-white font-semibold text-right">
                            {vehicle.pickupLocation || bookingData.pickupLocation || "Not set"}
                          </span>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <h5 className="text-white font-semibold mb-4">Price Breakdown</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-stone-300">
                            <span>Base Price ({bookingData.duration[0]} hrs × ₹{vehicle.pricePerHour})</span>
                            <span>₹{price.basePrice}</span>
                          </div>
                          <div className="flex items-center justify-between text-stone-300">
                            <span>Platform Fee (10%)</span>
                            <span>₹{price.platformFee.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-stone-300">
                            <span>Security Deposit (20%)</span>
                            <span>₹{price.securityDeposit.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                            <span>Total</span>
                            <span className="text-accent">₹{price.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Trust Signals */}
                      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-stone-400 text-sm">
                          <Shield className="w-4 h-4" />
                          <span>Secure booking</span>
                        </div>
                        <button className="text-accent text-sm hover:underline flex items-center gap-1">
                          <HelpCircle className="w-4 h-4" />
                          Support
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS SCREEN */}
                {currentStep === 5 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Key className="w-12 h-12 text-accent" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="font-display text-4xl font-bold text-white mb-4">
                        Ride Confirmed.
                      </h3>
                      <p className="text-stone-300 mb-8 max-w-md mx-auto">
                        Your access details will be available before pickup.
                      </p>

                      <div className="bg-white/10 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
                        <div className="space-y-3">
                          <div>
                            <p className="text-stone-400 text-sm">Booking ID</p>
                            <p className="text-white font-mono">KC-{Date.now().toString().slice(-8)}</p>
                          </div>
                          <div>
                            <p className="text-stone-400 text-sm">Owner Contact</p>
                            <p className="text-white">Available after confirmation</p>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button
                          onClick={() => {
                            onSuccess();
                            handleClose();
                          }}
                          className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
                        >
                          Go to My Rides
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 &&
                          (!bookingData.startDate || !bookingData.startTime)) ||
                        (currentStep === 2 &&
                          (!bookingData.pickupLocation ||
                            (!bookingData.sameAsPickup && !bookingData.returnLocation))) ||
                        (currentStep === 3 && !bookingData.agreedToRules)
                      }
                      className="bg-accent hover:bg-accent/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleConfirm}
                      className="bg-accent hover:bg-accent/90 text-white"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Confirm & Pay
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingFlow;
