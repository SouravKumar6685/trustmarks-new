import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutValuesSection } from "@/components/home/AboutValuesSection";

export const AboutPage: React.FC = () => {
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
            <span className="text-amber-400 font-bold">About Us</span>
          </div>

          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-2 inline-block">
            WHO WE ARE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Setting the Benchmark in <span className="text-amber-400">Integrated Facility</span> &amp; Workforce Solutions
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Headquartered in Gujarat, Trustmarks Management Services is a premier facility management, industrial security, and specialized workforce partner trusted by leading corporations, manufacturing hubs, and institutions.
          </p>
        </div>
      </section>

      {/* Mission, Vision & Story */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                  OUR PURPOSE &amp; PHILOSOPHY
                </span>
                <div className="w-10 h-[2px] bg-[#EA580C]" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
                Building Trust Through Discipline, Transparency &amp; Rigorous Compliance
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Trustmarks was established with a singular objective: to eliminate operational friction and statutory liabilities for enterprise leaders. By merging military-grade discipline in field operations with modern software auditing and verified statutory challans, we deliver measurable peace of mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">Our Mission</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To safeguard assets, elevate workplace hygiene, and provide agile, 100% compliant talent that fuels enterprise growth.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#0F172A]">Our Vision</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To be the most reliable, tech-enabled IFM and workforce management partner across Western India by 2030.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="/hero-bg.jpg"
                  alt="Trustmarks Leadership and Team"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md text-white flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black">15+ Years Combined Experience</div>
                    <div className="text-xs text-slate-300">Managing 100+ Enterprise Facilities</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <AboutValuesSection />

      {/* CTA Section */}
      <section className="py-16 bg-[#0F172A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to Elevate Your Facility &amp; Workforce Operations?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Connect with our operations specialists for a free on-site audit and customized proposal.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl"
            >
              <span>Schedule Free Site Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
