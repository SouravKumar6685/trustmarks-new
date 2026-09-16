export interface WorkProcessStep {
  title: string;
  desc: string;
  icon?: string;
}

export interface SectorItem {
  title: string;
  subtitle: string;
  icon?: string;
}

export interface DifferentiatorMetric {
  stat: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface IndustryItem {
  name: string;
  desc: string;
  icon?: string;
  tag?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  designation: string;
  company: string;
  rating: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  card_description: string;
  page_description: string;
  image_url: string;
  icon_name: string;
  tag?: string;
  features?: string[];
  order_index?: number;

  // 1. Hero Content
  hero_headline?: string;
  hero_subtitle?: string;

  // 2. How It Works Section
  how_it_works_title?: string;
  how_it_works_paragraphs?: string[];
  work_process_steps?: WorkProcessStep[];

  // 3. What We Secure / Sectors Row
  what_we_secure_title?: string;
  what_we_secure_items?: SectorItem[];
  banner_heading?: string;
  banner_subheading?: string;
  banner_button_text?: string;

  // 4. Why Trustmarks (9 Differentiators)
  differentiators_title?: string;
  differentiators_subtitle?: string;
  differentiators?: DifferentiatorMetric[];
  differentiators_banner_heading?: string;
  differentiators_banner_subheading?: string;
  differentiators_banner_button_text?: string;

  // 5. Industries Served
  industries_title?: string;
  industries_subtitle?: string;
  industries?: IndustryItem[];

  // 6. Testimonials
  testimonials_title?: string;
  testimonials_subtitle?: string;
  testimonials?: TestimonialItem[];

  // 7. FAQs
  faqs_title?: string;
  faqs_subtitle?: string;
  faqs?: FAQItem[];

  // 8. Contact Section
  contact_title?: string;
  contact_subtitle?: string;

  created_at?: string;
  updated_at?: string;
}

export interface ServiceFormData {
  title: string;
  slug: string;
  card_description: string;
  page_description: string;
  image_url: string;
  icon_name: string;
  tag?: string;
  features: string[];

  // 1. Hero Content
  hero_headline?: string;
  hero_subtitle?: string;

  // 2. How It Works Section
  how_it_works_title?: string;
  how_it_works_paragraphs?: string[];
  work_process_steps?: WorkProcessStep[];

  // 3. What We Secure / Sectors Row
  what_we_secure_title?: string;
  what_we_secure_items?: SectorItem[];
  banner_heading?: string;
  banner_subheading?: string;
  banner_button_text?: string;

  // 4. Why Trustmarks (9 Differentiators)
  differentiators_title?: string;
  differentiators_subtitle?: string;
  differentiators?: DifferentiatorMetric[];
  differentiators_banner_heading?: string;
  differentiators_banner_subheading?: string;
  differentiators_banner_button_text?: string;

  // 5. Industries Served
  industries_title?: string;
  industries_subtitle?: string;
  industries?: IndustryItem[];

  // 6. Testimonials
  testimonials_title?: string;
  testimonials_subtitle?: string;
  testimonials?: TestimonialItem[];

  // 7. FAQs
  faqs_title?: string;
  faqs_subtitle?: string;
  faqs?: FAQItem[];

  // 8. Contact Section
  contact_title?: string;
  contact_subtitle?: string;
}
