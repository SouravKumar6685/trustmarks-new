import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useServices } from "@/context/ServicesContext";
import { getIconComponent } from "@/components/home/ServicesGridSection";

export const ServicesPage: React.FC = () => {
  const { services, loading } = useServices();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Our Services</span>
          </div>

          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-2 inline-block">
            ENTERPRISE CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Comprehensive <span className="text-amber-400">Integrated Facility</span> &amp; Security Services
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Engineered to safeguard facilities, streamline compliance, and deliver agile, skilled manpower with zero enterprise liability.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-[#F8FAFC] rounded-3xl p-7 h-72 animate-pulse border border-slate-200" />
              ))}
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-16 max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">No Services Found</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Services will appear here once created in the admin panel or seeded.
              </p>
              <Link
                to="/admin"
                className="px-5 py-2.5 rounded-full bg-[#EA580C] text-white text-xs font-bold hover:bg-[#c2410c] transition-colors inline-block"
              >
                Go to Admin Portal
              </Link>
            </div>
          )}

          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const IconComp = getIconComponent(service.icon_name || "ShieldCheck");
                return (
                  <motion.div
                    key={service.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="p-6 sm:p-7 space-y-4 text-left">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComp className="w-6 h-6 stroke-[2]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                          {service.tag || "Core Service"}
                        </span>
                      </div>

                      <h2 className="text-xl font-black text-[#0F172A] group-hover:text-[#EA580C] transition-colors">
                        {service.title}
                      </h2>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {service.card_description || service.page_description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-slate-200/60">
                          {service.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        to={`/service/${service.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F172A] group-hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-md"
                      >
                        <span>Explore {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-16 bg-[#0F172A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Need a Customized Multi-Facility Service Package?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            We build unified contracts consolidating Security, IFM, Housekeeping, and Staffing into a single, compliant monthly billing invoice.
          </p>
          <div className="pt-2">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl"
            >
              <span>Request Master Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
