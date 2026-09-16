import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { ServicesProvider } from "./context/ServicesContext";
import { IndustriesProvider } from "./context/IndustriesContext";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { IndustryDetailPage } from "./pages/IndustryDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminServiceEditPage } from "./pages/admin/AdminServiceEditPage";
import { AdminIndustryEditPage } from "./pages/admin/AdminIndustryEditPage";

export function App() {
  // Initialize Lenis smooth scroll for seamless fluid experience
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <ServicesProvider>
      <IndustriesProvider>
        <Router>
          <Routes>
            {/* Main Unified Single Page Application */}
            <Route path="/" element={<HomePage />} />

            {/* All Services Directory Page */}
            <Route path="/services" element={<ServicesPage />} />

            {/* Dedicated Service Detail Page */}
            <Route path="/service/:slug" element={<ServiceDetailPage />} />

            {/* Dedicated Industries Directory Page */}
            <Route path="/industries" element={<IndustriesPage />} />

            {/* Dedicated Industry Detail Page */}
            <Route path="/industry/:slug" element={<IndustryDetailPage />} />

            {/* About, Careers & Contact Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Authentication & CMS Dashboard */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/services/new" element={<AdminServiceEditPage />} />
            <Route path="/admin/services/edit/:id" element={<AdminServiceEditPage />} />
            <Route path="/admin/services/:id" element={<AdminServiceEditPage />} />
            <Route path="/admin/industries/new" element={<AdminIndustryEditPage />} />
            <Route path="/admin/industries/edit/:id" element={<AdminIndustryEditPage />} />
            <Route path="/admin/industries/:id" element={<AdminIndustryEditPage />} />

            {/* Fallback to Main Home Page */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </IndustriesProvider>
    </ServicesProvider>
  );
}

export default App;
