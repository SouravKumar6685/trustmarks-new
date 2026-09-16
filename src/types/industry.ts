export interface IndustryHeroStat {
  label: string;
  value: string;
  desc?: string;
}

export interface IndustryChallengeItem {
  title: string;
  desc: string;
  impact?: string;
  icon?: string;
  image_url?: string;
}

export interface IndustrySolutionItem {
  title: string;
  desc: string;
  tag?: string;
  features?: string[];
  icon?: string;
  image_url?: string;
}

export interface IndustryBenefitMetric {
  stat: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface IndustryMetricHighlight {
  metric: string;
  label: string;
  desc?: string;
}

export interface IndustryTestimonialItem {
  quote: string;
  author: string;
  designation: string;
  company: string;
  rating?: number;
}

export interface IndustryFAQItem {
  q: string;
  a: string;
}

export interface Industry {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  icon_name: string;
  tag?: string;
  order_index?: number;
  is_active?: boolean;

  // 1. Hero Content & Performance Highlights
  hero_headline?: string;
  hero_subtitle?: string;
  hero_stats?: IndustryHeroStat[];

  // 2. Sector-Specific Challenges We Address
  challenges_title?: string;
  challenges_subtitle?: string;
  challenges?: IndustryChallengeItem[];

  // 3. How We Help - Specialized Solutions Matrix
  how_we_help_title?: string;
  how_we_help_subtitle?: string;
  solutions?: IndustrySolutionItem[];

  // 4. Key Benefits & Compliance Guarantees
  benefits_title?: string;
  benefits_subtitle?: string;
  benefits?: IndustryBenefitMetric[];

  // 5. Measurable Impact & Case Studies
  case_study_title?: string;
  case_study_subtitle?: string;
  case_study_metrics?: IndustryMetricHighlight[];

  // 6. Testimonials from Sector Leaders
  testimonials_title?: string;
  testimonials?: IndustryTestimonialItem[];

  // 7. Sector FAQs
  faqs_title?: string;
  faqs?: IndustryFAQItem[];

  // 8. Contact & Proposal Section
  contact_title?: string;
  contact_subtitle?: string;

  created_at?: string;
  updated_at?: string;
}

export interface IndustryFormData {
  title: string;
  slug?: string;
  description: string;
  image_url: string;
  icon_name: string;
  tag?: string;
  order_index?: number;
  is_active?: boolean;

  // 1. Hero
  hero_headline?: string;
  hero_subtitle?: string;
  hero_stats?: IndustryHeroStat[];

  // 2. Challenges
  challenges_title?: string;
  challenges_subtitle?: string;
  challenges?: IndustryChallengeItem[];

  // 3. Solutions
  how_we_help_title?: string;
  how_we_help_subtitle?: string;
  solutions?: IndustrySolutionItem[];

  // 4. Benefits
  benefits_title?: string;
  benefits_subtitle?: string;
  benefits?: IndustryBenefitMetric[];

  // 5. Case Study & Metrics
  case_study_title?: string;
  case_study_subtitle?: string;
  case_study_metrics?: IndustryMetricHighlight[];

  // 6. Testimonials
  testimonials_title?: string;
  testimonials?: IndustryTestimonialItem[];

  // 7. FAQs
  faqs_title?: string;
  faqs?: IndustryFAQItem[];

  // 8. Contact
  contact_title?: string;
  contact_subtitle?: string;
}
