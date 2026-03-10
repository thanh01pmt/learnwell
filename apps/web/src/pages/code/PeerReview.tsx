import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Code,
    ThumbsUp,
    Clock,
    User,
    CheckCircle,
    MessageCircle,
    Award,
    Star,
    Search,
    Filter,
    Brain,
    Zap,
    ShieldCheck,
    ChevronRight,
    TrendingUp,
    ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewRequest {
    id: string;
    title: string;
    problemTitle: string;
    author: {
        name: string;
        avatar: string;
        initials: string;
        reputation: number;
        level: number;
    };
    language: string;
    difficulty: "Easy" | "Medium" | "Hard";
    createdAt: string;
    status: "Open" | "In Progress" | "Completed";
    reviewCount: number;
    reward: number; // in LearnCoins
}

export default function PeerReview() {
    const { t } = useTranslation(["code", "common"]);
    const navigate = useNavigate();

    const mockRequests: ReviewRequest[] = [
        {
            id: "r1",
            title: t("code:peer.marketplace.mock.r1.title"),
            problemTitle: "Number of Islands",
            author: {
                name: t("code:peer.marketplace.mock.r1.author"),
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
                initials: "MA",
                reputation: 450,
                level: 5,
            },
            language: "JavaScript",
            difficulty: "Medium",
            createdAt: t("common:time.minutesAgo", { count: 10 }),

            status: "Open",
            reviewCount: 0,
            reward: 15,
        },
        {
            id: "r2",
            title: t("code:peer.marketplace.mock.r2.title"),
            problemTitle: "Bank Account System",
            author: {
                name: t("code:peer.marketplace.mock.r2.author"),
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ducanh",
                initials: "DA",
                reputation: 120,
                level: 3,
            },
            language: "Java",
            difficulty: "Easy",
            createdAt: t("common:time.hoursAgo", { count: 1 }),

            status: "In Progress",
            reviewCount: 1,
            reward: 10,
        },
        {
            id: "r3",
            title: t("code:peer.marketplace.mock.r3.title"),
            problemTitle: "Largest Rectangle in Histogram",
            author: {
                name: t("code:peer.marketplace.mock.r3.author"),
                avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
                initials: "TK",
                reputation: 1280,
                level: 12,
            },
            language: "C++",
            difficulty: "Hard",
            createdAt: t("common:time.hoursAgo", { count: 3 }),

            status: "Open",
            reviewCount: 0,
            reward: 25,
        },
    ];


    const [activeTab, setActiveTab] = useState("all");

    return (
        <AppLayout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black flex items-center gap-3">
                            {t("code:peer.header.title")} <span className="text-primary">Review</span>
                            <ShieldCheck className="h-7 w-7 text-primary" />
                        </h1>
                        <p className="text-muted-foreground max-w-lg italic">
                            {t("code:peer.header.subtitle")}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="glass-card px-6 py-3 border-primary/20 flex items-center gap-4 shadow-xl shadow-primary/5">
                            <div className="text-right">
                                <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">{t("code:peer.header.reputationPoint")}</p>
                                <p className="text-2xl font-black text-primary">1,250</p>
                            </div>

                            <div className="h-10 w-[1px] bg-border mx-2" />
                            <Badge className="bg-success/20 text-success border-none h-8 px-3 font-bold">
                                Expert
                            </Badge>
                        </div>
                        <Button className="h-14 px-8 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20">
                            <Brain className="h-5 w-5" />
                            {t("code:peer.header.submitAction")}
                        </Button>

                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: t("code:peer.stats.done"), value: "24", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10" },
                        { label: t("code:peer.stats.helpful"), value: "92%", icon: ThumbsUp, color: "text-success", bg: "bg-success/10" },
                        { label: t("code:peer.stats.badges"), value: "12", icon: Award, color: "text-warning", bg: "bg-warning/10" },
                        { label: t("code:peer.stats.reputationEarned"), value: "+450", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
                    ].map((stat, i) => (

                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-4 rounded-2xl border-primary/5 flex items-center gap-4"
                        >
                            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-xl font-black">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Marketplace List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Search className="h-5 w-5 text-primary" />
                                {t("code:peer.marketplace.title")}
                            </h2>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="rounded-xl h-9 text-xs font-bold gap-1.5 border-primary/10 bg-primary/5">
                                    <Filter className="h-3 w-3" />
                                    {t("code:peer.marketplace.filter")}
                                </Button>

                                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-9">
                                    <TabsList className="h-full rounded-xl p-1 bg-muted/50 border">
                                        <TabsTrigger value="all" className="h-full text-[10px] font-bold uppercase px-4 rounded-lg">{t("code:peer.marketplace.tabs.all")}</TabsTrigger>
                                        <TabsTrigger value="open" className="h-full text-[10px] font-bold uppercase px-4 rounded-lg">{t("code:peer.marketplace.tabs.open")}</TabsTrigger>
                                        <TabsTrigger value="completed" className="h-full text-[10px] font-bold uppercase px-4 rounded-lg">{t("code:peer.marketplace.tabs.completed")}</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                            </div>
                        </div>

                        <div className="space-y-4">
                            {mockRequests.map((request, i) => (
                                <motion.div
                                    key={request.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-all border-primary/5 group relative overflow-hidden"
                                >
                                    <div className="flex items-start gap-5">
                                        <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:scale-105 transition-transform">
                                            <AvatarImage src={request.author.avatar} />
                                            <AvatarFallback>{request.author.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer" onClick={() => navigate(`/solutions/s1`)}>
                                                        {request.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                                        <span className="text-primary font-bold">{request.author.name}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {request.author.reputation}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {request.createdAt}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{t("code:peer.marketplace.reward")}</p>
                                                    <Badge className="bg-primary/20 text-primary border-none font-black text-sm px-3 py-1">
                                                        {request.reward} 🪙
                                                    </Badge>
                                                </div>

                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className={`text-[10px] font-bold rounded-lg border-primary/20 ${request.language === "JavaScript" ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-600"}`}>
                                                    {request.language}
                                                </Badge>
                                                <Badge variant="secondary" className="text-[10px] font-bold rounded-lg px-2">
                                                    {request.problemTitle}
                                                </Badge>
                                                <div className="flex-1" />
                                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground mr-4">
                                                    <MessageCircle className="h-4 w-4" />
                                                    {t("code:peer.marketplace.comments", { count: request.reviewCount })}
                                                </div>

                                                <Button size="sm" className="h-9 px-6 rounded-xl font-bold gap-2">
                                                    {t("code:peer.marketplace.reviewNow")}
                                                    <ChevronRight className="h-3.5 w-3.5" />
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Button variant="ghost" className="text-primary font-bold gap-2 hover:bg-primary/5 transition-colors">
                                {t("code:peer.marketplace.moreRequests")}
                                <ArrowLeft className="h-4 w-4 rotate-180" />
                            </Button>
                        </div>

                    </div>

                    {/* Leaderboard / Sidebar */}
                    <div className="space-y-6">
                        <Card className="glass-card border-primary/10 shadow-xl shadow-primary/5 overflow-hidden rounded-3xl">
                            <CardHeader className="bg-primary/5 border-b border-primary/10 py-5">
                                <CardTitle className="text-lg font-black flex items-center gap-2">
                                    < Award className="h-5 w-5 text-warning" />
                                    {t("code:peer.leaderboard.title")}
                                </CardTitle>

                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/50">
                                    {[
                                        { name: t("code:peer.leaderboard.mock.cohuong"), reviews: 156, rep: 2500, avatar: "cohuong" },
                                        { name: t("code:peer.leaderboard.mock.tuankiet"), reviews: 92, rep: 1280, avatar: "tuankiet" },
                                        { name: t("code:peer.leaderboard.mock.hamy"), reviews: 64, rep: 890, avatar: "hamy" },
                                    ].map((expert, i) => (

                                        <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="font-black text-muted-foreground w-4 italic">{i + 1}</div>
                                                <Avatar className="h-10 w-10 border border-primary/10">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${expert.avatar}`} />
                                                    <AvatarFallback>{expert.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-bold">{expert.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium">{t("code:peer.leaderboard.reviewsDone", { count: expert.reviews })}</p>
                                                </div>

                                            </div>
                                            <Badge variant="outline" className="text-[10px] border-warning/30 text-warning font-black">
                                                {expert.rep} rep
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <div className="p-4 bg-muted/20 border-t flex justify-center">
                                <Button variant="link" size="sm" className="text-primary font-bold text-xs h-auto">{t("code:peer.leaderboard.fullLeaderboard")}</Button>
                            </div>

                        </Card>

                        <div className="glass-card p-6 rounded-3xl border-accent/10 bg-accent/5 space-y-4">
                            <div className="flex items-center gap-3 text-accent mb-2">
                                <Zap className="h-6 w-6" />
                                <h3 className="font-bold">{t("code:peer.suggestions.title")}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{t("code:peer.suggestions.description")}</p>

                            <div className="space-y-3 pt-2">
                                <div className="p-3 bg-card border rounded-xl hover:border-accent/50 transition-colors cursor-pointer group">
                                    <p className="text-xs font-black truncate group-hover:text-accent">Reverse Linked List II</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">{t("code:peer.suggestions.reward", { count: 20 })}</p>
                                </div>
                                <div className="p-3 bg-card border rounded-xl hover:border-accent/50 transition-colors cursor-pointer group">
                                    <p className="text-xs font-black truncate group-hover:text-accent">Valid Sudoku Solver</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">{t("code:peer.suggestions.reward", { count: 15 })}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
