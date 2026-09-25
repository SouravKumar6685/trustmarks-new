import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Edit3,
  Menu,
  X,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useServices } from "@/context/ServicesContext";
import { getIconComponent } from "@/components/home/ServicesGridSection";

interface NavbarProps {
  onBookNowClick?: () => void;
  /**
   * Header appearance variant:
   * - "auto": Transparent on homepage with dark hero, dark frosted glass on pages with light backgrounds (e.g. /service/*)
   * - "dark": Always dark frosted glass even at the top of the page
   * - "transparent": Transparent at the top, dark when scrolled
   */
  variant?: "auto" | "dark" | "transparent";
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick, variant = "auto" }) => {
  const { services, loading } = useServices();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  // Service detail pages (/service/*) have a light hero background,
  // so navbar must have a dark frosted glass background at the top to remain clearly visible.
  const isLightPage = location.pathname.startsWith("/service");
  const isDarkAtTop = variant === "dark" || (variant === "auto" && isLightPage);
  const showDarkNavbar = isScrolled || isDarkAtTop;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (isHomePage) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const servicesEl = document.getElementById("services") || document.getElementById("services-grid");
        const industriesEl = document.getElementById("industries");
        const aboutEl = document.getElementById("about");
        const contactEl = document.getElementById("contact");

        // Relative viewport detection threshold
        const threshold = 220;

        if (scrollY + windowHeight >= docHeight - 80) {
          setActiveSection("contact");
        } else if (contactEl && contactEl.getBoundingClientRect().top <= threshold) {
          setActiveSection("contact");
        } else if (aboutEl && aboutEl.getBoundingClientRect().top <= threshold) {
          setActiveSection("about");
        } else if (industriesEl && industriesEl.getBoundingClientRect().top <= threshold) {
          setActiveSection("industries");
        } else if (servicesEl && servicesEl.getBoundingClientRect().top <= threshold) {
          setActiveSection("services");
        } else {
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isHomeActive = isHomePage && activeSection === "home";
  const isServicesActive =
    servicesOpen ||
    (isHomePage && activeSection === "services") ||
    location.pathname.startsWith("/service");
  const isIndustriesActive =
    (isHomePage && activeSection === "industries") ||
    location.pathname.startsWith("/industr");
  const isAboutActive =
    (isHomePage && activeSection === "about") || location.pathname.startsWith("/about");
  const isContactActive =
    (isHomePage && activeSection === "contact") || location.pathname.startsWith("/contact");

  const scrollToTargetSection = (targetId: string) => {
    setMobileMenuOpen(false);
    setServicesOpen(false);

    const sectionName =
      targetId === "services-grid" || targetId === "services"
        ? "services"
        : targetId;

    if (isHomePage) {
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          setActiveSection(sectionName);
        }
      }
    } else {
      navigate("/");
      setTimeout(() => {
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setActiveSection("home");
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            const yOffset = -80;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveSection(sectionName);
          }
        }
      }, 100);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-8 lg:px-12",
        isScrolled
          ? "py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md text-slate-800"
          : "py-3.5 sm:py-4 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm text-slate-800"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Brand & Logo */}
        <button
          onClick={() => scrollToTargetSection("home")}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1 text-left cursor-pointer"
        >
          <div className="relative flex items-center justify-center p-0.5 rounded-xl transition-all duration-300 group-hover:scale-105">
            <img
              src="/trustmark-logo.png"
              alt="Trustmarks Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-base sm:text-lg tracking-wider font-sans leading-tight text-slate-900 transition-colors duration-200 group-hover:text-amber-600">
              TRUSTMARKS
            </span>
            <span className="font-bold text-[10px] sm:text-xs tracking-widest uppercase text-slate-500 transition-colors duration-200">
              CONSULTANTS PRIVATE LIMITED
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
          {/* HOME */}
          <button
            onClick={() => scrollToTargetSection("home")}
            className={cn(
              "px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
              isHomeActive
                ? "text-amber-500 font-extrabold"
                : "text-slate-700 hover:text-amber-600"
            )}
          >
            Home
          </button>

          {/* OUR SERVICES DYNAMIC DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => scrollToTargetSection("services")}
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none cursor-pointer",
                isServicesActive
                  ? "text-amber-500 font-extrabold"
                  : "text-slate-700 hover:text-amber-600"
              )}
              aria-expanded={servicesOpen}
            >
              <span>Our Services</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isServicesActive ? "text-amber-500" : "text-slate-400",
                  servicesOpen && "rotate-180 text-amber-500"
                )}
              />
            </button>

            {/* Services Dropdown Card with Modern Light Styling */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-92 xl:w-[420px] z-50"
                >
                  <div className="relative overflow-hidden bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-h-[75vh] overflow-y-auto">
                    {loading ? (
                      <div className="p-6 text-center text-xs text-slate-500 font-medium">
                        Loading services...
                      </div>
                    ) : services.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500 font-medium">
                        No services configured yet.
                      </div>
                    ) : (
                      <div className="space-y-1.5 relative z-10">
                        {services.map((srv) => {
                          const IconComp = getIconComponent(srv.icon_name || "ShieldCheck");
                          const showTag =
                            srv.tag &&
                            srv.tag.trim().toLowerCase() !== srv.title.trim().toLowerCase();

                          return (
                            <Link
                              key={srv.id || srv.slug}
                              to={`/service/${srv.slug}`}
                              onClick={() => setServicesOpen(false)}
                              className="group/item flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 transition-all duration-200 text-left shadow-xs"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-400/30 text-amber-600 flex items-center justify-center shrink-0 group-hover/item:scale-105 group-hover/item:bg-amber-400 group-hover/item:text-slate-950 group-hover/item:border-amber-400 transition-all duration-200 shadow-xs">
                                <IconComp className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[13px] font-bold text-slate-800 group-hover/item:text-amber-700 transition-colors truncate">
                                    {srv.title}
                                  </span>
                                  {showTag && (
                                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full border border-slate-300/40 group-hover/item:text-slate-700 transition-colors shrink-0">
                                      {srv.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11.5px] text-slate-500 group-hover/item:text-slate-600 mt-0.5 line-clamp-1 leading-snug font-normal transition-colors">
                                  {srv.card_description || srv.page_description}
                                </p>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-amber-500 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    <div className="mt-3 pt-2.5 border-t border-slate-100 px-2.5 flex items-center justify-between text-xs relative z-10">
                      <span className="text-[11px] font-medium text-slate-400">
                        Tailored for Gujarat &amp; Western India
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1.5 group/link cursor-pointer"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* INDUSTRIES */}
          <button
            onClick={() => scrollToTargetSection("industries")}
            className={cn(
              "px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
              isIndustriesActive
                ? "text-amber-500 font-extrabold"
                : "text-slate-700 hover:text-amber-600"
            )}
          >
            Industries
          </button>

          {/* ABOUT US */}
          <button
            onClick={() => scrollToTargetSection("about")}
            className={cn(
              "px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
              isAboutActive
                ? "text-amber-500 font-extrabold"
                : "text-slate-700 hover:text-amber-600"
            )}
          >
            About Us
          </button>

          {/* CONTACT US */}
          <button
            onClick={() => scrollToTargetSection("contact")}
            className={cn(
              "px-3 py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer",
              isContactActive
                ? "text-amber-500 font-extrabold"
                : "text-slate-700 hover:text-amber-600"
            )}
          >
            Contact Us
          </button>
        </nav>

        {/* Right Side: BOOK NOW button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onBookNowClick}
            className="relative group overflow-hidden font-extrabold text-xs sm:text-sm tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-md bg-[#EF7F1A] hover:bg-[#EF7F1A] text-black shadow-[0_4px_16px_rgba(245,186,19,0.35)]"
          >
            <span className="relative z-10 font-black">Book Now</span>
            <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 bg-black/90 text-[#F5BA13]">
              <Edit3 className="w-3.5 h-3.5" />
            </div>
          </motion.button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors focus:outline-none bg-slate-100 text-slate-700 hover:text-amber-600 hover:bg-slate-200 border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-3 pt-3 border-t border-slate-200 bg-white/98 backdrop-blur-2xl rounded-2xl p-4 shadow-xl space-y-3 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => scrollToTargetSection("home")}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                  activeSection === "home" && isHomePage
                    ? "text-amber-600 bg-amber-50 font-extrabold"
                    : "text-slate-700 hover:text-amber-600 hover:bg-slate-50"
                )}
              >
                Home
              </button>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                    isServicesActive
                      ? "text-amber-600 bg-amber-50 font-extrabold"
                      : "text-slate-700 hover:text-amber-600 hover:bg-slate-50"
                  )}
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      mobileServicesOpen ? "rotate-180 text-amber-600" : "text-slate-400"
                    )}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-amber-400 ml-3 my-1">
                    {services.map((srv) => (
                      <Link
                        key={srv.id || srv.slug}
                        to={`/service/${srv.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-amber-600 hover:bg-amber-50"
                      >
                        {srv.title}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-600 hover:underline"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Industries */}
              <button
                onClick={() => scrollToTargetSection("industries")}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors block cursor-pointer",
                  isIndustriesActive
                    ? "text-amber-600 bg-amber-50 font-extrabold"
                    : "text-slate-700 hover:text-amber-600 hover:bg-slate-50"
                )}
              >
                Industries
              </button>

              {/* Mobile About Us */}
              <button
                onClick={() => scrollToTargetSection("about")}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                  isAboutActive
                    ? "text-amber-600 bg-amber-50 font-extrabold"
                    : "text-slate-700 hover:text-amber-600 hover:bg-slate-50"
                )}
              >
                About Us
              </button>

              {/* Mobile Contact Us */}
              <button
                onClick={() => scrollToTargetSection("contact")}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                  isContactActive
                    ? "text-amber-600 bg-amber-50 font-extrabold"
                    : "text-slate-700 hover:text-amber-600 hover:bg-slate-50"
                )}
              >
                Contact Us
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBookNowClick) onBookNowClick();
                }}
                className="w-full bg-[#F5BA13] hover:bg-[#ffc82a] text-black font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book Service Consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
