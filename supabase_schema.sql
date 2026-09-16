-- =========================================================================
-- TRUSTMARKS MANAGEMENT SERVICES - COMPLETE CMS & SERVICES DATABASE SCHEMA
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. SERVICES TABLE (100% Granular Dynamic CMS)
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  card_description text not null,
  page_description text not null,
  image_url text default '/service.png',
  icon_name text default 'ShieldCheck',
  tag text default 'Core Service',
  features jsonb default '[]'::jsonb,
  order_index integer default 0,

  -- 1. Hero Content
  hero_headline text,
  hero_subtitle text,

  -- 2. How It Works Section
  how_it_works_title text default 'How Our Services Work',
  how_it_works_paragraphs jsonb default '[]'::jsonb,
  work_process_steps jsonb default '[]'::jsonb,

  -- 3. What We Secure / Sectors
  what_we_secure_title text default 'What We Secure',
  what_we_secure_items jsonb default '[]'::jsonb,
  banner_heading text default 'Need a Reliable Solution?',
  banner_subheading text default 'Let''s protect what matters most to you.',
  banner_button_text text default 'CONTACT US',

  -- 4. Why Trustmarks (9 Differentiators)
  differentiators_title text default '9 Differentiators That Set Us Apart',
  differentiators_subtitle text default 'Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.',
  differentiators jsonb default '[]'::jsonb,
  differentiators_banner_heading text default 'Ready to experience the Trustmarks difference?',
  differentiators_banner_subheading text default 'Let''s build a safer, smarter, and stronger tomorrow—together.',
  differentiators_banner_button_text text default 'GET IN TOUCH',

  -- 5. Industries Served
  industries_title text default 'Sectors Relying on Our Services',
  industries_subtitle text default 'Tailored protocols aligned precisely with the regulatory, environmental, and footfall demands of diverse industries.',
  industries jsonb default '[]'::jsonb,

  -- 6. Testimonials
  testimonials_title text default 'What Facility & Plant Leaders Say',
  testimonials_subtitle text default 'Hear directly from operations heads, facility directors, and HR leaders who rely on Trustmarks.',
  testimonials jsonb default '[]'::jsonb,

  -- 7. FAQs
  faqs_title text default 'Frequently Asked Questions',
  faqs_subtitle text default 'Clear answers to common questions about our deployment timelines, compliance, and billing.',
  faqs jsonb default '[]'::jsonb,

  -- 8. Contact
  contact_title text default 'Request a Proposal Quote',
  contact_subtitle text default 'Let our operations specialists conduct a complimentary site audit and provide an itemized, compliant commercial quote.',

  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.services enable row level security;

-- Drop existing policies if any
drop policy if exists "Allow public read access to services" on public.services;
drop policy if exists "Allow authenticated full access to services" on public.services;
drop policy if exists "Allow anon read write during demo" on public.services;

-- Policies for public reading and demo admin writing
create policy "Allow public read access to services"
  on public.services for select
  using (true);

create policy "Allow anon and auth manage services"
  on public.services for all
  using (true)
  with check (true);

-- 2. SUPABASE STORAGE BUCKET (services)
insert into storage.buckets (id, name, public)
values ('services', 'services', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies for services bucket
drop policy if exists "Public Access to Service Images" on storage.objects;
drop policy if exists "Allow Service Image Uploads" on storage.objects;
drop policy if exists "Allow Service Image Updates" on storage.objects;
drop policy if exists "Allow Service Image Deletion" on storage.objects;

create policy "Public Access to Service Images"
  on storage.objects for select
  using (bucket_id = 'services');

create policy "Allow Service Image Uploads"
  on storage.objects for insert
  with check (bucket_id = 'services');

create policy "Allow Service Image Updates"
  on storage.objects for update
  using (bucket_id = 'services');

create policy "Allow Service Image Deletion"
  on storage.objects for delete
  using (bucket_id = 'services');

-- =========================================================================
-- 3. INDUSTRIES TABLE (100% Granular Dynamic CMS)
-- =========================================================================
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

-- Drop existing policies if any
drop policy if exists "Allow public read access to industries" on public.industries;
drop policy if exists "Allow anon and auth manage industries" on public.industries;

-- Policies for public reading and admin writing
create policy "Allow public read access to industries"
  on public.industries for select
  using (true);

create policy "Allow anon and auth manage industries"
  on public.industries for all
  using (true)
  with check (true);

-- SUPABASE STORAGE BUCKET (industries)
insert into storage.buckets (id, name, public)
values ('industries', 'industries', true)
on conflict (id) do update set public = true;

-- Storage RLS Policies for industries bucket
drop policy if exists "Public Access to Industry Images" on storage.objects;
drop policy if exists "Allow Industry Image Uploads" on storage.objects;
drop policy if exists "Allow Industry Image Updates" on storage.objects;
drop policy if exists "Allow Industry Image Deletion" on storage.objects;

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

