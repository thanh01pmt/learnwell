import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FileText,
    Search,
    Filter,
    Plus,
    ChevronRight,
    User,
    Calendar,
    Target,
    ShieldAlert,
    CheckCircle2,
    Clock,
    AlertCircle,
    Stethoscope,
    Heart,
    TrendingUp,
    ExternalLink,
    Download,
    Share2,
    MoreVertical,
    History
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_IEP_STUDENTS = [
    {
        id: "1",
        name: "classroom:mocks.students.an",
        class: "4A",
        need: "teacher:iepManager.mock.dyslexia",
        status: "active",
        lastReview: "2026-01-15",
        nextReview: "2026-04-15",
        progress: 72,
        priority: "High",
        goals: [
            { id: 1, text: "teacher:iepManager.mock.goal1", status: "completed" },
            { id: 2, text: "teacher:iepManager.mock.goal2", status: "completed" },
            { id: 3, text: "teacher:iepManager.mock.goal3", status: "in-progress" }
        ],
        accommodations: [
            "teacher:iepManager.mock.accommodations.extraTime",
            "teacher:iepManager.mock.accommodations.speechToText",
            "teacher:iepManager.mock.accommodations.quietRoom"
        ]
    },
    {
        id: "std-iep-2",
        name: "classroom:mocks.students.baongoc",
        class: "7C",
        need: "ADHD",
        status: "active",
        lastReview: "2026-02-01",
        nextReview: "2026-05-01",
        progress: 45,
        priority: "Medium",
        goals: [
            { id: 1, text: "teacher:iepManager.mock.goal4", status: "in-progress" },
            { id: 2, text: "teacher:iepManager.mock.goal5", status: "in-progress" }
        ],
        accommodations: [
            "teacher:iepManager.mock.accommodations.frequentBreaks",
            "teacher:iepManager.mock.accommodations.visualSchedule",
            "teacher:iepManager.mock.accommodations.preferentialSeating"
        ]
    }
];

export default function IEPManager() {
    const { t } = useTranslation();
    const [selectedStudent, setSelectedStudent] = useState<any>(MOCK_IEP_STUDENTS[0]);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                            {t("teacher:iepManager.title" as any) as any}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("teacher:iepManager.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("teacher:iepManager.actions.summaryReport" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("teacher:iepManager.actions.create" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Area: Student List & Detailed IEP */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder={t("teacher:iepManager.filters.searchPlaceholder" as any) as any} className="pl-10" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-muted-foreground whitespace-nowrap uppercase tracking-widest">{t("teacher:iepManager.filters.sortBy" as any) as any}:</span>
                                    <Badge variant="outline" className="cursor-pointer bg-slate-50">{t("teacher:iepManager.filters.lastReview" as any) as any}</Badge>
                                </div>
                                <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MOCK_IEP_STUDENTS.map(student => (
                                <Card
                                    key={student.id}
                                    className={cn(
                                        "cursor-pointer hover:shadow-lg transition-all border-none ring-1 ring-slate-200 overflow-hidden",
                                        selectedStudent?.id === student.id ? "ring-2 ring-red-500 shadow-red-100" : ""
                                    )}
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <CardContent className="p-0">
                                        <div className="p-5 flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0 border-2 border-white shadow-sm">
                                                {student.name.split(' ').pop()?.charAt(0)}
                                            </div>
                                            <div className="flex-1 space-y-2 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-base truncate">{student.name.includes(':') ? t(student.name as any) : student.name}</h3>
                                                        <p className="text-xs text-muted-foreground">{student.class} • <span className="text-[10px] text-muted-foreground">{student.need.includes(':') ? t(student.need as any) : student.need}</span></p>
                                                    </div>
                                                    <Badge variant={student.priority === 'High' ? 'destructive' : 'secondary'} className="text-[9px] py-0 px-1">
                                                        {student.priority}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[10px] font-bold">
                                                        <span className="text-muted-foreground uppercase">{t("teacher:iepManager.stats.progress" as any) as any}</span>
                                                        <span className="text-red-600">{student.progress}%</span>
                                                    </div>
                                                    <Progress value={student.progress} className="h-1.5" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-3 bg-slate-50/80 border-t flex justify-between items-center text-[10px] text-muted-foreground font-medium">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{t("teacher:iepManager.stats.nextReview" as any) as any}: {student.nextReview}</span>
                                            </div>
                                            <ChevronRight className="h-3 w-3" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {selectedStudent && (
                            <Card className="border-red-100 shadow-xl shadow-red-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardHeader className="bg-slate-50/50 border-b">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-red-600" />
                                            {t("teacher:iepManager.labels.detail" as any, { name: selectedStudent.name.includes(':') ? t(selectedStudent.name as any) : selectedStudent.name } as any) as any}
                                        </CardTitle>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm"><History className="mr-2 h-4 w-4" /> {t("teacher:iepManager.actions.history" as any) as any}</Button>
                                            <Button variant="outline" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <Tabs defaultValue="overview">
                                        <TabsList className="mb-6 bg-slate-100 p-1">
                                            <TabsTrigger value="overview">{t("teacher:iepManager.tabs.overview" as any) as any}</TabsTrigger>
                                            <TabsTrigger value="goals">{t("teacher:iepManager.tabs.goals" as any) as any} {selectedStudent.goals.length}</TabsTrigger>
                                            <TabsTrigger value="accommodations">{t("teacher:iepManager.tabs.accommodations" as any) as any} {selectedStudent.accommodations.length}</TabsTrigger>
                                            <TabsTrigger value="meetings">{t("teacher:iepManager.tabs.meetings" as any) as any}</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="overview" className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t("teacher:iepManager.labels.generalInfo" as any) as any}</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between py-2 border-b">
                                                            <span className="text-muted-foreground">{t("teacher:iepManager.labels.need" as any) as any}:</span>
                                                            <span className="font-bold">{selectedStudent.need.includes(':') ? t(selectedStudent.need as any) : selectedStudent.need}</span>
                                                        </div>
                                                        <div className="flex justify-between py-2 border-b">
                                                            <span className="text-muted-foreground">{t("teacher:iepManager.labels.startDate" as any) as any}:</span>
                                                            <span>2025-09-01</span>
                                                        </div>
                                                        <div className="flex justify-between py-2 border-b">
                                                            <span className="text-muted-foreground">{t("teacher:iepManager.labels.assignedTeacher" as any) as any}:</span>
                                                            <span className="font-bold underline decoration-dotted">{t("teacher:iepManager.mock.caseManager")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t("teacher:iepManager.labels.mainMetrics" as any) as any}</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                            <p className="text-2xl font-bold text-red-700">{selectedStudent.progress}%</p>
                                                            <p className="text-[10px] text-red-600 font-bold">{t("teacher:iepManager.stats.progress" as any) as any}</p>
                                                        </div>
                                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                            <p className="text-2xl font-bold text-blue-700">12</p>
                                                            <p className="text-[10px] text-blue-600 font-bold">{t("teacher:iepManager.stats.interventions" as any) as any}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 border-dashed">
                                                <div className="flex gap-3">
                                                    <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-amber-900">{t("teacher:iepManager.stats.criticalObservation" as any) as any}</p>
                                                        <p className="text-xs text-amber-800 italic leading-relaxed">
                                                            {t("teacher:iepManager.mock.strategyNote")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="goals" className="space-y-4">
                                            {selectedStudent.goals.map((goal: any) => (
                                                <Card key={goal.id} className="bg-slate-50/50 border-slate-200">
                                                    <CardContent className="p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={cn(
                                                                "p-2 rounded-full",
                                                                goal.status === 'completed' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                                            )}>
                                                                {goal.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                                            </div>
                                                            <span className="text-xs font-bold leading-none">{goal.text.includes(':') ? t(goal.text as any) : goal.text}</span>
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="text-primary text-xs">{t("teacher:iepManager.actions.update" as any) as any}</Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            <Button variant="outline" className="w-full border-dashed"><Plus className="mr-2 h-4 w-4" /> {t("teacher:iepManager.actions.create" as any) as any}</Button>
                                        </TabsContent>

                                        <TabsContent value="accommodations" className="space-y-3">
                                            {selectedStudent.accommodations.map((acc: any, i: number) => (
                                                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                                                    <div className="p-1.5 bg-red-100 rounded text-red-600"><Heart className="h-3.5 w-3.5" /></div>
                                                    <span className="text-xs font-medium">{t(acc as any)}</span>
                                                </div>
                                            ))}
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar: Coordination & Reminders */}
                    <div className="space-y-6">
                        <Card className="sticky top-6">
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-red-600" />
                                    {t("teacher:iepManager.stats.nextReview" as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                {[
                                    { name: "classroom:mocks.students.an", date: "In 2 days", type: "Annual Review" },
                                    { name: "classroom:mocks.students.tuan", date: "In 5 days", type: "Quarterly Update" }
                                ].map((meeting, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-2 border-l-2 border-primary bg-primary/5 rounded-r-lg">
                                        <div>
                                            <p className="text-[10px] font-bold">{meeting.name.includes(':') ? t(meeting.name as any) : meeting.name}</p>
                                            <p className="text-[8px] text-muted-foreground">{meeting.date} • {t(meeting.type as any)}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="h-3 w-3" /></Button>
                                    </div>
                                ))}
                                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 text-xs py-2">{t("teacher:iepManager.actions.create" as any) as any}</Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-red-600 to-rose-700 text-white border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />
                                    {t("teacher:iepManager.labels.teamSupport" as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-red-400 flex items-center justify-center text-[10px] font-bold">A</div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-[10px] font-bold">+2</div>
                                </div>
                                <p className="text-[11px] opacity-90 italic">
                                    {t("teacher:iepManager.mock.iepTeamDesc")}
                                </p>
                                <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                                    {t("teacher:iepManager.actions.summaryReport" as any) as any}
                                    <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    {t("teacher:iepManager.labels.interventionResults" as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">14%</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest text-primary">
                                        {t("teacher:iepManager.labels.skillGrowth" as any) as any}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px]">
                                        <span>{t("teacher:iepManager.labels.lastMonth" as any) as any}</span>
                                        <span className="font-bold">58%</span>
                                    </div>
                                    <Progress value={58} className="h-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
