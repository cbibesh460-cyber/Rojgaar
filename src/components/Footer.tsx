import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Facebook,
  Github,
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setCurrentView, setFilterState, showToast, language } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Rojgaar career alerts & weekly job digest!', 'success');
  };

  const handleCityFilter = (city: string) => {
    setFilterState(prev => ({ ...prev, location: city }));
    setCurrentView('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryFilter = (cat: string) => {
    setFilterState(prev => ({ ...prev, category: cat }));
    setCurrentView('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {t.portalName}
                </span>
                <span className="text-[11px] text-blue-400 font-semibold tracking-wider uppercase">
                  {t.portalTagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footerTagline}
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                Subscribe to Job Alerts & Salary Trends
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're subscribed! Check your inbox for weekly alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3.5 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Top Locations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {['Kathmandu, Nepal', 'Lalitpur, Nepal', 'Pokhara, Nepal', 'Biratnagar, Nepal', 'Remote / Work From Home', 'Bengaluru, India'].map((loc, i) => (
                <li key={i}>
                  <button
                    id={`footer-loc-${i}`}
                    onClick={() => handleCityFilter(loc.split(',')[0])}
                    className="hover:text-blue-400 transition cursor-pointer text-left"
                  >
                    Jobs in {loc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Key Sectors
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {['IT & Software', 'Finance & Banking', 'Marketing & Sales', 'Engineering', 'Healthcare & Pharma', 'Customer Support'].map((cat, i) => (
                <li key={i}>
                  <button
                    id={`footer-cat-${i}`}
                    onClick={() => handleCategoryFilter(cat)}
                    className="hover:text-blue-400 transition cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Regional Offices
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Kathmandu Tech Hub, New Baneshwor, Bagmati, Nepal
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <span>+977 1-4789012 / +977 9841-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@rojgaar.com.np</span>
              </li>
              <li className="flex items-center gap-2 pt-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Reg: 284910/080/081</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.portalName}. {t.allRightsReserved}
          </div>
          <div className="flex items-center gap-6">
            <button
              id="footer-privacy-btn"
              onClick={() => showToast('Privacy Policy: All candidate data is encrypted & strictly protected.', 'info')}
              className="hover:text-slate-400 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              id="footer-terms-btn"
              onClick={() => showToast('Terms of Service: Zero fee guarantee for job seekers.', 'info')}
              className="hover:text-slate-400 cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              id="footer-security-btn"
              onClick={() => showToast('Security: End-to-end 256-bit AES encryption & verified employer audits.', 'info')}
              className="hover:text-slate-400 cursor-pointer"
            >
              Security Audits
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
