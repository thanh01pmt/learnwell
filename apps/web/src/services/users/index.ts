import { isMockMode } from '@/config';
import { IUserService } from './types';
import { MockUserService } from './mock';
import { SupabaseUserService } from './supabase';

export const userService: IUserService = isMockMode() 
  ? new MockUserService() 
  : new SupabaseUserService();
