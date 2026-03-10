/**
 * Gamification Domain Models
 * LearnCoins, XP, achievements, badges, streaks
 */

// =============================================================================
// XP & Leveling
// =============================================================================

export interface XpTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  source: 'lesson' | 'quiz' | 'assignment' | 'contest' | 'streak' | 'achievement' | 'bonus';
  sourceId?: string;
  createdAt: string;
}

export interface LevelConfig {
  level: number;
  xpRequired: number;
  title: string;
  rewards?: {
    learnCoins?: number;
    gems?: number;
    unlocks?: string[];
  };
}

// =============================================================================
// LearnCoin Economy
// =============================================================================

export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number; // Positive = earned, Negative = spent
  type: 'earn' | 'spend' | 'refund' | 'transfer';
  description: string;
  referenceId?: string; // e.g., shop item ID, hint ID
  createdAt: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: 'avatar_frame' | 'theme' | 'boost' | 'streak_freeze' | 'hint' | 'cosmetic';
  priceCoins?: number;
  priceGems?: number;
  imageUrl: string;
  isLimited: boolean;
  stock?: number;
  expiresAt?: string;
  effects?: {
    type: string;
    value: number;
    durationHours?: number;
  };
}

export interface UserInventory {
  userId: string;
  items: {
    itemId: string;
    quantity: number;
    acquiredAt: string;
    expiresAt?: string;
  }[];
}

// =============================================================================
// Achievements & Badges
// =============================================================================

export type AchievementCategory = 
  | 'learning' 
  | 'coding' 
  | 'social' 
  | 'streak' 
  | 'milestone' 
  | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  iconUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  coinReward?: number;
  gemReward?: number;
  criteria: {
    type: string;
    target: number;
  };
  isHidden: boolean;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
  progress: number; // 0-100 before unlock
}

// =============================================================================
// Streaks
// =============================================================================

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  freezesAvailable: number;
  freezesUsed: number;
  streakHistory: {
    date: string;
    maintained: boolean;
    usedFreeze: boolean;
  }[];
}

// =============================================================================
// Leaderboard
// =============================================================================

export type LeaderboardType = 'xp' | 'coins' | 'streak' | 'problems_solved' | 'elo';
export type LeaderboardScope = 'global' | 'class' | 'school' | 'weekly' | 'monthly';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatarUrl?: string;
  value: number;
  previousRank?: number;
  badges?: string[];
}

export interface Leaderboard {
  type: LeaderboardType;
  scope: LeaderboardScope;
  entries: LeaderboardEntry[];
  lastUpdated: string;
  userRank?: LeaderboardEntry; // Current user's position
}

// =============================================================================
// Certificates & Credentials
// =============================================================================

export interface CredentialEvidence {
    id: string;
    title: string;
    url: string; // Link to project, report, or exam result
    type: 'project' | 'exam' | 'document' | 'other';
    description?: string;
}

export interface Credential {
    id: string;
    userId: string;
    title: string; // "Python Master"
    category: string; // "Programming", "Data Science"
    issuer: string; // "LearnWell Academy"
    issuedAt: string;
    expiryDate?: string;
    credentialUrl: string; // Public verification link
    pdfUrl?: string; // Download link
    criteria: Record<string, string>; // { "course": "Completed Python Advanced" }
    evidence: CredentialEvidence[];
    skills: string[]; // ["Python", "Algorithms"]
    isFeatured: boolean; // Show on profile
}
