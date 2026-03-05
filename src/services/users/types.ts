import type { User, StudentWithUser } from '@/types/models';

export interface IUserService {
  getCurrentUser(): Promise<User | null>;
  getStudents(classId?: string): Promise<StudentWithUser[]>;
  getStudentProfile(studentId: string): Promise<StudentWithUser | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
}
