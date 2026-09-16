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
  Hospital,
  Warehouse,
  ShoppingCart,
  HeartPulse,
  UtensilsCrossed,
  HardHat,
  Landmark,
  Monitor,
  Laptop,
  Radio,
  Wifi,
  Truck,
  Briefcase,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookNowModal } from "@/components/common/BookNowModal";
import { sendReactEmail } from "@/lib/email";
import { getIndustryBySlug, getIndustries } from "@/lib/supabase";
import { useIndustries } from "@/context/IndustriesContext";
import type { Industry, IndustrySolutionItem } from "@/types/industry";

// Helper for dynamic Lucide icon rendering for Industry features and solutions
const getIconComponent = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case "building2":
    case "building":
    case "corporate":
      return Building2;
    case "factory":
    case "manufacturing":
    case "industrial":
      return Factory;
    case "warehouse":
    case "logistics":
      return Warehouse;
    case "shoppingbag":
    case "retail":
    case "mall":
      return ShoppingBag;
    case "shoppingcart":
      return ShoppingCart;
    case "hospital":
    case "healthcare":
    case "cross":
      return Hospital;
    case "heartpulse":
    case "medical":
      return HeartPulse;
    case "graduationcap":
    case "education":
    case "school":
      return GraduationCap;
    case "utensilscrossed":
    case "hospitality":
    case "hotel":
      return UtensilsCrossed;
    case "hardhat":
    case "construction":
      return HardHat;
    case "landmark":
    case "bank":
    case "financial":
      return Landmark;
    case "monitor":
    case "it":
    case "tech":
      return Monitor;
    case "laptop":
      return Laptop;
    case "users":
    case "event":
    case "manpower":
      return Users;
    case "usercheck":
      return UserCheck;
    case "partypopper":
      return PartyPopper;
    case "radio":
    case "telecom":
      return Radio;
    case "wifi":
      return Wifi;
    case "shieldcheck":
    case "shield":
    case "security":
      return ShieldCheck;
    case "truck":
    case "transport":
      return Truck;
    case "briefcase":
      return Briefcase;
    case "zap":
    case "energy":
      return Zap;
    case "sparkles":
      return Sparkles;
    case "clock":
      return Clock;
    case "award":
      return Award;
    case "scale":
      return Scale;
    case "headphones":
      return Headphones;
    case "filetext":
      return FileText;
    case "receipt":
      return Receipt;
    case "trendingup":
      return TrendingUp;
    case "clipboardlist":
      return ClipboardList;
    case "barchart2":
      return BarChart2;
    case "lock":
      return Lock;
    case "alerttriangle":
      return AlertTriangle;
    case "badgecheck":
      return BadgeCheck;
    default:
      return ShieldCheck;
  }
};

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { industries: allIndustries, loading: contextLoading } = useIndustries();

  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Proposal / Request Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    facilityLocation: "",
    manpowerRequired: "",
    requirements: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadIndustry() {
      if (!slug) return;
      setLoading(true);

      // 1. Try fetching from Supabase / LocalStorage helper
      const data = await getIndustryBySlug(slug);
      if (data) {
        setIndustry(data);
      } else {
        // 2. Fallback check inside allIndustries context
        const matched = allIndustries.find((i) => i.slug === slug);
        if (matched) {
          setIndustry(matched);
        } else {
          setIndustry(null);
        }
      }
      setLoading(false);
    }

    loadIndustry();
  }, [slug, allIndustries]);

  useEffect(() => {
    if (industry?.title) {
      document.title = `${industry.title} Facility & Security Solutions | Trustmarks`;
    } else {
      document.title = "Industry Solutions | Trustmarks Management Services";
    }
  }, [industry]);

  // Handle Proposal Submission
  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const emailDetails = {
      name: proposalForm.name,
      email: proposalForm.email,
      phone: proposalForm.phone,
      service: `Industry Proposal: ${industry?.title || "Custom Industry"}`,
      message: `[INDUSTRY PROPOSAL REQUEST]
Industry: ${industry?.title || "Not specified"}
Company: ${proposalForm.company || "Not provided"}
Location: ${proposalForm.facilityLocation || "Not provided"}
Estimated Workforce / Size: ${proposalForm.manpowerRequired || "Not provided"}
Additional Details: ${proposalForm.requirements || "None"}`,
    };

    try {
      const success = await sendReactEmail(emailDetails);
      if (success) {
        setFormSubmitted(true);
        setProposalForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          facilityLocation: "",
          manpowerRequired: "",
          requirements: "",
        });
      }
    } catch (err) {
      console.error("Proposal form error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Find other industries for bottom quick selector
  const otherIndustries = allIndustries
    .filter((i) => i.slug !== slug && i.is_active !== false)
    .slice(0, 4);

  if (loading || contextLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-semibold text-sm">Loading Industry Blueprint...</p>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
          <Building2 className="w-16 h-16 text-slate-300 mb-4" />
          <h1 className="text-2xl font-black text-slate-800 mb-2">Industry Sector Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">
            The industry sector you are looking for does not exist or has been relocated.
          </p>
          <div className="flex gap-4">
            <Link
              to="/industries"
              className="px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Browse All Industries
            </Link>
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const MainIcon = getIconComponent(industry.icon_name);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      {/* 1. Global Navigation */}
      <Navbar onBookNowClick={() => setIsBookModalOpen(true)} />

      {/* 2. Hero Header Section */}
      <section className="relative pt-32 pb-16 sm:pb-24 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <Link to="/industries" className="hover:text-amber-400 transition-colors">
              Industries We Serve
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">{industry.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <MainIcon className="w-4 h-4 text-amber-400" />
                <span>{industry.tag || `${industry.title} Workforce Solutions`}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {industry.hero_headline || (
                  <>
                    How We Help <span className="text-amber-400">{industry.title}</span> Scale &amp; Excel
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {industry.hero_subtitle || industry.description}
              </p>

              {/* Quick Hero Stat Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {(industry.hero_stats && industry.hero_stats.length > 0
                  ? industry.hero_stats
                  : [
                    { label: "Deployment Speed", value: "< 2 Hours", desc: "Rapid site mobilization" },
                    { label: "Statutory Compliance", value: "100%", desc: "PF, ESIC & labor law vetted" },
                    { label: "Client Retention", value: "98.7%", desc: "Long-term client partnerships" },
                  ]
                ).map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <div className="text-lg sm:text-xl font-black text-amber-400">{stat.value}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{stat.label}</div>
                    {stat.desc && <div className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</div>}
                  </div>
                ))}
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-orange-950/30 cursor-pointer"
                >
                  <span>Request Custom Sector Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+918292881188"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>24/7 Operations Desk</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 group bg-slate-800">
                <img
                  src={industry.image_url}
                  alt={industry.title}
                  className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-white space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sector Tailored Deployment</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Zero-Downtime Workforce &amp; Facility Operations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Key Challenges & Specialized Solutions (Pixel-Perfect Reference Match) */}
      {(() => {
        const defaultCorporateSolutions: IndustrySolutionItem[] = [
          {
            title: "Manned Security Services",
            desc: "Trained and verified security personnel to ensure a safe and secure workplace for employees, visitors and assets.",
            icon: "ShieldCheck",
            image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Front Office & Reception Management",
            desc: "Professional and courteous front desk staff to manage visitors, calls and administrative support with efficiency.",
            icon: "Users",
            image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Housekeeping Services",
            desc: "Clean, hygienic and well-maintained workspaces that create a healthier and more productive environment.",
            icon: "Sparkles",
            image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Facility Management",
            desc: "Preventive and reactive maintenance support for uninterrupted operations across electrical, HVAC, plumbing and more.",
            icon: "Cog",
            image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Pantry & Cafeteria Support",
            desc: "Well-trained staff for pantry, beverage and cafeteria services to ensure a seamless employee experience.",
            icon: "UtensilsCrossed",
            image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Administrative Support",
            desc: "Skilled support staff for day-to-day office operations, documentation and workflow management.",
            icon: "FileText",
            image_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Flexible Workforce Solutions",
            desc: "Scalable staffing support to manage peak workloads, projects and short-term requirements.",
            icon: "Briefcase",
            image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
          },
          {
            title: "Statutory Compliance Management",
            desc: "End-to-end compliance with labor laws, PF, ESIC, minimum wages and other regulatory requirements to eliminate enterprise liability.",
            icon: "Scale",
            image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
          },
        ];

        const activeSolutions =
          industry.solutions && industry.solutions.length > 0
            ? industry.solutions
            : defaultCorporateSolutions;

        return (
          <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Top Header Banner with Skyline & Script Badge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
                {/* Left Titles */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-2 text-[#EA580C] text-xs font-black tracking-widest uppercase">
                    <span className="w-6 h-0.5 bg-[#EA580C] inline-block" />
                    <span>{industry.tag || industry.title.toUpperCase()}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15]">
                    {industry.how_we_help_title || industry.challenges_title || (
                      <>
                        Key Challenges We Solve in <br />
                        <span className="text-[#EA580C]">{industry.title}</span>
                      </>
                    )}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                    {industry.how_we_help_subtitle || industry.challenges_subtitle ||
                      "Addressing high turnover, statutory liabilities, and operational bottlenecks with verified protocols."}
                  </p>
                </div>

                {/* Right Aesthetic Banner (Skyline + Script + Pillars) */}
                <div className="lg:col-span-5 relative h-36 sm:h-44 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                    alt="Corporate Workspace"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/50 to-slate-950/90" />

                  {/* Script Handwriting Accent */}
                  <div className="absolute inset-y-0 left-6 flex flex-col justify-center text-white z-10">
                    <div className="font-serif italic font-bold text-lg sm:text-xl text-amber-200 leading-tight">
                      Safe<br />
                      People<br />
                      Productive<br />
                      Workplaces
                    </div>
                    <div className="w-16 h-1 bg-[#EA580C] rounded-full mt-1.5 shadow" />
                  </div>

                  {/* Vertical / Pill Tags */}
                  <div className="absolute top-4 right-5 text-right z-10 text-[10px] font-black tracking-widest text-slate-300 space-y-0.5 uppercase">
                    <div>PEOPLE</div>
                    <div>SECURITY</div>
                    <div>OPERATIONS</div>
                    <div>GROWTH</div>
                    <div className="text-amber-400">TOGETHER</div>
                  </div>
                </div>
              </div>

              {/* 8 Visual Solution Cards (4 cols x 2 rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeSolutions.map((sol, idx) => {
                  const SolIcon = getIconComponent(sol.icon);
                  const fallbackCover =
                    defaultCorporateSolutions[idx % defaultCorporateSolutions.length]?.image_url ||
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 4) * 0.06 }}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#EA580C]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Card Cover Image */}
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img
                          src={sol.image_url || fallbackCover}
                          alt={sol.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackCover;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {sol.tag && (
                          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/20">
                            {sol.tag}
                          </span>
                        )}
                      </div>

                      {/* Floating Seam Icon Badge */}
                      <div className="relative -mt-6 ml-5 z-10 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-white shadow-md border border-orange-200/80 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white transition-all duration-300">
                          <SolIcon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-[#0F172A] leading-snug group-hover:text-[#EA580C] transition-colors mb-2">
                            {sol.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {sol.desc}
                          </p>
                        </div>

                        {sol.features && sol.features.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                            {sol.features.map((feat: string, fIdx: number) => (
                              <span
                                key={fIdx}
                                className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-[10px] font-medium"
                              >
                                • {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 5. Section: Key Benefits & Statutory Compliance Guarantees */}
      {industry.benefits && industry.benefits.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#0F172A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
              <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
                MEASURABLE ADVANTAGES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {industry.benefits_title || `Why Sector Leaders Choose Trustmarks for ${industry.title}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
                {industry.benefits_subtitle ||
                  "Zero compliance liabilities, guaranteed attendance SLAs, and audit-ready governance."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.benefits.map((b, idx) => {
                const BenIcon = getIconComponent(b.icon);
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-2">
                        {b.stat}
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                        <BenIcon className="w-4 h-4 text-amber-400" />
                        <span>{b.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Section: Measurable Case Study & Performance Highlights */}
      {industry.case_study_metrics && industry.case_study_metrics.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
              <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                REAL-WORLD IMPACT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                {industry.case_study_title || `Proven Track Record in ${industry.title}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                {industry.case_study_subtitle ||
                  "Verified performance benchmarks across enterprise sites and facilities."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.case_study_metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-orange-50/50 border border-orange-200/60 text-center space-y-1.5"
                >
                  <div className="text-3xl sm:text-4xl font-black text-[#EA580C]">{m.metric}</div>
                  <div className="text-sm font-bold text-slate-900">{m.label}</div>
                  {m.desc && <div className="text-xs text-slate-600">{m.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Section: Client Testimonials */}
      {industry.testimonials && industry.testimonials.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
              <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                CLIENT ENDORSEMENTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {industry.testimonials_title || `What ${industry.title} Leaders Say`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="text-xs font-black text-slate-900">{t.author}</div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {t.designation}, {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Section: Sector FAQs Accordion */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                CLARITY &amp; INSIGHTS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                {industry.faqs_title || `Frequently Asked Questions: ${industry.title}`}
              </h2>
            </div>

            <div className="space-y-4">
              {industry.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#EA580C] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-[#EA580C]" : ""
                          }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
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

      {/* 9. Section: Customized Sector Proposal Request Form */}
      <section id="quote-form" className="py-16 sm:py-24 bg-[#0F172A] text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
                TAILORED DEPLOYMENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {industry.contact_title || `Request a Custom Workforce Proposal for ${industry.title}`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {industry.contact_subtitle ||
                  "Tell us about your facility size, headcount requirements, and key operational priorities. Our sector lead will prepare a full feasibility study and transparent cost breakdown."}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>100% Statutory Compliance Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Proposal Turnaround within 24 Hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Direct Routing to Senior Operations Lead</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 bg-neutral-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Proposal Request Received!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you. Our sector specialist for <span className="text-amber-400 font-bold">{industry.title}</span> has received your requirements and will reach out to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={proposalForm.name}
                        onChange={(e) => setProposalForm({ ...proposalForm, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={proposalForm.email}
                        onChange={(e) => setProposalForm({ ...proposalForm, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={proposalForm.phone}
                        onChange={(e) => setProposalForm({ ...proposalForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={proposalForm.company}
                        onChange={(e) => setProposalForm({ ...proposalForm, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Facility Location / City
                      </label>
                      <input
                        type="text"
                        value={proposalForm.facilityLocation}
                        onChange={(e) =>
                          setProposalForm({ ...proposalForm, facilityLocation: e.target.value })
                        }
                        placeholder="e.g. Pune / Mumbai / Bangalore"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Estimated Workforce Needed
                      </label>
                      <input
                        type="text"
                        value={proposalForm.manpowerRequired}
                        onChange={(e) =>
                          setProposalForm({ ...proposalForm, manpowerRequired: e.target.value })
                        }
                        placeholder="e.g. 15-30 Staff / 50k sq.ft"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Scope of Work &amp; Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={proposalForm.requirements}
                      onChange={(e) =>
                        setProposalForm({ ...proposalForm, requirements: e.target.value })
                      }
                      placeholder={`Tell us about your security, housekeeping, electro-mechanical, or specialized staffing requirements for ${industry.title}...`}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Proposal Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Proposal Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Explore Other Industries Grid */}
      {otherIndustries.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[#EA580C] text-xs font-black tracking-widest uppercase">
                  CROSS-SECTOR COVERAGE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-1">
                  Explore Other Industries We Serve
                </h3>
              </div>
              <Link
                to="/industries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:underline"
              >
                <span>View All 12 Sectors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherIndustries.map((ind, idx) => {
                const IndIcon = getIconComponent(ind.icon_name);
                return (
                  <Link
                    key={ind.id || idx}
                    to={`/industry/${ind.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 text-[#EA580C] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IndIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors line-clamp-1">
                        {ind.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        Explore sector solutions &rarr;
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />

      {/* Book Now Modal */}
      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        defaultService={`Workforce for ${industry.title}`}
      />
    </div>
  );
};
