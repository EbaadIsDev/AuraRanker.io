import { AuraProfile, BattleResult } from '../types';

// Default avatar URLs from Pexels
const defaultAvatars = [
  'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
];

export const mockProfiles: AuraProfile[] = [];
export const mockBattleResults: BattleResult[] = [];

export const auraDescriptions: Record<string, { description: string, icon: string }> = {
  mystic: {
    description: 'Ethereal, mysterious, spiritual, intuitive',
    icon: '✨'
  },
  alpha: {
    description: 'Confident, assertive, leader, dynamic',
    icon: '🔥'
  },
  chaotic: {
    description: 'Unpredictable, wild, energetic, disruptive',
    icon: '⚡'
  },
  chill: {
    description: 'Relaxed, easy-going, peaceful, laid-back',
    icon: '❄️'
  },
  regal: {
    description: 'Dignified, majestic, elegant, prestigious',
    icon: '👑'
  },
  menacing: {
    description: 'Intimidating, powerful, intense, formidable',
    icon: '⚔️'
  },
  soft: {
    description: 'Gentle, kind, nurturing, compassionate',
    icon: '🌸'
  }
};