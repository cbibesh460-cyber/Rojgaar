import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Star, MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Company } from '../types';

export const CompanySpotlight: React.FC = () => {
  const { companies, t, setFilterState, setCurrentView, language } = useApp();

  const handleCompanyClick = (companyName: string) => {
    setFilterState(prev => ({
      ...prev,
      keyword: companyName
    }));
    setCurrentView('jobs');
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {language === 'ne' ? 'नियोक्ता प्रोफाइल' : 'Featured Employers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t.companySpotlightTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.companySpotlightSubtitle}
            </p>
          </div>

          <button
            id="view-all-companies-btn"
            onClick={() => {
              setCurrentView('companies');
            }}
            className="mt-4 md:mt-0 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {companies.map(company => (
            <div
              key={company.id}
              id={`company-card-${company.id}`}
              className="group bg-slate-50/70 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Logo & Rating */}
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                  />
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{company.rating}</span>
                  </div>
                </div>

                {/* Company Name & Industry */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {company.name}
                  </h3>
                  {company.verified && (
                    <span title="Verified Employer" className="inline-flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    </span>
                  )}
                </div>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  {company.industry}
                </div>

                {/* Location & Size */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{company.employees}</span>
                  </div>
                </div>

                {/* Short blurb */}
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {company.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                id={`explore-jobs-${company.id}`}
                onClick={() => handleCompanyClick(company.name)}
                className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>{company.openJobsCount} Open Vacancies</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
