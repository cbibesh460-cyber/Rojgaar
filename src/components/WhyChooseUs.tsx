import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Zap,
  DollarSign,
  UserCheck,
  Lock,
  Smartphone,
  Check
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useApp();

  const benefits = [
    {
      icon: ShieldCheck,
      title: language === 'ne' ? '१००% प्रमाणित रोजगारदाता' : '100% Verified Employers',
      description: language === 'ne'
        ? 'सबै कम्पनी र पदहरू दर्ता प्रमाण र बैंकिङ मापदण्ड अनुरूप जाँच गरी सुरक्षित राखिन्छ।'
        : 'Every posting and company profile goes through strict verification to eliminate scam listings and ghost postings.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      icon: DollarSign,
      title: language === 'ne' ? 'पारदर्शी तलब संरचना' : 'Upfront Salary Transparency',
      description: language === 'ne'
        ? 'पारिश्रमिक लुकाउने चलन छैन। आवेदन दिनु अघि नै तलब र सेवा सुविधा स्पष्ट देख्न सकिन्छ।'
        : 'No guessing games or hidden brackets. Clearly view base packages, bonuses, and social security perks before applying.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50'
    },
    {
      icon: Zap,
      title: language === 'ne' ? 'द्रुत अन्तरवार्ता र प्रतिक्रिया' : 'Fast-Track Hiring Loops',
      description: language === 'ne'
        ? 'प्रत्यक्ष एचआर प्रणाली मार्फत आवेदन दिएको ४८ घण्टा भित्र स्थिति अद्यावधिक हुन्छ।'
        : 'Direct HR pipeline integration ensures candidate status notifications and interview schedules within 48 to 72 hours.',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50'
    },
    {
      icon: UserCheck,
      title: language === 'ne' ? 'निःशुल्क एटीएस बायोडाटा जाँच' : 'Built-in ATS Resume Scorer',
      description: language === 'ne'
        ? 'आफ्नो बायोडाटाको प्रभावकारिता जाँच्नुहोस् र कम्पनीको आवश्यकता अनुसार सुधार गर्नुहोस्।'
        : 'Automated resume parser checks compatibility with employer criteria and offers real-time improvement tips.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50'
    },
    {
      icon: Smartphone,
      title: language === 'ne' ? 'कम ब्यान्डविथ र अफलाइन पहुँच' : 'Optimized for Low Bandwidth',
      description: language === 'ne'
        ? 'कमजोर इन्टरनेट भएका क्षेत्रमा पनि सहजै जागिर खोज्न, बायोडाटा तयार गर्न र आवेदन दिन सकिन्छ।'
        : 'Engineered for seamless performance on 3G/4G networks with offline caching and light client-side assets.',
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/50'
    },
    {
      icon: Lock,
      title: language === 'ne' ? 'गोपनीयता र डेटा सुरक्षा' : 'Data Privacy & Zero Spam',
      description: language === 'ne'
        ? 'तपाईंको फोन नम्बर र व्यक्तिगत विवरण केवल तपाईंले अनुमति दिएका कम्पनीले मात्र देख्न पाउँछन्।'
        : 'Your contact credentials and resume are encrypted. Only verified hiring managers of jobs you apply to receive your profile.',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/50'
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {language === 'ne' ? 'हाम्रा विशेषताहरू' : 'Our Advantages'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t.whyChooseUsTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t.whyChooseUsSubtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                id={`benefit-card-${i}`}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.bg}`}>
                    <Icon className={`w-6 h-6 ${b.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
