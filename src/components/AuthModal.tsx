import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  User,
  Building,
  Mail,
  Lock,
  Phone,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    setCurrentUser,
    showToast
  } = useApp();

  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [useBiometrics, setUseBiometrics] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = (demoRole: 'candidate' | 'employer') => {
    if (demoRole === 'candidate') {
      const demoCandidate: UserProfile = {
        id: 'user-demo-candidate',
        name: 'Aayush Maharjan',
        email: 'aayush.maharjan@gmail.com',
        role: 'candidate',
        title: 'Senior Frontend & Mobile Developer',
        phone: '+977 9841-234567',
        location: 'Kathmandu, Nepal',
        bio: 'Full stack web & mobile engineer specializing in React, React Native, and Node.js.',
        skills: ['React', 'React Native', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'],
        experienceYears: 4,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        resumeName: 'Aayush_Maharjan_Resume_2026.pdf',
        resumeUploadDate: '2026-09-15',
        resumeAtsScore: 92,
        linkedinConnected: true,
        githubConnected: true,
        twoFactorEnabled: true
      };
      setCurrentUser(demoCandidate);
      showToast('Logged in as Job Seeker (Aayush Maharjan)', 'success');
    } else {
      const demoEmployer: UserProfile = {
        id: 'user-demo-employer',
        name: 'Pooja Karki',
        email: 'pooja.karki@lftechnology.com',
        role: 'employer',
        title: 'Director of Talent Acquisition',
        phone: '+977 1-4789012',
        location: 'Kathmandu, Nepal',
        bio: 'Hiring leading engineering, AI, and design talent for Leapfrog Technology & global health tech clients.',
        skills: ['Technical Recruiting', 'Talent Sourcing', 'HR Strategy', 'Employer Branding'],
        experienceYears: 7,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        twoFactorEnabled: true
      };
      setCurrentUser(demoEmployer);
      showToast('Logged in as Recruiter / Employer (Leapfrog HR)', 'success');
    }
    setIsAuthModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password.', 'warning');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || (role === 'employer' ? 'Company Recruiter' : 'Professional Job Seeker'),
      email,
      role,
      title: role === 'employer' ? `${companyName || 'Verified Company'} HR Lead` : 'Software Professional',
      phone: '+977 9800-000000',
      location: 'Kathmandu, Nepal',
      bio: role === 'employer' ? 'Verified employer seeking top talent' : 'Looking for high growth opportunities in South Asia',
      skills: ['React', 'JavaScript', 'Problem Solving'],
      experienceYears: 2,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      resumeName: 'My_Resume.pdf',
      resumeAtsScore: 88,
      twoFactorEnabled: useBiometrics
    };

    setCurrentUser(newUser);
    showToast(
      authModalMode === 'login'
        ? `Welcome back, ${newUser.name}!`
        : `Account created successfully for ${newUser.name}!`,
      'success'
    );
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative p-6 sm:p-8">
        
        {/* Close button */}
        <button
          id="close-auth-modal-btn"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
              Rojgaar
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
              Portal Access
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {authModalMode === 'login' ? 'Sign in to your account' : 'Create your Rojgaar account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access thousands of verified job listings or find top candidates in Nepal & South Asia.
          </p>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="mb-5 p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Demo Accounts (1-Click)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="demo-login-candidate-btn"
              type="button"
              onClick={() => handleDemoLogin('candidate')}
              className="py-1.5 px-2 bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer text-left truncate"
            >
              👤 As Job Seeker
            </button>
            <button
              id="demo-login-employer-btn"
              type="button"
              onClick={() => handleDemoLogin('employer')}
              className="py-1.5 px-2 bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 rounded-lg text-[11px] font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer text-left truncate"
            >
              🏢 As Recruiter (HR)
            </button>
          </div>
        </div>

        {/* Role Toggle Selector */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-5 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            id="auth-role-candidate-btn"
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'candidate'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Job Seeker</span>
          </button>
          <button
            type="button"
            id="auth-role-employer-btn"
            onClick={() => setRole('employer')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'employer'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Employer / Recruiter</span>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {role === 'employer' ? 'Contact Person Name' : 'Full Name'}
              </label>
              <input
                id="auth-name-input"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={role === 'employer' ? 'e.g. Sujan Shrestha (HR)' : 'e.g. Aayush Maharjan'}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {authModalMode === 'signup' && role === 'employer' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization Name
              </label>
              <input
                id="auth-company-name-input"
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Leapfrog Technology, Khalti, etc."
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                id="auth-email-input"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password-input"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          {/* Biometrics & 2FA mock toggle */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={useBiometrics}
                onChange={e => setUseBiometrics(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-blue-600" />
                Enable Biometric / 2FA Security
              </span>
            </label>

            {authModalMode === 'login' && (
              <button
                type="button"
                onClick={() => showToast('Password reset instructions sent to your email.', 'info')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Forgot?
              </button>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              id="auth-submit-form-btn"
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {authModalMode === 'login'
                  ? `Sign In as ${role === 'employer' ? 'Recruiter' : 'Job Seeker'}`
                  : `Create ${role === 'employer' ? 'Employer' : 'Candidate'} Account`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Toggle Login vs Sign Up Mode */}
        <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
          {authModalMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                id="switch-to-signup-btn"
                type="button"
                onClick={() => setAuthModalMode('signup')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Create one free
              </button>
            </span>
          ) : (
            <span>
              Already registered on Rojgaar?{' '}
              <button
                id="switch-to-login-btn"
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Sign in now
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
