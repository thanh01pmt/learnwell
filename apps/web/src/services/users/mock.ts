import { mockUsers, mockStudentProfiles } from '@/mocks';
import type { User, StudentWithUser } from '@/types/models';
import type { IUserService } from './types';

export class MockUserService implements IUserService {
  async getCurrentUser(): Promise<User | null> {
    return mockUsers[0];
  }

  async getStudents(classId?: string): Promise<StudentWithUser[]> {
    return mockStudentProfiles;
  }

  async getStudentProfile(studentId: string): Promise<StudentWithUser | null> {
    return mockStudentProfiles.find(s => s.id === studentId) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return { ...user, ...updates };
  }
}

export { mockUsers, mockStudentProfiles };
