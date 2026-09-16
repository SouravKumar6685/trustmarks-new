import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Building,
  Factory,
  Warehouse,
  ShoppingBag,
  ShoppingCart,
  Hospital,
  Cross,
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Utensils,
  Hotel,
  HardHat,
  Landmark,
  Monitor,
  Laptop,
  Users,
  PartyPopper,
  Radio,
  Wifi,
  ShieldCheck,
  Truck,
  Briefcase,
  Zap,
  Sparkles,
} from "lucide-react";
import type { Industry } from "@/types/industry";

export const getIndustryIconComponent = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case "building2":
    case "building":
    case "office":
    case "corporate":
      return Building2;
    case "factory":
    case "manufacturing":
    case "industrial":
      return Factory;
    case "warehouse":
    case "warehousing":
    case "logistics":
    case "boxes":
      return Warehouse;
    case "shoppingbag":
    case "shopping-bag":
    case "retail":
    case "mall":
      return ShoppingBag;
    case "shoppingcart":
    case "cart":
      return ShoppingCart;
    case "hospital":
    case "healthcare":
    case "cross":
      return Hospital;
    case "heartpulse":
    case "medical":
      return HeartPulse;
    case "graduationcap":
    case "graduation-cap":
    case "education":
    case "school":
      return GraduationCap;
    case "utensilscrossed":
    case "utensils":
    case "hospitality":
    case "hotel":
    case "food":
      return UtensilsCrossed;
    case "hardhat":
    case "hard-hat":
    case "construction":
      return HardHat;
    case "landmark":
    case "bank":
    case "banking":
    case "financial":
      return Landmark;
    case "monitor":
    case "it":
    case "ites":
    case "tech":
    case "computer":
      return Monitor;
    case "laptop":
      return Laptop;
    case "users":
    case "event":
    case "events":
    case "management":
      return Users;
    case "partypopper":
    case "party":
      return PartyPopper;
    case "radio":
    case "telecom":
    case "telecommunications":
    case "antenna":
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
    default:
      return Building2;
  }
};

interface IndustryCardProps {
  industry: Industry;
  index?: number;
  onCardClick?: (industry: Industry) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  industry,
  index = 0,
  onCardClick,
}) => {
  const IconComponent = getIndustryIconComponent(industry.icon_name);
  const targetUrl = `/industry/${industry.slug || industry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const handleClick = () => {
    if (onCardClick) {
      // If an explicit callback is provided (e.g. from a specialized modal caller), call it
      onCardClick(industry);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to={targetUrl}
        onClick={handleClick}
        className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.12)] hover:border-amber-400/50 transition-all duration-300 flex flex-col group cursor-pointer h-full no-underline"
      >
        {/* Top Image Banner */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 flex-shrink-0">
          <img
            src={industry.image_url}
            alt={industry.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Floating Circular Center Icon Badge */}
        <div className="relative flex justify-center -mt-6 z-10 px-4 flex-shrink-0">
          <div className="w-13 h-13 rounded-full bg-white border-2 border-[#EA580C]/40 shadow-lg shadow-black/10 flex items-center justify-center text-[#EA580C] group-hover:border-[#EA580C] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all duration-300 bg-gradient-to-b from-white to-orange-50/50">
            <IconComponent className="w-6 h-6 stroke-[1.8]" />
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 pt-3.5 pb-7 flex-1 flex flex-col items-center text-center space-y-2.5">
          <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight group-hover:text-[#EA580C] transition-colors leading-snug">
            {industry.title}
          </h3>

          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal line-clamp-3">
            {industry.description}
          </p>

          <div className="pt-2 text-[11px] font-bold text-[#EA580C] flex items-center gap-1 group-hover:gap-2 transition-all">
            <span>Explore Industry Solutions</span>
            <span>&rarr;</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
