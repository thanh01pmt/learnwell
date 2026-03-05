import React, { useState } from "react";
import {
    Trophy,
    Award,
    Medal,
    CheckCircle2,
    ExternalLink,
    Share2,
    Download,
    Search,
    BookOpen,
    Calendar,
    Lock,
    ChevronRight,
    TrendingUp,
    Star
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_CREDENTIALS = [
    {
        id: "cred-1",
        name: "credentials:mockup.credentials.python.name",
        category: "credentials:mockup.credentials.python.category",
        level: "Gold",
        issuer: "LearnWell Academy",
        issuedAt: "2026-01-20",
        image: "🏆",
        color: "from-amber-400 to-orange-600",
        skills: ["Python", "Algorithms", "Backend"],
        verificationUrl: "https://learnwell.io/verify/cred-1",
        criteria: [
            { id: 1, text: "credentials:mockup.credentials.python.criteria.course", achieved: true },
            { id: 2, text: "credentials:mockup.credentials.python.criteria.score", achieved: true },
            { id: 3, text: "credentials:mockup.credentials.python.criteria.projects", achieved: true }
        ],
        evidence: [
            { name: "credentials:mockup.credentials.python.evidence.chatbot", url: "/student/artifacts/art-1" },
            { name: "credentials:mockup.credentials.python.evidence.exam", url: "/student/artifacts/art-2" }
        ]
    },
    {
        id: "cred-2",
        name: "credentials:mockup.credentials.data.name",
        category: "credentials:mockup.credentials.data.category",
        level: "Silver",
        issuer: "LearnWell Academy",
        issuedAt: "2026-02-05",
        image: "📊",
        color: "from-slate-300 to-slate-500",
        skills: ["Excel", "SQL", "Statistics"],
        verificationUrl: "https://learnwell.io/verify/cred-2",
        criteria: [
            { id: 1, text: "credentials:mockup.credentials.data.criteria.course", achieved: true },
            { id: 2, text: "credentials:mockup.credentials.data.criteria.analysis", achieved: true }
        ],
        evidence: [
            { name: "credentials:mockup.credentials.data.evidence.report", url: "/student/artifacts/art-3" }
        ]
    }
];

const IN_PROGRESS_CREDENTIALS = [
    {
        id: "cred-3",
        name: "credentials:mockup.credentials.ux.name",
        category: "credentials:mockup.credentials.ux.category",
        progress: 65,
        image: "🎨",
        color: "from-pink-400 to-rose-600",
        requirementsCount: 4,
        requirementsTotal: 6,
        nextGoal: "credentials:mockup.credentials.ux.nextGoal"
    },
    {
        id: "cred-4",
        name: "credentials:mockup.credentials.hacker.name",
        category: "credentials:mockup.credentials.hacker.category",
        progress: 30,
        image: "🛡️",
        color: "from-primary to-teal-600",
        requirementsCount: 2,
        requirementsTotal: 7,
        nextGoal: "credentials:mockup.credentials.hacker.nextGoal"
    }
];

export default function MicroCredentials() {
    const { t } = useTranslation(["credentials", "common"]);
    const [selectedCred, setSelectedCred] = useState<any>(null);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                            {t("credentials:title")}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("credentials:subtitle")}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            {t("credentials:actions.sharePortfolio")}
                        </Button>
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                            <Trophy className="mr-2 h-4 w-4" />
                            {t("credentials:actions.leaderboard")}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content: Showcase */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="earned">
                            <div className="flex items-center justify-between mb-4">
                                <TabsList className="bg-slate-100 p-1">
                                    <TabsTrigger value="earned">{t("credentials:tabs.earned")}</TabsTrigger>
                                    <TabsTrigger value="in-progress">{t("credentials:tabs.inProgress")}</TabsTrigger>
                                </TabsList>
                                <div className="relative w-48">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                    <input
                                        placeholder={t("credentials:actions.searchPlaceholder")}
                                        className="w-full pl-7 pr-3 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <TabsContent value="earned" className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {MOCK_CREDENTIALS.map(cred => (
                                        <Card
                                            key={cred.id}
                                            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none bg-gradient-to-br from-white to-slate-50 relative overflow-hidden ring-1 ring-slate-200 hover:ring-amber-300"
                                            onClick={() => setSelectedCred(cred)}
                                        >
                                            {/* Decorative Background */}
                                            <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br blur-2xl", cred.color)} />

                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className={cn(
                                                        "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform bg-gradient-to-br",
                                                        cred.color
                                                    )}>
                                                        {cred.image}
                                                    </div>
                                                    <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-amber-200 text-amber-700">
                                                        {cred.level}
                                                    </Badge>
                                                </div>
                                                <div className="mt-6 space-y-1">
                                                    <h3 className="text-xl font-bold group-hover:text-amber-600 transition-colors">{t(cred.name as any)}</h3>
                                                    <p className="text-sm text-muted-foreground">{t(cred.category as any)}</p>
                                                </div>
                                                <div className="mt-4 flex flex-wrap gap-1">
                                                    {cred.skills.map(skill => (
                                                        <Badge key={skill} variant="secondary" className="text-[10px] py-0">{skill}</Badge>
                                                    ))}
                                                </div>
                                                <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground font-medium">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{cred.issuedAt}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-amber-600">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        <span>Verified</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    {/* Empty Slot Mockup */}
                                    <Card className="border-dashed border-2 flex items-center justify-center p-6 bg-slate-50">
                                        <div className="text-center space-y-2">
                                            <Award className="h-12 w-12 text-slate-300 mx-auto" />
                                            <p className="text-sm text-slate-400 font-medium">{t("credentials:earned.empty.title")}</p>
                                            <Button variant="ghost" size="sm" className="text-primary">{t("credentials:earned.empty.action")}</Button>
                                        </div>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="in-progress" className="mt-0 space-y-4">
                                {IN_PROGRESS_CREDENTIALS.map(cred => (
                                    <Card key={cred.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-6">
                                                <div className={cn(
                                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-slate-100",
                                                )}>
                                                    {cred.image}
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-lg">{t(cred.name as any)}</h4>
                                                            <p className="text-sm text-muted-foreground">{t(cred.category as any)}</p>
                                                        </div>
                                                        <span className="text-sm font-bold text-primary">{cred.progress}%</span>
                                                    </div>
                                                    <Progress value={cred.progress} className="h-2" />
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">{t("credentials:progress.completedCount", { count: cred.requirementsCount, total: cred.requirementsTotal })}</span>
                                                        <div className="flex items-center gap-1 text-primary animate-pulse">
                                                            <Star className="h-3 w-3 fill-primary" />
                                                            <span>{t("credentials:progress.nextGoal", { goal: t(cred.nextGoal as any) })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <ChevronRight className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar: Detail or Stats */}
                    <div className="space-y-6">
                        {selectedCred ? (
                            <Card className="sticky top-6 border-amber-200 bg-amber-50/30 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{t("credentials:viewer.title")}</CardTitle>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedCred(null)}>✕</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div className={cn("w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-xl bg-gradient-to-br", selectedCred.color)}>
                                            {selectedCred.image}
                                        </div>
                                        <h3 className="font-bold text-xl">{t(selectedCred.name as any)}</h3>
                                        <p className="text-xs text-muted-foreground">{t("credentials:viewer.info", { id: selectedCred.id, issuer: selectedCred.issuer })}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                                            {t("credentials:viewer.criteria.title")}
                                        </h4>
                                        <ul className="space-y-2">
                                            {selectedCred.criteria.map((c: any) => (
                                                <li key={c.id} className="flex gap-2 text-xs">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                                    <span className="text-slate-600 italic">"{t(c.text as any)}"</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <ExternalLink className="h-4 w-4 text-blue-500" />
                                            {t("credentials:viewer.evidence.title")}
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedCred.evidence.map((e: any, idx: number) => (
                                                <a key={idx} href={e.url} className="flex items-center justify-between p-2 bg-white rounded border border-amber-100 hover:border-amber-400 transition-colors text-[10px] font-medium">
                                                    {t(e.name as any)}
                                                    <Download className="h-3 w-3" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2 p-6 border-t border-amber-100">
                                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        {t("credentials:actions.addToLinkedin")}
                                    </Button>
                                    <Button variant="outline" className="w-full border-amber-200">
                                        <Download className="mr-2 h-4 w-4" />
                                        {t("credentials:actions.downloadPdf")}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle className="text-lg">{t("credentials:stats.title")}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl text-center space-y-1">
                                            <p className="text-3xl font-bold text-amber-600">08</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{t("credentials:stats.badges")}</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl text-center space-y-1">
                                            <p className="text-3xl font-bold text-blue-600">12</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{t("credentials:stats.skills")}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold">{t("credentials:stats.topFields")}</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Programming</span>
                                                    <span className="font-bold">85%</span>
                                                </div>
                                                <Progress value={85} className="h-1 bg-slate-100" />
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Data Science</span>
                                                    <span className="font-bold">45%</span>
                                                </div>
                                                <Progress value={45} className="h-1 bg-slate-100" />
                                            </div>
                                        </div>
                                    </div>

                                    <Card className="bg-blue-600 text-white border-none">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <TrendingUp className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs opacity-80">{t("credentials:stats.learningProductivity")}</p>
                                                <p className="text-xl font-bold">{t("credentials:stats.thisWeek", { count: 24 })}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
