import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  FileText,
  Search,
  CheckCircle,
  Building,
  Users,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t, setCurrentView, language } = useApp();
  const [activeTab, setActiveTab] = useState<'candidates' | 'employers'>('candidates');

  const seekerSteps = [
    {
      step: '01',
      icon: UserPlus,
      title: language === 'ne' ? '१. प्रोफाइल तयार गर्नुहोस्' : '1. Create Your Profile',
      desc: language === 'ne'
        ? 'आफ्ना सीप, शिक्षा र अनुभवको आधारमा २ मिनेटमै व्यावसायिक प्रोफाइल बनाउनुहोस्।'
        : 'Sign up for free, detail your skill stack, preferred location, and target salary in just 2 minutes.'
    },
    {
      step: '02',
      icon: FileText,
      title: language === 'ne' ? '२. बायोडाटा अपलोड गर्नुहोस्' : '2. Upload Resume / CV',
      desc: language === 'ne'
        ? 'सिस्टमले बायोडाटा स्वचालित रूपमा स्क्यान गरी एटीएस स्कोर र सुधार सुझाव दिन्छ।'
        : 'Drop your PDF/Word resume. Our automated parser computes your instant ATS match score against live jobs.'
    },
    {
      step: '03',
      icon: Search,
      title: language === 'ne' ? '३. १-क्लिकमा आवेदन दिनुहोस्' : '3. Apply with 1-Click',
      desc: language === 'ne'
        ? 'नेपाल तथा विदेशका प्रमाणित कम्पनीहरूमा आफ्नो प्रोफाइल सिधै पठाउनुहोस्।'
        : 'Apply directly to verified listings. No repetitive forms—your verified profile reaches the hiring team instantly.'
    },
    {
      step: '04',
      icon: CheckCircle,
      title: language === 'ne' ? '४. अन्तरवार्ता र नियुक्ति' : '4. Interview & Get Hired',
      desc: language === 'ne'
        ? 'ड्यासमा आवेदनको प्रगति ट्र्याक गर्नुहोस् र सिधै अन्तरवार्ताको निम्तो पाउनुहोस्।'
        : 'Track review status on your interactive dashboard, receive real-time schedule alerts, and negotiate dream offers.'
    }
  ];

  const employerSteps = [
    {
      step: '01',
      icon: Building,
      title: language === 'ne' ? '१. कम्पनी दर्ता गर्नुहोस्' : '1. Register Verified Profile',
      desc: language === 'ne'
        ? 'आफ्नो संस्थाको प्रोफाइल दर्ता गर्नुहोस् र प्रमाणित ब्याज प्राप्त गर्नुहोस्।'
        : 'Verify your company identity, display workplace culture, and unlock your recruiter management console.'
    },
    {
      step: '02',
      icon: FileText,
      title: language === 'ne' ? '२. जागिर प्रकाशित गर्नुहोस्' : '2. Post Vacancies in Minutes',
      desc: language === 'ne'
        ? 'आवश्यक योग्यता र तलब स्पष्ट तोकी तत्काल योग्य उम्मेदवारहरू सम्म पुग्नुहोस्।'
        : 'Define job descriptions, salary brackets, and screening questions with immediate distribution across South Asia.'
    },
    {
      step: '03',
      icon: Users,
      title: language === 'ne' ? '३. योग्य उम्मेदवार छनौट' : '3. Screen & Shortlist Talent',
      desc: language === 'ne'
        ? 'एआई प्रविधिको सहयोगमा शीर्ष योग्यता भएका उम्मेदवारहरू तत्काल फिल्टर गर्नुहोस्।'
        : 'Review applications ranked by compatibility. Preview resumes, export candidate sheets, and manage hiring stages.'
    },
    {
      step: '04',
      icon: Send,
      title: language === 'ne' ? '४. अन्तरवार्ता र छिटो भर्ना' : '4. Schedule & Fast Hire',
      desc: language === 'ne'
        ? 'उम्मेदवारलाई स्थिति अपडेट पठाउनुहोस् र औसत ४ दिन भित्र टोली विस्तार गर्नुहोस्।'
        : 'Send automated interview invitations, issue offers, and cut time-to-hire by over 60% with zero recruiter friction.'
    }
  ];

  const activeSteps = activeTab === 'candidates' ? seekerSteps : employerSteps;

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {language === 'ne' ? 'सरल प्रक्रिया' : 'Step-by-Step Workflow'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t.howItWorksTitle}
          </h2>

          {/* Toggle Tab */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <button
              id="how-it-works-seekers-tab"
              onClick={() => setActiveTab('candidates')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                activeTab === 'candidates'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.forJobSeekers}
            </button>
            <button
              id="how-it-works-employers-tab"
              onClick={() => setActiveTab('employers')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                activeTab === 'employers'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.forEmployers}
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeSteps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={index}
                id={`how-step-${index}`}
                className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-700 font-mono">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-10 text-center">
          <button
            id="how-it-works-cta"
            onClick={() => {
              if (activeTab === 'candidates') {
                setCurrentView('jobs');
              } else {
                setCurrentView('dashboard');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <span>{activeTab === 'candidates' ? 'Start Exploring Vacancies' : 'Post Your First Vacancy Free'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
