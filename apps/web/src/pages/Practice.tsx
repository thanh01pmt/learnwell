import {
  Search,
  BookOpen,
  Clock,
  Star,
  ChevronRight,
  Zap,
  Target,
  Trophy,
  Play,
  ArrowLeft,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockPracticeTopics = [
  {
    id: "1",
    title: "practice:mockTopics.t1.title",
    subject: "practice:mockTopics.t1.subject",
    icon: "🔢",
    totalQuestions: 50,
    completed: 35,
    accuracy: 85,
    difficulty: "easy",
    aiRecommended: false,
  },
  {
    id: "2",
    title: "practice:mockTopics.t2.title",
    subject: "practice:mockTopics.t2.subject",
    icon: "📐",
    totalQuestions: 40,
    completed: 20,
    accuracy: 72,
    difficulty: "medium",
    aiRecommended: true,
  },
  {
    id: "3",
    title: "practice:mockTopics.t3.title",
    subject: "practice:mockTopics.t3.subject",
    icon: "📚",
    totalQuestions: 30,
    completed: 10,
    accuracy: 90,
    difficulty: "hard",
    aiRecommended: false,
  },
  {
    id: "4",
    title: "practice:mockTopics.t4.title",
    subject: "practice:mockTopics.t4.subject",
    icon: "🇬🇧",
    totalQuestions: 60,
    completed: 45,
    accuracy: 78,
    difficulty: "medium",
    aiRecommended: true,
  },
  {
    id: "5",
    title: "practice:mockTopics.t5.title",
    subject: "practice:mockTopics.t5.subject",
    icon: "💬",
    totalQuestions: 80,
    completed: 60,
    accuracy: 88,
    difficulty: "easy",
    aiRecommended: false,
  },
];

const accuracyData = [
  { day: 'T2', accuracy: 65 },
  { day: 'T3', accuracy: 70 },
  { day: 'T4', accuracy: 68 },
  { day: 'T5', accuracy: 75 },
  { day: 'T6', accuracy: 82 },
  { day: 'T7', accuracy: 80 },
  { day: 'CN', accuracy: 85 },
];

const timePerProblemData = [
  { day: 'T2', time: 120 },
  { day: 'T3', time: 110 },
  { day: 'T4', time: 115 },
  { day: 'T5', time: 95 },
  { day: 'T6', time: 90 },
  { day: 'T7', time: 85 },
  { day: 'CN', time: 80 },
];

const dailyChallenges = [
  { id: "1", title: "practice:challenges.items.i1", questions: 10, xp: 50, icon: "⚡" },
  { id: "2", title: "practice:challenges.items.i2", questions: 30, xp: 150, icon: "🏃" },
  { id: "3", title: "practice:challenges.items.i3", questions: null, xp: null, icon: "♾️" },
];

export default function Practice() {
  const { t } = useTranslation(["practice", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isQuizMode && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsQuizMode(false);
      toast.error(t("practice:quiz.timesUp" as any) as any);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isQuizMode, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTopics = mockPracticeTopics.filter((topic) =>
    t(topic.title as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(topic.subject as any).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-success/20 text-success border-success/30">{t("practice:difficulty.easy" as any) as any}</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">{t("practice:difficulty.medium" as any) as any}</Badge>;
      case "hard":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{t("practice:difficulty.hard" as any) as any}</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("practice:title" as any) as any}</h1>
            <p className="text-muted-foreground">
              {t("practice:description" as any) as any}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("practice:stats.done" as any) as any}</p>
                <p className="text-2xl font-bold text-gradient">1,250</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("practice:stats.accuracy" as any) as any}</p>
                <p className="text-2xl font-bold text-success">82%</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("practice:stats.streak" as any) as any}</p>
                <p className="text-2xl font-bold">{t("practice:stats.streakDetail" as any, { count: 7 }) as any}</p>
              </div>
            </div>
          </div>
          <Link to="/student/leaderboard" className="glass-card rounded-2xl p-4 hover:bg-primary/5 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("practice:stats.totalXp" as any) as any}</p>
                <p className="text-2xl font-bold">2,450</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Adaptive Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-6 border-primary/10 shadow-xl shadow-primary/5"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t("practice:analytics.accuracyTrend" as any) as any}
                </h3>
                <p className="text-sm text-muted-foreground">{t("practice:analytics.accuracyTrendDesc" as any) as any}</p>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {t("practice:analytics.todayTrend" as any) as any}
              </Badge>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(val) => t(`practice:analytics.days.${val}` as any) as any} />
                  <YAxis hide domain={[0, 100]} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorAccuracy)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6 border-accent/10 shadow-xl shadow-accent/5"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  {t("practice:analytics.avgTime" as any) as any}
                </h3>
                <p className="text-sm text-muted-foreground">{t("practice:analytics.avgTimeDesc" as any) as any}</p>
              </div>
              <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                {t("practice:analytics.fasterBadge" as any) as any}
              </Badge>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timePerProblemData}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(val) => t(`practice:analytics.days.${val}` as any) as any} />
                  <YAxis hide />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--accent))', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="time" stroke="hsl(var(--accent))" strokeWidth={3} fillOpacity={1} fill="url(#colorTime)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations & Daily Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t("practice:challenges.title" as any) as any}
              </h2>
              <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-full px-4 border">
                <Label htmlFor="challenge-mode" className="text-xs font-bold whitespace-nowrap">{t("practice:challenges.mode" as any) as any}</Label>
                <Switch
                  id="challenge-mode"
                  checked={isChallengeMode}
                  onCheckedChange={(checked) => {
                    setIsChallengeMode(checked);
                    if (checked) {
                      toast.info(t("practice:challenges.toastInfo" as any) as any, { icon: "🔥" });
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dailyChallenges.slice(0, 2).map((challenge) => (
                <div
                  key={challenge.id}
                  className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group border-primary/5"
                  onClick={() => setIsQuizMode(true)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl shadow-lg shadow-primary/20">
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{t(challenge.title as any) as any}</h3>
                      <p className="text-sm text-muted-foreground">
                        {challenge.questions ? t("practice:challenges.questions" as any, { count: challenge.questions }) as any : t("practice:challenges.unlimited" as any) as any}
                        {challenge.xp && ` • +${challenge.xp} XP`}
                      </p>
                    </div>
                    <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              {t("practice:aiTutor.title" as any) as any}
            </h2>
            <div className="glass-card rounded-2xl p-5 bg-warning/5 border-warning/10 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="h-24 w-24 text-warning" />
              </div>
              <p className="text-sm italic leading-relaxed relative z-10">
                {t("practice:aiTutor.quote" as any) as any}
              </p>
              <Button variant="link" className="text-warning p-0 h-auto mt-4 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {t("practice:aiTutor.viewRoadmap" as any) as any}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Overlay */}
        <AnimatePresence>
          {isQuizMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background flex flex-col"
            >
              {/* Quiz Header */}
              <div className="p-4 border-b flex items-center justify-between glass-card">
                <Button variant="ghost" className="gap-2" onClick={() => setIsQuizMode(false)}>
                  <ArrowLeft className="h-4 w-4" />
                  {t("practice:quiz.exit" as any) as any}
                </Button>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                  </div>
                  <Button variant="outline" className="rounded-xl">{t("practice:quiz.submitEarly" as any) as any}</Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-4 py-2">
                <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
                  <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">{t("practice:quiz.progress" as any, { current: currentQuestion, total: 10 }) as any}</span>
                  <Progress value={(currentQuestion / 10) * 100} className="h-1.5" />
                </div>
              </div>

              {/* Quiz Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-10">
                <div className="max-w-3xl mx-auto space-y-8">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="p-8 rounded-3xl glass-card bg-primary/5 border-primary/20">
                      <h2 className="text-2xl font-bold">
                        {t("practice:quiz.mockQuestion.text" as any) as any}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "practice:quiz.mockQuestion.options.0",
                        "practice:quiz.mockQuestion.options.1",
                        "practice:quiz.mockQuestion.options.2",
                        "practice:quiz.mockQuestion.options.3"
                      ].map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="h-20 text-lg rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all text-left justify-start px-6 gap-4"
                          onClick={() => currentQuestion < 10 ? setCurrentQuestion(prev => prev + 1) : setIsQuizMode(false)}
                        >
                          <span className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-bold text-muted-foreground">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {t(option as any) as any}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="glass-card rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("practice:sections.searchPlaceholder" as any) as any}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Practice Topics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t("practice:sections.topicsTitle" as any) as any}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-2xl shrink-0">
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold truncate">{t(topic.title as any) as any}</h3>
                        {topic.aiRecommended && (
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] uppercase font-black px-1.5 h-4">
                            AI
                          </Badge>
                        )}
                      </div>
                      {getDifficultyBadge(topic.difficulty)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{t(topic.subject as any) as any}</p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("practice:sections.progress" as any) as any}</span>
                        <span className="font-medium">{topic.completed}/{topic.totalQuestions}</span>
                      </div>
                      <Progress value={(topic.completed / topic.totalQuestions) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-4 w-4 text-warning" />
                          <span>{t("practice:sections.accuracy" as any, { percent: topic.accuracy } as any) as any}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 transition-opacity">
                        {t("practice:sections.continue" as any) as any}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout >
  );
}
