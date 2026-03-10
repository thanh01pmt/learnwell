import { mockContests, mockProblems, mockStandings } from '@/mocks';
import type { 
  Contest, 
  ContestStanding,
  Problem,
  CodeSubmission 
} from '@/types/models';
import type { IContestService } from './types';

export class MockContestService implements IContestService {
  async getContests(filters?: { status?: Contest['status'] }): Promise<Contest[]> {
    let contests = [...mockContests];
    if (filters?.status) {
      contests = contests.filter(c => c.status === filters.status);
    }
    return contests;
  }

  async getContest(contestId: string): Promise<Contest | null> {
    const contest = mockContests.find(c => c.id === contestId);
    return contest || null;
  }

  async getStandings(contestId: string): Promise<ContestStanding[]> {
    return mockStandings;
  }

  async getProblems(): Promise<Problem[]> {
    return mockProblems;
  }

  async getProblem(problemId: string): Promise<Problem | null> {
    const problem = mockProblems.find(p => p.id === problemId);
    return problem || null;
  }

  async registerForContest(contestId: string, userId: string): Promise<void> {
    return;
  }

  async submitCode(submission: Omit<CodeSubmission, 'id' | 'verdict' | 'submittedAt'>): Promise<CodeSubmission> {
    return {
      ...submission,
      id: Math.random().toString(),
      verdict: 'Accepted',
      submittedAt: new Date().toISOString()
    } as any;
  }
}

export { mockContests, mockProblems, mockStandings };
