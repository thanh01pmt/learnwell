/**
 * Contest & Competitive Programming Domain Models
 */

// =============================================================================
// Problem
// =============================================================================

export type ProblemDifficulty = 'easy' | 'medium' | 'hard';
export type ProblemTag = 
  | 'array' 
  | 'string' 
  | 'dp' 
  | 'graph' 
  | 'tree' 
  | 'math' 
  | 'greedy' 
  | 'binary_search' 
  | 'two_pointers' 
  | 'sorting' 
  | 'recursion'
  | 'backtracking'
  | 'simulation';

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string; // Markdown
  difficulty: ProblemDifficulty;
  tags: ProblemTag[];
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleInputs: string[];
  sampleOutputs: string[];
  timeLimitMs: number;
  memoryLimitMb: number;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
  solvedCount: number;
  acceptanceRate: number;
  createdAt: string;
}

// =============================================================================
// Submission (Code)
// =============================================================================

export type ProgrammingLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'c';
export type SubmissionVerdict = 
  | 'pending' 
  | 'accepted' 
  | 'wrong_answer' 
  | 'time_limit_exceeded' 
  | 'memory_limit_exceeded' 
  | 'runtime_error' 
  | 'compilation_error';

export interface CodeSubmission {
  id: string;
  problemId: string;
  userId: string;
  contestId?: string;
  code: string;
  language: ProgrammingLanguage;
  verdict: SubmissionVerdict;
  executionTimeMs?: number;
  memoryUsedKb?: number;
  testCasesPassed: number;
  totalTestCases: number;
  score?: number;
  errorMessage?: string;
  submittedAt: string;
}

// =============================================================================
// Contest
// =============================================================================

export type ContestType = 'individual' | 'team' | '1v1' | 'relay';
export type ContestStatus = 'upcoming' | 'ongoing' | 'finished';

export interface Contest {
  id: string;
  title: string;
  description: string;
  type: ContestType;
  status: ContestStatus;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  problemIds: string[];
  rules: string;
  prizes?: string[];
  maxParticipants?: number;
  registeredCount: number;
  bannerUrl?: string;
  createdBy: string;
  createdAt: string;
}

export interface ContestRegistration {
  id: string;
  contestId: string;
  userId: string;
  teamId?: string;
  registeredAt: string;
  status: 'registered' | 'participating' | 'finished' | 'disqualified';
}

export interface ContestStanding {
  rank: number;
  userId: string;
  teamId?: string;
  teamName?: string;
  userName: string;
  avatarUrl?: string;
  score: number;
  penalty: number; // Total time penalty
  solvedProblems: number;
  problemResults: {
    problemId: string;
    solved: boolean;
    attempts: number;
    solvedAt?: string;
    score: number;
  }[];
}

// =============================================================================
// ELO Rating
// =============================================================================

export interface EloRating {
  userId: string;
  rating: number;
  maxRating: number;
  contestsParticipated: number;
  wins: number;
  losses: number;
  draws: number;
  rank: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'master';
  history: {
    contestId: string;
    date: string;
    oldRating: number;
    newRating: number;
    change: number;
  }[];
}

// =============================================================================
// Team / Clan
// =============================================================================

export interface Team {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  leaderId: string;
  memberIds: string[];
  maxMembers: number;
  totalXp: number;
  totalElo: number;
  wins: number;
  losses: number;
  createdAt: string;
}

export interface TeamMember {
  userId: string;
  teamId: string;
  role: 'leader' | 'co-leader' | 'member';
  joinedAt: string;
  contributedXp: number;
}

// =============================================================================
// Clans & Tournaments
// =============================================================================

export interface Clan extends Team {
    tag: string; // [DARK]
    treasury: {
        learnCoins: number;
        gems: number;
    };
    level: number;
    achievements: string[];
}

// =============================================================================
// Live Arena & Relay Mode
// =============================================================================

export interface RelayTurn {
    userId: string;
    startTime: string;
    endTime: string;
    codeSnapshot: string;
    isHandedOver: boolean;
}

export interface BattleFeedEntry {
    id: string;
    timestamp: string;
    message: string;
    type: 'match_start' | 'test_pass' | 'handover' | 'victory' | 'defeat' | 'system';
    payload?: any;
}

// =============================================================================
// AI Bot Arena
// =============================================================================

export interface AIBot {
    id: string;
    userId: string;
    name: string;
    code: string;
    language: ProgrammingLanguage;
    elo: number;
    tier: EloTier;
    winRate: number;
    computePower: number; // For simulations
    status: 'idle' | 'battling' | 'error';
    lastActive: string;
}

export type EloTier = 
    | 'Bronze' 
    | 'Silver' 
    | 'Gold' 
    | 'Platinum' 
    | 'Diamond' 
    | 'Master' 
    | 'Grand Master';
