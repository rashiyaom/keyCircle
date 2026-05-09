import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Shield, Zap, TrendingUp, Award, Heart, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We prioritize the security and safety of every transaction with verified users and insured vehicles."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a community of reliable vehicle owners and renters who respect each other."
    },
    {
      icon: Zap,
      title: "Speed & Convenience",
      description: "Book a vehicle in seconds with our intuitive platform and instant confirmation."
    },
    {
      icon: TrendingUp,
      title: "Growth & Sustainability",
      description: "Supporting vehicle owners earn extra income while promoting shared mobility."
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Verified Locations",
      description: "Real-time GPS tracking and verified pickup locations for your peace of mind."
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Comprehensive insurance protection on every rental booking."
    },
    {
      icon: Heart,
      title: "Premium Support",
      description: "24/7 customer support to help you with any questions or concerns."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All vehicles are regularly maintained and quality checked."
    }
  ];

  const stats = [
    { label: "Active Users", value: "5,000+" },
    { label: "Vehicles Available", value: "2,500+" },
    { label: "Cities Covered", value: "15+" },
    { label: "Bookings Completed", value: "25,000+" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 via-white to-stone-100 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              About <span className="text-accent">keyCircle</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing shared mobility with a trusted platform connecting vehicle owners and renters across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  keyCircle exists to transform the way people access transportation. We believe that vehicle sharing should be simple, safe, and accessible to everyone.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  By connecting vehicle owners with renters, we're creating a sustainable ecosystem that benefits both parties while reducing traffic congestion and environmental impact.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 border border-accent/20">
                  <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at keyCircle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <value.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose keyCircle?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer unique benefits for both vehicle owners and renters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border border-stone-200 hover:border-accent/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 inline-flex p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 md:order-1"
            >
              <div className="inline-flex px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-sm font-semibold text-accent">For Vehicle Owners</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Earn Extra Income
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Put your vehicle to work and earn money when you're not using it. Our platform makes it easy to manage your listings and track earnings.
              </p>
              <ul className="space-y-3">
                {[
                  "Flexible availability control",
                  "Transparent pricing and earnings",
                  "Insurance protection included",
                  "Easy vehicle management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate('/share')}
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                List Your Vehicle <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 h-96 flex items-center justify-center order-1 md:order-2"
            >
              <div className="text-center">
                <TrendingUp className="w-24 h-24 text-accent/40 mx-auto mb-4" />
                <p className="text-muted-foreground">Grow your income with keyCircle</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Renters Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-stone-100 to-stone-50 rounded-3xl p-8 h-96 flex items-center justify-center"
            >
              <div className="text-center">
                <Users className="w-24 h-24 text-stone-400 mx-auto mb-4" />
                <p className="text-muted-foreground">Explore affordable rentals</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-sm font-semibold text-accent">For Renters</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Affordable & Convenient
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access a wide variety of vehicles at affordable prices. Book instantly and pick up from nearby locations.
              </p>
              <ul className="space-y-3">
                {[
                  "Affordable hourly and daily rates",
                  "Wide selection of vehicles",
                  "Instant booking confirmation",
                  "Verified and trusted owners"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate('/marketplace')}
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Browse Vehicles <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Ready to Join keyCircle?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you want to earn money or find affordable transportation, we're here to help.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/signup/journey')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
              >
                Get Started <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="px-8 py-6 text-lg border-stone-200 hover:bg-stone-50"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
