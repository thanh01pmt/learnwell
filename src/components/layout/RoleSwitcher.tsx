import { UserRole, useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import { GraduationCap, Users, Shield, Heart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const roles: { value: UserRole; labelKey: string; icon: React.ElementType; color: string }[] = [
  { value: "student", labelKey: "common:roles.student", icon: GraduationCap, color: "bg-blue-500" },
  { value: "teacher", labelKey: "common:roles.teacher", icon: Users, color: "bg-emerald-500" },
  { value: "parent", labelKey: "common:roles.parent", icon: Heart, color: "bg-rose-500" },
  { value: "admin", labelKey: "common:roles.admin", icon: Shield, color: "bg-purple-500" },
];

interface RoleSwitcherProps {
  collapsed?: boolean;
}

const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case "student":
      return "/student";
    case "teacher":
      return "/dashboard";
    case "admin":
      return "/admin";
    case "parent":
      return "/parent";
    default:
      return "/";
  }
};

export function RoleSwitcher({ collapsed = false }: RoleSwitcherProps) {
  const { role, setRole } = useRole();
  const { signOut } = useAuth();
  const { t } = useTranslation(["common", "navigation"]);
  const navigate = useNavigate();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    navigate(getDashboardPath(newRole));
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (collapsed) {
    return (
      <div className="flex flex-col gap-1 p-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = role === r.value;
          return (
            <button
              key={r.value}
              onClick={() => handleRoleChange(r.value)}
              className={cn(
                "flex items-center justify-center p-2 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-muted-foreground"
              )}
              title={t(r.labelKey as any)}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
        <div className="h-px bg-border my-1" />
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-all duration-200"
          title={t("navigation:header.logout")}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
      <span className="text-xs font-medium text-muted-foreground px-2">
        {t("navigation:switchRole")}
      </span>
      <div className="flex flex-col gap-1">
        {roles.map((r) => {
          const Icon = r.icon;
          const isActive = role === r.value;
          return (
            <button
              key={r.value}
              onClick={() => handleRoleChange(r.value)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-lg flex items-center justify-center",
                  isActive ? "bg-primary-foreground/20" : r.color
                )}
              >
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span>{t(r.labelKey as any)}</span>
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-destructive/10 text-destructive transition-all duration-200 text-sm font-medium mt-2"
        >
          <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-destructive/10">
            <LogOut className="h-3.5 w-3.5" />
          </div>
          <span>{t("navigation:header.logout")}</span>
        </button>
      </div>
    </div>
  );
}
