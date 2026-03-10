import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Trophy,
    Users,
    Calendar,
    Clock,
    ArrowLeft,
    Medal,
    CheckCircle2,
    AlertCircle,
    BookOpen,
    ShieldCheck,
    HelpCircle,
    LayoutGrid
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ContestDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    // Mock Data based on ID
    const contest = {
        id: id,
        title: "contests:mock.title1",
        status: "running",
        startTime: "22:00, 06/02/2026",
        endTime: "22:00, 08/02/2026",
        duration: t("contests:mock.duration48h"),
        participants: 124,
        problems: [
            { id: "A", title: "Two Sum", points: 100, solved: 85 },
            { id: "B", title: "Add Two Numbers", points: 200, solved: 42 },
            { id: "C", title: "Longest Substring", points: 300, solved: 15 },
            { id: "D", title: "Median of Sorted Arrays", points: 500, solved: 4 },
        ],
        difficulty: t("contests:mock.difficultyEasyHard"),
        prize: t("contests:mock.prize1"),
        description: t("contests:mock.problemDescSpring"),
        rules: t("contests:mock.rules", { returnObjects: true }) as string[]
    };

    return (
        <div className="min-h-screen text-foreground">
            {/* Header / Hero */}
            <div className="relative h-[300px] w-full overflow-hidden flex items-center p-8 md:p-12 bg-background/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-background z-0" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start gap-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/contests")}
                        className="text-muted-foreground hover:text-foreground -ml-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("contests:detail.back" as any) as any}
                    </Button>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">LIVE</Badge>
                            <span className="text-muted-foreground flex items-center gap-2 text-sm">
                                <Users className="w-4 h-4" />
                                {t("contests:detail.participantsCount" as any, { count: contest.participants } as any) as any}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black">{contest.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-full border border-border">
                                <Calendar className="w-4 h-4 text-primary" />
                                {contest.startTime}
                            </div>
                            <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-full border border-border">
                                <Clock className="w-4 h-4 text-primary" />
                                {t("contests:card.duration" as any, { duration: contest.duration } as any) as any}
                            </div>
                            <div className="flex items-center gap-2 bg-background/40 px-3 py-1.5 rounded-full border border-border text-yellow-500 font-bold">
                                <Medal className="w-4 h-4" />
                                {contest.prize}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {!isRegistered ? (
                            <Button
                                onClick={() => setIsRegistered(true)}
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 rounded-xl shadow-xl shadow-primary/20 text-lg font-bold"
                            >
                                {t("contests:detail.actions.register" as any) as any}
                            </Button>
                        ) : (
                            <Button
                                onClick={() => navigate(`/contests/${id}/arena`)}
                                size="lg"
                                className="bg-primary hover:bg-primary text-white px-10 h-14 rounded-xl shadow-xl shadow-primary/20 text-lg font-bold animate-bounce-subtle"
                            >
                                {t("contests:detail.actions.enterArena" as any) as any}
                                <CheckCircle2 className="w-5 h-5 ml-2" />
                            </Button>
                        )}
                        <Button variant="outline" size="lg" className="bg-background/50 border-border hover:bg-muted rounded-xl h-14 px-8 text-lg">
                            {t("leaderboard:title")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto p-8 md:p-12 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left - Tabs */}
                    <div className="lg:col-span-2 space-y-8">
                        <Tabs defaultValue="overview" className="space-y-8">
                            <TabsList className="bg-muted p-1 border border-border rounded-xl w-full justify-start overflow-x-auto">
                                <TabsTrigger value="overview" className="rounded-lg px-8 data-[state=active]:bg-background data-[state=active]:text-foreground">{t("contests:detail.tabs.overview" as any) as any}</TabsTrigger>
                                <TabsTrigger value="rules" className="rounded-lg px-8 data-[state=active]:bg-background data-[state=active]:text-foreground">{t("contests:detail.tabs.rules" as any) as any}</TabsTrigger>
                                <TabsTrigger value="problems" className="rounded-lg px-8 data-[state=active]:bg-background data-[state=active]:text-foreground">{t("contests:detail.tabs.problems" as any) as any}</TabsTrigger>
                                <TabsTrigger value="faq" className="rounded-lg px-8 data-[state=active]:bg-background data-[state=active]:text-foreground">{t("contests:detail.tabs.faq" as any) as any}</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="m-0 focus-visible:outline-none">
                                <div className="glass-card p-8 space-y-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <BookOpen className="w-6 h-6 text-primary" />
                                        {t("contests:detail.overview.descriptionTitle" as any) as any}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                                        {contest.description}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                            <div className="text-sm text-muted-foreground mb-1">{t("contests:detail.overview.pointsStructure" as any) as any}</div>
                                            <div className="text-lg font-bold">{t("contests:detail.overview.problemsAndPoints" as any, { count: 4, pts: 1100 } as any) as any}</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                            <div className="text-sm text-muted-foreground mb-1">{t("contests:detail.overview.eloTitle" as any) as any}</div>
                                            <div className="text-lg font-bold">{t("contests:detail.overview.eloDesc" as any) as any}</div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="rules" className="m-0 focus-visible:outline-none">
                                <div className="glass-card p-8 space-y-6">
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-red-500" />
                                        {t("contests:detail.rules.title" as any) as any}
                                    </h2>
                                    <div className="space-y-4">
                                        {contest.rules.map((rule, idx) => (
                                            <div key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-muted/30 border border-border">
                                                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 text-red-500 font-bold">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-muted-foreground py-1">{rule}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="problems" className="m-0 focus-visible:outline-none">
                                <div className="space-y-4">
                                    {contest.problems.map((prob) => (
                                        <div key={prob.id} className="glass-card p-6 flex justify-between items-center group hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-black text-xl">
                                                    {prob.id}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold">{prob.title}</h3>
                                                    <div className="text-sm text-muted-foreground mt-1">{t("contests:detail.problems.solvedCount" as any, { count: prob.solved } as any) as any}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-primary">{prob.points}</div>
                                                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t("contests:detail.problems.pointsMax" as any) as any}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-6 text-center text-muted-foreground italic border-2 border-dashed border-border rounded-2xl">
                                        {t("contests:detail.problems.lockedNote" as any) as any}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right - Sidebar Info */}
                    <div className="space-y-8">
                        {/* Countdown Widget */}
                        <div className="glass-card p-8 bg-primary shadow-2xl shadow-primary/20 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                <LayoutGrid className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">{t("contests:detail.sidebar.countdownTitle")}</h3>
                            <div className="flex gap-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black">23</span>
                                    <span className="text-[10px] uppercase font-bold text-white/80">{t("contests:detail.sidebar.hours" as any) as any}</span>
                                </div>
                                <span className="text-3xl font-black opacity-40">:</span>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black">45</span>
                                    <span className="text-[10px] uppercase font-bold text-white/80">{t("contests:detail.sidebar.minutes" as any) as any}</span>
                                </div>
                                <span className="text-3xl font-black opacity-40">:</span>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black">12</span>
                                    <span className="text-[10px] uppercase font-bold text-white/80">{t("contests:detail.sidebar.seconds" as any) as any}</span>
                                </div>
                            </div>
                        </div>

                        {/* Organizer Info */}
                        <div className="glass-card p-6">
                            <h4 className="text-sm font-bold text-muted-foreground uppercase mb-4 tracking-widest">{t("contests:detail.sidebar.organizerTitle")}</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-bold">{t("contests:mock.organizerName")}</div>
                                    <div className="text-xs text-muted-foreground">{t("contests:detail.sidebar.verifiedMember")}</div>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="glass-card p-6 bg-yellow-500/10 border border-yellow-500/20 space-y-3">
                            <div className="flex items-center gap-2 text-yellow-500 font-bold">
                                <AlertCircle className="w-4 h-4" />
                                {t("contests:detail.sidebar.notesTitle" as any) as any}
                            </div>
                            <p className="text-xs text-yellow-500/80 leading-relaxed italic">
                                {t("contests:detail.sidebar.notesDesc" as any) as any}
                            </p>
                        </div>

                        {/* Quick Help */}
                        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground gap-3 p-6 h-auto bg-card border border-border rounded-2xl">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            <div className="text-left">
                                <div className="font-bold text-sm">{t("contests:detail.sidebar.helpTitle" as any) as any}</div>
                                <div className="text-xs">{t("contests:detail.sidebar.helpDesc" as any) as any}</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetail;
