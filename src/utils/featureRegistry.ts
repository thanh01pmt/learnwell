import { FeatureDefinition } from "../types/features";
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  Trophy,
  Target,
  BarChart3,
  Route,
  TrendingUp,
  Brain,
  Star,
  Library,
  Map,
  School,
  GraduationCap,
  PenTool,
  BookOpen,
  Terminal,
  Code2,
  Lightbulb,
  ShoppingCart,
  Users2,
  Award,
  MessageSquare,
  Share2,
  FileBarChart,
  Calendar,
  MessageCircle,
  Briefcase,
  Timer,
  FolderOpen,
  ShieldAlert,
  Gauge,
  PlayCircle,
  Database,
  Search,
  Settings,
  Bell,
  CheckCircle2,
  FileCode2,
  Mic2,
  Network,
  Milestone,
  Home,
  Ticket,
  ScrollText,
  Contact2,
  Group
} from "lucide-react";

export const FEATURE_REGISTRY: FeatureDefinition[] = [
  {
    id: "user-management",
    name: "features:features.user-management.name",
    description: "features:features.user-management.description",
    category: "user-management",
    priority: "critical",
    routes: [
      { path: "/admin", name: "features:routes.admin.dashboard", icon: LayoutDashboard, defaultRoles: ["admin"], isParent: true },
      { path: "/admin/users", name: "features:routes.admin.users", icon: Users, defaultRoles: ["admin"], parentPath: "/admin" },
      { path: "/admin/teachers", name: "features:routes.admin.teachers", icon: UserCog, defaultRoles: ["admin"], parentPath: "/admin" },
      { path: "/admin/reports", name: "features:routes.admin.reports", icon: FileText, defaultRoles: ["admin"], parentPath: "/admin" }
    ]
  },
  {
    id: "contests",
    name: "features:features.contests.name",
    description: "features:features.contests.description",
    category: "contests",
    priority: "high",
    routes: [
      { path: "/contests", name: "features:routes.contests.list", icon: Trophy, defaultRoles: ["student", "teacher", "admin"], isParent: true },
      { path: "/contests/detail", name: "features:routes.contests.detail", icon: FileText, defaultRoles: ["student", "teacher", "admin"], parentPath: "/contests" },
      { path: "/contests/arena", name: "features:routes.contests.arena", icon: Target, defaultRoles: ["student", "admin"], parentPath: "/contests" },
      { path: "/contests/leaderboard", name: "features:routes.contests.leaderboard", icon: BarChart3, defaultRoles: ["student", "teacher", "admin"], parentPath: "/contests" }
    ]
  },
  {
    id: "ai-features",
    name: "features:features.ai-features.name",
    description: "features:features.ai-features.description",
    category: "ai-features",
    priority: "high",
    routes: [
      { path: "/student/roadmap", name: "features:routes.student.roadmap", icon: Route, defaultRoles: ["student", "parent", "admin"], isParent: true },
      { path: "/student/skill-gap", name: "features:routes.student.skillGap", icon: TrendingUp, defaultRoles: ["student", "admin"], parentPath: "/student/roadmap" },
      { path: "/student/adaptive-practice", name: "features:routes.student.adaptivePractice", icon: Brain, defaultRoles: ["student", "admin"], parentPath: "/student/roadmap" },
      { path: "/recommendations", name: "features:routes.common.recommendations", icon: Star, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "content-access",
    name: "features:features.content-access.name",
    description: "features:features.content-access.description",
    category: "content-access",
    priority: "medium",
    routes: [
      { path: "/resources", name: "features:routes.common.resources", icon: Library, defaultRoles: ["student", "teacher", "admin"], isParent: true },
      { path: "/learning-paths", name: "features:routes.common.learningPaths", icon: Map, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "webhooks",
    name: "features:features.webhooks.name",
    description: "features:features.webhooks.description",
    category: "webhooks",
    priority: "low",
    routes: []
  },
  {
    id: "core-lms-teacher",
    name: "features:features.core-lms-teacher.name",
    description: "features:features.core-lms-teacher.description",
    category: "core-lms",
    priority: "critical",
    routes: [
      { path: "/", name: "features:routes.teacher.dashboard", icon: LayoutDashboard, defaultRoles: ["teacher"] },
      { path: "/classes", name: "features:routes.teacher.classes", icon: School, defaultRoles: ["teacher"], isParent: true },
      { path: "/classes/detail", name: "features:routes.teacher.classDetail", icon: FileText, defaultRoles: ["teacher"], parentPath: "/classes" },
      { path: "/students", name: "features:routes.teacher.students", icon: Users, defaultRoles: ["teacher"], parentPath: "/classes" },
      { path: "/grading", name: "features:routes.teacher.grading", icon: PenTool, defaultRoles: ["teacher"], parentPath: "/classes" },
      { path: "/gradebook", name: "features:routes.teacher.gradebook", icon: GraduationCap, defaultRoles: ["teacher"], parentPath: "/classes" }
    ]
  },
  {
    id: "core-lms-student",
    name: "features:features.core-lms-student.name",
    description: "features:features.core-lms-student.description",
    category: "core-lms",
    priority: "critical",
    routes: [
      { path: "/student", name: "features:routes.student.dashboard", icon: LayoutDashboard, defaultRoles: ["student"] },
      { path: "/student/assignments", name: "features:routes.student.assignments", icon: FileText, defaultRoles: ["student"], isParent: true },
      { path: "/student/materials", name: "features:routes.student.materials", icon: BookOpen, defaultRoles: ["student"] }
    ]
  },
  {
    id: "programming",
    name: "features:features.programming.name",
    description: "features:features.programming.description",
    category: "tech",
    priority: "critical",
    routes: [
      { path: "/playground", name: "features:routes.common.playground", icon: Terminal, defaultRoles: ["student", "teacher", "admin"] },
      { path: "/problems", name: "features:routes.common.problems", icon: Code2, defaultRoles: ["student", "teacher", "admin"], isParent: true },
      { path: "/solutions", name: "features:routes.common.solutions", icon: Lightbulb, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "gamification",
    name: "features:features.gamification.name",
    description: "features:features.gamification.description",
    category: "gamification",
    priority: "medium",
    routes: [
      { path: "/shop", name: "features:routes.common.shop", icon: ShoppingCart, defaultRoles: ["student", "admin"] },
      { path: "/teams", name: "features:routes.common.teams", icon: Users2, defaultRoles: ["student", "admin"] },
      { path: "/achievements", name: "features:routes.common.achievements", icon: Award, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "social",
    name: "features:features.social.name",
    description: "features:features.social.description",
    category: "social",
    priority: "low",
    routes: [
      { path: "/forum", name: "features:routes.common.forum", icon: MessageSquare, defaultRoles: ["student", "teacher", "admin"], isParent: true },
      { path: "/social-feed", name: "features:routes.common.socialFeed", icon: Share2, defaultRoles: ["student", "admin"] },
      { path: "/study-groups", name: "features:routes.common.studyGroups", icon: Users, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "parent-portal",
    name: "features:features.parent-portal.name",
    description: "features:features.parent-portal.description",
    category: "parent-special",
    priority: "high",
    routes: [
      { path: "/parent", name: "features:routes.parent.dashboard", icon: LayoutDashboard, defaultRoles: ["parent"] },
      { path: "/parent/progress", name: "features:routes.parent.progress", icon: TrendingUp, defaultRoles: ["parent"], isParent: true },
      { path: "/parent/report", name: "features:routes.parent.report", icon: FileBarChart, defaultRoles: ["parent"], parentPath: "/parent/progress" },
      { path: "/parent/attendance", name: "features:routes.parent.attendance", icon: Calendar, defaultRoles: ["parent"], parentPath: "/parent/progress" },
      { path: "/parent/contact", name: "features:routes.parent.contact", icon: MessageCircle, defaultRoles: ["parent"] },
      { path: "/parent/schedule", name: "features:routes.parent.schedule", icon: Calendar, defaultRoles: ["parent"] }
    ]
  },
  {
    id: "portfolio-builder",
    name: "features:features.portfolio-builder.name",
    description: "features:features.portfolio-builder.description",
    category: "tech",
    priority: "medium",
    routes: [
      { path: "/portfolio-builder", name: "features:routes.common.portfolioBuilder", icon: Briefcase, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "learning-autonomy",
    name: "features:features.learning-autonomy.name",
    description: "features:features.learning-autonomy.description",
    category: "ai-features",
    priority: "high",
    routes: [
      { path: "/student/autonomy", name: "features:routes.student.autonomy", icon: Timer, defaultRoles: ["student", "admin"] },
      { path: "/student/planner", name: "features:routes.student.planner", icon: Calendar, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "artifact-repo",
    name: "features:features.artifact-repo.name",
    description: "features:features.artifact-repo.description",
    category: "content-access",
    priority: "medium",
    routes: [
      { path: "/student/artifacts", name: "features:routes.student.artifacts", icon: FolderOpen, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "intervention-dashboard",
    name: "features:features.intervention-dashboard.name",
    description: "features:features.intervention-dashboard.description",
    category: "user-management",
    priority: "high",
    routes: [
      { path: "/teacher/interventions", name: "features:routes.teacher.interventions", icon: ShieldAlert, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "formative-assessment",
    name: "features:features.formative-assessment.name",
    description: "features:features.formative-assessment.description",
    category: "core-lms",
    priority: "high",
    routes: [
      { path: "/teacher/formative", name: "features:routes.teacher.formative", icon: Gauge, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "curriculum-portal",
    name: "features:features.curriculum-portal.name",
    description: "features:features.curriculum-portal.description",
    category: "parent-special",
    priority: "medium",
    routes: [
      { path: "/parent/curriculum", name: "features:routes.parent.curriculum", icon: BookOpen, defaultRoles: ["parent", "admin"] }
    ]
  },
  {
    id: "communication-hub",
    name: "features:features.communication-hub.name",
    description: "features:features.communication-hub.description",
    category: "parent-special",
    priority: "medium",
    routes: [
      { path: "/parent/communications", name: "features:routes.parent.communications", icon: MessageCircle, defaultRoles: ["parent", "admin"] }
    ]
  },
  {
    id: "rich-materials",
    name: "features:features.rich-materials.name",
    description: "features:features.rich-materials.description",
    category: "content-access",
    priority: "medium",
    routes: [
      { path: "/student/materials/rich", name: "features:routes.student.richMaterials", icon: PlayCircle, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "admin-analytics",
    name: "features:features.admin-analytics.name",
    description: "features:features.admin-analytics.description",
    category: "user-management",
    priority: "medium",
    routes: [
      { path: "/admin/analytics", name: "features:routes.admin.analytics", icon: BarChart3, defaultRoles: ["admin"] }
    ]
  },
  {
    id: "resource-optimization",
    name: "features:features.resource-optimization.name",
    description: "features:features.resource-optimization.description",
    category: "user-management",
    priority: "low",
    routes: [
      { path: "/admin/resources", name: "features:routes.admin.resources", icon: Database, defaultRoles: ["admin"] }
    ]
  },
  {
    id: "audio-lessons",
    name: "features:features.audio-lessons.name",
    description: "features:features.audio-lessons.description",
    category: "content-access",
    priority: "medium",
    routes: [
      { path: "/student/materials/audio", name: "features:routes.student.audioLessons", icon: Mic2, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "mind-maps",
    name: "features:features.mind-maps.name",
    description: "features:features.mind-maps.description",
    category: "content-access",
    priority: "medium",
    routes: [
      { path: "/student/materials/mindmaps", name: "features:routes.common.mindMaps", icon: Network, defaultRoles: ["student", "teacher", "admin"] }
    ]
  },
  {
    id: "micro-credentials",
    name: "features:features.micro-credentials.name",
    description: "features:features.micro-credentials.description",
    category: "gamification",
    priority: "high",
    routes: [
      { path: "/student/credentials", name: "features:routes.common.credentials", icon: Milestone, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "home-activities",
    name: "features:features.home-activities.name",
    description: "features:features.home-activities.description",
    category: "parent-special",
    priority: "medium",
    routes: [
      { path: "/parent/home-activities", name: "features:routes.parent.homeActivities", icon: Home, defaultRoles: ["parent", "admin"] }
    ]
  },
  {
    id: "exit-tickets",
    name: "features:features.exit-tickets.name",
    description: "features:features.exit-tickets.description",
    category: "content-access",
    priority: "high",
    routes: [
      { path: "/teacher/exit-tickets", name: "features:routes.teacher.exitTickets", icon: Ticket, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "learning-path-templates",
    name: "features:features.learning-path-templates.name",
    description: "features:features.learning-path-templates.description",
    category: "tech",
    priority: "medium",
    routes: [
      { path: "/teacher/path-templates", name: "features:routes.teacher.pathTemplates", icon: ScrollText, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "iep-manager",
    name: "features:features.iep-manager.name",
    description: "features:features.iep-manager.description",
    category: "tech",
    priority: "high",
    routes: [
      { path: "/teacher/iep", name: "features:routes.teacher.iep", icon: Contact2, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "study-buddies",
    name: "features:features.study-buddies.name",
    description: "features:features.study-buddies.description",
    category: "social",
    priority: "medium",
    routes: [
      { path: "/student/study-buddies", name: "features:routes.common.studyBuddies", icon: Group, defaultRoles: ["student", "admin"] }
    ]
  },
  {
    id: "skill-grouping",
    name: "features:features.skill-grouping.name",
    description: "features:features.skill-grouping.description",
    category: "tech",
    priority: "medium",
    routes: [
      { path: "/teacher/skill-groups", name: "features:routes.teacher.skillGroups", icon: Users, defaultRoles: ["teacher", "admin"] }
    ]
  },
  {
    id: "cohort-tracking",
    name: "features:features.cohort-tracking.name",
    description: "features:features.cohort-tracking.description",
    category: "tech",
    priority: "low",
    routes: [
      { path: "/admin/cohort-tracking", name: "features:routes.admin.cohortTracking", icon: BarChart3, defaultRoles: ["admin"] }
    ]
  }
];
