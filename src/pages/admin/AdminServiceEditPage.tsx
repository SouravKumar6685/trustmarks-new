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
  Cog,
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
} from "lucide-react";
import {
  getServiceBySlug,
  getServices,
  createService,
  updateService,
  deleteService,
  getCurrentAdminUser,
} from "@/lib/supabase";
import type {
  Service,
  ServiceFormData,
  WorkProcessStep,
  SectorItem,
  DifferentiatorMetric,
  IndustryItem,
  TestimonialItem,
  FAQItem,
} from "@/types/service";

const AVAILABLE_ICONS = [
  "ShieldCheck",
  "Users",
  "Sparkles",
  "Cog",
  "UserCheck",
  "GraduationCap",
  "Building2",
  "Briefcase",
  "Scale",
  "Headphones",
  "FileText",
  "Zap",
  "PhoneCall",
  "ClipboardList",
];

type ActiveTabType =
  | "basic"
  | "how_it_works"
  | "what_we_secure"
  | "differentiators"
  | "industries"
  | "testimonials"
  | "faqs_contact";

export const AdminServiceEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [activeTab, setActiveTab] = useState<ActiveTabType>("basic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [service, setService] = useState<Service | null>(null);

  // Form State
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    slug: "",
    card_description: "",
    page_description: "",
    image_url: "/service.png",
    icon_name: "ShieldCheck",
    tag: "",
    features: [],

    // 1. Hero
    hero_headline: "",
    hero_subtitle: "",

    // 2. How It Works
    how_it_works_title: "How Our Services Work",
    how_it_works_paragraphs: [""],
    work_process_steps: [],

    // 3. What We Secure
    what_we_secure_title: "What We Secure",
    what_we_secure_items: [],
    banner_heading: "Need a Reliable Solution?",
    banner_subheading: "Let's protect what matters most to you.",
    banner_button_text: "CONTACT US",

    // 4. 9 Differentiators
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: [],
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",

    // 5. Industries
    industries_title: "Sectors Relying on Our Services",
    industries_subtitle:
      "Tailored protocols aligned precisely with the regulatory, environmental, and footfall demands of diverse industries.",
    industries: [],

    // 6. Testimonials
    testimonials_title: "What Facility & Plant Leaders Say",
    testimonials_subtitle:
      "Hear directly from operations heads, facility directors, and HR leaders who rely on Trustmarks.",
    testimonials: [],

    // 7. FAQs
    faqs_title: "Frequently Asked Questions",
    faqs_subtitle:
      "Clear answers to common questions about our deployment timelines, compliance, and billing.",
    faqs: [],

    // 8. Contact
    contact_title: "Request a Proposal Quote",
    contact_subtitle:
      "Let our operations specialists conduct a complimentary site audit and provide an itemized, compliant commercial quote.",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function init() {
      // Check auth
      const user = await getCurrentAdminUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }

      if (!isNew && id) {
        const all = await getServices();
        const found = all.find((s) => s.id === id || s.slug === id);
        if (found) {
          setService(found);
          setFormData({
            title: found.title,
            slug: found.slug,
            card_description: found.card_description,
            page_description: found.page_description,
            image_url: found.image_url,
            icon_name: found.icon_name || "ShieldCheck",
            tag: found.tag || "",
            features: found.features || [],

            // 1. Hero
            hero_headline: found.hero_headline || `Comprehensive ${found.title} Solutions You Can Trust`,
            hero_subtitle: found.hero_subtitle || found.page_description,

            // 2. How It Works
            how_it_works_title: found.how_it_works_title || `How Our ${found.title} Work`,
            how_it_works_paragraphs:
              found.how_it_works_paragraphs && found.how_it_works_paragraphs.length > 0
                ? found.how_it_works_paragraphs
                : [found.page_description],
            work_process_steps: found.work_process_steps || [],

            // 3. What We Secure
            what_we_secure_title: found.what_we_secure_title || "What We Secure",
            what_we_secure_items: found.what_we_secure_items || [],
            banner_heading: found.banner_heading || `Need a Reliable ${found.title}?`,
            banner_subheading: found.banner_subheading || "Let's protect what matters most to you.",
            banner_button_text: found.banner_button_text || "CONTACT US",

            // 4. 9 Differentiators
            differentiators_title: found.differentiators_title || "9 Differentiators That Set Us Apart",
            differentiators_subtitle:
              found.differentiators_subtitle ||
              "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
            differentiators: found.differentiators || [],
            differentiators_banner_heading:
              found.differentiators_banner_heading || "Ready to experience the Trustmarks difference?",
            differentiators_banner_subheading:
              found.differentiators_banner_subheading ||
              "Let's build a safer, smarter, and stronger tomorrow—together.",
            differentiators_banner_button_text:
              found.differentiators_banner_button_text || "GET IN TOUCH",

            // 5. Industries
            industries_title: found.industries_title || `Sectors Relying on Our ${found.title}`,
            industries_subtitle:
              found.industries_subtitle ||
              "Tailored protocols aligned precisely with the regulatory, environmental, and footfall demands of diverse industries.",
            industries: found.industries || [],

            // 6. Testimonials
            testimonials_title: found.testimonials_title || "What Facility & Plant Leaders Say",
            testimonials_subtitle:
              found.testimonials_subtitle ||
              "Hear directly from operations heads, facility directors, and HR leaders who rely on Trustmarks.",
            testimonials: found.testimonials || [],

            // 7. FAQs
            faqs_title: found.faqs_title || `Got Questions Regarding ${found.title}?`,
            faqs_subtitle:
              found.faqs_subtitle ||
              "Clear answers to common questions about our deployment timelines, compliance, and billing.",
            faqs: found.faqs || [],

            // 8. Contact
            contact_title: found.contact_title || `Request a Proposal for ${found.title}`,
            contact_subtitle:
              found.contact_subtitle ||
              "Let our operations specialists conduct a complimentary site audit and provide an itemized, compliant commercial quote.",
          });
          setPreviewUrl(found.image_url);
        }
      } else {
        // Default new service template
        setFormData((prev) => ({
          ...prev,
          title: "New Service",
          slug: "new-service",
          tag: "SERVICE CATEGORY",
          card_description: "Concise summary for homepage 6-card grid.",
          page_description: "Comprehensive detailed overview of the service.",
          hero_headline: "Comprehensive Solutions You Can Trust",
          hero_subtitle: "Reliable and customized solutions tailored to your organization.",
          how_it_works_title: "How Our Services Work",
          how_it_works_paragraphs: ["Describe your service process step by step."],
          work_process_steps: [
            { icon: "ClipboardList", title: "Assessment", desc: "Evaluating needs and vulnerabilities." },
            { icon: "Shield", title: "Custom Plan", desc: "Tailoring strategy and requirements." },
            { icon: "UserCheck", title: "Deployment", desc: "Deploying certified professionals." },
            { icon: "BarChart2", title: "Auditing", desc: "Ensuring continuous enhancement." },
          ],
        }));
      }
      setLoading(false);
    }
    init();
  }, [id, isNew, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      if (isNew) {
        const created = await createService(formData, selectedFile);
        setSaveSuccess(true);
        setTimeout(() => {
          navigate(`/admin/services/edit/${created.id}`);
        }, 800);
      } else if (service) {
        const updated = await updateService(service.id, formData, selectedFile);
        if (updated) {
          setService(updated);
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (err: any) {
      console.error("Save error:", err);
      alert("Failed to save service in Supabase: " + (err?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!service) return;
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        setSaving(true);
        await deleteService(service.id);
        navigate("/admin");
      } catch (err: any) {
        console.error("Delete failed:", err);
        alert("Failed to delete service from Supabase: " + (err?.message || "Unknown error"));
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-300 font-semibold tracking-wider">Loading CMS Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 font-sans pb-24">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                CMS SERVICE EDITOR
              </span>
              <span className="text-xs text-slate-500">/</span>
              <span className="text-xs text-slate-400 font-mono">
                {formData.slug || "new-service"}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-white leading-tight">
              {isNew ? "Create New Service" : `Edit: ${formData.title}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && service && (
            <Link
              to={`/service/${service.slug}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-between text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All updates and minute details saved successfully to database!</span>
            </div>
            <Link to={`/service/${formData.slug}`} className="underline text-emerald-200">
              Preview Page &rarr;
            </Link>
          </motion.div>
        )}

        {/* CMS Section Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/10 text-xs font-bold scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "basic"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            1. Hero &amp; Basic Info
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("how_it_works")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "how_it_works"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            2. How It Works &amp; Steps
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("what_we_secure")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "what_we_secure"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            3. What We Secure &amp; Banner
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("differentiators")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "differentiators"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            4. 9 Differentiators
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("industries")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "industries"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            5. Industries Served
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("testimonials")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "testimonials"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            6. Testimonials
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("faqs_contact")}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "faqs_contact"
                ? "bg-amber-400 text-black shadow-md font-extrabold"
                : "bg-neutral-900 text-slate-300 hover:bg-neutral-800"
            }`}
          >
            7. FAQs &amp; Contact
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ========================================================================= */}
          {/* TAB 1: BASIC & HERO SECTION */}
          {/* ========================================================================= */}
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>General Service Settings</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Service Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                            slug: isNew
                              ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                              : formData.slug,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Badge Icon
                      </label>
                      <select
                        value={formData.icon_name}
                        onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      >
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic} value={ic}>
                            {ic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Tag Badge Text
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SECURITY SERVICES"
                        value={formData.tag || ""}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Card Description (Homepage 6-Card Grid Summary) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.card_description}
                      onChange={(e) => setFormData({ ...formData, card_description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Hero Section Content */}
                <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Hero Section Content (Top of Detail Page)</span>
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Hero Main Headline *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Comprehensive Security Solutions You Can Trust"
                      value={formData.hero_headline || ""}
                      onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Hero Subtitle / Narrative Paragraph *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.hero_subtitle || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hero_subtitle: e.target.value,
                          page_description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Image Uploader */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl">
                  <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-400" />
                    <span>Service Personnel Photo</span>
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Uploaded directly to Supabase Storage bucket <code className="text-amber-300">services</code>.
                  </p>

                  <div className="border-2 border-dashed border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-neutral-800/40 hover:bg-neutral-800/70 transition-colors relative">
                    {previewUrl ? (
                      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-neutral-900 shadow-md">
                        <img
                          src={previewUrl}
                          alt="Service Preview"
                          className="w-full h-full object-cover object-top"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl("");
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-full text-white hover:bg-red-600 transition-colors cursor-pointer"
                          title="Clear image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Upload className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                        <p className="text-xs text-slate-200 font-bold">Select service photo</p>
                        <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP</p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HOW IT WORKS & PROCESS STEPS */}
          {/* ========================================================================= */}
          {activeTab === "how_it_works" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.how_it_works_title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, how_it_works_title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Paragraphs Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Detailed Narrative Paragraphs (Left Column)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Add structured paragraphs explaining your service process in depth.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          how_it_works_paragraphs: [
                            ...(formData.how_it_works_paragraphs || []),
                            "",
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Paragraph
                    </button>
                  </div>

                  {(formData.how_it_works_paragraphs || []).map((para, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-neutral-800 text-slate-400 text-xs flex items-center justify-center font-bold shrink-0 mt-2">
                        {idx + 1}
                      </span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...(formData.how_it_works_paragraphs || [])];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, how_it_works_paragraphs: updated });
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.how_it_works_paragraphs || []).filter(
                            (_, i) => i !== idx
                          );
                          setFormData({ ...formData, how_it_works_paragraphs: updated });
                        }}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors mt-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 4 Process Steps Builder */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Vertical Process Steps (Right Column)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Step-by-step capability cards shown on the right side.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          work_process_steps: [
                            ...(formData.work_process_steps || []),
                            { icon: "Shield", title: "New Step", desc: "Step description..." },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Step
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.work_process_steps || []).map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-amber-400 font-bold">
                            Step 0{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (formData.work_process_steps || []).filter(
                                (_, i) => i !== idx
                              );
                              setFormData({ ...formData, work_process_steps: updated });
                            }}
                            className="p-1 rounded-lg text-red-400 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Step Title</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const updated = [...(formData.work_process_steps || [])];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, work_process_steps: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Icon</label>
                            <select
                              value={step.icon || "Shield"}
                              onChange={(e) => {
                                const updated = [...(formData.work_process_steps || [])];
                                updated[idx].icon = e.target.value;
                                setFormData({ ...formData, work_process_steps: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            >
                              <option value="ClipboardList">ClipboardList</option>
                              <option value="Shield">Shield</option>
                              <option value="UserCheck">UserCheck</option>
                              <option value="BarChart2">BarChart2</option>
                              <option value="Zap">Zap</option>
                              <option value="Sparkles">Sparkles</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={step.desc}
                            onChange={(e) => {
                              const updated = [...(formData.work_process_steps || [])];
                              updated[idx].desc = e.target.value;
                              setFormData({ ...formData, work_process_steps: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: WHAT WE SECURE & MID BANNER */}
          {/* ========================================================================= */}
          {activeTab === "what_we_secure" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={formData.what_we_secure_title || "What We Secure"}
                    onChange={(e) =>
                      setFormData({ ...formData, what_we_secure_title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* 6 Sector Items Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        6 Horizontal Sector Items
                      </h3>
                      <p className="text-xs text-slate-400">
                        Icons and labels displayed across the 6-column row.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          what_we_secure_items: [
                            ...(formData.what_we_secure_items || []),
                            { icon: "Building2", title: "New Sector", subtitle: "Spaces" },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Sector
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(formData.what_we_secure_items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-2 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.what_we_secure_items || []).filter(
                              (_, i) => i !== idx
                            );
                            setFormData({ ...formData, what_we_secure_items: updated });
                          }}
                          className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Title (Line 1)</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...(formData.what_we_secure_items || [])];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, what_we_secure_items: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Subtitle (Line 2)</label>
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => {
                              const updated = [...(formData.what_we_secure_items || [])];
                              updated[idx].subtitle = e.target.value;
                              setFormData({ ...formData, what_we_secure_items: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Icon</label>
                          <select
                            value={item.icon || "Building2"}
                            onChange={(e) => {
                              const updated = [...(formData.what_we_secure_items || [])];
                              updated[idx].icon = e.target.value;
                              setFormData({ ...formData, what_we_secure_items: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          >
                            <option value="Building2">Commercial Building</option>
                            <option value="Factory">Industrial Plant</option>
                            <option value="ShoppingBag">Retail Mall</option>
                            <option value="PlusSquare">Hospital</option>
                            <option value="GraduationCap">Education</option>
                            <option value="PartyPopper">Events</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mid-Banner Settings */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white">
                    Mid-Section Callout Banner
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Banner Heading</label>
                      <input
                        type="text"
                        value={formData.banner_heading || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, banner_heading: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Subheading</label>
                      <input
                        type="text"
                        value={formData.banner_subheading || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, banner_subheading: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.banner_button_text || "CONTACT US"}
                        onChange={(e) =>
                          setFormData({ ...formData, banner_button_text: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: 9 DIFFERENTIATORS */}
          {/* ========================================================================= */}
          {activeTab === "differentiators" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.differentiators_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, differentiators_title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.differentiators_subtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, differentiators_subtitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 9 Cards Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        9 Differentiator Metric Cards
                      </h3>
                      <p className="text-xs text-slate-400">
                        Customize stats, headings, and descriptions for all 9 metrics.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          differentiators: [
                            ...(formData.differentiators || []),
                            {
                              stat: "100%",
                              title: "New Differentiator",
                              desc: "Description here...",
                              icon: "ShieldCheck",
                            },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Differentiator
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(formData.differentiators || []).map((diff, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-2.5 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.differentiators || []).filter(
                              (_, i) => i !== idx
                            );
                            setFormData({ ...formData, differentiators: updated });
                          }}
                          className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Highlight Stat</label>
                            <input
                              type="text"
                              value={diff.stat}
                              onChange={(e) => {
                                const updated = [...(formData.differentiators || [])];
                                updated[idx].stat = e.target.value;
                                setFormData({ ...formData, differentiators: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-amber-400 font-bold text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-1">Icon</label>
                            <select
                              value={diff.icon || "ShieldCheck"}
                              onChange={(e) => {
                                const updated = [...(formData.differentiators || [])];
                                updated[idx].icon = e.target.value;
                                setFormData({ ...formData, differentiators: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            >
                              <option value="ShieldCheck">ShieldCheck</option>
                              <option value="UserCheck">UserCheck</option>
                              <option value="Clock">Clock</option>
                              <option value="Headphones">Headphones</option>
                              <option value="GraduationCap">GraduationCap</option>
                              <option value="ClipboardList">ClipboardList</option>
                              <option value="FileText">FileText</option>
                              <option value="Award">Award</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">Card Title</label>
                          <input
                            type="text"
                            value={diff.title}
                            onChange={(e) => {
                              const updated = [...(formData.differentiators || [])];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, differentiators: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={diff.desc}
                            onChange={(e) => {
                              const updated = [...(formData.differentiators || [])];
                              updated[idx].desc = e.target.value;
                              setFormData({ ...formData, differentiators: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Callout Banner */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white">
                    Bottom Action Banner
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Banner Heading</label>
                      <input
                        type="text"
                        value={formData.differentiators_banner_heading || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            differentiators_banner_heading: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Subheading</label>
                      <input
                        type="text"
                        value={formData.differentiators_banner_subheading || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            differentiators_banner_subheading: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.differentiators_banner_button_text || "GET IN TOUCH"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            differentiators_banner_button_text: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: INDUSTRIES SERVED */}
          {/* ========================================================================= */}
          {activeTab === "industries" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.industries_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, industries_title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.industries_subtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, industries_subtitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Industries Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Industry Sector Cards
                      </h3>
                      <p className="text-xs text-slate-400">
                        Target industries for this service.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          industries: [
                            ...(formData.industries || []),
                            {
                              name: "New Industry",
                              desc: "Industry application details...",
                              icon: "Building2",
                              tag: "Gujarat & Western India",
                            },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Industry
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(formData.industries || []).map((ind, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-2.5 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.industries || []).filter(
                              (_, i) => i !== idx
                            );
                            setFormData({ ...formData, industries: updated });
                          }}
                          className="absolute top-2 right-2 p-1 text-red-400 hover:bg-red-500/10 rounded"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">Industry Name</label>
                          <input
                            type="text"
                            value={ind.name}
                            onChange={(e) => {
                              const updated = [...(formData.industries || [])];
                              updated[idx].name = e.target.value;
                              setFormData({ ...formData, industries: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={ind.desc}
                            onChange={(e) => {
                              const updated = [...(formData.industries || [])];
                              updated[idx].desc = e.target.value;
                              setFormData({ ...formData, industries: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1">Region / Tag</label>
                          <input
                            type="text"
                            value={ind.tag || "Gujarat & Western India"}
                            onChange={(e) => {
                              const updated = [...(formData.industries || [])];
                              updated[idx].tag = e.target.value;
                              setFormData({ ...formData, industries: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: TESTIMONIALS */}
          {/* ========================================================================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.testimonials_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, testimonials_title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.testimonials_subtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, testimonials_subtitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Testimonials Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Client Testimonials
                      </h3>
                      <p className="text-xs text-slate-400">
                        Add quotes, client names, roles, and company affiliations.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          testimonials: [
                            ...(formData.testimonials || []),
                            {
                              quote: "Client review quote...",
                              author: "Client Name",
                              designation: "VP Operations",
                              company: "Enterprise Corp",
                              rating: 5,
                            },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Testimonial
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.testimonials || []).map((test, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-3 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.testimonials || []).filter(
                              (_, i) => i !== idx
                            );
                            setFormData({ ...formData, testimonials: updated });
                          }}
                          className="absolute top-3 right-3 p-1 text-red-400 hover:bg-red-500/10 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Testimonial Quote</label>
                          <textarea
                            rows={2}
                            value={test.quote}
                            onChange={(e) => {
                              const updated = [...(formData.testimonials || [])];
                              updated[idx].quote = e.target.value;
                              setFormData({ ...formData, testimonials: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Author Name</label>
                            <input
                              type="text"
                              value={test.author}
                              onChange={(e) => {
                                const updated = [...(formData.testimonials || [])];
                                updated[idx].author = e.target.value;
                                setFormData({ ...formData, testimonials: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Role / Designation</label>
                            <input
                              type="text"
                              value={test.designation}
                              onChange={(e) => {
                                const updated = [...(formData.testimonials || [])];
                                updated[idx].designation = e.target.value;
                                setFormData({ ...formData, testimonials: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Company / Facility</label>
                            <input
                              type="text"
                              value={test.company}
                              onChange={(e) => {
                                const updated = [...(formData.testimonials || [])];
                                updated[idx].company = e.target.value;
                                setFormData({ ...formData, testimonials: updated });
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: FAQS & PROPOSAL CONTACT */}
          {/* ========================================================================= */}
          {activeTab === "faqs_contact" && (
            <div className="space-y-6">
              {/* FAQs */}
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      FAQ Section Title
                    </label>
                    <input
                      type="text"
                      value={formData.faqs_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, faqs_title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      FAQ Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.faqs_subtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, faqs_subtitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* FAQ Items Builder */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Frequently Asked Questions (Accordion)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Add clear answers for customer questions.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          faqs: [
                            ...(formData.faqs || []),
                            {
                              q: "New question?",
                              a: "Detailed answer explaining the process...",
                            },
                          ],
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(formData.faqs || []).map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-800/60 border border-white/10 space-y-2.5 relative"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.faqs || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="absolute top-3 right-3 p-1 text-red-400 hover:bg-red-500/10 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Question</label>
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => {
                              const updated = [...(formData.faqs || [])];
                              updated[idx].q = e.target.value;
                              setFormData({ ...formData, faqs: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Answer</label>
                          <textarea
                            rows={2}
                            value={faq.a}
                            onChange={(e) => {
                              const updated = [...(formData.faqs || [])];
                              updated[idx].a = e.target.value;
                              setFormData({ ...formData, faqs: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposal Contact Section Settings */}
              <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white">
                  Proposal Inquiry Form Section Texts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Proposal Form Title
                    </label>
                    <input
                      type="text"
                      value={formData.contact_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, contact_title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Proposal Form Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.contact_subtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, contact_subtitle: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Controls Bar */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            {!isNew && service ? (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Service</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black tracking-wider uppercase transition-all shadow-xl cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Updates..." : "Save All Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
