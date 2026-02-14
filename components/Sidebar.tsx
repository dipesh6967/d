
import React from 'react';
import { AppSection } from '../types';
import { UI_COLORS } from '../constants';

interface SidebarProps {
  activeSection: AppSection;
  focusedIndex: number;
  isSidebarFocused: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, focusedIndex, isSidebarFocused }) => {
  const items = [
    { id: AppSection.DASHBOARD, icon: '🏠', label: 'Home' },
    { id: AppSection.SEARCH, icon: '🔍', label: 'Search' },
    { id: AppSection.BOOKMARKS, icon: '⭐', label: 'Bookmarks' },
    { id: AppSection.HISTORY, icon: '🕒', label: 'History' },
    { id: AppSection.SETTINGS, icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div 
      className={`h-full bg-[#0a0a14] border-r border-white/5 flex flex-col items-center py-8 transition-all duration-500 ease-in-out z-20 shadow-2xl ${isSidebarFocused ? 'w-64' : 'w-24'}`}
    >
      <div className="mb-10 flex items-center justify-center">
        <div className={`w-12 h-12 bg-gradient-to-tr from-blue-700 to-blue-400 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl transition-all duration-500 ${isSidebarFocused ? 'rotate-0' : 'rotate-12'}`}>
          O
        </div>
        {isSidebarFocused && <span className="ml-4 font-bold text-xl tracking-tighter">ODIN BROWSER</span>}
      </div>

      <nav className="flex-1 w-full px-4 space-y-4">
        {items.map((item, idx) => {
          const isFocused = isSidebarFocused && focusedIndex === idx;
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.id}
              className={`
                flex items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer
                ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}
                ${isFocused ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-900/40' : ''}
              `}
              style={isFocused ? { boxShadow: `0 0 20px ${UI_COLORS.primary}80` } : {}}
            >
              <span className="text-2xl min-w-[32px] text-center">{item.icon}</span>
              <span className={`ml-4 font-bold whitespace-nowrap transition-all duration-500 ${isSidebarFocused ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      <div className={`p-4 transition-all duration-500 ${isSidebarFocused ? 'opacity-100' : 'opacity-0 scale-50'}`}>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-[10px] text-gray-500 font-mono">
          <p className="text-blue-400 font-bold mb-1">PRO EDITION</p>
          <p>AdBlock: Active</p>
          <p>VPN: Disabled</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
