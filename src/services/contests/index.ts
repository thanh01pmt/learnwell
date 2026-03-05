import { isMockMode } from '@/config';
import { IContestService } from './types';
import { MockContestService } from './mock';
import { SupabaseContestService } from './supabase';

export const contestService: IContestService = isMockMode() 
  ? new MockContestService() 
  : new SupabaseContestService();
