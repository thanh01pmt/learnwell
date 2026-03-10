import type { 
  Quiz, 
  CourseGradeSummary,
  AttendanceSummary 
} from '@/types/models';

export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz1',
    courseId: 'course1',
    lessonId: 'lesson1',
    title: 'classroom:mocks.assessments.quiz1.title',
    description: 'classroom:mocks.assessments.quiz1.description',
    type: 'graded',
    timeLimitMinutes: 15,
    passingScore: 50,
    maxAttempts: 2,
    shuffleQuestions: true,
    showCorrectAnswers: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockGrades: CourseGradeSummary[] = [
  {
    courseId: 'course1',
    studentId: 'sp1',
    currentGrade: 85,
    letterGrade: 'B+',
    completedAssignments: 8,
    totalAssignments: 10,
    trend: 'up',
    lastUpdated: new Date().toISOString(),
  },
];

export const mockAttendanceSummary: AttendanceSummary = {
  studentId: 'sp1',
  classId: 'class1',
  totalDays: 90,
  presentDays: 85,
  absentDays: 3,
  lateDays: 2,
  excusedDays: 0,
  attendanceRate: 94.4,
};
