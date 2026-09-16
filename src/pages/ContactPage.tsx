import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { sendReactEmail } from "@/lib/email";

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Security Services",
    location: "Ahmedabad / Gandhinagar",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Please fill in your Name, Email, and Phone Number.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await sendReactEmail({
        ...formData,
        source: "Dedicated Contact Page",
      });
      setSubmitting(false);
      setFormSubmitted(true);
      setFeedbackMessage(
        res.message ||
        "Thank you! Your inquiry has been sent to our operations command team."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Security Services",
        location: "Ahmedabad / Gandhinagar",
        message: "",
      });
      setTimeout(() => setFormSubmitted(false), 7000);
    } catch (err) {
      console.error("ContactPage error:", err);
      setSubmitting(false);
      setFormSubmitted(true);
      setFeedbackMessage("Thank you! Your inquiry has been received. Our team will contact you shortly.");
    }
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-amber-400 selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Contact Us</span>
          </div>

          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-2 inline-block">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Let's Discuss Your <span className="text-amber-400">Facility &amp; Staffing</span> Requirements
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our operational teams operate 24/7 across Gujarat. Connect with our senior consultants for immediate quotes, customized post orders, or emergency deployment.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Locations */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  Direct Operational Contacts
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Reach our centralized 24/7 command center for commercial inquiries, service escalations, and statutory compliance requests.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Gujarat Headquarters:
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Trustmarks Tower, Infocity / SG Highway Corridor, Gandhinagar - 382007, Gujarat, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Operations Helpline:
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      +91 9998399909 / 7923600989 (24/7 Helpline)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Official Inquiries:
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      contact@trustmarks.in / operations@trustmarks.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp & Call Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+919998399909"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>Call Operations</span>
                </a>
                <a
                  href="https://wa.me/919998399909"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#1eb954] text-white text-xs font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Proposal Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-left">
                <h3 className="text-xl font-black text-[#0F172A] mb-1">
                  Send Proposal Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in your details below and our operations specialist will respond within 2 hours.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-base font-black text-[#0F172A]">
                      Thank You! Inquiry Received.
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Our area operations manager has been notified and will contact you shortly with an itemized service proposal.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Shah"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#EA580C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 9998399909"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#EA580C] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Corporate Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. admin@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#EA580C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Service Category *
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#EA580C] focus:outline-none"
                        >
                          <option value="Security Services">Security Services</option>
                          <option value="Workforce Solutions">Workforce Solutions</option>
                          <option value="Housekeeping Services">Housekeeping Services</option>
                          <option value="Facility Management">Facility Management</option>
                          <option value="HR Consultancy">HR Consultancy</option>
                          <option value="Training & Development">Training &amp; Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Facility Requirements &amp; Scope
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Estimated headcount, facility square footage, shift requirements, specific site location..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-[#EA580C] focus:outline-none"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{submitting ? "Sending Request..." : "Submit Proposal Request"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
