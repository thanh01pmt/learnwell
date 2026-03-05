import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import {
    BarChart3,
    TrendingUp,
    Users,
    Target,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    Calendar,
    Zap,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// Mock Data
const scoreDistribution = [
    { range: "0-2", count: 1, color: "hsl(var(--destructive))" },
    { range: "2-4", count: 2, color: "hsl(var(--destructive))" },
    { range: "4-6", count: 8, color: "hsl(var(--warning))" },
    { range: "6-8", count: 15, color: "hsl(var(--primary))" },
    { range: "8-10", count: 12, color: "hsl(var(--success))" },
];

const performanceTrend = [
    { month: "dashboard:mockup.teacher.classes.sepShort", classAvg: 7.2, topAvg: 9.1 },
    { month: "dashboard:mockup.teacher.classes.octShort", classAvg: 7.5, topAvg: 9.3 },
    { month: "dashboard:mockup.teacher.classes.novShort", classAvg: 7.1, topAvg: 9.0 },
    { month: "dashboard:mockup.teacher.classes.decShort", classAvg: 7.8, topAvg: 9.4 },
    { month: "dashboard:mockup.teacher.classes.janShort", classAvg: 8.2, topAvg: 9.6 },
    { month: "dashboard:mockup.teacher.classes.febShort", classAvg: 8.0, topAvg: 9.5 },
];

const competencyData = [
    { subject: "dashboard:mockup.subjects.math", score: 85, fullMark: 100 },
    { subject: "dashboard:mockup.subjects.calculus", score: 72, fullMark: 100 },
    { subject: "dashboard:mockup.subjects.literature", score: 90, fullMark: 100 },
    { subject: "dashboard:mockup.subjects.english", score: 88, fullMark: 100 },
    { subject: "dashboard:mockup.subjects.physics", score: 65, fullMark: 100 },
    { subject: "dashboard:mockup.subjects.chemistry", score: 78, fullMark: 100 },
];

const atRiskStudents = [
    { name: "teacher:gradeAnalytics.mock.studentX", score: 4.2, trend: "down", attendance: "75%" },
    { name: "teacher:gradeAnalytics.mock.studentY", score: 4.8, trend: "down", attendance: "82%" },
    { name: "teacher:gradeAnalytics.mock.studentZ", score: 5.1, trend: "stable", attendance: "88%" },
];

export default function GradeAnalytics() {
    const { t } = useTranslation(["teacher", "common", "dashboard"]);
    const [timeRange, setTimeRange] = useState("semester");

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:analytics.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("teacher:analytics.subtitle" as any, { class: (t("common:mockData.defaultClass" as any) as any || "12A1") } as any) as any}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" className="gap-2 glass-card">
                            <Calendar className="h-4 w-4" />
                            {t("teacher:analytics.actions.semester" as any, { term: (t("common:mockData.defaultTerm" as any) as any || "II") } as any) as any}
                        </Button>
                        <Button variant="outline" className="gap-2 glass-card text-success border-success/20 bg-success/5">
                            <Download className="h-4 w-4" />
                            {t("teacher:gradebook.actions.export" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: t("teacher:analytics.stats.avgGrade" as any) as any, value: "7.82", trend: "+0.4", icon: Target, color: "primary" },
                        { label: t("teacher:analytics.stats.passRate" as any) as any, value: "92%", trend: "+2%", icon: CheckCircle2, color: "success" },
                        { label: t("teacher:analytics.stats.studentCount" as any) as any, value: "38", trend: t("teacher:analytics.atRisk.statusStable" as any), icon: Users, color: "blue" },
                        { label: t("teacher:analytics.stats.atRisk" as any) as any, value: "3", trend: "-1", icon: AlertTriangle, color: "destructive" },
                    ].map((stat, i) => (
                        <Card key={i} className="glass-card overflow-hidden group">
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={cn("p-2 rounded-lg", `bg-${stat.color === 'primary' ? 'primary' : stat.color}-500/10 text-${stat.color === 'primary' ? 'primary' : stat.color}-500`)}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <Badge variant="secondary" className="text-[10px] font-bold">
                                        {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : stat.trend.startsWith('-') ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
                                        {stat.trend}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Trend */}
                    <Card className="glass-card lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    {t("teacher:analytics.sections.performanceTrend" as any) as any}
                                </CardTitle>
                                <CardDescription>{t("teacher:analytics.sections.performanceTrendDesc" as any) as any}</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={performanceTrend}>
                                        <defs>
                                            <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => t(value as any) as any} />
                                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend verticalAlign="top" align="right" height={36} />
                                        <Area type="monotone" dataKey="classAvg" name={t("teacher:analytics.charts.classAvg" as any) as any} stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={3} />
                                        <Line type="monotone" dataKey="topAvg" name={t("teacher:analytics.charts.topGroup" as any) as any} stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--success))" }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Score Distribution */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Target className="h-5 w-5 text-primary" />
                                {t("teacher:analytics.sections.scoreDistribution" as any) as any}
                            </CardTitle>
                            <CardDescription>{t("teacher:analytics.sections.scoreDistributionDesc" as any) as any}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={scoreDistribution} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" opacity={0.5} />
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="range" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                                        />
                                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                            {scoreDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Competency & At-Risk Students */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Subject Competency */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-500" />
                                {t("teacher:analytics.sections.competency" as any) as any}
                            </CardTitle>
                            <CardDescription>{t("teacher:analytics.sections.competencyDesc" as any) as any}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
                                        <PolarGrid stroke="hsl(var(--border))" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(value) => t(value as any) as any} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name={t("teacher:analytics.charts.average" as any) as any}
                                            dataKey="score"
                                            stroke="hsl(var(--primary))"
                                            fill="hsl(var(--primary))"
                                            fillOpacity={0.5}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* At-Risk Students List */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                {t("teacher:analytics.sections.atRisk" as any) as any}
                            </CardTitle>
                            <CardDescription>{t("teacher:analytics.sections.atRiskDesc" as any) as any}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {atRiskStudents.map((student, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between group hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive font-bold">
                                                {t(student.name as any).split(' ').pop()?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold">{t(student.name as any)}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-[10px] h-4 bg-card">{t("teacher:analytics.atRisk.attendance" as any)}: {student.attendance}</Badge>
                                                    <Badge variant="outline" className="text-[10px] h-4 bg-card">{t("teacher:analytics.atRisk.score" as any)}: {student.score}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("text-xs font-bold", student.trend === "down" ? "text-destructive" : "text-muted-foreground")}>
                                                {student.trend === "down" ? t("teacher:analytics.atRisk.statusDown" as any) : t("teacher:analytics.atRisk.statusStable" as any)}
                                            </p>
                                            <Button variant="link" className="h-auto p-0 text-[10px] text-primary mt-1">{t("teacher:analytics.atRisk.action" as any)}</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-6 glass-card group">
                                {t("teacher:analytics.actions.viewAllAtRisk" as any) as any}
                                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
