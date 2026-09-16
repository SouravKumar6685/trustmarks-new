import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Plus,
  X,
  Eye,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  UserCheck,
  GraduationCap,
  Scale,
  Headphones,
  CheckCircle2,
  Layers,
  FileText,
  HelpCircle,
  Star,
  PhoneCall,
  Zap,
  ArrowRight,
  ClipboardList,
  AlertTriangle,
  Factory,
  Warehouse,
  ShoppingBag,
  Hospital,
  HeartPulse,
  UtensilsCrossed,
  HardHat,
  Landmark,
  Monitor,
  Radio,
  Clock,
  TrendingUp,
  BarChart2,
  BadgeCheck,
} from "lucide-react";
import {
  getIndustryById,
  getIndustryBySlug,
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getCurrentAdminUser,
} from "@/lib/supabase";
import type {
  Industry,
  IndustryFormData,
  IndustryHeroStat,
  IndustryChallengeItem,
  IndustrySolutionItem,
  IndustryBenefitMetric,
  IndustryMetricHighlight,
  IndustryTestimonialItem,
  IndustryFAQItem,
} from "@/types/industry";
import { getIndustryIconComponent } from "@/components/common/IndustryCard";

const AVAILABLE_ICONS = [
  "Building2",
  "Factory",
  "Warehouse",
  "ShoppingBag",
  "ShoppingCart",
  "Hospital",
  "HeartPulse",
  "GraduationCap",
  "UtensilsCrossed",
  "HardHat",
  "Landmark",
  "Monitor",
  "Laptop",
  "Users",
  "PartyPopper",
  "Radio",
  "Wifi",
  "ShieldCheck",
  "Truck",
  "Briefcase",
  "Zap",
  "Sparkles",
  "Clock",
  "Scale",
  "FileText",
  "TrendingUp",
  "ClipboardList",
  "BarChart2",
  "AlertTriangle",
  "BadgeCheck",
];

type ActiveTabType =
  | "basic"
  | "solutions"
  | "benefits"
  | "case_study_testimonials"
  | "faqs_contact";

export const AdminIndustryEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [activeTab, setActiveTab] = useState<ActiveTabType>("basic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [industry, setIndustry] = useState<Industry | null>(null);

  // Form State
  const [formData, setFormData] = useState<IndustryFormData>({
    title: "",
    slug: "",
    description: "",
    image_url:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    icon_name: "Building2",
    tag: "",
    order_index: 1,
    is_active: true,

    // 1. Hero
    hero_headline: "",
    hero_subtitle: "",
    hero_stats: [
      { label: "Deployment Speed", value: "< 2 Hours", desc: "Rapid site mobilization" },
      { label: "Statutory Compliance", value: "100%", desc: "PF, ESIC & labor law vetted" },
      { label: "Client Retention", value: "98.7%", desc: "Long-term client partnerships" },
    ],

    // 2. Challenges
    challenges_title: "Sector-Specific Challenges We Address",
    challenges_subtitle:
      "Navigating workforce unpredictability, compliance burdens, and high-stakes operations requires specialized domain expertise.",
    challenges: [],

    // 3. Solutions Matrix
    how_we_help_title: "How Trustmarks Empowers This Sector",
    how_we_help_subtitle:
      "From vetted personnel and round-the-clock supervision to stringent quality protocols, discover our dedicated service matrix.",
    solutions: [],

    // 4. Benefits
    benefits_title: "Why Sector Leaders Choose Trustmarks",
    benefits_subtitle:
      "Zero compliance liabilities, guaranteed attendance SLAs, and audit-ready governance.",
    benefits: [],

    // 5. Case Study & Metrics
    case_study_title: "Real-World Impact & Benchmarks",
    case_study_subtitle: "Verified performance benchmarks across enterprise sites and facilities.",
    case_study_metrics: [],

    // 6. Testimonials
    testimonials_title: "What Sector Leaders Say",
    testimonials: [],

    // 7. FAQs
    faqs_title: "Frequently Asked Questions",
    faqs: [],

    // 8. Contact
    contact_title: "Request a Custom Sector Proposal",
    contact_subtitle:
      "Tell us about your facility size, headcount requirements, and key operational priorities. Our sector lead will prepare a full feasibility study.",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  useEffect(() => {
    async function checkAuthAndLoad() {
      const user = await getCurrentAdminUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }

      if (!isNew && id) {
        setLoading(true);
        const data = await getIndustryById(id);
        if (data) {
          setIndustry(data);
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            description: data.description || "",
            image_url:
              data.image_url ||
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            icon_name: data.icon_name || "Building2",
            tag: data.tag || "",
            order_index: data.order_index ?? 1,
            is_active: data.is_active !== false,

            hero_headline: data.hero_headline || "",
            hero_subtitle: data.hero_subtitle || "",
            hero_stats: data.hero_stats || [],

            challenges_title: data.challenges_title || "Sector-Specific Challenges We Address",
            challenges_subtitle: data.challenges_subtitle || "",
            challenges: data.challenges || [],

            how_we_help_title: data.how_we_help_title || "How Trustmarks Empowers This Sector",
            how_we_help_subtitle: data.how_we_help_subtitle || "",
            solutions: data.solutions || [],

            benefits_title: data.benefits_title || "Why Sector Leaders Choose Trustmarks",
            benefits_subtitle: data.benefits_subtitle || "",
            benefits: data.benefits || [],

            case_study_title: data.case_study_title || "Real-World Impact & Benchmarks",
            case_study_subtitle: data.case_study_subtitle || "",
            case_study_metrics: data.case_study_metrics || [],

            testimonials_title: data.testimonials_title || "What Sector Leaders Say",
            testimonials: data.testimonials || [],

            faqs_title: data.faqs_title || "Frequently Asked Questions",
            faqs: data.faqs || [],

            contact_title: data.contact_title || "Request a Custom Sector Proposal",
            contact_subtitle: data.contact_subtitle || "",
          });
          setImagePreviewUrl(data.image_url);
        } else {
          showToast("Industry not found, creating new instead.");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    checkAuthAndLoad();
  }, [id, isNew, navigate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Generate slug automatically when title changes if new
  const handleTitleChange = (val: string) => {
    if (isNew && !formData.slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData({ ...formData, title: val, slug: generatedSlug });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  // Handle local image file pick
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const result = loadEvt.target?.result as string;
      setImagePreviewUrl(result);
      setFormData((prev) => ({ ...prev, image_url: result }));
    };
    reader.readAsDataURL(file);
  };

  // Save All Changes
  const handleSave = async () => {
    if (!formData.title.trim()) {
      showToast("Please enter an industry sector title.");
      return;
    }

    setSaving(true);
    const slugToUse =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const payload: IndustryFormData = {
      ...formData,
      slug: slugToUse,
    };

    try {
      if (isNew) {
        const created = await createIndustry(payload, selectedImageFile);
        if (created) {
          showToast("Industry sector created successfully!");
          navigate(`/admin/industries/edit/${created.id}`);
        } else {
          showToast("Failed to create industry.");
        }
      } else if (id) {
        const updated = await updateIndustry(id, payload, selectedImageFile);
        if (updated) {
          showToast("Industry sector updated successfully!");
          setIndustry(updated);
        } else {
          showToast("Failed to update industry.");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-semibold text-sm">Loading Industry CMS...</p>
      </div>
    );
  }

  const CurrentIcon = getIndustryIconComponent(formData.icon_name);

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#EA580C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-fade-in text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                Industry Sector CMS
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-xs text-slate-400 font-mono">
                {formData.slug ? `/industry/${formData.slug}` : "New Sector"}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-white leading-tight">
              {formData.title ? formData.title : "Create New Industry Sector"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isNew && formData.slug && (
            <Link
              to={`/industry/${formData.slug}`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Preview Live</span>
            </Link>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isNew ? "Create Industry" : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 no-scrollbar">
          {[
            { id: "basic", label: "1. Basic & Hero", icon: Building2 },
            { id: "solutions", label: "2. Key Challenges & Solutions", icon: ShieldCheck },
            { id: "benefits", label: "3. Benefits & SLAs", icon: BadgeCheck },
            { id: "case_study_testimonials", label: "4. Metrics & Testimonials", icon: Star },
            { id: "faqs_contact", label: "5. FAQs & Proposal Form", icon: HelpCircle },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTabType)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#EA580C] text-white shadow-lg shadow-orange-950/40"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BASIC & HERO */}
        {activeTab === "basic" && (
          <div className="space-y-8 animate-fade-in">
            {/* General Info Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">General Information</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Basic sector identifier, thumbnail photo, and live visibility status.
                  </p>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  <input
                    type="checkbox"
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 accent-[#EA580C]"
                  />
                  <span className="text-xs font-bold text-slate-200">Visible on Website</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Sector Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Healthcare & Hospitals"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. healthcare-hospitals"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white font-mono focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Header Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag || ""}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Clinical Sanitation & Security"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Sector Icon
                </label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 rounded-2xl bg-black/40 border border-white/10">
                  {AVAILABLE_ICONS.map((iconName) => {
                    const IconComp = getIndustryIconComponent(iconName);
                    const isSelected = formData.icon_name === iconName;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon_name: iconName })}
                        className={`p-2.5 rounded-xl flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#EA580C] text-white"
                            : "bg-white/5 hover:bg-white/10 text-slate-300"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{iconName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value });
                      setImagePreviewUrl(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#EA580C]"
                  />
                  <div className="mt-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold cursor-pointer transition-colors border border-white/10">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Cover Preview
                  </label>
                  <div className="h-36 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative">
                    <img
                      src={imagePreviewUrl || formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Card Summary (Shown on /industries Grid) *
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive workforce, hygiene, and security management engineered for..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#EA580C] resize-none"
                />
              </div>
            </div>

            {/* Hero Section Config */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">Hero Header Content</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Headline, value proposition subtitle, and 3 key hero stats.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={formData.hero_headline || ""}
                    onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                    placeholder="e.g. How We Help Healthcare Facilities Scale & Excel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.hero_subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                    placeholder="e.g. Providing hospital-grade infection control, patient transport, and 24/7 security..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              {/* Hero Stats */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Hero Quick Stats (3 Chips)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.hero_stats || [];
                      setFormData({
                        ...formData,
                        hero_stats: [
                          ...current,
                          { label: "New Metric", value: "99.9%", desc: "Brief description" },
                        ],
                      });
                    }}
                    className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stat</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(formData.hero_stats || []).map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(formData.hero_stats || [])];
                          updated.splice(idx, 1);
                          setFormData({ ...formData, hero_stats: updated });
                        }}
                        className="absolute top-2 right-2 p-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...(formData.hero_stats || [])];
                            updated[idx].value = e.target.value;
                            setFormData({ ...formData, hero_stats: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...(formData.hero_stats || [])];
                            updated[idx].label = e.target.value;
                            setFormData({ ...formData, hero_stats: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={stat.desc || ""}
                          onChange={(e) => {
                            const updated = [...(formData.hero_stats || [])];
                            updated[idx].desc = e.target.value;
                            setFormData({ ...formData, hero_stats: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KEY CHALLENGES & SOLUTIONS MATRIX */}
        {activeTab === "solutions" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Key Challenges &amp; Solutions Matrix
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Configure the 8 modular service &amp; solution cards displayed in the reference grid (photos, icons, titles, and descriptions).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.solutions || [];
                    setFormData({
                      ...formData,
                      solutions: [
                        ...current,
                        {
                          title: "New Sector Solution",
                          desc: "Comprehensive operational protocols and specialized manpower.",
                          tag: "Specialized",
                          features: ["Trained Personnel", "Compliance Vetted", "24/7 Supervision"],
                          icon: "ShieldCheck",
                        },
                      ],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Solution Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.how_we_help_title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, how_we_help_title: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.how_we_help_subtitle || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, how_we_help_subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* Solutions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {(formData.solutions || []).map((sol, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(formData.solutions || [])];
                        updated.splice(idx, 1);
                        setFormData({ ...formData, solutions: updated });
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Solution Title
                        </label>
                        <input
                          type="text"
                          value={sol.title}
                          onChange={(e) => {
                            const updated = [...(formData.solutions || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, solutions: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-bold"
                          placeholder="e.g. Manned Security Services"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Icon (Lucide)
                        </label>
                        <input
                          type="text"
                          value={sol.icon || "ShieldCheck"}
                          onChange={(e) => {
                            const updated = [...(formData.solutions || [])];
                            updated[idx].icon = e.target.value;
                            setFormData({ ...formData, solutions: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400 font-mono"
                          placeholder="e.g. Shield, Users, Sparkles"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Tag Badge
                        </label>
                        <input
                          type="text"
                          value={sol.tag || ""}
                          onChange={(e) => {
                            const updated = [...(formData.solutions || [])];
                            updated[idx].tag = e.target.value;
                            setFormData({ ...formData, solutions: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400"
                        />
                      </div>
                    </div>

                    {/* Image URL with Preview */}
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Card Cover Photo URL
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={sol.image_url || ""}
                          onChange={(e) => {
                            const updated = [...(formData.solutions || [])];
                            updated[idx].image_url = e.target.value;
                            setFormData({ ...formData, solutions: updated });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono"
                          placeholder="https://images.unsplash.com/photo-..."
                        />
                        {sol.image_url && (
                          <img
                            src={sol.image_url}
                            alt="preview"
                            className="w-10 h-10 rounded-lg object-cover border border-white/20 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={sol.desc}
                        onChange={(e) => {
                          const updated = [...(formData.solutions || [])];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, solutions: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 resize-none"
                      />
                    </div>

                    {/* Features Chips */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] text-slate-400 uppercase font-bold">
                          Key Features / Bullets
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(formData.solutions || [])];
                            const currentFeats = updated[idx].features || [];
                            updated[idx].features = [...currentFeats, "New Feature Bullet"];
                            setFormData({ ...formData, solutions: updated });
                          }}
                          className="text-[10px] text-amber-400 hover:underline font-bold"
                        >
                          + Add Feature
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(sol.features || []).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const updated = [...(formData.solutions || [])];
                                const currentFeats = [...(updated[idx].features || [])];
                                currentFeats[fIdx] = e.target.value;
                                updated[idx].features = currentFeats;
                                setFormData({ ...formData, solutions: updated });
                              }}
                              className="flex-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(formData.solutions || [])];
                                const currentFeats = [...(updated[idx].features || [])];
                                currentFeats.splice(fIdx, 1);
                                updated[idx].features = currentFeats;
                                setFormData({ ...formData, solutions: updated });
                              }}
                              className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BENEFITS & SLAS */}
        {activeTab === "benefits" && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Why Choose Trustmarks (Benefits &amp; SLAs)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Statutory compliance guarantees, rapid response times, and governance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.benefits || [];
                    setFormData({
                      ...formData,
                      benefits: [
                        ...current,
                        {
                          stat: "100%",
                          title: "Statutory Law Compliance",
                          desc: "Direct ESIC, PF, and statutory payroll filings with zero legal liability.",
                          icon: "Scale",
                        },
                      ],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Benefit Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.benefits_title || ""}
                    onChange={(e) => setFormData({ ...formData, benefits_title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.benefits_subtitle || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits_subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {(formData.benefits || []).map((ben, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(formData.benefits || [])];
                        updated.splice(idx, 1);
                        setFormData({ ...formData, benefits: updated });
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Big Stat (e.g. 100%)
                        </label>
                        <input
                          type="text"
                          value={ben.stat}
                          onChange={(e) => {
                            const updated = [...(formData.benefits || [])];
                            updated[idx].stat = e.target.value;
                            setFormData({ ...formData, benefits: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400 font-black text-lg"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Benefit Title
                        </label>
                        <input
                          type="text"
                          value={ben.title}
                          onChange={(e) => {
                            const updated = [...(formData.benefits || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, benefits: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={ben.desc}
                        onChange={(e) => {
                          const updated = [...(formData.benefits || [])];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, benefits: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CASE STUDY & TESTIMONIALS */}
        {activeTab === "case_study_testimonials" && (
          <div className="space-y-8 animate-fade-in">
            {/* Real-World Metrics */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Real-World Results &amp; Benchmarks
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Metric badges showing measurable gains achieved by our sector deployments.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.case_study_metrics || [];
                    setFormData({
                      ...formData,
                      case_study_metrics: [
                        ...current,
                        { metric: "99.9%", label: "Uptime SLA", desc: "Across all shifts" },
                      ],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add Benchmark</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {(formData.case_study_metrics || []).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 relative"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(formData.case_study_metrics || [])];
                        updated.splice(idx, 1);
                        setFormData({ ...formData, case_study_metrics: updated });
                      }}
                      className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Metric
                      </label>
                      <input
                        type="text"
                        value={m.metric}
                        onChange={(e) => {
                          const updated = [...(formData.case_study_metrics || [])];
                          updated[idx].metric = e.target.value;
                          setFormData({ ...formData, case_study_metrics: updated });
                        }}
                        className="w-full px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#EA580C] font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => {
                          const updated = [...(formData.case_study_metrics || [])];
                          updated[idx].label = e.target.value;
                          setFormData({ ...formData, case_study_metrics: updated });
                        }}
                        className="w-full px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">Client Testimonials</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Endorsements from plant directors, facility heads, and operations leaders.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.testimonials || [];
                    setFormData({
                      ...formData,
                      testimonials: [
                        ...current,
                        {
                          quote:
                            "Trustmarks provided unparalleled reliability, eliminating absenteeism and ensuring 100% statutory adherence.",
                          author: "Operations Director",
                          designation: "VP Facilities",
                          company: "Enterprise Corp",
                          rating: 5,
                        },
                      ],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Testimonial</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.testimonials || []).map((t, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(formData.testimonials || [])];
                        updated.splice(idx, 1);
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Quote
                      </label>
                      <textarea
                        rows={3}
                        value={t.quote}
                        onChange={(e) => {
                          const updated = [...(formData.testimonials || [])];
                          updated[idx].quote = e.target.value;
                          setFormData({ ...formData, testimonials: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={t.author}
                          onChange={(e) => {
                            const updated = [...(formData.testimonials || [])];
                            updated[idx].author = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Designation
                        </label>
                        <input
                          type="text"
                          value={t.designation}
                          onChange={(e) => {
                            const updated = [...(formData.testimonials || [])];
                            updated[idx].designation = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={t.company}
                          onChange={(e) => {
                            const updated = [...(formData.testimonials || [])];
                            updated[idx].company = e.target.value;
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="w-full px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQS & CONTACT */}
        {activeTab === "faqs_contact" && (
          <div className="space-y-8 animate-fade-in">
            {/* FAQs */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Common queries regarding mobilization, SLAs, compliance, and billing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const current = formData.faqs || [];
                    setFormData({
                      ...formData,
                      faqs: [
                        ...current,
                        {
                          q: "What is your typical deployment turnaround time?",
                          a: "Standard sites are mobilized within 48 to 72 hours, while emergency reserve personnel can be dispatched within 2 hours.",
                        },
                      ],
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ Item</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.faqs || []).map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(formData.faqs || [])];
                        updated.splice(idx, 1);
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const updated = [...(formData.faqs || [])];
                          updated[idx].q = e.target.value;
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                        Answer
                      </label>
                      <textarea
                        rows={2}
                        value={faq.a}
                        onChange={(e) => {
                          const updated = [...(formData.faqs || [])];
                          updated[idx].a = e.target.value;
                          setFormData({ ...formData, faqs: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposal CTA Text */}
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  Proposal Form CTA Copy
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submissions from this form on the live site automatically route to{" "}
                  <span className="text-amber-400 font-mono font-bold">
                    1109souravkumar@gmail.com
                  </span>
                  .
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={formData.contact_title || ""}
                    onChange={(e) => setFormData({ ...formData, contact_title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Form Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.contact_subtitle || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contact_subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
