
export interface SpeedDialItem {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: string;
}

export enum AppSection {
  DASHBOARD = 'dashboard',
  SEARCH = 'search',
  BROWSER = 'browser',
  PLAYER = 'player',
  BOOKMARKS = 'bookmarks',
  HISTORY = 'history',
  SETTINGS = 'settings'
}

export interface VideoStream {
  url: string;
  type: 'HLS' | 'MP4' | 'DASH';
  quality: string[];
  audioTracks: string[];
}

export interface FocusState {
  section: string;
  index: number;
}
