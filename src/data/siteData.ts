import brand_icon_1 from "../assets/brand_icon_1.png";
import brand_icon_2 from "../assets/brand_icon_2.png";
import brand_icon_3 from "../assets/brand_icon_3.png";
import brand_icon_4 from "../assets/brand_icon_4.png";
import home_hero_bg_1 from "../assets/home_hero_bg_1.jpg";
import home_hero_bg_2 from "../assets/home_hero_bg_2.jpg";
import home_hero_bg_3 from "../assets/home_hero_bg_3.jpg";
import user from "../assets/user.png";
import { BsBarChartFill } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  // {
  //   label: "Solutions",
  //   path: "/solutions",
  // },
  { label: "Brands", path: "/brands" },
  { label: "Contact Us", path: "/contact" },
];


export const HERO_CONTENT = {
  eyebrow:
    "Unified Digital Ecosystem",

  title:
    "One Holding.",

  highlight:
    "Multiple Innovations.",

  subtitle:
    "Crediple powers scalable brands across healthcare, finance, legal, and data intelligence.",

  subtitle2:
    "Built for growth. Designed for impact.",

  cta1: {
    label: "Explore Brands",
    href: "/brands",
  },

  cta2: {
    label: "About Us",
    href: "/about",
  },
};

export const HERO_SLIDES = [
  {
    id: 1,
    eyebrow:
      "The Holding Hub of Trusted Brands.Access specialized solutions, unified under one powerful ecosystem.",
    title: "One Holding. Multiple High",
    highlight:
      "Crediple brings diverse \nbrands together into a unified powerhouse.",
    subtitle:
      "The Core That Connects Every Venture.Crediple brings clarity, control, and growth across all business verticals.",
    description:
      "The Core That Connects Every Venture. Crediple brings clarity, control, and growth across all business verticals.",
    cta1: { label: "Explore More", href: "/brands" },
    cta2: { label: "Discover", href: "/about" },
    bg: home_hero_bg_1,
  },
  {
    id: 2,
    eyebrow:
      "The Holding Hub of Trusted Brands.Access specialized solutions, unified under one powerful ecosystem.",
    title: "One Holding. Multiple High",
    highlight:
      "Crediple brings diverse \nbrands together into a unified powerhouse.",
    subtitle:
      "The Core That Connects Every Venture.Crediple brings clarity, control, and growth across all business verticals.",
    description:
      "The Core That Connects Every Venture. Crediple brings clarity, control, and growth across all business verticals.",
    cta1: { label: "Explore More", href: "/brands" },
    cta2: { label: "Discover", href: "/about" },
    bg: home_hero_bg_2,
  },
  {
    id: 3,
    eyebrow:
      "The Holding Hub of Trusted Brands.Access specialized solutions, unified under one powerful ecosystem.",
    title: "One Holding. Multiple High",
    highlight:
      "Crediple brings diverse \nbrands together into a unified powerhouse.",
    subtitle:
      "The Core That Connects Every Venture.Crediple brings clarity, control, and growth across all business verticals.",
    description:
      "The Core That Connects Every Venture. Crediple brings clarity, control, and growth across all business verticals.",
    cta1: { label: "Explore More", href: "/brands" },
    cta2: { label: "Discover", href: "/about" },
    bg: home_hero_bg_3,
  },
];

export const BRANDS = [
  {
    id: 1,
    name: "My Doctor Capsule",
    category: "Healthcare",
    icon: "🏥",
    color: "#1A6BFF",
    description:
      "A complete healthcare intelligence and clinical management solution for modern healthcare providers, streamlining patient care.",
    date: "January 18, 2024",
    image: brand_icon_1,
    href:"https://www.mydoctorcapsule.com/"
  },
  {
    id: 2,
    name: "Loan Konnekt",
    category: "Finance",
    icon: "₹",
    color: "#00C2A8",
    description:
      "Seamlessly connect customers with top loan financiers and financial products with intelligent AI-powered matching.",
    date: "January 18, 2024",
    image: brand_icon_2,
    href:"https://www.loankonnekt.com/"
  },
  {
    id: 3,
    name: "Lawvix",
    category: "Legal",
    icon: "⚖️",
    color: "#C8933A",
    description:
      "Revolutionary legal intelligence management with powerful workflow automation and case analytics.",
    date: "January 18, 2024",
    image: brand_icon_3,
    href:"https://www.lawvix.com/"
  },
  {
    id: 4,
    name: "Iitil",
    category: "Technology",
    icon: "💡",
    color: "#8B5CF6",
    description:
      "Next-generation infrastructure and data-driven solutions that transform digital operations.",
    date: "January 18, 2024",
    image: brand_icon_4,
    href:"https://www.iitil.com/"
  },
];

export const BRAND_ARTICLES = [
  {
    id: 1,
    category: "Healthcare",
    title: "My Doctor Capsule",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    id: 2,
    category: "Legal",
    title: "Lawvix",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    id: 3,
    category: "Technology",
    title: "5 Ways Technology Has Improved Business Today",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: 4,
    category: "Technology",
    title: "5 Ways Technology Has Improved Business Today",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  },
  {
    id: 5,
    category: "Technology",
    title: "How Wireless Technology is Changing Business",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 6,
    category: "Finance",
    title: "5 Ways Technology Has Improved Business Today",
    date: "January 18, 2024",
    excerpt:
      "Today, it is uncommon to not have access to high-speed wireless internet, regardless of your location on Earth.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
  },
];

export const VALUES = [
  {
    title: "Architectural Excellence",
    desc: "We don't just build businesses; we build ecosystems. Every solution under the Crediple umbrella must be scalable, secure and sophisticated.",
  },
  {
    title: "Uncompromising Integrity",
    desc: "In health, finance, law, data and technology, trust is our primary currency. We lead with transparency and professional rigor in every transaction.",
  },
  {
    title: "Strategic Synergy",
    desc: "We believe the whole is greater than the sum of its parts. We leverage cross industry insights to create a unique competitive advantage for our partners.",
  },
  {
    title: "Relentless Innovation",
    desc: "We reject the status quo. We are committed to constant iteration, ensuring our SaaS platforms remain the gold standard in a rapidly shifting global economy.",
  },
];

export const MILESTONES = [
  {
    yearStart: 2018,
    yearEnd: 2019,
    label: "Foundation of \nCrediple",
    sub: "COVID-19",
    direction: "up",
  },
  {
    yearStart: 2020,
    yearEnd: 2022,
    label: "Healthcare service and \nFinances and digital Brands",
    sub: "RECORD ENTRY",
    direction: "down",
  },
  {
    yearStart: 2022,
    yearEnd: 2024,
    label: "Focused on Future \nready solution",
    sub: "FUTURE READY TECHNOLOGIES",
    direction: "up",
  },
  {
    yearStart: 2025,
    yearEnd: 2026,
    label: "Service across \nIndia",
    sub: "INDIA",
    direction: "down",
  },
];
export const WHO_WE_SERVE = [
  {
    title: "Digital Health Users",
    heading: "Empowering Personal Wellness",
    desc: "Through My Doctor Capsule, we provide individuals with a secure, decentralized digital vault to manage and track personal health records. We believe in putting the power of data back into the hands of the patient for a more personalized healthcare services journey",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    title: "Businesses",
    heading: "Catalyzing Small Business Growth",
    desc: "We bridge the gap for businesses using Loan Konnekt, providing fast and accessible growth capital. Combined with the technical infrastructure of Ittil, we help small businesses scale their operations with enterprise grade IT resources.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
  },
  {
    title: "Hospitals & Healthcare Providers",
    heading: "Optimizing Clinical Workflows",
    desc: "We integrate My Doctor Capsule with existing hospital ecosystems to ensure secure, interoperable patient data exchange. Our solutions streamline practitioner workflows and enhance the quality of care through seamless digital coordination.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
  },
  {
    title: "Integrated Financial Institutions",
    heading: "Architecting the Future of Lending",
    desc: "Loan Konnekt enables credit providers and banks to effortlessly integrate advanced digital lending pipelines. Our platform comes built in with robust compliance frameworks and real time risk analytics to modernise traditional finance.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    title: "Forward Thinking Legal Professionals",
    heading: "Precision-Driven Legal Tech",
    desc: "Through Lawvix, we equip legal teams with AI-powered document review and research platforms. We aim to enhance the precision and speed of legal services, allowing professionals to focus on high-value strategic counsel rather than administrative complexity.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    title: "Enterprises & Data-Driven Organizations",
    heading: "Driving Global Digital Transformation",
    desc: "As a holding entity, Crediple fosters the high-end IT excellence of Ittil. We support major corporations with sophisticated data visualization, agile software development, and the structural integrity required for large-scale digital evolution.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    title: 'Precision Meets Productivity',
    name: 'Vikram Malhotra',
    role: 'Head of Operations',
    company: 'Capital First',
    text: 'Loan Konnekt has completely redefined how we process digital disbursements. The integration was seamless, and the risk analytics are world-class.',
    avatar: user,
  },
  {
    id: 2,
    title: 'Transformative Lending Infrastructure',
    name: 'Sneha Reddy',
    role: 'Founder',
    company: 'CreditBridge India',
    text: 'Loan Konnekt has completely redefined how we process digital disbursements. The integration was seamless, and the risk analytics are world-class.',
    avatar: user,
  },
  {
    id: 3,
    title: 'Clinical Operations Reimagined',
    name: 'Arjun Sharma',
    role: 'CEO',
    company: 'LegalTech India',
    text: 'The Lawvix platform transformed our entire case management workflow. What used to take days now happens in hours. Crediple truly understands enterprise needs.',
    avatar: user,
  },
  {
    id: 4,
    title: 'Seamless Legal Workflow',
    name: 'Priya Nair',
    role: 'CFO',
    company: 'FinNext Corp',
    text: 'Loan Konnekt gave us a seamless way to connect with lenders. The AI-powered matching is remarkably accurate and saves countless hours in due diligence.',
    avatar: user,
  },
  {
    id: 5,
    title: 'World-Class Clinical Infrastructure',
    name: 'David Chen',
    role: 'CTO',
    company: 'HealthPlus',
    text: 'My Doctor Capsule has set a new standard for clinical digital infrastructure. The integration capabilities are unmatched and the support team is exceptional.',
    avatar: user,
  },
];
export const TEAM_MEMBERS = [
  {
    name: "Nimesh Srivastava",
    role: "Co-Founder & Co-CEO",
    avatar: "https://i.pravatar.cc/120?img=11",
  },
  {
    name: "Rahul Mehta",
    role: "Co-Founder & Co-CEO",
    avatar: "https://i.pravatar.cc/120?img=13",
  },
  {
    name: "Ananya Singh",
    role: "Chief Technology Officer",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
];

export const COURSES = [
  {
    id: 1,
    title: "Certified ScrumMaster (CSM)",
    duration: "16 Hrs",
    rating: 5,
    tag: "Trending",
    icon: "🏅",
    info1: "Short Info about the course - 1",
    info2: "Short Info about the course - 2",
  },
  {
    id: 2,
    title: "Leading SAF3 6.0 Certification",
    duration: "16 Hrs",
    rating: 5,
    tag: "Trending",
    icon: "📋",
    info1: "Short Info about the course - 1",
    info2: "Short Info about the course - 2",
  },
  {
    id: 3,
    title: "PMP Certification",
    duration: "16 Hrs",
    rating: 5,
    tag: "Popular",
    icon: "🎯",
    info1: "Short Info about the course - 1",
    info2: "Short Info about the course - 2",
  },
  {
    id: 4,
    title: "AWS Solutions Architect",
    duration: "24 Hrs",
    rating: 5,
    tag: "New",
    icon: "☁️",
    info1: "Short Info about the course - 1",
    info2: "Short Info about the course - 2",
  },
];

export const INTERNSHIP_FEATURES = [
  {
    icon: "🎓",
    title: "Live and Self Paced Learning",
    items: ["Expert Led Trainings", "Professional Mentoring", "Query Handling"],
  },
  {
    icon: "🏅",
    title: "Internship Certificate",
    items: [
      "Training & Internship Certificate",
      "Performance Assessment Certificate",
      "Experience Certificate",
    ],
  },
  {
    icon: "🔧",
    title: "Technical Support",
    items: ["24/7 Query Assistance", "Project Support"],
  },
  {
    icon: "💼",
    title: "Live Projects",
    items: ["Client Based Projects", "Assignments & Assessments"],
  },
  { icon: "♾️", title: "Lifetime Access", items: ["Lifetime Course Access"] },
  {
    icon: "⏱️",
    title: "Variable Program Duration",
    items: ["0-9 Month Internship Program"],
  },
  {
    icon: "📅",
    title: "Program Details",
    items: [
      "Part 1: 3 Months Lifecycle Training on latest technologies",
      "Part 2: 3 Months Advanced Training on Live Projects",
      "Part 3: 3 Months Methodology and Process Training",
    ],
  },
];

export const PROCESS_OUTCOMES = [
  "Lifecycle Training on Latest Technologies",
  "Complete Internship Program",
  "Lifetime Portal Access",
  "Live Projects",
  "Internship Certificate",
  "100% Placement",
  "Managed Services",
  "Soft Skills & Interpersonal Skills Training",
  "Interview Preparation (Mock Interviews)",
];

export const SOLUTIONS_SLIDES = [
  {
    id: 0,
    title: "Healthcare Solution",
    desc: "We enable healthcare providers with digital transformation tools that improve patient engagement, branding, and operational efficiency.",
    items: [
      "Clinic & hospital digital branding systems",
      "Patient acquisition funnels",
      "Healthcare content & video ecosystems",
      "Appointment & engagement platforms",
      "Short info about the course - 2",
    ],
  },
  {
    id: 1,
    title: "FinTech Solutions",
    desc: "We build structured financial ecosystems that improve credit accessibility, reporting, and financial intelligence.",
    items: [
      "Credit Analysis systems",
      "Credit Assessment frameworks",
      "Financial onboarding platforms",
      "Lending ecosystem integrations",
    ],
  },
  {
    id: 2,
    title: "LegalTech Solutions",
    desc: "We simplify legal workflows through structured digital systems designed for faster execution and transparency.",
    items: [
      "Case workflow digitization",
      "Legal documentation systems",
      "Client engagement platforms",
      "Legal service automation tools",
    ],
  },
  {
    id: 3,
    title: "DataTech Solutions",
    desc: "We architect intelligent data ecosystems that turn raw information into actionable business intelligence across sectors.",
    items: [
      "Real-time analytics dashboards",
      "Cross-domain data pipelines",
      "Predictive intelligence frameworks",
      "Data governance & compliance tools",
    ],
  },
];

export const FOOTER_PORTFOLIO = [
  { label: "My Doctor Capsule", href:"https://www.mydoctorcapsule.com/" },
  { label: "Loan Konnekt", href:"https://www.loankonnekt.com/" },
  { label: "Lawvix", href:"https://www.lawvix.com/" },
  { label: "Iitil", href:"https://www.iitil.com/" },
];

export const FOOTER_COMPANY = ["Legal", "Strategic Partnerships"];


export const BRANDS_PAGE_DATA = [
  {
    id: 1,
    name: "My Doctor Capsule",
    taglines: [
      "Transforming Healthcare Services",
      "Into a Digital First Patient Ecosystem",
    ],
    description: [
      "My Doctor Capsule is designed to transform how healthcare service providers connect with, engage and grow their patient base in a digitally driven world. It focuses on building a complete healthcare visibility and patient acquisition ecosystem for clinics, hospitals, and independent practitioners.",
      "In today's healthcare environment, trust, visibility, and accessibility are as important as treatment itself. My Doctor Capsule bridges this gap by enabling healthcare providers to establish a strong and credible digital identity.",
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85",
    whatWeBuild: [
      "End-to-end digital presence systems",
      "Structured patient acquisition funnels",
      "Healthcare branding",
      "Profile optimization",
      "Engagement systems",
    ],
    coreFocus:
      "We do not just market healthcare services — we build structured patient connection systems that improve discovery, trust, and conversion into care.",
  },
  {
    id: 2,
    name: "Loan Konnekt",
    taglines: [
      "Building Structured Intelligence for Credit &",
      "Lending Ecosystems",
    ],
    description: [
      "Loan Konnekt is a financial intelligence ecosystem focused on simplifying and structuring credit, lending and financial decision making processes. It is built to bridge the gap between borrowers, financial understanding, and lending systems through structured advisory and analytical frameworks.",
      "The financial world is complex, fragmented, and often inaccessible to the average individual or business. Loan Konnekt simplifies this through system-driven financial clarity and credit intelligence models.",
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=85",
    whatWeBuild: [
      "Credit analysis frameworks",
      "Borrower profiling systems",
      "Lending ecosystem facilitation",
      "Financial intelligence dashboards",
      "Credit improvement pathways",
    ],
    coreFocus:
      "We transform financial complexity into structured clarity and actionable credit intelligence, enabling better decisions for individuals and institutions.",
  },
  {
    id: 3,
    name: "Lawvix",
    taglines: [
      "Digitizing Legal Access Through",
      "Structured Workflow Systems",
    ],
    description: [
      "Lawvix is a legalTech ecosystem focused on simplifying legal access, improving case management and enabling structured legal service delivery through digital transformation.",
      "Legal systems are often slow, fragmented and difficult to navigate. Lawvix is designed to bring structure, transparency, and accessibility into legal workflows using technology-enabled systems.",
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=85",
    whatWeBuild: [
      "Digital case management",
      "Client onboarding workflows",
      "Legal documentation automation",
      "Legal service access platforms",
      "Workflow optimization tools",
    ],
    coreFocus:
      "We enable a shift from traditional legal handling to structured, process-driven legal ecosystems that improve efficiency, clarity, and accessibility.",
  },
  {
    id: 4,
    name: "Iitil",
    taglines: [
      "Turning Data Into Strategic Business",
      "Intelligence",
    ],
    description: [
      "Iitil is a data intelligence-driven ecosystem focused on transforming raw, unstructured data into meaningful business insights that drive strategic decision-making across industries.",
      "In a modern business environment, data is everywhere—but intelligence is missing. Iitil bridges this gap by building structured analytical systems and decision intelligence frameworks.",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85",
    whatWeBuild: [
      "Data aggregation systems",
      "Business analytics dashboards",
      "Cross-industry insights",
      "Predictive analytics models",
      "Decision support systems",
    ],
    coreFocus:
      "We convert fragmented data into structured intelligence that powers better business decisions, operational efficiency, and strategic growth.",
  },
];
 
export const UNIFIED_ADVANTAGE = [
  { label: "Scalability", icon: BsBarChartFill },
  { label: "Cross-industry intelligence", icon: GiBrain },
  { label: "Unified data systems", icon: FaDatabase },
  { label: "Faster innovation cycles", icon: FaClock },
];