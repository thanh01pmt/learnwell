import React, { useState } from "react";
import {
    ClipboardCheck,
    Send,
    Clock,
    Users,
    BarChart3,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Plus,
    MessageSquare,
    Search,
    Filter,
    ArrowRight,
    TrendingUp,
    Layout,
    LayoutGrid,
    History
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_EXIT_TICKETS = [
    {
        id: "et-1",
        title: "dashboard:mockup.attendance.exitTickets.titles.forLoops",
        subject: "Python Programming",
        class: "10A1",
        status: "active",
        responses: 24,
        total: 30,
        averageUnderstanding: 82,
        createdAt: "2026-02-07 15:30",
        questions: [
            { id: "q1", text: "dashboard:mockup.attendance.exitTickets.questions.scaleUnderstanding", type: "scale" },
            { id: "q2", text: "dashboard:mockup.attendance.exitTickets.questions.difficulties", type: "text" }
        ],
        summary: {
            confused: 4,
            okay: 10,
            confident: 10
        }
    },
    {
        id: "et-2",
        title: "dashboard:mockup.attendance.exitTickets.titles.historyDienBienPhu",
        subject: "History",
        class: "12C2",
        status: "completed",
        responses: 32,
        total: 32,
        averageUnderstanding: 95,
        createdAt: "2026-02-06 10:15",
        questions: [
            { id: "q1", text: "dashboard:mockup.attendance.exitTickets.questions.historicalSignificance", type: "text" }
        ],
        summary: {
            confused: 0,
            okay: 5,
            confident: 27
        }
    }
];

const RECENT_RESPONSES = [
    { id: "res-1", student: "classroom:mocks.students.an", level: "Confident", comment: "dashboard:mockup.attendance.exitTickets.comments.debugLoops", time: "2m ago" },
    { id: "res-2", student: "classroom:mocks.students.binh", level: "Okay", comment: "dashboard:mockup.attendance.exitTickets.comments.nestedLoops", time: "5m ago" },
    { id: "res-3", student: "classroom:mocks.students.cuong", level: "Confused", comment: "dashboard:mockup.attendance.exitTickets.comments.forVsWhile", time: "12m ago" },
];

export default function ExitTickets() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [activeTab, setActiveTab] = useState("active");
    const [selectedTicket, setSelectedTicket] = useState<any>(MOCK_EXIT_TICKETS[0]);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {t("teacher:exitTickets.title" as any) as any}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("teacher:exitTickets.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <History className="mr-2 h-4 w-4" />
                            {t("teacher:exitTickets.actions.history" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("teacher:exitTickets.actions.create" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Area: Analytics & Tickets */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-blue-50/50 border-blue-100">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">{t("teacher:exitTickets.stats.responding" as any) as any}</p>
                                        <p className="text-2xl font-bold text-blue-700">24/30</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-primary/10/50 border-primary/20">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">{t("teacher:exitTickets.stats.understandingRate" as any) as any}</p>
                                        <p className="text-2xl font-bold text-primary">92%</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-amber-50/50 border-amber-100">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">{t("teacher:exitTickets.stats.needSupport" as any) as any}</p>
                                        <p className="text-2xl font-bold text-amber-700">04 {t("common:mockData.studentAbbr" as any) as any || "BN"}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="active" className="w-full">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList>
                                    <TabsTrigger value="active" onClick={() => setActiveTab("active")}>{t("teacher:exitTickets.tabs.active" as any) as any}</TabsTrigger>
                                    <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>{t("teacher:exitTickets.tabs.completed" as any) as any}</TabsTrigger>
                                </TabsList>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        placeholder={t("teacher:exitTickets.actions.search" as any) as any}
                                        className="pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>

                            <TabsContent value="active" className="mt-0 space-y-4">
                                {MOCK_EXIT_TICKETS.filter(t => t.status === "active").map(ticket => (
                                    <Card
                                        key={ticket.id}
                                        className={cn(
                                            "cursor-pointer hover:shadow-md transition-all border-l-4",
                                            selectedTicket?.id === ticket.id ? "border-l-indigo-500 bg-indigo-50/10" : "border-l-transparent"
                                        )}
                                        onClick={() => setSelectedTicket(ticket)}
                                    >
                                        <CardContent className="p-5">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold text-lg">{ticket.title.includes('dashboard:') ? t(ticket.title as any) : ticket.title}</h3>
                                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">{ticket.class}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{ticket.subject.includes('dashboard:') ? t(ticket.subject as any) : ticket.subject} • {ticket.createdAt}</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="text-red-500 border-red-100 hover:bg-red-50">{t("teacher:exitTickets.actions.close" as any) as any}</Button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span className="text-muted-foreground">{t("teacher:exitTickets.list.responses" as any) as any}: {ticket.responses}/{ticket.total} {t("teacher:exitTickets.list.students" as any) as any}</span>
                                                    <span className="text-indigo-600">80% {t("teacher:exitTickets.stats.completion" as any) as any}</span>
                                                </div>
                                                <Progress value={80} className="h-2" />

                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                                                        <p className="text-xs text-muted-foreground mb-1">{t("teacher:exitTickets.summary.confident" as any) as any}</p>
                                                        <p className="text-lg font-bold text-primary">{ticket.summary.confident}</p>
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                                                        <p className="text-xs text-muted-foreground mb-1">{t("teacher:exitTickets.summary.okay" as any) as any}</p>
                                                        <p className="text-lg font-bold text-amber-600">{ticket.summary.okay}</p>
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded-lg text-center">
                                                        <p className="text-xs text-muted-foreground mb-1">{t("teacher:exitTickets.summary.confused" as any) as any}</p>
                                                        <p className="text-lg font-bold text-red-600">{ticket.summary.confused}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>

                            <TabsContent value="completed" className="mt-0">
                                {/* Logic similar to active but for completed */}
                                <div className="text-center py-12 text-muted-foreground">
                                    <History className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p>{t("teacher:exitTickets.list.emptyCompleted" as any) as any}</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar: Real-time Responses */}
                    <div className="space-y-6">
                        <Card className="sticky top-6">
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                                        {t("teacher:exitTickets.summary.latestResponses" as any) as any}
                                    </CardTitle>
                                    <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y max-h-[500px] overflow-y-auto no-scrollbar">
                                    {RECENT_RESPONSES.map((res, i) => (
                                        <div key={res.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">{i + 1}</div>
                                                    <span className="text-xs font-bold">{res.student.includes(':') ? t(res.student as any) : res.student}</span>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "text-[9px] py-0 px-1",
                                                        res.level === 'Confident' && "text-primary border-primary/30 bg-primary/10",
                                                        res.level === 'Okay' && "text-amber-600 border-amber-200 bg-amber-50",
                                                        res.level === 'Confused' && "text-red-600 border-red-200 bg-red-50"
                                                    )}
                                                >
                                                    {res.level === 'Confident' ? t("teacher:exitTickets.summary.confident" as any) : res.level === 'Okay' ? t("teacher:exitTickets.summary.okay" as any) : t("teacher:exitTickets.summary.confused" as any)}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-slate-600 italic">"{res.comment.includes('dashboard:') ? t(res.comment as any) : res.comment}"</p>
                                            <p className="text-[10px] text-muted-foreground text-right">{res.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs">
                                    {t("teacher:exitTickets.actions.viewResponses" as any) as any}
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-indigo-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <LayoutGrid className="h-4 w-4" />
                                    {t("teacher:exitTickets.aiTips.title" as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs space-y-4 opacity-90">
                                <p>{t("teacher:exitTickets.aiTips.prefix" as any, { count: 4, topic: t("dashboard:mockup.attendance.exitTickets.titles.forLoops" as any) } as any) as any}</p>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                                        <span>{t("teacher:exitTickets.aiTips.tip1" as any) as any}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <CheckCircle2 className="h-3 w-3 shrink-0" />
                                        <span>{t("teacher:exitTickets.aiTips.tip2" as any) as any}</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-[10px] h-7">
                                    {t("teacher:exitTickets.actions.viewAISuggestion" as any) as any}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
