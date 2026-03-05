/**
 * Hooks barrel file - Export all query hooks
 */

// User hooks
export { 
  useCurrentUser, 
  useStudents, 
  useStudentProfile,
  useUpdateUserProfile 
} from './queries/useUsers';

// Course hooks
export { 
  useCourses, 
  useCourse, 
  useCourseLessons,
  useAssignments,
  useUpcomingAssignments,
  useCreateAssignment 
} from './queries/useCourses';

// Assessment hooks
export { 
  useQuizzes, 
  useQuiz,
  useGradeSummary,
  useAttendanceSummary,
  useClassAttendance,
  useRecordAttendance,
  useSubmitQuizAttempt 
} from './queries/useAssessments';

// Contest hooks
export { 
  useContests, 
  useUpcomingContests,
  useOngoingContests,
  useContest,
  useContestStandings,
  useProblems,
  useProblem,
  useRegisterForContest,
  useSubmitCode 
} from './queries/useContests';
