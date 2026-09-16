import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, MessageCircle, Phone } from "lucide-react";

interface HeroSectionProps {
  onLearnMoreClick?: () => void;
  onBookNowClick?: () => void;
}

const heroSlides = [
  {
    image: "/hero-bg.jpg",
    alt: "Trustmarks Facility Management Team in Ahmedabad",
  },
  {
    image: "/bg-img2.avif",
    alt: "Trustmarks Professional Mechanized Cleaning",
  },
  {
    image: "/bg-img4.avif",
    alt: "Trustmarks Corporate Workforce & Staffing",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLearnMoreClick,
  onBookNowClick: _onBookNowClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    if (onLearnMoreClick) {
      onLearnMoreClick();
    } else {
      const element = document.getElementById("services") || document.getElementById("services-grid");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden pt-24 pb-10 sm:pb-12 bg-neutral-950"
    >
      {/* Background Image Slideshow with Smooth 5s Crossfade & NO dark vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].alt}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Clean, balanced overlay for readability without heavy top bars or vignette */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/60" />
      </div>

      {/* Top spacer */}
      <div className="w-full h-6 sm:h-8 relative z-10" />

      {/* Centered Main Hero Content Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center my-auto">
        {/* Main Headline (Centered with clean sizing) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.2] font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] max-w-3xl"
        >
          Integrated Facility Management <br className="hidden sm:inline" />
          &amp; Housekeeping Services in <br className="hidden sm:inline" />
          Ahmedabad
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-100 font-normal max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
        >
          Complete Facility Management Solutions for Clean, Compliant &amp; Efficient Operations across Ahmedabad and Gujarat.
        </motion.p>

        {/* Actions Area positioned slightly higher up */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-6 sm:gap-8"
        >
          {/* Rotating Circular Text Scroll Indicator */}
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="w-full h-full"
              viewBox="0 0 100 100"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="text-[9px] uppercase tracking-[2.8px] fill-gray-200 font-bold">
                <textPath href="#circlePath" startOffset="0%">
                  • SCROLL DOWN • SCROLL DOWN
                </textPath>
              </text>
            </motion.svg>

            {/* Center Yellow Circle with Down Arrow */}
            <button
              onClick={scrollToServices}
              aria-label="Scroll down"
              className="absolute inset-0 m-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5BA13] hover:bg-[#ffc82a] text-black flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 font-black stroke-[2.5]" />
            </button>
          </div>

          {/* LEARN MORE Button */}
          <button
            onClick={scrollToServices}
            className="group flex items-center gap-2.5 text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase hover:text-[#F5BA13] transition-colors cursor-pointer"
          >
            <span>Learn More</span>
            <div className="w-7 h-7 rounded-full bg-[#F5BA13] text-black flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-200 shadow-md">
              <ArrowRight className="w-3.5 h-3.5 font-black stroke-[2.5]" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Slide Navigation Dots (Indicators for 5-Second Carousel) */}
      <div className="relative z-10 flex items-center justify-center gap-2.5 pb-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative p-1 focus:outline-none cursor-pointer"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index
                ? "w-8 bg-[#F5BA13] shadow-[0_0_12px_rgba(245,186,19,0.8)]"
                : "w-2.5 bg-white/40 group-hover:bg-white/70"
                }`}
            />
          </button>
        ))}
      </div>

      {/* Floating Action Buttons (WhatsApp & Call) on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919998399909"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 fill-white stroke-none" />
        </a>

        {/* Phone Button */}
        <a
          href="tel:+919998399909"
          aria-label="Call Trustmarks"
          className="w-12 h-12 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
