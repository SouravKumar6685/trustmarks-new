import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Building2,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck,
  Award,
  Users,
  Clock,
  Send,
  Zap,
  Star,
  Receipt,
  Headphones,
  UserCheck,
  Scale,
  TrendingUp,
  FileText,
  HelpCircle,
  PlusSquare,
  ShoppingBag,
  Factory,
  PartyPopper,
  GraduationCap,
  ClipboardList,
  BarChart2,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookNowModal } from "@/components/common/BookNowModal";
import { sendReactEmail } from "@/lib/email";

import { getServiceBySlug } from "@/lib/supabase";
import { useServices } from "@/context/ServicesContext";
import type { Service } from "@/types/service";

// Helper for dynamic Lucide icon rendering
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case "ShieldCheck":
      return ShieldCheck;
    case "Shield":
      return Shield;
    case "Users":
      return Users;
    case "UserCheck":
      return UserCheck;
    case "Sparkles":
      return Sparkles;
    case "Cog":
      return ShieldCheck;
    case "GraduationCap":
      return GraduationCap;
    case "Building2":
      return Building2;
    case "Factory":
      return Factory;
    case "ShoppingBag":
      return ShoppingBag;
    case "PlusSquare":
      return PlusSquare;
    case "PartyPopper":
      return PartyPopper;
    case "Scale":
      return Scale;
    case "Headphones":
      return Headphones;
    case "FileText":
      return FileText;
    case "Receipt":
      return Receipt;
    case "Zap":
      return Zap;
    case "Clock":
      return Clock;
    case "Award":
      return Award;
    case "TrendingUp":
      return TrendingUp;
    case "ClipboardList":
      return ClipboardList;
    case "BarChart2":
      return BarChart2;
    default:
      return ShieldCheck;
  }
};

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { services: allServices, loading: contextLoading } = useServices();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
    serviceCategory: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadData() {
      setLoading(true);
      if (slug) {
        // Try to find in context first or fetch live
        const existing = allServices.find((s) => s.slug === slug);
        if (existing) {
          setService(existing);
          setLeadForm((prev) => ({ ...prev, serviceCategory: existing.title }));
          setLoading(false);
          return;
        }

        const data = await getServiceBySlug(slug);
        if (data) {
          setService(data);
          setLeadForm((prev) => ({ ...prev, serviceCategory: data.title }));
        } else {
          setService(null);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [slug, allServices]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) {
      alert("Please fill in your Name, Email, and Phone Number.");
      return;
    }

    try {
      setSubmitting(true);
      await sendReactEmail({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        service: leadForm.serviceCategory || service?.title || "Service Inquiry",
        location: "Gujarat / Western India",
        message: leadForm.requirements || `Proposal inquiry for ${service?.title || slug}`,
        source: `Service Detail Page: ${service?.title || slug}`,
        toEmail: "1109souravkumar@gmail.com",
      });

      setSubmitting(false);
      setFormSubmitted(true);
      setLeadForm({
        name: "",
        email: "",
        phone: "",
        requirements: "",
        serviceCategory: service?.title || "",
      });
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (err) {
      console.error("ServiceDetailPage lead submit error:", err);
      setSubmitting(false);
      setFormSubmitted(true);
    }
  };


  const scrollToContact = () => {
    const contactElem = document.getElementById("proposal-form");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsBookModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#EA580C] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-semibold tracking-wider text-sm">
            Loading Service Details...
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-[#0F172A]">Service Not Found</h1>
          <p className="text-sm text-slate-500">
            The requested service page does not exist or may have been modified in the Admin CMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate("/")}
              className="flex-1 px-5 py-3 rounded-full bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-all"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="flex-1 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all"
            >
              Go to Admin CMS
            </button>
          </div>
        </div>
      </div>
    );
  }

  const workProcesses = service.work_process_steps || [];
  const sectorItems = service.what_we_secure_items || [];
  const differentiators = service.differentiators || [];
  const industries = service.industries || [];
  const testimonials = service.testimonials || [];
  const faqs = service.faqs || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-amber-400 selection:text-black font-sans relative">
      {/* ========================================================================= */}
      {/* TOP NAVBAR: Consistent luxury dark/glass navbar matching main page */}
      {/* ========================================================================= */}
      <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: 100% Dynamic Admin Data matching exact placement */}
      {/* ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-white overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center">
        {/* Subtle decorative concentric arc watermark on left */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-slate-100/80 pointer-events-none z-0" />
        <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-slate-100/80 pointer-events-none z-0" />
        <div className="absolute top-1/2 -left-0 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-slate-100/60 pointer-events-none z-0" />

        {/* Dynamic Image on Right: Loaded from Admin CMS / Supabase */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-[48%] lg:w-[50%] xl:w-[48%] hidden md:block pointer-events-none z-0 overflow-hidden">
          <img
            src={service.image_url || "/service.png"}
            alt={service.title}
            className="w-full h-full object-cover object-top lg:object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/service.png";
            }}
          />
          {/* Feathered left edge to blend seamlessly with the white hero */}
          <div className="absolute inset-y-0 left-0 w-36 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content Column (Sits cleanly on white area) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left py-4">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Link to="/" className="hover:text-[#EA580C] transition-colors">
                  Home
                </Link>
                <span>&gt;</span>
                <Link to="/services" className="hover:text-[#EA580C] transition-colors">
                  Our Services
                </Link>
                <span>&gt;</span>
                <span className="text-[#EA580C] font-bold">{service.title}</span>
              </div>

              {/* Tag with short underline bar */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#EA580C] text-[11px] sm:text-xs font-black tracking-widest uppercase">
                  {service.tag || service.title}
                </span>
                <div className="w-8 h-[2px] bg-[#EA580C]" />
              </div>

              {/* Headline from Admin CMS */}
              <h1 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.12]">
                {service.hero_headline ? (
                  <span>{service.hero_headline}</span>
                ) : (
                  <>
                    Comprehensive {service.title}
                    <br />
                    Solutions <span className="text-[#EA580C]">You Can Trust</span>
                  </>
                )}
              </h1>

              {/* Narrative Subtitle Text from Admin/DB */}
              <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xl font-normal">
                {service.hero_subtitle || service.page_description}
              </p>

              {/* GET A QUOTE CTA Button matching reference image */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToContact}
                  className="group inline-flex items-center gap-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-black text-xs sm:text-sm tracking-wider uppercase pl-6 pr-2.5 py-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span>GET A QUOTE</span>
                  <div className="w-7 h-7 rounded-full bg-[#EA580C] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Mobile-only image fallback */}
            <div className="lg:hidden mt-4 block">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={service.image_url || "/service.png"}
                  alt={service.title}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/service.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. "HOW OUR SERVICES WORK": Floating White Card (Dynamic Admin Content) */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-10 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Left Column: Narrative Paragraphs from Admin CMS */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mb-2">
                    {service.how_it_works_title || `How Our ${service.title} Work`}
                  </h2>
                  <div className="w-10 h-[2.5px] bg-[#EA580C]" />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {service.how_it_works_paragraphs && service.how_it_works_paragraphs.length > 0 ? (
                    service.how_it_works_paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))
                  ) : (
                    <p>{service.page_description}</p>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Process Steps from Admin CMS */}
              <div className="lg:col-span-5 space-y-5">
                {workProcesses.map((proc, idx) => {
                  const ProcIcon = getIconComponent(proc.icon);
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 text-left pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      {/* Soft peach tinted circle icon */}
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0 text-[#EA580C] shadow-2xs">
                        <ProcIcon className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-sm font-black text-[#0F172A] mb-1">
                          {proc.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-normal">
                          {proc.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "WHAT WE SECURE": Dynamic Sectors Row + Action Banner */}
      {/* ========================================================================= */}
      {sectorItems.length > 0 && (
        <section className="py-8 sm:py-12 bg-white border-t border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mb-2">
                {service.what_we_secure_title || "What We Secure"}
              </h2>
              <div className="w-10 h-[2.5px] bg-[#EA580C]" />
            </div>

            {/* Sector Icons arranged horizontally */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center text-center">
              {sectorItems.map((item, idx) => {
                const ItemIcon = getIconComponent(item.icon);
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-2.5 p-3 group transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-[#0F172A] group-hover:text-[#EA580C] transition-colors">
                      <ItemIcon className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      <div>{item.title}</div>
                      <div>{item.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mid-Section Action Banner from Admin CMS */}
            <div className="mt-10 sm:mt-12 bg-[#0F172A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-white">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-[#EA580C] flex items-center justify-center text-white shrink-0 shadow-md">
                  <PhoneCall className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {service.banner_heading || `Need a Reliable ${service.title}?`}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    {service.banner_subheading || "Let's protect what matters most to you."}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-full shadow-lg transition-all cursor-pointer shrink-0"
              >
                <span>{service.banner_button_text || "CONTACT US"}</span>
                <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. WHY TRUSTMARKS: 9 Differentiators (Dynamic Admin Data & Light Theme) */}
      {/* ========================================================================= */}
      {differentiators.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80 relative overflow-hidden">
          {/* Subtle decorative concentric circle watermark on top right */}
          <div className="absolute top-10 -right-24 w-[480px] h-[480px] rounded-full border border-slate-200/70 pointer-events-none z-0" />
          <div className="absolute top-20 -right-12 w-[340px] h-[340px] rounded-full border border-slate-200/70 pointer-events-none z-0" />
          <div className="absolute top-32 -right-0 w-[200px] h-[200px] rounded-full border border-slate-200/60 pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
              <div className="flex flex-col items-center gap-1 mb-2">
                <span className="text-[#EA580C] text-[11px] sm:text-xs font-black tracking-widest uppercase">
                  WHY TRUSTMARKS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-black text-[#0F172A] tracking-tight leading-tight">
                {service.differentiators_title || "9 Differentiators That Set Us Apart"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed">
                {service.differentiators_subtitle ||
                  "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards."}
              </p>
            </div>

            {/* 3x3 Light Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {differentiators.map((item, idx) => {
                const MetricIcon = getIconComponent(item.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-200/70 hover:border-amber-300 hover:shadow-lg transition-all duration-300 text-left flex items-start gap-4 sm:gap-5 group"
                  >
                    {/* Soft Peach Tinted Circular Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shrink-0 text-[#EA580C] group-hover:scale-105 transition-transform duration-200 shadow-2xs">
                      <MetricIcon className="w-6 h-6 stroke-[2]" />
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                      <div className="text-xl sm:text-2xl font-black text-[#EA580C] leading-none mb-1">
                        {item.stat}
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-[#0F172A] leading-snug mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Banner from Admin CMS */}
            <div className="mt-10 sm:mt-12 bg-[#0F172A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-white">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#EA580C] shrink-0 shadow-md">
                  <PhoneCall className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {service.differentiators_banner_heading ||
                      "Ready to experience the Trustmarks difference?"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    {service.differentiators_banner_subheading ||
                      "Let's build a safer, smarter, and stronger tomorrow—together."}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase px-7 py-3 rounded-full shadow-lg transition-all cursor-pointer shrink-0"
              >
                <span>
                  {service.differentiators_banner_button_text || "GET IN TOUCH"}
                </span>
                <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. INDUSTRIES SERVED (Dynamic Admin CMS Data) */}
      {/* ========================================================================= */}
      {industries.length > 0 && (
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="flex flex-col items-center gap-1 mb-2.5">
                <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                  INDUSTRIES SERVED
                </span>
                <div className="w-10 h-[2px] bg-[#EA580C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {service.industries_title || (
                  <>
                    Sectors Relying on Our{" "}
                    <span className="text-[#EA580C]">{service.title}</span>
                  </>
                )}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {service.industries_subtitle ||
                  "Tailored protocols aligned precisely with the regulatory, environmental, and footfall demands of diverse industries."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, idx) => {
                const IndIcon = getIconComponent(ind.icon);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#EA580C]/40 transition-all duration-300 text-left flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#EA580C] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <IndIcon className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <h3 className="text-lg font-black text-[#0F172A] mb-2 group-hover:text-[#EA580C] transition-colors">
                        {ind.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {ind.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>{ind.tag || "Gujarat & Western India"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. TESTIMONIALS (Dynamic Admin CMS Data) */}
      {/* ========================================================================= */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="flex flex-col items-center gap-1 mb-2.5">
                <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                  TESTIMONIALS &amp; TRUST
                </span>
                <div className="w-10 h-[2px] bg-[#EA580C]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {service.testimonials_title || "What Facility & Plant Leaders Say"}
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                {service.testimonials_subtitle ||
                  "Hear directly from operations heads, facility directors, and HR leaders who rely on Trustmarks."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((test, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-4">
                      {[...Array(test.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed mb-6 font-normal">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60">
                    <div className="font-black text-sm text-[#0F172A]">{test.author}</div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {test.designation}
                    </div>
                    <div className="text-[11px] text-[#EA580C] font-semibold mt-0.5">
                      {test.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. CONTACT US & PROPOSAL QUOTE REQUEST FORM */}
      {/* ========================================================================= */}
      <section id="proposal-form" className="py-16 sm:py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct Call, WhatsApp & Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="flex flex-col items-start gap-1">
                <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
                  GET IN TOUCH
                </span>
                <div className="w-10 h-[2px] bg-amber-400" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {service.contact_title || `Request a Proposal for ${service.title}`}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {service.contact_subtitle ||
                  "Let our operations specialists conduct a complimentary site audit and provide an itemized, compliant commercial quote tailored to your facility."}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Headquarters:
                    </h4>
                    <p className="text-xs text-slate-400">
                      Capital City of Gujarat (Gandhinagar / Ahmedabad), India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Operations Helpline:
                    </h4>
                    <p className="text-xs text-slate-400">+91 9998399909 / 079-2324-5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Official Inquiries:
                    </h4>
                    <p className="text-xs text-slate-400">
                      contact@trustmarks.in / operations@trustmarks.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Call / WhatsApp Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href="tel:+919998399909"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Us Now</span>
                </a>
                <a
                  href="https://wa.me/919998399909"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-bold transition-all border border-[#25D366]/40"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Column: Customized Form */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-900/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
                <h3 className="text-lg font-black text-white mb-1">
                  Customized Proposal &amp; Quote Form
                </h3>
                <p className="text-xs text-slate-400 mb-6 font-normal">
                  Fill out the details below and an operations director will reach out within 2 business hours.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-black text-white">
                      Proposal Request Received!
                    </h4>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      Thank you. Our senior operations specialist has been notified and will contact you shortly with an itemized service proposal.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Shah"
                          value={leadForm.name}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 9998399909"
                          value={leadForm.phone}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, phone: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. admin@company.com"
                          value={leadForm.email}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, email: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          Service Category
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={leadForm.serviceCategory}
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-800/80 border border-white/10 text-amber-400 text-xs font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Operational Requirements &amp; Facility Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Estimated headcount required, shift timings, facility size in sq.ft, specific site location..."
                        value={leadForm.requirements}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, requirements: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{submitting ? "Submitting Request..." : "Submit Service Proposal Request"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (Dynamic Accordion from Admin CMS) */}
      {/* ========================================================================= */}
      {faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#EA580C] text-[11px] font-black tracking-widest uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-1">
                {service.faqs_title || (
                  <>
                    Got Questions Regarding{" "}
                    <span className="text-[#EA580C]">{service.title}</span>?
                  </>
                )}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                {service.faqs_subtitle ||
                  "Clear answers to common questions about our deployment timelines, compliance, and billing."}
              </p>
            </div>

            <div className="space-y-3 text-left">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-100/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                          {faq.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-[#EA580C]" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Book Now Consultation Modal */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        defaultService={service.title}
      />
    </div>
  );
};
