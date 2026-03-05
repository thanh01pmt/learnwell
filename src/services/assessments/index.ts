import { isMockMode } from '@/config';
import { IAssessmentService } from './types';
import { MockAssessmentService } from './mock';
import { SupabaseAssessmentService } from './supabase';

export const assessmentService: IAssessmentService = isMockMode() 
  ? new MockAssessmentService() 
  : new SupabaseAssessmentService();
