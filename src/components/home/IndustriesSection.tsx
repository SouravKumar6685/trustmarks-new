import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { IndustryCard } from "@/components/common/IndustryCard";
import { useIndustries } from "@/context/IndustriesContext";
import type { Industry } from "@/types/industry";

interface IndustriesSectionProps {
  onIndustryClick?: (industry: Industry) => void;
  onExploreAllClick?: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onIndustryClick,
}) => {
  const { industries, loading } = useIndustries();

  const activeIndustries = industries.filter((i) => i.is_active !== false);

  return (
    <section id="industries" className="py-20 sm:py-28 bg-[#F8FAFC] relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header Matching Reference Image */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
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
        </div>

        {/* Loading State */}
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
        {!loading && activeIndustries.length === 0 && (
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Industries Available</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Industries configured in the admin dashboard will appear here.
            </p>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full bg-[#EA580C] text-white text-xs font-bold hover:bg-[#c2410c] transition-colors inline-block"
            >
              Open Admin CMS
            </Link>
          </div>
        )}

        {/* 4-Column Grid */}
        {!loading && activeIndustries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {activeIndustries.map((industry, index) => (
              <IndustryCard
                key={industry.id || index}
                industry={industry}
                index={index}
                onCardClick={onIndustryClick}
              />
            ))}
          </div>
        )}


      </div>
    </section>
  );
};
