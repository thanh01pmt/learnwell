import type { 
  Contest, 
  ContestStanding,
  Problem,
  CodeSubmission 
} from '@/types/models';

export interface IContestService {
  getContests(filters?: { status?: Contest['status'] }): Promise<Contest[]>;
  getContest(contestId: string): Promise<Contest | null>;
  getStandings(contestId: string): Promise<ContestStanding[]>;
  getProblems(): Promise<Problem[]>;
  getProblem(problemId: string): Promise<Problem | null>;
  registerForContest(contestId: string, userId: string): Promise<void>;
  submitCode(submission: Omit<CodeSubmission, 'id' | 'verdict' | 'submittedAt'>): Promise<CodeSubmission>;
}
