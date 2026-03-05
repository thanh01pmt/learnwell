import { mockCourses, mockLessons, mockAssignments } from '@/mocks';
import type { 
  Course, 
  CourseWithTeacher, 
  Lesson, 
  Assignment, 
  AssignmentWithCourse 
} from '@/types/models';
import type { ICourseService } from './types';

export class MockCourseService implements ICourseService {
  async getCourses(filters?: { teacherId?: string; subject?: string }): Promise<CourseWithTeacher[]> {
    let courses = [...mockCourses];
    if (filters?.teacherId) {
      courses = courses.filter(c => c.teacherId === filters.teacherId);
    }
    if (filters?.subject) {
      courses = courses.filter(c => c.subject === filters.subject);
    }
    // Mock mapping to include teacher info if needed
    return courses as any;
  }

  async getCourse(courseId: string): Promise<CourseWithTeacher | null> {
    const course = mockCourses.find(c => c.id === courseId);
    return (course as any) || null;
  }

  async getLessons(courseId: string): Promise<Lesson[]> {
    return mockLessons.filter(l => l.courseId === courseId);
  }

  async getAssignments(filters?: { courseId?: string; studentId?: string }): Promise<AssignmentWithCourse[]> {
    let assignments = [...mockAssignments];
    if (filters?.courseId) {
      assignments = assignments.filter(a => a.courseId === filters.courseId);
    }
    return assignments as any[];
  }

  async getUpcomingAssignments(): Promise<AssignmentWithCourse[]> {
    return mockAssignments.slice(0, 3) as any[];
  }

  async createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Assignment> {
    const newAssignment: Assignment = {
      ...assignment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newAssignment;
  }
}

export { mockCourses, mockLessons, mockAssignments };
