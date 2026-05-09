import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Services = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      title: "Share Your Ride",
      subtitle: "List & Earn",
      description: "Turn your idle vehicle into income. Set your schedule, choose your renters, and earn while you're not using it.",
      path: "/share",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
      features: ["Flexible pricing", "Secure platform", "Full control", "24/7 support"]
    },
    {
      title: "Rent a Ride",
      subtitle: "Book & Drive",
      description: "Access quality vehicles from verified owners. Affordable, convenient, and perfect for students on the go.",
      path: "/rent",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop",
      features: ["Wide selection", "Instant booking", "Verified owners", "Insurance included"]
    }
  ];

  const benefits = [
    "Verified student community",
    "Secure transactions",
    "Insurance coverage",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Minimal & Elegant */}
      <section className="pt-28 pb-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-[#a3b87c] rounded-sm" />
            <span className="text-[10px] font-body text-stone-500 uppercase tracking-widest">Our Services</span>
          </div>
          
          <h1 className="font-display text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            Two ways to ride<br />
            <span className="text-stone-400">with keyCircle</span>
          </h1>
          
          <p className="text-lg text-stone-600 font-body leading-relaxed">
            Whether you want to share your vehicle and earn, or find the perfect ride for your journey—we've made it simple, secure, and seamless.
          </p>
        </div>
      </section>

      {/* Services Grid - Large Cards */}
      <section className="px-6 lg:px-16 pb-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-[32px] overflow-hidden border border-stone-200/50 hover:border-stone-300 transition-all duration-500 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(isAuthenticated ? service.path : '/auth')}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === index ? 'scale-105' : 'scale-100'
                  }`}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Arrow Button */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                  hoveredCard === index ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
                }`}>
                  <ArrowUpRight className="w-5 h-5 text-stone-800" />
                </div>
                
                {/* Subtitle Badge */}
                <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-xs font-body font-semibold text-stone-800 tracking-wide">
                    {service.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-3xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-stone-600 font-body leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-stone-400" />
                      <span className="text-sm text-stone-600 font-body">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover State Line */}
                <div className={`mt-8 h-[1px] bg-stone-800 transition-all duration-500 ${
                  hoveredCard === index ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why keyCircle Section - Minimal */}
      <section className="px-6 lg:px-16 pb-32 max-w-7xl mx-auto">
        <div className="bg-stone-50 rounded-[32px] p-12 lg:p-16 border border-stone-200/50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-[#a3b87c] rounded-sm" />
                <span className="text-[10px] font-body text-stone-500 uppercase tracking-widest">Why Choose Us</span>
              </div>
              
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
                Built for the student<br />
                <span className="text-stone-400">community</span>
              </h2>
              
              <p className="text-stone-600 font-body leading-relaxed mb-8">
                keyCircle is more than a platform—it's a trusted community where students help students. Every interaction is secure, verified, and designed with your peace of mind in focus.
              </p>

              {/* Benefits List */}
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#a3b87c]/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-[#a3b87c] rounded-full" />
                    </div>
                    <span className="text-stone-700 font-body">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Decorative Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200/50">
                <div className="text-4xl font-display font-bold text-foreground mb-2">5,000+</div>
                <div className="text-sm text-stone-600 font-body">Active students</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200/50 mt-8">
                <div className="text-4xl font-display font-bold text-foreground mb-2">1,200+</div>
                <div className="text-sm text-stone-600 font-body">Vehicles shared</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200/50 -mt-8">
                <div className="text-4xl font-display font-bold text-foreground mb-2">98%</div>
                <div className="text-sm text-stone-600 font-body">Satisfaction rate</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200/50">
                <div className="text-4xl font-display font-bold text-foreground mb-2">24/7</div>
                <div className="text-sm text-stone-600 font-body">Support available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Clean */}
      <section className="px-6 lg:px-16 pb-32 max-w-7xl mx-auto">
        <div className="bg-stone-900 rounded-[32px] p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 border border-white/10 rounded-full" />
          <div className="absolute bottom-8 right-8 w-32 h-32 border border-white/10 rounded-full" />
          
          <div className="relative z-10">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-stone-300 font-body text-lg mb-10 max-w-2xl mx-auto">
              Join the keyCircle community today and experience seamless vehicle sharing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(isAuthenticated ? '/share' : '/auth')}
                className="px-8 py-4 rounded-full bg-white text-stone-900 font-body font-semibold hover:bg-stone-100 transition-colors"
              >
                Share Your Ride
              </button>
              <button
                onClick={() => navigate(isAuthenticated ? '/rent' : '/auth')}
                className="px-8 py-4 rounded-full border-2 border-white text-white font-body font-semibold hover:bg-white/10 transition-colors"
              >
                Find a Ride
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
