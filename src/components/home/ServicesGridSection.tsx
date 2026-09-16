import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Sparkles,
  Cog,
  UserCheck,
  GraduationCap,
  Building,
  Briefcase,
  ArrowRight,
  PhoneCall,
  Plus,
} from "lucide-react";
import type { Service } from "@/types/service";

// Map icon name string to Lucide component
export const getIconComponent = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case "shieldcheck":
    case "shield":
    case "security":
      return ShieldCheck;
    case "users":
    case "workforce":
    case "team":
      return Users;
    case "sparkles":
    case "housekeeping":
    case "clean":
      return Sparkles;
    case "cog":
    case "settings":
    case "facility":
      return Cog;
    case "usercheck":
    case "hr":
    case "consultancy":
      return UserCheck;
    case "graduationcap":
    case "training":
    case "education":
      return GraduationCap;
    case "building":
      return Building;
    case "briefcase":
      return Briefcase;
    default:
      return ShieldCheck;
  }
};

interface ServicesGridSectionProps {
  services: Service[];
  loading?: boolean;
}

export const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({
  services,
  loading,
}) => {
  return (
    <section
      id="services-grid"
      className="relative pt-12 pb-16 sm:pt-14 sm:pb-20 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center mb-12 sm:mb-14">
          {/* Tag */}
          <div className="flex flex-col items-center gap-1 mb-2.5">
            <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
              OUR SERVICES
            </span>
            <div className="w-10 h-[2px] bg-[#EA580C]" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-[#0F172A] leading-tight font-sans">
            Comprehensive Solutions, <br />
            Tailored for <span className="text-[#EA580C]">Every Need</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We offer a wide range of services designed to meet your unique business needs.
            Professional. Reliable. Always focused on people and performance.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-6 h-[235px] border border-slate-200/60 animate-pulse flex flex-row justify-between"
              >
                <div className="w-[58%] space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="w-3/4 h-5 bg-slate-200 rounded" />
                  <div className="w-full h-12 bg-slate-100 rounded" />
                </div>
                <div className="w-[38%] bg-slate-200 rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Active Services in Database</h3>
            <p className="text-xs text-slate-500 mb-6">
              Create services or click "Seed Default 6 Services" in the Admin Dashboard to populate your offerings.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EA580C] text-white text-xs font-bold hover:bg-[#c2410c] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Open Admin CMS</span>
            </Link>
          </div>
        )}

        {/* Dynamic Responsive Grid */}
        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {services.map((service, index) => {
              const Icon = getIconComponent(service.icon_name);

              return (
                <motion.div
                  key={service.id || index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)] border border-slate-200/80 hover:border-amber-400/50 transition-all duration-300 flex flex-row min-h-[235px]"
                >
                  {/* Left Side: Text Content (58%) */}
                  <div className="w-[58%] p-5 sm:p-6 flex flex-col justify-between z-10">
                    <div>
                      {/* Icon Badge */}
                      <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200/70 shadow-xs flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-[0_4px_14px_rgba(234,88,12,0.15)] transition-all duration-300">
                        <div className="w-7.5 h-7.5 rounded-full bg-white flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#EA580C] stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight group-hover:text-[#EA580C] transition-colors leading-snug">
                        {service.title}
                      </h3>

                      {/* Card Description */}
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3 font-normal">
                        {service.card_description}
                      </p>
                    </div>

                    {/* KNOW MORE Action Button */}
                    <div className="mt-4 pt-1">
                      <Link
                        to={`/service/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-black tracking-wider uppercase text-[#0F172A] group-hover:text-[#EA580C] transition-colors"
                      >
                        <span>KNOW MORE</span>
                        <div className="w-6 h-6 rounded-full bg-[#EA580C] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200 shadow-xs">
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: Personnel Image (42%) */}
                  <div className="w-[42%] relative overflow-hidden bg-slate-100">
                    <img
                      src={service.image_url || "/service.png"}
                      alt={service.title}
                      className="w-full h-full object-cover object-top sm:object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/service.png";
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}


      </div>
    </section>
  );
};
