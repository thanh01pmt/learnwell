import { useFeatureFlag } from "../contexts/FeatureFlagContext";
import { useRole } from "@/contexts/RoleContext";
import { UserRole } from "../types/features";

export const useFeatureAccess = (path: string) => {
  const { hasAccess } = useFeatureFlag();
  const { role } = useRole();

  // Map system role to UserRole type
  const userRole = (role || 'student') as UserRole;
  
  return hasAccess(path, userRole);
};
