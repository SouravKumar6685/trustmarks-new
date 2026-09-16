import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ServicesOverviewProps {
  onBookService?: (serviceName: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onBookService }) => {
  return (
    <section id="services" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
      {/* Background subtle light ambient shapes */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs sm:text-sm font-bold mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Tailored Enterprise Solutions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
          >
            Two Comprehensive Pillars of <br />
            <span className="text-amber-600">Trustmarks Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            From on-ground mechanized housekeeping to compliant enterprise staffing, we ensure your organization operates smoothly, cleanly, and without friction.
          </motion.p>
        </div>

        {/* Two Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: WorkForce Solutions */}
          <motion.div
            id="workforce-solutions"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/90 hover:border-amber-400 transition-all duration-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 group-hover:bg-[#F5BA13] group-hover:text-black transition-colors duration-300">
                  <Users className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                  Facility &amp; Operations
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                WorkForce Solutions
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Dedicated on-site facility personnel equipped with industry-grade machinery, certified protocols, and continuous supervisory audits.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Commercial, Industrial & Corporate Housekeeping",
                  "Mechanized Deep Cleaning & Facade Maintenance",
                  "Pantry, Cafeteria & Hospitality Staffing",
                  "Security, Guarding & Access Control Personnel",
                  "Waste Segregation & Environmental Sanitization",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold">Deployment Time</span>
                <p className="text-sm font-bold text-slate-900">Within 24-48 Hours</p>
              </div>
              <button
                onClick={() => onBookService && onBookService("WorkForce Solutions")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5BA13] text-slate-950 font-bold text-sm hover:bg-[#ffc82a] transition-colors shadow-md cursor-pointer"
              >
                <span>Request WorkForce</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: HR Solutions */}
          <motion.div
            id="hr-solutions"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/90 hover:border-amber-400 transition-all duration-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 group-hover:bg-[#F5BA13] group-hover:text-black transition-colors duration-300">
                  <Briefcase className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  Staffing &amp; Compliance
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                HR Solutions
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Complete talent acquisition, contractual payroll management, and zero-liability statutory compliance protection for your enterprise.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Contractual & Permanent Manpower Staffing",
                  "100% Statutory Compliance (PF, ESIC, PT, LWF & Factory Acts)",
                  "Seamless End-to-End Payroll & Attendance Processing",
                  "Candidate Background Screening & Police Verification",
                  "Employee Welfare, Grievance Redressal & Retention",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold">Compliance Guarantee</span>
                <p className="text-sm font-bold text-emerald-600">100% Audit-Ready</p>
              </div>
              <button
                onClick={() => onBookService && onBookService("HR Solutions")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Explore HR Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
