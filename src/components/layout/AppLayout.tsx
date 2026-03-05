import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { useRole } from "@/contexts/RoleContext";

import { useTranslation } from "react-i18next";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isImpersonating, role } = useRole();
  const { t } = useTranslation("navigation");

  const getImpersonatedUserName = () => {
    switch (role) {
      case "teacher": return t("roles.teacher_system");
      case "student": return t("roles.student_demo");
      case "parent": return t("roles.parent_demo");
      case "admin": return t("roles.admin");
      default: return role;
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader
          isImpersonating={isImpersonating}
          impersonatedUser={getImpersonatedUserName()}
        />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
