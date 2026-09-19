import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickStats } from './components/QuickStats';
import { CategorySection } from './components/CategorySection';
import { FeaturedJobs } from './components/FeaturedJobs';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CompanySpotlight } from './components/CompanySpotlight';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { PricingSection } from './components/PricingSection';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { DashboardView } from './components/DashboardView';
import { Footer } from './components/Footer';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyJobModal } from './components/ApplyJobModal';
import { AuthModal } from './components/AuthModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {currentView === 'home' && (
          <>
            <HeroSection />
            <QuickStats />
            <CategorySection />
            <FeaturedJobs />
            <WhyChooseUs />
            <CompanySpotlight />
            <HowItWorks />
            <Testimonials />
            <PricingSection />
            <BlogSection />
          </>
        )}

        {currentView === 'jobs' && (
          <div className="py-8">
            <FeaturedJobs />
          </div>
        )}

        {currentView === 'companies' && (
          <div className="py-8">
            <CompanySpotlight />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <HowItWorks />
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <AboutSection />
        )}

        {currentView === 'blog' && (
          <div className="py-8">
            <BlogSection />
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="py-8">
            <PricingSection />
          </div>
        )}

        {currentView === 'dashboard' && (
          <DashboardView />
        )}
      </div>

      <Footer />

      {/* Global Modals */}
      <JobDetailModal />
      <ApplyJobModal />
      <AuthModal />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <Navbar />
        <MainContent />
      </div>
    </AppProvider>
  );
}
