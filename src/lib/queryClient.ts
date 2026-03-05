/**
 * React Query Client Configuration
 * Centralized query client with default options
 */

import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error instanceof Error && 'status' in error) {
        const status = (error as { status: number }).status;
        if (status >= 400 && status < 500) return false;
      }
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});

/**
 * Query keys factory for consistent key management
 */
export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    students: () => [...queryKeys.users.all, 'students'] as const,
    teachers: () => [...queryKeys.users.all, 'teachers'] as const,
    parents: () => [...queryKeys.users.all, 'parents'] as const,
  },

  // Courses
  courses: {
    all: ['courses'] as const,
    lists: () => [...queryKeys.courses.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.courses.lists(), filters] as const,
    details: () => [...queryKeys.courses.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.courses.details(), id] as const,
    lessons: (courseId: string) => [...queryKeys.courses.detail(courseId), 'lessons'] as const,
    lesson: (courseId: string, lessonId: string) => [...queryKeys.courses.lessons(courseId), lessonId] as const,
  },

  // Assignments
  assignments: {
    all: ['assignments'] as const,
    lists: () => [...queryKeys.assignments.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.assignments.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.assignments.all, 'detail', id] as const,
    submissions: (assignmentId: string) => [...queryKeys.assignments.detail(assignmentId), 'submissions'] as const,
  },

  // Assessments
  assessments: {
    all: ['assessments'] as const,
    quizzes: () => [...queryKeys.assessments.all, 'quizzes'] as const,
    quiz: (id: string) => [...queryKeys.assessments.quizzes(), id] as const,
    attempts: (quizId: string) => [...queryKeys.assessments.quiz(quizId), 'attempts'] as const,
    exitTickets: () => [...queryKeys.assessments.all, 'exit-tickets'] as const,
    rubrics: () => [...queryKeys.assessments.all, 'rubrics'] as const,
    grades: (studentId: string) => [...queryKeys.assessments.all, 'grades', studentId] as const,
  },

  // Classes
  classes: {
    all: ['classes'] as const,
    list: () => [...queryKeys.classes.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.classes.all, 'detail', id] as const,
    students: (classId: string) => [...queryKeys.classes.detail(classId), 'students'] as const,
    schedule: (classId: string) => [...queryKeys.classes.detail(classId), 'schedule'] as const,
    attendance: (classId: string, date?: string) => [...queryKeys.classes.detail(classId), 'attendance', date] as const,
  },

  // Contests
  contests: {
    all: ['contests'] as const,
    lists: () => [...queryKeys.contests.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.contests.lists(), filters] as const,
    detail: (id: string) => [...queryKeys.contests.all, 'detail', id] as const,
    standings: (id: string) => [...queryKeys.contests.detail(id), 'standings'] as const,
    problems: () => [...queryKeys.contests.all, 'problems'] as const,
    problem: (id: string) => [...queryKeys.contests.problems(), id] as const,
  },

  // Gamification
  gamification: {
    all: ['gamification'] as const,
    profile: (userId: string) => [...queryKeys.gamification.all, 'profile', userId] as const,
    achievements: () => [...queryKeys.gamification.all, 'achievements'] as const,
    userAchievements: (userId: string) => [...queryKeys.gamification.achievements(), userId] as const,
    leaderboard: (type: string, scope: string) => [...queryKeys.gamification.all, 'leaderboard', type, scope] as const,
    shop: () => [...queryKeys.gamification.all, 'shop'] as const,
    inventory: (userId: string) => [...queryKeys.gamification.all, 'inventory', userId] as const,
  },

  // Notifications
  notifications: {
    all: ['notifications'] as const,
    list: (userId: string) => [...queryKeys.notifications.all, userId] as const,
    unreadCount: (userId: string) => [...queryKeys.notifications.list(userId), 'unread-count'] as const,
  },

  // Calendar
  calendar: {
    all: ['calendar'] as const,
    events: (filters?: Record<string, unknown>) => [...queryKeys.calendar.all, 'events', filters] as const,
    schedule: (classId: string) => [...queryKeys.calendar.all, 'schedule', classId] as const,
  },
} as const;
