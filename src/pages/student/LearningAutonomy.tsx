import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import {
    Target, Clock, Brain, Calendar, TrendingUp, CheckCircle2,
    Plus, Timer, Sparkles, BookOpen, ChevronRight, Activity,
    Zap, Lightbulb, Trophy, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";

const timeData = [
    { subject: "Mathematics", minutes: 120, focus: 85 },
    { subject: "Physics", minutes: 90, focus: 78 },
    { subject: "Computer Science", minutes: 240, focus: 92 },
    { subject: "History", minutes: 45, focus: 65 },
    { subject: "Literature", minutes: 60, focus: 72 },
];

const peakTimeData = [
    { hour: "8am", quality: 40 },
    { hour: "10am", quality: 85 },
    { hour: "12pm", quality: 60 },
    { hour: "2pm", quality: 55 },
    { hour: "4pm", quality: 75 },
    { hour: "6pm", quality: 90 },
    { hour: "8pm", quality: 45 },
];

const goals = [
    {
        id: 1,
        title: "Master Calculus Derivatives",
        progress: 75,
        category: "Academic",
        deadline: "Dec 15",
        milestones: [
            { text: "Complete practice set", done: true },
            { text: "Pass weekly quiz", done: true },
            { text: "Final unit test", done: false }
        ]
    },
    {
        id: 2,
        title: "Build Portfolio Project",
        progress: 40,
        category: "Skill",
        deadline: "Dec 20",
        milestones: [
            { text: "Define requirements", done: true },
            { text: "UX Design", done: false },
            { text: "Development", done: false }
        ]
    }
];

export const LearningAutonomy: React.FC = () => {
    const { t } = useTranslation(['student' as any, 'common' as any]);
    const [activeTab, setActiveTab] = useState('analytics');

    return (
        <AppLayout>
            <div className="p-6 space-y-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-blue-900/40 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                                {t('student:autonomy.title')} <Brain className="w-8 h-8 text-purple-400" />
                            </h1>
                            <p className="text-purple-200 mt-2 font-medium">{t('student:autonomy.subtitle')}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl gap-2 font-semibold shadow-lg shadow-purple-500/20">
                                <Plus className="w-4 h-4" /> {t('student:autonomy.actions.newGoal')}
                            </Button>
                            <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl gap-2 backdrop-blur-md">
                                <Timer className="w-4 h-4" /> {t('student:autonomy.actions.startSession')}
                            </Button>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md h-12">
                        <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all font-medium px-6">
                            <BarChart3 className="w-4 h-4 mr-2" /> {t('student:autonomy.tabs.analytics')}
                        </TabsTrigger>
                        <TabsTrigger value="goals" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all font-medium px-6">
                            <Target className="w-4 h-4 mr-2" /> {t('student:autonomy.tabs.goals')}
                        </TabsTrigger>
                        <TabsTrigger value="optimizer" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-xl transition-all font-medium px-6">
                            <Zap className="w-4 h-4 mr-2" /> {t('student:autonomy.tabs.optimizer')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analytics" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="glass-card lg:col-span-2 bg-white/5 border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-white">{t('student:autonomy.analytics.timeDistribution')}</CardTitle>
                                </CardHeader>
                                <CardContent className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={timeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="subject" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                                                {timeData.map((entry, index) => (
                                                    <Cell key={"cell-" + index} fill={index === 2 ? "#a855f7" : "#6366f1"} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="glass-card bg-white/5 border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold text-white">{t('student:autonomy.analytics.focusTrends')}</CardTitle>
                                </CardHeader>
                                <CardContent className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={peakTimeData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Line type="monotone" dataKey="quality" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="bg-purple-600/10 border-purple-500/20 backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="text-lg text-white font-semibold flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-purple-400" /> {t('student:autonomy.analytics.keyInsight')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <p className="text-white font-medium">{t('student:autonomy.analytics.optimalWindow', { start: '10am', end: '11am' })}</p>
                                        <p className="text-sm text-slate-400 mt-1">{t('student:autonomy.analytics.optimalAdvise', { subject: 'Mathematics', percent: 22 })}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400">{t('student:autonomy.analytics.monthlyScore')}</span>
                                        <span className="text-purple-400 font-bold">82%</span>
                                    </div>
                                    <Progress value={82} className="h-2 bg-white/10" />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {goals.map((goal) => (
                                <Card key={goal.id} className="bg-white/5 border-white/10 backdrop-blur-md group hover:bg-white/[0.08] transition-all">
                                    <CardHeader className="flex flex-row items-start justify-between">
                                        <div className="space-y-1">
                                            <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">{goal.category}</Badge>
                                            <CardTitle className="text-xl text-white font-bold">{goal.title}</CardTitle>
                                            <p className="text-sm text-slate-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> Due {goal.deadline}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
                                            {goal.progress}%
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>{t('student:autonomy.goals.overall')}</span>
                                                <span>{goal.progress}%</span>
                                            </div>
                                            <Progress value={goal.progress} className="h-2 bg-white/10" />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex flex-row items-center justify-between">
                                                <h4 className="text-lg font-bold text-white">{t('student:autonomy.goals.milestones')}</h4>
                                                <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">{t('student:autonomy.goals.update')}</Button>
                                            </div>
                                            {goal.milestones.map((ms, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                                    {ms.done ? (
                                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                    ) : (
                                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 shrink-0" />
                                                    )}
                                                    <span className={ms.done ? "text-slate-400 line-through" : "text-slate-200"}>
                                                        {ms.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300 hover:bg-white/5 group">
                                            {t('student:autonomy.goals.update')} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}

                            <Button variant="outline" className="w-full border-dashed border-2 border-white/10 backdrop-blur-md flex flex-col items-center justify-center p-12 hover:bg-white/[0.08] transition-all cursor-pointer group hover:border-purple-500/50 hover:bg-purple-500/5 h-full">
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                                    <Plus className="w-6 h-6 text-slate-400" />
                                </div>
                                <div className="text-center mt-4">
                                    <div className="text-lg font-bold text-white">{t('student:autonomy.goals.addNew')}</div>
                                    <div className="text-sm text-slate-400 mt-2 max-w-xs">{t('student:autonomy.goals.smartDesc')}</div>
                                </div>
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="optimizer" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-white/10 backdrop-blur-md p-8 overflow-hidden relative">
                                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                        <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                                            <Sparkles className="w-12 h-12 text-yellow-500" />
                                        </div>
                                        <div className="space-y-3 text-center md:text-left">
                                            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">{t('student:autonomy.optimizer.recommendation')}</Badge>
                                            <h2 className="text-2xl font-bold text-white leading-tight">
                                                {t('student:autonomy.optimizer.windowStart', { subject: 'Computer Science', count: 2 })}
                                            </h2>
                                            <p className="text-slate-300">
                                                {t('student:autonomy.optimizer.pastPerform', { time: '6:00 PM', multiplier: 1.5 })}
                                            </p>
                                            <Button className="bg-white text-indigo-900 hover:bg-white/90 font-bold rounded-xl px-8">
                                                {t('student:autonomy.optimizer.accept')}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                                <Lightbulb className="w-5 h-5 text-yellow-400" /> {t('student:autonomy.optimizer.protop')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-slate-300">
                                            "Try Pomodoro technique (45/15) for your deep work sessions today."
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                                <Target className="w-5 h-5 text-blue-400" /> {t('student:autonomy.optimizer.topicSuggest')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-slate-300">
                                            "You haven't reviewed 'Binary Search Trees' in 14 days. AI suggests a quick 10-min recap."
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
                                    <div className="p-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <Trophy className="w-5 h-5 text-yellow-400" /> {t('student:autonomy.optimizer.readiness')}
                                        </CardTitle>
                                        <CardDescription className="text-slate-400">{t('student:autonomy.optimizer.prepStatus')}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                                <span className="text-slate-300">Math Finals</span>
                                                <Badge variant="outline" className="text-primary border-primary/20">85% Ready</Badge>
                                            </div>
                                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                                <span className="text-slate-300">Physics Finals</span>
                                                <Badge variant="outline" className="text-yellow-400 border-yellow-400/20">62% Ready</Badge>
                                            </div>
                                            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                                <span className="text-slate-300">CS Project</span>
                                                <Badge variant="outline" className="text-slate-400 border-slate-400/20">40% Ready</Badge>
                                            </div>
                                        </div>
                                        <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white rounded-xl py-6 font-bold shadow-lg shadow-purple-500/20 gap-2">
                                            <Sparkles className="w-5 h-5" /> {t('student:autonomy.optimizer.generatePlan')}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
};

export default LearningAutonomy;
