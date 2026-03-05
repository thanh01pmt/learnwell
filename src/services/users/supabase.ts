import { getSupabaseClient } from '@/config';
import type { User, StudentWithUser } from '@/types/models';
import type { IUserService } from './types';
import { mockUsers } from './mock';

export class SupabaseUserService implements IUserService {
  async getCurrentUser(): Promise<User | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error) throw error;
    if (!data) return null;

    const row = data as any;
    
    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      avatarUrl: row.avatar_url ?? undefined,
      role: row.role,
      locale: row.locale,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getStudents(classId?: string): Promise<StudentWithUser[]> {
    console.warn('[SupabaseUserService] getStudents not fully implemented, returning empty');
    return [];
  }

  async getStudentProfile(studentId: string): Promise<StudentWithUser | null> {
    console.warn('[SupabaseUserService] getStudentProfile not fully implemented');
    return null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase
      .from('users')
      .update({
        full_name: updates.fullName,
        avatar_url: updates.avatarUrl,
        locale: updates.locale,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    const row = data as any;
    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      avatarUrl: row.avatar_url ?? undefined,
      role: row.role,
      locale: row.locale,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
