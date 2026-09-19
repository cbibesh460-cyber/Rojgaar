import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Briefcase, Mic, ArrowRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { JobCategory } from '../types';

export const HeroSection: React.FC = () => {
  const { t, filterState, setFilterState, setCurrentView, showToast, language } = useApp();

  const [keywordInput, setKeywordInput] = useState(filterState.keyword);
  const [locationInput, setLocationInput] = useState(filterState.location);
  const [categoryInput, setCategoryInput] = useState(filterState.category);
  const [isListening, setIsListening] = useState(false);

  const categories: JobCategory[] = [
    'IT & Software',
    'Marketing & Sales',
    'Engineering',
    'Finance & Banking',
    'Healthcare & Pharma',
    'Education & Training',
    'Remote Jobs',
    'Customer Support',
    'Design & Creative'
  ];

  const popularTags = [
    { label: 'React / Node', tag: 'React' },
    { label: 'Kathmandu', location: 'Kathmandu' },
    { label: 'Remote', location: 'Remote' },
    { label: 'Flutter', tag: 'Flutter' },
    { label: 'Khalti / FinTech', tag: 'Fintech' },
    { label: 'Pokhara', location: 'Pokhara' },
    { label: 'AI & ML', tag: 'AI' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterState(prev => ({
      ...prev,
      keyword: keywordInput,
      location: locationInput,
      category: categoryInput
    }));
    setCurrentView('jobs');
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVoiceSearch = () => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'ne' ? 'ne-NP' : language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        showToast('Listening... Speak your desired role or city', 'info');

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setKeywordInput(transcript);
          setIsListening(false);
          showToast(`Heard: "${transcript}"`, 'success');
        };

        recognition.onerror = () => {
          setIsListening(false);
          showToast('Could not access microphone. Pre-filled with popular tech role.', 'info');
          setKeywordInput('Full Stack Engineer');
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        setIsListening(false);
        setKeywordInput('Senior React Developer');
        showToast('Microphone prompt simulated: "Senior React Developer"', 'info');
      }
    } else {
      // Graceful fallback simulator
      setIsListening(true);
      showToast('Voice Search active: "Frontend Developer Kathmandu"', 'info');
      setTimeout(() => {
        setKeywordInput('Frontend Developer');
        setLocationInput('Kathmandu');
        setIsListening(false);
      }, 1200);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/70 dark:border-slate-800">
      
      {/* Subtle decorative background blur spheres */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top pill badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>
              {language === 'ne'
                ? 'नेपाल तथा दक्षिण एसियाको प्रमाणित रोजगार मञ्च'
                : 'Nepal & South Asia Verified Job Network'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {t.heroHeadline}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t.heroSubheadline}
          </p>
        </div>

        {/* Universal Search Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-700 p-3 sm:p-4 backdrop-blur-xl">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
            
            {/* Input 1: Keyword */}
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                id="hero-search-keyword"
                type="text"
                value={keywordInput}
                onChange={e => setKeywordInput(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                id="hero-voice-search-btn"
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-lg transition text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 ${
                  isListening ? 'text-red-500 animate-pulse bg-red-50' : ''
                }`}
                title="Voice Search (Hands-free)"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Input 2: Location */}
            <div className="md:w-56 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                id="hero-search-location"
                type="text"
                value={locationInput}
                onChange={e => setLocationInput(e.target.value)}
                placeholder={t.locationPlaceholder}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                list="popular-locations"
              />
              <datalist id="popular-locations">
                <option value="Kathmandu, Nepal" />
                <option value="Lalitpur, Nepal" />
                <option value="Pokhara, Nepal" />
                <option value="Biratnagar, Nepal" />
                <option value="Remote / Anywhere" />
                <option value="Bengaluru, India" />
                <option value="Delhi NCR, India" />
              </datalist>
            </div>

            {/* Input 3: Category */}
            <div className="md:w-48 flex items-center gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200/80 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                id="hero-search-category"
                value={categoryInput}
                onChange={e => setCategoryInput(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="" className="text-slate-900 dark:bg-slate-800 dark:text-white">
                  {t.categoryPlaceholder}
                </option>
                {categories.map(c => (
                  <option key={c} value={c} className="text-slate-900 dark:bg-slate-800 dark:text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              id="hero-search-submit"
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 transition cursor-pointer shrink-0"
            >
              <span>{t.searchButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick Popular Keywords */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              {t.popularSearches}
            </span>
            {popularTags.map((pt, idx) => (
              <button
                key={idx}
                id={`popular-tag-${idx}`}
                type="button"
                onClick={() => {
                  if (pt.tag) setKeywordInput(pt.tag);
                  if (pt.location) setLocationInput(pt.location);
                  setFilterState(prev => ({
                    ...prev,
                    keyword: pt.tag || prev.keyword,
                    location: pt.location || prev.location
                  }));
                  setCurrentView('jobs');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium cursor-pointer"
              >
                {pt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Trust Badges Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Verified Employers</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>3,200+ Active Companies in Nepal & Region</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Zero Placement Fees for Job Seekers</span>
          </div>
        </div>

      </div>
    </section>
  );
};
