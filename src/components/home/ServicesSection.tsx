import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Sparkles,
  Cog,
  UserCheck,
  ArrowRight,
  Shield,
  BarChart3,
} from "lucide-react";

interface ServicesSectionProps {
  onExploreClick?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onExploreClick }) => {
  const serviceBadges = [
    { title: "Security Services", icon: ShieldCheck },
    { title: "Workforce Solutions", icon: Users },
    { title: "Housekeeping Services", icon: Sparkles },
    { title: "Facility Management", icon: Cog },
    { title: "HR Consultancy", icon: UserCheck },
  ];

  const bottomFeatures = [
    {
      title: "Reliable Workforce",
      description: "Trained, verified and professional staff",
      icon: ShieldCheck,
    },
    {
      title: "Customised Solutions",
      description: "Tailored to your business needs",
      icon: Cog,
    },
    {
      title: "Operational Excellence",
      description: "Efficient, compliant and consistent",
      icon: BarChart3,
    },
    {
      title: "Your Trusted Partner",
      description: "Long-term growth, together",
      icon: Users,
    },
  ];

  return (
    <section
      id="services"
      className="relative pt-12 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* Background Graphic Image on Large Screens */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        <img
          src="/service.png"
          alt="Trustmarks Service Staff"
          className="w-full h-full object-cover object-right-top scale-100"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Service Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[500px]">
          {/* Left Column: Headings, Service Badges & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Tag */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                OUR SERVICES
              </span>
              <div className="w-8 h-[2px] bg-[#EA580C]" />
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] leading-[1.14] font-sans">
              People Solutions <br />
              for a <span className="text-[#EA580C]">Stronger Tomorrow</span>
            </h2>

            {/* Description Paragraph */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              From security to facility management, we deliver reliable and customised workforce solutions to keep your business running smoothly. Our services are designed to meet your unique needs with professionalism, care and efficiency.
            </p>

            {/* 5 Circular Service Badges */}
            <div className="mt-7 flex flex-wrap items-start gap-4 sm:gap-6">
              {serviceBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center group cursor-pointer"
                    onClick={onExploreClick}
                  >
                    {/* Outer concentric disc */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-50 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-[0_4px_16px_rgba(234,88,12,0.15)] transition-all duration-200">
                      {/* Inner disc */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-xs">
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#EA580C] stroke-[2.2]" />
                      </div>
                    </div>
                    {/* Badge Label */}
                    <span className="text-[11px] font-bold text-slate-800 mt-2 max-w-[72px] sm:max-w-[80px] leading-tight group-hover:text-[#EA580C] transition-colors">
                      {badge.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button & Tagline */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase px-6 sm:px-7 py-3 rounded-full shadow-[0_6px_20px_rgba(234,88,12,0.35)] hover:shadow-[0_8px_25px_rgba(194,65,12,0.5)] transition-all duration-300 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <div className="w-6 h-6 rounded-full bg-black/90 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </motion.button>

              <div className="hidden sm:block w-[1px] h-8 bg-slate-200" />

              <div className="text-[10px] sm:text-[11px] font-extrabold tracking-widest text-slate-500 uppercase leading-snug">
                TAILORED SOLUTIONS. <br />
                LASTING IMPACT.
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mobile image display + Floating Stats Pill Card */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex flex-col items-center justify-end lg:h-[460px] mt-6 lg:mt-0">
            {/* Mobile / Tablet Image */}
            <div className="w-full rounded-2xl overflow-hidden shadow-lg lg:hidden mb-6">
              <img
                src="/service.png"
                alt="Trustmarks Team"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Script Text on Right (Desktop) */}
            <div className="absolute -top-6 right-2 xl:right-8 text-right hidden xl:block pointer-events-none select-none">
              <div className="text-2xl font-medium italic text-slate-700 tracking-tight leading-snug">
                Clean <br />
                Secure <br />
                Productive <br />
                <span className="font-bold text-slate-900 not-italic">Always</span>
              </div>
              <div className="w-12 h-[2px] bg-[#EA580C] ml-auto mt-1 rounded-full" />
            </div>

            {/* Floating Glass Stats Pill Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="w-full sm:w-auto bg-white/95 backdrop-blur-xl border border-white/90 rounded-2xl sm:rounded-full px-5 sm:px-7 py-3.5 sm:py-4 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex flex-wrap sm:flex-nowrap items-center justify-around sm:justify-start divide-y sm:divide-y-0 sm:divide-x divide-slate-200 gap-4 sm:gap-0 z-20"
            >
              {/* Stat 1 */}
              <div className="flex items-center gap-3 sm:pr-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-2 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C]">
                  <Users className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#0F172A] leading-tight">
                    200
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    Clients Satisfied
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-2 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C]">
                  <UserCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#0F172A] leading-tight">
                    350
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    Hiring Done
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="p-2 rounded-full bg-orange-50 border border-orange-100 text-[#EA580C]">
                  <Shield className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#0F172A] leading-tight">
                    80
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    Offices Secured
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Feature Bar (4 Trust Pillars in floating card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-12 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-2 lg:divide-x lg:divide-slate-200"
        >
          {bottomFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 px-3 sm:px-4 group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 group-hover:bg-orange-50 group-hover:text-[#EA580C] group-hover:border-orange-200 transition-colors shrink-0">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-extrabold text-[#0F172A] tracking-tight group-hover:text-[#EA580C] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
