import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Search,
  Bell,
  Moon,
  Sun,
  Globe,
  DollarSign,
  Menu,
  X,
  User,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  WifiOff
} from 'lucide-react';
import { Language } from '../utils/translations';
import { Currency } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currency,
    setCurrency,
    darkMode,
    toggleDarkMode,
    currentView,
    setCurrentView,
    currentUser,
    switchRole,
    setIsAuthModalOpen,
    setAuthModalMode,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isOffline
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'jobs', label: t.navJobs },
    { id: 'companies', label: t.navCompanies },
    { id: 'pricing', label: t.navPricing },
    { id: 'blog', label: t.navBlog },
    { id: 'about', label: t.navAbout },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 transition-colors">
      {/* Offline banner notification */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-900 px-4 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-inner">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offlineNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              id="navbar-brand-button"
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {t.portalName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    Nepal & SA
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline leading-none">
                  {language === 'ne' ? 'प्रमाणित रोजगार पोर्टल' : 'Verified Career Portal'}
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => {
                      setCurrentView(link.id as any);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              {(['NPR', 'INR', 'USD'] as Currency[]).map(curr => (
                <button
                  key={curr}
                  id={`currency-btn-${curr}`}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={curr === 'NPR' ? 'Nepalese Rupee (रू)' : curr === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}
                >
                  {curr === 'NPR' ? 'रू NPR' : curr === 'INR' ? '₹ INR' : '$ USD'}
                </button>
              ))}
            </div>

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                id="language-dropdown-toggle"
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Language
                  </div>
                  {[
                    { code: 'ne', label: 'नेपाली (Nepali)', flag: '🇳🇵' },
                    { code: 'en', label: 'English', flag: '🌐' },
                    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
                  ].map(l => (
                    <button
                      key={l.code}
                      id={`lang-select-${l.code}`}
                      onClick={() => {
                        setLanguage(l.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer ${
                        language === l.code
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {language === l.code && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                id="notifications-toggle"
                onClick={() => setNotifDropdownOpen(prev => !prev)}
                className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                      {unreadNotificationsCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                          {unreadNotificationsCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        id="mark-all-read-btn"
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs rounded-lg transition cursor-pointer ${
                            n.read
                              ? 'text-slate-500 dark:text-slate-400'
                              : 'bg-blue-50/70 dark:bg-blue-950/30 text-slate-800 dark:text-slate-200 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-900 dark:text-white text-xs">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Login / Dashboard */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  id="user-profile-menu-toggle"
                  onClick={() => setUserDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase">
                      {currentUser.role === 'employer' ? 'Employer' : 'Candidate'}
                    </span>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{currentUser.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-2 flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-lg">
                        <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">Mode:</span>
                        <div className="flex gap-1">
                          <button
                            id="switch-role-candidate"
                            onClick={() => switchRole('candidate')}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                              currentUser.role === 'candidate'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            Seeker
                          </button>
                          <button
                            id="switch-role-employer"
                            onClick={() => switchRole('employer')}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                              currentUser.role === 'employer'
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            Employer
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      id="view-dashboard-btn"
                      onClick={() => {
                        setCurrentView('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700/60 rounded-lg cursor-pointer transition"
                    >
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{t.navDashboard}</span>
                    </button>

                    {currentUser.role === 'employer' && (
                      <button
                        id="post-job-quick-btn"
                        onClick={() => {
                          setCurrentView('dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/60 rounded-lg cursor-pointer transition"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Post New Vacancy</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="auth-login-btn"
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  {t.btnLogin}
                </button>
                <button
                  id="auth-signup-btn"
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition cursor-pointer"
                >
                  {t.btnSignUp}
                </button>
              </div>
            )}

            {/* Quick Action: Dashboard button for convenience */}
            <button
              id="header-dashboard-cta"
              onClick={() => setCurrentView('dashboard')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-blue-600/30 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition cursor-pointer"
            >
              <span>{currentUser?.role === 'employer' ? 'Recruiter Hub' : t.navDashboard}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => {
                  setCurrentView(link.id as any);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2.5 text-xs font-semibold rounded-lg text-left transition ${
                  currentView === link.id
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Currency:</span>
            <div className="flex gap-1 text-xs">
              {(['NPR', 'INR', 'USD'] as Currency[]).map(curr => (
                <button
                  key={curr}
                  id={`mobile-curr-${curr}`}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    currency === curr ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <button
            id="mobile-dashboard-btn"
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 text-center text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
          >
            Go to {currentUser?.role === 'employer' ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
          </button>
        </div>
      )}
    </header>
  );
};
