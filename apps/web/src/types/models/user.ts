/**
 * User Domain Models
 * Base user types and role-specific profiles for LearnWell platform
 */

// =============================================================================
// Base Types
// =============================================================================

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  locale: 'en' | 'vi';
  createdAt: string;
  updatedAt: string;
  phone?: string;
  bio?: string;
  settings?: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'vi';
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    types: {
      newSubmission: boolean;
      joinRequest: boolean;
      weeklyReport: boolean;
    };
  };
}

// =============================================================================
// Student Profile
// =============================================================================

export interface StudentProfile {
  id: string;
  userId: string;
  classId: string;
  gradeLevel: number;
  parentId?: string;
  enrollmentDate: string;
  
  // Gamification
  xp: number;
  level: number;
  learnCoins: number;
  gems: number;
  streakDays: number;
  lastActiveAt: string;

  // Academic
  gpa?: number;
  rank?: number;
}

export interface StudentWithUser extends StudentProfile {
  user: User;
}

// =============================================================================
// Teacher Profile
// =============================================================================

export interface TeacherProfile {
  id: string;
  userId: string;
  subjects: string[];
  department?: string;
  employeeId?: string;
  hireDate: string;
  classIds: string[];
}

export interface TeacherWithUser extends TeacherProfile {
  user: User;
}

// =============================================================================
// Parent Profile
// =============================================================================

export interface ParentProfile {
  id: string;
  userId: string;
  childrenIds: string[];
  preferredContactMethod: 'email' | 'phone' | 'app';
  phone?: string;
}

export interface ParentWithUser extends ParentProfile {
  user: User;
  children: StudentWithUser[];
}

// =============================================================================
// Admin Profile
// =============================================================================

export interface AdminProfile {
  id: string;
  userId: string;
  permissions: string[];
  isSuperAdmin: boolean;
}

// =============================================================================
// Auth Types (Supabase)
// =============================================================================

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  fullName: string;
  role: UserRole;
}
