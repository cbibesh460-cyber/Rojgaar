import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { Currency } from '../types';

export const PricingSection: React.FC = () => {
  const { t, currency, setCurrentView, switchRole, showToast, language } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const getPrice = (baseNprMonthly: number) => {
    let monthlyNpr = baseNprMonthly;
    if (billingCycle === 'annual') {
      monthlyNpr = Math.round(baseNprMonthly * 0.8); // 20% discount
    }

    if (baseNprMonthly === 0) return 'Free Forever';

    if (currency === 'INR') {
      const inr = Math.round(monthlyNpr / 1.6);
      return `₹ ${inr.toLocaleString('en-IN')}`;
    }
    if (currency === 'USD') {
      const usd = Math.round(monthlyNpr / 135);
      return `$ ${usd.toLocaleString('en-US')}`;
    }
    return `रू ${monthlyNpr.toLocaleString('en-IN')}`;
  };

  const plans = [
    {
      name: 'Starter Plan',
      nepaliName: 'स्टार्टर योजना (निःशुल्क)',
      desc: 'Perfect for small businesses, local retail, and single job postings.',
      price: getPrice(0),
      period: 'No credit card needed',
      popular: false,
      buttonText: 'Post 1 Job Free',
      features: [
        '1 Active Job Posting for 30 days',
        'Standard search & filter visibility',
        'Direct email candidate notifications',
        'Standard resume downloads (PDF)',
        'Basic applicant tracking board'
      ]
    },
    {
      name: 'Growth Team',
      nepaliName: 'ग्रोथ टिम (लोकप्रिय)',
      desc: 'Ideal for tech startups, mid-sized agencies, and fast hiring sprints.',
      price: getPrice(18000),
      period: billingCycle === 'annual' ? 'billed annually (Save 20%)' : 'per month',
      popular: true,
      buttonText: 'Get Started with Growth',
      features: [
        'Up to 10 Active Job Postings',
        'Featured & Urgent vacancy badges',
        'Full candidate pool resume database access',
        'AI match scoring & automated screening',
        'Automated SMS & WhatsApp interview invites',
        'Custom company branding & video intro',
        'Dedicated account onboarding manager'
      ]
    },
    {
      name: 'Enterprise Scale',
      nepaliName: 'इन्टरप्राइज (ठूला संस्थान)',
      desc: 'For large banks, telecommunication giants, and multinational firms.',
      price: getPrice(48000),
      period: billingCycle === 'annual' ? 'billed annually (Save 20%)' : 'per month',
      popular: false,
      buttonText: 'Contact Enterprise Sales',
      features: [
        'Unlimited Active Job Vacancies',
        'Top of search prominence across Nepal & region',
        'Custom ATS & HRMS REST API integrations',
        'Role-based multi-recruiter team seats (25+)',
        'Quarterly salary surveys & benchmarking data',
        'Dedicated 24/7 priority SLA support',
        'Custom NDA and enterprise compliance'
      ]
    }
  ];

  const handlePlanSelect = (planName: string) => {
    switchRole('employer');
    setCurrentView('dashboard');
    showToast(`Selected ${planName}. Welcome to your Recruiter Dashboard!`, 'success');
  };

  return (
    <section id="pricing-section" className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {language === 'ne' ? 'रोजगारदाता मूल्य' : 'Recruitment Packages'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t.pricingTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t.pricingSubtitle}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex items-center gap-2 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <button
              id="billing-monthly-btn"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              id="billing-annual-btn"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                20% Off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              id={`plan-card-${idx}`}
              className={`relative rounded-3xl p-8 transition-all flex flex-col justify-between ${
                p.popular
                  ? 'bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-2xl scale-102 z-10'
                  : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Popular for Hiring</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {language === 'ne' ? p.nepaliName : p.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {p.desc}
                </p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                    {p.price}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    {p.period}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                id={`choose-plan-btn-${idx}`}
                onClick={() => handlePlanSelect(p.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  p.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <span>{p.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
