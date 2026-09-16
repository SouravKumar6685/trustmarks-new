import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { sendReactEmail } from "@/lib/email";

export const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Security Services",
    location: "Ahmedabad / Gandhinagar",
    message: "",
  });

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
        source: "Homepage Contact Section",
      });

      setSubmitting(false);

      if (res.success) {
        setSubmissionStatus("success");
        setFeedbackMessage(
          res.message ||
          "Thank you! Your proposal request has been received. Our operations team will contact you within 2 hours."
        );
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Security Services",
          location: "Ahmedabad / Gandhinagar",
          message: "",
        });
        setTimeout(() => setSubmissionStatus(null), 8000);
      } else {
        setSubmissionStatus("error");
        setFeedbackMessage(
          res.message ||
          "Could not submit inquiry. Please check your connection or call our helpline."
        );
      }
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setSubmitting(false);
      setSubmissionStatus("error");
      setFeedbackMessage(
        err?.message || "Failed to process inquiry request."
      );
    }
  };


  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F8FAFC] relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching site design */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
          <div className="flex flex-col items-center justify-center">
            <span className="text-[#EA580C] text-xs sm:text-sm font-black tracking-widest uppercase mb-1.5">
              CONTACT US
            </span>
            <div className="w-10 h-[2.5px] bg-[#EA580C] rounded-full" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0F172A] tracking-tight leading-tight pt-1">
            Let&apos;s Build a Safer, Smarter &amp;{" "}
            <span className="text-[#EA580C]">Stronger Workplace</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto pt-1">
            Request a customized commercial proposal, complimentary site risk audit, or an itemized statutory compliant workforce quote for your enterprise.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Direct Info & Operational Highlights */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                Direct Operations Command Center
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our operations specialists are active 24/7/365 across Western India to handle client audits, rapid manpower deployments, and site transitions.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {/* Location Card */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Head Office
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    A-309, 3rd Floor,
                    A-Commercial Block,
                    Swagat Rain Forest-II,
                    Gandhinagar Koba Highway,
                    Kudasan, Gandhinagar,
                    Gujarat - 382421
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Mumbai Office
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Office-No-302,303,
                    3rd Floor,
                    Surya House Building,
                    Vidhyavihar East
                    Near Vidhyavihar East Station,
                    Mumbai
                  </p>
                </div>
              </div>

              {/* Helpline Card */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    24/7 Operations Helpline
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    +91 9998399909 / 7923600989
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Official Email
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    contact@trustmarks.in / operations@trustmarks.in
                  </p>
                </div>
              </div>
            </div>



            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="tel:+919998399909"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-all shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Operations Helpline</span>
              </a>
              <a
                href="https://wa.me/919998399909"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Direct</span>
              </a>
            </div>


          </div>

          {/* Right Column: EmailJS Connected Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.05)] text-left relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-[#0F172A]">
                    Request a Customized Proposal
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit your details and our senior facility consultant will connect with you.
                  </p>
                </div>
                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Submission Alert */}
              <AnimatePresence>
                {submissionStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-sm">Message Sent Successfully!</div>
                      <div className="mt-0.5 text-emerald-700">{feedbackMessage}</div>
                    </div>
                  </motion.div>
                )}

                {submissionStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 text-xs"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-sm">EmailJS Configuration Required</div>
                      <div className="mt-0.5 text-amber-800 leading-relaxed">{feedbackMessage}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>


              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Facility Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Ahmedabad / Gandhinagar">Ahmedabad / Gandhinagar Corridor</option>
                      <option value="Surat / South Gujarat">Surat &amp; South Gujarat</option>
                      <option value="Vadodara / Central Gujarat">Vadodara &amp; Central Gujarat</option>
                      <option value="Rajkot / Saurashtra">Rajkot &amp; Saurashtra</option>
                      <option value="Sanand / Industrial Estate">Sanand / GIDC Industrial Clusters</option>
                      <option value="Other Western India Location">Other Western India Location</option>
                    </select>
                  </div>
                </div>

                {/* Service Requirement */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Service Category Needed</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Security Services">Private Security Services &amp; Guarding</option>
                    <option value="Workforce Solutions">Industrial &amp; Corporate Workforce Solutions</option>
                    <option value="Housekeeping Services">Mechanized Housekeeping &amp; Hygiene Care</option>
                    <option value="Integrated Facility Management">Integrated Facility Management (IFM / MEP)</option>
                    <option value="HR Consultancy & Payroll">HR Consultancy, Executive Search &amp; Compliance</option>
                    <option value="Bespoke Industry Package">Multi-Facility Integrated Operations Package</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Project Scope / Message</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your requirements (e.g. number of guards/staff required, facility sq. ft., deployment timeline)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] focus:bg-white transition-all leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#c2410c] disabled:opacity-60 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Proposal Request...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Proposal Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
