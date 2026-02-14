
import React, { useState, useEffect } from 'react';
import { UI_COLORS } from '../constants';

interface SmartPlayerProps {
  onClose: () => void;
  focusedControl: number;
  isQualityMenuOpen: boolean;
  focusedQualityIndex: number;
  currentQuality: string;
}

const QUALITY_OPTIONS = ['240p', '720p', '1080p', '4K'];

const SmartPlayer: React.FC<SmartPlayerProps> = ({ 
  onClose, 
  focusedControl, 
  isQualityMenuOpen, 
  focusedQualityIndex,
  currentQuality 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isQualityMenuOpen) setShowControls(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [focusedControl, isQualityMenuOpen]);

  const controls = [
    { label: 'Audio', icon: '🗣️' },
    { label: 'Prev', icon: '⏮️' },
    { label: 'Play/Pause', icon: isPlaying ? '⏸️' : '▶️' },
    { label: 'Next', icon: '⏭️' },
    { label: 'Quality', icon: '⚙️' }
  ];

  return (
    <div className="absolute inset-0 bg-black flex flex-col z-50 overflow-hidden">
      {/* Simulation of Video Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?nature=1" 
          className="w-full h-full object-cover opacity-60 transition-all duration-700" 
          style={{ filter: isQualityMenuOpen ? 'blur(10px) brightness(0.5)' : 'none' }}
          alt="Video stream" 
        />
        <div className="absolute inset-0 leanback-gradient" />
      </div>

      {/* Header */}
      <div className={`z-10 p-8 flex justify-between items-start transition-opacity duration-500 ${showControls || focusedControl === -1 || isQualityMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Sintel: Open Movie Project</h2>
          <div className="flex space-x-4 items-center">
            <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-blue-400 uppercase tracking-tighter">{currentQuality} ULTRA HD</span>
            <span className="px-2 py-1 bg-white/10 rounded text-xs font-bold text-green-400">60 FPS</span>
            <span className="text-gray-400 text-sm">HLS Stream (AES-128)</span>
          </div>
        </div>
        <div className="bg-red-600 px-4 py-2 rounded-lg font-bold shadow-lg">LIVE</div>
      </div>

      {/* Center Playback Indicator */}
      {!isPlaying && !isQualityMenuOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-24 h-24 bg-blue-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-500">
            <span className="text-5xl">▶️</span>
          </div>
        </div>
      )}

      {/* Quality Menu Overlay */}
      {isQualityMenuOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/40 backdrop-blur-sm">
          <div className="w-80 bg-[#12121e] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-6 px-2">Select Quality</h3>
            <div className="space-y-2">
              {QUALITY_OPTIONS.map((q, idx) => {
                const isFocused = focusedQualityIndex === idx;
                const isActive = currentQuality === q;
                return (
                  <div
                    key={q}
                    className={`
                      flex items-center justify-between p-4 rounded-2xl transition-all duration-200
                      ${isFocused ? 'bg-blue-600 text-white translate-x-2' : 'bg-white/5 text-gray-400'}
                    `}
                    style={isFocused ? { boxShadow: `0 0 20px ${UI_COLORS.primary}80` } : {}}
                  >
                    <span className="font-bold text-lg">{q}</span>
                    {isActive && <span className={`text-sm ${isFocused ? 'text-white' : 'text-blue-400'}`}>✓</span>}
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-[10px] text-gray-600 text-center font-bold">Auto-selection optimized for 120Hz Displays</p>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className={`mt-auto z-10 p-12 transition-transform transition-opacity duration-500 ${showControls || focusedControl >= 0 || isQualityMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        {/* Progress Bar */}
        {!isQualityMenuOpen && (
          <div className="mb-8 group">
            <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
              <span>12:44</span>
              <span>24:00</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-center space-x-6">
          {controls.map((ctrl, idx) => {
            const isFocused = !isQualityMenuOpen && focusedControl === idx;
            return (
              <div
                key={ctrl.label}
                className={`
                  focusable flex flex-col items-center justify-center w-20 h-20 rounded-full transition-all duration-300
                  ${isFocused ? 'bg-blue-600 scale-125 border-4 border-white' : 'bg-white/5'}
                  ${isQualityMenuOpen && idx === 4 ? 'opacity-20 grayscale' : ''}
                `}
                style={isFocused ? { boxShadow: `0 0 30px ${UI_COLORS.primary}` } : {}}
              >
                <span className="text-2xl">{ctrl.icon}</span>
                <span className={`text-[10px] mt-1 font-bold ${isFocused ? 'text-white' : 'text-gray-400'}`}>
                  {ctrl.label === 'Quality' ? currentQuality : ctrl.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Overlay for Ad Block */}
      {!isQualityMenuOpen && (
        <div className="absolute bottom-10 right-10 bg-blue-900/80 backdrop-blur-lg border border-blue-500/50 p-4 rounded-xl flex items-center space-x-3 z-30">
          <div className="bg-blue-500 p-1 rounded-full text-xs text-white">✓</div>
          <span className="text-sm font-semibold">Shield Active: Ads Cleaned</span>
        </div>
      )}
    </div>
  );
};

export default SmartPlayer;
