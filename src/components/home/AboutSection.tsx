import React from "react";
import { motion } from "framer-motion";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 lg:pt-16 lg:pb-14 bg-white text-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center text-left"
          >
            {/* Tag / Category */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                OUR JOURNEY
              </span>
              <div className="w-8 h-[2px] bg-[#EA580C]" />
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black tracking-tight text-[#0F172A] leading-[1.18] font-sans">
              From a Young Startup to <br />
              a Trusted Name
            </h2>

            {/* Paragraph 1: Growth Story */}
            <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              What started as a young vision has grown into a full-fledged group delivering excellence in{" "}
              <strong className="font-bold text-slate-900">Private Security</strong>,{" "}
              <strong className="font-bold text-slate-900">Facility Management</strong>, and{" "}
              <strong className="font-bold text-slate-900">Human Resource Consultancy</strong>. Our journey is powered by trust, hard work, and the belief that people are at the heart of every successful organization.
            </p>

            {/* Paragraph 2: Core Philosophy */}
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Getting the nerve of our client and positioning of our services with the best interest of them is how we work. We don’t just send boxed services, we respond with professional bespoke solutions to your needs. How big or small, regular or urgent, we serve each of your “People” needs.
            </p>
          </motion.div>

          {/* Right Column: Feathered City Horizon Image with Watermark Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]"
          >
            {/* The City Horizon Image with Soft Left Feather Mask */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/image.png"
                alt="Gujarat Riverfront City Tower"
                className="w-full h-full object-cover object-center scale-100"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />

              {/* Subtle Warm Sunset Ambient Blend Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none w-1/4" />
            </div>

            {/* Floating Watermark Emblem in the sunset sky */}
            <div className="absolute left-6 sm:left-14 top-1/4 -translate-y-1/2 pointer-events-none select-none">
              <img
                src="/trustmark-logo.png"
                alt="Trustmarks Emblem Watermark"
                className="w-32 sm:w-44 lg:w-48 h-auto object-contain opacity-25 filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.2)] mix-blend-multiply"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
