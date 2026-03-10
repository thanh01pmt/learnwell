/**
 * Assessment Data Hooks
 * React Query hooks for quizzes, grades, attendance
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { assessmentService } from '@/services';
import type { 
  QuizAttempt,
  Attendance
} from '@/types/models';

/**
 * Get quizzes for a course
 */
export function useQuizzes(courseId?: string) {
  return useQuery({
    queryKey: queryKeys.assessments.quizzes(),
    queryFn: () => assessmentService.getQuizzes(courseId),
  });
}

/**
 * Get quiz by ID
 */
export function useQuiz(quizId: string) {
  return useQuery({
    queryKey: queryKeys.assessments.quiz(quizId),
    queryFn: () => assessmentService.getQuiz(quizId),
    enabled: !!quizId,
  });
}

/**
 * Get grade summary for a student
 */
export function useGradeSummary(studentId: string) {
  return useQuery({
    queryKey: queryKeys.assessments.grades(studentId),
    queryFn: () => assessmentService.getGradeSummary(studentId),
    enabled: !!studentId,
  });
}

/**
 * Get attendance summary for a student
 */
export function useAttendanceSummary(studentId: string, classId: string) {
  return useQuery({
    queryKey: queryKeys.classes.attendance(classId),
    queryFn: () => assessmentService.getAttendanceSummary(studentId, classId),
    enabled: !!studentId && !!classId,
  });
}

/**
 * Get class attendance for a specific date
 */
export function useClassAttendance(classId: string, date: string) {
  return useQuery({
    queryKey: queryKeys.classes.attendance(classId, date),
    queryFn: () => assessmentService.getClassAttendance(classId, date),
    enabled: !!classId && !!date,
  });
}

/**
 * Record attendance
 */
export function useRecordAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attendance: Omit<Attendance, 'id'>) =>
      assessmentService.recordAttendance(attendance),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.classes.attendance(variables.classId) 
      });
    },
  });
}

/**
 * Submit quiz attempt
 */
export function useSubmitQuizAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attempt: Omit<QuizAttempt, 'id'>) =>
      assessmentService.submitQuizAttempt(attempt),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.assessments.attempts(variables.quizId) 
      });
    },
  });
}
