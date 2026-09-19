import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Code,
  TrendingUp,
  Cpu,
  Landmark,
  HeartPulse,
  GraduationCap,
  Wifi,
  Headphones,
  Palette,
  ArrowRight
} from 'lucide-react';
import { JobCategory } from '../types';

interface CategoryItem {
  name: JobCategory;
  nepaliName: string;
  icon: React.ElementType;
  count: string;
  color: string;
  bg: string;
}

export const CategorySection: React.FC = () => {
  const { t, setFilterState, setCurrentView, language } = useApp();

  const categories: CategoryItem[] = [
    {
      name: 'IT & Software',
      nepaliName: 'सूचना प्रविधि तथा सफ्टवेयर',
      icon: Code,
      count: '9,420+ Openings',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      name: 'Marketing & Sales',
      nepaliName: 'बजार व्यवस्थापन र बिक्री',
      icon: TrendingUp,
      count: '3,150+ Openings',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      name: 'Engineering',
      nepaliName: 'इन्जिनियरिङ तथा प्राविधिक',
      icon: Cpu,
      count: '2,840+ Openings',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/50'
    },
    {
      name: 'Finance & Banking',
      nepaliName: 'बैंकिङ, वित्तीय तथा लेखा',
      icon: Landmark,
      count: '3,920+ Openings',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      name: 'Healthcare & Pharma',
      nepaliName: 'स्वास्थ्य सेवा र मेडिकल',
      icon: HeartPulse,
      count: '1,450+ Openings',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/50'
    },
    {
      name: 'Education & Training',
      nepaliName: 'शिक्षा, तालिम र अनुसन्धान',
      icon: GraduationCap,
      count: '1,120+ Openings',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/50'
    },
    {
      name: 'Remote Jobs',
      nepaliName: 'रिमोट / घरबाटै काम',
      icon: Wifi,
      count: '4,210+ Openings',
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/50'
    },
    {
      name: 'Design & Creative',
      nepaliName: 'डिजाइन, कला तथा युआई/युएक्स',
      icon: Palette,
      count: '1,230+ Openings',
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-50 dark:bg-pink-950/50'
    },
    {
      name: 'Customer Support',
      nepaliName: 'ग्राहक सेवा तथा अपरेसन',
      icon: Headphones,
      count: '1,860+ Openings',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50'
    },
  ];

  const handleCategoryClick = (catName: JobCategory) => {
    setFilterState(prev => ({
      ...prev,
      category: catName
    }));
    setCurrentView('jobs');
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {language === 'ne' ? 'प्रमुख विधा' : 'Top Categories'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {t.categoriesTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.categoriesSubtitle}
            </p>
          </div>

          <button
            id="browse-all-categories-btn"
            onClick={() => {
              setFilterState(prev => ({ ...prev, category: '' }));
              setCurrentView('jobs');
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition cursor-pointer"
          >
            <span>{t.viewAllJobs}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                id={`cat-card-${cat.name.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cat.bg} group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {language === 'ne' ? cat.nepaliName : cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cat.count}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
