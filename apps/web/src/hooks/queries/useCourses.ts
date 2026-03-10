/**
 * Course Data Hooks
 * React Query hooks for courses, lessons, and assignments
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { courseService } from '@/services';
import type { Assignment } from '@/types/models';

/**
 * Get list of courses with optional filters
 */
export function useCourses(filters?: { teacherId?: string; subject?: string }) {
  return useQuery({
    queryKey: queryKeys.courses.list(filters),
    queryFn: () => courseService.getCourses(filters),
  });
}

/**
 * Get single course by ID
 */
export function useCourse(courseId: string) {
  return useQuery({
    queryKey: queryKeys.courses.detail(courseId),
    queryFn: () => courseService.getCourse(courseId),
    enabled: !!courseId,
  });
}

/**
 * Get lessons for a course
 */
export function useCourseLessons(courseId: string) {
  return useQuery({
    queryKey: queryKeys.courses.lessons(courseId),
    queryFn: () => courseService.getLessons(courseId),
    enabled: !!courseId,
  });
}

/**
 * Get assignments with optional filters
 */
export function useAssignments(filters?: { courseId?: string; studentId?: string }) {
  return useQuery({
    queryKey: queryKeys.assignments.list(filters),
    queryFn: () => courseService.getAssignments(filters),
  });
}

/**
 * Get upcoming assignments (due in next 7 days)
 */
export function useUpcomingAssignments() {
  return useQuery({
    queryKey: queryKeys.assignments.list({ upcoming: true }),
    queryFn: () => courseService.getUpcomingAssignments(),
  });
}

/**
 * Create new assignment
 */
export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) =>
      courseService.createAssignment(assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.assignments.all });
    },
  });
}
