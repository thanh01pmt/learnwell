import React, { useState } from "react";
import {
    BarChart3,
    Search,
    Filter,
    Download,
    TrendingUp,
    TrendingDown,
    Users,
    Calendar,
    ArrowRight,
    ChevronRight,
    TrendingUp as TrendUp,
    FileText,
    PieChart,
    LayoutGrid,
    Sparkles,
    Info,
    CalendarDays,
    Target,
    Rocket,
    Plus
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation, Trans } from "react-i18next";

const MOCK_COHORTS = [
    {
        id: "coh-2022",
        nameKey: "dashboard:mockup.admin.cohortTracking.mock.cohort2022",
        students: 1240,
        graduationRate: 98,
        avgGPA: 8.4,
        retention: 96,
        status: "healthy",
        growth: 4.2
    },
    {
        id: "coh-2023",
        nameKey: "dashboard:mockup.admin.cohortTracking.mock.cohort2023",
        students: 1450,
        graduationRate: null,
        avgGPA: 8.1,
        retention: 92,
        status: "monitor",
        growth: -1.5
    },
    {
        id: "coh-2024",
        nameKey: "dashboard:mockup.admin.cohortTracking.mock.cohort2024",
        students: 1620,
        graduationRate: null,
        avgGPA: 7.9,
        retention: 98,
        status: "healthy",
        growth: 8.5
    }
];

export default function CohortTracking() {
    const { t } = useTranslation(["dashboard", "common"]);
    const [selectedCohort, setSelectedCohort] = useState<any>(MOCK_COHORTS[0]);

    const METRICS_LEGEND = [
        { label: t("dashboard:mockup.admin.cohortTracking.charts.legend.progress"), color: "bg-blue-500", value: "85%" },
        { label: t("dashboard:mockup.admin.cohortTracking.charts.legend.attendance"), color: "bg-primary", value: "94%" },
        { label: t("dashboard:mockup.admin.cohortTracking.charts.legend.extracurricular"), color: "bg-amber-500", value: "62%" }
    ];

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                            {t("dashboard:mockup.admin.cohortTracking.title")}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("dashboard:mockup.admin.cohortTracking.subtitle")}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.cohortTracking.actions.exportBoard")}
                        </Button>
                        <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.cohortTracking.actions.createNew")}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Area: Analytics & Charts */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t("dashboard:mockup.admin.cohortTracking.stats.students")}</p>
                                        <Users className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-2xl font-bold">4,310</p>
                                        <span className="text-[10px] text-primary font-bold mb-1">+12%</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t("dashboard:mockup.admin.cohortTracking.stats.avgGPA")}</p>
                                        <TrendUp className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-2xl font-bold">8.15</p>
                                        <span className="text-[10px] text-primary font-bold mb-1">+0.2</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t("dashboard:mockup.admin.cohortTracking.stats.retention")}</p>
                                        <Target className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-2xl font-bold">95.4%</p>
                                        <span className="text-[10px] text-red-600 font-bold mb-1">-0.8%</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{t("dashboard:mockup.admin.cohortTracking.stats.outcomes")}</p>
                                        <Rocket className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <p className="text-2xl font-bold">88.2%</p>
                                        <span className="text-[10px] text-primary font-bold mb-1">+4.5%</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Visualizer */}
                        <Card className="border-none shadow-xl ring-1 ring-slate-200">
                            <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                        {t("dashboard:mockup.admin.cohortTracking.charts.driftAnalysis")}
                                    </CardTitle>
                                    <CardDescription>{t("dashboard:mockup.admin.cohortTracking.charts.driftAnalysisDesc")}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <SelectMock value="Academic Year 2025" />
                                    <SelectMock value="All Subjects" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-10">
                                <div className="h-[300px] w-full flex items-end justify-between gap-8 relative px-10">
                                    {/* Mock Chart Grid Lines */}
                                    <div className="absolute inset-0 border-b-2 border-l-2 border-slate-200 flex flex-col justify-between italic text-[10px] text-muted-foreground pl-2 py-4">
                                        <div className="border-t border-slate-100 w-full pt-1">{t("dashboard:mockup.admin.cohortTracking.charts.targetLine")}</div>
                                        <div className="border-t border-slate-100 w-full pt-1">{t("dashboard:mockup.admin.cohortTracking.charts.averageLine")}</div>
                                        <div className="border-t border-slate-100 w-full pt-1">{t("dashboard:mockup.admin.cohortTracking.charts.baselineLine")}</div>
                                        <div />
                                    </div>

                                    {/* Chart Bars (Mock) */}
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 group relative h-full">
                                            <div className="flex items-end gap-1.5 w-full h-full">
                                                <div
                                                    className="flex-1 bg-blue-500/80 hover:bg-blue-600 shadow-lg rounded-t transition-all duration-500 ease-out cursor-pointer group-hover:scale-y-105"
                                                    style={{ height: `${40 + i * 8}%` }}
                                                />
                                                <div
                                                    className="flex-1 bg-primary/80 hover:bg-primary shadow-lg rounded-t transition-all duration-500 ease-out cursor-pointer delay-100 group-hover:scale-y-105"
                                                    style={{ height: `${50 + i * 5}%` }}
                                                />
                                                <div
                                                    className="flex-1 bg-amber-500/80 hover:bg-amber-600 shadow-lg rounded-t transition-all duration-500 ease-out cursor-pointer delay-200 group-hover:scale-y-105"
                                                    style={{ height: `${30 + i * 10}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase tracking-widest whitespace-nowrap">{t("dashboard:mockup.admin.cohortTracking.charts.month", { month: i * 2 })}</p>

                                            {/* Tooltip mockup */}
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded text-[9px] opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-xl">
                                                <p className="font-bold border-b border-white/20 pb-1 mb-1">{t("dashboard:mockup.admin.cohortTracking.charts.detailsTitle", { month: i * 2 })}</p>
                                                <p>{t("dashboard:mockup.admin.cohortTracking.charts.progress")}: {(40 + i * 8).toFixed(1)}%</p>
                                                <p>{t("dashboard:mockup.admin.cohortTracking.charts.attendance")}: {(50 + i * 5).toFixed(1)}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 flex justify-center gap-8">
                                    {METRICS_LEGEND.map(item => (
                                        <div key={item.label} className="flex items-center gap-2">
                                            <div className={cn("h-3 w-3 rounded-sm", item.color)} />
                                            <span className="text-xs font-medium text-slate-600">{item.label}:</span>
                                            <span className="text-xs font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <PieChart className="h-4 w-4 text-indigo-600" />
                                        {t("dashboard:mockup.admin.cohortTracking.charts.careerPath.title")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-[200px] flex items-center justify-center p-0">
                                    <div className="flex gap-4 items-end">
                                        {[
                                            { label: "AI/DS", h: 80, val: "35%", color: "bg-indigo-600" },
                                            { label: "Web/App", h: 100, val: "42%", color: "bg-blue-600" },
                                            { label: "CyberSecurity", h: 40, val: "15%", color: "bg-slate-400" },
                                            { label: "Other", h: 25, val: "8%", color: "bg-slate-300" }
                                        ].map(d => (
                                            <div key={d.label} className="flex flex-col items-center gap-2">
                                                <span className="text-[10px] font-bold text-indigo-700">{d.val}</span>
                                                <div className={cn("w-12 rounded-t transition-all duration-1000", d.color)} style={{ height: `${d.h}px` }} />
                                                <span className="text-[10px] text-slate-500 font-medium">{d.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        {t("dashboard:mockup.admin.cohortTracking.charts.pulse.title")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">{t("dashboard:mockup.admin.cohortTracking.charts.pulse.satisfaction")}</span>
                                            <span className="font-bold text-primary">4.8/5.0</span>
                                        </div>
                                        <Progress value={96} className="h-1.5" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">{t("dashboard:mockup.admin.cohortTracking.charts.pulse.nps")}</span>
                                            <span className="font-bold text-blue-600">72</span>
                                        </div>
                                        <Progress value={72} className="h-1.5" />
                                    </div>
                                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 flex gap-3">
                                        <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                                        <p className="text-[10px] text-emerald-900 leading-relaxed italic">
                                            {t("dashboard:mockup.admin.cohortTracking.charts.pulse.insight")}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar: Cohort List & Action Items */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <LayoutGrid className="h-4 w-4 text-blue-600" />
                                        {t("dashboard:mockup.admin.cohortTracking.list.title")}
                                    </CardTitle>
                                    <Badge variant="outline" className="text-[10px]">{MOCK_COHORTS.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {MOCK_COHORTS.map(cohort => (
                                        <div
                                            key={cohort.id}
                                            className={cn(
                                                "p-4 space-y-3 cursor-pointer transition-colors hover:bg-slate-50",
                                                selectedCohort?.id === cohort.id ? "bg-blue-50/50 border-l-4 border-l-blue-600" : ""
                                            )}
                                            onClick={() => setSelectedCohort(cohort)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-slate-900">{t(cohort.nameKey as any)}</p>
                                                    <p className="text-[10px] text-muted-foreground">{t("dashboard:mockup.admin.cohortTracking.list.studentCount", { count: cohort.students })}</p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className={cn(
                                                        "text-[9px] py-0 px-1",
                                                        cohort.status === 'healthy' ? "bg-primary/20 text-primary" : "bg-amber-100 text-amber-700"
                                                    )}
                                                >
                                                    {cohort.status === 'healthy'
                                                        ? t("dashboard:mockup.admin.cohortTracking.list.status.healthy")
                                                        : t("dashboard:mockup.admin.cohortTracking.list.status.warning")}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-[11px]">
                                                <div className="flex gap-4">
                                                    <div>
                                                        <p className="text-muted-foreground uppercase text-[9px] font-bold">{t("dashboard:mockup.admin.cohortTracking.list.metrics.gpa")}</p>
                                                        <p className="font-bold">{cohort.avgGPA}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground uppercase text-[9px] font-bold">{t("dashboard:mockup.admin.cohortTracking.list.metrics.growth")}</p>
                                                        <p className={cn("font-bold", cohort.growth >= 0 ? "text-primary" : "text-red-500")}>
                                                            {cohort.growth >= 0 ? "+" : ""}{cohort.growth}%
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-slate-300" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-none shadow-xl">
                            <CardHeader className="pb-3 border-b border-white/10">
                                <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4" />
                                    {t("dashboard:mockup.admin.cohortTracking.milestones.title")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                {[
                                    { title: t("dashboard:mockup.admin.cohortTracking.milestones.reviewReport"), date: "Jan 15, 2026", icon: FileText },
                                    { title: t("dashboard:mockup.admin.cohortTracking.milestones.boardMeeting"), date: "Feb 02, 2026", icon: Target }
                                ].map((m, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                            <m.icon className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-bold leading-tight">{m.title}</p>
                                            <p className="text-[10px] opacity-60 font-medium">{m.date}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs mt-2">
                                    {t("dashboard:mockup.admin.cohortTracking.milestones.setReminder")}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 border-dashed space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1 px-2 bg-blue-600 text-white text-[9px] font-bold rounded">TIP</div>
                                <span className="text-xs font-bold text-blue-900">{t("dashboard:mockup.admin.cohortTracking.tips.optimizationGoal")}</span>
                            </div>
                            <p className="text-[10px] text-blue-800 leading-relaxed italic">
                                <Trans i18nKey="dashboard:mockup.admin.cohortTracking.tips.message">
                                    "Forecast indicates that improving student <b>retention</b> by 2% will lead to an 8% ROI surge for the 2024 cohort."
                                </Trans>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function SelectMock({ value }: { value: string }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-white text-[10px] font-bold cursor-pointer hover:bg-slate-50">
            <span>{value}</span>
            <ChevronRight className="h-3 w-3 rotate-90" />
        </div>
    );
}
