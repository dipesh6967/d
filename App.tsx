
import React, { useState, useEffect, useCallback } from 'react';
import { AppSection, SpeedDialItem } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SmartPlayer from './components/SmartPlayer';
import { TOP_SITES, UTILITIES } from './constants';
import { getSmartNews } from './services/geminiService';

const QUALITY_OPTIONS = ['240p', '720p', '1080p', '4K'];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [focusedArea, setFocusedArea] = useState<'sidebar' | 'content' | 'topbar'>('content');
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  // Player specific state
  const [playerControlIndex, setPlayerControlIndex] = useState(-1);
  const [playerSubMode, setPlayerSubMode] = useState<'none' | 'quality'>('none');
  const [focusedQualityIndex, setFocusedQualityIndex] = useState(2); // Default to 1080p focus
  const [currentQuality, setCurrentQuality] = useState('1080p');

  const [trending, setTrending] = useState<{ title: string; summary: string }[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const news = await getSmartNews();
      setTrending(news);
    };
    fetchNews();
  }, []);

  const totalContentItems = TOP_SITES.length + UTILITIES.length;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Handle Player Navigation separately
    if (activeSection === AppSection.PLAYER) {
      if (['Escape', 'Back', 'Backspace'].includes(e.key)) {
        if (playerSubMode !== 'none') {
          setPlayerSubMode('none');
        } else {
          setActiveSection(AppSection.DASHBOARD);
          setPlayerControlIndex(-1);
        }
        return;
      }

      if (playerSubMode === 'quality') {
        if (e.key === 'ArrowUp') setFocusedQualityIndex(prev => Math.max(prev - 1, 0));
        if (e.key === 'ArrowDown') setFocusedQualityIndex(prev => Math.min(prev + 1, QUALITY_OPTIONS.length - 1));
        if (e.key === 'Enter') {
          setCurrentQuality(QUALITY_OPTIONS[focusedQualityIndex]);
          setPlayerSubMode('none');
        }
        return;
      }

      if (e.key === 'ArrowRight') setPlayerControlIndex(prev => Math.min(prev + 1, 4));
      if (e.key === 'ArrowLeft') setPlayerControlIndex(prev => Math.max(prev - 1, 0));
      if (e.key === 'Enter') {
        if (playerControlIndex === 4) { // Quality Button
          setPlayerSubMode('quality');
          setFocusedQualityIndex(QUALITY_OPTIONS.indexOf(currentQuality));
        }
      }
      return;
    }

    // Main Dashboard Navigation
    switch (e.key) {
      case 'ArrowRight':
        if (focusedArea === 'sidebar') {
          setFocusedArea('content');
          setFocusedIndex(0);
        } else if (focusedArea === 'content') {
          setFocusedIndex(prev => Math.min(prev + 1, totalContentItems - 1));
        }
        break;
      case 'ArrowLeft':
        if (focusedArea === 'content') {
          if (focusedIndex % 4 === 0) {
            setFocusedArea('sidebar');
            setFocusedIndex(0);
          } else {
            setFocusedIndex(prev => Math.max(prev - 1, 0));
          }
        } else if (focusedArea === 'topbar') {
          setFocusedArea('sidebar');
          setFocusedIndex(1);
        }
        break;
      case 'ArrowUp':
        if (focusedArea === 'content') {
          if (focusedIndex < 4) {
            setFocusedArea('topbar');
          } else {
            setFocusedIndex(prev => Math.max(prev - 4, 0));
          }
        } else {
          setFocusedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
      case 'ArrowDown':
        if (focusedArea === 'topbar') {
          setFocusedArea('content');
          setFocusedIndex(0);
        } else if (focusedArea === 'content') {
          setFocusedIndex(prev => Math.min(prev + 4, totalContentItems - 1));
        } else {
          setFocusedIndex(prev => Math.min(prev + 1, 4));
        }
        break;
      case 'Enter':
        if (focusedArea === 'sidebar') {
          const sections = [AppSection.DASHBOARD, AppSection.SEARCH, AppSection.BOOKMARKS, AppSection.HISTORY, AppSection.SETTINGS];
          setActiveSection(sections[focusedIndex]);
          setFocusedArea('content');
          setFocusedIndex(0);
        } else if (focusedArea === 'topbar') {
          setActiveSection(AppSection.SEARCH);
        } else if (activeSection === AppSection.DASHBOARD) {
          setActiveSection(AppSection.PLAYER);
          setPlayerControlIndex(2);
        }
        break;
      case 'Escape':
      case 'Back':
      case 'Backspace':
        if (activeSection !== AppSection.DASHBOARD) {
          setActiveSection(AppSection.DASHBOARD);
        }
        break;
    }
  }, [activeSection, focusedArea, focusedIndex, totalContentItems, playerControlIndex, playerSubMode, focusedQualityIndex, currentQuality]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD:
        return (
          <Dashboard
            focusedArea={focusedArea}
            focusedIndex={focusedIndex}
            onSelect={() => setActiveSection(AppSection.PLAYER)}
            trending={trending}
          />
        );
      case AppSection.PLAYER:
        return (
          <SmartPlayer
            onClose={() => setActiveSection(AppSection.DASHBOARD)}
            focusedControl={playerControlIndex}
            isQualityMenuOpen={playerSubMode === 'quality'}
            focusedQualityIndex={focusedQualityIndex}
            currentQuality={currentQuality}
          />
        );
      case AppSection.SEARCH:
      case AppSection.BROWSER:
        return (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#04040a] p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 scale-125">
                <div className="text-9xl mb-12 animate-bounce">🌐</div>
                <h2 className="text-4xl font-black mb-6 tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">GeckoView Core 124</h2>
                <p className="text-gray-400 max-w-xl text-lg font-medium">
                  Optimized for 4K TV displays. Hardware-accelerated rendering.
                </p>
                <div className="mt-16 flex space-x-4 justify-center">
                    <div className="bg-blue-600 px-8 py-4 rounded-3xl font-bold shadow-xl shadow-blue-900/40">OPEN BROWSER</div>
                    <div className="bg-white/5 px-8 py-4 rounded-3xl font-bold border border-white/10">SETTINGS</div>
                </div>
            </div>
          </div>
        );
      default:
        return <div className="flex-1 flex items-center justify-center bg-[#04040a]">
          <div className="text-center opacity-20">
            <div className="text-8xl mb-4">⚙️</div>
            <div className="text-2xl font-bold uppercase tracking-[1em] ml-[1em]">System Modules</div>
          </div>
        </div>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#04040a] text-white overflow-hidden select-none">
      {activeSection !== AppSection.PLAYER && (
        <Sidebar
          activeSection={activeSection}
          focusedIndex={focusedIndex}
          isSidebarFocused={focusedArea === 'sidebar'}
        />
      )}
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {renderContent()}
      </main>

      <div className="absolute top-8 right-8 flex items-center space-x-6 z-30">
        <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#007BFF]" />
            <span className="text-[10px] font-bold tracking-widest text-gray-300">SYSTEM STABLE</span>
        </div>
        <div className="text-xl font-bold opacity-70">8:42 PM</div>
      </div>
    </div>
  );
};

export default App;
