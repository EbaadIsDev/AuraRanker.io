export type AuraType = 'mystic' | 'alpha' | 'chaotic' | 'chill' | 'regal' | 'menacing' | 'soft';

export interface AuraProfile {
  id: string;
  username: string;
  avatar?: string;
  tagline: string;
  auras: Record<AuraType, number>;
  createdAt: number;
  totalVotes: number;
}

export interface AuraVote {
  profileId: string;
  auraType: AuraType;
}

export interface BattleResult {
  winnerId: string;
  loserId: string;
  timestamp: number;
}