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
      <Navigation />
      <HeroSection />
      <Stats />
      <HowItWorks />
      <FeaturedBikes />
      <ListYourBike />
      <Footer />
    </div>
  );
};

export default Index;
