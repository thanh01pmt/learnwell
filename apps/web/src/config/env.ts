/**
 * Environment Configuration
 * Type-safe access to environment variables
 */

interface AppConfig {
  // Supabase
  supabaseUrl: string;
  supabaseAnonKey: string;

  // App
  appName: string;
  appUrl: string;
  defaultLocale: 'en' | 'vi';

  // Feature Flags
  useMockData: boolean;
  enableAiFeatures: boolean;
  enableContests: boolean;
  enableGamification: boolean;

  // External Services
  codeExecutionUrl?: string;
  aiApiKey?: string;
  aiApiUrl?: string;
}

function getEnvVar(key: string, required = false): string {
  const value = import.meta.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

function getEnvBool(key: string, defaultValue = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

export const config: AppConfig = {
  // Supabase - Required for production, optional for mock mode
  supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),

  // App Settings
  appName: getEnvVar('VITE_APP_NAME') || 'LearnWell',
  appUrl: getEnvVar('VITE_APP_URL') || 'http://localhost:5173',
  defaultLocale: (getEnvVar('VITE_DEFAULT_LOCALE') || 'vi') as 'en' | 'vi',

  // Feature Flags
  useMockData: getEnvBool('VITE_ENABLE_MOCK_DATA', true),
  enableAiFeatures: getEnvBool('VITE_ENABLE_AI_FEATURES', true),
  enableContests: getEnvBool('VITE_ENABLE_CONTESTS', true),
  enableGamification: getEnvBool('VITE_ENABLE_GAMIFICATION', true),

  // External Services
  codeExecutionUrl: getEnvVar('VITE_CODE_EXECUTION_URL') || undefined,
  aiApiKey: getEnvVar('VITE_AI_API_KEY') || undefined,
  aiApiUrl: getEnvVar('VITE_AI_API_URL') || undefined,
};

/**
 * Check if the app is running in mock mode
 */
export const isMockMode = (): boolean => {
  return config.useMockData || !config.supabaseUrl;
};

/**
 * Validate required config at runtime
 */
export const validateConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.useMockData) {
    if (!config.supabaseUrl) errors.push('VITE_SUPABASE_URL is required');
    if (!config.supabaseAnonKey) errors.push('VITE_SUPABASE_ANON_KEY is required');
  }

  return { valid: errors.length === 0, errors };
};
