import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  ImageIcon,
  ShieldCheck,
  CheckCircle,
  Layers,
  Database,
  ArrowRight,
  Building2,
  Briefcase,
  X,
  Upload,
  Check,
  Sparkles,
  Search,
} from "lucide-react";
import {
  getServices,
  deleteService,
  signOutAdmin,
  getCurrentAdminUser,
  isSupabaseConfigured,
  seedDefaultServices,
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  seedDefaultIndustries,
} from "@/lib/supabase";
import type { Service } from "@/types/service";
import type { Industry, IndustryFormData } from "@/types/industry";
import { getIconComponent } from "@/components/home/ServicesGridSection";
import { getIndustryIconComponent } from "@/components/common/IndustryCard";

const INDUSTRY_ICON_OPTIONS = [
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
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<"services" | "industries">("services");

  // Services State
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Industries State
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(true);

  // Shared Modals / Confirmations
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: "service" | "industry";
    id: string;
    title: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Industry Add/Edit Modal State
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);
  const [industryFormData, setIndustryFormData] = useState<IndustryFormData>({
    title: "",
    slug: "",
    description: "",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    icon_name: "Building2",
    order_index: 1,
    is_active: true,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isSavingIndustry, setIsSavingIndustry] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentAdminUser();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      loadServices();
      loadIndustries();
    }
    checkAuth();
  }, [navigate]);

  async function loadServices() {
    setServicesLoading(true);
    const list = await getServices();
    setServices(list);
    setServicesLoading(false);
  }

  async function loadIndustries() {
    setIndustriesLoading(true);
    const list = await getIndustries();
    setIndustries(list);
    setIndustriesLoading(false);
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/admin/login");
  };

  // --- SERVICE ACTIONS ---
  const handleDeleteService = async (id: string) => {
    try {
      setServicesLoading(true);
      await deleteService(id);
      setDeleteConfirmTarget(null);
      showToast("Service removed successfully.");
      await loadServices();
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert("Failed to delete service: " + (err?.message || "Unknown error"));
    } finally {
      setServicesLoading(false);
    }
  };

  const handleSeedDefaultServices = async () => {
    try {
      setServicesLoading(true);
      await seedDefaultServices();
      showToast("Default 6 services restored and synced!");
      await loadServices();
    } catch (err: any) {
      console.error("Seed failed:", err);
      alert("Failed to seed services: " + (err?.message || "Unknown error"));
    } finally {
      setServicesLoading(false);
    }
  };

  // --- INDUSTRY ACTIONS ---
  const handleOpenAddIndustry = () => {
    setEditingIndustryId(null);
    setSelectedImageFile(null);
    setImagePreviewUrl("");
    const nextOrder = industries.length > 0 ? Math.max(...industries.map((i) => i.order_index || 0)) + 1 : 1;
    setIndustryFormData({
      title: "",
      slug: "",
      description: "",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      icon_name: "Building2",
      order_index: nextOrder,
      is_active: true,
    });
    setIsIndustryModalOpen(true);
  };

  const handleOpenEditIndustry = (ind: Industry) => {
    setEditingIndustryId(ind.id);
    setSelectedImageFile(null);
    setImagePreviewUrl(ind.image_url);
    setIndustryFormData({
      title: ind.title,
      slug: ind.slug,
      description: ind.description,
      image_url: ind.image_url,
      icon_name: ind.icon_name || "Building2",
      order_index: ind.order_index ?? 1,
      is_active: ind.is_active !== false,
    });
    setIsIndustryModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleSaveIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industryFormData.title.trim()) {
      alert("Please provide an industry title.");
      return;
    }

    try {
      setIsSavingIndustry(true);
      if (editingIndustryId) {
        await updateIndustry(editingIndustryId, industryFormData, selectedImageFile);
        showToast("Industry updated successfully.");
      } else {
        await createIndustry(industryFormData, selectedImageFile);
        showToast("New industry created successfully.");
      }
      setIsIndustryModalOpen(false);
      await loadIndustries();
    } catch (err: any) {
      console.error("Save industry error:", err);
      alert("Failed to save industry: " + (err?.message || "Unknown error"));
    } finally {
      setIsSavingIndustry(false);
    }
  };

  const handleDeleteIndustry = async (id: string) => {
    try {
      setIndustriesLoading(true);
      await deleteIndustry(id);
      setDeleteConfirmTarget(null);
      showToast("Industry deleted successfully.");
      await loadIndustries();
    } catch (err: any) {
      console.error("Delete industry failed:", err);
      alert("Failed to delete industry: " + (err?.message || "Unknown error"));
    } finally {
      setIndustriesLoading(false);
    }
  };

  const handleSeedDefaultIndustries = async () => {
    try {
      setIndustriesLoading(true);
      await seedDefaultIndustries();
      showToast("Default 12 industries restored and synced!");
      await loadIndustries();
    } catch (err: any) {
      console.error("Seed industries failed:", err);
      alert("Failed to seed industries: " + (err?.message || "Unknown error"));
    } finally {
      setIndustriesLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/trustmark-logo.png"
                alt="Trustmarks"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-white text-sm tracking-wider">TRUSTMARKS</span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  CMS Dashboard
                </span>
              </div>
            </Link>

            {isSupabaseConfigured ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Supabase Cloud (Global Sync)
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Local Browser Mode
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={activeTab === "industries" ? "/industries" : "/services"}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View {activeTab === "industries" ? "Industries Page" : "Services Page"}</span>
            </Link>

            {activeTab === "services" ? (
              <Link
                to="/admin/services/new"
                className="inline-flex items-center gap-2 bg-[#F5BA13] hover:bg-[#ffc82a] text-black font-extrabold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Service</span>
              </Link>
            ) : (
              <Link
                to="/admin/industries/new"
                className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Industry</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CMS Category Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-white/10 rounded-2xl max-w-md mb-8">
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-amber-400 text-black shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services CMS ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("industries")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "industries"
                ? "bg-[#EA580C] text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Industries CMS ({industries.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SERVICES CMS */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div>
            {/* Dashboard Stat Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-400/15 text-amber-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{services.length}</div>
                  <div className="text-xs text-slate-400">Active Services on Website</div>
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-400/15 text-blue-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">Full Page CMS</div>
                  <div className="text-xs text-slate-400">Granular Service Customizer</div>
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-400/15 text-emerald-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">Realtime Sync</div>
                  <div className="text-xs text-slate-400">Instant Postgres CRUD</div>
                </div>
              </div>
            </div>

            {/* Services Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Manage Services &amp; Content
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Add services, upload images, write card summaries &amp; in-depth page descriptions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSeedDefaultServices}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition-colors"
                >
                  ✨ Restore Default 6 Services
                </button>
                <Link
                  to="/admin/services/new"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/15 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Create New Service</span>
                </Link>
              </div>
            </div>

            {/* Services List Grid */}
            {servicesLoading ? (
              <div className="py-20 text-center text-slate-400 text-sm">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="py-16 px-6 rounded-3xl bg-neutral-900/60 border border-white/10 text-center space-y-5 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/20">
                  <Layers className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">No Services Currently Added</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    All services have been removed. You can create a new bespoke service or restore the default 6 services template.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    to="/admin/services/new"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    + Create Custom Service
                  </Link>
                  <button
                    onClick={handleSeedDefaultServices}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
                  >
                    ✨ Restore Default 6 Services
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => {
                  const IconComp = getIconComponent(srv.icon_name);

                  return (
                    <div
                      key={srv.id}
                      className="bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-400/40 transition-all"
                    >
                      {/* Card Top: Cover Image Preview */}
                      <div className="relative h-44 overflow-hidden bg-neutral-800">
                        <img
                          src={srv.image_url || "/service.png"}
                          alt={srv.title}
                          className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/service.png";
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-white/15 flex items-center gap-1.5">
                          <IconComp className="w-3.5 h-3.5 text-amber-400" />
                          <span>{srv.tag || "Service"}</span>
                        </div>

                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                          /service/{srv.slug}
                        </div>
                      </div>

                      {/* Card Middle: Titles & Descriptions */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>

                          <div className="space-y-2 mb-4">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                                Card Summary (Homepage):
                              </span>
                              <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                                {srv.card_description}
                              </p>
                            </div>

                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                Page Description (Details Page):
                              </span>
                              <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                                {srv.page_description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom: Action Toolbar */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                          <Link
                            to={`/service/${srv.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-bold"
                          >
                            <span>View Page</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/services/edit/${srv.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-black text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                              title="Edit Service on Dedicated Page"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit Page</span>
                            </Link>
                            <button
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: "service",
                                  id: srv.id,
                                  title: srv.title,
                                })
                              }
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INDUSTRIES CMS */}
        {/* ========================================================================= */}
        {activeTab === "industries" && (
          <div>
            {/* Industries Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-500/15 text-[#EA580C]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{industries.length}</div>
                  <div className="text-xs text-slate-400">Total Industries Configured</div>
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">
                    {industries.filter((i) => i.is_active !== false).length}
                  </div>
                  <div className="text-xs text-slate-400">Active on /industries Page</div>
                </div>
              </div>

              <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/15 text-blue-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">4-Column Grid</div>
                  <div className="text-xs text-slate-400">Pixel-Perfect Reference Match</div>
                </div>
              </div>
            </div>

            {/* Industries Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Manage Industries We Serve
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Create, edit, and reorder industry sectors displayed on the frontend Industries page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSeedDefaultIndustries}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                >
                  ✨ Restore 12 Default Industries
                </button>
                <Link
                  to="/admin/industries/new"
                  className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Create New Industry</span>
                </Link>
              </div>
            </div>

            {/* Industries Grid */}
            {industriesLoading ? (
              <div className="py-20 text-center text-slate-400 text-sm">Loading industries...</div>
            ) : industries.length === 0 ? (
              <div className="py-16 px-6 rounded-3xl bg-neutral-900/60 border border-white/10 text-center space-y-5 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-[#EA580C] flex items-center justify-center mx-auto border border-orange-500/20">
                  <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">No Industries Found</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                    You can create custom industries or restore the complete 12 standard sectors from the reference design.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link
                    to="/admin/industries/new"
                    className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs uppercase tracking-wider transition-all"
                  >
                    + Create Industry
                  </Link>
                  <button
                    onClick={handleSeedDefaultIndustries}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
                  >
                    ✨ Restore 12 Default Industries
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {industries.map((ind, idx) => {
                  const IconComp = getIndustryIconComponent(ind.icon_name);

                  return (
                    <div
                      key={ind.id}
                      className="bg-neutral-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#EA580C]/40 transition-all"
                    >
                      {/* Card Cover Preview */}
                      <div className="relative h-40 overflow-hidden bg-neutral-800">
                        <img
                          src={ind.image_url}
                          alt={ind.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-300 border border-white/15">
                          #{ind.order_index ?? idx + 1}
                        </div>
                        {ind.is_active === false && (
                          <div className="absolute top-2.5 right-2.5 bg-red-600/90 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                            Hidden
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[9px] text-slate-300 font-mono">
                          /industry/{ind.slug}
                        </div>
                      </div>

                      {/* Floating Icon Seam */}
                      <div className="relative flex justify-center -mt-5 z-10">
                        <div className="w-10 h-10 rounded-full bg-white border border-[#EA580C]/50 shadow-md flex items-center justify-center text-[#EA580C]">
                          <IconComp className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 pt-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-white text-center mb-1.5">
                            {ind.title}
                          </h3>
                          <p className="text-xs text-slate-400 text-center line-clamp-3 leading-relaxed">
                            {ind.description}
                          </p>
                        </div>

                        {/* Action Toolbar */}
                        <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <Link
                            to={`/industry/${ind.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[11px] text-[#EA580C] hover:underline font-bold"
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>

                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/admin/industries/edit/${ind.id}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#EA580C] hover:text-white text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                              title="Edit Industry on Dedicated Page"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </Link>
                            <button
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: "industry",
                                  id: ind.id,
                                  title: ind.title,
                                })
                              }
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                              title="Delete Industry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* INDUSTRY ADD / EDIT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isIndustryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 relative"
            >
              <button
                onClick={() => setIsIndustryModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#EA580C] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {editingIndustryId ? "Edit Industry Sector" : "Add New Industry Sector"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Set title, description, cover image and floating icon badge.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveIndustry} className="space-y-5">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Industry Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Healthcare"
                      value={industryFormData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                        setIndustryFormData((prev) => ({
                          ...prev,
                          title,
                          slug: editingIndustryId ? prev.slug : autoSlug,
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">URL Slug</label>
                    <input
                      type="text"
                      placeholder="healthcare"
                      value={industryFormData.slug || ""}
                      onChange={(e) =>
                        setIndustryFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Short Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Compassionate and trained professionals to support healthcare facilities and patients."
                    value={industryFormData.description}
                    onChange={(e) =>
                      setIndustryFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EA580C] leading-relaxed"
                  />
                </div>

                {/* Image URL & Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Cover Image</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="sm:col-span-2 space-y-2">
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={industryFormData.image_url}
                        onChange={(e) => {
                          setIndustryFormData((prev) => ({ ...prev, image_url: e.target.value }));
                          setImagePreviewUrl(e.target.value);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl bg-neutral-800 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#EA580C]"
                      />
                      <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-slate-300 cursor-pointer border border-white/10">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload Local Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Live Image Preview */}
                    <div className="relative h-24 rounded-2xl overflow-hidden bg-neutral-800 border border-white/10">
                      <img
                        src={imagePreviewUrl || industryFormData.image_url}
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

                {/* Icon Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Badge Icon (Selected: <span className="text-[#EA580C]">{industryFormData.icon_name}</span>)
                    </label>
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 p-3 bg-neutral-800/80 rounded-2xl border border-white/10 max-h-36 overflow-y-auto">
                    {INDUSTRY_ICON_OPTIONS.map((iconName) => {
                      const IconComp = getIndustryIconComponent(iconName);
                      const isSelected = industryFormData.icon_name === iconName;
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() =>
                            setIndustryFormData((prev) => ({ ...prev, icon_name: iconName }))
                          }
                          className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#EA580C] text-white shadow-md scale-105"
                              : "bg-white/5 hover:bg-white/10 text-slate-300"
                          }`}
                          title={iconName}
                        >
                          <IconComp className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Order Index & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Display Order Index</label>
                    <input
                      type="number"
                      value={industryFormData.order_index ?? 1}
                      onChange={(e) =>
                        setIndustryFormData((prev) => ({
                          ...prev,
                          order_index: parseInt(e.target.value, 10) || 1,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-800 border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div className="pt-5">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                      <input
                        type="checkbox"
                        checked={industryFormData.is_active !== false}
                        onChange={(e) =>
                          setIndustryFormData((prev) => ({
                            ...prev,
                            is_active: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded text-[#EA580C] focus:ring-[#EA580C] bg-neutral-800 border-white/20"
                      />
                      <span>Active &amp; Visible on Frontend</span>
                    </label>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsIndustryModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingIndustry}
                    className="px-6 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSavingIndustry ? (
                      <span>Saving...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingIndustryId ? "Update Industry" : "Create Industry"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {deleteConfirmTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-neutral-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                Delete &ldquo;{deleteConfirmTarget.title}&rdquo;?
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                {deleteConfirmTarget.type === "service"
                  ? "This will remove the service from the homepage grid and its dedicated detail page."
                  : "This will remove this industry from the Industries We Serve page."}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmTarget(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteConfirmTarget.type === "service") {
                      handleDeleteService(deleteConfirmTarget.id);
                    } else {
                      handleDeleteIndustry(deleteConfirmTarget.id);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
