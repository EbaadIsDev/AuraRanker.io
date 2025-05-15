import { AuraProfile, AuraVote, BattleResult } from '../types';
import { mockProfiles, mockBattleResults } from '../data/mockData';

// Local storage keys
const PROFILES_KEY = 'auraranker_profiles';
const BATTLE_RESULTS_KEY = 'auraranker_battles';
const VOTES_KEY = 'auraranker_votes';

// Initialize local storage with mock data if empty
export const initializeLocalStorage = (): void => {
  if (!localStorage.getItem(PROFILES_KEY)) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(mockProfiles));
  }
  
  if (!localStorage.getItem(BATTLE_RESULTS_KEY)) {
    localStorage.setItem(BATTLE_RESULTS_KEY, JSON.stringify(mockBattleResults));
  }
  
  if (!localStorage.getItem(VOTES_KEY)) {
    localStorage.setItem(VOTES_KEY, JSON.stringify([]));
  }
};

// Get all profiles
export const getProfiles = (): AuraProfile[] => {
  const profiles = localStorage.getItem(PROFILES_KEY);
  return profiles ? JSON.parse(profiles) : [];
};

// Get a single profile by ID
export const getProfileById = (id: string): AuraProfile | undefined => {
  const profiles = getProfiles();
  return profiles.find(profile => profile.id === id);
};

// Save a new profile
export const saveProfile = (profile: Omit<AuraProfile, 'id' | 'createdAt' | 'auras' | 'totalVotes'>): AuraProfile => {
  const profiles = getProfiles();
  
  // Create a new profile with default values
  const newProfile: AuraProfile = {
    id: Math.random().toString(36).substring(2, 15),
    username: profile.username,
    avatar: profile.avatar,
    tagline: profile.tagline,
    auras: {
      mystic: 0,
      alpha: 0,
      chaotic: 0,
      chill: 0,
      regal: 0,
      menacing: 0,
      soft: 0
    },
    createdAt: Date.now(),
    totalVotes: 0
  };
  
  // Add to profiles array
  profiles.push(newProfile);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  
  return newProfile;
};

// Update a profile's aura with a new vote
export const updateProfileAura = (vote: AuraVote): void => {
  const profiles = getProfiles();
  const profileIndex = profiles.findIndex(p => p.id === vote.profileId);
  
  if (profileIndex !== -1) {
    // Update the aura value
    profiles[profileIndex].auras[vote.auraType] += 1;
    profiles[profileIndex].totalVotes += 1;
    
    // Save updated profiles
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    
    // Save the vote
    const votes = getVotes();
    votes.push({
      profileId: vote.profileId,
      auraType: vote.auraType,
      timestamp: Date.now()
    });
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  }
};

// Get all battle results
export const getBattleResults = (): BattleResult[] => {
  const results = localStorage.getItem(BATTLE_RESULTS_KEY);
  return results ? JSON.parse(results) : [];
};

// Save a new battle result
export const saveBattleResult = (winnerId: string, loserId: string): void => {
  const battles = getBattleResults();
  
  // Create new battle result
  const newBattle: BattleResult = {
    winnerId,
    loserId,
    timestamp: Date.now()
  };
  
  // Add to battles array
  battles.push(newBattle);
  localStorage.setItem(BATTLE_RESULTS_KEY, JSON.stringify(battles));
  
  // Update winner aura strength
  const profiles = getProfiles();
  const winnerIndex = profiles.findIndex(p => p.id === winnerId);
  
  if (winnerIndex !== -1) {
    // Boost all aura values by 1 for the winner
    Object.keys(profiles[winnerIndex].auras).forEach(aura => {
      profiles[winnerIndex].auras[aura as keyof typeof profiles[winnerIndex].auras] += 1;
    });
    profiles[winnerIndex].totalVotes += 7; // 7 aura types
    
    // Save updated profiles
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }
};

// Get all votes
export const getVotes = (): (AuraVote & { timestamp: number })[] => {
  const votes = localStorage.getItem(VOTES_KEY);
  return votes ? JSON.parse(votes) : [];
};