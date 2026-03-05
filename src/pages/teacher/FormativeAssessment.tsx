import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    FilePlus,
    BarChart3,
    Cloud,
    MessageSquare,
    Zap,
    Play,
    Settings,
    Plus,
    Trash2,
    ChevronRight,
    Lightbulb,
    CheckCircle2,
    BrainCircuit,
    PieChart,
    Users
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart as RPieChart,
    Pie,
    Cell
} from "recharts";

const confidenceData = [
    { name: 'teacher:formativeAssessment.live.confidence.confident', value: 65, color: '#10b981' },
    { name: 'teacher:formativeAssessment.live.confidence.okay', value: 25, color: '#f59e0b' },
    { name: 'teacher:formativeAssessment.live.confidence.confused', value: 10, color: '#ef4444' },
];

const conceptStats = [
    { name: 'teacher:formativeAssessment.mock.concept.types', correct: 85, incorrect: 15 },
    { name: 'teacher:formativeAssessment.mock.concept.loops', correct: 45, incorrect: 55 },
    { name: 'teacher:formativeAssessment.mock.concept.functions', correct: 70, incorrect: 30 },
    { name: 'teacher:formativeAssessment.mock.concept.arrays', correct: 30, incorrect: 70 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function FormativeAssessment() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [activeTab, setActiveTab] = useState("live");
    const [isLive, setIsLive] = useState(false);

    const toggleLiveSession = () => {
        setIsLive(!isLive);
        if (!isLive) {
            toast.success(t("teacher:formativeAssessment.messages.liveStarted" as any) as any);
        } else {
            toast.info(t("teacher:formativeAssessment.messages.liveEnded" as any) as any);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("teacher:formativeAssessment.title" as any) as any}</h1>
                        <p className="text-muted-foreground">
                            {t("teacher:formativeAssessment.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            {t("teacher:formativeAssessment.actions.settings" as any) as any}
                        </Button>
                        <Button
                            size="sm"
                            className={cn(isLive ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:opacity-90")}
                            onClick={toggleLiveSession}
                        >
                            {isLive ? <><Zap className="mr-2 h-4 w-4 animate-pulse" /> {t("teacher:formativeAssessment.actions.stopLive" as any) as any}</> : <><Play className="mr-2 h-4 w-4" /> {t("teacher:formativeAssessment.actions.startLive" as any) as any}</>}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-8">
                        <TabsTrigger value="live">{t("teacher:formativeAssessment.tabs.live" as any) as any}</TabsTrigger>
                        <TabsTrigger value="builder">{t("teacher:formativeAssessment.tabs.builder" as any) as any}</TabsTrigger>
                        <TabsTrigger value="insights">{t("teacher:formativeAssessment.tabs.insights" as any) as any}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="live" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Live Confidence Heatmap */}
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>{t("teacher:formativeAssessment.live.confidenceTitle" as any) as any}</CardTitle>
                                            <CardDescription>{t("teacher:formativeAssessment.live.confidenceDesc" as any) as any}</CardDescription>
                                        </div>
                                        {isLive && <Badge className="bg-red-500 animate-pulse">{t("teacher:formativeAssessment.live.liveNow" as any) as any}</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RPieChart>
                                            <Pie
                                                data={confidenceData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {confidenceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip />
                                        </RPieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                                <CardFooter className="flex justify-center gap-6">
                                    {confidenceData.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-sm font-medium">{t(item.name as any)}: {item.value}%</span>
                                        </div>
                                    ))}
                                </CardFooter>
                            </Card>

                            {/* Muddy Points Word Cloud / List */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cloud className="h-5 w-5 text-sky-500" />
                                        {t("teacher:formativeAssessment.live.muddyPoints" as any) as any}
                                    </CardTitle>
                                    <CardDescription>{t("teacher:formativeAssessment.live.muddyPointsDesc" as any) as any}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="text-lg py-2 px-4 bg-red-100 text-red-700 hover:bg-red-200">{t("teacher:formativeAssessment.mock.points.nestedLoops")}</Badge>
                                        <Badge variant="secondary" className="text-sm py-1 px-3 bg-orange-100 text-orange-700">{t("teacher:formativeAssessment.mock.points.functions")}</Badge>
                                        <Badge variant="secondary" className="text-base py-2 px-4 bg-red-100 text-red-700">{t("teacher:formativeAssessment.mock.points.scope")}</Badge>
                                        <Badge variant="secondary" className="text-xs py-1 px-2 bg-yellow-100 text-yellow-700">{t("teacher:formativeAssessment.mock.points.boolean")}</Badge>
                                        <Badge variant="secondary" className="text-sm py-1.5 px-3 bg-orange-100 text-orange-700">{t("teacher:formativeAssessment.mock.points.ifElse")}</Badge>
                                        <Badge variant="secondary" className="text-lg py-2 px-4 bg-red-100 text-red-700">{t("teacher:formativeAssessment.mock.points.arrays")}</Badge>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full text-xs">
                                        <BrainCircuit className="mr-2 h-4 w-4" /> {t("teacher:formativeAssessment.live.aiSuggestions" as any) as any}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>

                        {/* Live Student Detail List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("teacher:formativeAssessment.live.detailedFeedback" as any) as any}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "classroom:mocks.students.giabao", status: "teacher:formativeAssessment.mock.confused", detail: "teacher:formativeAssessment.mock.feedback3" },
                                        { name: "classroom:mocks.students.thanhvan", status: "teacher:formativeAssessment.mock.confident", detail: "teacher:formativeAssessment.mock.feedback1" },
                                        { name: "classroom:mocks.students.minhtam", status: "teacher:formativeAssessment.mock.uncertain", detail: "teacher:formativeAssessment.mock.feedback2" },
                                    ].map((item, idx) => {
                                        const status = t(item.status as any);
                                        return (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "h-2 w-2 rounded-full",
                                                        status === t("teacher:formativeAssessment.mock.confident") ? "bg-green-500" : status === t("teacher:formativeAssessment.mock.uncertain") ? "bg-yellow-500" : "bg-red-500"
                                                    )} />
                                                    <div className="flex-1">
                                                        <div>
                                                            <p className="text-xs font-bold">{t(item.name as any)}</p>
                                                            <p className="text-[10px] text-muted-foreground italic line-clamp-1">{t(item.detail as any)}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-[10px]">{status}</Badge>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8">
                                                    <MessageSquare className="h-4 w-4 mr-1" /> {t("teacher:formativeAssessment.live.responding" as any) as any}
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="builder" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer border-dashed">
                                <CardContent className="flex flex-col items-center justify-center h-48 py-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Plus className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{t("teacher:formativeAssessment.builder.createNew" as any) as any}</h3>
                                    <p className="text-xs text-muted-foreground text-center px-4 mt-2">{t("teacher:formativeAssessment.builder.exitTicketDesc" as any) as any}</p>
                                </CardContent>
                            </Card>

                            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{t("teacher:formativeAssessment.builder.exitTicket" as any) as any}</Badge>
                                        <Zap className="h-4 w-4 text-warning group-hover:scale-110 transition-transform" />
                                    </div>
                                    <CardTitle className="text-lg">{t("teacher:formativeAssessment.mock.loopQuiz")}</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-0 text-sm">
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> {t("teacher:formativeAssessment.builder.questionsCount" as any, { count: 3 } as any) as any}</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> {t("teacher:formativeAssessment.tagPrefix")} {t("teacher:formativeAssessment.mock.logicTag")}</li>
                                    </ul>
                                </CardContent>
                                <CardFooter className="pt-6">
                                    <Button variant="ghost" className="w-full text-xs">{t("teacher:formativeAssessment.actions.editSend")}</Button>
                                </CardFooter>
                            </Card>

                            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{t("teacher:formativeAssessment.conceptPoll")}</Badge>
                                        <MessageSquare className="h-4 w-4 text-info group-hover:scale-110 transition-transform" />
                                    </div>
                                    <CardTitle className="text-lg">{t("teacher:formativeAssessment.mock.loopQuiz")}</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-0 text-sm text-left">
                                    <p className="text-muted-foreground italic">{t("teacher:formativeAssessment.mock.loopQuestion")}</p>
                                </CardContent>
                                <CardFooter className="pt-6">
                                    <Button variant="ghost" className="w-full text-xs">{t("teacher:formativeAssessment.actions.editSend")}</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="insights" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Performance by LO */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("teacher:formativeAssessment.insights.loUnderstanding" as any) as any}</CardTitle>
                                    <CardDescription>{t("teacher:formativeAssessment.insights.loDesc" as any) as any}</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={conceptStats} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={120} fontSize={12} tickFormatter={(val) => t(val as any)} />
                                            <RechartsTooltip />
                                            <Bar dataKey="correct" fill="#10b981" radius={[0, 4, 4, 0]} stackId="a" />
                                            <Bar dataKey="incorrect" fill="#ef4444" radius={[0, 4, 4, 0]} stackId="a" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Suggestions Area */}
                            <div className="space-y-4">
                                <Card className="border-l-4 border-l-warning">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Lightbulb className="h-5 w-5 text-warning" />
                                            {t("teacher:formativeAssessment.insights.aiSuggestions" as any) as any}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <div className="mb-4">
                                            <Trans
                                                i18nKey="teacher:formativeAssessment.insights.aiAnalysis"
                                                values={{ percent: 70, concept: t("teacher:formativeAssessment.mock.arrayConcept") }}
                                                components={{ strong: <strong /> }}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-slate-50 rounded border">
                                                <p className="font-medium text-xs mb-1">{t("teacher:formativeAssessment.insights.solutionTitle")}</p>
                                                <ul className="text-xs list-disc pl-4 space-y-1">
                                                    <li>{t("teacher:formativeAssessment.insights.solutionItem1", { example: t("teacher:formativeAssessment.mock.arrayExample"), concept: t("teacher:formativeAssessment.mock.arrayConcept") })}</li>
                                                    <li>{t("teacher:formativeAssessment.insights.solutionItem2")}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Users className="h-5 w-5 text-primary" />
                                            {t("teacher:formativeAssessment.insights.peerTutoring" as any) as any}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p className="text-muted-foreground mb-4">{t("teacher:formativeAssessment.peerTutoringDesc")}</p>
                                        <div className="flex items-center justify-between p-2 border rounded mb-2">
                                            <span className="text-xs font-medium">{t("teacher:formativeAssessment.mock.group1", { s1: t("classroom:mocks.students.giabao"), s2: t("classroom:mocks.students.thanhvan") })}</span>
                                            <Button variant="ghost" size="sm" className="h-7 text-[10px]">{t("teacher:formativeAssessment.insights.createGroup" as any) as any}</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-xs font-medium">{t("teacher:formativeAssessment.mock.group2", { s1: t("classroom:mocks.students.minhtam"), s2: t("classroom:mocks.students.anhtuan") })}</span>
                                            <Button variant="ghost" size="sm" className="h-7 text-[10px]">{t("teacher:formativeAssessment.insights.createGroup" as any) as any}</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
