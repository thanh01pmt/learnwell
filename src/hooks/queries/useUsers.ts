/**
 * User Data Hooks
 * React Query hooks for user-related data fetching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryClient';
import { userService } from '@/services';
import type { User } from '@/types/models';

/**
 * Get current authenticated user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => userService.getCurrentUser(),
  });
}

/**
 * Get list of students (optionally filtered by class)
 */
export function useStudents(classId?: string) {
  return useQuery({
    queryKey: queryKeys.users.list({ role: 'student', classId }),
    queryFn: () => userService.getStudents(classId),
  });
}

/**
 * Get single student profile by ID
 */
export function useStudentProfile(studentId: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(studentId),
    queryFn: () => userService.getStudentProfile(studentId),
    enabled: !!studentId,
  });
}

/**
 * Update user profile
 */
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<User> & { id: string }) => 
      userService.updateUser(updates.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
    },
  });
}
