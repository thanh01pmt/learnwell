import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

export type UserRole = "student" | "teacher" | "admin" | "parent" | "instructional_designer" | "assessor";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isImpersonating: boolean;
  originalRole: UserRole | null;
  startImpersonating: (role: UserRole) => void;
  stopImpersonating: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [role, setRoleState] = useState<UserRole>("student");
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalRole, setOriginalRole] = useState<UserRole | null>(null);

  // Sync role with authenticated user when not impersonating
  useEffect(() => {
    if (user && !isImpersonating) {
      setRoleState(user.role as UserRole);
    }
  }, [user, isImpersonating]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (!isImpersonating) {
      setOriginalRole(null);
    }
  };

  const startImpersonating = (newRole: UserRole) => {
    setOriginalRole(role);
    setIsImpersonating(true);
    setRoleState(newRole);
  };

  const stopImpersonating = () => {
    if (originalRole) {
      setRoleState(originalRole);
    }
    setIsImpersonating(false);
    setOriginalRole(null);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated: !!user,
        isImpersonating,
        originalRole,
        startImpersonating,
        stopImpersonating
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
