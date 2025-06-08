import Feature from "./components/Feature";
import Hero from "./components/Hero";
import Layanan from "./components/Layanan";
import PostSection from "./components/PostSection";
import PartnerSection from "./components/PartnerSection";
import ContactSection from "./components/ContactSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Layanan />
      <PostSection />
      <PartnerSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
