
import React from 'react';
import { SpeedDialItem } from '../types';
import { TOP_SITES, UTILITIES, UI_COLORS } from '../constants';

interface DashboardProps {
  focusedArea: 'sidebar' | 'content' | 'topbar';
  focusedIndex: number;
  onSelect: (item: SpeedDialItem) => void;
  trending: { title: string; summary: string }[];
}

const Dashboard: React.FC<DashboardProps> = ({ focusedArea, focusedIndex, onSelect, trending }) => {
  // Logic to determine which item is focused based on a single flat index
  // 0-3: Top Sites, 4-7: Utilities, -1 for Top Bar
  
  const isTopBarFocused = focusedArea === 'topbar';
  const isContentFocused = focusedArea === 'content';

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-gradient-to-b from-[#0a0a14] to-[#04040a]">
      {/* Top Navigation Bar */}
      <div className="p-8 pb-4">
        <div 
          className={`
            w-full bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center transition-all duration-300
            ${isTopBarFocused ? 'bg-white/10 ring-4 ring-blue-500/50 border-blue-400 scale-[1.01]' : ''}
          `}
        >
          <span className="text-xl mr-4 opacity-50">🔍</span>
          <div className="flex-1 text-gray-400 font-medium">Search or enter web address</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>SHIELD ACTIVE</span>
            </div>
            <span className="text-xl opacity-50">🎙️</span>
          </div>
        </div>
      </div>

      <div className="p-8 pt-4 space-y-12">
        {/* Recommended Row */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight">Recommended</h2>
            <span className="text-xs text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-full">PINNED</span>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {TOP_SITES.map((item, idx) => {
              const isFocused = isContentFocused && focusedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={`
                    focusable group relative aspect-video bg-[#1a1a2e] rounded-3xl flex flex-col items-center justify-center cursor-pointer border-2 border-transparent transition-all duration-300
                    ${isFocused ? 'bg-[#252545] -translate-y-2' : ''}
                  `}
                  style={isFocused ? { 
                    borderColor: UI_COLORS.primary,
                    boxShadow: `0 30px 60px -15px rgba(0, 123, 255, 0.5)`
                  } : {}}
                >
                  <div className={`text-6xl mb-3 transition-transform duration-500 ${isFocused ? 'scale-110 rotate-3' : ''}`}>
                    {item.icon}
                  </div>
                  <div className={`font-bold text-lg transition-colors ${isFocused ? 'text-white' : 'text-gray-400'}`}>
                    {item.name}
                  </div>
                  {isFocused && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Global News (Gemini Powered) */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <h2 className="text-xl font-bold tracking-tight">Latest from Gemini News</h2>
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 px-2 py-0.5 rounded text-[10px] font-black italic">AI</span>
          </div>
          <div className="flex space-x-6 overflow-x-hidden">
            {trending.length > 0 ? trending.map((t, idx) => (
              <div key={idx} className="flex-shrink-0 w-96 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-8 rounded-3xl border border-white/5 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <span className="text-6xl">📰</span>
                </div>
                <h3 className="font-extrabold text-blue-400 text-lg mb-3 line-clamp-1 leading-tight">{t.title}</h3>
                <p className="text-gray-400 leading-relaxed line-clamp-2 text-sm">{t.summary}</p>
              </div>
            )) : (
              <div className="w-full h-32 bg-white/5 rounded-3xl flex items-center justify-center animate-pulse text-gray-600 font-bold border border-white/5">
                Connecting to News Cloud...
              </div>
            )}
          </div>
        </section>

        {/* Utilities Row */}
        <section className="pb-20">
          <h2 className="text-xl font-bold tracking-tight mb-6">Utilities & Social</h2>
          <div className="grid grid-cols-4 gap-6">
            {UTILITIES.map((item, idx) => {
              const isFocused = isContentFocused && focusedIndex === (idx + 4);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={`
                    focusable group p-6 bg-[#12121e] rounded-3xl flex items-center space-x-6 cursor-pointer border-2 border-transparent transition-all duration-300
                    ${isFocused ? 'bg-[#1e1e30] border-blue-500 scale-[1.02]' : ''}
                  `}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <div className={`font-bold ${isFocused ? 'text-white' : 'text-gray-400'}`}>{item.name}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
