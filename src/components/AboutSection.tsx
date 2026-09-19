import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Users, Target, Heart, Award, CheckCircle2, Globe, Building2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, language, setCurrentView } = useApp();

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            About Rojgaar
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
            Bridging Talent and Opportunity Across Nepal & South Asia
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
            Rojgaar was founded with a singular mission: to eliminate friction, opaque salaries, and ghost postings from the regional job market. We empower job seekers with free verified career access and help growing companies discover exceptional talent.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Verified Trust Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every employer must verify their registration number and official company email before publishing. Zero spam, zero fake vacancies.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Radical Salary Transparency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We mandate clear compensation ranges on every posting, eliminating wage speculation and accelerating hiring conversations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Low-Bandwidth & Regional Focus
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Built to load lightning-fast even on 3G mobile connections, with multi-language support (English, Nepali, Hindi) and offline cache.
            </p>
          </div>
        </div>

        {/* Regional Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black">28,500+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Verified Jobs Filled</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">180,000+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Registered Job Seekers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">2,400+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Active Tech & Corporate Employers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">94.8%</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1">Placement Satisfaction</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setCurrentView('jobs')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition cursor-pointer"
          >
            Explore Active Vacancies
          </button>
        </div>

      </div>
    </div>
  );
};
