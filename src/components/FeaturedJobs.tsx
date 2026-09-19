import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Filter,
  DollarSign,
  Sparkles,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Send,
  Building
} from 'lucide-react';
import { Job, JobType, ExperienceLevel } from '../types';

export const FeaturedJobs: React.FC = () => {
  const {
    jobs,
    t,
    formatSalary,
    savedJobIds,
    toggleSaveJob,
    openApplyModal,
    setSelectedJob,
    filterState,
    setFilterState,
    resetFilters,
    language
  } = useApp();

  const [activeQuickTab, setActiveQuickTab] = useState<'all' | 'remote' | 'urgent' | 'nepal' | 'it'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Keyword search
      if (filterState.keyword) {
        const query = filterState.keyword.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(query);
        const matchCompany = job.company.toLowerCase().includes(query);
        const matchTag = job.tags.some(t => t.toLowerCase().includes(query));
        const matchDesc = job.description.toLowerCase().includes(query);
        if (!matchTitle && !matchCompany && !matchTag && !matchDesc) return false;
      }

      // Location
      if (filterState.location) {
        const loc = filterState.location.toLowerCase();
        const matchLoc = job.location.toLowerCase().includes(loc) || job.city.toLowerCase().includes(loc);
        if (!matchLoc) return false;
      }

      // Category
      if (filterState.category && job.category !== filterState.category) {
        return false;
      }

      // Job Type
      if (filterState.jobType && job.jobType !== filterState.jobType) {
        return false;
      }

      // Experience
      if (filterState.experience && job.experience !== filterState.experience) {
        return false;
      }

      // Remote only checkbox
      if (filterState.remoteOnly && job.jobType !== 'Remote') {
        return false;
      }

      // Quick tabs
      if (activeQuickTab === 'remote' && job.jobType !== 'Remote') return false;
      if (activeQuickTab === 'urgent' && !job.isUrgent) return false;
      if (activeQuickTab === 'nepal' && job.country !== 'Nepal') return false;
      if (activeQuickTab === 'it' && job.category !== 'IT & Software') return false;

      return true;
    });
  }, [jobs, filterState, activeQuickTab]);

  return (
    <section id="jobs-section" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.featuredJobsTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {language === 'ne' ? 'नयाँ तथा विशेष रोजगारीका अवसरहरू' : 'Handpicked Career Opportunities'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.featuredJobsSubtitle}
            </p>
          </div>

          {/* Controls: Filter toggles & active results count */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
            </span>
            <button
              id="toggle-advanced-filters"
              onClick={() => setShowAdvancedFilters(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvancedFilters ? 'Hide Filters' : 'Refine Filters'}</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {[
            { id: 'all', label: 'All Openings' },
            { id: 'nepal', label: '🇳🇵 Nepal Positions' },
            { id: 'remote', label: '🌐 100% Remote' },
            { id: 'urgent', label: '⚡ Urgent Hiring' },
            { id: 'it', label: '💻 IT & Software' },
          ].map(tab => (
            <button
              key={tab.id}
              id={`quick-tab-${tab.id}`}
              onClick={() => setActiveQuickTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeQuickTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Advanced Filter Drawer */}
        {showAdvancedFilters && (
          <div className="p-4 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in">
            {/* Filter by Job Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Job Type
              </label>
              <select
                id="filter-jobtype-select"
                value={filterState.jobType}
                onChange={e => setFilterState(prev => ({ ...prev, jobType: e.target.value }))}
                className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Filter by Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Experience Level
              </label>
              <select
                id="filter-experience-select"
                value={filterState.experience}
                onChange={e => setFilterState(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="">All Experience Levels</option>
                <option value="Freshers / Entry">Freshers / Entry Level</option>
                <option value="1-3 Years">1-3 Years (Junior / Mid)</option>
                <option value="3-5 Years">3-5 Years (Mid / Senior)</option>
                <option value="5+ Years">5+ Years (Lead / Staff)</option>
              </select>
            </div>

            {/* Filter by Location Query */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                City / Location
              </label>
              <input
                id="filter-location-input"
                type="text"
                value={filterState.location}
                onChange={e => setFilterState(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Kathmandu, Lalitpur..."
                className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                id="reset-all-filters-btn"
                onClick={resetFilters}
                className="w-full py-2 px-3 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-100 transition cursor-pointer"
              >
                {t.resetFilters}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredJobs.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <Building className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              No matching vacancies found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
              Try adjusting your search criteria or resetting filters to view all active openings.
            </p>
            <button
              id="empty-reset-filters-btn"
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Jobs Grid / List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map(job => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  id={`job-card-${job.id}`}
                  className="group relative bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Top Row: Company Info & Save Action */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                              {job.company}
                            </span>
                            {job.verifiedCompany && (
                              <span title="Verified Employer" className="inline-flex items-center">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              </span>
                            )}
                          </div>
                          <h3
                            onClick={() => setSelectedJob(job)}
                            className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition line-clamp-1"
                          >
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      {/* Bookmark / Save Button */}
                      <button
                        id={`bookmark-job-${job.id}`}
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isSaved
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/50'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={isSaved ? 'Saved to Bookmarks' : 'Bookmark this job'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Metadata Badges: Location, Job Type, Experience */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 font-medium">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 font-medium">
                        <Briefcase className="w-3 h-3 text-slate-500" />
                        <span>{job.jobType}</span>
                      </div>

                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/60 font-medium">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{job.experience}</span>
                      </div>

                      {job.isUrgent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold text-[10px]">
                          <Zap className="w-3 h-3 fill-current" />
                          Urgent
                        </span>
                      )}
                    </div>

                    {/* Salary Highlight */}
                    <div className="mb-4">
                      <span className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400">
                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
                          +{job.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 font-medium">
                      <span>Posted {job.postedDate}</span>
                      <span className="mx-1.5">•</span>
                      <span>{job.applicantsCount} Applicants</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`view-details-${job.id}`}
                        onClick={() => setSelectedJob(job)}
                        className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition cursor-pointer"
                      >
                        {t.viewDetails}
                      </button>
                      <button
                        id={`apply-job-${job.id}`}
                        onClick={() => openApplyModal(job)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>{t.applyNow}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
