import data from '../content/data.json';

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  unlockDate: string;
  description: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  emoji: string;
  description: string;
  content: string;
}

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video' | 'voice';
  mediaUrl: string;
  caption: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
}

export interface Coupon {
  id: number;
  title: string;
  description: string;
  emoji: string;
}

export const CHAPTERS: Chapter[] = data.chapters;
export const OPEN_WHEN_LETTERS: OpenWhenLetter[] = data.openWhenLetters;
export const MEMORIES: Memory[] = data.memories as Memory[];
export const SONGS: Song[] = data.songs;
export const DAILY_QUOTES: string[] = data.dailyQuotes;
export const COUPONS: Coupon[] = data.coupons;

export const SECRET_PASSWORD = data.secretPassword;
export const EASTER_EGG_KEYBOARD = data.easterEggKeyboard;
