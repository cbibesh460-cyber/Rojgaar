import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Send,
  Share2,
  Building2,
  Calendar,
  Zap,
  Gift,
  Check
} from 'lucide-react';

export const JobDetailModal: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    openApplyModal,
    savedJobIds,
    toggleSaveJob,
    formatSalary,
    t,
    showToast
  } = useApp();

  if (!selectedJob) return null;

  const isSaved = savedJobIds.includes(selectedJob.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Job listing URL copied to clipboard!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <img
              src={selectedJob.companyLogo}
              alt={selectedJob.company}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {selectedJob.company}
                </span>
                {selectedJob.verifiedCompany && (
                  <span title="Verified Employer" className="inline-flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </span>
                )}
                {selectedJob.isUrgent && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold">
                    <Zap className="w-3 h-3 fill-current" />
                    Urgent
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {selectedJob.title}
              </h2>
            </div>
          </div>

          <button
            id="close-job-detail-btn"
            onClick={() => setSelectedJob(null)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate">{selectedJob.location}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Job Type</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedJob.jobType}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Experience</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedJob.experience}</span>
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Salary</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400 block mt-0.5">
                {formatSalary(selectedJob.salary.min, selectedJob.salary.max, selectedJob.salary.currency, selectedJob.salary.period)}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Required Skills & Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedJob.tags.map(t => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              About the Role
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* Requirements List */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Key Requirements & Qualifications
            </h4>
            <ul className="space-y-2.5">
              {selectedJob.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perks & Benefits */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Perks, Benefits & Culture
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedJob.perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <Gift className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional info footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>Posted {selectedJob.postedDate}</span>
            {selectedJob.deadline && <span>Application Deadline: {selectedJob.deadline}</span>}
            <span>{selectedJob.applicantsCount} professionals applied</span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-3 sticky bottom-0 z-10 rounded-b-3xl">
          <div className="flex items-center gap-2">
            <button
              id="detail-save-btn"
              onClick={() => toggleSaveJob(selectedJob.id)}
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center gap-2 text-xs font-bold ${
                isSaved
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? t.saved : t.saveJob}</span>
            </button>

            <button
              id="detail-share-btn"
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Share job link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <button
            id="detail-apply-now-btn"
            onClick={() => {
              const job = selectedJob;
              setSelectedJob(null);
              openApplyModal(job);
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition"
          >
            <Send className="w-4 h-4" />
            <span>{t.applyNow}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
