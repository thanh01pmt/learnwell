import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    Clock,
    BookOpen,
    CheckCircle2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Target,
    Flame,
    Layout
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const weeklyTasks = [
    { day: "common:days.monday", tasks: ["planner:mockup.tasks.math", "planner:mockup.tasks.english"], completed: true },
    { day: "common:days.tuesday", tasks: ["planner:mockup.tasks.physics", "planner:mockup.tasks.literature"], completed: true },
    { day: "common:days.wednesday", tasks: ["planner:mockup.tasks.chemistry"], completed: false },
    { day: "common:days.thursday", tasks: ["planner:mockup.tasks.biology"], completed: false },
    { day: "common:days.friday", tasks: ["planner:mockup.tasks.summary"], completed: false },
];

const studyGoals = [
    { title: "planner:goals.mockup.math", progress: 80, color: "text-primary" },
    { title: "planner:goals.mockup.english", progress: 60, color: "text-success" },
    { title: "planner:goals.mockup.physics", progress: 30, color: "text-amber-500" },
];

export default function StudyPlanner() {
    const { t } = useTranslation(["planner", "common"]);
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Layout className="h-6 w-6 text-primary" />
                            {t("planner:title" as any)}
                        </h1>
                        <p className="text-muted-foreground">{t("planner:subtitle" as any)}</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90 active:scale-95">
                        <Plus className="h-4 w-4" />
                        {t("planner:actions.newGoal" as any)}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Planner (Calendar View) */}
                    <Card className="glass-card lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle className="text-lg">{t("planner:calendar.title" as any)}</CardTitle>
                                <CardDescription>{t("common:roadmap.nodes.quarter" as any, { count: 1 })} 1, 2024</CardDescription>
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 pt-4">
                                {weeklyTasks.map((dayPlan, idx) => (
                                    <motion.div
                                        key={dayPlan.day}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${dayPlan.completed
                                            ? 'bg-success/5 border-success/20 opacity-80'
                                            : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-xl flex flex-col items-center justify-center font-bold ${dayPlan.completed ? 'bg-success/20 text-success' : 'bg-card text-muted-foreground'
                                                }`}>
                                                <span className="text-[10px] uppercase font-black tracking-tighter">{t("planner:calendar.day" as any)}</span>
                                                <span>{idx + 2}</span>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold ${dayPlan.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                    {t(dayPlan.day as any)}
                                                </h4>
                                                <div className="flex gap-2 mt-1">
                                                    {dayPlan.tasks.map(task => (
                                                        <Badge key={task} variant="secondary" className="text-[10px] font-normal py-0">
                                                            {t(task as any)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {dayPlan.completed ? (
                                            <CheckCircle2 className="h-6 w-6 text-success" />
                                        ) : (
                                            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                                                <Plus className="h-5 w-5" />
                                            </Button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Goals & Progress */}
                    <div className="space-y-6">
                        <Card className="glass-card bg-gradient-to-br from-primary/5 to-transparent">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    {t("planner:goals.title" as any)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                {studyGoals.map((goal) => (
                                    <div key={goal.title} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold">{t(goal.title as any)}</span>
                                            <span className={`font-black ${goal.color}`}>{goal.progress}%</span>
                                        </div>
                                        <Progress value={goal.progress} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="glass-card bg-amber-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Flame className="h-24 w-24 text-amber-500" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Flame className="h-5 w-5 text-amber-600" />
                                    {t("planner:streak.title" as any)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <p className="text-sm text-muted-foreground">{t("planner:streak.message" as any)}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                                        <div key={d} className={`h-8 w-1 flex-1 rounded-full ${d <= 5 ? 'bg-amber-500' : 'bg-muted'}`} />
                                    ))}
                                </div>
                                <Button className="w-full bg-amber-500 hover:bg-amber-600 rounded-xl mt-4">
                                    {t("planner:streak.action" as any)}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="glass-card">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{t("planner:tips.title" as any)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-3 text-sm italic text-muted-foreground p-3 rounded-xl bg-muted/50 border border-border/50">
                                    <BookOpen className="h-5 w-5 text-primary shrink-0 not-italic" />
                                    "{t("planner:tips.pomodoro" as any)}"
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
