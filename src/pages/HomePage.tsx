import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { AboutValuesSection } from "@/components/home/AboutValuesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ServicesGridSection } from "@/components/home/ServicesGridSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { BookNowModal } from "@/components/common/BookNowModal";
import { useServices } from "@/context/ServicesContext";

export const HomePage: React.FC = () => {
  const { services, loading } = useServices();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("WorkForce Solutions");

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsBookModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookModalOpen(false);
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("services-grid") || document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-400 selection:text-black font-sans relative">
      {/* Top Fixed / Glass Navbar */}
      <Navbar onBookNowClick={() => handleOpenBooking("WorkForce Solutions")} />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onLearnMoreClick={scrollToServices}
          onBookNowClick={() => handleOpenBooking("WorkForce Solutions")}
        />


        {/* 2. Services Overview Banner */}
        <ServicesSection onExploreClick={scrollToServices} />

        {/* 3. Services 6-Card Grid Showcase (Connected to Supabase Realtime) */}
        <ServicesGridSection
          services={services}
          loading={loading}
        />

        {/* 4. Industries We Serve (12 Reference Sectors) */}
        <IndustriesSection />

        {/* 5. About Part 1 - Our Journey */}
        <AboutSection />

        {/* 6. About Part 2 - Who We Are */}
        <AboutValuesSection />

        {/* 7. Contact Us Section (Connected with EmailJS HUcrGtebhEpgdf3vt) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />



      {/* Consultation & Booking Modal */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={handleCloseBooking}
        defaultService={selectedService}
      />
    </div>
  );
};
