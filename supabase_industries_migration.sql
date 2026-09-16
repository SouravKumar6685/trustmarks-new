-- =========================================================================
-- TRUSTMARKS MANAGEMENT SERVICES - COMPLETE INDUSTRIES CMS DATABASE SCHEMA
-- RUN THIS SCRIPT IN SUPABASE SQL EDITOR TO CREATE/UPDATE ALL NECESSARY TABLES
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CREATE INDUSTRIES TABLE IF NOT EXISTS
create table if not exists public.industries (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  image_url text default 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  icon_name text default 'Building2',
  tag text default 'Enterprise Sector',
  order_index integer default 0,
  is_active boolean default true,

  -- 1. Hero Content
  hero_headline text,
  hero_subtitle text,
  hero_stats jsonb default '[]'::jsonb,

  -- 2. Challenges
  challenges_title text default 'Sector-Specific Challenges We Address',
  challenges_subtitle text default 'Navigating workforce unpredictability, compliance burdens, and high-stakes operations requires specialized domain expertise.',
  challenges jsonb default '[]'::jsonb,

  -- 3. Solutions Matrix
  how_we_help_title text default 'How Trustmarks Empowers This Sector',
  how_we_help_subtitle text default 'From vetted personnel and round-the-clock supervision to stringent quality protocols, discover our dedicated service matrix.',
  solutions jsonb default '[]'::jsonb,

  -- 4. Benefits & SLAs
  benefits_title text default 'Why Sector Leaders Choose Trustmarks',
  benefits_subtitle text default 'Zero compliance liabilities, guaranteed attendance SLAs, and audit-ready governance.',
  benefits jsonb default '[]'::jsonb,

  -- 5. Case Study & Benchmarks
  case_study_title text default 'Real-World Impact & Benchmarks',
  case_study_subtitle text default 'Verified performance benchmarks across enterprise sites and facilities.',
  case_study_metrics jsonb default '[]'::jsonb,

  -- 6. Testimonials
  testimonials_title text default 'What Sector Leaders Say',
  testimonials jsonb default '[]'::jsonb,

  -- 7. FAQs
  faqs_title text default 'Frequently Asked Questions',
  faqs jsonb default '[]'::jsonb,

  -- 8. Contact & Proposal Form Copy
  contact_title text default 'Request a Custom Sector Proposal',
  contact_subtitle text default 'Tell us about your facility size, headcount requirements, and key operational priorities.',

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure all columns exist if table was previously created with minimal columns
alter table public.industries add column if not exists tag text default 'Enterprise Sector';
alter table public.industries add column if not exists hero_headline text;
alter table public.industries add column if not exists hero_subtitle text;
alter table public.industries add column if not exists hero_stats jsonb default '[]'::jsonb;
alter table public.industries add column if not exists challenges_title text default 'Sector-Specific Challenges We Address';
alter table public.industries add column if not exists challenges_subtitle text default 'Navigating workforce unpredictability, compliance burdens, and high-stakes operations requires specialized domain expertise.';
alter table public.industries add column if not exists challenges jsonb default '[]'::jsonb;
alter table public.industries add column if not exists how_we_help_title text default 'How Trustmarks Empowers This Sector';
alter table public.industries add column if not exists how_we_help_subtitle text default 'From vetted personnel and round-the-clock supervision to stringent quality protocols, discover our dedicated service matrix.';
alter table public.industries add column if not exists solutions jsonb default '[]'::jsonb;
alter table public.industries add column if not exists benefits_title text default 'Why Sector Leaders Choose Trustmarks';
alter table public.industries add column if not exists benefits_subtitle text default 'Zero compliance liabilities, guaranteed attendance SLAs, and audit-ready governance.';
alter table public.industries add column if not exists benefits jsonb default '[]'::jsonb;
alter table public.industries add column if not exists case_study_title text default 'Real-World Impact & Benchmarks';
alter table public.industries add column if not exists case_study_subtitle text default 'Verified performance benchmarks across enterprise sites and facilities.';
alter table public.industries add column if not exists case_study_metrics jsonb default '[]'::jsonb;
alter table public.industries add column if not exists testimonials_title text default 'What Sector Leaders Say';
alter table public.industries add column if not exists testimonials jsonb default '[]'::jsonb;
alter table public.industries add column if not exists faqs_title text default 'Frequently Asked Questions';
alter table public.industries add column if not exists faqs jsonb default '[]'::jsonb;
alter table public.industries add column if not exists contact_title text default 'Request a Custom Sector Proposal';
alter table public.industries add column if not exists contact_subtitle text default 'Tell us about your facility size, headcount requirements, and key operational priorities.';

-- Enable Row Level Security (RLS) for industries
alter table public.industries enable row level security;

-- Drop existing policies first to prevent 42710 duplicate policy errors
drop policy if exists "Allow public read access to industries" on public.industries;
drop policy if exists "Allow anon and auth manage industries" on public.industries;

-- Recreate clean table policies
create policy "Allow public read access to industries"
  on public.industries for select
  using (true);

create policy "Allow anon and auth manage industries"
  on public.industries for all
  using (true)
  with check (true);

-- =========================================================================
-- 2. SUPABASE STORAGE BUCKET CONFIGURATION (industries)
-- =========================================================================
insert into storage.buckets (id, name, public)
values ('industries', 'industries', true)
on conflict (id) do update set public = true;

-- Drop existing storage policies first to prevent "policy already exists" error
drop policy if exists "Public Access to Industry Images" on storage.objects;
drop policy if exists "Allow Industry Image Uploads" on storage.objects;
drop policy if exists "Allow Industry Image Updates" on storage.objects;
drop policy if exists "Allow Industry Image Deletion" on storage.objects;

-- Recreate storage policies
create policy "Public Access to Industry Images"
  on storage.objects for select
  using (bucket_id = 'industries');

create policy "Allow Industry Image Uploads"
  on storage.objects for insert
  with check (bucket_id = 'industries');

create policy "Allow Industry Image Updates"
  on storage.objects for update
  using (bucket_id = 'industries');

create policy "Allow Industry Image Deletion"
  on storage.objects for delete
  using (bucket_id = 'industries');

-- =========================================================================
-- 3. SEED ALL 12 DEFAULT REFERENCE INDUSTRIES (100% Granular CMS Data)
-- =========================================================================

-- 1. Corporate Offices
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Corporate Offices',
  'corporate-offices',
  'Reliable workforce solutions to ensure smooth operations and a professional work environment.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'Building2',
  'Corporate & IT Parks',
  1,
  true,
  'Workforce & Integrated Facility Management for Modern Corporate Offices',
  'Elevate workplace productivity, executive security, and pristine environmental hygiene across premier commercial towers and corporate headquarters in Gujarat.',
  '[{"label": "Uptime SLA", "value": "99.9%", "desc": "Continuous facility uptime"}, {"label": "Statutory Compliance", "value": "100%", "desc": "Zero labor liability"}, {"label": "Client Retention", "value": "98%", "desc": "Long-term partnerships"}]'::jsonb,
  'Key Operational Challenges in Corporate Facilities',
  'Modern office towers demand seamless daily coordination between front-of-house hospitality, stringent visitor security, and continuous clean desk environments.',
  '[
    {"title": "High Attrition & Inconsistent Staffing", "desc": "Frequent housekeeping and pantry staff churn disrupts executive floor standards and day-to-day meetings.", "impact": "Guaranteed 2-hour rapid standby replacement deployment across Ahmedabad and Gandhinagar.", "icon": "Clock"},
    {"title": "Security & Visitor Protocol Lapses", "desc": "Lax lobby screening and unverified visitor entry expose enterprise intellectual property and confidential assets to risk.", "impact": "PSARA-licensed corporate security officers trained in digital visitor management and access control.", "icon": "ShieldCheck"},
    {"title": "Multi-Vendor Coordination Headaches", "desc": "Managing separate vendors for cleaning, security, MEP engineering, and payroll creates operational friction and billing leaks.", "impact": "Single point of accountability with dedicated facility managers and transparent statutory dashboards.", "icon": "Layers"}
  ]'::jsonb,
  'Key Challenges We Solve in Corporate Offices',
  'Addressing high turnover, statutory liabilities, and operational bottlenecks with verified protocols.',
  '[
    {"title": "Manned Security Services", "desc": "Trained and verified security personnel to ensure a safe and secure workplace for employees, visitors and assets.", "icon": "ShieldCheck", "image_url": "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80", "tag": "Security"},
    {"title": "Front Office & Reception Management", "desc": "Professional and courteous front desk staff to manage visitors, calls and administrative support with efficiency.", "icon": "Users", "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80", "tag": "Front Desk"},
    {"title": "Housekeeping Services", "desc": "Clean, hygienic and well-maintained workspaces that create a healthier and more productive environment.", "icon": "Sparkles", "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80", "tag": "Hygiene"},
    {"title": "Facility Management", "desc": "Preventive and reactive maintenance support for uninterrupted operations across electrical, HVAC, plumbing and more.", "icon": "Cog", "image_url": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80", "tag": "Technical"},
    {"title": "Pantry & Cafeteria Support", "desc": "Well-trained staff for pantry, beverage and cafeteria services to ensure a seamless employee experience.", "icon": "UtensilsCrossed", "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", "tag": "Hospitality"},
    {"title": "Administrative Support", "desc": "Skilled support staff for day-to-day office operations, documentation and workflow management.", "icon": "FileText", "image_url": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80", "tag": "Operations"},
    {"title": "Flexible Workforce Solutions", "desc": "Scalable staffing support to manage peak workloads, projects and short-term requirements.", "icon": "Briefcase", "image_url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", "tag": "Staffing"},
    {"title": "Statutory Compliance Management", "desc": "End-to-end compliance with labor laws, PF, ESIC, minimum wages and other regulatory requirements to eliminate enterprise liability.", "icon": "Scale", "image_url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80", "tag": "Compliance"}
  ]'::jsonb,
  'Why Leading Enterprises Choose Trustmarks',
  'Trusted by Fortune 500 corporations, IT giants, and industrial business houses across Western India.',
  '[
    {"stat": "100%", "title": "Zero Enterprise Liability", "desc": "Complete statutory compliance certificates delivered with every monthly invoice.", "icon": "ShieldCheck"},
    {"stat": "< 2 Hrs", "title": "Standby Replacements", "desc": "Immediate standby deployment in case of unannounced absenteeism or special townhalls.", "icon": "Clock"},
    {"stat": "3-Tier", "title": "Police & Background Vetting", "desc": "Thorough criminal record, permanent address, and biometric verification for every staff member.", "icon": "UserCheck"}
  ]'::jsonb,
  'Corporate Facility Transformation Metrics',
  'Demonstrated operational improvements delivered across 1.2M+ sq. ft. of corporate towers in Gujarat.',
  '[
    {"metric": "35%", "label": "Reduction in Facility Operating Friction"},
    {"metric": "99.8%", "label": "Monthly Staff Attendance & Punctuality"},
    {"metric": "100%", "label": "Statutory Audits Passed Without Deficiency"}
  ]'::jsonb,
  'What Corporate Facility Leaders Say',
  '[
    {"quote": "Trustmarks transformed our regional headquarters in Gandhinagar. Their corporate security and housekeeping team operate with military precision and impeccable grooming.", "author": "Alok Sengupta", "designation": "VP - Infrastructure & Workplace", "company": "Fintech Innovation Park", "rating": 5}
  ]'::jsonb,
  'Corporate Facility Management FAQs',
  '[
    {"q": "What is your transition timeline when replacing an existing vendor?", "a": "We execute a structured 14-day handover with zero disruption to office operations, including site audits, biometric enrollment, and client SOP alignment."},
    {"q": "How do you ensure staff compliance and transparency?", "a": "We provide monthly compliance packs including PF ECR receipts, ESIC challans, and wage register proofs before client billing."}
  ]'::jsonb,
  'Request a Corporate Facility Proposal',
  'Schedule a complimentary site audit and receive a customized commercial proposal within 24 hours.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 2. Manufacturing
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Manufacturing',
  'manufacturing',
  'Skilled and unskilled workforce to enhance productivity and maintain operational efficiency.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  'Factory',
  'Heavy & Light Industry',
  2,
  true,
  'Heavy Industrial Guarding & Compliant Plant Workforce Solutions',
  'Safeguard high-value plant machinery, manage complex 3-shift production lines, and enforce strict factory gate access across Gujarat''s industrial corridors.',
  '[{"label": "Plant Safety Record", "value": "Zero Incident", "desc": "Strict factory compliance"}, {"label": "Shift Coverage", "value": "24/7/365", "desc": "3-shift continuous uptime"}, {"label": "Statutory Audit Score", "value": "100%", "desc": "Zero labor liabilities"}]'::jsonb,
  'Core Operational Challenges in Manufacturing Facilities',
  'Industrial manufacturing plants face high turnover, strict safety standards (Factories Act), and heavy material movement.',
  '[
    {"title": "Perimeter Breaches & Material Pilferage", "desc": "Raw materials, copper cabling, and finished goods are vulnerable to theft during multi-shift logistics.", "impact": "Armed industrial security guards, weighbridge monitoring, and material inward/outward gate verification.", "icon": "ShieldCheck"},
    {"title": "Assembly Line Absenteeism & Output Delays", "desc": "Unplanned worker absenteeism stalls production batches and increases overtime costs.", "impact": "Dedicated standby pool of trained machine operators, loaders, and helpers deployed on 2 hours notice.", "icon": "Users"},
    {"title": "Factories Act & Statutory Compliance Risks", "desc": "Non-compliance with minimum wages, overtime caps, or safety protocols can lead to plant closure notices.", "impact": "100% statutory adherence with monthly ECRs, safety PPE enforcement, and labor law advisory.", "icon": "Scale"}
  ]'::jsonb,
  'How Trustmarks Empowers Manufacturing Plants',
  'Comprehensive industrial workforce and facility engineering engineered for heavy machinery and continuous production plants.',
  '[
    {"title": "Industrial Plant Security & Weighbridge Control", "desc": "Rigorous gate passes, visitor vetting, perimeter patrolling, and truck search protocols to protect high-value assets.", "tag": "Security", "icon": "ShieldCheck", "features": ["Gate Pass Controls", "Weighbridge Checks", "Perimeter Guarding"]},
    {"title": "Assembly Line & Technical Support Staff", "desc": "Pre-screened, verified machine helpers, packaging workers, and material handlers trained in 5S and industrial safety.", "tag": "Staffing", "icon": "Users", "features": ["5S Methodology", "Shift Line Helpers", "Safety PPE Equipped"]},
    {"title": "Industrial Shop Floor & Heavy Cleaning", "desc": "Mechanized oil-spill degreasing, scrubber dryers for high-bay floors, overhead crane dusting, and hazardous waste handling.", "tag": "Hygiene", "icon": "Sparkles", "features": ["Oil Spill Degreasing", "Ride-On Scrubbers", "Hazmat Protocols"]},
    {"title": "Plant Electrical & Utility Technicians", "desc": "Certified electricians, boiler assistants, and plumbing engineers ensuring continuous machinery uptime and cooling tower maintenance.", "tag": "Technical", "icon": "Cog", "features": ["MEP Maintenance", "Transformer Logs", "Compressor Uptime"]},
    {"title": "Emergency Evacuation & Fire Safety Teams", "desc": "Fire-safety trained security staff capable of managing rapid plant evacuations, fire hydrant drills, and hazmat protocol.", "tag": "Safety", "icon": "Zap", "features": ["Hydrant Drills", "First Aid Certified", "Rapid Evacuation"]},
    {"title": "Automated Statutory Compliance Management", "desc": "Complete documentation under the Factories Act, Contract Labour (R&A) Act, PF, ESIC, and statutory audit readiness.", "tag": "Compliance", "icon": "FileCheck", "features": ["Factories Act Audit", "CLRA Registration", "Monthly ECR Passes"]}
  ]'::jsonb,
  'Why Plant Heads & Operations Directors Rely on Us',
  'Engineered for GIDC clusters in Sanand, Changodar, Vithalapur, Ankleshwar, and Hazira.',
  '[
    {"stat": "100%", "title": "Factories Act Compliant", "desc": "Complete safety compliance and verified statutory documentation for every deployed worker.", "icon": "Scale"},
    {"stat": "< 120 Min", "title": "Rapid Shift Replacement", "desc": "Standby manpower buffers for emergency shift shortages and peak production surges.", "icon": "Clock"},
    {"stat": "Zero", "title": "Labour Dispute Liability", "desc": "Strict compliance protects enterprise management from any direct labor disputes or unions.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'Plant Operations Impact Highlights',
  'Delivering disciplined productivity across automotive, chemical, and engineering plants.',
  '[
    {"metric": "40%", "label": "Drop in Material Pilferage Incidents"},
    {"metric": "99.4%", "label": "Shift Fulfilment Rate Across 3 Shifts"},
    {"metric": "100%", "label": "Statutory & Safety Audit Compliance"}
  ]'::jsonb,
  'What Industrial Plant Leaders Say',
  '[
    {"quote": "Managing 3 round-the-clock shifts with 400+ workers was challenging until we partnered with Trustmarks. Their security gate control and housekeeping standards are outstanding.", "author": "Devendra Patel", "designation": "Plant Head - Automotive Tier-1", "company": "Sanand Industrial Zone", "rating": 5}
  ]'::jsonb,
  'Manufacturing Workforce FAQs',
  '[
    {"q": "Do you supply manpower across 3 rotating shifts?", "a": "Yes, we provide full 24/7 3-shift coverage including night shifts with dedicated shift supervisors and replacement buffers."},
    {"q": "Are your industrial security guards trained in fire fighting?", "a": "All industrial guards undergo mandatory fire-safety, emergency evacuation, and First-Aid training before deployment."}
  ]'::jsonb,
  'Request a Manufacturing Plant Proposal',
  'Connect with our industrial operations directors for immediate manpower deployment and security audits.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 3. Warehousing & Logistics
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Warehousing & Logistics',
  'warehousing-logistics',
  'Trained staff to manage your supply chain operations with safety and accuracy.',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  'Warehouse',
  'Logistics & Fulfillment',
  3,
  true,
  'High-Throughput Warehouse Security & Scalable Logistics Staffing',
  'Protect fulfillment centers, ensure rapid inbound/outbound material verification, and deploy scalable seasonal manpower across Gujarat''s logistics hubs.',
  '[{"label": "Shrinkage Rate", "value": "< 0.01%", "desc": "Tight dock security"}, {"label": "Surge Scaling", "value": "+300%", "desc": "Rapid seasonal scaling"}, {"label": "Dispatch Accuracy", "value": "99.9%", "desc": "Trained material handlers"}]'::jsonb,
  'Critical Logistics & Warehousing Pain Points',
  'E-commerce surges, dock bottlenecks, inventory leakage, and round-the-clock loading dock hazards.',
  '[
    {"title": "Inventory Shrinkage & Dock Collusion", "desc": "Unmonitored loading docks and lax driver verification lead to unexplained inventory discrepancies.", "impact": "24/7 CCTV-integrated dock guards, biometric trucker check-in, and seal verification protocols.", "icon": "ShieldCheck"},
    {"title": "Festive Season Spike Scaling (2x-3x Demand)", "desc": "Festive e-commerce sales demand sudden hiring of hundreds of verified pickers, packers, and loaders.", "impact": "Pre-screened talent pipeline capable of scaling from 50 to 300+ personnel in under 72 hours.", "icon": "TrendingUp"}
  ]'::jsonb,
  'How Trustmarks Protects & Powers Supply Chains',
  'Tailored security and manpower operations engineered for modern logistics and automated fulfillment centers.',
  '[
    {"title": "Loading Bay & Dock Gate Security", "desc": "Container seal checks, driver identity logging, CCTV gate coverage, and perimeter patrols to eliminate inventory leakage.", "tag": "Security", "icon": "ShieldCheck", "features": ["Container Seal Logs", "Driver ID Scanning", "CCTV Gate Patrol"]},
    {"title": "Trained Pickers, Packers & Sorters", "desc": "Disciplined, barcode-literate workforce for rapid order picking, pallet wrapping, sorting, and dispatch.", "tag": "Staffing", "icon": "Users", "features": ["Barcode Scanning", "Pallet Wrapping", "Dispatch Staging"]},
    {"title": "High-Bay Mechanized Floor Cleaning", "desc": "Ride-on auto-scrubbers keeping vast concrete floors clean of tire marks, pallet splinters, and dust.", "tag": "Hygiene", "icon": "Sparkles", "features": ["Auto Scrubbers", "Concrete Sealing", "Dust Elimination"]}
  ]'::jsonb,
  'Why Top 3PL & E-Commerce Brands Choose Us',
  'Supporting supply chain fulfillment across Ahmedabad, Changodar, Kheda, and Surat corridors.',
  '[
    {"stat": "99.9%", "title": "Dispatch On-Time Rate", "desc": "Disciplined attendance ensures fulfillment centers never miss courier cut-off times.", "icon": "Clock"},
    {"stat": "100%", "title": "Vetted Backgrounds", "desc": "Complete biometric background verification preventing inventory shrinkage.", "icon": "UserCheck"}
  ]'::jsonb,
  'Logistics Facility Performance Metrics',
  'Delivered across 800,000+ sq. ft. of warehouse space in Western India.',
  '[
    {"metric": "92%", "label": "Reduction in Warehouse Shrinkage"},
    {"metric": "300+", "label": "Workers Deployed in 48-Hour Surge"},
    {"metric": "100%", "label": "Statutory Minimum Wages Compliance"}
  ]'::jsonb,
  'What Supply Chain Leaders Say',
  '[
    {"quote": "Trustmarks supplied 180 verified loaders and gate guards for our Diwali fulfillment surge with zero compliance hiccups. Truly dependable partners.", "author": "Mehul Shah", "designation": "General Manager - Supply Chain", "company": "Western Logistics Hub", "rating": 5}
  ]'::jsonb,
  'Warehouse Staffing FAQs',
  '[
    {"q": "How fast can you mobilize temporary seasonal workers for peak season?", "a": "We maintain a pre-vetted candidate bench and can scale from 20 to 200+ trained staff within 48 to 72 hours."}
  ]'::jsonb,
  'Request a Warehousing & Logistics Proposal',
  'Get in touch for customized dock security, seasonal staffing quotes, and facility audits.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 4. Retail & Shopping Malls
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Retail & Shopping Malls',
  'retail-shopping-malls',
  'Customer-focused workforce to elevate customer experience and ensure seamless operations.',
  'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
  'ShoppingBag',
  'High Footfall Commercial',
  4,
  true,
  'Premium Retail Security & High-Footfall Mall Facility Management',
  'Deliver world-class guest experiences, spotless high-traffic washroom hygiene, and discreet shoplifting deterrence for luxury malls and retail outlets.',
  '[{"label": "Footfall Handled", "value": "50,000+ Daily", "desc": "Seamless crowd control"}, {"label": "Hygiene Standard", "value": "Hospital Grade", "desc": "High-frequency cleaning"}, {"label": "Customer Satisfaction", "value": "98.5%", "desc": "Courteous personnel"}]'::jsonb,
  'High-Traffic Retail & Mall Challenges',
  'Continuous footfall, weekend crowd surges, theft prevention, and pristine public restroom standards.',
  '[
    {"title": "Continuous Washroom & Floor Contamination", "desc": "High footfall leads to rapidly soiled washrooms and slippery floors that damage mall reputation.", "impact": "Continuous 15-minute cleaning cycles with dedicated attendants and slip-free drying protocols.", "icon": "Sparkles"},
    {"title": "Discreet Shoplifting & Loss Prevention", "desc": "High value retail items require vigilant monitoring without creating a hostile shopping atmosphere.", "impact": "Plainclothes loss prevention officers and smart uniformed entrance guards trained in customer hospitality.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'How Trustmarks Elevates Retail Ecosystems',
  'Customer-first security, pristine hygiene, and MEP engineering tailored for modern shopping destinations.',
  '[
    {"title": "Courteous Mall Security & Metal Detector Screening", "desc": "Smartly attired security officers trained in baggage screening, crowd management, lost-child protocols, and parking control.", "tag": "Security", "icon": "ShieldCheck", "features": ["Bag Screening", "Crowd Marshals", "Parking Management"]},
    {"title": "High-Frequency Restroom & Atrium Cleaning", "desc": "Continuous touchpoint sanitization, odor management, escalator glass buffing, and atrium floor shining.", "tag": "Hygiene", "icon": "Sparkles", "features": ["15-Min Washroom Audits", "Glass Buffing", "Odor Neutralization"]},
    {"title": "Mall MEP & HVAC Operations", "desc": "Continuous monitoring of centralized chillers, lighting ambience, elevators, and backup diesel generators.", "tag": "Technical", "icon": "Cog", "features": ["Chiller Maintenance", "Elevator Monitoring", "Emergency Power"]}
  ]'::jsonb,
  'The Trustmarks Retail Advantage',
  'Trusted by prominent shopping malls and multi-brand showrooms across Gujarat.',
  '[
    {"stat": "15 Min", "title": "Restroom Audit Cycle", "desc": "Dedicated digital checklists ensure pristine public washroom cleanliness at all hours.", "icon": "Clock"},
    {"stat": "100%", "title": "Customer-Centric Training", "desc": "Staff trained in polite communication, emergency first-aid, and lost-and-found protocols.", "icon": "UserCheck"}
  ]'::jsonb,
  'Retail Destination Results',
  'Measurable outcomes achieved across high-traffic retail corridors.',
  '[
    {"metric": "99.4%", "label": "Positive Guest Hygiene Feedback"},
    {"metric": "60%", "label": "Reduction in Retail Shoplifting Loss"},
    {"metric": "24/7", "label": "Operational Helpdesk for Tenants"}
  ]'::jsonb,
  'What Mall Directors Say',
  '[
    {"quote": "Trustmarks handles the security and housekeeping for our 4-story retail destination. Their staff are courteous, attentive, and maintain showroom-level shine.", "author": "Karan Singhal", "designation": "Operations Director", "company": "Grand Avenue Mall", "rating": 5}
  ]'::jsonb,
  'Retail Facility FAQs',
  '[
    {"q": "Can you provide extra bouncers and crowd controllers for weekend sales and celebrity visits?", "a": "Yes, we provide emergency event security and crowd control teams on 4 hours advance notice."}
  ]'::jsonb,
  'Request a Retail Facility Proposal',
  'Contact our retail specialists for comprehensive mall management and loss prevention quotes.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 5. Healthcare
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Healthcare',
  'healthcare',
  'Compassionate and trained professionals to support healthcare facilities and patients.',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  'Hospital',
  'NABH & Sterile Environments',
  5,
  true,
  'NABH-Compliant Hospital Housekeeping & Sensitive Healthcare Security',
  'Maintain strict bio-medical waste segregation, sterile OT infection control, and patient-first compassionate security across multi-specialty hospitals.',
  '[{"label": "NABH Compliance", "value": "100%", "desc": "Zero protocol violations"}, {"label": "Infection Control", "value": "Hospital Grade", "desc": "Bio-medical protocols"}, {"label": "Emergency Readiness", "value": "< 60 Sec", "desc": "Code Red/Blue assistance"}]'::jsonb,
  'Unique Demands of Healthcare Facilities',
  'Cross-contamination risks, sensitive patient disputes, 24/7 emergency room surges, and bio-hazard regulations.',
  '[
    {"title": "Hospital-Acquired Infection (HAI) Risks", "desc": "Inadequate surface disinfection in ICUs and Operation Theatres can cause fatal cross-infections.", "impact": "Color-coded micro-fiber cleaning, high-grade hospital disinfectants, and trained infection control crews.", "icon": "Sparkles"},
    {"title": "Emergency Room Agitation & Sensitive Security", "desc": "Grief and panic in ER rooms require calm, de-escalating security guards who protect medical staff with empathy.", "impact": "Specialized healthcare security officers trained in patient empathy, mob control, and doctor safety.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'How Trustmarks Empowers Healthcare Leaders',
  'Clinical-grade sanitation, patient support staffing, and sensitive healthcare facility management.',
  '[
    {"title": "Sterile OT & ICU Deep Sanitization", "desc": "NABH-aligned sterilization procedures, air-duct sanitization, terminal cleaning, and bio-hazard containment.", "tag": "Clinical", "icon": "Sparkles", "features": ["NABH Sterilization", "Terminal Cleaning", "Color-Coded Microfiber"]},
    {"title": "Hospital Security & Doctor Protection", "desc": "Round-the-clock ER vigilance, ICU access management, patient attendant regulation, and Code Red fire response.", "tag": "Security", "icon": "ShieldCheck", "features": ["ER Mob De-escalation", "ICU Access Badge", "Doctor Protection"]},
    {"title": "General Duty Assistants (GDA) & Ward Boys", "desc": "Trained, compassionate patient transfer staff, stretcher bearers, wheelchair assistants, and sample runners.", "tag": "Staffing", "icon": "Users", "features": ["Patient Transfer", "Wheelchair Support", "Lab Sample Runners"]}
  ]'::jsonb,
  'The Trustmarks Healthcare Standard',
  'Trusted by renowned multi-specialty hospitals and medical diagnostic chains across Gujarat.',
  '[
    {"stat": "100%", "title": "NABH Audit Readiness", "desc": "Complete documentation of cleaning logs, chemical dilution charts, and staff vaccination records.", "icon": "FileCheck"},
    {"stat": "Zero", "title": "Bio-Waste Segregation Errors", "desc": "Rigorous daily adherence to state pollution control board bio-medical waste norms.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'Healthcare Facility Impact',
  'Clinical excellence delivered across prominent multi-specialty hospitals.',
  '[
    {"metric": "0%", "label": "Audit Deficiencies on Infection Audits"},
    {"metric": "100%", "label": "Vaccinated & Health-Checked Staff"},
    {"metric": "24/7", "label": "ICU & Emergency Attendant Coverage"}
  ]'::jsonb,
  'What Medical Directors Say',
  '[
    {"quote": "Trustmarks understands the clinical discipline required in our 250-bed multi-specialty hospital. Their ward staff and ICU housekeeping are exceptional.", "author": "Dr. Aniruddh Joshi", "designation": "Medical Director", "company": "LifeCare Multispeciality Hospital", "rating": 5}
  ]'::jsonb,
  'Healthcare Staffing FAQs',
  '[
    {"q": "Are your hospital cleaners trained in bio-medical waste segregation?", "a": "Yes, every cleaner undergoes mandatory BMW color-code segregation and spill-kit management training prior to deployment."}
  ]'::jsonb,
  'Request a Healthcare Facility Proposal',
  'Consult with our healthcare facility experts for NABH-compliant hospital staffing quotes.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 6. Education
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Education',
  'education',
  'Dedicated staff to maintain a safe, clean and efficient environment for learning and growth.',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  'GraduationCap',
  'Schools & Universities',
  6,
  true,
  'Child-Safe Campus Security & Clean Educational Environments',
  'Ensure student safety, child protection compliance (POCSO vetting), and hygienic classrooms across schools, colleges, and university campuses in Gujarat.',
  '[{"label": "POCSO Police Vetting", "value": "100%", "desc": "Strict background check"}, {"label": "Campus Coverage", "value": "24/7", "desc": "Hostel & perimeter safety"}, {"label": "Classroom Hygiene", "value": "Daily Audit", "desc": "Germ-free environments"}]'::jsonb,
  'Campus Safety & Facility Challenges',
  'Student safety, stringent child protection mandates, large sprawling campus grounds, and visitor regulation.',
  '[
    {"title": "Campus Security & Child Protection Vetting", "desc": "Educational institutes face immense regulatory pressure to ensure zero unauthorized campus access.", "impact": "100% police-vetted guards, visitor badge gates, and bus boarding security supervision.", "icon": "ShieldCheck"},
    {"title": "High-Traffic Classroom & Canteen Hygiene", "desc": "Sprawling educational buildings require continuous litter control and germ-free student restrooms.", "impact": "Scheduled recess cleanups, continuous restroom sanitation, and non-toxic cleaning agents.", "icon": "Sparkles"}
  ]'::jsonb,
  'How Trustmarks Safeguards Educational Campuses',
  'Child-safe security, reliable campus housekeeping, and hostel management solutions.',
  '[
    {"title": "Gate Security & Student Bus Monitoring", "desc": "Trained security personnel checking student ID badges, visitor logs, and monitoring bus drop-off points.", "tag": "Security", "icon": "ShieldCheck", "features": ["ID Gate Verification", "School Bus Escort", "Visitor Badge Kiosks"]},
    {"title": "Campus & Classroom Housekeeping", "desc": "Deep sanitization of classrooms, computer labs, auditoriums, and sports complexes using safe non-toxic chemicals.", "tag": "Hygiene", "icon": "Sparkles", "features": ["Non-Toxic Green Cleaners", "Recess Washroom Sweeps", "Lab Sanitization"]},
    {"title": "Hostel & Sprawling Campus Maintenance", "desc": "24/7 security for girls'' and boys'' hostels, plumbing and electrical upkeep, and grounds keeping.", "tag": "Campus", "icon": "Building2", "features": ["Hostel Warden Support", "MEP Repair Crew", "Grounds Upkeep"]}
  ]'::jsonb,
  'The Trustmarks Educational Standard',
  'Trusted by top CBSE schools, engineering colleges, and universities in Ahmedabad and Gandhinagar.',
  '[
    {"stat": "100%", "title": "Police & POCSO Verified", "desc": "Every deployed guard and housekeeping worker has clear police verification certificates on file.", "icon": "UserCheck"}
  ]'::jsonb,
  'Campus Safety Highlights',
  'Trusted across premier educational institutions.',
  '[
    {"metric": "100%", "label": "Police Vetting Compliance Rate"},
    {"metric": "15+", "label": "Educational Campuses Managed"},
    {"metric": "Zero", "label": "Security Lapses Recorded"}
  ]'::jsonb,
  'What Campus Principals Say',
  '[
    {"quote": "Trustmarks provides our 15-acre school campus with dependable, polite security and immaculate housekeeping. Parents and board members are very pleased.", "author": "Pratima Dave", "designation": "Principal", "company": "St. Xavier''s International Campus", "rating": 5}
  ]'::jsonb,
  'Educational Campus FAQs',
  '[
    {"q": "Do you provide female security guards for girls'' hostels and junior schools?", "a": "Yes, we provide trained female security guards and female cleaning attendants for dedicated wings."}
  ]'::jsonb,
  'Request an Educational Campus Proposal',
  'Contact our campus security specialists for customized school and college proposals.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 7. Hospitality
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Hospitality',
  'hospitality',
  'Professional workforce to deliver exceptional service and memorable guest experiences.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'UtensilsCrossed',
  'Hotels, Resorts & Clubs',
  7,
  true,
  '5-Star Hotel Housekeeping & Discreet Hospitality Security',
  'Deliver flawless guest satisfaction, immaculate banquet turnaround, and discreet VIP protection across luxury hotels and heritage resorts.',
  '[{"label": "Guest Satisfaction", "value": "99.2%", "desc": "5-star cleanliness audit"}, {"label": "Banquet Turnaround", "value": "< 45 Min", "desc": "Rapid hall turnover"}, {"label": "Staff Grooming", "value": "100%", "desc": "Hospitality standard"}]'::jsonb,
  'Hospitality Management Challenges',
  'Fast room turnaround, late-night banquet cleanup, guest privacy, and valet parking coordination.',
  '[
    {"title": "Peak Banquet & Event Turnaround", "desc": "Weddings and conferences require immediate overnight hall resetting and dish-washing crews.", "impact": "Flexible banquet stewarding and night cleaning teams ready on flexible billing models.", "icon": "Clock"},
    {"title": "Impeccable Room Cleaning & Hygiene", "desc": "Guest online reviews directly depend on spotless linen, shining mirrors, and fresh aromas.", "impact": "Hospitality-trained room attendants certified in 5-star standard room setups.", "icon": "Sparkles"}
  ]'::jsonb,
  'How Trustmarks Serves Luxury Hospitality',
  'Trained stewarding, room attendants, front-of-house security, and facility upkeep.',
  '[
    {"title": "Guest Room Attendants & Public Area Cleaning", "desc": "Groomed, soft-spoken room attendants trained in luxury bed-making, deep carpet cleaning, and brass polishing.", "tag": "Housekeeping", "icon": "Sparkles", "features": ["5-Star Bed Making", "Carpet Extraction", "Brass Polishing"]},
    {"title": "Kitchen Stewarding & Banquet Staff", "desc": "Hygienic pot-washing, dishwashing machine operators, banquet hall setup assistants, and kitchen degreasing.", "tag": "F&B", "icon": "UtensilsCrossed", "features": ["Dish Machine Operators", "Kitchen Degreasing", "Banquet Reset"]},
    {"title": "Discreet Hotel & Valet Security", "desc": "Elegant lobby security, valet parking assistants, and discreet VIP bodyguarding.", "tag": "Security", "icon": "ShieldCheck", "features": ["Valet Marshals", "Lobby Access Control", "VIP Escort"]}
  ]'::jsonb,
  'The Trustmarks Hospitality Standard',
  'Partnering with leading business hotels and luxury resorts across Gujarat.',
  '[
    {"stat": "100%", "title": "Groomed & Uniformed", "desc": "Strict grooming checks before every shift ensure impeccable brand alignment.", "icon": "UserCheck"}
  ]'::jsonb,
  'Hospitality Performance Highlights',
  'Impeccable standards delivered across leading hospitality destinations.',
  '[
    {"metric": "99.2%", "label": "Cleanliness Rating on Guest Surveys"},
    {"metric": "100+", "label": "Banquets & Weddings Managed Seamlessly"},
    {"metric": "Zero", "label": "Late-night Staff Shortages"}
  ]'::jsonb,
  'What Hotel General Managers Say',
  '[
    {"quote": "Trustmarks provides our 5-star property with banquet stewarding and night housekeeping. Their team is disciplined and delivers luxury standards consistently.", "author": "Samir Varma", "designation": "General Manager", "company": "Regency Grand Hotel & Resorts", "rating": 5}
  ]'::jsonb,
  'Hospitality Staffing FAQs',
  '[
    {"q": "Do you supply staff for high-volume wedding seasons?", "a": "Yes, we provide flexible scalable banquet stewarding and housekeeping staff on demand during peak wedding and conference dates."}
  ]'::jsonb,
  'Request a Hospitality Facility Proposal',
  'Connect with our hospitality team for customized hotel staffing and housekeeping contracts.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 8. Construction
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Construction',
  'construction',
  'Skilled and semi-skilled manpower to ensure timely and safe project completion.',
  'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
  'HardHat',
  'Real Estate & Infrastructure',
  8,
  true,
  'Construction Site Guarding & Skilled Manpower Solutions',
  'Protect multi-crore building materials, secure site perimeters, enforce mandatory PPE safety, and supply reliable skilled construction labor across Gujarat.',
  '[{"label": "Material Loss", "value": "Zero Theft", "desc": "Rigorous gate registers"}, {"label": "PPE Compliance", "value": "100%", "desc": "Safety-first protocol"}, {"label": "Manpower Deployment", "value": "< 24 Hrs", "desc": "Fast site mobilization"}]'::jsonb,
  'Construction Project Security & Labor Challenges',
  'Costly steel and cement theft, worker absenteeism, hazardous site environments, and labor compliance mandates.',
  '[
    {"title": "Night-Time Theft of Steel, Copper & Machinery", "desc": "Unsecured construction perimeters are prime targets for organized material pilferage.", "impact": "24/7 night-patrolling guards with high-beam searchlights and strict material dispatch registers.", "icon": "ShieldCheck"},
    {"title": "Workforce Shortages & Delayed Milestones", "desc": "Unreliable local labor contractors delay concrete pours and structural deadlines.", "impact": "Verified masons, bar-benders, helpers, and safety marshals mobilized on clear SLA contracts.", "icon": "Users"}
  ]'::jsonb,
  'How Trustmarks Secures & Builds Your Projects',
  'Complete site security, labor contracting, and post-construction handover deep cleaning.',
  '[
    {"title": "Construction Site Security & Gate Pass Control", "desc": "Strict entry/exit logs for cement trucks, steel trailers, sub-contractors, and biometric worker attendance.", "tag": "Security", "icon": "ShieldCheck", "features": ["Truck Search Registers", "Biometric Worker Gate", "Night Patrol Lights"]},
    {"title": "Skilled & Semi-Skilled Construction Labor", "desc": "Vetted helpers, scaffolders, concrete assistants, and equipment operators with mandatory safety PPE.", "tag": "Workforce", "icon": "HardHat", "features": ["Masons & Helpers", "PPE Enforced", "Surge Mobilization"]},
    {"title": "Post-Construction Handover Deep Cleaning", "desc": "Removal of cement splatter, paint residue, tile acid scrubbing, and glass sticker scraping for builder handovers.", "tag": "Cleaning", "icon": "Sparkles", "features": ["Cement Stain Acid Wash", "Window Glass Scraping", "Handover Shine"]}
  ]'::jsonb,
  'The Trustmarks Construction Guarantee',
  'Trusted by premier real estate developers and infrastructure EPC contractors in Western India.',
  '[
    {"stat": "100%", "title": "BOCW & Labor Law Compliance", "desc": "Full statutory compliance protecting developers from builder liability.", "icon": "Scale"}
  ]'::jsonb,
  'Construction Project Metrics',
  'Proven protection across multi-crore real estate projects.',
  '[
    {"metric": "100%", "label": "Material Dispatches Audited & Verified"},
    {"metric": "400+", "label": "Units Deep-Cleaned for Handover"},
    {"metric": "Zero", "label": "Site Security Compromises"}
  ]'::jsonb,
  'What Project Directors Say',
  '[
    {"quote": "Trustmarks guarded our 20-acre residential township project during full construction. Not a single steel rod went missing, and their handover cleaning was flawless.", "author": "Hardik Patel", "designation": "Project Director", "company": "Shivalik Realty & Infra", "rating": 5}
  ]'::jsonb,
  'Construction Security FAQs',
  '[
    {"q": "Do your guards inspect vehicles leaving the construction site?", "a": "Yes, all outgoing trucks, concrete mixers, and worker bags undergo mandatory physical inspection against verified gate passes."}
  ]'::jsonb,
  'Request a Construction Project Proposal',
  'Get in touch with our site security and labor contracting team for custom project quotes.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 9. Banking & Financial Services
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Banking & Financial Services',
  'banking-financial-services',
  'Trustworthy professionals to ensure security, compliance and smooth daily operations.',
  'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80',
  'Landmark',
  'BFSI & Currency Chests',
  9,
  true,
  'Armed Banking Security & High-Discipline BFSI Facility Services',
  'Safeguard currency chests, ensure compliant branch security, and maintain executive corporate office banking premises across Gujarat.',
  '[{"label": "Gunman License Verification", "value": "100%", "desc": "Verified arms licenses"}, {"label": "Branch Uptime", "value": "24/7", "desc": "ATM & currency chest security"}, {"label": "Audit Compliance", "value": "100%", "desc": "RBI security guidelines"}]'::jsonb,
  'BFSI Security & Compliance Mandates',
  'Strict RBI security guidelines, ATM vulnerability, armed escort requirements, and customer trust.',
  '[
    {"title": "Cash-in-Transit & Branch Vulnerabilities", "desc": "Bank branches and ATM kiosks require alert, licensed armed guards with spotless integrity records.", "impact": "Ex-servicemen and licensed armed guards with biometric background vetting and regular firing practice checks.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'How Trustmarks Protects Banking Institutions',
  'Specialized armed security, ATM caretaker management, and executive branch housekeeping.',
  '[
    {"title": "Armed Guards & Ex-Servicemen Security", "desc": "Licensed 12-bore / rifle armed guards trained in cash escort, branch entry regulation, and emergency alarm response.", "tag": "Armed Security", "icon": "ShieldCheck", "features": ["Licensed Armed Personnel", "Ex-Servicemen Pool", "Cash Escort Protocol"]},
    {"title": "ATM Caretaker & Quick Reaction Teams (QRT)", "desc": "Round-the-clock ATM kiosk monitoring, shutter security, and emergency rapid response patrols.", "tag": "Surveillance", "icon": "Zap", "features": ["ATM Shutter Vigilance", "QRT Rapid Patrol", "CCTV Alarm Linking"]},
    {"title": "Pristine Banking Hall Housekeeping", "desc": "Spotless branch counters, glass cleaning, teller station sanitization, and clean-desk confidentiality.", "tag": "Housekeeping", "icon": "Sparkles", "features": ["Teller Counter Care", "Confidential Clean-Desk", "Customer Area Sanitization"]}
  ]'::jsonb,
  'The Trustmarks BFSI Standard',
  'Serving private banks, public sector branches, and NBFC networks across Western India.',
  '[
    {"stat": "100%", "title": "RBI Guideline Compliant", "desc": "Full compliance with RBI branch security protocols and arms licensing verification.", "icon": "Scale"}
  ]'::jsonb,
  'Banking Security Highlights',
  'Proven protection across banking branches.',
  '[
    {"metric": "120+", "label": "Bank Branches & ATMs Protected"},
    {"metric": "100%", "label": "Arms License Verification Rate"},
    {"metric": "Zero", "label": "Security Incident Rate in 7+ Years"}
  ]'::jsonb,
  'What Chief Security Officers Say',
  '[
    {"quote": "Trustmarks provides armed guards and housekeeping across 24 of our regional branches. Their discipline, punctuality, and background compliance give us total peace of mind.", "author": "Sunil Nair", "designation": "Chief Security Officer (West)", "company": "Apex National Bank", "rating": 5}
  ]'::jsonb,
  'Banking Security FAQs',
  '[
    {"q": "Are your armed guards ex-servicemen?", "a": "We deploy experienced ex-servicemen and verified armed guards with active, legally validated gun licenses."}
  ]'::jsonb,
  'Request a Banking Security Proposal',
  'Contact our BFSI security division for branch and ATM network coverage proposals.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 10. IT & ITES
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'IT & ITES',
  'it-ites',
  'Support workforce to keep your technology-driven operations running seamlessly.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  'Monitor',
  'Tech Parks & Data Centers',
  10,
  true,
  '24/7 IT Park Facility Management & Data Center Physical Security',
  'Support continuous 24/7 development operations, secure server rooms, manage executive cafeterias, and maintain spotless ergonomic tech workspaces.',
  '[{"label": "Data Center Uptime", "value": "100%", "desc": "Strict server room access"}, {"label": "Night Shift Support", "value": "24/7/365", "desc": "US/UK shift coverage"}, {"label": "Green Cleaning", "value": "100%", "desc": "Eco-certified sanitization"}]'::jsonb,
  'IT & ITES Facility Dynamics',
  'Round-the-clock US/UK shifts, confidential server room access, employee transport escorting, and ergonomic cleanliness.',
  '[
    {"title": "24/7 Shift Transitions & Women Safety", "desc": "Night-shift IT operations require verified female transport escorts and secure campus access.", "impact": "Specialized night security teams, female guards, and GPS-verified cab security marshals.", "icon": "ShieldCheck"},
    {"title": "Server Room & Data Center Access Control", "desc": "Physical breaches in server rooms jeopardize ISO 27001 data security certifications.", "impact": "Biometric dual-custody access logs, static server guards, and strict non-disclosure agreements.", "icon": "Lock"}
  ]'::jsonb,
  'How Trustmarks Powers Technology Workspaces',
  'Modern, quiet, non-intrusive facility management engineered for high-growth tech campuses.',
  '[
    {"title": "Data Center & Tech Park Access Security", "desc": "Multi-tier identity badge checks, asset tagging for laptops and servers, and night security monitoring.", "tag": "Security", "icon": "ShieldCheck", "features": ["Server Access Logs", "Laptop Asset Tagging", "24/7 Night Vigilance"]},
    {"title": "Quiet & Ergonomic Tech Housekeeping", "desc": "Non-disruptive clean-desk maintenance, acoustic panel vacuuming, server room anti-static dusting, and executive pantry care.", "tag": "Hygiene", "icon": "Sparkles", "features": ["Anti-Static Floor Care", "Quiet Vacuuming", "Clean Desk Protocol"]},
    {"title": "Server Room HVAC & Precision Cooling Technicians", "desc": "Continuous monitoring of CRAC units, UPS battery health, temperature thresholds, and backup generators.", "tag": "Technical", "icon": "Cog", "features": ["CRAC Unit Maintenance", "UPS Battery Logs", "Thermal Monitoring"]}
  ]'::jsonb,
  'The Trustmarks Tech Advantage',
  'Trusted by tier-1 software exporters, SaaS campuses, and fintech centers in GIFT City and Ahmedabad.',
  '[
    {"stat": "ISO 27001", "title": "Data Security Aligned", "desc": "Every deployed staff signs comprehensive NDAs and undergoes cyber-safe vetting.", "icon": "FileCheck"}
  ]'::jsonb,
  'Tech Campus Transformation',
  'Zero downtime delivered across critical IT centers.',
  '[
    {"metric": "100%", "label": "24/7 Shift Attendance Reliability"},
    {"metric": "Zero", "label": "Server Room Physical Security Breaches"},
    {"metric": "99.6%", "label": "Facility Quality Score on Tech Audits"}
  ]'::jsonb,
  'What IT Operations Heads Say',
  '[
    {"quote": "Operating a 24/7 global tech center in GIFT City requires flawless facility uptime. Trustmarks manages our entire 60,000 sq. ft. campus seamlessly.", "author": "Nitin Kulkarni", "designation": "Head of Operations", "company": "Global Cloud Technologies", "rating": 5}
  ]'::jsonb,
  'IT Campus Facility FAQs',
  '[
    {"q": "Do you supply security marshals for late-night female employee cabs?", "a": "Yes, we provide trained female and male security escorts certified in night transit safety protocols."}
  ]'::jsonb,
  'Request an IT Park Facility Proposal',
  'Schedule a technical site assessment for your IT campus or data center facility.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 11. Event Management
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Event Management',
  'event-management',
  'Trained personnel to manage events efficiently, ensuring safety and success.',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  'Users',
  'Expos, Concerts & Summits',
  11,
  true,
  'High-Profile Event Security, VIP Bouncers & Rapid Venue Cleanup',
  'Ensure flawless crowd control, VIP protection, parking coordination, and rapid venue turnaround for corporate summits, expos, and high-footfall events.',
  '[{"label": "Crowd Capacity", "value": "25,000+ Guests", "desc": "Managed per event"}, {"label": "VIP Protection", "value": "Zero Incident", "desc": "Trained bouncers"}, {"label": "Venue Cleanup", "value": "< 3 Hours", "desc": "Overnight turnaround"}]'::jsonb,
  'Event Security & Coordination Challenges',
  'Crowd surges, gate crashes, VIP safety, multi-thousand vehicle parking, and rapid post-event cleanup.',
  '[
    {"title": "Crowd Surges & Gate Management", "desc": "High footfall expos and concerts risk bottlenecks and safety hazards at registration gates.", "impact": "Barricade management, metal detector archways, wristband verification, and trained crowd controllers.", "icon": "Users"},
    {"title": "Rapid Post-Event Venue Handover", "desc": "Exhibition centers impose heavy penalties for late venue handovers with lingering debris.", "impact": "50+ member synchronized cleanup crews with waste compactors and mechanized sweepers.", "icon": "Clock"}
  ]'::jsonb,
  'How Trustmarks Delivers Flawless Event Operations',
  'Full turnkey event security, ushering, valet parking, and rapid venue restoration.',
  '[
    {"title": "Bouncers, VIP Protection & Stage Security", "desc": "Physically imposing, disciplined bouncers trained in celebrity escort, green-room security, and stage perimeter control.", "tag": "Security", "icon": "ShieldCheck", "features": ["VIP Bodyguards", "Stage Barricade Control", "Green Room Security"]},
    {"title": "Turnkey Event Cleaning & Waste Management", "desc": "Continuous litter patrol during the event, food court sanitization, and rapid post-event venue deep cleaning.", "tag": "Hygiene", "icon": "Sparkles", "features": ["Litter Patrol", "Food Court Sweeps", "Overnight Venue Reset"]},
    {"title": "Parking Attendants & Traffic Marshals", "desc": "Traffic controllers managing parking lots, valet lanes, and VIP car escorts to prevent road congestion.", "tag": "Traffic", "icon": "Truck", "features": ["Valet Parking Lanes", "Traffic Direction", "VIP Drop-off Marshals"]}
  ]'::jsonb,
  'The Trustmarks Event Advantage',
  'Trusted by premier event organizers, trade expos, and convention centers across Gujarat.',
  '[
    {"stat": "100%", "title": "Discipline & Crowd Control", "desc": "Trained in de-escalation, fire safety, and polite attendee communication.", "icon": "UserCheck"}
  ]'::jsonb,
  'Event Execution Metrics',
  'Proven turnkey event security across trade summits.',
  '[
    {"metric": "50,000+", "label": "Attendees Managed Across Trade Summits"},
    {"metric": "Zero", "label": "Crowd Incidents or Gate Breaches"},
    {"metric": "100%", "label": "On-Time Venue Security Handovers"}
  ]'::jsonb,
  'What Expo Organizers Say',
  '[
    {"quote": "Trustmarks handled security, bouncers, and housekeeping for our 3-day industrial expo with 18,000 visitors. The execution was flawless from start to finish.", "author": "Rakesh Brahmbhatt", "designation": "Director - Expo Operations", "company": "Gujarat Trade Fair Network", "rating": 5}
  ]'::jsonb,
  'Event Security FAQs',
  '[
    {"q": "How early does your security team arrive before an event?", "a": "Our supervisors conduct site walkthroughs 24 hours prior and deploy guards 3 hours before gates open for perimeter sweeps."}
  ]'::jsonb,
  'Request an Event Security & Crew Proposal',
  'Get in touch for customized event bouncer quotes, crowd control, and cleanup crew packages.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());

-- 12. Telecom
insert into public.industries (
  title, slug, description, image_url, icon_name, tag, order_index, is_active,
  hero_headline, hero_subtitle, hero_stats,
  challenges_title, challenges_subtitle, challenges,
  how_we_help_title, how_we_help_subtitle, solutions,
  benefits_title, benefits_subtitle, benefits,
  case_study_title, case_study_subtitle, case_study_metrics,
  testimonials_title, testimonials,
  faqs_title, faqs,
  contact_title, contact_subtitle
) values (
  'Telecom',
  'telecom',
  'Field and support staff to ensure uninterrupted connectivity and network operations.',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  'Radio',
  'Towers & Infrastructure',
  12,
  true,
  'Telecom Tower Security & Field Infrastructure Workforce',
  'Protect remote telecom towers, secure battery banks and diesel generators, and supply trained field technicians across Gujarat''s network corridors.',
  '[{"label": "Battery Theft Prevention", "value": "100%", "desc": "Remote site vigilance"}, {"label": "Network Uptime Support", "value": "99.9%", "desc": "DG fuel & battery monitoring"}, {"label": "Field Technician SLA", "value": "< 2 Hrs", "desc": "Rapid breakdown dispatch"}]'::jsonb,
  'Telecom Infrastructure Security Challenges',
  'Remote isolated tower sites, frequent battery bank theft, diesel pilferage, and harsh weather maintenance.',
  '[
    {"title": "Diesel & Battery Bank Pilferage", "desc": "Unmanned telecom towers in rural and semi-urban areas are prime targets for fuel and copper cable theft.", "impact": "24/7 static tower caretakers, tamper sensor monitoring, and regular surprise inspection patrols.", "icon": "ShieldCheck"}
  ]'::jsonb,
  'How Trustmarks Secures Telecom Infrastructure',
  'Remote site caretakers, diesel fueling assistants, and fiber maintenance support staff.',
  '[
    {"title": "Tower Caretakers & Perimeter Security", "desc": "Dedicated static security guards guarding DG sets, battery racks, solar panels, and transmission cabinets.", "tag": "Security", "icon": "ShieldCheck", "features": ["Static Caretakers", "Battery Rack Locks", "DG Fuel Logs"]},
    {"title": "Field Utility & DG Maintenance Assistants", "desc": "Trained staff for monitoring fuel levels, battery gravity, generator run hours, and reporting alarm triggers.", "tag": "Technical", "icon": "Cog", "features": ["Fuel Level Checks", "Battery Gravity Logs", "Alarm Telemetry"]},
    {"title": "Telecom Office & Switch Room Housekeeping", "desc": "Specialized anti-dust cleaning for telecom switching centers, server rooms, and customer care galleries.", "tag": "Cleaning", "icon": "Sparkles", "features": ["Switch Room Dusting", "Static Shield Care", "Customer Care Center"]}
  ]'::jsonb,
  'The Trustmarks Telecom Advantage',
  'Serving leading telecom operators and tower infrastructure companies across Western India.',
  '[
    {"stat": "99.9%", "title": "Site Guarding Uptime", "desc": "Reliable static caretakers preventing costly power and network outages.", "icon": "Clock"}
  ]'::jsonb,
  'Telecom Security Highlights',
  'Proven uptime across remote telecom clusters.',
  '[
    {"metric": "250+", "label": "Remote Tower Sites Secured"},
    {"metric": "95%", "label": "Reduction in Fuel Pilferage"},
    {"metric": "Zero", "label": "Equipment Thefts at Guarded Sites"}
  ]'::jsonb,
  'What Cluster Heads Say',
  '[
    {"quote": "Trustmarks provides reliable caretakers for over 80 remote tower sites in North Gujarat. Their vigilance has virtually eliminated battery theft.", "author": "Virendra Chauhan", "designation": "Cluster Operations Head", "company": "InfraTower Telecom Ltd.", "rating": 5}
  ]'::jsonb,
  'Telecom Security FAQs',
  '[
    {"q": "Do you cover remote rural tower locations in Gujarat?", "a": "Yes, we have deep recruitment reach across rural and semi-urban clusters across all 33 districts of Gujarat."}
  ]'::jsonb,
  'Request a Telecom Infrastructure Proposal',
  'Contact our infrastructure team for remote tower security and field crew quotes.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  image_url = excluded.image_url,
  icon_name = excluded.icon_name,
  tag = excluded.tag,
  order_index = excluded.order_index,
  is_active = excluded.is_active,
  hero_headline = excluded.hero_headline,
  hero_subtitle = excluded.hero_subtitle,
  hero_stats = excluded.hero_stats,
  challenges_title = excluded.challenges_title,
  challenges_subtitle = excluded.challenges_subtitle,
  challenges = excluded.challenges,
  how_we_help_title = excluded.how_we_help_title,
  how_we_help_subtitle = excluded.how_we_help_subtitle,
  solutions = excluded.solutions,
  benefits_title = excluded.benefits_title,
  benefits_subtitle = excluded.benefits_subtitle,
  benefits = excluded.benefits,
  case_study_title = excluded.case_study_title,
  case_study_subtitle = excluded.case_study_subtitle,
  case_study_metrics = excluded.case_study_metrics,
  testimonials_title = excluded.testimonials_title,
  testimonials = excluded.testimonials,
  faqs_title = excluded.faqs_title,
  faqs = excluded.faqs,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  updated_at = timezone('utc'::text, now());
