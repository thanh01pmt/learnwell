import { useTranslation } from "react-i18next";
import { Plus, FileText, Users, BookOpen, ClipboardCheck, Layout, Heart, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const { t } = useTranslation("teacher");
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Plus,
      label: "teacher:dashboard.quickActions.createClass",
      description: "teacher:dashboard.quickActions.createClassDesc",
      variant: "primary" as const,
      href: "/classes",
    },
    {
      icon: FileText,
      label: "teacher:dashboard.quickActions.createExam",
      description: "teacher:dashboard.quickActions.createExamDesc",
      variant: "accent" as const,
      href: "/authoring/exams",
    },
    {
      icon: Users,
      label: "teacher:dashboard.quickActions.addStudent",
      description: "teacher:dashboard.quickActions.addStudentDesc",
      variant: "success" as const,
      href: "/students",
    },
    {
      icon: BookOpen,
      label: "teacher:dashboard.quickActions.createLesson",
      description: "teacher:dashboard.quickActions.createLessonDesc",
      variant: "info" as const,
      href: "/authoring/curriculum",
    },
    {
      icon: ClipboardCheck,
      label: "teacher:dashboard.quickActions.exitTickets",
      description: "teacher:dashboard.quickActions.exitTicketsDesc",
      variant: "accent" as const,
      href: "/teacher/exit-tickets",
    },
    {
      icon: Layout,
      label: "teacher:dashboard.quickActions.pathTemplates",
      description: "teacher:dashboard.quickActions.pathTemplatesDesc",
      variant: "primary" as const,
      href: "/teacher/path-templates",
    },
    {
      icon: Heart,
      label: "teacher:dashboard.quickActions.manageIEP",
      description: "teacher:dashboard.quickActions.manageIEPDesc",
      variant: "success" as const,
      href: "/teacher/iep",
    },
    {
      icon: Layers,
      label: "teacher:dashboard.quickActions.skillGrouping",
      description: "teacher:dashboard.quickActions.skillGroupingDesc",
      variant: "info" as const,
      href: "/teacher/skill-groups",
    },
  ];

  const variantStyles = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    accent: "bg-accent hover:bg-accent/90 text-accent-foreground",
    success: "bg-success hover:bg-success/90 text-success-foreground",
    info: "bg-info hover:bg-info/90 text-info-foreground",
  };

  return (
    <div className="flex flex-wrap gap-3">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            className={cn(
              "h-auto py-3 px-4 rounded-xl flex items-center gap-3 transition-all duration-200",
              variantStyles[action.variant]
            )}
            onClick={() => navigate(action.href)}
          >
            <div className="h-10 w-10 rounded-lg bg-card/20 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">{t(action.label as any)}</p>
              <p className="text-xs opacity-80">{t(action.description as any)}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
