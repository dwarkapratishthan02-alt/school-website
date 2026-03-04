import Hero from "../components/Hero";
import Institutions from "../components/Institutions";
import AboutSection from "../components/AboutSection";
import Excellence from "../components/Excellence";
import AdmissionCTA from "../components/AdmissionCTA";
import Testimonials from "../components/Testimonials";
import CampusLife from "../components/CampusLife";
import NewsSection from "../components/NewsSection";

function Home() {
  return (
    <>
      <Hero />
      <Institutions />
      <AboutSection />
      <Excellence />
      <AdmissionCTA />
      <Testimonials />
      <CampusLife />
      <NewsSection />
    </>
  );
}

export default Home;