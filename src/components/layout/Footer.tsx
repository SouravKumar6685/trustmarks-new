import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from "lucide-react";
import { useServices } from "@/context/ServicesContext";

export const Footer: React.FC = () => {
  const { services, loading } = useServices();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/trustmark-logo.png"
                alt="Trustmarks"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png";
                }}
              />
              <div>
                <span className="text-white font-black text-lg block leading-none">TRUSTMARKS</span>
                <span className="text-amber-400 font-bold text-xs tracking-wider">MANAGEMENT SERVICES</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gujarat's premier integrated facility management, industrial security, and specialized workforce partner. Delivering measurable operational excellence.
            </p>
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS Portal</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-400 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-amber-400 transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Trustmarks
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Dynamic Services Offered from Supabase */}
          <div className="text-left">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Core Capabilities</h4>
            {loading ? (
              <div className="text-xs text-slate-500">Loading capabilities...</div>
            ) : services.length === 0 ? (
              <div className="text-xs text-slate-500">No services active</div>
            ) : (
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {services.map((service) => (
                  <li key={service.id || service.slug}>
                    <Link
                      to={`/service/${service.slug}`}
                      className="hover:text-amber-400 transition-colors truncate block"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Details */}
          <div className="text-left">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Command Center</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>A-309, 3rd Floor, A-Commercial Block, Swagat Rain Forest-II, Gandhinagar Koba Highway, Kudasan, Gandhinagar, Gujarat - 382421</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 9998399909 (24/7 Operations)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@trustmarks.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">© {new Date().getFullYear()} Trustmarks Management Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Excellence in Manpower &amp; Facility Care</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-800 hover:bg-[#F5BA13] hover:text-black text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
