import { Job, Company, BlogPost, UserProfile } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Leapfrog Technology',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    industry: 'Software & Cloud Engineering',
    location: 'Kathmandu, Nepal',
    employees: '500+ employees',
    openJobsCount: 8,
    rating: 4.8,
    reviewsCount: 340,
    description: 'Leading healthcare tech and AI engineering firm building world-class distributed software products for global enterprises.',
    verified: true,
    website: 'https://lftechnology.com',
  },
  {
    id: 'comp-2',
    name: 'Khalti Digital Wallet',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    industry: 'FinTech & Payments',
    location: 'Lalitpur, Nepal',
    employees: '250+ employees',
    openJobsCount: 5,
    rating: 4.7,
    reviewsCount: 290,
    description: 'Premier digital payment service provider in Nepal empowering millions with seamless cashless financial transactions and merchant tools.',
    verified: true,
    website: 'https://khalti.com',
  },
  {
    id: 'comp-3',
    name: 'Deerwalk Inc / Deerhold',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    industry: 'Healthcare Analytics & AI',
    location: 'Kathmandu, Nepal',
    employees: '400+ employees',
    openJobsCount: 6,
    rating: 4.6,
    reviewsCount: 210,
    description: 'Specialized big data analytics and healthcare software services company delivering data intelligence to US and global health systems.',
    verified: true,
    website: 'https://deerhold.com',
  },
  {
    id: 'comp-4',
    name: 'eSewa Fonepay',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=150&auto=format&fit=crop&q=80',
    industry: 'Financial Technology',
    location: 'Kathmandu, Nepal',
    employees: '600+ employees',
    openJobsCount: 7,
    rating: 4.7,
    reviewsCount: 420,
    description: "Nepal's first and largest digital payment gateway providing nationwide interoperable payment networks and digital services.",
    verified: true,
    website: 'https://esewa.com.np',
  },
  {
    id: 'comp-5',
    name: 'Fusemachines',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    industry: 'Artificial Intelligence & ML',
    location: 'Kathmandu / New York',
    employees: '350+ employees',
    openJobsCount: 4,
    rating: 4.8,
    reviewsCount: 180,
    description: 'Pioneering enterprise AI products and AI talent development network helping global brands automate operations.',
    verified: true,
    website: 'https://fusemachines.com',
  },
  {
    id: 'comp-6',
    name: 'CloudFactory',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    industry: 'Workforce & AI Operations',
    location: 'Lalitpur, Nepal / UK',
    employees: '1000+ employees',
    openJobsCount: 9,
    rating: 4.7,
    reviewsCount: 512,
    description: 'Global workforce platform providing high-accuracy human-in-the-loop data labeling and machine learning operations.',
    verified: true,
    website: 'https://cloudfactory.com',
  },
  {
    id: 'comp-7',
    name: 'Tech Mahindra',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
    industry: 'IT Consulting & Enterprise Tech',
    location: 'Bengaluru / Regional Hub',
    employees: '150,000+ employees',
    openJobsCount: 14,
    rating: 4.5,
    reviewsCount: 1200,
    description: 'Global digital transformation, consulting and business re-engineering services and solutions provider.',
    verified: true,
    website: 'https://techmahindra.com',
  },
  {
    id: 'comp-8',
    name: 'Daraz Group (Alibaba)',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    industry: 'E-Commerce & Logistics',
    location: 'Kathmandu, Nepal',
    employees: '800+ employees',
    openJobsCount: 11,
    rating: 4.6,
    reviewsCount: 380,
    description: 'South Asia leading online marketplace connecting thousands of sellers with millions of buyers every day.',
    verified: true,
    website: 'https://daraz.com.np',
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React & Node.js)',
    company: 'Leapfrog Technology',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 150000,
      max: 240000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Hybrid',
    category: 'IT & Software',
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    description: 'We are looking for an experienced Senior Full Stack Engineer to lead architecture, develop robust microservices, and build high-performance web applications for US healthcare clients.',
    requirements: [
      'Strong proficiency in modern React, TypeScript, Node.js, and REST/GraphQL APIs',
      'Solid understanding of relational database schema design (PostgreSQL/MySQL)',
      'Experience with CI/CD deployment pipelines, Docker, and AWS cloud environments',
      'Excellent analytical thinking and clear communication skills in English and Nepali'
    ],
    perks: [
      'Provident Fund + Gratuity (Social Security Fund)',
      'Comprehensive Medical & Accidental Insurance for Family',
      'Flexible Hybrid working hours with home-office allowance',
      'Annual performance bonus & continuous learning sponsorship'
    ],
    postedDate: 'Just now',
    deadline: '2026-10-15',
    isUrgent: true,
    isFeatured: true,
    applicantsCount: 34,
    employerId: 'comp-1',
    verifiedCompany: true
  },
  {
    id: 'job-2',
    title: 'Mobile App Developer (Flutter & Dart)',
    company: 'Khalti Digital Wallet',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    location: 'Lalitpur, Nepal',
    city: 'Lalitpur',
    country: 'Nepal',
    salary: {
      min: 110000,
      max: 180000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '1-3 Years',
    jobType: 'Full-time',
    category: 'IT & Software',
    tags: ['Flutter', 'Dart', 'BLoC', 'Fintech', 'iOS/Android'],
    description: 'Join the core payment product engineering team at Khalti! You will develop lightning-fast, secure, and intuitive payment interfaces used by over 3 million active users across Nepal.',
    requirements: [
      'Demonstrated experience building and publishing cross-platform mobile apps with Flutter',
      'Knowledge of state management solutions (BLoC, Riverpod, or Provider)',
      'Understanding of mobile security, encrypted token storage, and biometric auth',
      'Keen eye for responsive UI/UX and fluid animations'
    ],
    perks: [
      'Daily subsidized chef-cooked lunch and snacks',
      'Wellness stipend & gym membership reimbursements',
      'Festival bonus & quarterly performance incentives',
      'Latest MacBook Pro M3 hardware kit'
    ],
    postedDate: '2 hours ago',
    deadline: '2026-10-20',
    isUrgent: false,
    isFeatured: true,
    applicantsCount: 52,
    employerId: 'comp-2',
    verifiedCompany: true
  },
  {
    id: 'job-3',
    title: 'Lead Machine Learning & AI Engineer',
    company: 'Fusemachines',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal / Remote',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 220000,
      max: 380000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '5+ Years',
    jobType: 'Remote',
    category: 'IT & Software',
    tags: ['PyTorch', 'LLMs', 'Python', 'MLOps', 'Vector DBs'],
    description: 'Lead generative AI and enterprise agentic systems development. Design proprietary RAG pipelines, fine-tune open weights models, and deploy scalable inference servers.',
    requirements: [
      'Advanced degree in Computer Science, Data Science, or equivalent practical track record',
      'Extensive hands-on experience with Python, PyTorch/TensorFlow, and Transformers',
      'Familiarity with LangChain/LlamaIndex, embedding models, and vector stores',
      'Experience optimizing model latency and deploying containerized MLOps pipelines'
    ],
    perks: [
      '100% Remote flexibility with global co-working passes',
      'USD pegged salary protection against inflation',
      'Sponsored conference attendance (NeurIPS, ICML)',
      'Comprehensive wellness and private mental health coverage'
    ],
    postedDate: '1 day ago',
    deadline: '2026-10-30',
    isUrgent: true,
    isFeatured: true,
    applicantsCount: 28,
    employerId: 'comp-5',
    verifiedCompany: true
  },
  {
    id: 'job-4',
    title: 'Digital Marketing & Growth Manager',
    company: 'Daraz Group (Alibaba)',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 90000,
      max: 150000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Full-time',
    category: 'Marketing & Sales',
    tags: ['Growth Hacking', 'SEO/SEM', 'Google Ads', 'Analytics', 'Retention'],
    description: 'Drive user acquisition, campaign conversion optimization, and mega sale campaigns (like 11.11 and Dashain Dhamaka) across Nepal e-commerce channels.',
    requirements: [
      'Proven track record in high-scale performance marketing and digital ad optimization',
      'Mastery of Google Analytics 4, Meta Ads Manager, and programmatic display tools',
      'Data-driven mindset with hands-on cohort analysis and A/B testing experience',
      'Exceptional leadership skills to coordinate across creative and commercial teams'
    ],
    perks: [
      'Alibaba Group international career exchange opportunities',
      'Exclusive employee discount vouchers on Daraz',
      'Comprehensive health insurance for spouse and dependents',
      'Annual paid retreats and team building excursions'
    ],
    postedDate: '3 days ago',
    deadline: '2026-10-18',
    isUrgent: false,
    isFeatured: false,
    applicantsCount: 47,
    employerId: 'comp-8',
    verifiedCompany: true
  },
  {
    id: 'job-5',
    title: 'Senior DevOps & Cloud Security Specialist',
    company: 'eSewa Fonepay',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 170000,
      max: 270000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Full-time',
    category: 'IT & Software',
    tags: ['Kubernetes', 'Terraform', 'AWS', 'PCI-DSS', 'Linux'],
    description: 'Architect resilient multi-region infrastructure for national financial infrastructure handling millions of transactions every second with 99.999% uptime.',
    requirements: [
      'Strong expertise in Kubernetes, Docker container orchestration, and Helm charts',
      'Infrastructure as Code (IaC) experience using Terraform or Ansible',
      'Knowledge of zero-trust network security, SIEM tools, and ISO/PCI-DSS compliance',
      '24/7 on-call rotation readiness for critical banking gateway services'
    ],
    perks: [
      'Attractive performance allowances and stock purchase incentives',
      'Full health, dental, and vision insurance',
      'Subsidized fuel and transport allowance',
      'Paid certification vouchers (AWS Certified Solutions Architect, CKA)'
    ],
    postedDate: '4 days ago',
    deadline: '2026-10-25',
    isUrgent: true,
    isFeatured: true,
    applicantsCount: 19,
    employerId: 'comp-4',
    verifiedCompany: true
  },
  {
    id: 'job-6',
    title: 'Senior Financial Analyst & Investment Strategist',
    company: 'Deerwalk Inc / Deerhold',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 120000,
      max: 200000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Full-time',
    category: 'Finance & Banking',
    tags: ['Financial Modeling', 'Valuation', 'US GAAP', 'Excel VBA', 'Forecasting'],
    description: 'Lead financial forecasting, valuation models, cross-border tax compliance, and revenue reporting for global technology portfolios.',
    requirements: [
      'Chartered Accountant (CA) / ACCA or MBA in Finance from a recognized institution',
      'In-depth knowledge of discounted cash flow (DCF) models and budgeting',
      'Experience in auditing international contracts and software billing systems',
      'Proficiency in financial software like QuickBooks, SAP, and advanced Excel'
    ],
    perks: [
      'International accounting certification study leaves and financial support',
      'Company transport pick-up & drop facility across Ring Road',
      'Gratuity and retirement savings plans',
      'Onsite cafe and recreational clubhouse'
    ],
    postedDate: '5 days ago',
    deadline: '2026-10-28',
    isUrgent: false,
    isFeatured: false,
    applicantsCount: 22,
    employerId: 'comp-3',
    verifiedCompany: true
  },
  {
    id: 'job-7',
    title: 'Remote Senior React Native Engineer (Global Payroll)',
    company: 'CloudFactory',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    location: 'Pokhara / Remote Nepal',
    city: 'Pokhara',
    country: 'Remote',
    salary: {
      min: 180000,
      max: 300000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Remote',
    category: 'Remote Jobs',
    tags: ['React Native', 'TypeScript', 'Redux', 'Offline-first', 'iOS/Android'],
    description: 'Build offline-first, low-bandwidth optimized mobile applications that empower distributed knowledge workers in rural and developing regions worldwide.',
    requirements: [
      'Deep mastery of React Native, TypeScript, and native bridge modules',
      'Experience with offline-first synchronization protocols and SQLite / WatermelonDB',
      'Strong intuition for battery consumption, frame rates, and low-spec Android devices',
      'Self-driven work ethic with excellent asynchronous written collaboration'
    ],
    perks: [
      '100% remote anywhere in Nepal or South Asia',
      'USD or local currency direct remittance',
      'Annual home ergonomic desk & high-speed fiber internet stipend',
      '30 days annual paid leave + mental wellness days'
    ],
    postedDate: '6 days ago',
    deadline: '2026-11-01',
    isUrgent: false,
    isFeatured: true,
    applicantsCount: 68,
    employerId: 'comp-6',
    verifiedCompany: true
  },
  {
    id: 'job-8',
    title: 'Senior Cloud Solutions Architect',
    company: 'Tech Mahindra',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
    location: 'Remote / South Asia Hub',
    city: 'Bengaluru / Regional',
    country: 'India',
    salary: {
      min: 150000,
      max: 260000,
      currency: 'INR',
      period: 'monthly',
    },
    experience: '5+ Years',
    jobType: 'Hybrid',
    category: 'Engineering',
    tags: ['Azure', 'AWS', 'Microservices', 'Enterprise Architecture', 'Go'],
    description: 'Provide architectural governance, cloud modernization roadmap, and containerization strategy for Fortune 500 telecommunications and banking clients.',
    requirements: [
      'Prior role as Principal Engineer or Solutions Architect in enterprise consulting',
      'Expertise in microservices decomposition, event brokers (Kafka/RabbitMQ), and API gateways',
      'Multi-cloud certifications (AWS Solutions Architect Pro or Azure Solutions Architect Expert)'
    ],
    perks: [
      'Competitive multinational compensation structure',
      'Comprehensive family insurance with OPD benefits',
      'Stock options and annual retention bonus',
      'Global relocation and overseas client project opportunities'
    ],
    postedDate: '1 week ago',
    deadline: '2026-10-31',
    isUrgent: false,
    isFeatured: true,
    applicantsCount: 41,
    employerId: 'comp-7',
    verifiedCompany: true
  },
  {
    id: 'job-9',
    title: 'Staff UI/UX Product Designer',
    company: 'Leapfrog Technology',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    location: 'Kathmandu, Nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    salary: {
      min: 130000,
      max: 210000,
      currency: 'NPR',
      period: 'monthly',
    },
    experience: '3-5 Years',
    jobType: 'Hybrid',
    category: 'Design & Creative',
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    description: 'Transform complex enterprise workflows into elegant, accessible user interfaces. Lead user research sessions and establish reusable Figma design system tokens.',
    requirements: [
      'Outstanding portfolio displaying complex web application and mobile UI systems',
      'Command of Figma auto-layout, design tokens, component variants, and interactive prototypes',
      'Strong grasp of WCAG 2.1 accessibility standards and design usability heuristics',
      'Confidence presenting design rationale to international stakeholders and clients'
    ],
    perks: [
      'Top-tier Apple hardware (MacBook Pro + Studio Display)',
      'Annual design book & course allowance',
      'Flexible working schedule with focus days',
      'Comprehensive healthcare and retirement fund'
    ],
    postedDate: '1 week ago',
    deadline: '2026-10-22',
    isUrgent: false,
    isFeatured: false,
    applicantsCount: 39,
    employerId: 'comp-1',
    verifiedCompany: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Top Tech Careers in Nepal for 2026: Salary Benchmarks & In-Demand Skills',
    nepaliTitle: '२०२६ मा नेपालमा उच्च माग भएका आईटी पेशा र तलब संरचना',
    excerpt: 'Explore the latest salary surveys and fastest-growing software engineering roles in Kathmandu, Lalitpur, and remote companies across South Asia.',
    category: 'Career Insights',
    author: 'Er. Sujan Shrestha (Tech HR Lead)',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    content: `The tech ecosystem in Nepal and South Asia has witnessed unprecedented evolution over the past 3 years. With international outsourcing, digital payments, and AI services booming, local engineers command competitive international compensations while staying in Nepal.

Key high-paying specialties include:
1. **Full-Stack & Cloud Engineers**: Knowledge of React, Node, and AWS guarantees immediate demand.
2. **FinTech Security Specialists**: The explosion of digital wallets (Khalti, eSewa, Fonepay) makes compliance and security experts indispensable.
3. **AI & Machine Learning Specialists**: Companies like Fusemachines and Deerwalk continue aggressive hiring for data engineering and LLM application development.

To stand out, build verifiable GitHub repositories, showcase live full-stack projects, and demonstrate proactive communication skills.`
  },
  {
    id: 'post-2',
    title: 'How to Build an ATS-Friendly Resume that Gets You Interviewed Fast',
    nepaliTitle: 'अन्तरवार्ता सुनिश्चित गर्ने प्रभावकारी बायोडाटा (Resume) कसरी बनाउने?',
    excerpt: 'Master standard formatting, keyword alignment, and metric-driven achievements that beat modern Applicant Tracking Systems in minutes.',
    category: 'Job Seeker Guide',
    author: 'Pooja Karki (Recruitment Director)',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    content: `More than 75% of job applications are pre-screened by automated tracking software before a human recruiter ever sees them. 

Here are the golden rules for passing ATS filters:
- **Clean single-column layout**: Avoid multi-column graphical designs that confuse text parsers.
- **Quantifiable impact**: Instead of writing "Responsible for front-end", write "Architected React front-end, reducing page load time by 42% and boosting mobile retention by 18%."
- **Matching skills section**: Align your technical proficiencies with the explicit keywords listed in the job description.`
  },
  {
    id: 'post-3',
    title: 'Hiring Great Talent in Nepal: A Comprehensive Employer Handbook',
    nepaliTitle: 'नेपालमा उत्कृष्ट प्रतिभा भर्ना गर्ने रोजगारदाताको लागि मार्गनिर्देशन',
    excerpt: 'Learn how top tech and financial employers attract, evaluate, and retain high-performing professionals in a competitive hiring landscape.',
    category: 'Employer Trends',
    author: 'Bikash Adhikari (People & Culture)',
    date: 'Sep 08, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    content: `Retaining senior engineers and product managers requires more than just standard salaries. Modern professionals prioritize transparent growth paths, hybrid work flexibility, continuous learning allowances, and psychological safety.

Discover how automated candidate screening on Rojgaar helps HR teams reduce time-to-hire by over 60% while elevating candidate experience.`
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'user-default',
  name: 'Aayush Maharjan',
  email: 'aayush.maharjan@gmail.com',
  role: 'candidate',
  title: 'Senior Frontend & Mobile Developer',
  phone: '+977 9841-234567',
  location: 'Kathmandu, Nepal',
  bio: 'Passionate software engineer with 4+ years of experience building modern web and mobile apps with React, React Native, and TypeScript. Interested in FinTech and high-scale systems.',
  skills: ['React', 'React Native', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Redux', 'GraphQL', 'Next.js'],
  experienceYears: 4,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  resumeName: 'Aayush_Maharjan_Resume_2026.pdf',
  resumeUploadDate: '2026-09-10',
  resumeAtsScore: 89,
  linkedinConnected: true,
  githubConnected: true,
  twoFactorEnabled: true,
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (React & Node.js)',
    company: 'Leapfrog Technology',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    applicantName: 'Aayush Maharjan',
    applicantEmail: 'aayush.maharjan@gmail.com',
    applicantPhone: '+977 9841-234567',
    resumeFileName: 'Aayush_Maharjan_Resume_2026.pdf',
    resumeFileSize: '1.2 MB',
    status: 'Interview' as const,
    appliedDate: '2026-09-14',
    matchScore: 94,
    notes: 'Technical Interview scheduled for Thursday, 3:00 PM NPT.'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Mobile App Developer (Flutter & Dart)',
    company: 'Khalti Digital Wallet',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&auto=format&fit=crop&q=80',
    applicantName: 'Aayush Maharjan',
    applicantEmail: 'aayush.maharjan@gmail.com',
    applicantPhone: '+977 9841-234567',
    resumeFileName: 'Aayush_Maharjan_Resume_2026.pdf',
    resumeFileSize: '1.2 MB',
    status: 'Under Review' as const,
    appliedDate: '2026-09-17',
    matchScore: 88,
    notes: 'Resume viewed by Hiring Manager.'
  }
];
