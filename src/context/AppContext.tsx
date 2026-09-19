import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Company, BlogPost, UserProfile, Application, FilterState, NotificationItem, Currency, ApplicationStatus } from '../types';
import { INITIAL_JOBS, INITIAL_COMPANIES, INITIAL_BLOG_POSTS, INITIAL_USER, INITIAL_APPLICATIONS } from '../data/mockData';
import { Language, translations } from '../utils/translations';
import confetti from 'canvas-confetti';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['en'];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatSalary: (min: number, max: number, sourceCurrency: Currency, period?: string) => string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentView: 'home' | 'jobs' | 'companies' | 'about' | 'blog' | 'pricing' | 'dashboard';
  setCurrentView: (view: 'home' | 'jobs' | 'companies' | 'about' | 'blog' | 'pricing' | 'dashboard') => void;
  jobs: Job[];
  companies: Company[];
  blogPosts: BlogPost[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applications: Application[];
  submitApplication: (data: {
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
  }) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  addNewJob: (newJob: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  jobToApply: Job | null;
  openApplyModal: (job: Job) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  switchRole: (role: 'candidate' | 'employer') => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isOffline: boolean;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const initialFilters: FilterState = {
  keyword: '',
  location: '',
  category: '',
  jobType: '',
  experience: '',
  remoteOnly: false,
  sortBy: 'latest'
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Application Update',
    message: 'Khalti Digital Wallet reviewed your application for Mobile App Developer.',
    time: '15m ago',
    read: false,
    type: 'application_update',
    jobId: 'job-2'
  },
  {
    id: 'notif-2',
    title: 'New High Match Vacancy',
    message: 'Leapfrog Technology posted Senior Full Stack Engineer matching your skill profile (94% match).',
    time: '2h ago',
    read: false,
    type: 'job_alert',
    jobId: 'job-1'
  },
  {
    id: 'notif-3',
    title: 'Job Market Alert',
    message: 'Tech hiring in Kathmandu increased by 28% this quarter. Update your resume to rank higher.',
    time: '1d ago',
    read: true,
    type: 'system'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('rojgaar_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rojgaar_lang', lang);
  };

  const t = translations[language] || translations.en;

  // Currency
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('rojgaar_currency') as Currency) || 'NPR';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('rojgaar_currency', c);
  };

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('rojgaar_dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('rojgaar_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Active View
  const [currentView, setCurrentView] = useState<'home' | 'jobs' | 'companies' | 'about' | 'blog' | 'pricing' | 'dashboard'>('home');

  // Network Status
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      showToast(t.onlineNotice, 'success');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast(t.offlineNotice, 'warning');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  // Jobs
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('rojgaar_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_JOBS;
  });

  useEffect(() => {
    localStorage.setItem('rojgaar_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Companies & Blog
  const [companies] = useState<Company[]>(INITIAL_COMPANIES);
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // Filters
  const [filterState, setFilterState] = useState<FilterState>(initialFilters);
  const resetFilters = () => setFilterState(initialFilters);

  // Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('rojgaar_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-1', 'job-3'];
  });

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      const next = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      localStorage.setItem('rojgaar_saved_jobs', JSON.stringify(next));
      showToast(exists ? 'Job removed from saved list' : 'Job saved to your bookmarks!', exists ? 'info' : 'success');
      return next;
    });
  };

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('rojgaar_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('rojgaar_applications', JSON.stringify(applications));
  }, [applications]);

  const submitApplication = (data: {
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
  }) => {
    const newApp: Application = {
      ...data,
      id: `app-${Date.now()}`,
      status: 'Submitted',
      appliedDate: new Date().toISOString().split('T')[0],
      matchScore: Math.floor(Math.random() * 15) + 85
    };

    setApplications(prev => [newApp, ...prev]);

    // Increase job applicant count
    setJobs(prev =>
      prev.map(j => (j.id === data.jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    // Confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    showToast(`Application successfully sent to ${data.company}!`, 'success');

    // Add automatic simulated notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Application Submitted',
        message: `Your application for ${data.jobTitle} at ${data.company} has been received.`,
        time: 'Just now',
        read: false,
        type: 'application_update',
        jobId: data.jobId
      },
      ...prev
    ]);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(a => (a.id === appId ? { ...a, status } : a))
    );
    showToast(`Candidate status updated to: ${status}`, 'info');
  };

  // Add new job (Employer post)
  const addNewJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount'>) => {
    const newJob: Job = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      applicantsCount: 0
    };
    setJobs(prev => [newJob, ...prev]);
    showToast('Your job listing is live on Rojgaar!', 'success');
  };

  // Selected Job Details Modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Apply Modal
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [jobToApply, setJobToApply] = useState<Job | null>(null);

  const openApplyModal = (job: Job) => {
    setJobToApply(job);
    setIsApplyModalOpen(true);
  };

  // Auth Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('rojgaar_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rojgaar_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const switchRole = (role: 'candidate' | 'employer') => {
    if (currentUser) {
      const updated: UserProfile = {
        ...currentUser,
        role,
        title: role === 'employer' ? 'Lead Talent Acquisition Partner' : 'Senior Frontend & Mobile Developer'
      };
      setCurrentUser(updated);
      showToast(`Switched workspace mode to ${role === 'employer' ? 'Employer / Recruiter' : 'Job Seeker'}`, 'info');
    }
  };

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Currency Converter & Salary Formatter
  const formatSalary = (min: number, max: number, sourceCurrency: Currency, period: string = 'monthly'): string => {
    // Rates approx: 1 USD = 135 NPR, 1 INR = 1.6 NPR
    let minNpr = min;
    let maxNpr = max;
    if (sourceCurrency === 'USD') {
      minNpr = min * 135;
      maxNpr = max * 135;
    } else if (sourceCurrency === 'INR') {
      minNpr = min * 1.6;
      maxNpr = max * 1.6;
    }

    let targetMin = minNpr;
    let targetMax = maxNpr;
    let symbol = 'रू';

    if (currency === 'INR') {
      targetMin = minNpr / 1.6;
      targetMax = maxNpr / 1.6;
      symbol = '₹';
    } else if (currency === 'USD') {
      targetMin = minNpr / 135;
      targetMax = maxNpr / 135;
      symbol = '$';
    }

    const fmt = (n: number) => {
      if (currency === 'USD') {
        return Math.round(n).toLocaleString('en-US');
      }
      // South Asian format
      return Math.round(n).toLocaleString('en-IN');
    };

    const suffix = period === 'yearly' ? '/yr' : '/mo';
    return `${symbol} ${fmt(targetMin)} - ${fmt(targetMax)} ${suffix}`;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        formatSalary,
        darkMode,
        toggleDarkMode,
        currentView,
        setCurrentView,
        jobs,
        companies,
        blogPosts,
        filterState,
        setFilterState,
        resetFilters,
        savedJobIds,
        toggleSaveJob,
        applications,
        submitApplication,
        updateApplicationStatus,
        addNewJob,
        selectedJob,
        setSelectedJob,
        isApplyModalOpen,
        setIsApplyModalOpen,
        jobToApply,
        openApplyModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        currentUser,
        setCurrentUser,
        switchRole,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isOffline,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
