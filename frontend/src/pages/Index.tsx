import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import FeaturedBikes from "@/components/FeaturedBikes";
import ListYourBike from "@/components/ListYourBike";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with Navigation overlaid */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navigation />
        </div>
        <HeroSection />
      </div>
      <Stats />
      <HowItWorks />
      <FeaturedBikes />
      <ListYourBike />
      <Footer />
    </div>
  );
};

export default Index;
