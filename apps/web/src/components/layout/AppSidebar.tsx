import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Trophy,
  PenTool,
  BarChart3,
  FolderOpen,
  Menu,
  Palette,
  School,
  UserCog,
  Award,
  Route,
  Code,
  Library,
  User,
  MessageCircle,
  Calendar,
  TrendingUp,
  Heart,
  Bell,
  Send,
  Mail,
  Megaphone,
  Monitor,
  UserPlus,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RoleSwitcher } from "./RoleSwitcher";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import { UserRole as FeatureUserRole } from "@/types/features";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  children?: { title: string; href: string }[];
}

const studentNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/student" },
  { title: "exams", icon: FileText, href: "/student/assignments" },
  {
    title: "learningTools",
    icon: Brain,
    href: "/student/tools",
    children: [
      { title: "flashcards", href: "/student/flashcards" },
      { title: "smartPractice", href: "/student/adaptive-practice" },
      { title: "lessonNotes", href: "/student/notes" },
      { title: "aiStudyGuide", href: "/student/study-guide" },
      { title: "aiLearningPath", href: "/recommendations" },
    ],
  },
  {
    title: "techCoding",
    icon: Code,
    href: "/problems",
    children: [
      { title: "problems", href: "/problems" },
      { title: "contests", href: "/contests" },
      { title: "leaderboardELO", href: "/contests/leaderboard/elo" },
      { title: "solutions", href: "/solutions" },
      { title: "projectLibrary", href: "/project-library" },
      { title: "launcher", href: "/code/launcher" },
      { title: "projectHub", href: "/hub" },
      { title: "codingProfile", href: "/profile/coding" },
      { title: "teams", href: "/teams" },
      { title: "shop", href: "/shop" },
      { title: "techBlog", href: "/blog" },
      { title: "studyGroups", href: "/study-groups" },
      { title: "socialFeed", href: "/social-feed" },
    ],
  },
  { title: "materials", icon: BookOpen, href: "/student/materials" },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "messages", icon: Send, href: "/messages" },
  { title: "announcements", icon: Megaphone, href: "/announcements" },
  { title: "officeHours", icon: Monitor, href: "/office-hours" },
  { title: "learningPaths", icon: Route, href: "/learning-paths" },
  { title: "resources", icon: Library, href: "/resources" },
  { title: "achievements", icon: Award, href: "/achievements" },
  { title: "certificates", icon: Trophy, href: "/certificates" },
  { title: "portfolioBuilder", icon: Award, href: "/portfolio-builder" },
  { title: "notifications", icon: Heart, href: "/notifications" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const teacherNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    title: "classes",
    icon: BookOpen,
    href: "/classes",
    children: [
      { title: "classes", href: "/classes" },
      { title: "seatingChart", href: "/teacher/seating-chart" },
      { title: "attendance", href: "/teacher/attendance" },
      { title: "dashboardWidgets", href: "/teacher/dashboard-widgets" },
    ],
  },
  { title: "students", icon: Users, href: "/students" },
  {
    title: "grading",
    icon: FileText,
    href: "/grading",
    children: [
      { title: "waitGrading", href: "/grading" },
      { title: "gradebook", href: "/gradebook" },
      { title: "reportsGrades", href: "/gradebook-advanced" },
      { title: "rubricBuilder", href: "/rubric-builder" },
    ],
  },
  {
    title: "authoring",
    icon: FolderOpen,
    href: "/authoring",
    children: [
      { title: "curriculum", href: "/authoring/curriculum" },
      { title: "questionBank", href: "/authoring/questions" },
      { title: "launcher", href: "/code/launcher" },
      { title: "projectHub", href: "/hub" },
      { title: "exams", href: "/authoring/exams" },
      { title: "contestManagement", href: "/admin/contests" },
    ],
  },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "messages", icon: Send, href: "/messages" },
  { title: "announcements", icon: Megaphone, href: "/announcements" },
  { title: "officeHours", icon: Monitor, href: "/office-hours" },
  { title: "resources", icon: Library, href: "/resources" },
  {
    title: "reportsGrades",
    icon: BarChart3,
    href: "/reports",
    children: [
      { title: "reports", href: "/reports" },
      { title: "gradebook", href: "/gradebook-advanced" },
    ],
  },
  { title: "notifications", icon: Bell, href: "/notifications" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const adminNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "home", icon: School, href: "/admin/classes" },
  { title: "timetable", icon: Calendar, href: "/admin/timetable" },
  { title: "enrollment", icon: UserPlus, href: "/admin/enrollment" },
  { title: "teachers", icon: UserCog, href: "/admin/teachers" },
  { title: "users", icon: Users, href: "/admin/users" },
  { title: "contestManagement", icon: Award, href: "/admin/contests" },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "messages", icon: Send, href: "/messages" },
  { title: "announcements", icon: Megaphone, href: "/announcements" },
  { title: "officeHours", icon: Monitor, href: "/office-hours" },
  { title: "resources", icon: Library, href: "/resources" },
  {
    title: "reportsGrades",
    icon: BarChart3,
    href: "/reports",
    children: [
      { title: "reports", href: "/reports" },
      { title: "gradeAnalytics", href: "/grade-analytics" },
      { title: "gradebook", href: "/gradebook-advanced" },
      { title: "attendance", href: "/teacher/attendance" },
    ],
  },
  { title: "notifications", icon: Bell, href: "/notifications" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const parentNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/parent" },
  { title: "progress", icon: TrendingUp, href: "/parent/progress" },
  { title: "contactTeacher", icon: MessageCircle, href: "/parent/contact" },
  { title: "schedule", icon: Calendar, href: "/parent/schedule" },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "announcements", icon: Megaphone, href: "/announcements" },
  { title: "officeHours", icon: Monitor, href: "/office-hours" },
  { title: "resources", icon: Library, href: "/resources" },
  { title: "notifications", icon: Bell, href: "/notifications" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const instructionalDesignerNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    title: "authoring",
    icon: FolderOpen,
    href: "/authoring",
    children: [
      { title: "tutorialBuilder", href: "/authoring/tutorial-builder" },
      { title: "curriculum", href: "/authoring/curriculum" },
      { title: "questionBank", href: "/authoring/questions" },
      { title: "exams", href: "/authoring/exams" },
      { title: "contestManagement", href: "/admin/contests" },
      { title: "projectHub", href: "/hub" },
    ],
  },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "messages", icon: Send, href: "/messages" },
  { title: "resources", icon: Library, href: "/resources" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const assessorNavItems: NavItem[] = [
  { title: "dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    title: "authoring",
    icon: FolderOpen,
    href: "/authoring",
    children: [
      { title: "gradingConfig", href: "/authoring/grading-config" },
      { title: "questionBank", href: "/authoring/questions" },
      { title: "exams", href: "/authoring/exams" },
    ],
  },
  {
    title: "grading",
    icon: FileText,
    href: "/grading",
    children: [
      { title: "waitGrading", href: "/grading" },
      { title: "gradebook", href: "/gradebook" },
      { title: "reportsGrades", href: "/gradebook-advanced" },
      { title: "rubricBuilder", href: "/rubric-builder" },
    ],
  },
  { title: "forum", icon: Library, href: "/forum" },
  { title: "messages", icon: Send, href: "/messages" },
  { title: "profile", icon: User, href: "/profile" },
  { title: "settings", icon: Settings, href: "/settings" },
];

const getNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case "student":
      return studentNavItems;
    case "teacher":
      return teacherNavItems;
    case "admin":
      return adminNavItems;
    case "parent":
      return parentNavItems;
    case "instructional_designer":
      return instructionalDesignerNavItems;
    case "assessor":
      return assessorNavItems;
    default:
      return studentNavItems;
  }
};

interface SidebarContentProps {
  collapsed: boolean;
  onCollapse?: () => void;
}

export function SidebarNavContent({ collapsed }: SidebarContentProps) {
  const location = useLocation();
  const { role } = useRole();
  const { t } = useTranslation('navigation');
  const { hasAccess } = useFeatureFlag();
  const [openGroups, setOpenGroups] = useState<string[]>(["authoring"]);
  const userRole = (role || 'student') as FeatureUserRole;

  const rawNavItems = getNavItems(role);
  let navItems = [...rawNavItems];

  // Add Admin-only Feature Management link
  if (role === "admin" && !navItems.some(item => item.href === "/admin/features")) {
    navItems = [
      navItems[0], // Dashboard
      { title: "settings", icon: Settings, href: "/admin/features" },
      ...navItems.slice(1)
    ];
  }

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  // Filter items based on feature access
  const filteredNavItems = navItems.map(item => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(child => hasAccess(child.href, userRole))
      };
    }
    return item;
  }).filter(item => {
    if (item.children) return item.children.length > 0;
    return hasAccess(item.href, userRole);
  });

  return (
    <nav className="flex flex-col gap-1 p-3">
      {filteredNavItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href) || isChildActive(item.children);

        if (item.children) {
          return (
            <Collapsible
              key={item.href}
              open={!collapsed && openGroups.includes(item.title)}
              onOpenChange={() => toggleGroup(item.title)}
            >
              <CollapsibleTrigger asChild>
                <button
                  className={cn(
                    "nav-item w-full justify-between",
                    active && "bg-muted text-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{t(item.title as string)}</span>}
                  </span>
                  {!collapsed && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openGroups.includes(item.title) && "rotate-90"
                      )}
                    />
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 pt-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "nav-item text-sm",
                      isActive(child.href) && "active"
                    )}
                  >
                    {t(child.title as string)}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        const navLink = (
          <Link
            to={item.href}
            className={cn("nav-item", active && "active")}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{t(item.title as string)}</span>}
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{navLink}</TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {t(item.title as string)}
              </TooltipContent>
            </Tooltip>
          );
        }

        return <div key={item.href}>{navLink}</div>;
      })}

      {/* Design System Link */}
      <div className="mt-4 pt-4 border-t border-border">
        <Link
          to="/demo"
          className={cn(
            "nav-item",
            location.pathname === "/demo" && "active"
          )}
        >
          <Palette className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{t("designSystem", { defaultValue: "Design System" })}</span>}
        </Link>
      </div>
    </nav>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useRole();
  const { t } = useTranslation("navigation");

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 h-screen sticky top-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">{t("navigation:header.logo", { defaultValue: "LearnWell" })}</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 shrink-0 rounded-lg"
            aria-label={collapsed ? t("navigation:expandSidebar") : t("navigation:collapseSidebar")}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNavContent collapsed={collapsed} />
        </div>

        {/* Role Switcher */}
        <div className="border-t border-border">
          <RoleSwitcher collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}
