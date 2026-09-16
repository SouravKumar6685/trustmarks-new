import React from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Cog, TrendingUp } from "lucide-react";

export const AboutValuesSection: React.FC = () => {
  const values = [
    {
      icon: Users,
      title: "People First",
      description:
        "We understand that every business runs on people. We are here to support your people, so you can focus on growth.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity & Trust",
      description:
        "Honesty, transparency and accountability are the foundation of every relationship we build.",
    },
    {
      icon: Cog,
      title: "Customised Solutions",
      description:
        "We don't believe in one-size-fits-all. Every solution is tailored to your unique needs.",
    },
    {
      icon: TrendingUp,
      title: "Commitment to Excellence",
      description:
        "We strive for the highest standards in everything we do, ensuring quality, consistency and reliability.",
    },
  ];

  return (
    <section className="relative pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-18 bg-white text-slate-900 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header: Tag, Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Tag */}
          <div className="flex flex-col items-center gap-1 mb-2.5">
            <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
              WHO WE ARE
            </span>
            <div className="w-10 h-[2px] bg-[#EA580C]" />
          </div>

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-[#0F172A] leading-tight font-sans">
            Driven by Trust. Defined by Service.
          </h2>

          {/* Section Subtext */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We believe that great service starts with understanding people. Our approach is built on empathy, transparency and a deep commitment to deliver solutions that truly make a difference.
          </p>
        </div>

        {/* 4 Pillars Grid with Circular Layered Badges & Vertical Dividers */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center px-4 sm:px-5 lg:px-6 group"
              >
                {/* Layered Concentric Icon Circle Badge */}
                <div className="relative mb-4 sm:mb-5 flex items-center justify-center">
                  {/* Outer glowing soft ring */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-50 border border-slate-200/70 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-center group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-[0_6px_20px_rgba(245,158,11,0.15)] transition-all duration-300">
                    {/* Inner circle */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#EA580C] stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
                    </div>
                  </div>
                </div>

                {/* Value Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] tracking-tight mb-2">
                  {item.title}
                </h3>

                {/* Value Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
