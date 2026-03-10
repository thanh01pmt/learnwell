import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import PrivacyPage from "./pages/public/PrivacyPage";
import TermsPage from "./pages/public/TermsPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import SubmissionAnalytics from "./pages/teacher/SubmissionAnalytics";
import { PublicLayout } from "./components/layout/PublicLayout";
import Reports from "./pages/Reports";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Students from "./pages/Students";
import Grading from "./pages/Grading";
import Gradebook from "./pages/Gradebook";
import GradebookSpreadsheet from "./pages/teacher/GradebookSpreadsheet";
import RubricBuilder from "./pages/teacher/RubricBuilder";
import GradeAnalytics from "./pages/teacher/GradeAnalytics";
import SeatingChart from "./pages/teacher/SeatingChart";
import DashboardWidgets from "./pages/teacher/DashboardWidgets";
import AttendanceDashboard from "./pages/teacher/AttendanceDashboard";
import Flashcards from "./pages/student/Flashcards";
import NoteTaking from "./pages/student/NoteTaking";
import StudyGuideGenerator from "./pages/student/StudyGuideGenerator";
import DirectMessages from "./pages/DirectMessages";
import Announcements from "./pages/Announcements";
import OfficeHours from "./pages/OfficeHours";
import QuestionBank from "./pages/authoring/QuestionBank";
import Curriculum from "./pages/authoring/Curriculum";
import Exams from "./pages/authoring/Exams";
import TutorialBuilder from "./pages/authoring/TutorialBuilder";
import GradingConfigBuilder from "./pages/authoring/GradingConfigBuilder";
import Practice from "./pages/Practice";
import Competency from "./pages/Competency";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Achievements from "./pages/Achievements";
import Certificates from "./pages/Certificates";
import LearningPaths from "./pages/LearningPaths";
import CodePlayground from "./pages/CodePlayground";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import Notifications from "./pages/Notifications";
import ProblemLibrary from "./pages/code/ProblemLibrary";
import CodeIDE from "./pages/code/CodeIDE";
import PlatformLauncher from "./pages/code/PlatformLauncher";
import ContestList from "./pages/contests/ContestList";
import ContestDetail from "./pages/contests/ContestDetail";
import ContestArena from "./pages/contests/ContestArena";
import ContestLeaderboard from "./pages/contests/ContestLeaderboard";
import { QuickMatch } from "./pages/contests/QuickMatch";
import { TeamBattle } from "./pages/contests/TeamBattle";
import { BotArena } from "./pages/contests/BotArena";
import LearnCoinShop from "./pages/gamification/LearnCoinShop";

import TeamSystem from "./pages/gamification/TeamSystem";
import TechBlog from "./pages/code/TechBlog";
import SolutionSharing from "./pages/code/SolutionSharing";
import CodeGallery from "./pages/code/CodeGallery";
import PeerReview from "./pages/code/PeerReview";
import CodingProfile from "./pages/code/CodingProfile";
import InterestSurvey from "./pages/projects/InterestSurvey";
import ProjectLibrary from "./pages/projects/ProjectLibrary";
import StudyGroups from "./pages/social/StudyGroups";
import SocialFeed from "./pages/social/SocialFeed";
import AIRecommendations from "./pages/code/AIRecommendations";
import { AdaptivePractice } from "./pages/code/AdaptivePractice";
import { EloLeaderboard } from "./pages/contests/EloLeaderboard";
import { SolutionDetail } from "./pages/code/SolutionDetail";
import ProjectDetail from "./pages/projects/ProjectDetail";
import ProjectHub from "./pages/hub/ProjectHub";
import EditorRedirect from "./pages/hub/EditorRedirect";
import BlockEditorMock from "./pages/hub/BlockEditorMock";
import TextEditorMock from "./pages/hub/TextEditorMock";
import ExploreProjects from "@/pages/projects/ExploreProjects";
import AdvancedWorkspace from "./pages/editor/AdvancedWorkspace";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentMaterials from "./pages/student/StudentMaterials";
import Leaderboard from "./pages/student/Leaderboard";
import StudyPlanner from "./pages/student/StudyPlanner";
import { PersonalizedRoadmap } from "./pages/student/PersonalizedRoadmap";
import { SkillGapDashboard } from "./pages/student/SkillGapDashboard";


// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClasses from "./pages/admin/AdminClasses";
import TimetableBuilder from "./pages/admin/TimetableBuilder";
import EnrollmentManager from "./pages/admin/EnrollmentManager";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminUsers from "./pages/admin/AdminUsers";
import SystemHealth from "./pages/admin/SystemHealth";

// Contest Management
import ContestManagementLayout from "./pages/admin/contests/ContestManagementLayout";
import ContestListPage from "./pages/admin/contests/ContestListPage";
import ContestEditorPage from "./pages/admin/contests/ContestEditorPage";
import ChallengeBuilderPage from "./pages/admin/contests/ChallengeBuilderPage";
import AccountsPage from "./pages/admin/contests/AccountsPage";
import LiveMonitorPage from "./pages/admin/contests/LiveMonitorPage";
import PromotionPage from "./pages/admin/contests/PromotionPage";

// Parent pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ChildProgress from "./pages/parent/ChildProgress";
import ParentReport from "./pages/parent/ParentReport";
import AttendanceTracker from "./pages/parent/AttendanceTracker";
import TeacherContact from "./pages/parent/TeacherContact";
import Schedule from "./pages/parent/Schedule";

import { FeatureFlagProvider } from "@/contexts/FeatureFlagProvider";
import FeatureManagement from "@/pages/admin/FeatureManagement";
import { FeatureRoute } from "@/components/auth/FeatureRoute";
import { lazy, Suspense } from "react";


import { default as PortfolioBuilder } from "./pages/PortfolioBuilder";

const LearningAutonomy = lazy(() => import("@/pages/student/LearningAutonomy"));
const ArtifactRepo = lazy(() => import("@/pages/student/ArtifactRepo"));
const InterventionDashboard = lazy(() => import("@/pages/teacher/InterventionDashboard"));
const FormativeAssessment = lazy(() => import("@/pages/teacher/FormativeAssessment"));
const CurriculumPortal = lazy(() => import("@/pages/parent/CurriculumPortal"));
const CommunicationHub = lazy(() => import("@/pages/parent/CommunicationHub"));
const RichMaterials = lazy(() => import("@/pages/student/RichMaterials"));
const AdminAnalytics = lazy(() => import("@/pages/admin/AdminAnalytics"));
const ResourceOptimization = lazy(() => import("@/pages/admin/ResourceOptimization"));
const AudioLessons = lazy(() => import("@/pages/student/AudioLessons"));
const MindMaps = lazy(() => import("@/pages/student/MindMaps"));
const MicroCredentials = lazy(() => import("@/pages/student/MicroCredentials"));
const HomeActivities = lazy(() => import("@/pages/parent/HomeActivities"));
const ExitTickets = lazy(() => import("@/pages/teacher/ExitTickets"));
const LearningPathTemplates = lazy(() => import("@/pages/teacher/LearningPathTemplates"));
const IEPManager = lazy(() => import("@/pages/teacher/IEPManager"));
const StudyBuddies = lazy(() => import("@/pages/student/StudyBuddies"));
const SkillGrouping = lazy(() => import("@/pages/teacher/SkillGrouping"));
const CohortTracking = lazy(() => import("@/pages/admin/CohortTracking"));

function App() {
  return (
    <TooltipProvider>
      <FeatureFlagProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white font-mono tracking-tighter uppercase whitespace-pre animate-pulse">
              <span className="text-primary mr-2">{"//"}</span>
              LEARNWELL OS IS LOADING...
            </div>}>
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />

                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/explore/gallery" element={<PublicLayout><CodeGallery publicView={true} /></PublicLayout>} />
                <Route path="/explore/projects" element={<PublicLayout><ExploreProjects publicView={true} /></PublicLayout>} />
                <Route path="/explore/leaderboard" element={<PublicLayout><EloLeaderboard publicView={true} /></PublicLayout>} />
                <Route path="/explore/forum" element={<PublicLayout><Forum publicView={true} /></PublicLayout>} />
                <Route path="/explore/blog" element={<PublicLayout><TechBlog /></PublicLayout>} />
                <Route path="/explore/problems" element={<PublicLayout><StudentMaterials publicView={true} /></PublicLayout>} />
                <Route path="/explore/contests" element={<PublicLayout><ContestList /></PublicLayout>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/demo" element={<Demo />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Index />} />

                  {/* Admin Management */}
                  <Route path="/admin/features" element={<FeatureRoute path="/admin/features"><FeatureManagement /></FeatureRoute>} />

                  {/* Teacher routes */}
                  <Route path="/teacher/dashboard" element={<FeatureRoute path="/teacher/dashboard"><TeacherDashboard /></FeatureRoute>} />
                  <Route path="/reports" element={<FeatureRoute path="/reports"><Reports /></FeatureRoute>} />
                  <Route path="/classes" element={<FeatureRoute path="/classes"><Classes /></FeatureRoute>} />
                  <Route path="/classes/:id" element={<FeatureRoute path="/classes/:id"><ClassDetail /></FeatureRoute>} />
                  <Route path="/students" element={<FeatureRoute path="/students"><Students /></FeatureRoute>} />
                  <Route path="/grading" element={<FeatureRoute path="/grading"><Grading /></FeatureRoute>} />
                  <Route path="/gradebook" element={<FeatureRoute path="/gradebook"><Gradebook /></FeatureRoute>} />
                  <Route path="/gradebook-advanced" element={<FeatureRoute path="/gradebook-advanced"><GradebookSpreadsheet /></FeatureRoute>} />
                  <Route path="/rubric-builder" element={<FeatureRoute path="/rubric-builder"><RubricBuilder /></FeatureRoute>} />
                  <Route path="/grade-analytics" element={<FeatureRoute path="/grade-analytics"><GradeAnalytics /></FeatureRoute>} />
                  <Route path="/teacher/seating-chart" element={<FeatureRoute path="/teacher/seating-chart"><SeatingChart /></FeatureRoute>} />
                  <Route path="/teacher/dashboard-widgets" element={<FeatureRoute path="/teacher/dashboard-widgets"><DashboardWidgets /></FeatureRoute>} />
                  <Route path="/teacher/attendance" element={<FeatureRoute path="/teacher/attendance"><AttendanceDashboard /></FeatureRoute>} />
                  <Route path="/teacher/interventions" element={<FeatureRoute path="/teacher/interventions"><InterventionDashboard /></FeatureRoute>} />
                  <Route path="/teacher/formative" element={<FeatureRoute path="/teacher/formative"><FormativeAssessment /></FeatureRoute>} />
                  <Route path="/teacher/exit-tickets" element={<FeatureRoute path="/teacher/exit-tickets"><ExitTickets /></FeatureRoute>} />
                  <Route path="/teacher/path-templates" element={<FeatureRoute path="/teacher/path-templates"><LearningPathTemplates /></FeatureRoute>} />
                  <Route path="/teacher/iep" element={<FeatureRoute path="/teacher/iep"><IEPManager /></FeatureRoute>} />
                  <Route path="/teacher/skill-groups" element={<FeatureRoute path="/teacher/skill-groups"><SkillGrouping /></FeatureRoute>} />
                  <Route path="/teacher/submission-analytics" element={<FeatureRoute path="/teacher/submission-analytics"><SubmissionAnalytics /></FeatureRoute>} />

                  {/* Communications & Shared */}
                  <Route path="/messages" element={<FeatureRoute path="/messages"><DirectMessages /></FeatureRoute>} />
                  <Route path="/announcements" element={<FeatureRoute path="/announcements"><Announcements /></FeatureRoute>} />
                  <Route path="/office-hours" element={<FeatureRoute path="/office-hours"><OfficeHours /></FeatureRoute>} />
                  <Route path="/settings" element={<FeatureRoute path="/settings"><Settings /></FeatureRoute>} />
                  <Route path="/profile" element={<FeatureRoute path="/profile"><Profile /></FeatureRoute>} />
                  <Route path="/achievements" element={<FeatureRoute path="/achievements"><Achievements /></FeatureRoute>} />
                  <Route path="/certificates" element={<FeatureRoute path="/certificates"><Certificates /></FeatureRoute>} />
                  <Route path="/forum" element={<FeatureRoute path="/forum"><Forum /></FeatureRoute>} />
                  <Route path="/forum/:id" element={<FeatureRoute path="/forum/:id"><ForumPost /></FeatureRoute>} />
                  <Route path="/notifications" element={<FeatureRoute path="/notifications"><Notifications /></FeatureRoute>} />

                  {/* Authoring */}
                  <Route path="/authoring/questions" element={<FeatureRoute path="/authoring/questions"><QuestionBank /></FeatureRoute>} />
                  <Route path="/authoring/curriculum" element={<FeatureRoute path="/authoring/curriculum"><Curriculum /></FeatureRoute>} />
                  <Route path="/authoring/exams" element={<FeatureRoute path="/authoring/exams"><Exams /></FeatureRoute>} />
                  <Route path="/authoring/tutorial-builder" element={<FeatureRoute path="/authoring/tutorial-builder"><TutorialBuilder /></FeatureRoute>} />
                  <Route path="/authoring/grading-config" element={<FeatureRoute path="/authoring/grading-config"><GradingConfigBuilder /></FeatureRoute>} />

                  {/* Code & Tech */}
                  <Route path="/playground" element={<FeatureRoute path="/playground"><CodePlayground /></FeatureRoute>} />
                  <Route path="/problems" element={<FeatureRoute path="/problems"><ProblemLibrary /></FeatureRoute>} />
                  <Route path="/problems/:id/solve" element={<FeatureRoute path="/problems/:id/solve"><CodeIDE /></FeatureRoute>} />
                  <Route path="/code/launcher" element={<FeatureRoute path="/code/launcher"><PlatformLauncher /></FeatureRoute>} />
                  <Route path="/profile/coding" element={<CodingProfile />} />
                  <Route path="/recommendations" element={<AIRecommendations />} />
                  <Route path="/student/adaptive-practice" element={<AdaptivePractice />} />
                  <Route path="/blog" element={<TechBlog />} />
                  <Route path="/solutions" element={<SolutionSharing />} />
                  <Route path="/solutions/:id" element={<SolutionDetail />} />
                  <Route path="/code-gallery" element={<CodeGallery />} />
                  <Route path="/peer-review" element={<PeerReview />} />

                  {/* Competition & Gamification */}
                  <Route path="/contests" element={<FeatureRoute path="/contests"><ContestList /></FeatureRoute>} />
                  <Route path="/contests/:id" element={<FeatureRoute path="/contests/:id"><ContestDetail /></FeatureRoute>} />
                  <Route path="/contests/:id/arena" element={<FeatureRoute path="/contests/:id/arena"><ContestArena /></FeatureRoute>} />
                  <Route path="/contests/:id/leaderboard" element={<FeatureRoute path="/contests/:id/leaderboard"><ContestLeaderboard /></FeatureRoute>} />
                  <Route path="/contests/quick-match" element={<FeatureRoute path="/contests/quick-match"><QuickMatch /></FeatureRoute>} />
                  <Route path="/contests/team-battle" element={<FeatureRoute path="/contests/team-battle"><TeamBattle /></FeatureRoute>} />
                  <Route path="/contests/bot-arena" element={<FeatureRoute path="/contests/bot-arena"><BotArena /></FeatureRoute>} />
                  <Route path="/contests/leaderboard/elo" element={<EloLeaderboard />} />
                  <Route path="/shop" element={<FeatureRoute path="/shop"><LearnCoinShop /></FeatureRoute>} />
                  <Route path="/teams" element={<TeamSystem />} />

                  {/* Projects & Social */}
                  <Route path="/project-library" element={<ProjectLibrary />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/interests" element={<InterestSurvey />} />
                  <Route path="/study-groups" element={<StudyGroups />} />
                  <Route path="/social-feed" element={<SocialFeed />} />
                  <Route path="/explore/projects" element={<ExploreProjects />} />

                  {/* Hub & Editor Mockups */}
                  <Route path="/hub" element={<ProjectHub />} />
                  <Route path="/editor" element={<EditorRedirect />} />
                  <Route path="/editor/block" element={<BlockEditorMock />} />
                  <Route path="/editor/text" element={<TextEditorMock />} />
                  <Route path="/workspace" element={<AdvancedWorkspace />} />

                  {/* Learning & Progress */}
                  <Route path="/practice" element={<FeatureRoute path="/practice"><Practice /></FeatureRoute>} />
                  <Route path="/competency" element={<FeatureRoute path="/competency"><Competency /></FeatureRoute>} />
                  <Route path="/progress" element={<FeatureRoute path="/progress"><Progress /></FeatureRoute>} />
                  <Route path="/learning-paths" element={<FeatureRoute path="/learning-paths"><LearningPaths /></FeatureRoute>} />
                  <Route path="/resources" element={<FeatureRoute path="/resources"><Resources /></FeatureRoute>} />

                  {/* Student Routes (High-Level) */}
                  <Route path="/student" element={<FeatureRoute path="/student"><StudentDashboard /></FeatureRoute>} />
                  <Route path="/student/dashboard" element={<FeatureRoute path="/student/dashboard"><StudentDashboard /></FeatureRoute>} />
                  <Route path="/student/assignments" element={<FeatureRoute path="/student/assignments"><StudentAssignments /></FeatureRoute>} />
                  <Route path="/student/materials" element={<FeatureRoute path="/student/materials"><StudentMaterials /></FeatureRoute>} />
                  <Route path="/student/leaderboard" element={<FeatureRoute path="/student/leaderboard"><Leaderboard /></FeatureRoute>} />
                  <Route path="/student/planner" element={<FeatureRoute path="/student/planner"><StudyPlanner /></FeatureRoute>} />
                  <Route path="/student/roadmap" element={<FeatureRoute path="/student/roadmap"><PersonalizedRoadmap /></FeatureRoute>} />
                  <Route path="/student/skill-gap" element={<FeatureRoute path="/student/skill-gap"><SkillGapDashboard /></FeatureRoute>} />
                  <Route path="/student/flashcards" element={<FeatureRoute path="/student/flashcards"><Flashcards /></FeatureRoute>} />
                  <Route path="/student/notes" element={<FeatureRoute path="/student/notes"><NoteTaking /></FeatureRoute>} />
                  <Route path="/student/study-guide" element={<FeatureRoute path="/student/study-guide"><StudyGuideGenerator /></FeatureRoute>} />
                  <Route path="/student/study-buddies" element={<FeatureRoute path="/student/study-buddies"><StudyBuddies /></FeatureRoute>} />

                  {/* Phase 9A New Routes */}
                  <Route path="/student/autonomy" element={<FeatureRoute path="/student/autonomy"><LearningAutonomy /></FeatureRoute>} />
                  <Route path="/student/artifacts" element={<FeatureRoute path="/student/artifacts"><ArtifactRepo /></FeatureRoute>} />
                  <Route path="/student/credentials" element={<FeatureRoute path="/student/credentials"><MicroCredentials /></FeatureRoute>} />
                  <Route path="/student/materials/audio" element={<FeatureRoute path="/student/materials/audio"><AudioLessons /></FeatureRoute>} />
                  <Route path="/student/materials/mindmaps" element={<FeatureRoute path="/student/materials/mindmaps"><MindMaps /></FeatureRoute>} />

                  {/* Global Features */}
                  <Route path="/portfolio-builder" element={<FeatureRoute path="/portfolio-builder"><PortfolioBuilder /></FeatureRoute>} />

                  {/* Parent routes */}
                  <Route path="/parent" element={<FeatureRoute path="/parent"><ParentDashboard /></FeatureRoute>} />
                  <Route path="/parent/progress" element={<FeatureRoute path="/parent/progress"><ChildProgress /></FeatureRoute>} />
                  <Route path="/parent/report" element={<FeatureRoute path="/parent/report"><ParentReport /></FeatureRoute>} />
                  <Route path="/parent/attendance" element={<FeatureRoute path="/parent/attendance"><AttendanceTracker /></FeatureRoute>} />
                  <Route path="/parent/contact" element={<FeatureRoute path="/parent/contact"><TeacherContact /></FeatureRoute>} />
                  <Route path="/parent/schedule" element={<FeatureRoute path="/parent/schedule"><Schedule /></FeatureRoute>} />
                  <Route path="/parent/curriculum" element={<FeatureRoute path="/parent/curriculum"><CurriculumPortal /></FeatureRoute>} />
                  <Route path="/parent/communications" element={<FeatureRoute path="/parent/communications"><CommunicationHub /></FeatureRoute>} />
                  <Route path="/parent/home-activities" element={<FeatureRoute path="/parent/home-activities"><HomeActivities /></FeatureRoute>} />

                  {/* Admin routes */}
                  <Route path="/admin" element={<FeatureRoute path="/admin"><AdminDashboard /></FeatureRoute>} />
                  <Route path="/admin/classes" element={<FeatureRoute path="/admin/classes"><AdminClasses /></FeatureRoute>} />
                  <Route path="/admin/timetable" element={<FeatureRoute path="/admin/timetable"><TimetableBuilder /></FeatureRoute>} />
                  <Route path="/admin/enrollment" element={<FeatureRoute path="/admin/enrollment"><EnrollmentManager /></FeatureRoute>} />
                  <Route path="/admin/teachers" element={<FeatureRoute path="/admin/teachers"><AdminTeachers /></FeatureRoute>} />
                  <Route path="/admin/users" element={<FeatureRoute path="/admin/users"><AdminUsers /></FeatureRoute>} />
                  <Route path="/admin/analytics" element={<FeatureRoute path="/admin/analytics"><AdminAnalytics /></FeatureRoute>} />
                  <Route path="/admin/resources" element={<FeatureRoute path="/admin/resources"><ResourceOptimization /></FeatureRoute>} />
                  <Route path="/admin/cohort-tracking" element={<FeatureRoute path="/admin/cohort-tracking"><CohortTracking /></FeatureRoute>} />
                  <Route path="/admin/system-health" element={<FeatureRoute path="/admin/system-health"><SystemHealth /></FeatureRoute>} />

                  {/* Contest Management */}
                  <Route path="/admin/contests" element={<FeatureRoute path="/admin/contests"><ContestManagementLayout /></FeatureRoute>}>
                    <Route index element={<ContestListPage />} />
                    <Route path=":id/edit" element={<ContestEditorPage />} />
                    <Route path=":id/rounds" element={<ContestEditorPage />} /> {/* We can handle sub-tabs in Editor or separate pages */}
                    <Route path=":id/boards" element={<ContestEditorPage />} />
                    <Route path=":id/challenges" element={<ChallengeBuilderPage />} />
                    <Route path=":id/accounts" element={<AccountsPage />} />
                    <Route path=":id/live" element={<LiveMonitorPage />} />
                    <Route path=":id/promotion" element={<PromotionPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </FeatureFlagProvider>
    </TooltipProvider>
  );
}

export default App;
