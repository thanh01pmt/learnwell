import type { 
  Contest, 
  ContestStanding,
  Problem 
} from '@/types/models';

export const mockContests: Contest[] = [
  {
    id: 'contest1',
    title: 'Weekly Challenge #42',
    description: 'contests:mock.weeklyChallengeDesc',
    type: 'individual',
    status: 'upcoming',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 120,
    problemIds: ['prob1', 'prob2', 'prob3'],
    rules: 'ACM-ICPC style scoring',
    registeredCount: 156,
    createdBy: '2',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'contest2',
    title: 'contests:mock.teamBattleAlgoArena',
    description: 'contests:mock.teamBattle3People',
    type: 'team',
    status: 'ongoing',
    startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    durationMinutes: 120,
    problemIds: ['prob4', 'prob5', 'prob6', 'prob7'],
    rules: 'Team scoring with time penalty',
    registeredCount: 45,
    createdBy: '2',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockProblems: Problem[] = [
  {
    id: 'prob1',
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    difficulty: 'easy',
    tags: ['array', 'two_pointers'],
    constraints: '2 <= nums.length <= 10^4',
    inputFormat: 'First line: n (array length), Second line: n space-separated integers',
    outputFormat: 'Two space-separated indices',
    sampleInputs: ['4\n2 7 11 15\n9'],
    sampleOutputs: ['0 1'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    testCases: [],
    solvedCount: 1234,
    acceptanceRate: 78.5,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockStandings: ContestStanding[] = [
  {
    rank: 1,
    userId: 'user1',
    userName: 'CodeMaster',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=codemaster',
    score: 300,
    penalty: 45,
    solvedProblems: 3,
    problemResults: [],
  },
];
