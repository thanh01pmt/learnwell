import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Calendar,
  ChevronRight,
  Play,
  Star,
  Zap,
  Bell,
  CheckCircle2,
  Layout,
  Rocket
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const upcomingAssignments = [
  {
    id: "1",
    title: "dashboard:mockup.assignments.mathQuiz",
    subject: "dashboard:mockup.subjects.math",
    dueDateKey: "today",
    dueTime: "15:00",
    type: "exam",
    urgent: true,
  },
  {
    id: "2",
    title: "dashboard:mockup.assignments.englishHomework",
    subject: "dashboard:mockup.subjects.english",
    dueDateKey: "tomorrow",
    dueTime: "23:59",
    type: "homework",
    urgent: false,
  },
  {
    id: "3",
    title: "dashboard:mockup.assignments.literatureAnalysis",
    subject: "dashboard:mockup.subjects.literature",
    dueDate: "28/01, 17:00",
    type: "essay",
    urgent: false,
  },
];

import { recentLessons, studentNotifications as notifications } from "@/mocks";

export default function StudentDashboard() {
  const { t } = useTranslation(["dashboard", "common"]);
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(7);
  const [recentLessonsState, setRecentLessons] = useState(recentLessons);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const handleCompleteLesson = (lessonId: string) => {
    const lesson = recentLessonsState.find(l => l.id === lessonId);
    if (lesson?.progress === 100) {
      toast.info(t("dashboard:actions.review"));
      return;
    }

    setRecentLessons(prev => prev.map(l =>
      l.id === lessonId ? { ...l, progress: 100 } : l
    ));

    const gainXp = 50;
    setXp(prev => {
      const newXp = prev + gainXp;
      if (Math.floor(newXp / 1000) > Math.floor(prev / 1000)) {
        setTimeout(() => setShowLevelUp(true), 1000);
      }
      return newXp;
    });

    toast.success(t("dashboard:mockup.xpGained" as any, { amount: gainXp } as any) as any, {
      icon: <Zap className="h-4 w-4 text-warning fill-warning" />,
    });
  };

  const currentLevel = Math.floor(xp / 1000) + 1;
  const xpInLevel = xp % 1000;
  const xpToNextLevel = 1000 - xpInLevel;

  return (
    <AppLayout>
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <Card className="max-w-sm w-full p-8 text-center glass-card border-primary/50 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <Trophy className="h-20 w-20 text-warning mx-auto mb-4 animate-bounce-subtle" />
              <h2 className="text-3xl font-bold mb-2">{t("dashboard:levels.levelUp")}</h2>
              <p className="text-muted-foreground mb-6">
                {t("dashboard:levels.reachedLevel", { name: t("common:common.me"), level: currentLevel })}
              </p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => setShowLevelUp(false)} className="w-full">{t("dashboard:actions.continueWorking") as any}</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student1" />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {t("dashboard:welcome.greeting", { name: t("common:common.me") }) as any}
                </h1>
                <span className="text-2xl">👋</span>
              </div>
              <p className="text-muted-foreground">
                {t("dashboard:continueLearning") as any}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="py-1.5 px-3 bg-card border-warning/30">
              <Zap className="h-4 w-4 mr-1.5 text-warning fill-warning" />
              {t("common:common.streak")}: {streak} {t("common:common.day")} 🔥
            </Badge>
            <Link to="/student/leaderboard">
              <motion.div
                key={xp}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
              >
                <Badge variant="outline" className="py-1.5 px-3 bg-card border-primary/30 hover:bg-primary/5 transition-colors">
                  <Trophy className="h-4 w-4 mr-1.5 text-primary fill-primary/20" />
                  {xp.toLocaleString()} XP
                </Badge>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:stats.lessons") as any}</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:stats.completed") as any}</p>
                <p className="text-2xl font-bold text-success">18</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:stats.pending") as any}</p>
                <p className="text-2xl font-bold text-warning">3</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:stats.avgGrade") as any}</p>
                <p className="text-2xl font-bold text-gradient">8.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2.6: Study Planner Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/student/planner">
            <div className="glass-card rounded-2xl p-4 bg-primary/5 hover:bg-primary/10 transition-all border border-primary/20 flex items-center justify-between group h-full">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Layout className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t("dashboard:sections.studyPlanner" as any) as any}</h3>
                  <p className="text-sm text-muted-foreground">{t("dashboard:mockup.planner.pendingTasks" as any, { count: 3 } as any) as any}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-primary">{t("dashboard:sections.weeklyProgress") as any}</p>
                  <p className="text-sm font-black text-gradient">60%</p>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/explore/projects">
            <div className="glass-card rounded-2xl p-4 bg-accent/5 hover:bg-accent/10 transition-all border border-accent/20 flex items-center justify-between group h-full">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t("navigation:projectHub", { defaultValue: "Trạm dự án (Hub)" })}</h3>
                  <p className="text-sm text-muted-foreground">{t("hub:explore.subtitle", { defaultValue: "Khám phá và sáng tạo dự án của riêng bạn" })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Assignments & Lessons */}
          <div className="xl:col-span-2 space-y-6">
            {/* Upcoming Assignments */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{t("dashboard:sections.upcomingAssignments") as any}</h2>
                <Link to="/student/assignments">
                  <Button variant="ghost" size="sm" className="text-primary">
                    {t("dashboard:actions.seeAll") as any}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${assignment.urgent ? 'bg-destructive/20' : 'bg-primary/20'
                        }`}>
                        {assignment.type === 'exam' ? '📝' : assignment.type === 'essay' ? '✍️' : '📋'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{t(assignment.title as any)}</p>
                          {assignment.urgent && (
                            <Badge className="bg-destructive/20 text-destructive text-xs">{t("dashboard:mockup.assignments.urgent")}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">{t(assignment.subject as any)}</Badge>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>
                            {(assignment as any).dueDateKey
                              ? `${t(`dashboard:mockup.time.${(assignment as any).dueDateKey}`, { defaultValue: (assignment as any).dueDateKey })}, ${(assignment as any).dueTime}`
                              : assignment.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="transition-opacity">
                      <Play className="h-4 w-4 mr-1" />
                      {t("dashboard:actions.doAssignment") as any}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{t("dashboard:sections.continueLearning") as any}</h2>
                <Link to="/student/materials">
                  <Button variant="ghost" size="sm" className="text-primary">
                    {t("dashboard:actions.seeAll") as any}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentLessonsState.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all hover:shadow-lg cursor-pointer group relative"
                    onClick={() => handleCompleteLesson(lesson.id)}
                  >
                    {lesson.progress === 100 && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="h-5 w-5 text-success fill-success/20" />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {lesson.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{t(lesson.title as any)}</p>
                        <p className="text-sm text-muted-foreground">{t(lesson.subject as any)}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {lesson.durationCount} {t(lesson.durationKey as any)}
                        </span>
                        <span className="font-medium">{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 transition-opacity"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {lesson.progress === 100 ? t("dashboard:actions.review") : t("dashboard:actions.continue")}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule & Notifications */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t("dashboard:sections.todaySchedule") as any}</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border-l-4 border-primary">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">08:00</p>
                    <p className="text-xs text-muted-foreground">09:30</p>
                  </div>
                  <div>
                    <p className="text-medium text-sm">{t("dashboard:mockup.subjects.math") as any}</p>
                    <p className="text-xs text-muted-foreground">{t("dashboard:mockup.schedule.grade" as any, { grade: "6A" }) as any} • {t("dashboard:mockup.schedule.classroom" as any, { room: "301" }) as any}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">10:00</p>
                    <p className="text-xs text-muted-foreground">11:30</p>
                  </div>
                  <div>
                    <p className="text-medium text-sm">{t("dashboard:mockup.subjects.english") as any}</p>
                    <p className="text-xs text-muted-foreground">{t("dashboard:mockup.schedule.grade" as any, { grade: "6A" }) as any} • {t("dashboard:mockup.schedule.classroom" as any, { room: "205" }) as any}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">14:00</p>
                    <p className="text-xs text-muted-foreground">15:30</p>
                  </div>
                  <div>
                    <p className="text-medium text-sm">{t("dashboard:mockup.subjects.literature") as any}</p>
                    <p className="text-xs text-muted-foreground">{t("dashboard:mockup.schedule.grade" as any, { grade: "6A" }) as any} • {t("dashboard:mockup.schedule.classroom" as any, { room: "302" }) as any}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{t("dashboard:sections.notifications") as any}</h3>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {notifications.length} {t("common:common.new" as any) as any}
                </Badge>
              </div>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center text-sm">
                      {notification.type === 'grade' ? '📊' : notification.type === 'lesson' ? '📖' : '⏰'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2">{t((notification as any).messageKey as any)}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(`dashboard:mockup.notifications.time.${(notification as any).timeKey}` as any, { count: (notification as any).timeCount })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Practice */}
            <div className="glass-card rounded-2xl p-5 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{t("dashboard:sections.quickPractice")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("dashboard:mockup.practiceReminder")}
                </p>
                <Link to="/practice">
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    {t("dashboard:actions.startNow") as any}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
