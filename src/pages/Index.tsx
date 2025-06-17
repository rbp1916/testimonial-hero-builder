
import React, { useState } from 'react';
import LandingSection from '../components/LandingSection';
import DemoSection from '../components/DemoSection';
import TestimonialForm from '../components/TestimonialForm';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'demo' | 'form' | 'dashboard'>('landing');
  const [userEmail, setUserEmail] = useState('');

  const navigateToDemo = () => {
    setCurrentView('demo');
  };

  const navigateToForm = () => {
    setCurrentView('form');
  };

  const navigateToDashboard = (email: string) => {
    setUserEmail(email);
    setCurrentView('dashboard');
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentView === 'landing' && (
        <LandingSection 
          onNavigateToDemo={navigateToDemo}
          onNavigateToDashboard={navigateToDashboard}
        />
      )}
      {currentView === 'demo' && (
        <DemoSection 
          onNavigateToForm={navigateToForm}
          onNavigateToLanding={navigateToLanding}
          onNavigateToDashboard={navigateToDashboard}
        />
      )}
      {currentView === 'form' && (
        <TestimonialForm 
          onNavigateToLanding={navigateToLanding}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard 
          userEmail={userEmail}
          onNavigateToLanding={navigateToLanding}
        />
      )}
    </div>
  );
};

export default Index;
