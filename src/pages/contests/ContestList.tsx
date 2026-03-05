import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    Users,
    Calendar,
    Clock,
    ArrowRight,
    Search,
    Filter,
    Medal,
    Timer,
    Star
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// Mock Data
const MOCK_CONTESTS = [
    {
        id: "c1",
        title: "Spring Code Challenge 2026",
        status: "running",
        startTime: "contests:mock.startTimeOngoing",
        endTime: "contests:mock.endTimeFinishIn",
        endTimeParams: { time: "1h 23m" },
        duration: "contests:mock.duration3h",
        participants: 124,
        problems: 5,
        difficulty: "contests:mock.difficultyMediumHard",
        prize: "contests:mock.prize1",
        heroImage: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
    },
    {
        id: "c2",
        title: "Beginner Sprint #12",
        status: "upcoming",
        startTime: "20:00, 15/03/2026",
        endTime: "contests:mock.endTimeStartsIn",
        endTimeParams: { time: "2" },
        endTimeKey: "common:labels.daysCount",
        duration: "contests:mock.duration2h",
        participants: 85,
        problems: 3,
        difficulty: "contests:mock.difficultyEasy",
        prize: "contests:mock.prize2",
        heroImage: "bg-gradient-to-br from-primary/20 to-teal-500/20"
    },
    {
        id: "c3",
        title: "AI Optimization Marathon",
        status: "upcoming",
        startTime: "09:00, 20/03/2026",
        endTime: "contests:mock.endTimeStartsIn7d",
        duration: "contests:mock.duration24h",
        participants: 210,
        problems: 1,
        difficulty: "contests:mock.difficultyVeryHard",
        prize: "contests:mock.prize3",
        heroImage: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
    },
    {
        id: "c4",
        title: "Weekly Contest #45",
        status: "past",
        startTime: "01/03/2026",
        endTime: "contests:status.past",
        duration: "contests:mock.duration1_5h",
        participants: 342,
        problems: 4,
        difficulty: "contests:difficulty.medium",
        prize: "contests:mock.prize4",
        heroImage: "bg-gradient-to-br from-slate-500/10 to-slate-500/5"
    }
];

const ContestList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContests = MOCK_CONTESTS.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ContestCard = ({ contest }: { contest: typeof MOCK_CONTESTS[0] }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative glass-card p-6 overflow-hidden cursor-pointer h-full flex flex-col"
            onClick={() => navigate(`/contests/${contest.id}`)}
        >
            {/* Background Accent */}
            <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity", contest.heroImage)} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <Badge className={cn(
                        "font-bold",
                        contest.status === "running" ? "bg-red-500 text-white animate-pulse" :
                            contest.status === "upcoming" ? "bg-primary text-primary-foreground" :
                                "bg-muted text-muted-foreground"
                    )}>
                        {contest.status === "running" ? t("contests:status.live" as any) : contest.status === "upcoming" ? t("contests:status.upcoming" as any) : t("contests:status.ended" as any)}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {t("contests:list.participantsCountShort", { count: contest.participants })}
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {contest.title}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {contest.startTime.includes('contests:') ? t(contest.startTime as any) : contest.startTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {t(contest.endTime as any, (contest as any).endTimeParams) as any}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {contest.problems} {t("contests:list.problemsLabel" as any) as any} • {t(contest.difficulty as any) as any}
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-yellow-500">
                        <Medal className="w-4 h-4" />
                        {t(contest.prize as any) as any}
                    </div>
                    <Button size="sm" variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 text-primary">
                        {contest.status === "past" ? t("contests:actions.viewResults" as any) : t("contests:actions.join" as any)}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen p-6 md:p-12 space-y-12 text-foreground">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-12">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-2">
                        <Trophy className="w-4 h-4" />
                        {t("contests:list.headerSmall")}
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black mb-6">
                        {t("contests:header.title" as any) as any} <span className="text-primary italic">LearnWell</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {t("contests:header.subtitle" as any) as any}
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-background/50 border-input hover:bg-muted rounded-xl h-14 px-8">
                        {t("contests:actions.schedule" as any) as any}
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 px-8 shadow-xl shadow-primary/20">
                        {t("contests:actions.organize" as any) as any}
                    </Button>
                </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-gradient-to-br from-primary/20 to-transparent border-primary/20 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">{t("contests:stats.yourRank" as any) as any}</div>
                        <div className="text-3xl font-bold">#1,245</div>
                        <div className="text-xs text-green-500 flex items-center mt-1">
                            <ArrowRight className="w-3 h-3 -rotate-45 mr-1" />
                            {t("contests:stats.rankChange" as any, { count: 12 } as any) as any}
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                        <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">{t("contests:stats.eloRating" as any) as any}</div>
                        <div className="text-3xl font-bold">1,850</div>
                        <div className="text-xs text-muted-foreground mt-1">{t("contests:stats.tierLabel" as any) as any}: {t("contests:elo.tiers.expert" as any) as any}</div>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Medal className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">{t("contests:stats.achievements" as any) as any}</div>
                        <div className="text-3xl font-bold">12</div>
                        <div className="text-xs text-muted-foreground mt-1">4 {t("contests:stats.goldMedals" as any) as any}</div>
                    </div>
                </div>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="ongoing" className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <TabsList className="bg-muted p-1 border border-border rounded-xl">
                        <TabsTrigger value="ongoing" className="rounded-lg px-6 data-[state=active]:bg-primary">{t("contests:tabs.ongoing" as any) as any}</TabsTrigger>
                        <TabsTrigger value="upcoming" className="rounded-lg px-6 data-[state=active]:bg-primary">{t("contests:tabs.upcoming" as any) as any}</TabsTrigger>
                        <TabsTrigger value="past" className="rounded-lg px-6 data-[state=active]:bg-primary">{t("contests:tabs.past" as any) as any}</TabsTrigger>
                    </TabsList>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder={t("contests:actions.searchPlaceholder" as any) as any}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-background border-input pl-10 h-10 rounded-xl"
                        />
                    </div>
                </div>

                <TabsContent value="ongoing" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredContests.filter(c => c.status === "running").map(c => (
                            <ContestCard key={c.id} contest={c} />
                        ))}
                        {filteredContests.filter(c => c.status === "running").length === 0 && (
                            <div className="col-span-full py-20 text-center text-muted-foreground italic border-2 border-dashed border-border rounded-2xl">
                                {t("contests:list.noOngoing" as any) as any}
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="upcoming" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredContests.filter(c => c.status === "upcoming").map(c => (
                            <ContestCard key={c.id} contest={c} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="past" className="m-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredContests.filter(c => c.status === "past").map(c => (
                            <ContestCard key={c.id} contest={c} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContestList;
