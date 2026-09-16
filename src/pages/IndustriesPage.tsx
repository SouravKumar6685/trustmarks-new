import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndustryCard } from "@/components/common/IndustryCard";
import { BookNowModal } from "@/components/common/BookNowModal";
import { useIndustries } from "@/context/IndustriesContext";
import type { Industry } from "@/types/industry";

export const IndustriesPage: React.FC = () => {
  const { industries, loading } = useIndustries();
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("Corporate Offices");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Industries We Serve | Trustmarks Management Services";
  }, []);

  const handleOpenBooking = (industryName?: string) => {
    if (industryName) {
      setSelectedIndustry(industryName);
    }
    setIsBookModalOpen(true);
  };

  const filteredIndustries = useMemo(() => {
    if (!searchQuery.trim()) {
      return industries.filter((i) => i.is_active !== false);
    }
    const q = searchQuery.toLowerCase().trim();
    return industries.filter(
      (i) =>
        i.is_active !== false &&
        (i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    );
  }, [industries, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Fixed Navbar */}
      <Navbar onBookNowClick={() => handleOpenBooking("General Industry Inquiry")} />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Industries We Serve</span>
          </div>

          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-2 inline-block">
            SECTOR EXPERTISE &amp; WORKFORCE SOLUTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Tailored Facility &amp; <span className="text-amber-400">Workforce Solutions</span> For Every Industry
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Delivering statutory compliance, trained manpower, and seamless operational excellence engineered specifically for the demands of diverse business sectors.
          </p>
        </div>
      </section>

      {/* Main Reference Matching Showcase Section */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Exact Section Header from Reference Image */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[#EA580C] text-xs sm:text-sm font-black tracking-widest uppercase mb-1.5">
                INDUSTRIES WE SERVE
              </span>
              <div className="w-10 h-[2.5px] bg-[#EA580C] rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0F172A] tracking-tight leading-tight pt-1">
              Trusted Workforce Solutions Across{" "}
              <span className="text-[#EA580C]">Every Industry</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto pt-1">
              We understand that every industry has unique challenges. Our tailored workforce
              solutions are designed to meet the specific needs of diverse sectors.
            </p>

            {/* Quick Search Bar */}
            <div className="pt-4 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search industries (e.g., Healthcare, Manufacturing, Retail)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-3xl h-80 animate-pulse border border-slate-200/80 shadow-sm"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredIndustries.length === 0 && (
            <div className="text-center py-16 px-4 max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                {searchQuery ? "No matching industries found" : "No industries added yet"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                {searchQuery
                  ? `Try clearing your search query "${searchQuery}" to view all sectors.`
                  : "Industries will appear here once configured in the admin dashboard."}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  View All Sectors
                </button>
              ) : (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full bg-[#EA580C] text-white text-xs font-bold hover:bg-[#c2410c] transition-colors inline-block"
                >
                  Open Admin CMS
                </Link>
              )}
            </div>
          )}

          {/* 4-Column Responsive Grid matching Reference Image */}
          {!loading && filteredIndustries.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredIndustries.map((industry, index) => (
                <IndustryCard
                  key={industry.id || index}
                  industry={industry}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            ENTERPRISE DEPLOYMENT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Don&apos;t See Your Specific Sector Listed?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our talent acquisition and operations team conducts specialized feasibility studies to recruit and train workforce tailored to any bespoke enterprise requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenBooking("Custom Sector Inquiry")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer"
            >
              <span>Consult an Operations Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm transition-all border border-white/15"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking / Consultation Modal */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        defaultService={selectedIndustry}
      />
    </div>
  );
};
