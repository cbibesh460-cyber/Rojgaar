import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  FileText,
  Bookmark,
  CheckCircle2,
  Clock,
  Send,
  PlusCircle,
  Download,
  Share2,
  Linkedin,
  Github,
  Award,
  Sparkles,
  TrendingUp,
  AlertCircle,
  UserCheck,
  Building,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Job, Application, ApplicationStatus, JobCategory, JobType, ExperienceLevel } from '../types';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    switchRole,
    applications,
    updateApplicationStatus,
    jobs,
    addNewJob,
    savedJobIds,
    toggleSaveJob,
    openApplyModal,
    setSelectedJob,
    formatSalary,
    showToast,
    language
  } = useApp();

  const isEmployer = currentUser?.role === 'employer';

  // Candidate Subtabs
  const [candidateTab, setCandidateTab] = useState<'applied' | 'saved' | 'resume' | 'profile' | 'export'>('applied');

  // Employer Subtabs
  const [employerTab, setEmployerTab] = useState<'applicants' | 'post-job' | 'active-jobs'>('applicants');

  // Resume ATS Analyzer state
  const [atsScore, setAtsScore] = useState<number>(currentUser?.resumeAtsScore || 91);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // New Job Form state (for employer)
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState<JobCategory>('IT & Software');
  const [jobLocation, setJobLocation] = useState('Kathmandu, Nepal');
  const [jobCity, setJobCity] = useState('Kathmandu');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [jobExp, setJobExp] = useState<ExperienceLevel>('3-5 Years');
  const [salaryMin, setSalaryMin] = useState(120000);
  const [salaryMax, setSalaryMax] = useState(200000);
  const [jobDesc, setJobDesc] = useState('');
  const [jobSkills, setJobSkills] = useState('React, TypeScript, Node.js');
  const [isUrgent, setIsUrgent] = useState(false);

  // Filter saved jobs
  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));

  // Resume re-scan simulator
  const handleRescanResume = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 8) + 90;
      setAtsScore(newScore);
      setIsScanning(false);
      showToast(`ATS analysis complete! Resume Score: ${newScore}/100`, 'success');
    }, 1200);
  };

  // Employer: Handle create job
  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc) {
      showToast('Please provide a job title and description.', 'warning');
      return;
    }

    addNewJob({
      title: jobTitle,
      company: currentUser?.name || 'Verified Tech Partner',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
      location: jobLocation,
      city: jobCity,
      country: 'Nepal',
      salary: {
        min: Number(salaryMin),
        max: Number(salaryMax),
        currency: 'NPR',
        period: 'monthly'
      },
      experience: jobExp,
      jobType,
      category: jobCategory,
      tags: jobSkills.split(',').map(s => s.trim()).filter(Boolean),
      description: jobDesc,
      requirements: [
        'Demonstrated hands-on experience in the relevant industry domain',
        'Strong grasp of clean architecture, automated testing, and agile workflows',
        'Proven collaboration skills in cross-functional distributed teams'
      ],
      perks: [
        'Social Security Fund (SSF) + Provident Fund',
        'Medical & Hospitalization Insurance',
        'Quarterly performance bonuses & festival allowance'
      ],
      employerId: currentUser?.id || 'emp-user',
      isUrgent,
      isFeatured: true,
      verifiedCompany: true
    });

    setJobTitle('');
    setJobDesc('');
    setEmployerTab('active-jobs');
  };

  // Data Export (JSON / CSV backup for offline portability)
  const handleExportData = () => {
    const exportObject = {
      exportedAt: new Date().toISOString(),
      user: currentUser,
      applications: applications,
      savedJobIds: savedJobIds
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Rojgaar_Career_Data_${currentUser?.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Your career data backup was downloaded successfully!', 'success');
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Profile Header Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-600 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentUser?.name || 'Aayush Maharjan'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {isEmployer ? 'Recruiter / Employer' : 'Verified Candidate'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentUser?.title || 'Senior Software Professional'} • {currentUser?.location || 'Kathmandu, Nepal'}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{currentUser?.email}</span>
                  <span>•</span>
                  <span>{currentUser?.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Role Switcher Button */}
            <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  id="dash-switch-candidate"
                  onClick={() => switchRole('candidate')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    !isEmployer
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Candidate View
                </button>
                <button
                  id="dash-switch-employer"
                  onClick={() => switchRole('employer')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    isEmployer
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Employer Console
                </button>
              </div>

              <button
                id="dash-export-data-top-btn"
                onClick={handleExportData}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
                title="Download full backup of applications and profile"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>
            </div>

          </div>
        </div>

        {/* CANDIDATE DASHBOARD CONTENT */}
        {!isEmployer && (
          <div className="space-y-6">
            
            {/* Candidate Metric Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Applications Sent</span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                  {applications.length}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> 2 active this week
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interviews Scheduled</span>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                  {applications.filter(a => a.status === 'Interview').length || 1}
                </div>
                <span className="text-[11px] text-slate-500 mt-1">Leapfrog Technical</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saved Bookmarks</span>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {savedJobsList.length}
                </div>
                <span className="text-[11px] text-slate-500 mt-1">Ready to apply</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Resume ATS Match</span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {atsScore}%
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1">Top 5% Candidate Pool</span>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
              {[
                { id: 'applied', label: `My Applications (${applications.length})`, icon: Send },
                { id: 'saved', label: `Saved Jobs (${savedJobsList.length})`, icon: Bookmark },
                { id: 'resume', label: 'Resume & ATS Optimizer', icon: FileCheck },
                { id: 'profile', label: 'Profile & Social Sync', icon: UserCheck },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`dash-tab-${tab.id}`}
                    onClick={() => setCandidateTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap ${
                      candidateTab === tab.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Applications Pipeline */}
            {candidateTab === 'applied' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Applied Opportunities & Real-Time Tracking
                </h3>

                {applications.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    You haven't submitted any job applications yet. Browse vacancies to apply in 1-click.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => {
                      const getStatusBadge = (status: ApplicationStatus) => {
                        switch (status) {
                          case 'Interview':
                            return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
                          case 'Under Review':
                            return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
                          case 'Accepted':
                          case 'Offer Extended':
                            return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
                          case 'Rejected':
                            return 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
                          default:
                            return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                        }
                      };

                      return (
                        <div
                          key={app.id}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={app.companyLogo}
                              alt={app.company}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                            <div>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {app.company}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                {app.jobTitle}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                                <span>Applied: {app.appliedDate}</span>
                                <span>•</span>
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                  Match: {app.matchScore || 90}%
                                </span>
                              </div>
                              {app.coverNote && (
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                                  Note: "{app.coverNote}"
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusBadge(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Saved Jobs */}
            {candidateTab === 'saved' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Bookmarked Vacancies ({savedJobsList.length})
                </h3>

                {savedJobsList.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    You haven't bookmarked any jobs yet. Click the bookmark icon on any job card to save it here.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedJobsList.map(job => (
                      <div
                        key={job.id}
                        className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{job.company}</span>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{job.title}</h4>
                          <span className="text-xs text-slate-500">{job.location} • {job.jobType}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => openApplyModal(job)}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Resume & ATS Optimizer */}
            {candidateTab === 'resume' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      ATS Resume Intelligence & Parser
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Verify your resume formatting, keywords, and job match score before applying to top companies.
                    </p>
                  </div>

                  <button
                    id="rescan-resume-btn"
                    onClick={handleRescanResume}
                    disabled={isScanning}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isScanning ? 'Analyzing Structure...' : 'Re-Run ATS Scan'}</span>
                  </button>
                </div>

                {/* Score Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Overall ATS Compatibility
                    </span>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                      {atsScore} / 100
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                      Excellent single-column layout. High pass-rate on BambooHR & Greenhouse systems.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                      Active CV File
                    </span>
                    <div className="text-sm font-bold text-blue-900 dark:text-blue-200 mt-2 truncate">
                      {currentUser?.resumeName || 'Aayush_Maharjan_Resume.pdf'}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">Uploaded: 2026-09-15</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                    <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                      Detected Seniority Level
                    </span>
                    <div className="text-xl font-black text-indigo-700 dark:text-indigo-300 mt-1">
                      Senior (4+ Years)
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                      Strong frontend, mobile and full-stack project signals.
                    </p>
                  </div>
                </div>

                {/* Keywords & Improvement suggestions */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                    Detected Tech Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'TypeScript', 'Node.js', 'Redux', 'Flutter', 'Tailwind CSS', 'Next.js', 'REST APIs', 'Git', 'CI/CD'].map(k => (
                      <span key={k} className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-semibold">
                        ✓ {k}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Recommended Keywords to Add
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Docker', 'PostgreSQL', 'GraphQL', 'AWS Cloud'].map(k => (
                      <span key={k} className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold">
                        + {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Profile & Social Platform Sync */}
            {candidateTab === 'profile' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Professional Profile & External Platform Sync
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Connect your professional networks to auto-verify credentials and import recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* LinkedIn Sync */}
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">LinkedIn Profile</span>
                        <span className="text-xs text-emerald-600 font-semibold">● Connected & Verified</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('LinkedIn profile refreshed and re-synced.', 'success')}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Re-Sync
                    </button>
                  </div>

                  {/* GitHub Sync */}
                  <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">GitHub Repositories</span>
                        <span className="text-xs text-emerald-600 font-semibold">● Connected (24 public repos)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('GitHub activity and commit history synchronized.', 'success')}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Re-Sync
                    </button>
                  </div>
                </div>

                {/* Skills editor */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                    Verified Skills Profile
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser?.skills.map((s, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* EMPLOYER RECRUITER CONSOLE */}
        {isEmployer && (
          <div className="space-y-6">
            
            {/* Employer Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Vacancies</span>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                  {jobs.length}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1">Live on Rojgaar</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Applicants</span>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                  {applications.length + 38}
                </div>
                <span className="text-[11px] text-slate-500 mt-1">Across all postings</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Shortlisted for Review</span>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">
                  12
                </div>
                <span className="text-[11px] text-slate-500 mt-1">Ready for screening call</span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Time-to-Hire</span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  4.2 Days
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1">Fastest in region</span>
              </div>
            </div>

            {/* Subtabs for Employer */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                id="emp-tab-applicants"
                onClick={() => setEmployerTab('applicants')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
                  employerTab === 'applicants'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Review Applicants ({applications.length})</span>
              </button>

              <button
                id="emp-tab-post-job"
                onClick={() => setEmployerTab('post-job')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
                  employerTab === 'post-job'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post New Vacancy</span>
              </button>

              <button
                id="emp-tab-active-jobs"
                onClick={() => setEmployerTab('active-jobs')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2 ${
                  employerTab === 'active-jobs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Manage Postings ({jobs.length})</span>
              </button>
            </div>

            {/* TAB 1: Review Applicants */}
            {employerTab === 'applicants' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Incoming Candidate Pipeline
                </h3>

                <div className="space-y-4">
                  {applications.map(app => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {app.applicantName}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                            ATS Score: {app.matchScore || 92}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          Applied for: <span className="font-bold text-blue-600 dark:text-blue-400">{app.jobTitle}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>Email: {app.applicantEmail}</span>
                          <span>•</span>
                          <span>Phone: {app.applicantPhone}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Resume: {app.resumeFileName} ({app.resumeFileSize})
                          </span>
                        </div>
                      </div>

                      {/* Status changer buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-400 mr-1">Status:</span>
                        {(['Submitted', 'Under Review', 'Interview', 'Accepted', 'Rejected'] as ApplicationStatus[]).map(st => (
                          <button
                            key={st}
                            id={`status-btn-${app.id}-${st}`}
                            onClick={() => updateApplicationStatus(app.id, st)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                              app.status === st
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Post New Vacancy Form */}
            {employerTab === 'post-job' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Publish a Verified Vacancy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Broadcast your opening to over 180,000 active job seekers across Nepal and South Asia.
                </p>

                <form onSubmit={handleCreateJob} className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Job Title / Role Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="post-job-title-input"
                      type="text"
                      required
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      placeholder="e.g. Lead React Native Engineer"
                      className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        id="post-job-category-select"
                        value={jobCategory}
                        onChange={e => setJobCategory(e.target.value as JobCategory)}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      >
                        <option value="IT & Software">IT & Software</option>
                        <option value="Marketing & Sales">Marketing & Sales</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Finance & Banking">Finance & Banking</option>
                        <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                        <option value="Education & Training">Education & Training</option>
                        <option value="Remote Jobs">Remote Jobs</option>
                        <option value="Design & Creative">Design & Creative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Job Type
                      </label>
                      <select
                        id="post-job-type-select"
                        value={jobType}
                        onChange={e => setJobType(e.target.value as JobType)}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Location / City
                      </label>
                      <input
                        id="post-job-location-input"
                        type="text"
                        value={jobLocation}
                        onChange={e => {
                          setJobLocation(e.target.value);
                          setJobCity(e.target.value.split(',')[0].trim());
                        }}
                        placeholder="Kathmandu, Nepal or Remote"
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Experience
                      </label>
                      <select
                        id="post-job-exp-select"
                        value={jobExp}
                        onChange={e => setJobExp(e.target.value as ExperienceLevel)}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      >
                        <option value="Freshers / Entry">Freshers / Entry</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Min Salary (रू / mo)
                      </label>
                      <input
                        id="post-job-salary-min"
                        type="number"
                        value={salaryMin}
                        onChange={e => setSalaryMin(Number(e.target.value))}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Max Salary (रू / mo)
                      </label>
                      <input
                        id="post-job-salary-max"
                        type="number"
                        value={salaryMax}
                        onChange={e => setSalaryMax(Number(e.target.value))}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Required Skills (comma separated)
                    </label>
                    <input
                      id="post-job-skills-input"
                      type="text"
                      value={jobSkills}
                      onChange={e => setJobSkills(e.target.value)}
                      placeholder="React, TypeScript, AWS, Docker"
                      className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Role Overview & Responsibilities
                    </label>
                    <textarea
                      id="post-job-desc-input"
                      rows={4}
                      required
                      value={jobDesc}
                      onChange={e => setJobDesc(e.target.value)}
                      placeholder="Provide an overview of the duties, team structure, and impact of this role..."
                      className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="urgent-hiring-check"
                      checked={isUrgent}
                      onChange={e => setIsUrgent(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <label htmlFor="urgent-hiring-check" className="text-xs font-bold text-amber-600 dark:text-amber-400 cursor-pointer">
                      Mark as Urgent Hiring Badge
                    </label>
                  </div>

                  <div className="pt-3">
                    <button
                      id="submit-post-job-btn"
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      Publish Vacancy to Rojgaar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Active Job Postings */}
            {employerTab === 'active-jobs' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Active Live Postings ({jobs.length})
                </h3>

                <div className="space-y-3">
                  {jobs.map(j => (
                    <div
                      key={j.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{j.title}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                            {j.jobType}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">{j.location} • {j.applicantsCount} Applicants</span>
                      </div>

                      <button
                        onClick={() => setSelectedJob(j)}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
