import { getSupabaseClient } from '@/config';
import type { 
  Contest, 
  ContestStanding,
  Problem,
  CodeSubmission 
} from '@/types/models';
import type { IContestService } from './types';

export class SupabaseContestService implements IContestService {
  async getContests(filters?: { status?: Contest['status'] }): Promise<Contest[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase.from('contests').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('start_time', { ascending: true });
    if (error) throw error;

    return (data as any[]).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      status: row.status,
      startTime: row.start_time,
      endTime: row.end_time,
      durationMinutes: row.duration_minutes,
      problemIds: row.problem_ids,
      rules: row.rules,
      prizes: row.prizes ?? undefined,
      maxParticipants: row.max_participants ?? undefined,
      registeredCount: row.registered_count,
      bannerUrl: row.banner_url ?? undefined,
      createdBy: row.created_by,
      createdAt: row.created_at,
    }));
  }

  async getContest(contestId: string): Promise<Contest | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', contestId)
      .single();

    if (error) throw error;

    const row = data as any;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      type: row.type,
      status: row.status,
      startTime: row.start_time,
      endTime: row.end_time,
      durationMinutes: row.duration_minutes,
      problemIds: row.problem_ids,
      rules: row.rules,
      prizes: row.prizes ?? undefined,
      maxParticipants: row.max_participants ?? undefined,
      registeredCount: row.registered_count,
      bannerUrl: row.banner_url ?? undefined,
      createdBy: row.created_by,
      createdAt: row.created_at,
    };
  }

  async getStandings(contestId: string): Promise<ContestStanding[]> {
    return [];
  }

  async getProblems(): Promise<Problem[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('difficulty', { ascending: true });

    if (error) throw error;

    return (data as any[]).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      description: row.description,
      difficulty: row.difficulty,
      tags: row.tags,
      constraints: row.constraints,
      inputFormat: row.input_format,
      outputFormat: row.output_format,
      sampleInputs: row.sample_inputs,
      sampleOutputs: row.sample_outputs,
      timeLimitMs: row.time_limit_ms,
      memoryLimitMb: row.memory_limit_mb,
      testCases: [],
      solvedCount: row.solved_count,
      acceptanceRate: row.acceptance_rate,
      createdAt: row.created_at,
    }));
  }

  async getProblem(problemId: string): Promise<Problem | null> {
    return null;
  }

  async registerForContest(contestId: string, userId: string): Promise<void> {
    return;
  }

  async submitCode(submission: Omit<CodeSubmission, 'id' | 'verdict' | 'submittedAt'>): Promise<CodeSubmission> {
    return submission as CodeSubmission;
  }
}
