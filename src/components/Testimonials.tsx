import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t, language } = useApp();

  const testimonials = [
    {
      name: 'Prashant Adhikari',
      role: 'Senior React Engineer',
      company: 'Placed at Leapfrog Technology',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      story: language === 'ne'
        ? 'रोजगार मार्फत मैले लीपफ्रग टेक्नोलोजीमा आफ्नो रोजाइको सिनियर इन्जिनियर पद पाएँ। एटीएस बायोडाटा स्क्यानरले मलाई इन्टरभ्यु अगावै निकै मद्दत गर्यो।'
        : 'Rojgaar changed my job search completely. Within 4 days of uploading my CV, Leapfrog reached out. The salary transparency made compensation negotiation effortless.',
      verified: true
    },
    {
      name: 'Sushmita Thapa',
      role: 'Flutter Developer',
      company: 'Placed at Khalti Digital Wallet',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      story: language === 'ne'
        ? 'खल्ती जस्तो अग्रणी फिनटेक कम्पनीमा जागिर पाउनु मेरो सपना थियो। रोजगारको १-क्लिक आवेदन र प्रत्यक्ष स्थिति ट्र्याकिङ एकदमै भरपर्दो छ।'
        : 'Landing a core mobile engineer role at Khalti felt seamless. The application tracking board updated whenever the hiring team reviewed my portfolio.',
      verified: true
    },
    {
      name: 'Rohan Sharma',
      role: 'Full Stack & DevOps Specialist',
      company: 'Remote US Healthcare Startup via CloudFactory',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      story: language === 'ne'
        ? 'पोखराबाटै अमेरिकी डलरमा आम्दानी हुने अन्तर्राष्ट्रिय रिमोट जागिर पाएको छु। नेपाली युवाहरूका लागि रोजगार साँचो अर्थमा वरदान साबित भएको छ।'
        : 'Working remotely from Pokhara with international compensation seemed challenging until I found verified remote listings on Rojgaar. Absolute game-changer!',
      verified: true
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {language === 'ne' ? 'सफल अनुभवहरू' : 'Success Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t.testimonialsTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t.testimonialsSubtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              id={`testimonial-${idx}`}
              className="relative p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-200 dark:text-slate-700" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{item.story}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-700">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {item.role}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
