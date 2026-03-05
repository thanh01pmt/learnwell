import type { 
  Quiz, 
  QuizAttempt,
  CourseGradeSummary,
  AttendanceRecord,
  AttendanceSummary 
} from '@/types/models';

export interface IAssessmentService {
  getQuizzes(courseId?: string): Promise<Quiz[]>;
  getQuiz(quizId: string): Promise<Quiz | null>;
  getGradeSummary(studentId: string): Promise<CourseGradeSummary[]>;
  getAttendanceSummary(studentId: string, classId: string): Promise<AttendanceSummary | null>;
  getClassAttendance(classId: string, date: string): Promise<AttendanceRecord[]>;
  recordAttendance(attendance: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord>;
  submitQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<QuizAttempt>;
}
