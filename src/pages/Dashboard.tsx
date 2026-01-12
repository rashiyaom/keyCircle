import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  User, 
  Car, 
  Key, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Camera,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  Award,
  TrendingUp,
  Clock,
  Star,
  CreditCard,
  FileText
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  user_type: "student" | "general";
  aadhaar_verified: boolean;
  aadhaar_last_4?: string;
  avatar_url?: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"rent" | "share">("rent");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        navigate("/signin");
        return;
      }

      const userData: UserProfile = {
        id: session.user.id,
        email: session.user.email || "",
        full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "User",
        phone: session.user.user_metadata?.phone || "",
        user_type: session.user.user_metadata?.user_type || "general",
        aadhaar_verified: session.user.user_metadata?.aadhaar_verified || false,
        aadhaar_last_4: session.user.user_metadata?.aadhaar_last_4 || "",
        avatar_url: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || "",
        created_at: session.user.created_at,
      };

      setUser(userData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  const profileCompletion = () => {
    let completion = 0;
    if (user?.full_name) completion += 20;
    if (user?.email) completion += 20;
    if (user?.phone) completion += 20;
    if (user?.aadhaar_verified) completion += 20;
    if (user?.avatar_url) completion += 20;
    return completion;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-stone-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg"
                >
                  <Key className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-foreground">keyCircle</h1>
                  <p className="text-sm text-muted-foreground">Welcome back, {user?.full_name?.split(" ")[0]}!</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center relative"
                >
                  <Bell className="w-5 h-5 text-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/settings")}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
                >
                  <Settings className="w-5 h-5 text-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Hero Section - Rent or Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent via-accent/90 to-accent/80 p-8 md:p-12 shadow-2xl"
          >
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-4 mb-8"
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  What brings you here today?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Choose your journey and unlock endless possibilities with keyCircle
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Rent a Ride Card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/rent")}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 text-left shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Car className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Rent a Ride
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Browse through hundreds of vehicles from bikes to cars. Choose your perfect ride, book instantly, and hit the road in minutes.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <span>Explore Rides</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.button>

                {/* Share Your Vehicle Card */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/share")}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 text-left shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Key className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Share Your Vehicle
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Turn your idle vehicle into income. List it on keyCircle, set your price, and earn money while helping others travel.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <span>Start Earning</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-white rotate-45" />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: TrendingUp, label: "Total Rides", value: "0", color: "blue" },
              { icon: Clock, label: "Hours Saved", value: "0h", color: "green" },
              { icon: Star, label: "Rating", value: "New", color: "yellow" },
              { icon: Award, label: "Rewards", value: "0", color: "purple" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-border/50"
              >
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-[2.5rem] shadow-xl border border-border/50 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-bold text-foreground">Your Profile</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/profile")}
                  className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:shadow-lg transition-all"
                >
                  Edit Profile
                </motion.button>
              </div>

              {/* Profile Completion */}
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">Profile Completion</span>
                  <span className="text-2xl font-bold text-accent">{profileCompletion()}%</span>
                </div>
                <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${profileCompletion()}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent/80 rounded-full"
                  />
                </div>
                {profileCompletion() < 100 && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Complete your profile to unlock all features and build trust in the community
                  </p>
                )}
              </div>

              {/* Profile Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-full flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-stone-50 to-white border border-border/50"
                >
                  <div className="relative">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg"
                    >
                      <Camera className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{user?.full_name}</h3>
                    <p className="text-muted-foreground mb-2">{user?.email}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium capitalize">
                        {user?.user_type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Member since {new Date(user?.created_at || "").toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Information */}
                <ProfileCard
                  icon={Mail}
                  label="Email Address"
                  value={user?.email || "Not provided"}
                  verified={true}
                  color="blue"
                  onActionClick={() => navigate("/profile")}
                />

                <ProfileCard
                  icon={Phone}
                  label="Phone Number"
                  value={user?.phone || "Not provided"}
                  verified={!!user?.phone}
                  color="green"
                  onActionClick={() => navigate("/profile")}
                />

                <ProfileCard
                  icon={Shield}
                  label="Aadhaar Verification"
                  value={user?.aadhaar_verified ? `Verified - ****${user?.aadhaar_last_4}` : "Not verified"}
                  verified={user?.aadhaar_verified || false}
                  color="purple"
                  action={!user?.aadhaar_verified ? "Verify Now" : undefined}
                  onActionClick={() => navigate("/profile")}
                />

                <ProfileCard
                  icon={MapPin}
                  label="Address"
                  value="Not provided"
                  verified={false}
                  color="orange"
                  action="Add Address"
                  onActionClick={() => navigate("/profile")}
                />

                <ProfileCard
                  icon={CreditCard}
                  label="Payment Methods"
                  value="No payment methods"
                  verified={false}
                  color="pink"
                  action="Add Payment"
                  onActionClick={() => navigate("/profile")}
                />

                <ProfileCard
                  icon={FileText}
                  label="Driving License"
                  value="Not uploaded"
                  verified={false}
                  color="indigo"
                  action="Upload License"
                  onActionClick={() => navigate("/profile")}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Profile Card Component
interface ProfileCardProps {
  icon: any;
  label: string;
  value: string;
  verified: boolean;
  color: string;
  action?: string;
  onActionClick?: () => void;
}

const ProfileCard = ({ icon: Icon, label, value, verified, color, action, onActionClick }: ProfileCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-stone-50 to-white border border-border/50 hover:shadow-lg transition-all cursor-pointer"
      onClick={onActionClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {verified ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-50 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Pending</span>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-semibold text-foreground mb-3">{value}</p>
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
        >
          {action}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Dashboard;
