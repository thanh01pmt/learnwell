import { mockQuizzes, mockGrades, mockAttendanceSummary } from '@/mocks';
import type { 
  Quiz, 
  QuizAttempt,
  CourseGradeSummary,
  AttendanceRecord,
  AttendanceSummary 
} from '@/types/models';
import type { IAssessmentService } from './types';

export class MockAssessmentService implements IAssessmentService {
  async getQuizzes(courseId?: string): Promise<Quiz[]> {
    let quizzes = [...mockQuizzes];
    if (courseId) {
      quizzes = quizzes.filter(q => q.courseId === courseId);
    }
    return quizzes;
  }

  async getQuiz(quizId: string): Promise<Quiz | null> {
    const quiz = mockQuizzes.find(q => q.id === quizId);
    return quiz || null;
  }

  async getGradeSummary(studentId: string): Promise<CourseGradeSummary[]> {
    return mockGrades;
  }

  async getAttendanceSummary(studentId: string, classId: string): Promise<AttendanceSummary | null> {
    return mockAttendanceSummary;
  }

  async getClassAttendance(classId: string, date: string): Promise<AttendanceRecord[]> {
    return [];
  }

  async recordAttendance(attendance: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord> {
    return { ...attendance, id: Math.random().toString() } as any;
  }

  async submitQuizAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<QuizAttempt> {
    return { ...attempt, id: Math.random().toString() } as any;
  }
}

export { mockQuizzes, mockGrades, mockAttendanceSummary };
