/**
 * Contest Data Hooks
 * React Query hooks for contests and competitive programming
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { contestService } from '@/services';
import type { 
  Contest, 
  CodeSubmission 
} from '@/types/models';

/**
 * Get list of contests
 */
export function useContests(filters?: { status?: Contest['status'] }) {
  return useQuery({
    queryKey: queryKeys.contests.list(filters),
    queryFn: () => contestService.getContests(filters),
  });
}

/**
 * Get upcoming contests
 */
export function useUpcomingContests() {
  return useContests({ status: 'upcoming' });
}

/**
 * Get ongoing contests
 */
export function useOngoingContests() {
  return useContests({ status: 'ongoing' });
}

/**
 * Get single contest by ID
 */
export function useContest(contestId: string) {
  return useQuery({
    queryKey: queryKeys.contests.detail(contestId),
    queryFn: () => contestService.getContest(contestId),
    enabled: !!contestId,
  });
}

/**
 * Get contest standings/leaderboard
 */
export function useContestStandings(contestId: string) {
  return useQuery({
    queryKey: queryKeys.contests.standings(contestId),
    queryFn: () => contestService.getStandings(contestId),
    enabled: !!contestId,
    refetchInterval: 30000, // Refresh every 30 seconds during contest
  });
}

/**
 * Get all problems
 */
export function useProblems() {
  return useQuery({
    queryKey: queryKeys.contests.problems(),
    queryFn: () => contestService.getProblems(),
  });
}

/**
 * Get single problem by ID
 */
export function useProblem(problemId: string) {
  return useQuery({
    queryKey: queryKeys.contests.problem(problemId),
    queryFn: () => contestService.getProblem(problemId),
    enabled: !!problemId,
  });
}

/**
 * Register for a contest
 */
export function useRegisterForContest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contestId, userId }: { contestId: string; userId: string }) =>
      contestService.registerForContest(contestId, userId),
    onSuccess: (_, { contestId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contests.detail(contestId) });
    },
  });
}

/**
 * Submit code solution
 */
export function useSubmitCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submission: Omit<CodeSubmission, 'id' | 'verdict' | 'submittedAt'>) =>
      contestService.submitCode(submission),
    onSuccess: (_, variables) => {
      if (variables.contestId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.contests.standings(variables.contestId) 
        });
      }
    },
  });
}
