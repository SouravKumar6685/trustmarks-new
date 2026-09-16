import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Key } from "lucide-react";
import { signInAdmin } from "@/lib/supabase";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await signInAdmin(email, password);
      if (res.success) {
        navigate("/admin");
      } else {
        setErrorMessage(res.error || "Login failed. Please check credentials.");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail("admin@trustmarks.in");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-neutral-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <img
              src="/trustmark-logo.png"
              alt="Trustmarks"
              className="h-12 w-auto object-contain mx-auto drop-shadow-md group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Admin Sign In</h1>
          <p className="text-xs text-slate-400 mt-1">
            Access CMS to add services, upload images &amp; update content
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@trustmarks.in"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-800/80 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs placeholder:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-neutral-800/80 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#F5BA13] hover:bg-[#ffc82a] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-[0_4px_20px_rgba(245,186,19,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Quick Demo Access:</span>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Key className="w-3 h-3" /> Auto-Fill Demo
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300">
            ← Return to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
