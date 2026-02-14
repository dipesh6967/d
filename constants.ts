
import { SpeedDialItem } from './types';

export const TOP_SITES: SpeedDialItem[] = [
  { id: 'yt', name: 'YouTube', url: 'https://youtube.com/tv', icon: '📺', category: 'Entertainment' },
  { id: 'nf', name: 'Netflix', url: 'https://netflix.com', icon: '🎬', category: 'Entertainment' },
  { id: 'am', name: 'Prime Video', url: 'https://amazon.com/video', icon: '📦', category: 'Entertainment' },
  { id: 'tw', name: 'Twitch', url: 'https://twitch.tv', icon: '🎮', category: 'Gaming' },
];

export const UTILITIES: SpeedDialItem[] = [
  { id: 're', name: 'Reddit', url: 'https://reddit.com', icon: '🤖', category: 'Social' },
  { id: 'fb', name: 'Facebook', url: 'https://facebook.com', icon: '👥', category: 'Social' },
  { id: 'bb', name: 'BBC News', url: 'https://bbc.com/news', icon: '📰', category: 'News' },
  { id: 'gh', name: 'GitHub', url: 'https://github.com', icon: '💻', category: 'Tools' },
];

export const UI_COLORS = {
  primary: '#007BFF',
  background: '#04040a',
  surface: '#12121e',
  accent: '#FFD700', // Odin uses yellow/gold for some accents
};
