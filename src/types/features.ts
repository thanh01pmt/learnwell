export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export type FeatureCategory = 
  | 'user-management'
  | 'contests'
  | 'ai-features'
  | 'webhooks'
  | 'content-access'
  | 'core-lms'
  | 'communication'
  | 'gamification'
  | 'social'
  | 'authoring'
  | 'tech'
  | 'parent-special';

export interface RouteConfig {
  path: string;
  name: string;
  component?: string;
  icon?: any;
  defaultRoles: UserRole[];
  isParent?: boolean; // If true, disabling this disables children
  parentPath?: string; // Reference to parent route
}

export interface FeatureDefinition {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  routes: RouteConfig[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface RoutePermissions {
  [role: string]: boolean;
}

export interface FeaturePermissions {
  enabled: boolean;
  routes: {
    [routePath: string]: RoutePermissions;
  };
  // Parent-specific additive settings
  parentChildSettings?: {
    [childId: string]: {
      addedPermissions: string[]; // e.g., ["view-grades", "view-attendance"]
    };
  };
}

export interface PermissionConfig {
  version: string;
  lastModified: string;
  modifiedBy: string;
  features: {
    [featureId: string]: FeaturePermissions;
  };
  // Content Access Hierarchy Mock
  contentAccess?: {
    classGroups: {
      id: string;
      name: string;
      teacherId: string;
      studentIds: string[];
      accessibleResources: string[]; // IDs of resources/folders
    }[];
  };
  // Webhook Report Mock
  webhooks?: {
    id: string;
    url: string;
    events: string[];
    enabled: boolean;
  }[];
}

export interface FeatureFlagContextType {
  config: PermissionConfig;
  hasAccess: (path: string, role: UserRole, context?: any) => boolean;
  updateRoutePermission: (featureId: string, path: string, role: UserRole, enabled: boolean) => void;
  toggleFeature: (featureId: string, enabled: boolean) => void;
  resetToDefault: () => void;
  importConfig: (json: string) => boolean;
  exportConfig: () => string;
}
