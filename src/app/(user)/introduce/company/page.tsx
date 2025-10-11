import Contact from "@/components/Contact";
import Content from "@/app/(user)/introduce/components/Content";
import HeroSection from "@/app/(user)/introduce/components/HeroSection";

export default function CompanyPage() {
  return (
    <div className="w-full h-full">
        <HeroSection />
        <Content />
        <Contact />
    </div>
  );
}
