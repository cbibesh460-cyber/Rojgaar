export type JobType = 'Full-time' | 'Part-time' | 'Remote' | 'Contract' | 'Internship' | 'Hybrid';

export type ExperienceLevel = 'Freshers / Entry' | '1-3 Years' | '3-5 Years' | '5+ Years' | 'Executive / Lead';

export type JobCategory =
  | 'IT & Software'
  | 'Marketing & Sales'
  | 'Engineering'
  | 'Finance & Banking'
  | 'Healthcare & Pharma'
  | 'Education & Training'
  | 'Remote Jobs'
  | 'Customer Support'
  | 'Design & Creative';

export type Currency = 'NPR' | 'INR' | 'USD';

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview' | 'Shortlisted' | 'Offer Extended' | 'Accepted' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyDescription?: string;
  location: string;
  city: string;
  country: 'Nepal' | 'India' | 'Global' | 'Remote';
  salary: {
    min: number;
    max: number;
    currency: Currency;
    period: 'monthly' | 'yearly';
  };
  experience: ExperienceLevel;
  jobType: JobType;
  category: JobCategory;
  tags: string[];
  description: string;
  requirements: string[];
  perks: string[];
  postedDate: string;
  deadline?: string;
  isUrgent?: boolean;
  isFeatured?: boolean;
  applicantsCount: number;
  employerId: string;
  verifiedCompany?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resumeFileName: string;
  resumeFileSize: string;
  coverNote?: string;
  status: ApplicationStatus;
  appliedDate: string;
  matchScore?: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  openJobsCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
  verified: boolean;
  website: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job_alert' | 'application_update' | 'system';
  jobId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer';
  title: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  avatar: string;
  resumeName?: string;
  resumeUploadDate?: string;
  resumeAtsScore?: number;
  linkedinConnected?: boolean;
  githubConnected?: boolean;
  twoFactorEnabled?: boolean;
}

export interface FilterState {
  keyword: string;
  location: string;
  category: string;
  jobType: string;
  experience: string;
  remoteOnly: boolean;
  sortBy: 'latest' | 'salary_high' | 'popular';
}

export interface BlogPost {
  id: string;
  title: string;
  nepaliTitle?: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string;
}
