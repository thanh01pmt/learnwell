import { isMockMode } from '@/config';
import { ICourseService } from './types';
import { MockCourseService } from './mock';
import { SupabaseCourseService } from './supabase';

export const courseService: ICourseService = isMockMode() 
  ? new MockCourseService() 
  : new SupabaseCourseService();
