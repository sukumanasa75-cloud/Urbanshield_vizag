import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RiskMap from './components/RiskMap';
import AreaAnalysis from './components/AreaAnalysis';
import PredictionsDashboard from './components/PredictionsDashboard';
import WhatIfSimulator from './components/WhatIfSimulator';
import CompareAreas from './components/CompareAreas';
import Recommendations from './components/Recommendations';
import EarlyWarnings from './components/EarlyWarnings';
import AreaReportModal from './components/AreaReportModal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { VIZAG_AREAS } from './data/vizagData';
import { 
  ShieldAlert, 
  MapPin, 
  Sliders, 
  TrendingUp, 
  Lightbulb, 
  AlertTriangle,
  ArrowRight,
  Compass
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArea, setSelectedArea] = useState(VIZAG_AREAS[0]); // Defaults to Gajuwaka
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Smooth scroll to top on tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAnalysis = (area) => {
    if (area) setSelectedArea(area);
    setActiveTab('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSimulator = (area) => {
    if (area) setSelectedArea(area);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPredictions = (area) => {
    if (area) setSelectedArea(area);
    setActiveTab('predictions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRecommendations = () => {
    setActiveTab('recommendations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        onOpenReport={() => setReportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <Hero
              onExploreMap={() => handleTabChange('map')}
              onRunPrediction={() => handleTabChange('predictions')}
              onSelectStep={(step) => {
                if (step === 'monitor') handleTabChange('map');
                if (step === 'predict') handleTabChange('predictions');
                if (step === 'warn') handleTabChange('analysis');
                if (step === 'act') handleTabChange('simulator');
              }}
            />

            {/* Early Warning Feed */}
            <EarlyWarnings onSelectArea={handleNavigateToAnalysis} />

            {/* Interactive Visakhapatnam Risk Map */}
            <div className="border-t border-slate-900 pt-8">
              <RiskMap
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                onNavigateToAnalysis={handleNavigateToAnalysis}
                onNavigateToSimulator={handleNavigateToSimulator}
              />
            </div>

            {/* Area Analysis Preview */}
            <div className="border-t border-slate-900 pt-8">
              <AreaAnalysis
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                onNavigateToSimulator={handleNavigateToSimulator}
                onNavigateToPredictions={handleNavigateToPredictions}
                onOpenReport={() => setReportModalOpen(true)}
              />
            </div>

            {/* What-If Simulator Flagship Section */}
            <div className="border-t border-slate-900 pt-8">
              <WhatIfSimulator
                selectedArea={selectedArea}
                setSelectedArea={setSelectedArea}
                onNavigateToRecommendations={handleNavigateToRecommendations}
              />
            </div>

            {/* Compare Two Areas */}
            <div className="border-t border-slate-900 pt-8">
              <CompareAreas
                initialArea1={selectedArea}
                onSelectAreaForInspection={handleNavigateToAnalysis}
              />
            </div>

            {/* Actionable Recommendations */}
            <div className="border-t border-slate-900 pt-8">
              <Recommendations
                selectedArea={selectedArea}
                onNavigateToSimulator={handleNavigateToSimulator}
              />
            </div>

            {/* About & Philosophy */}
            <div className="border-t border-slate-900 pt-8">
              <AboutSection
                onExploreMap={() => handleTabChange('map')}
                onRunSimulator={() => handleTabChange('simulator')}
              />
            </div>
          </div>
        )}

        {/* VIEW: RISK MAP */}
        {activeTab === 'map' && (
          <div className="py-6 animate-fade-in">
            <RiskMap
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              onNavigateToAnalysis={handleNavigateToAnalysis}
              onNavigateToSimulator={handleNavigateToSimulator}
            />
            {/* Quick Warning Ticker below map */}
            <div className="mt-8">
              <EarlyWarnings onSelectArea={handleNavigateToAnalysis} />
            </div>
          </div>
        )}

        {/* VIEW: AREA ANALYSIS */}
        {activeTab === 'analysis' && (
          <div className="py-6 animate-fade-in">
            <AreaAnalysis
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              onNavigateToSimulator={handleNavigateToSimulator}
              onNavigateToPredictions={handleNavigateToPredictions}
              onOpenReport={() => setReportModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW: PREDICTIONS */}
        {activeTab === 'predictions' && (
          <div className="py-6 animate-fade-in">
            <PredictionsDashboard
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
            />
          </div>
        )}

        {/* VIEW: WHAT-IF SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="py-6 animate-fade-in">
            <WhatIfSimulator
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              onNavigateToRecommendations={handleNavigateToRecommendations}
            />
          </div>
        )}

        {/* VIEW: COMPARE */}
        {activeTab === 'compare' && (
          <div className="py-6 animate-fade-in">
            <CompareAreas
              initialArea1={selectedArea}
              onSelectAreaForInspection={handleNavigateToAnalysis}
            />
          </div>
        )}

        {/* VIEW: RECOMMENDATIONS */}
        {activeTab === 'recommendations' && (
          <div className="py-6 animate-fade-in">
            <Recommendations
              selectedArea={selectedArea}
              onNavigateToSimulator={handleNavigateToSimulator}
            />
          </div>
        )}

        {/* VIEW: ABOUT */}
        {activeTab === 'about' && (
          <div className="py-6 animate-fade-in">
            <AboutSection
              onExploreMap={() => handleTabChange('map')}
              onRunSimulator={() => handleTabChange('simulator')}
            />
          </div>
        )}

      </main>

      {/* Area Printable/Exportable Report Modal */}
      {reportModalOpen && (
        <AreaReportModal
          area={selectedArea}
          onClose={() => setReportModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        setSelectedArea={setSelectedArea}
      />

    </div>
  );
}
