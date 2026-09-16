import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const OPENINGS = [
  {
    title: "Area Field Operations Manager",
    department: "Field Management",
    location: "Gandhinagar / Ahmedabad",
    type: "Full-Time",
    experience: "3-5 Years in Private Security / IFM",
  },
  {
    title: "Senior Facility MEP Engineer",
    department: "Technical Services",
    location: "Sanand Industrial Hub",
    type: "Full-Time",
    experience: "4+ Years in HVAC & Electricals",
  },
  {
    title: "Recruitment & Talent Acquisition Lead",
    department: "HR & Staffing",
    location: "Ahmedabad HQ",
    type: "Full-Time",
    experience: "2-4 Years Bulk Staffing Experience",
  },
  {
    title: "Security Shift Supervisor",
    department: "Security Guarding",
    location: "Gujarat Tech Hub",
    type: "Full-Time",
    experience: "Ex-Servicemen / 3+ Years Security Experience",
  },
];

export const CareersPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

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
            <span className="text-amber-400 font-bold">Careers</span>
          </div>

          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-2 inline-block">
            JOIN OUR TEAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Build Your Career with <span className="text-amber-400">Trustmarks</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join a disciplined, high-growth management services group where integrity, professional development, and timely statutory rewards are foundational.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
              CURRENT OPPORTUNITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">
              Active Job Openings in Gujarat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPENINGS.map((job, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col justify-between text-left group hover:border-[#EA580C]/40 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{job.type}</span>
                  </div>

                  <h3 className="text-lg font-black text-[#0F172A] group-hover:text-[#EA580C] transition-colors">
                    {job.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#EA580C] group-hover:underline"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
