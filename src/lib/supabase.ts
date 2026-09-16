import { createClient } from "@supabase/supabase-js";
import type {
  Service,
  ServiceFormData,
  WorkProcessStep,
  SectorItem,
  DifferentiatorMetric,
  IndustryItem,
  TestimonialItem,
  FAQItem,
} from "@/types/service";
import type { Industry, IndustryFormData } from "@/types/industry";

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  "https://kqklxapzjrssvwbeghqy.supabase.co";
const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxa2x4YXB6anJzc3Z3YmVnaHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjIwMjYsImV4cCI6MjEwMzkzODAyNn0.bkula9TdWQWpkTPHcrdylgHCM4hKC8-dfOBLDCqAeRA";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseAnonKey !== "YOUR_ANON_KEY" &&
  supabaseAnonKey.length > 20;

export const supabase = createClient(
  supabaseUrl,
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-key"
);

// Standard 9 Differentiators
export const DEFAULT_9_DIFFERENTIATORS: DifferentiatorMetric[] = [
  {
    icon: "ShieldCheck",
    stat: "100%",
    title: "100% Statutory Compliance",
    desc: "Strict adherence to PF, ESIC, Minimum Wages Act, PSARA, and local labor regulations with zero enterprise liability.",
  },
  {
    icon: "UserCheck",
    stat: "3-Tier",
    title: "3-Tier Police & Background Vetting",
    desc: "Every candidate undergoes strict criminal background, address, and biometric verification before deployment.",
  },
  {
    icon: "Clock",
    stat: "< 2 Hrs",
    title: "2-Hour Rapid Replacement Guarantee",
    desc: "Instant standby workforce deployed within 120 minutes in case of unannounced absenteeism or emergency leaves.",
  },
  {
    icon: "Headphones",
    stat: "24/7/365",
    title: "24/7 Command & Control Center",
    desc: "Real-time dispatch and monitoring helpline active round the clock for immediate escalation resolution.",
  },
  {
    icon: "GraduationCap",
    stat: "40+ Hrs",
    title: "Rigorous Continuous Training",
    desc: "Mandatory bi-weekly refresher drills covering safety protocols, customer etiquette, and modern equipment handling.",
  },
  {
    icon: "ClipboardList",
    stat: "100% Digital",
    title: "Digital Audit & Checklist System",
    desc: "Mobile-enabled daily inspection logs, supervisor checklists, and automated monthly performance reporting.",
  },
  {
    icon: "FileText",
    stat: "Zero Hidden",
    title: "Transparent Digital Billing",
    desc: "Itemized monthly billing reconciled with biometric attendance records, ensuring total financial transparency.",
  },
  {
    icon: "ClipboardList",
    stat: "Bespoke",
    title: "Custom Site SOPs & Post Orders",
    desc: "Tailored standard operating procedures customized precisely for your facility's unique operational risk profile.",
  },
  {
    icon: "Award",
    stat: "15+ Years",
    title: "Proven Leadership Experience",
    desc: "Managed by industry veterans with extensive track records in private security, IFM, and human capital solutions.",
  },
];

// Standard 6 Sector Items
export const DEFAULT_SECTOR_ITEMS: SectorItem[] = [
  { icon: "Building2", title: "Commercial", subtitle: "Buildings" },
  { icon: "Factory", title: "Industrial", subtitle: "Facilities" },
  { icon: "ShoppingBag", title: "Retail & Shopping", subtitle: "Malls" },
  { icon: "PlusSquare", title: "Hospitals &", subtitle: "Healthcare" },
  { icon: "GraduationCap", title: "Educational", subtitle: "Institutions" },
  { icon: "PartyPopper", title: "Events & Special", subtitle: "Occasions" },
];

// Standard 6 Industries Deep-Dive
export const DEFAULT_INDUSTRIES_DEEP_DIVE: IndustryItem[] = [
  {
    name: "Corporate Headquarters & IT Parks",
    desc: "Delivering polished, high-profile security, pristine housekeeping, and tech-driven IFM for multinational offices and technology hubs.",
    icon: "Building2",
    tag: "Gujarat & Western India",
  },
  {
    name: "Manufacturing & Heavy Industries",
    desc: "Rigorous perimeter guarding, material gate audits, skilled labor supply, and safety protocol enforcement for industrial plants.",
    icon: "Factory",
    tag: "Gujarat & Western India",
  },
  {
    name: "Hospitals & Healthcare Facilities",
    desc: "24/7 infection-control sanitization, critical emergency access monitoring, and compassionate patient-facing support staff.",
    icon: "PlusSquare",
    tag: "Gujarat & Western India",
  },
  {
    name: "Logistics, Warehouses & Supply Chains",
    desc: "Inventory theft prevention, continuous dock monitoring, mechanized floor care, and loading workforce management.",
    icon: "TrendingUp",
    tag: "Gujarat & Western India",
  },
  {
    name: "Retail Malls, Multiplexes & Commercial Hubs",
    desc: "Crowd management, public safety, high-footfall restroom hygiene, and parking management for premier retail spaces.",
    icon: "ShoppingBag",
    tag: "Gujarat & Western India",
  },
  {
    name: "Educational Campuses & Universities",
    desc: "Student safety, hostel security, sprawling campus facility upkeep, and background-verified support staff.",
    icon: "GraduationCap",
    tag: "Gujarat & Western India",
  },
];

// Initial default seed services with 100% granular data
export const INITIAL_SERVICES: Omit<Service, "id">[] = [
  {
    title: "Security Services",
    slug: "security-services",
    card_description:
      "Professional security solutions to protect your people, assets and premises with 24/7 vigilance and advanced protocols.",
    page_description:
      "At Trustmarks, we deliver smart, reliable and customised security solutions that safeguard your people, assets and premises. Our trained professionals, advanced technology and proven processes ensure round-the-clock protection and peace of mind.",
    image_url: "/img1.png",
    icon_name: "ShieldCheck",
    tag: "SECURITY SERVICES",
    features: [
      "24/7 Manned Guarding & Patrolling",
      "Access Control & Visitor Screening",
      "Emergency & Crisis Response Management",
      "Industrial & Asset Protection Protocols",
      "100% PSARA & Statutory Compliant",
    ],
    hero_headline: "Comprehensive Security Solutions You Can Trust",
    hero_subtitle:
      "At Trustmarks, we deliver smart, reliable and customised security solutions that safeguard your people, assets and premises. Our trained professionals, advanced technology and proven processes ensure round-the-clock protection and peace of mind.",
    how_it_works_title: "How Our Security Services Work",
    how_it_works_paragraphs: [
      "Our security services are built on a simple yet effective process — assess, plan, deploy and monitor. We begin by understanding your unique security requirements through a detailed assessment of your premises, operations and risk factors. Based on this, we design a customised security plan that defines the right mix of manpower, technology and procedures to ensure maximum protection.",
      "Once the plan is in place, we deploy highly trained and verified security professionals who are equipped with the skills and tools to handle diverse situations with confidence and professionalism. Our teams follow strict Standard Operating Procedures (SOPs) and maintain a strong presence to prevent risks, manage access and respond swiftly to any incidents.",
      "We leverage advanced technology such as CCTV surveillance, access control systems and real-time reporting dashboards to ensure round-the-clock monitoring and transparency. Regular audits, surprise checks and performance reviews help us maintain the highest standards and ensure continuous improvement.",
      "With Trustmarks, you get more than just security — you get a trusted partner committed to your safety, continuity and peace of mind.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Risk Assessment",
        desc: "We assess your environment, identify vulnerabilities and understand your specific security needs.",
      },
      {
        icon: "Shield",
        title: "Customised Security Plan",
        desc: "We design a tailor-made security strategy that aligns with your operations and risk profile.",
      },
      {
        icon: "UserCheck",
        title: "Deployment of Trained Professionals",
        desc: "Our verified and trained security personnel are deployed with the right tools and clear SOPs.",
      },
      {
        icon: "BarChart2",
        title: "Monitoring & Continuous Improvement",
        desc: "We use technology and regular audits to ensure performance, compliance and continuous enhancement.",
      },
    ],
    what_we_secure_title: "What We Secure",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Need a Reliable Security Solution?",
    banner_subheading: "Let's protect what matters most to you.",
    banner_button_text: "CONTACT US",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our Security Services",
    industries_subtitle:
      "Tailored protocols aligned precisely with the regulatory, environmental, and footfall demands of diverse industries.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote:
          "Trustmarks has completely transformed our facility security. Their guard team is extraordinarily punctual, disciplined, and proactive. In over 2 years, we have had zero compliance issues.",
        author: "Prashant Trivedi",
        designation: "Head of Administration & Infrastructure",
        company: "Apex Tech City, Gandhinagar",
        rating: 5,
      },
      {
        quote:
          "The level of professionalism and the 2-hour rapid replacement guarantee give us total peace of mind. Whenever we had an emergency or surge in operations, Trustmarks responded within minutes.",
        author: "Deepak Patel",
        designation: "VP - Plant Operations",
        company: "Sterling Industrial Group, Sanand",
        rating: 5,
      },
      {
        quote:
          "Their supervisor inspection audits and transparent monthly billing make vendor management completely hassle-free. Trustmarks is truly our most reliable operational partner.",
        author: "Meera Shah",
        designation: "Director of Human Resources",
        company: "Crestview Healthcare, Ahmedabad",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding Security Services?",
    faqs_subtitle: "Common answers regarding deployment timelines, PSARA certification, and supervision.",
    faqs: [
      {
        q: "How quickly can security guards be mobilized at our site?",
        a: "We can deploy verified security personnel within 24 to 48 hours of contract signing, following an on-site security assessment and post-order formulation.",
      },
      {
        q: "Are all guards police verified and statutory compliant?",
        a: "Yes, 100% of our personnel undergo 3-tier background verification including local police records. We maintain strict compliance with PF, ESIC, and minimum wage regulations.",
      },
      {
        q: "How do you handle absenteeism or emergency guard replacements?",
        a: "We operate a 24/7 reserve workforce pool with a strict 2-hour rapid replacement guarantee for any unplanned absence.",
      },
    ],
    contact_title: "Request a Comprehensive Security Proposal",
    contact_subtitle: "Complimentary site vulnerability survey and custom manpower estimate.",
    order_index: 1,
  },
  {
    title: "WorkForce Solutions",
    slug: "workforce-solutions",
    card_description:
      "Strategic manpower supply and staffing solutions delivering verified, skilled personnel with 100% statutory adherence.",
    page_description:
      "Trustmarks provides end-to-end workforce solutions tailored to industries, warehouses, commercial setups, and hospitality. We manage sourcing, vetting, payroll compliance, and site-level supervision so you can focus on core growth.",
    image_url: "/img2.png",
    icon_name: "Users",
    tag: "WORKFORCE SOLUTIONS",
    features: [
      "Skilled & Semi-Skilled Industrial Labor",
      "Warehouse & Supply Chain Handlers",
      "Zero Labor Liability & 100% Compliance",
      "Biometric Attendance & Digital Invoicing",
      "Scalable Surge Deployment",
    ],
    hero_headline: "Agile, Verified Workforce Solutions for Scalable Growth",
    hero_subtitle:
      "End-to-end staffing, contract labor management, and technical talent supply engineered for industrial productivity and zero compliance risk.",
    how_it_works_title: "How Our Workforce Staffing Model Operates",
    how_it_works_paragraphs: [
      "We begin with detailed workload modeling to forecast your staffing requirements accurately across peak and regular cycles.",
      "Our talent acquisition team taps verified regional talent pipelines, conducting multi-stage skill assessments and mandatory background checks.",
      "Personnel are onboarded with digital biometric profiles, statutory insurance enrollments, and safety PPE gear before mobilization.",
      "Site supervisors conduct daily attendance audits and coordinate replacements, while our billing engine delivers 100% transparent reconciliation.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Requirement Scoping",
        desc: "Defining skill matrix, shift rosters, and statutory wage classifications.",
      },
      {
        icon: "UserCheck",
        title: "Screening & Verification",
        desc: "3-tier background check, skill tests, and biometric enrollment.",
      },
      {
        icon: "Shield",
        title: "Compliant Onboarding",
        desc: "PF, ESIC, and statutory documentation with zero employer liability.",
      },
      {
        icon: "BarChart2",
        title: "Supervised Deployment",
        desc: "Daily site coordination, biometric tracking, and monthly SLAs.",
      },
    ],
    what_we_secure_title: "Sectors We Empower",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Need Reliable Manpower On-Demand?",
    banner_subheading: "Scale your workforce seamlessly with verified talent.",
    banner_button_text: "REQUEST MANPOWER",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our Workforce Solutions",
    industries_subtitle: "Proven staffing solutions for manufacturing, retail, and tech corridors.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote: "Trustmarks provided 120 skilled assembly line workers for our Sanand plant within 4 days. Unmatched turnaround and zero attrition.",
        author: "Kavita Rao",
        designation: "General Manager - Operations",
        company: "Gujarat Precision Engineering",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding Workforce Solutions?",
    faqs_subtitle: "Details regarding contract models, wage compliance, and deployment speed.",
    faqs: [
      {
        q: "What types of workforce categories do you provide?",
        a: "We supply skilled, semi-skilled, and general labor across industrial manufacturing, warehousing, loading, assembly, and facility operations.",
      },
      {
        q: "Who assumes legal responsibility for statutory benefits?",
        a: "Trustmarks is the primary employer on record, assuming 100% statutory responsibility for PF, ESIC, bonus, gratuity, and labor insurance.",
      },
    ],
    contact_title: "Request a Custom Staffing Proposal",
    contact_subtitle: "Itemized wage structure and turnaround schedule for your site.",
    order_index: 2,
  },
  {
    title: "Housekeeping Services",
    slug: "housekeeping-services",
    card_description:
      "Mechanized cleaning, sanitization and hygiene management for pristine corporate, hospital, and industrial environments.",
    page_description:
      "Our housekeeping division leverages industrial-grade machinery, eco-friendly chemical solutions, and disciplined hygiene protocols to keep your premises spotlessly clean and infection-free.",
    image_url: "/img3.png",
    icon_name: "Sparkles",
    tag: "HOUSEKEEPING SERVICES",
    features: [
      "Mechanized Scrubbing & High-Pressure Washing",
      "Restroom & Touchpoint Sanitation Protocols",
      "Eco-Friendly Green Cleaning Chemicals",
      "Digital Inspection Checklists & Supervisor Audits",
      "Waste Segregation & Sustainable Disposal",
    ],
    hero_headline: "Precision Mechanized Housekeeping & Facility Hygiene",
    hero_subtitle:
      "Hospital-grade sanitization, automated floor care, and disciplined janitorial teams dedicated to spotless workplace aesthetics.",
    how_it_works_title: "How Our Hygiene & Housekeeping Model Works",
    how_it_works_paragraphs: [
      "We design a zone-based cleaning schedule tailored to the footfall dynamics of your facility (reception, manufacturing floors, cafeterias, restrooms).",
      "Our personnel are trained on ride-on scrubbers, single-disc machines, HEPA vacuums, and color-coded microfiber cross-contamination prevention.",
      "Supervisors use mobile checklist audits to verify cleanliness scores across every restroom and common area three times per shift.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Site Zoning & Plan",
        desc: "Mapping high-traffic zones, rest areas, and machine deployment schedules.",
      },
      {
        icon: "Sparkles",
        title: "Mechanized Cleaning",
        desc: "Executing daily deep cleaning with industrial scrubber-driers and safe chemicals.",
      },
      {
        icon: "UserCheck",
        title: "Color-Coded Sanitization",
        desc: "Zero cross-contamination protocols for restrooms and cafeteria areas.",
      },
      {
        icon: "BarChart2",
        title: "Digital Quality Audits",
        desc: "Real-time QR-code inspection logs verified by area supervisors.",
      },
    ],
    what_we_secure_title: "Environments We Sanitize",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Elevate Your Facility Hygiene Standards",
    banner_subheading: "Pristine, hygienic, and welcoming workspaces delivered daily.",
    banner_button_text: "SCHEDULE SITE AUDIT",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our Housekeeping",
    industries_subtitle: "Hospital-grade cleanliness for healthcare, IT parks, and pharma plants.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote: "Our corporate headquarters has never looked sharper. The mechanized cleaning and attentive janitorial staff reflect pure quality.",
        author: "Manish Shah",
        designation: "Facility Director",
        company: "Vanguard Corporate Hub, Ahmedabad",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding Housekeeping Services?",
    faqs_subtitle: "Information on equipment, chemicals, and shift timings.",
    faqs: [
      {
        q: "Do you supply all cleaning equipment and consumables?",
        a: "Yes, we provide all required industrial machinery (Taski/Roots scrubber-driers, vacuum units) and eco-friendly Diversey chemicals.",
      },
    ],
    contact_title: "Request a Housekeeping Site Survey",
    contact_subtitle: "Complimentary hygiene audit and itemized machine-to-manpower quotation.",
    order_index: 3,
  },
  {
    title: "Facility Management",
    slug: "facility-management",
    card_description:
      "Integrated facility operations combining MEP maintenance, soft services, safety audits, and utility uptime.",
    page_description:
      "Our Integrated Facility Management (IFM) model delivers seamless operations, combining technical building maintenance, HVAC, electrical, plumbing, landscaping, and statutory safety oversight under a single accountable contract.",
    image_url: "/img4.png",
    icon_name: "Cog",
    tag: "FACILITY MANAGEMENT",
    features: [
      "MEP (Mechanical, Electrical & Plumbing) Maintenance",
      "HVAC, DG Set & Transformer Operations",
      "Building Automation & Energy Conservation Audits",
      "Fire Fighting & Emergency Safety Drills",
      "Single-Point Accountable Vendor Management",
    ],
    hero_headline: "Integrated Facility Management for Total Operational Uptime",
    hero_subtitle:
      "Complete MEP lifecycle maintenance, predictive energy audits, and smart facility upkeep engineered for enterprise continuity.",
    how_it_works_title: "How Our Integrated IFM Model Operates",
    how_it_works_paragraphs: [
      "We conduct a full technical baseline audit of your transformers, HVAC chillers, STP/WTP plants, and emergency backup systems.",
      "Our certified engineers implement a strict Planned Preventive Maintenance (PPM) calendar to eliminate equipment breakdown risks.",
      "Round-the-clock shift technicians monitor electrical loads and temperature thresholds with rapid breakdown response.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Technical Baseline Audit",
        desc: "Comprehensive health check of MEP, HVAC, and fire fighting infrastructure.",
      },
      {
        icon: "Cog",
        title: "PPM Calendar Execution",
        desc: "Preventive maintenance schedules reducing asset downtime by over 90%.",
      },
      {
        icon: "Shield",
        title: "24/7 Operations & Monitoring",
        desc: "Certified technicians managing power, water, and climate systems on site.",
      },
      {
        icon: "BarChart2",
        title: "Energy & Uptime Reporting",
        desc: "Monthly energy savings analysis and SLA achievement reports.",
      },
    ],
    what_we_secure_title: "Facilities We Manage",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Optimize Your Facility Lifecycle & Cost",
    banner_subheading: "Ensure 100% equipment uptime with certified engineers.",
    banner_button_text: "BOOK IFM AUDIT",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our Facility Management",
    industries_subtitle: "Continuous uptime for data centers, pharma plants, and mega commercial parks.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote: "Trustmarks IFM team reduced our chiller power consumption by 14% while achieving 99.98% electrical uptime across our campus.",
        author: "Rajesh Varma",
        designation: "Chief Engineer",
        company: "Apex Tech City",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding Facility Management?",
    faqs_subtitle: "Details on SLA models, technician certifications, and spare parts handling.",
    faqs: [
      {
        q: "What technical certifications do your MEP technicians hold?",
        a: "All technicians are ITI/Diploma certified with verified electrical wireman licenses and HVAC handling certifications.",
      },
    ],
    contact_title: "Request an IFM Commercial Assessment",
    contact_subtitle: "Comprehensive facility technical audit and SLA proposal.",
    order_index: 4,
  },
  {
    title: "HR Consultancy",
    slug: "hr-consultancy",
    card_description:
      "Expert human resource consulting, executive search, statutory payroll audits, and regulatory labor compliance.",
    page_description:
      "We help organizations build high-performing workforce structures, navigate complex labor regulations, resolve payroll liabilities, and attract executive leadership across Gujarat and Western India.",
    image_url: "/img5.png",
    icon_name: "UserCheck",
    tag: "HR CONSULTANCY",
    features: [
      "100% Statutory Labor Law Compliance Audits",
      "Contract Labor Regulation & Abolition (CLRA) Advisory",
      "Executive Search & Talent Acquisition",
      "POSH Compliance & Internal Committee Frameworks",
      "Wage Structure Optimization & Payroll Structuring",
    ],
    hero_headline: "Strategic HR Advisory & Statutory Labor Compliance",
    hero_subtitle:
      "Mitigate enterprise liability, streamline regulatory filings, and attract elite leadership with seasoned HR consultants.",
    how_it_works_title: "How Our HR Advisory Engagements Work",
    how_it_works_paragraphs: [
      "We begin with a comprehensive compliance audit reviewing your registers, PF/ESIC returns, wage slips, and vendor contracts.",
      "A risk-graded compliance scorecard is produced identifying potential liabilities under state and central labor laws.",
      "Our consultants implement corrective SOPs, register updates, and represent your organization before statutory authorities.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Compliance Health Audit",
        desc: "Auditing contractor records, PF/ESIC returns, and statutory registers.",
      },
      {
        icon: "Shield",
        title: "Risk Remediation",
        desc: "Correcting wage classifications and closing statutory gaps with zero penalties.",
      },
      {
        icon: "UserCheck",
        title: "Talent & Leadership Search",
        desc: "Targeted executive recruitment for critical operational and leadership roles.",
      },
      {
        icon: "BarChart2",
        title: "Ongoing Regulatory Shield",
        desc: "Quarterly labor law updates, mock inspections, and vendor audits.",
      },
    ],
    what_we_secure_title: "Domains We Protect",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Protect Your Enterprise Against Labor Penalties",
    banner_subheading: "Schedule a confidential compliance audit with our legal HR team.",
    banner_button_text: "BOOK CONSULTATION",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our HR Advisory",
    industries_subtitle: "Custom human capital frameworks for manufacturing, tech, and retail.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote: "Trustmarks streamlined our compensation benchmarking and helped us close 15 executive roles effortlessly.",
        author: "Rohit Agarwal",
        designation: "Managing Director",
        company: "Zenith Logistics",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding HR Consultancy?",
    faqs_subtitle: "Everything you need to know about our recruitment and audit engagements.",
    faqs: [
      {
        q: "Do you handle third-party contractor labor compliance audits?",
        a: "Yes, we audit vendor master data, wage registers, challans, and statutory returns with complete risk grading.",
      },
    ],
    contact_title: "Request an HR Strategy Consultation",
    contact_subtitle: "Confidential talent assessment and customized HR proposal.",
    order_index: 5,
  },
  {
    title: "Training & Development",
    slug: "training-and-development",
    card_description:
      "Upskilling and professional development programs to empower your workforce with modern capabilities.",
    page_description:
      "We deliver hands-on, domain-specific training modules covering industrial safety, customer service etiquette, emergency fire response, and behavioral grooming. Our certified trainers conduct regular on-site workshops ensuring your workforce represents your brand with distinction.",
    image_url: "/hero-bg.jpg",
    icon_name: "GraduationCap",
    tag: "TRAINING & DEVELOPMENT",
    features: [
      "Industrial Safety & EHS Protocols",
      "Fire Safety & Emergency Evacuation Drills",
      "Hospitality & Front-Desk Soft Skills",
      "POSH & Workplace Ethics Workshops",
      "Certified Field Instructor Modules",
    ],
    hero_headline: "Comprehensive Training & Development Solutions You Can Trust",
    hero_subtitle:
      "Upskilling industrial, security, and facility teams with certified safety drills, behavioral grooming, and emergency readiness.",
    how_it_works_title: "How Our Training Programs Work",
    how_it_works_paragraphs: [
      "We conduct a training needs analysis to identify operational skill gaps and regulatory mandates.",
      "Custom curriculum is developed combining practical simulations, equipment drills, and soft skills.",
      "Certified instructors conduct interactive workshops on-site or at our Gandhinagar training center.",
      "Post-training assessments and certifications guarantee measurable behavioral enhancement.",
    ],
    work_process_steps: [
      {
        icon: "ClipboardList",
        title: "Training Needs Analysis",
        desc: "Mapping operational skill gaps and statutory safety requirements.",
      },
      {
        icon: "Shield",
        title: "Custom Curriculum Design",
        desc: "Tailored simulations, drill manuals, and multimedia modules.",
      },
      {
        icon: "UserCheck",
        title: "Certified Instructor Delivery",
        desc: "Hands-on drills covering fire response, POSH, and equipment handling.",
      },
      {
        icon: "BarChart2",
        title: "Assessment & Certification",
        desc: "Post-training evaluation and compliance certification issuance.",
      },
    ],
    what_we_secure_title: "Programs We Deliver",
    what_we_secure_items: DEFAULT_SECTOR_ITEMS,
    banner_heading: "Need Custom Workforce Training?",
    banner_subheading: "Equip your teams with life-saving drills and professional etiquette.",
    banner_button_text: "CONTACT US",
    differentiators_title: "9 Differentiators That Set Us Apart",
    differentiators_subtitle:
      "Engineered for organizations that prioritize statutory safety, continuous uptime, and disciplined workforce standards.",
    differentiators: DEFAULT_9_DIFFERENTIATORS,
    differentiators_banner_heading: "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading:
      "Let's build a safer, smarter, and stronger tomorrow—together.",
    differentiators_banner_button_text: "GET IN TOUCH",
    industries_title: "Sectors Relying on Our Training",
    industries_subtitle: "Certified workshops for manufacturing, corporate, and healthcare sectors.",
    industries: DEFAULT_INDUSTRIES_DEEP_DIVE,
    testimonials: [
      {
        quote: "Their fire evacuation drill and emergency first-aid workshop was the best our plant has ever experienced.",
        author: "Sanjay Parmar",
        designation: "EHS Manager",
        company: "Gujarat Auto Components",
        rating: 5,
      },
    ],
    faqs_title: "Got Questions Regarding Training Programs?",
    faqs_subtitle: "Details on batch sizes, duration, and certificates.",
    faqs: [
      {
        q: "Can training sessions be conducted directly on our factory site?",
        a: "Yes, our certified instructors bring all demonstration gear and conduct interactive drills directly at your facility.",
      },
    ],
    contact_title: "Request a Training Workshop Proposal",
    contact_subtitle: "Custom curriculum outline and commercial quotation for your team.",
    order_index: 6,
  },
];

// Helper to normalize Supabase JSON and null fields
export function normalizeService(item: any): Service {
  if (!item) return item;
  return {
    ...item,
    features: Array.isArray(item.features)
      ? item.features
      : typeof item.features === "string"
        ? JSON.parse(item.features)
        : [],
    how_it_works_paragraphs: Array.isArray(item.how_it_works_paragraphs)
      ? item.how_it_works_paragraphs
      : typeof item.how_it_works_paragraphs === "string"
        ? JSON.parse(item.how_it_works_paragraphs)
        : [],
    work_process_steps: Array.isArray(item.work_process_steps)
      ? item.work_process_steps
      : typeof item.work_process_steps === "string"
        ? JSON.parse(item.work_process_steps)
        : [],
    what_we_secure_items: Array.isArray(item.what_we_secure_items)
      ? item.what_we_secure_items
      : typeof item.what_we_secure_items === "string"
        ? JSON.parse(item.what_we_secure_items)
        : [],
    differentiators: Array.isArray(item.differentiators)
      ? item.differentiators
      : typeof item.differentiators === "string"
        ? JSON.parse(item.differentiators)
        : [],
    industries: Array.isArray(item.industries)
      ? item.industries
      : typeof item.industries === "string"
        ? JSON.parse(item.industries)
        : [],
    testimonials: Array.isArray(item.testimonials)
      ? item.testimonials
      : typeof item.testimonials === "string"
        ? JSON.parse(item.testimonials)
        : [],
    faqs: Array.isArray(item.faqs)
      ? item.faqs
      : typeof item.faqs === "string"
        ? JSON.parse(item.faqs)
        : [],
  };
}

// Upload image file to Supabase Storage bucket `services`
export async function uploadServiceImage(file: File): Promise<string> {
  if (isSupabaseConfigured) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `service-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("services")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("services")
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          return publicUrlData.publicUrl;
        }
      } else {
        console.warn("Supabase storage upload error:", uploadError.message);
      }
    } catch (e) {
      console.warn("Exception during Supabase storage upload:", e);
    }
  }

  // Fallback: Read file as Base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Fetch all services live from Supabase
export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Supabase getServices query error:", error);
      return [];
    }

    return (data || []).map(normalizeService);
  } catch (err) {
    console.error("Supabase getServices fetch exception:", err);
    return [];
  }
}

// Fetch single service by slug live from Supabase
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Supabase getServiceBySlug error:", error);
      return null;
    }

    return data ? normalizeService(data) : null;
  } catch (err) {
    console.error("Supabase getServiceBySlug exception:", err);
    return null;
  }
}

// Create new service directly in Supabase
export async function createService(
  formData: ServiceFormData,
  imageFile?: File | null
): Promise<Service> {
  let imageUrl = formData.image_url || "/img1.png";

  if (imageFile) {
    imageUrl = await uploadServiceImage(imageFile);
  }

  const generatedSlug = (
    formData.slug?.trim() ||
    formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );

  // Determine next order_index
  let nextOrder = 10;
  try {
    const { count } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true });
    if (typeof count === "number") {
      nextOrder = count + 1;
    }
  } catch (_) {}

  const payload = {
    title: formData.title,
    slug: generatedSlug,
    card_description: formData.card_description || "",
    page_description: formData.page_description || "",
    image_url: imageUrl,
    icon_name: formData.icon_name || "ShieldCheck",
    tag: formData.tag || "Core Service",
    features: formData.features || [],
    hero_headline: formData.hero_headline || formData.title,
    hero_subtitle: formData.hero_subtitle || formData.page_description || "",
    how_it_works_title: formData.how_it_works_title || `How Our ${formData.title} Work`,
    how_it_works_paragraphs: formData.how_it_works_paragraphs || [],
    work_process_steps: formData.work_process_steps || [],
    what_we_secure_title: formData.what_we_secure_title || "What We Secure",
    what_we_secure_items: formData.what_we_secure_items || [],
    banner_heading: formData.banner_heading || "Need a Reliable Solution?",
    banner_subheading: formData.banner_subheading || "Let's protect what matters most to you.",
    banner_button_text: formData.banner_button_text || "CONTACT US",
    differentiators_title: formData.differentiators_title || "9 Differentiators That Set Us Apart",
    differentiators_subtitle: formData.differentiators_subtitle || "",
    differentiators: formData.differentiators || [],
    differentiators_banner_heading: formData.differentiators_banner_heading || "Ready to experience the Trustmarks difference?",
    differentiators_banner_subheading: formData.differentiators_banner_subheading || "Let's build a safer tomorrow.",
    differentiators_banner_button_text: formData.differentiators_banner_button_text || "GET IN TOUCH",
    industries_title: formData.industries_title || "Sectors Relying on Our Services",
    industries_subtitle: formData.industries_subtitle || "",
    industries: formData.industries || [],
    testimonials_title: formData.testimonials_title || "What Leaders Say",
    testimonials_subtitle: formData.testimonials_subtitle || "",
    testimonials: formData.testimonials || [],
    faqs_title: formData.faqs_title || "Frequently Asked Questions",
    faqs_subtitle: formData.faqs_subtitle || "",
    faqs: formData.faqs || [],
    contact_title: formData.contact_title || "Request a Proposal Quote",
    contact_subtitle: formData.contact_subtitle || "",
    order_index: nextOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("services")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Supabase createService error:", error);
    throw new Error(error.message || "Failed to create service in Supabase");
  }

  return normalizeService(data);
}

// Update existing service directly in Supabase
export async function updateService(
  id: string,
  formData: Partial<ServiceFormData>,
  imageFile?: File | null
): Promise<Service> {
  let imageUrl = formData.image_url;

  if (imageFile) {
    imageUrl = await uploadServiceImage(imageFile);
  }

  const payload: Record<string, any> = {
    ...formData,
    updated_at: new Date().toISOString(),
  };

  if (imageUrl !== undefined) {
    payload.image_url = imageUrl;
  }

  if (payload.slug) {
    payload.slug = payload.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  const { data, error } = await supabase
    .from("services")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateService error:", error);
    throw new Error(error.message || "Failed to update service in Supabase");
  }

  return normalizeService(data);
}

// Delete service directly from Supabase
export async function deleteService(id: string): Promise<boolean> {
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) {
    console.error("Supabase deleteService error:", error);
    throw new Error(error.message || "Failed to delete service from Supabase");
  }
  return true;
}

// Seed / Restore default 6 services to Supabase Cloud
export async function seedDefaultServices(): Promise<Service[]> {
  const prepared = INITIAL_SERVICES.map((s, idx) => ({
    ...s,
    order_index: idx + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("services")
    .upsert(prepared, { onConflict: "slug" })
    .select();

  if (error) {
    console.error("Supabase seedDefaultServices error:", error);
    throw new Error(error.message || "Failed to seed default services into Supabase");
  }

  return (data || []).map(normalizeService);
}

// Admin Authentication Helpers
export async function signInAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const isDefaultAdmin =
    (email.trim().toLowerCase() === "admin@trustmarks.in" || email.trim().toLowerCase() === "admin@trustmarks.com") &&
    password.trim() === "admin123";

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      if (!error && data && data.user) {
        localStorage.setItem(
          "trustmarks_admin_auth",
          JSON.stringify({ email: data.user.email || email, role: "admin", timestamp: Date.now() })
        );
        return { success: true };
      }
    } catch (err) {
      console.warn("Supabase auth exception:", err);
    }
  }

  // Fallback admin credentials
  if (isDefaultAdmin) {
    localStorage.setItem(
      "trustmarks_admin_auth",
      JSON.stringify({ email: "admin@trustmarks.in", role: "admin", timestamp: Date.now() })
    );
    return { success: true };
  }

  return {
    success: false,
    error: "Invalid email or password. Use demo: admin@trustmarks.in / admin123",
  };
}

export async function signOutAdmin(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase signout exception:", e);
    }
  }
  localStorage.removeItem("trustmarks_admin_auth");
}

export async function getCurrentAdminUser(): Promise<{ email: string } | null> {
  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase.auth.getUser();
      if (data && data.user && data.user.email) {
        return { email: data.user.email };
      }
    } catch (e) {
      console.warn("Supabase getUser exception:", e);
    }
  }

  try {
    const local = localStorage.getItem("trustmarks_admin_auth");
    if (local) {
      const parsed = JSON.parse(local);
      return { email: parsed.email };
    }
  } catch (err) {
    console.warn("Failed reading local admin auth:", err);
  }

  return null;
}

// =========================================================================
// INDUSTRIES DATABASE & CRUD SYSTEM (12 Default Reference Sectors)
// =========================================================================

export const INITIAL_INDUSTRIES: Industry[] = [
  {
    id: "ind-1",
    title: "Corporate Offices",
    slug: "corporate-offices",
    description: "Reliable workforce solutions to ensure smooth operations and a professional work environment.",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    icon_name: "Building2",
    tag: "Corporate & IT Parks",
    order_index: 1,
    is_active: true,
    hero_headline: "Workforce & Integrated Facility Management for Modern Corporate Offices",
    hero_subtitle: "Elevate workplace productivity, executive security, and pristine environmental hygiene across premier commercial towers and corporate headquarters in Gujarat.",
    hero_stats: [
      { label: "Uptime SLA", value: "99.9%", desc: "Continuous facility uptime" },
      { label: "Statutory Compliance", value: "100%", desc: "Zero labor liability" },
      { label: "Client Retention", value: "98%", desc: "Long-term partnerships" },
    ],
    challenges_title: "Key Operational Challenges in Corporate Facilities",
    challenges_subtitle: "Modern office towers demand seamless daily coordination between front-of-house hospitality, stringent visitor security, and continuous clean desk environments.",
    challenges: [
      {
        title: "High Attrition & Inconsistent Staffing",
        desc: "Frequent housekeeping and pantry staff churn disrupts executive floor standards and day-to-day meetings.",
        impact: "Guaranteed 2-hour rapid standby replacement deployment across Ahmedabad and Gandhinagar.",
        icon: "Clock",
      },
      {
        title: "Security & Visitor Protocol Lapses",
        desc: "Lax lobby screening and unverified visitor entry expose enterprise intellectual property and confidential assets to risk.",
        impact: "PSARA-licensed corporate security officers trained in digital visitor management and access control.",
        icon: "ShieldCheck",
      },
      {
        title: "Multi-Vendor Coordination Headaches",
        desc: "Managing separate vendors for cleaning, security, MEP engineering, and payroll creates operational friction and billing leaks.",
        impact: "Single point of accountability with dedicated facility managers and transparent statutory dashboards.",
        icon: "Layers",
      },
    ],
    how_we_help_title: "Key Challenges We Solve in Corporate Offices",
    how_we_help_subtitle: "Addressing high turnover, statutory liabilities, and operational bottlenecks with verified protocols.",
    solutions: [
      {
        title: "Manned Security Services",
        desc: "Trained and verified security personnel to ensure a safe and secure workplace for employees, visitors and assets.",
        icon: "ShieldCheck",
        image_url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
        tag: "Security",
      },
      {
        title: "Front Office & Reception Management",
        desc: "Professional and courteous front desk staff to manage visitors, calls and administrative support with efficiency.",
        icon: "Users",
        image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        tag: "Front Desk",
      },
      {
        title: "Housekeeping Services",
        desc: "Clean, hygienic and well-maintained workspaces that create a healthier and more productive environment.",
        icon: "Sparkles",
        image_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
        tag: "Hygiene",
      },
      {
        title: "Facility Management",
        desc: "Preventive and reactive maintenance support for uninterrupted operations across electrical, HVAC, plumbing and more.",
        icon: "Cog",
        image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        tag: "Technical",
      },
      {
        title: "Pantry & Cafeteria Support",
        desc: "Well-trained staff for pantry, beverage and cafeteria services to ensure a seamless employee experience.",
        icon: "UtensilsCrossed",
        image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        tag: "Hospitality",
      },
      {
        title: "Administrative Support",
        desc: "Skilled support staff for day-to-day office operations, documentation and workflow management.",
        icon: "FileText",
        image_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
        tag: "Operations",
      },
      {
        title: "Flexible Workforce Solutions",
        desc: "Scalable staffing support to manage peak workloads, projects and short-term requirements.",
        icon: "Briefcase",
        image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        tag: "Staffing",
      },
      {
        title: "Statutory Compliance Management",
        desc: "End-to-end compliance with labor laws, PF, ESIC, minimum wages and other regulatory requirements to eliminate enterprise liability.",
        icon: "Scale",
        image_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        tag: "Compliance",
      },
    ],
    benefits_title: "Why Leading Enterprises Choose Trustmarks",
    benefits_subtitle: "Trusted by Fortune 500 corporations, IT giants, and industrial business houses across Western India.",
    benefits: [
      {
        stat: "100%",
        title: "Zero Enterprise Liability",
        desc: "Complete statutory compliance certificates delivered with every monthly invoice.",
        icon: "ShieldCheck",
      },
      {
        stat: "< 2 Hrs",
        title: "Standby Replacements",
        desc: "Immediate standby deployment in case of unannounced absenteeism or special townhalls.",
        icon: "Clock",
      },
      {
        stat: "3-Tier",
        title: "Police & Background Vetting",
        desc: "Thorough criminal record, permanent address, and biometric verification for every staff member.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Corporate Facility Transformation Metrics",
    case_study_subtitle: "Demonstrated operational improvements delivered across 1.2M+ sq. ft. of corporate towers in Gujarat.",
    case_study_metrics: [
      { metric: "35%", label: "Reduction in Facility Operating Friction" },
      { metric: "99.8%", label: "Monthly Staff Attendance & Punctuality" },
      { metric: "100%", label: "Statutory Audits Passed Without Deficiency" },
    ],
    testimonials: [
      {
        quote: "Trustmarks transformed our regional headquarters in Gandhinagar. Their corporate security and housekeeping team operate with military precision and impeccable grooming.",
        author: "Alok Sengupta",
        designation: "VP - Infrastructure & Workplace",
        company: "Fintech Innovation Park",
        rating: 5,
      },
    ],
    faqs_title: "Corporate Facility Management FAQs",
    faqs: [
      {
        q: "What is your transition timeline when replacing an existing vendor?",
        a: "We execute a structured 14-day handover with zero disruption to office operations, including site audits, biometric enrollment, and client SOP alignment.",
      },
      {
        q: "How do you ensure staff compliance and transparency?",
        a: "We provide monthly compliance packs including PF ECR receipts, ESIC challans, and wage register proofs before client billing.",
      },
    ],
    contact_title: "Request a Corporate Facility Proposal",
    contact_subtitle: "Schedule a complimentary site audit and receive a customized commercial proposal within 24 hours.",
  },
  {
    id: "ind-2",
    title: "Manufacturing",
    slug: "manufacturing",
    description: "Skilled and unskilled workforce to enhance productivity and maintain operational efficiency.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    icon_name: "Factory",
    tag: "Heavy & Light Industry",
    order_index: 2,
    is_active: true,
    hero_headline: "Heavy Industrial Guarding & Compliant Plant Workforce Solutions",
    hero_subtitle: "Safeguard high-value plant machinery, manage complex 3-shift production lines, and enforce strict factory gate access across Gujarat's industrial corridors.",
    hero_stats: [
      { label: "Plant Safety Record", value: "Zero Incident", desc: "Strict factory compliance" },
      { label: "Shift Coverage", value: "24/7/365", desc: "3-shift continuous uptime" },
      { label: "Statutory Audit Score", value: "100%", desc: "Zero labor liabilities" },
    ],
    challenges_title: "Core Operational Challenges in Manufacturing Facilities",
    challenges_subtitle: "Industrial manufacturing plants face high turnover, strict safety standards (Factories Act), and heavy material movement.",
    challenges: [
      {
        title: "Perimeter Breaches & Material Pilferage",
        desc: "Raw materials, copper cabling, and finished goods are vulnerable to theft during multi-shift logistics.",
        impact: "Armed industrial security guards, weighbridge monitoring, and material inward/outward gate verification.",
        icon: "ShieldCheck",
      },
      {
        title: "Assembly Line Absenteeism & Output Delays",
        desc: "Unplanned worker absenteeism stalls production batches and increases overtime costs.",
        impact: "Dedicated standby pool of trained machine operators, loaders, and helpers deployed on 2 hours notice.",
        icon: "Users",
      },
      {
        title: "Factories Act & Statutory Compliance Risks",
        desc: "Non-compliance with minimum wages, overtime caps, or safety protocols can lead to plant closure notices.",
        impact: "100% statutory adherence with monthly ECRs, safety PPE enforcement, and labor law advisory.",
        icon: "Scale",
      },
    ],
    how_we_help_title: "How Trustmarks Empowers Manufacturing Plants",
    how_we_help_subtitle: "Comprehensive industrial workforce and facility engineering engineered for heavy machinery and continuous production plants.",
    solutions: [
      {
        title: "Industrial Plant Security & Weighbridge Control",
        desc: "Rigorous gate passes, visitor vetting, perimeter patrolling, and truck search protocols to protect high-value assets.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Assembly Line & Technical Support Staff",
        desc: "Pre-screened, verified machine helpers, packaging workers, and material handlers trained in 5S and industrial safety.",
        tag: "Staffing",
        icon: "Users",
      },
      {
        title: "Industrial Shop Floor & Heavy Cleaning",
        desc: "Mechanized oil-spill degreasing, scrubber dryers for high-bay floors, overhead crane dusting, and hazardous waste handling.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
      {
        title: "Plant Electrical & Utility Technicians",
        desc: "Certified electricians, boiler assistants, and plumbing engineers ensuring continuous machinery uptime and cooling tower maintenance.",
        tag: "Technical",
        icon: "Cog",
      },
      {
        title: "Emergency Evacuation & Fire Safety Teams",
        desc: "Fire-safety trained security staff capable of managing rapid plant evacuations, fire hydrant drills, and hazmat protocol.",
        tag: "Safety",
        icon: "Zap",
      },
      {
        title: "Automated Statutory Compliance Management",
        desc: "Complete documentation under the Factories Act, Contract Labour (R&A) Act, PF, ESIC, and statutory audit readiness.",
        tag: "Compliance",
        icon: "FileCheck",
      },
    ],
    benefits_title: "Why Plant Heads & Operations Directors Rely on Us",
    benefits_subtitle: "Engineered for GIDC clusters in Sanand, Changodar, Vithalapur, Ankleshwar, and Hazira.",
    benefits: [
      {
        stat: "100%",
        title: "Factories Act Compliant",
        desc: "Complete safety compliance and verified statutory documentation for every deployed worker.",
        icon: "Scale",
      },
      {
        stat: "< 120 Min",
        title: "Rapid Shift Replacement",
        desc: "Standby manpower buffers for emergency shift shortages and peak production surges.",
        icon: "Clock",
      },
      {
        stat: "Zero",
        title: "Labour Dispute Liability",
        desc: "Strict compliance protects enterprise management from any direct labor disputes or unions.",
        icon: "ShieldCheck",
      },
    ],
    case_study_title: "Plant Operations Impact Highlights",
    case_study_subtitle: "Delivering disciplined productivity across automotive, chemical, and engineering plants.",
    case_study_metrics: [
      { metric: "40%", label: "Drop in Material Pilferage Incidents" },
      { metric: "99.4%", label: "Shift Fulfilment Rate Across 3 Shifts" },
      { metric: "100%", label: "Statutory & Safety Audit Compliance" },
    ],
    testimonials: [
      {
        quote: "Managing 3 round-the-clock shifts with 400+ workers was a nightmare until we partnered with Trustmarks. Their security gate control and housekeeping standards are outstanding.",
        author: "Devendra Patel",
        designation: "Plant Head - Automotive Tier-1",
        company: "Sanand Industrial Zone",
        rating: 5,
      },
    ],
    faqs_title: "Manufacturing Workforce FAQs",
    faqs: [
      {
        q: "Do you supply manpower across 3 rotating shifts?",
        a: "Yes, we provide full 24/7 3-shift coverage including night shifts with dedicated shift supervisors and replacement buffers.",
      },
      {
        q: "Are your industrial security guards trained in fire fighting?",
        a: "All industrial guards undergo mandatory fire-safety, emergency evacuation, and First-Aid training before deployment.",
      },
    ],
    contact_title: "Request a Manufacturing Plant Proposal",
    contact_subtitle: "Connect with our industrial operations directors for immediate manpower deployment and security audits.",
  },
  {
    id: "ind-3",
    title: "Warehousing & Logistics",
    slug: "warehousing-logistics",
    description: "Trained staff to manage your supply chain operations with safety and accuracy.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    icon_name: "Warehouse",
    tag: "Logistics & Fulfillment",
    order_index: 3,
    is_active: true,
    hero_headline: "High-Throughput Warehouse Security & Scalable Logistics Staffing",
    hero_subtitle: "Protect fulfillment centers, ensure rapid inbound/outbound material verification, and deploy scalable seasonal manpower across Gujarat's logistics hubs.",
    hero_stats: [
      { label: "Shrinkage Rate", value: "< 0.01%", desc: "Tight dock security" },
      { label: "Surge Scaling", value: "+300%", desc: "Rapid seasonal scaling" },
      { label: "Dispatch Accuracy", value: "99.9%", desc: "Trained material handlers" },
    ],
    challenges_title: "Critical Logistics & Warehousing Pain Points",
    challenges_subtitle: "E-commerce surges, dock bottlenecks, inventory leakage, and round-the-clock loading dock hazards.",
    challenges: [
      {
        title: "Inventory Shrinkage & Dock Collusion",
        desc: "Unmonitored loading docks and lax driver verification lead to unexplained inventory discrepancies.",
        impact: "24/7 CCTV-integrated dock guards, biometric trucker check-in, and seal verification protocols.",
        icon: "ShieldCheck",
      },
      {
        title: "Festive Season Spike Scaling (2x-3x Demand)",
        desc: "Festive e-commerce sales demand sudden hiring of hundreds of verified pickers, packers, and loaders.",
        impact: "Pre-screened talent pipeline capable of scaling from 50 to 300+ personnel in under 72 hours.",
        icon: "TrendingUp",
      },
    ],
    how_we_help_title: "How Trustmarks Protects & Powers Supply Chains",
    how_we_help_subtitle: "Tailored security and manpower operations engineered for modern logistics and automated fulfillment centers.",
    solutions: [
      {
        title: "Loading Bay & Dock Gate Security",
        desc: "Container seal checks, driver identity logging, CCTV gate coverage, and perimeter patrols to eliminate inventory leakage.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Trained Pickers, Packers & Sorters",
        desc: "Disciplined, barcode-literate workforce for rapid order picking, pallet wrapping, sorting, and dispatch.",
        tag: "Staffing",
        icon: "Users",
      },
      {
        title: "High-Bay Mechanized Floor Cleaning",
        desc: "Ride-on auto-scrubbers keeping vast concrete floors clean of tire marks, pallet splinters, and dust.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
    ],
    benefits_title: "Why Top 3PL & E-Commerce Brands Choose Us",
    benefits_subtitle: "Supporting supply chain fulfillment across Ahmedabad, Changodar, Kheda, and Surat corridors.",
    benefits: [
      {
        stat: "99.9%",
        title: "Dispatch On-Time Rate",
        desc: "Disciplined attendance ensures fulfillment centers never miss courier cut-off times.",
        icon: "Clock",
      },
      {
        stat: "100%",
        title: "Vetted Backgrounds",
        desc: "Complete biometric background verification preventing inventory shrinkage.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Logistics Facility Performance Metrics",
    case_study_metrics: [
      { metric: "92%", label: "Reduction in Warehouse Shrinkage" },
      { metric: "300+", label: "Workers Deployed in 48-Hour Surge" },
      { metric: "100%", label: "Statutory Minimum Wages Compliance" },
    ],
    testimonials: [
      {
        quote: "Trustmarks supplied 180 verified loaders and gate guards for our Diwali fulfillment surge with zero compliance hiccups. Truly dependable partners.",
        author: "Mehul Shah",
        designation: "General Manager - Supply Chain",
        company: "Western Logistics Hub",
        rating: 5,
      },
    ],
    faqs_title: "Warehouse Staffing FAQs",
    faqs: [
      {
        q: "How fast can you mobilize temporary seasonal workers for peak season?",
        a: "We maintain a pre-vetted candidate bench and can scale from 20 to 200+ trained staff within 48 to 72 hours.",
      },
    ],
    contact_title: "Request a Warehousing & Logistics Proposal",
    contact_subtitle: "Get in touch for customized dock security, seasonal staffing quotes, and facility audits.",
  },
  {
    id: "ind-4",
    title: "Retail & Shopping Malls",
    slug: "retail-shopping-malls",
    description: "Customer-focused workforce to elevate customer experience and ensure seamless operations.",
    image_url: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
    icon_name: "ShoppingBag",
    tag: "High Footfall Commercial",
    order_index: 4,
    is_active: true,
    hero_headline: "Premium Retail Security & High-Footfall Mall Facility Management",
    hero_subtitle: "Deliver world-class guest experiences, spotless high-traffic washroom hygiene, and discreet shoplifting deterrence for luxury malls and retail outlets.",
    hero_stats: [
      { label: "Footfall Handled", value: "50,000+ Daily", desc: "Seamless crowd control" },
      { label: "Hygiene Standard", value: "Hospital Grade", desc: "High-frequency cleaning" },
      { label: "Customer Satisfaction", value: "98.5%", desc: "Courteous personnel" },
    ],
    challenges_title: "High-Traffic Retail & Mall Challenges",
    challenges_subtitle: "Continuous footfall, weekend crowd surges, theft prevention, and pristine public restroom standards.",
    challenges: [
      {
        title: "Continuous Washroom & Floor Contamination",
        desc: "High footfall leads to rapidly soiled washrooms and slippery floors that damage mall reputation.",
        impact: "Continuous 15-minute cleaning cycles with dedicated attendants and slip-free drying protocols.",
        icon: "Sparkles",
      },
      {
        title: "Discreet Shoplifting & Loss Prevention",
        desc: "High value retail items require vigilant monitoring without creating a hostile shopping atmosphere.",
        impact: "Plainclothes loss prevention officers and smart uniformed entrance guards trained in customer hospitality.",
        icon: "ShieldCheck",
      },
    ],
    how_we_help_title: "How Trustmarks Elevates Retail Ecosystems",
    how_we_help_subtitle: "Customer-first security, pristine hygiene, and MEP engineering tailored for modern shopping destinations.",
    solutions: [
      {
        title: "Courteous Mall Security & Metal Detector Screening",
        desc: "Smartly attired security officers trained in baggage screening, crowd management, lost-child protocols, and parking control.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "High-Frequency Restroom & Atrium Cleaning",
        desc: "Continuous touchpoint sanitization, odor management, escalator glass buffing, and atrium floor shining.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
      {
        title: "Mall MEP & HVAC Operations",
        desc: "Continuous monitoring of centralized chillers, lighting ambience, elevators, and backup diesel generators.",
        tag: "Technical",
        icon: "Cog",
      },
    ],
    benefits_title: "The Trustmarks Retail Advantage",
    benefits_subtitle: "Trusted by prominent shopping malls and multi-brand showrooms across Gujarat.",
    benefits: [
      {
        stat: "15 Min",
        title: "Restroom Audit Cycle",
        desc: "Dedicated digital checklists ensure pristine public washroom cleanliness at all hours.",
        icon: "Clock",
      },
      {
        stat: "100%",
        title: "Customer-Centric Training",
        desc: "Staff trained in polite communication, emergency first-aid, and lost-and-found protocols.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Retail Destination Results",
    case_study_metrics: [
      { metric: "99.4%", label: "Positive Guest Hygiene Feedback" },
      { metric: "60%", label: "Reduction in Retail Shoplifting Loss" },
      { metric: "24/7", label: "Operational Helpdesk for Tenants" },
    ],
    testimonials: [
      {
        quote: "Trustmarks handles the security and housekeeping for our 4-story retail destination. Their staff are courteous, attentive, and maintain showroom-level shine.",
        author: "Karan Singhal",
        designation: "Operations Director",
        company: "Grand Avenue Mall",
        rating: 5,
      },
    ],
    faqs_title: "Retail Facility FAQs",
    faqs: [
      {
        q: "Can you provide extra bouncers and crowd controllers for weekend sales and celebrity visits?",
        a: "Yes, we provide emergency event security and crowd control teams on 4 hours advance notice.",
      },
    ],
    contact_title: "Request a Retail Facility Proposal",
    contact_subtitle: "Contact our retail specialists for comprehensive mall management and loss prevention quotes.",
  },
  {
    id: "ind-5",
    title: "Healthcare",
    slug: "healthcare",
    description: "Compassionate and trained professionals to support healthcare facilities and patients.",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    icon_name: "Hospital",
    tag: "NABH & Sterile Environments",
    order_index: 5,
    is_active: true,
    hero_headline: "NABH-Compliant Hospital Housekeeping & Sensitive Healthcare Security",
    hero_subtitle: "Maintain strict bio-medical waste segregation, sterile OT infection control, and patient-first compassionate security across multi-specialty hospitals.",
    hero_stats: [
      { label: "NABH Compliance", value: "100%", desc: "Zero protocol violations" },
      { label: "Infection Control", value: "Hospital Grade", desc: "Bio-medical protocols" },
      { label: "Emergency Readiness", value: "< 60 Sec", desc: "Code Red/Blue assistance" },
    ],
    challenges_title: "Unique Demands of Healthcare Facilities",
    challenges_subtitle: "Cross-contamination risks, sensitive patient disputes, 24/7 emergency room surges, and bio-hazard regulations.",
    challenges: [
      {
        title: "Hospital-Acquired Infection (HAI) Risks",
        desc: "Inadequate surface disinfection in ICUs and Operation Theatres can cause fatal cross-infections.",
        impact: "Color-coded micro-fiber cleaning, high-grade hospital disinfectants, and trained infection control crews.",
        icon: "Sparkles",
      },
      {
        title: "Emergency Room Agitation & Sensitive Security",
        desc: "Grief and panic in ER rooms require calm, de-escalating security guards who protect medical staff with empathy.",
        impact: "Specialized healthcare security officers trained in patient empathy, mob control, and doctor safety.",
        icon: "ShieldCheck",
      },
    ],
    how_we_help_title: "How Trustmarks Empowers Healthcare Leaders",
    how_we_help_subtitle: "Clinical-grade sanitation, patient support staffing, and sensitive healthcare facility management.",
    solutions: [
      {
        title: "Sterile OT & ICU Deep Sanitization",
        desc: "NABH-aligned sterilization procedures, air-duct sanitization, terminal cleaning, and bio-hazard containment.",
        tag: "Clinical",
        icon: "Sparkles",
      },
      {
        title: "Hospital Security & Doctor Protection",
        desc: "Round-the-clock ER vigilance, ICU access management, patient attendant regulation, and Code Red fire response.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "General Duty Assistants (GDA) & Ward Boys",
        desc: "Trained, compassionate patient transfer staff, stretcher bearers, wheelchair assistants, and sample runners.",
        tag: "Staffing",
        icon: "Users",
      },
    ],
    benefits_title: "The Trustmarks Healthcare Standard",
    benefits_subtitle: "Trusted by renowned multi-specialty hospitals and medical diagnostic chains across Gujarat.",
    benefits: [
      {
        stat: "100%",
        title: "NABH Audit Readiness",
        desc: "Complete documentation of cleaning logs, chemical dilution charts, and staff vaccination records.",
        icon: "FileCheck",
      },
      {
        stat: "Zero",
        title: "Bio-Waste Segregation Errors",
        desc: "Rigorous daily adherence to state pollution control board bio-medical waste norms.",
        icon: "ShieldCheck",
      },
    ],
    case_study_title: "Healthcare Facility Impact",
    case_study_metrics: [
      { metric: "0%", label: "Audit Deficiencies on Infection Audits" },
      { metric: "100%", label: "Vaccinated & Health-Checked Staff" },
      { metric: "24/7", label: "ICU & Emergency Attendant Coverage" },
    ],
    testimonials: [
      {
        quote: "Trustmarks understands the clinical discipline required in our 250-bed multi-specialty hospital. Their ward staff and ICU housekeeping are exceptional.",
        author: "Dr. Aniruddh Joshi",
        designation: "Medical Director",
        company: "LifeCare Multispeciality Hospital",
        rating: 5,
      },
    ],
    faqs_title: "Healthcare Staffing FAQs",
    faqs: [
      {
        q: "Are your hospital cleaners trained in bio-medical waste segregation?",
        a: "Yes, every cleaner undergoes mandatory BMW color-code segregation and spill-kit management training prior to deployment.",
      },
    ],
    contact_title: "Request a Healthcare Facility Proposal",
    contact_subtitle: "Consult with our healthcare facility experts for NABH-compliant hospital staffing quotes.",
  },
  {
    id: "ind-6",
    title: "Education",
    slug: "education",
    description: "Dedicated staff to maintain a safe, clean and efficient environment for learning and growth.",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    icon_name: "GraduationCap",
    tag: "Schools & Universities",
    order_index: 6,
    is_active: true,
    hero_headline: "Child-Safe Campus Security & Clean Educational Environments",
    hero_subtitle: "Ensure student safety, child protection compliance (POCSO vetting), and hygienic classrooms across schools, colleges, and university campuses in Gujarat.",
    hero_stats: [
      { label: "POCSO Police Vetting", value: "100%", desc: "Strict background check" },
      { label: "Campus Coverage", value: "24/7", desc: "Hostel & perimeter safety" },
      { label: "Classroom Hygiene", value: "Daily Audit", desc: "Germ-free environments" },
    ],
    challenges_title: "Campus Safety & Facility Challenges",
    challenges_subtitle: "Student safety, stringent child protection mandates, large sprawling campus grounds, and visitor regulation.",
    challenges: [
      {
        title: "Campus Security & Child Protection Vetting",
        desc: "Educational institutes face immense regulatory pressure to ensure zero unauthorized campus access.",
        impact: "100% police-vetted guards, visitor badge gates, and bus boarding security supervision.",
        icon: "ShieldCheck",
      },
      {
        title: "High-Traffic Classroom & Canteen Hygiene",
        desc: "Sprawling educational buildings require continuous litter control and germ-free student restrooms.",
        impact: "Scheduled recess cleanups, continuous restroom sanitation, and non-toxic cleaning agents.",
        icon: "Sparkles",
      },
    ],
    how_we_help_title: "How Trustmarks Safeguards Educational Campuses",
    how_we_help_subtitle: "Child-safe security, reliable campus housekeeping, and hostel management solutions.",
    solutions: [
      {
        title: "Gate Security & Student Bus Monitoring",
        desc: "Trained security personnel checking student ID badges, visitor logs, and monitoring bus drop-off points.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Campus & Classroom Housekeeping",
        desc: "Deep sanitization of classrooms, computer labs, auditoriums, and sports complexes using safe non-toxic chemicals.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
      {
        title: "Hostel & Sprawling Campus Maintenance",
        desc: "24/7 security for girls' and boys' hostels, plumbing and electrical upkeep, and grounds keeping.",
        tag: "Campus",
        icon: "Building2",
      },
    ],
    benefits_title: "The Trustmarks Educational Standard",
    benefits_subtitle: "Trusted by top CBSE schools, engineering colleges, and universities in Ahmedabad and Gandhinagar.",
    benefits: [
      {
        stat: "100%",
        title: "Police & POCSO Verified",
        desc: "Every deployed guard and housekeeping worker has clear police verification certificates on file.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Campus Safety Highlights",
    case_study_metrics: [
      { metric: "100%", label: "Police Vetting Compliance Rate" },
      { metric: "15+", label: "Educational Campuses Managed" },
      { metric: "Zero", label: "Security Lapses Recorded" },
    ],
    testimonials: [
      {
        quote: "Trustmarks provides our 15-acre school campus with dependable, polite security and immaculate housekeeping. Parents and board members are very pleased.",
        author: "Pratima Dave",
        designation: "Principal",
        company: "St. Xavier's International Campus",
        rating: 5,
      },
    ],
    faqs_title: "Educational Campus FAQs",
    faqs: [
      {
        q: "Do you provide female security guards for girls' hostels and junior schools?",
        a: "Yes, we provide trained female security guards and female cleaning attendants for dedicated wings.",
      },
    ],
    contact_title: "Request an Educational Campus Proposal",
    contact_subtitle: "Contact our campus security specialists for customized school and college proposals.",
  },
  {
    id: "ind-7",
    title: "Hospitality",
    slug: "hospitality",
    description: "Professional workforce to deliver exceptional service and memorable guest experiences.",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    icon_name: "UtensilsCrossed",
    tag: "Hotels, Resorts & Clubs",
    order_index: 7,
    is_active: true,
    hero_headline: "5-Star Hotel Housekeeping & Discreet Hospitality Security",
    hero_subtitle: "Deliver flawless guest satisfaction, immaculate banquet turnaround, and discreet VIP protection across luxury hotels and heritage resorts.",
    hero_stats: [
      { label: "Guest Satisfaction", value: "99.2%", desc: "5-star cleanliness audit" },
      { label: "Banquet Turnaround", value: "< 45 Min", desc: "Rapid hall turnover" },
      { label: "Staff Grooming", value: "100%", desc: "Hospitality standard" },
    ],
    challenges_title: "Hospitality Management Challenges",
    challenges_subtitle: "Fast room turnaround, late-night banquet cleanup, guest privacy, and valet parking coordination.",
    challenges: [
      {
        title: "Peak Banquet & Event Turnaround",
        desc: "Weddings and conferences require immediate overnight hall resetting and dish-washing crews.",
        impact: "Flexible banquet stewarding and night cleaning teams ready on flexible billing models.",
        icon: "Clock",
      },
      {
        title: "Impeccable Room Cleaning & Hygiene",
        desc: "Guest online reviews directly depend on spotless linen, shining mirrors, and fresh aromas.",
        impact: "Hospitality-trained room attendants certified in 5-star standard room setups.",
        icon: "Sparkles",
      },
    ],
    how_we_help_title: "How Trustmarks Serves Luxury Hospitality",
    how_we_help_subtitle: "Trained stewarding, room attendants, front-of-house security, and facility upkeep.",
    solutions: [
      {
        title: "Guest Room Attendants & Public Area Cleaning",
        desc: "Groomed, soft-spoken room attendants trained in luxury bed-making, deep carpet cleaning, and brass polishing.",
        tag: "Housekeeping",
        icon: "Sparkles",
      },
      {
        title: "Kitchen Stewarding & Banquet Staff",
        desc: "Hygienic pot-washing, dishwashing machine operators, banquet hall setup assistants, and kitchen degreasing.",
        tag: "F&B",
        icon: "UtensilsCrossed",
      },
      {
        title: "Discreet Hotel & Valet Security",
        desc: "Elegant lobby security, valet parking assistants, and discreet VIP bodyguarding.",
        tag: "Security",
        icon: "ShieldCheck",
      },
    ],
    benefits_title: "The Trustmarks Hospitality Standard",
    benefits_subtitle: "Partnering with leading business hotels and luxury resorts across Gujarat.",
    benefits: [
      {
        stat: "100%",
        title: "Groomed & Uniformed",
        desc: "Strict grooming checks before every shift ensure impeccable brand alignment.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Hospitality Performance Highlights",
    case_study_metrics: [
      { metric: "99.2%", label: "Cleanliness Rating on Guest Surveys" },
      { metric: "100+", label: "Banquets & Weddings Managed Seamlessly" },
      { metric: "Zero", label: "Late-night Staff Shortages" },
    ],
    testimonials: [
      {
        quote: "Trustmarks provides our 5-star property with banquet stewarding and night housekeeping. Their team is disciplined and delivers luxury standards consistently.",
        author: "Samir Varma",
        designation: "General Manager",
        company: "Regency Grand Hotel & Resorts",
        rating: 5,
      },
    ],
    faqs_title: "Hospitality Staffing FAQs",
    faqs: [
      {
        q: "Do you supply staff for high-volume wedding seasons?",
        a: "Yes, we provide flexible scalable banquet stewarding and housekeeping staff on demand during peak wedding and conference dates.",
      },
    ],
    contact_title: "Request a Hospitality Facility Proposal",
    contact_subtitle: "Connect with our hospitality team for customized hotel staffing and housekeeping contracts.",
  },
  {
    id: "ind-8",
    title: "Construction",
    slug: "construction",
    description: "Skilled and semi-skilled manpower to ensure timely and safe project completion.",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
    icon_name: "HardHat",
    tag: "Real Estate & Infrastructure",
    order_index: 8,
    is_active: true,
    hero_headline: "Construction Site Guarding & Skilled Manpower Solutions",
    hero_subtitle: "Protect multi-crore building materials, secure site perimeters, enforce mandatory PPE safety, and supply reliable skilled construction labor across Gujarat.",
    hero_stats: [
      { label: "Material Loss", value: "Zero Theft", desc: "Rigorous gate registers" },
      { label: "PPE Compliance", value: "100%", desc: "Safety-first protocol" },
      { label: "Manpower Deployment", value: "< 24 Hrs", desc: "Fast site mobilization" },
    ],
    challenges_title: "Construction Project Security & Labor Challenges",
    challenges_subtitle: "Costly steel and cement theft, worker absenteeism, hazardous site environments, and labor compliance mandates.",
    challenges: [
      {
        title: "Night-Time Theft of Steel, Copper & Machinery",
        desc: "Unsecured construction perimeters are prime targets for organized material pilferage.",
        impact: "24/7 night-patrolling guards with high-beam searchlights and strict material dispatch registers.",
        icon: "ShieldCheck",
      },
      {
        title: "Workforce Shortages & Delayed Milestones",
        desc: "Unreliable local labor contractors delay concrete pours and structural deadlines.",
        impact: "Verified masons, bar-benders, helpers, and safety marshals mobilized on clear SLA contracts.",
        icon: "Users",
      },
    ],
    how_we_help_title: "How Trustmarks Secures & Builds Your Projects",
    how_we_help_subtitle: "Complete site security, labor contracting, and post-construction handover deep cleaning.",
    solutions: [
      {
        title: "Construction Site Security & Gate Pass Control",
        desc: "Strict entry/exit logs for cement trucks, steel trailers, sub-contractors, and biometric worker attendance.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Skilled & Semi-Skilled Construction Labor",
        desc: "Vetted helpers, scaffolders, concrete assistants, and equipment operators with mandatory safety PPE.",
        tag: "Workforce",
        icon: "HardHat",
      },
      {
        title: "Post-Construction Handover Deep Cleaning",
        desc: "Removal of cement splatter, paint residue, tile acid scrubbing, and glass sticker scraping for builder handovers.",
        tag: "Cleaning",
        icon: "Sparkles",
      },
    ],
    benefits_title: "The Trustmarks Construction Guarantee",
    benefits_subtitle: "Trusted by premier real estate developers and infrastructure EPC contractors in Western India.",
    benefits: [
      {
        stat: "100%",
        title: "BOCW & Labor Law Compliance",
        desc: "Full statutory compliance protecting developers from builder liability.",
        icon: "Scale",
      },
    ],
    case_study_title: "Construction Project Metrics",
    case_study_metrics: [
      { metric: "100%", label: "Material Dispatches Audited & Verified" },
      { metric: "400+", label: "Units Deep-Cleaned for Handover" },
      { metric: "Zero", label: "Site Security Compromises" },
    ],
    testimonials: [
      {
        quote: "Trustmarks guarded our 20-acre residential township project during full construction. Not a single steel rod went missing, and their handover cleaning was flawless.",
        author: "Hardik Patel",
        designation: "Project Director",
        company: "Shivalik Realty & Infra",
        rating: 5,
      },
    ],
    faqs_title: "Construction Security FAQs",
    faqs: [
      {
        q: "Do your guards inspect vehicles leaving the construction site?",
        a: "Yes, all outgoing trucks, concrete mixers, and worker bags undergo mandatory physical inspection against verified gate passes.",
      },
    ],
    contact_title: "Request a Construction Project Proposal",
    contact_subtitle: "Get in touch with our site security and labor contracting team for custom project quotes.",
  },
  {
    id: "ind-9",
    title: "Banking & Financial Services",
    slug: "banking-financial-services",
    description: "Trustworthy professionals to ensure security, compliance and smooth daily operations.",
    image_url: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80",
    icon_name: "Landmark",
    tag: "BFSI & Currency Chests",
    order_index: 9,
    is_active: true,
    hero_headline: "Armed Banking Security & High-Discipline BFSI Facility Services",
    hero_subtitle: "Safeguard currency chests, ensure compliant branch security, and maintain executive corporate office banking premises across Gujarat.",
    hero_stats: [
      { label: "Gunman License Verification", value: "100%", desc: "Verified arms licenses" },
      { label: "Branch Uptime", value: "24/7", desc: "ATM & currency chest security" },
      { label: "Audit Compliance", value: "100%", desc: "RBI security guidelines" },
    ],
    challenges_title: "BFSI Security & Compliance Mandates",
    challenges_subtitle: "Strict RBI security guidelines, ATM vulnerability, armed escort requirements, and customer trust.",
    challenges: [
      {
        title: "Cash-in-Transit & Branch Vulnerabilities",
        desc: "Bank branches and ATM kiosks require alert, licensed armed guards with spotless integrity records.",
        impact: "Ex-servicemen and licensed armed guards with biometric background vetting and regular firing practice checks.",
        icon: "ShieldCheck",
      },
    ],
    how_we_help_title: "How Trustmarks Protects Banking Institutions",
    how_we_help_subtitle: "Specialized armed security, ATM caretaker management, and executive branch housekeeping.",
    solutions: [
      {
        title: "Armed Guards & Ex-Servicemen Security",
        desc: "Licensed 12-bore / rifle armed guards trained in cash escort, branch entry regulation, and emergency alarm response.",
        tag: "Armed Security",
        icon: "ShieldCheck",
      },
      {
        title: "ATM Caretaker & Quick Reaction Teams (QRT)",
        desc: "Round-the-clock ATM kiosk monitoring, shutter security, and emergency rapid response patrols.",
        tag: "Surveillance",
        icon: "Zap",
      },
      {
        title: "Pristine Banking Hall Housekeeping",
        desc: "Spotless branch counters, glass cleaning, teller station sanitization, and clean-desk confidentiality.",
        tag: "Housekeeping",
        icon: "Sparkles",
      },
    ],
    benefits_title: "The Trustmarks BFSI Standard",
    benefits_subtitle: "Serving private banks, public sector branches, and NBFC networks across Western India.",
    benefits: [
      {
        stat: "100%",
        title: "RBI Guideline Compliant",
        desc: "Full compliance with RBI branch security protocols and arms licensing verification.",
        icon: "Scale",
      },
    ],
    case_study_title: "Banking Security Highlights",
    case_study_metrics: [
      { metric: "120+", label: "Bank Branches & ATMs Protected" },
      { metric: "100%", label: "Arms License Verification Rate" },
      { metric: "Zero", label: "Security Incident Rate in 7+ Years" },
    ],
    testimonials: [
      {
        quote: "Trustmarks provides armed guards and housekeeping across 24 of our regional branches. Their discipline, punctuality, and background compliance give us total peace of mind.",
        author: "Sunil Nair",
        designation: "Chief Security Officer (West)",
        company: "Apex National Bank",
        rating: 5,
      },
    ],
    faqs_title: "Banking Security FAQs",
    faqs: [
      {
        q: "Are your armed guards ex-servicemen?",
        a: "We deploy experienced ex-servicemen and verified armed guards with active, legally validated gun licenses.",
      },
    ],
    contact_title: "Request a Banking Security Proposal",
    contact_subtitle: "Contact our BFSI security division for branch and ATM network coverage proposals.",
  },
  {
    id: "ind-10",
    title: "IT & ITES",
    slug: "it-ites",
    description: "Support workforce to keep your technology-driven operations running seamlessly.",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    icon_name: "Monitor",
    tag: "Tech Parks & Data Centers",
    order_index: 10,
    is_active: true,
    hero_headline: "24/7 IT Park Facility Management & Data Center Physical Security",
    hero_subtitle: "Support continuous 24/7 development operations, secure server rooms, manage executive cafeterias, and maintain spotless ergonomic tech workspaces.",
    hero_stats: [
      { label: "Data Center Uptime", value: "100%", desc: "Strict server room access" },
      { label: "Night Shift Support", value: "24/7/365", desc: "US/UK shift coverage" },
      { label: "Green Cleaning", value: "100%", desc: "Eco-certified sanitization" },
    ],
    challenges_title: "IT & ITES Facility Dynamics",
    challenges_subtitle: "Round-the-clock US/UK shifts, confidential server room access, employee transport escorting, and ergonomic cleanliness.",
    challenges: [
      {
        title: "24/7 Shift Transitions & Women Safety",
        desc: "Night-shift IT operations require verified female transport escorts and secure campus access.",
        impact: "Specialized night security teams, female guards, and GPS-verified cab security marshals.",
        icon: "ShieldCheck",
      },
      {
        title: "Server Room & Data Center Access Control",
        desc: "Physical breaches in server rooms jeopardize ISO 27001 data security certifications.",
        impact: "Biometric dual-custody access logs, static server guards, and strict non-disclosure agreements.",
        icon: "Lock",
      },
    ],
    how_we_help_title: "How Trustmarks Powers Technology Workspaces",
    how_we_help_subtitle: "Modern, quiet, non-intrusive facility management engineered for high-growth tech campuses.",
    solutions: [
      {
        title: "Data Center & Tech Park Access Security",
        desc: "Multi-tier identity badge checks, asset tagging for laptops and servers, and night security monitoring.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Quiet & Ergonomic Tech Housekeeping",
        desc: "Non-disruptive clean-desk maintenance, acoustic panel vacuuming, server room anti-static dusting, and executive pantry care.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
      {
        title: "Server Room HVAC & Precision Cooling Technicians",
        desc: "Continuous monitoring of CRAC units, UPS battery health, temperature thresholds, and backup generators.",
        tag: "Technical",
        icon: "Cog",
      },
    ],
    benefits_title: "The Trustmarks Tech Advantage",
    benefits_subtitle: "Trusted by tier-1 software exporters, SaaS campuses, and fintech centers in GIFT City and Ahmedabad.",
    benefits: [
      {
        stat: "ISO 27001",
        title: "Data Security Aligned",
        desc: "Every deployed staff signs comprehensive NDAs and undergoes cyber-safe vetting.",
        icon: "FileCheck",
      },
    ],
    case_study_title: "Tech Campus Transformation",
    case_study_metrics: [
      { metric: "100%", label: "24/7 Shift Attendance Reliability" },
      { metric: "Zero", label: "Server Room Physical Security Breaches" },
      { metric: "99.6%", label: "Facility Quality Score on Tech Audits" },
    ],
    testimonials: [
      {
        quote: "Operating a 24/7 global tech center in GIFT City requires flawless facility uptime. Trustmarks manages our entire 60,000 sq. ft. campus seamlessly.",
        author: "Nitin Kulkarni",
        designation: "Head of Operations",
        company: "Global Cloud Technologies",
        rating: 5,
      },
    ],
    faqs_title: "IT Campus Facility FAQs",
    faqs: [
      {
        q: "Do you supply security marshals for late-night female employee cabs?",
        a: "Yes, we provide trained female and male security escorts certified in night transit safety protocols.",
      },
    ],
    contact_title: "Request an IT Park Facility Proposal",
    contact_subtitle: "Schedule a technical site assessment for your IT campus or data center facility.",
  },
  {
    id: "ind-11",
    title: "Event Management",
    slug: "event-management",
    description: "Trained personnel to manage events efficiently, ensuring safety and success.",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    icon_name: "Users",
    tag: "Expos, Concerts & Summits",
    order_index: 11,
    is_active: true,
    hero_headline: "High-Profile Event Security, VIP Bouncers & Rapid Venue Cleanup",
    hero_subtitle: "Ensure flawless crowd control, VIP protection, parking coordination, and rapid venue turnaround for corporate summits, expos, and high-footfall events.",
    hero_stats: [
      { label: "Crowd Capacity", value: "25,000+ Guests", desc: "Managed per event" },
      { label: "VIP Protection", value: "Zero Incident", desc: "Trained bouncers" },
      { label: "Venue Cleanup", value: "< 3 Hours", desc: "Overnight turnaround" },
    ],
    challenges_title: "Event Security & Coordination Challenges",
    challenges_subtitle: "Crowd surges, gate crashes, VIP safety, multi-thousand vehicle parking, and rapid post-event cleanup.",
    challenges: [
      {
        title: "Crowd Surges & Gate Management",
        desc: "High footfall expos and concerts risk bottlenecks and safety hazards at registration gates.",
        impact: "Barricade management, metal detector archways, wristband verification, and trained crowd controllers.",
        icon: "Users",
      },
      {
        title: "Rapid Post-Event Venue Handover",
        desc: "Exhibition centers impose heavy penalties for late venue handovers with lingering debris.",
        impact: "50+ member synchronized cleanup crews with waste compactors and mechanized sweepers.",
        icon: "Clock",
      },
    ],
    how_we_help_title: "How Trustmarks Delivers Flawless Event Operations",
    how_we_help_subtitle: "Full turnkey event security, ushering, valet parking, and rapid venue restoration.",
    solutions: [
      {
        title: "Bouncers, VIP Protection & Stage Security",
        desc: "Physically imposing, disciplined bouncers trained in celebrity escort, green-room security, and stage perimeter control.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Turnkey Event Cleaning & Waste Management",
        desc: "Continuous litter patrol during the event, food court sanitization, and rapid post-event venue deep cleaning.",
        tag: "Hygiene",
        icon: "Sparkles",
      },
      {
        title: "Parking Attendants & Traffic Marshals",
        desc: "Traffic controllers managing parking lots, valet lanes, and VIP car escorts to prevent road congestion.",
        tag: "Traffic",
        icon: "Truck",
      },
    ],
    benefits_title: "The Trustmarks Event Advantage",
    benefits_subtitle: "Trusted by premier event organizers, trade expos, and convention centers across Gujarat.",
    benefits: [
      {
        stat: "100%",
        title: "Discipline & Crowd Control",
        desc: "Trained in de-escalation, fire safety, and polite attendee communication.",
        icon: "UserCheck",
      },
    ],
    case_study_title: "Event Execution Metrics",
    case_study_metrics: [
      { metric: "50,000+", label: "Attendees Managed Across Trade Summits" },
      { metric: "Zero", label: "Crowd Incidents or Gate Breaches" },
      { metric: "100%", label: "On-Time Venue Security Handovers" },
    ],
    testimonials: [
      {
        quote: "Trustmarks handled security, bouncers, and housekeeping for our 3-day industrial expo with 18,000 visitors. The execution was flawless from start to finish.",
        author: "Rakesh Brahmbhatt",
        designation: "Director - Expo Operations",
        company: "Gujarat Trade Fair Network",
        rating: 5,
      },
    ],
    faqs_title: "Event Security FAQs",
    faqs: [
      {
        q: "How early does your security team arrive before an event?",
        a: "Our supervisors conduct site walkthroughs 24 hours prior and deploy guards 3 hours before gates open for perimeter sweeps.",
      },
    ],
    contact_title: "Request an Event Security & Crew Proposal",
    contact_subtitle: "Get in touch for customized event bouncer quotes, crowd control, and cleanup crew packages.",
  },
  {
    id: "ind-12",
    title: "Telecom",
    slug: "telecom",
    description: "Field and support staff to ensure uninterrupted connectivity and network operations.",
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    icon_name: "Radio",
    tag: "Towers & Infrastructure",
    order_index: 12,
    is_active: true,
    hero_headline: "Telecom Tower Security & Field Infrastructure Workforce",
    hero_subtitle: "Protect remote telecom towers, secure battery banks and diesel generators, and supply trained field technicians across Gujarat's network corridors.",
    hero_stats: [
      { label: "Battery Theft Prevention", value: "100%", desc: "Remote site vigilance" },
      { label: "Network Uptime Support", value: "99.9%", desc: "DG fuel & battery monitoring" },
      { label: "Field Technician SLA", value: "< 2 Hrs", desc: "Rapid breakdown dispatch" },
    ],
    challenges_title: "Telecom Infrastructure Security Challenges",
    challenges_subtitle: "Remote isolated tower sites, frequent battery bank theft, diesel pilferage, and harsh weather maintenance.",
    challenges: [
      {
        title: "Diesel & Battery Bank Pilferage",
        desc: "Unmanned telecom towers in rural and semi-urban areas are prime targets for fuel and copper cable theft.",
        impact: "24/7 static tower caretakers, tamper sensor monitoring, and regular surprise inspection patrols.",
        icon: "ShieldCheck",
      },
    ],
    how_we_help_title: "How Trustmarks Secures Telecom Infrastructure",
    how_we_help_subtitle: "Remote site caretakers, diesel fueling assistants, and fiber maintenance support staff.",
    solutions: [
      {
        title: "Tower Caretakers & Perimeter Security",
        desc: "Dedicated static security guards guarding DG sets, battery racks, solar panels, and transmission cabinets.",
        tag: "Security",
        icon: "ShieldCheck",
      },
      {
        title: "Field Utility & DG Maintenance Assistants",
        desc: "Trained staff for monitoring fuel levels, battery gravity, generator run hours, and reporting alarm triggers.",
        tag: "Technical",
        icon: "Cog",
      },
      {
        title: "Telecom Office & Switch Room Housekeeping",
        desc: "Specialized anti-dust cleaning for telecom switching centers, server rooms, and customer care galleries.",
        tag: "Cleaning",
        icon: "Sparkles",
      },
    ],
    benefits_title: "The Trustmarks Telecom Advantage",
    benefits_subtitle: "Serving leading telecom operators and tower infrastructure companies across Western India.",
    benefits: [
      {
        stat: "99.9%",
        title: "Site Guarding Uptime",
        desc: "Reliable static caretakers preventing costly power and network outages.",
        icon: "Clock",
      },
    ],
    case_study_title: "Telecom Security Highlights",
    case_study_metrics: [
      { metric: "250+", label: "Remote Tower Sites Secured" },
      { metric: "95%", label: "Reduction in Fuel Pilferage" },
      { metric: "Zero", label: "Equipment Thefts at Guarded Sites" },
    ],
    testimonials: [
      {
        quote: "Trustmarks provides reliable caretakers for over 80 remote tower sites in North Gujarat. Their vigilance has virtually eliminated battery theft.",
        author: "Virendra Chauhan",
        designation: "Cluster Operations Head",
        company: "InfraTower Telecom Ltd.",
        rating: 5,
      },
    ],
    faqs_title: "Telecom Security FAQs",
    faqs: [
      {
        q: "Do you cover remote rural tower locations in Gujarat?",
        a: "Yes, we have deep recruitment reach across rural and semi-urban clusters across all 33 districts of Gujarat.",
      },
    ],
    contact_title: "Request a Telecom Infrastructure Proposal",
    contact_subtitle: "Contact our infrastructure team for remote tower security and field crew quotes.",
  },
];

const LOCAL_INDUSTRIES_STORAGE_KEY = "trustmarks_local_industries_data";

function getLocalIndustries(): Industry[] {
  try {
    const raw = localStorage.getItem(LOCAL_INDUSTRIES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read local industries storage:", e);
  }
  localStorage.setItem(LOCAL_INDUSTRIES_STORAGE_KEY, JSON.stringify(INITIAL_INDUSTRIES));
  return INITIAL_INDUSTRIES;
}

function saveLocalIndustries(items: Industry[]) {
  try {
    localStorage.setItem(LOCAL_INDUSTRIES_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Could not save to local industries storage:", e);
  }
}

function normalizeIndustry(row: any): Industry {
  if (!row) return row;
  return {
    id: row.id || `ind-${Date.now()}`,
    title: row.title || "Industry",
    slug: row.slug || "industry",
    description: row.description || "",
    image_url: row.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    icon_name: row.icon_name || "Building2",
    tag: row.tag || "Enterprise Sector",
    order_index: typeof row.order_index === "number" ? row.order_index : 0,
    is_active: row.is_active !== undefined ? Boolean(row.is_active) : true,

    // 1. Hero
    hero_headline: row.hero_headline || `Workforce & Facility Solutions Tailored for ${row.title || "Your Sector"}`,
    hero_subtitle: row.hero_subtitle || row.description || "Delivering statutory compliance, trained manpower, and operational excellence.",
    hero_stats: Array.isArray(row.hero_stats)
      ? row.hero_stats
      : typeof row.hero_stats === "string"
        ? JSON.parse(row.hero_stats)
        : [],

    // 2. Challenges
    challenges_title: row.challenges_title || `Key Challenges We Solve in ${row.title || "This Sector"}`,
    challenges_subtitle: row.challenges_subtitle || "Addressing high turnover, statutory liabilities, and operational bottlenecks with verified protocols.",
    challenges: Array.isArray(row.challenges)
      ? row.challenges
      : typeof row.challenges === "string"
        ? JSON.parse(row.challenges)
        : [],

    // 3. How We Help - Solutions
    how_we_help_title: row.how_we_help_title || `How Trustmarks Empowers ${row.title || "Your Operations"}`,
    how_we_help_subtitle: row.how_we_help_subtitle || "Comprehensive security, specialized workforce, and facility services engineered for this sector.",
    solutions: Array.isArray(row.solutions)
      ? row.solutions
      : typeof row.solutions === "string"
        ? JSON.parse(row.solutions)
        : [],

    // 4. Benefits
    benefits_title: row.benefits_title || "Why Sector Leaders Choose Trustmarks",
    benefits_subtitle: row.benefits_subtitle || "Statutory safety, 2-hour replacement SLA, and disciplined operational standards.",
    benefits: Array.isArray(row.benefits)
      ? row.benefits
      : typeof row.benefits === "string"
        ? JSON.parse(row.benefits)
        : [],

    // 5. Case Study & Metrics
    case_study_title: row.case_study_title || "Demonstrated Sector Performance Metrics",
    case_study_subtitle: row.case_study_subtitle || "Proven operational improvements delivered across enterprises in Western India.",
    case_study_metrics: Array.isArray(row.case_study_metrics)
      ? row.case_study_metrics
      : typeof row.case_study_metrics === "string"
        ? JSON.parse(row.case_study_metrics)
        : [],

    // 6. Testimonials
    testimonials_title: row.testimonials_title || "What Industry Leaders Say",
    testimonials: Array.isArray(row.testimonials)
      ? row.testimonials
      : typeof row.testimonials === "string"
        ? JSON.parse(row.testimonials)
        : [],

    // 7. FAQs
    faqs_title: row.faqs_title || "Frequently Asked Questions",
    faqs: Array.isArray(row.faqs)
      ? row.faqs
      : typeof row.faqs === "string"
        ? JSON.parse(row.faqs)
        : [],

    // 8. Contact
    contact_title: row.contact_title || `Request a ${row.title || "Sector"} Proposal`,
    contact_subtitle: row.contact_subtitle || "Schedule a complimentary site audit and receive a customized commercial quote.",

    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

// Upload industry image to Supabase storage bucket
export async function uploadIndustryImage(file: File): Promise<string> {
  if (!isSupabaseConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `ind-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `industry-covers/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("industries")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) {
    // If industries bucket does not exist, try services bucket fallback
    const { error: fallbackError } = await supabase.storage
      .from("services")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (fallbackError) {
      console.warn("Image upload fallback to data URL due to:", uploadError.message);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const { data: fallbackData } = supabase.storage
      .from("services")
      .getPublicUrl(filePath);
    return fallbackData.publicUrl;
  }

  const { data } = supabase.storage.from("industries").getPublicUrl(filePath);
  return data.publicUrl;
}

// Fetch all industries
export async function getIndustries(): Promise<Industry[]> {
  if (!isSupabaseConfigured) {
    return getLocalIndustries();
  }

  try {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.warn("Supabase getIndustries error (falling back to local/default):", error.message);
      return getLocalIndustries();
    }

    if (!data || data.length === 0) {
      try {
        return await seedDefaultIndustries();
      } catch (seedErr) {
        console.warn("Auto-seed error:", seedErr);
        return getLocalIndustries();
      }
    }

    const normalized = data.map(normalizeIndustry);
    saveLocalIndustries(normalized);
    return normalized;
  } catch (err) {
    console.warn("getIndustries exception:", err);
    return getLocalIndustries();
  }
}

// Fetch single industry by Slug
export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const localList = getLocalIndustries();
  const localMatch = localList.find((i) => i.slug === slug);

  if (!isSupabaseConfigured) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.warn("getIndustryBySlug DB error, using local fallback:", error.message);
      return localMatch || null;
    }

    if (data) {
      return normalizeIndustry(data);
    }

    return localMatch || null;
  } catch (err) {
    console.warn("getIndustryBySlug exception:", err);
    return localMatch || null;
  }
}

// Fetch single industry by ID
export async function getIndustryById(id: string): Promise<Industry | null> {
  const localList = getLocalIndustries();
  const localMatch = localList.find((i) => i.id === id);

  if (!isSupabaseConfigured) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return localMatch || null;
    }

    if (data) {
      return normalizeIndustry(data);
    }

    return localMatch || null;
  } catch (err) {
    return localMatch || null;
  }
}

// Create new industry
export async function createIndustry(
  formData: IndustryFormData,
  imageFile?: File | null
): Promise<Industry> {
  let imageUrl = formData.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

  if (imageFile) {
    imageUrl = await uploadIndustryImage(imageFile);
  }

  const generatedSlug = (
    formData.slug?.trim() ||
    formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  );

  let nextOrder = 1;
  const currentList = getLocalIndustries();
  if (currentList.length > 0) {
    nextOrder = Math.max(...currentList.map((i) => i.order_index || 0)) + 1;
  }

  const newIndustry: Industry = {
    ...formData,
    id: `ind-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: formData.title,
    slug: generatedSlug,
    description: formData.description || "",
    image_url: imageUrl,
    icon_name: formData.icon_name || "Building2",
    tag: formData.tag || "Enterprise Sector",
    order_index: formData.order_index ?? nextOrder,
    is_active: formData.is_active !== undefined ? formData.is_active : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured) {
    const updated = [...currentList, newIndustry].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    saveLocalIndustries(updated);
    return newIndustry;
  }

  try {
    const { data, error } = await supabase
      .from("industries")
      .insert([{
        title: newIndustry.title,
        slug: newIndustry.slug,
        description: newIndustry.description,
        image_url: newIndustry.image_url,
        icon_name: newIndustry.icon_name,
        tag: newIndustry.tag,
        order_index: newIndustry.order_index,
        is_active: newIndustry.is_active,
        hero_headline: newIndustry.hero_headline,
        hero_subtitle: newIndustry.hero_subtitle,
        hero_stats: newIndustry.hero_stats || [],
        challenges_title: newIndustry.challenges_title,
        challenges_subtitle: newIndustry.challenges_subtitle,
        challenges: newIndustry.challenges || [],
        how_we_help_title: newIndustry.how_we_help_title,
        how_we_help_subtitle: newIndustry.how_we_help_subtitle,
        solutions: newIndustry.solutions || [],
        benefits_title: newIndustry.benefits_title,
        benefits_subtitle: newIndustry.benefits_subtitle,
        benefits: newIndustry.benefits || [],
        case_study_title: newIndustry.case_study_title,
        case_study_subtitle: newIndustry.case_study_subtitle,
        case_study_metrics: newIndustry.case_study_metrics || [],
        testimonials_title: newIndustry.testimonials_title,
        testimonials: newIndustry.testimonials || [],
        faqs_title: newIndustry.faqs_title,
        faqs: newIndustry.faqs || [],
        contact_title: newIndustry.contact_title,
        contact_subtitle: newIndustry.contact_subtitle,
      }])
      .select()
      .single();

    if (error) {
      console.warn("Supabase createIndustry insert error, updating local storage:", error.message);
      const updated = [...currentList, newIndustry].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      saveLocalIndustries(updated);
      return newIndustry;
    }

    const normalized = normalizeIndustry(data);
    const updated = [...currentList.filter((i) => i.id !== normalized.id), normalized].sort(
      (a, b) => (a.order_index || 0) - (b.order_index || 0)
    );
    saveLocalIndustries(updated);
    return normalized;
  } catch (err: any) {
    console.error("createIndustry error:", err);
    const updated = [...currentList, newIndustry];
    saveLocalIndustries(updated);
    return newIndustry;
  }
}

// Update existing industry
export async function updateIndustry(
  id: string,
  formData: Partial<IndustryFormData>,
  imageFile?: File | null
): Promise<Industry> {
  let imageUrl = formData.image_url;

  if (imageFile) {
    imageUrl = await uploadIndustryImage(imageFile);
  }

  const currentList = getLocalIndustries();
  const existing = currentList.find((i) => i.id === id);

  const updatedItem: Industry = {
    ...(existing || ({} as Industry)),
    ...formData,
    id,
    image_url: imageUrl !== undefined ? imageUrl : existing?.image_url || "",
    updated_at: new Date().toISOString(),
  };

  if (formData.slug) {
    updatedItem.slug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  if (!isSupabaseConfigured) {
    const updated = currentList.map((i) => (i.id === id ? updatedItem : i));
    saveLocalIndustries(updated);
    return updatedItem;
  }

  try {
    const payload: Record<string, any> = {
      ...formData,
      updated_at: new Date().toISOString(),
    };
    if (imageUrl !== undefined) {
      payload.image_url = imageUrl;
    }
    if (payload.slug) {
      payload.slug = payload.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    const { data, error } = await supabase
      .from("industries")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.warn("Supabase updateIndustry error, updating local storage:", error.message);
      const updated = currentList.map((i) => (i.id === id ? updatedItem : i));
      saveLocalIndustries(updated);
      return updatedItem;
    }

    const normalized = normalizeIndustry(data);
    const updated = currentList.map((i) => (i.id === id ? normalized : i));
    saveLocalIndustries(updated);
    return normalized;
  } catch (err: any) {
    console.error("updateIndustry error:", err);
    const updated = currentList.map((i) => (i.id === id ? updatedItem : i));
    saveLocalIndustries(updated);
    return updatedItem;
  }
}

// Delete industry
export async function deleteIndustry(id: string): Promise<boolean> {
  const currentList = getLocalIndustries();
  const filtered = currentList.filter((i) => i.id !== id);
  saveLocalIndustries(filtered);

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from("industries").delete().eq("id", id);
      if (error) {
        console.warn("Supabase deleteIndustry error:", error.message);
      }
    } catch (e) {
      console.warn("Supabase deleteIndustry exception:", e);
    }
  }

  return true;
}

// Seed / Restore default 12 industries with full rich content
export async function seedDefaultIndustries(): Promise<Industry[]> {
  saveLocalIndustries(INITIAL_INDUSTRIES);

  if (isSupabaseConfigured) {
    try {
      const prepared = INITIAL_INDUSTRIES.map((ind, idx) => ({
        title: ind.title,
        slug: ind.slug,
        description: ind.description,
        image_url: ind.image_url,
        icon_name: ind.icon_name,
        tag: ind.tag,
        order_index: idx + 1,
        is_active: true,
        hero_headline: ind.hero_headline,
        hero_subtitle: ind.hero_subtitle,
        hero_stats: ind.hero_stats || [],
        challenges_title: ind.challenges_title,
        challenges_subtitle: ind.challenges_subtitle,
        challenges: ind.challenges || [],
        how_we_help_title: ind.how_we_help_title,
        how_we_help_subtitle: ind.how_we_help_subtitle,
        solutions: ind.solutions || [],
        benefits_title: ind.benefits_title,
        benefits_subtitle: ind.benefits_subtitle,
        benefits: ind.benefits || [],
        case_study_title: ind.case_study_title,
        case_study_subtitle: ind.case_study_subtitle,
        case_study_metrics: ind.case_study_metrics || [],
        testimonials_title: ind.testimonials_title,
        testimonials: ind.testimonials || [],
        faqs_title: ind.faqs_title,
        faqs: ind.faqs || [],
        contact_title: ind.contact_title,
        contact_subtitle: ind.contact_subtitle,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from("industries")
        .upsert(prepared, { onConflict: "slug" })
        .select();

      if (error) {
        console.warn("Supabase seedDefaultIndustries error:", error.message);
      } else if (data && data.length > 0) {
        const normalized = data.map(normalizeIndustry);
        saveLocalIndustries(normalized);
        return normalized;
      }
    } catch (e) {
      console.warn("Supabase seedDefaultIndustries exception:", e);
    }
  }

  return INITIAL_INDUSTRIES;
}


