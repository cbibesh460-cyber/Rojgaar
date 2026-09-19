import React from 'react';
import { useApp } from '../context/AppContext';
import { Briefcase, Users, Building, TrendingUp, Award, Clock } from 'lucide-react';

export const QuickStats: React.FC = () => {
  const { t } = useApp();

  const stats = [
    {
      id: 'stat-jobs',
      icon: Briefcase,
      value: '25,480+',
      label: t.statJobsPosted,
      sublabel: 'Across 40+ sectors',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      id: 'stat-candidates',
      icon: Users,
      value: '185,000+',
      label: t.statActiveCandidates,
      sublabel: 'Pre-screened talent',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40'
    },
    {
      id: 'stat-companies',
      icon: Building,
      value: '3,240+',
      label: t.statCompanies,
      sublabel: 'Verified organisations',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      id: 'stat-success',
      icon: TrendingUp,
      value: '94.8%',
      label: t.statSuccessRate,
      sublabel: 'Average placement turnaround',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40'
    }
  ];

  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 transition duration-200 shadow-xs hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {s.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
