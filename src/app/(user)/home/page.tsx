
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BannerBottom from "./BannerBottom";
import FeaturedNews from "./FeaturedNews";
import HeroSection from "./HeroSection";
import OurServices from "./OurServices";
import WhatWeDo from "./WhatWeDo";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
export default function HomePage() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <AboutUs />
      <WhatWeDo />
      <Banner />
      <OurServices />
      <FeaturedNews />
      <BannerBottom />
      <Testimonials />
      <ContactUs />
    </div>
  );
}
