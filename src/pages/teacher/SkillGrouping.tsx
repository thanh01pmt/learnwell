import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import {
    Users,
    Search,
    Filter,
    Plus,
    ChevronRight,
    Sparkles,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    BarChart3,
    Layers,
    LayoutGrid,
    GraduationCap,
    Briefcase,
    Lightbulb,
    ArrowRight,
    MoreVertical,
    CheckCircle2,
    Settings2,
    Target,
    Rocket
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_GROUPS = [
    {
        id: "grp-1",
        name: "teacher:attendance.skillGrouping.mock.groupRemedial",
        category: "teacher:attendance.skillGrouping.mock.categoryKnowledgeGap",
        reason: "teacher:attendance.skillGrouping.mock.reasonLoops",
        students: 6,
        avgProgress: 42,
        status: "at-risk",
        color: "bg-red-500",
        suggestedMaterials: [
            "teacher:attendance.skillGrouping.mock.materials.videoLoops",
            "teacher:attendance.skillGrouping.mock.materials.whileGame"
        ],
        studentAvatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=A", "https://api.dicebear.com/7.x/avataaars/svg?seed=B", "https://api.dicebear.com/7.x/avataaars/svg?seed=C"]
    },
    {
        id: "grp-2",
        name: "teacher:attendance.skillGrouping.mock.groupCore",
        category: "teacher:attendance.skillGrouping.mock.categoryStandard",
        reason: "teacher:attendance.skillGrouping.mock.reasonCore",
        students: 18,
        avgProgress: 75,
        status: "healthy",
        color: "bg-primary",
        suggestedMaterials: [
            "teacher:attendance.skillGrouping.mock.materials.codeArrays",
            "teacher:attendance.skillGrouping.mock.materials.logicQuiz"
        ],
        studentAvatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=D", "https://api.dicebear.com/7.x/avataaars/svg?seed=E", "https://api.dicebear.com/7.x/avataaars/svg?seed=F"]
    },
    {
        id: "grp-3",
        name: "teacher:attendance.skillGrouping.mock.groupEnrichment",
        category: "teacher:attendance.skillGrouping.mock.categoryTalent",
        reason: "teacher:attendance.skillGrouping.mock.reasonEnrichment",
        students: 4,
        avgProgress: 98,
        status: "excellent",
        color: "bg-indigo-500",
        suggestedMaterials: [
            "teacher:attendance.skillGrouping.mock.materials.erpProject",
            "teacher:attendance.skillGrouping.mock.materials.mentorSession"
        ],
        studentAvatars: ["https://api.dicebear.com/7.x/avataaars/svg?seed=G", "https://api.dicebear.com/7.x/avataaars/svg?seed=H"]
    }
];

export default function SkillGrouping() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [selectedGroup, setSelectedGroup] = useState<any>(MOCK_GROUPS[0]);

    return (
        <AppLayout>
            <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {t("teacher:skillGrouping.title" as any) as any}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("teacher:skillGrouping.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Settings2 className="mr-2 h-4 w-4" />
                            {t("teacher:skillGrouping.actions.configure" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary">
                            <Sparkles className="mr-2 h-4 w-4" />
                            {t("teacher:skillGrouping.actions.reassign" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content: Group Overview & Details */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-primary/10/50 border-primary/20">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary"><TrendingUp className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("teacher:skillGrouping.stats.overallProgress" as any) as any}</p>
                                        <p className="text-2xl font-bold text-primary">72.4%</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-amber-50/50 border-amber-100">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><AlertCircle className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("teacher:skillGrouping.stats.needSupport" as any) as any}</p>
                                        <p className="text-2xl font-bold text-amber-700">06 {t("common:mockData.studentAbbr")}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-indigo-50/50 border-indigo-100">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><TrendingUp className="h-5 w-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{t("teacher:skillGrouping.stats.improvementRate" as any) as any}</p>
                                        <p className="text-2xl font-bold text-indigo-700">+12%</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Group Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {MOCK_GROUPS.map(group => (
                                <Card
                                    key={group.id}
                                    className={cn(
                                        "relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                                        selectedGroup?.id === group.id ? "border-primary" : "border-transparent"
                                    )}
                                    onClick={() => setSelectedGroup(group)}
                                >
                                    <div className={cn("absolute top-0 left-0 w-full h-1", group.color)} />
                                    <CardHeader className="pb-2">
                                        <Badge variant="secondary" className="w-fit mb-2 text-[10px]">{group.category.includes(':') ? t(group.category as any) : group.category}</Badge>
                                        <CardTitle className="text-lg">{group.name.includes(':') ? t(group.name as any) : group.name}</CardTitle>
                                        <CardDescription className="text-xs line-clamp-1">{group.reason.includes(':') ? t(group.reason as any) : group.reason}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {group.studentAvatars.map((url, i) => (
                                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden ring-1 ring-slate-100">
                                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                                {group.students > 3 && (
                                                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                                        +{group.students - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs font-bold text-primary">{t("classroom:card.studentCount", { count: group.students })}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-muted-foreground uppercase">{t("teacher:skillGrouping.stats.groupProgress" as any) as any}</span>
                                                <span>{group.avgProgress}%</span>
                                            </div>
                                            <Progress value={group.avgProgress} className={cn("h-1.5", group.status === 'at-risk' ? "bg-red-100" : "bg-primary/20")} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Group Detail View */}
                        {selectedGroup && (
                            <Card className="border-none shadow-xl ring-1 ring-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardHeader className="bg-slate-50/50 border-b flex flex-row items-center justify-between">
                                    <div>
                                        <h3 className="font-bold flex items-center gap-2">
                                            <Layers className="h-5 w-5 text-primary" />
                                            {t("teacher:skillGrouping.labels.detail" as any) as any}: {selectedGroup.name.includes(':') ? t(selectedGroup.name as any) : selectedGroup.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {t("teacher:skillGrouping.labels.basedOn")}: {t("teacher:attendance.skillGrouping.mock.examMidtermCS")}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">{t("teacher:attendance.skillGrouping.mock.assignSpecial")}</Button>
                                        <Button variant="outline" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <section className="space-y-3">
                                                <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800">
                                                    <Lightbulb className="h-4 w-4 text-amber-500" />
                                                    {t("teacher:skillGrouping.labels.strategies" as any) as any}
                                                </h4>
                                                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary leading-relaxed italic">
                                                    {t("teacher:attendance.skillGrouping.mock.logicStrategy")}
                                                </div>
                                            </section>

                                            <section className="space-y-3">
                                                <h4 className="text-sm font-bold text-slate-800">{t("teacher:skillGrouping.labels.materials" as any) as any}</h4>
                                                <div className="space-y-2">
                                                    {selectedGroup.suggestedMaterials.map((mat: string, i: number) => (
                                                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                                                            <span className="text-xs font-medium">{t(mat as any)}</span>
                                                            <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary">{t("teacher:skillGrouping.actions.assignMaterial" as any) as any}</Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>

                                        <div className="space-y-6">
                                            <section className="space-y-3">
                                                <h4 className="text-sm font-bold text-slate-800">{t("teacher:skillGrouping.labels.prediction" as any) as any}</h4>
                                                <div className="h-[150px] w-full bg-slate-50 rounded-xl border border-dashed flex items-center justify-center relative overflow-hidden">
                                                    {/* Mock Chart Area */}
                                                    <div className="flex items-end gap-4 h-24">
                                                        <div className="w-8 bg-slate-200 h-10 rounded-t" />
                                                        <div className="w-8 bg-slate-300 h-16 rounded-t" />
                                                        <div className="w-8 bg-primary h-24 rounded-t animate-pulse shadow-primary/30 shadow-lg" />
                                                        <div className="w-8 bg-primary h-20 rounded-t" />
                                                    </div>
                                                    <div className="absolute top-2 right-2 text-[10px] font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                                                        {t("teacher:skillGrouping.stats.aiProjection")}: +15%
                                                    </div>
                                                </div>
                                            </section>

                                            <section className="space-y-3">
                                                <h4 className="text-sm font-bold text-slate-800">{t("teacher:skillGrouping.labels.studentList" as any) as any}</h4>
                                                <div className="space-y-2 max-h-[160px] overflow-y-auto no-scrollbar">
                                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                                        <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">{i}</div>
                                                                <span className="text-xs text-slate-600">{t("teacher:attendance.skillGrouping.mock.anonymousStudent")} {i}</span>
                                                            </div>
                                                            <Badge variant="outline" className="text-[9px]">{40 + i * 5}%</Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50/50 p-6 border-t flex justify-between">
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" /> {t("teacher:skillGrouping.stats.trend" as any) as any}: {t("teacher:skillGrouping.stats.improvingSlowly" as any) as any}
                                    </p>
                                    <Button variant="link" className="text-primary h-auto p-0 font-bold text-xs uppercase tracking-wider">
                                        {t("teacher:skillGrouping.actions.createSession" as any) as any} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Area: Trends & AI Actions */}
                    <div className="space-y-6">
                        <Card className="sticky top-6 lg:top-24">
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" />
                                    {t("teacher:skillGrouping.labels.weeklyGoal" as any, { week: 12 } as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-6">
                                <div className="space-y-3">
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        <Trans i18nKey="teacher:attendance.skillGrouping.mock.supportGoal" components={{ b: <b /> }} />
                                    </p>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span>{t("teacher:skillGrouping.labels.targetProgress" as any) as any}</span>
                                            <span className="text-primary">65% / 100%</span>
                                        </div>
                                        <Progress value={65} className="h-2 bg-slate-100" />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("teacher:skillGrouping.labels.newAnalysis" as any) as any}</h4>
                                    <div className="flex gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-amber-900">02 {t("common:mockData.studentAbbr")} {t("teacher:attendance.skillGrouping.mock.regressionTitle")}</p>
                                            <p className="text-[9px] text-amber-800">{t("teacher:attendance.skillGrouping.mock.regressionDesc")}</p>
                                            <Button variant="ghost" size="sm" className="h-6 p-0 text-[10px] text-amber-700 font-bold hover:bg-transparent">{t("teacher:attendance.skillGrouping.mock.actNow")}</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("teacher:skillGrouping.labels.interventionPlan" as any) as any}</h4>
                                    <div className="flex gap-3 justify-between items-start pb-2">
                                        <div className="flex gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5" />
                                            <p className="text-xs">{t("teacher:attendance.skillGrouping.mock.tutoring10A1")}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-[9px]">16:30</Badge>
                                    </div>
                                    <div className="flex gap-3 justify-between items-start">
                                        <div className="flex gap-2">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                                            <p className="text-xs">{t("teacher:attendance.skillGrouping.mock.workshopAdvanced")}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-[9px]">T2 8:00</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 text-white border-none overflow-hidden">
                            <div className="bg-primary/20 p-6 space-y-4 h-full relative">
                                <Sparkles className="absolute top-4 right-4 h-12 w-12 text-white/10" />
                                <div className="space-y-2">
                                    <h3 className="font-bold">{t("teacher:attendance.skillGrouping.mock.ecosystemLink")}</h3>
                                    <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                                        <Trans i18nKey="teacher:attendance.skillGrouping.mock.ecosystemNote" components={{ b: <b /> }} />
                                    </p>
                                </div>
                                <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                                    {t("teacher:attendance.skillGrouping.mock.ecosystemDetail")}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
