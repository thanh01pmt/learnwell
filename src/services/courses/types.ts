import type { 
  Course, 
  CourseWithTeacher, 
  Lesson, 
  Assignment, 
  AssignmentWithCourse 
} from '@/types/models';

export interface ICourseService {
  getCourses(filters?: { teacherId?: string; subject?: string }): Promise<CourseWithTeacher[]>;
  getCourse(courseId: string): Promise<CourseWithTeacher | null>;
  getLessons(courseId: string): Promise<Lesson[]>;
  getAssignments(filters?: { courseId?: string; studentId?: string }): Promise<AssignmentWithCourse[]>;
  getUpcomingAssignments(): Promise<AssignmentWithCourse[]>;
  createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Assignment>;
}
