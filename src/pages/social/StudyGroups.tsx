import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    MessageSquare,
    Trophy,
    Target,
    ChevronRight,
    UserPlus,
    Shield,
    Star,
    Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface StudyGroup {
    id: string;
    name: string;
    description: string;
    members: number;
    maxMembers: number;
    activeNow: number;
    tags: string[];
    level: number;
    rank: number;
    avatar: string;
}

const mockGroups: StudyGroup[] = [
    {
        id: "g1",
        name: "social:mockup.groups.g1.name",
        description: "social:mockup.groups.g1.description",
        members: 124,
        maxMembers: 150,
        activeNow: 12,
        tags: ["Algorithms", "Competitive"],
        level: 45,
        rank: 1,
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=algo",
    },
    {
        id: "g2",
        name: "social:mockup.groups.g2.name",
        description: "social:mockup.groups.g2.description",
        members: 89,
        maxMembers: 200,
        activeNow: 5,
        tags: ["React", "Node.js", "Vietnam"],
        level: 32,
        rank: 4,
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=web",
    },
    {
        id: "g3",
        name: "social:mockup.groups.g3.name",
        description: "social:mockup.groups.g3.description",
        members: 45,
        maxMembers: 100,
        activeNow: 3,
        tags: ["Python", "Data Science"],
        level: 18,
        rank: 12,
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=python",
    },
];

export default function StudyGroups() {
    const navigate = useNavigate();
    const { t } = useTranslation(["social", "common"]);

    return (
        <AppLayout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black flex items-center gap-3">
                            {t("social:groups.hero.title")}
                            <Users className="h-8 w-8 text-primary" />
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            {t("social:groups.hero.subtitle")}
                        </p>
                    </div>
                    <Button className="h-14 px-8 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20">
                        <Plus className="h-6 w-6" />
                        {t("social:groups.hero.create")}
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={t("social:groups.search.placeholder")} className="pl-12 h-12 rounded-2xl border-primary/10 bg-primary/5 focus-visible:ring-primary" />
                    </div>
                    <div className="flex gap-2">
                        {[
                            { id: "all", label: t("social:groups.search.tabs.all") },
                            { id: "mine", label: t("social:groups.search.tabs.mine") },
                            { id: "suggested", label: t("social:groups.search.tabs.suggested") }
                        ].map(tab => (
                            <Button key={tab.id} variant={tab.id === "all" ? "default" : "outline"} className="rounded-2xl h-12 px-8 font-bold">
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-6">
                        {mockGroups.map((group, i) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-[2.5rem] p-8 border-primary/5 hover:border-primary/20 transition-all group overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                    <Avatar className="h-24 w-24 rounded-3xl border-4 border-primary/10 bg-card shadow-lg shrink-0">
                                        <AvatarImage src={group.avatar} />
                                        <AvatarFallback>{t(group.name as any)[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-2xl font-black group-hover:text-primary transition-colors">{t(group.name as any)}</h2>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground font-medium">
                                                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {t("social:groups.card.members", { current: group.members, total: group.maxMembers })}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1.5 text-success"><Zap className="h-4 w-4 fill-success" /> {t("social:groups.card.active", { count: group.activeNow })}</span>
                                                </div>
                                            </div>
                                            <Badge className="bg-primary/10 text-primary border-none font-bold">TOP {group.rank}</Badge>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed italic">
                                            "{t(group.description as any)}"
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {group.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-none font-bold px-3">#{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${group.id}${i}`} />
                                                        <AvatarFallback>?</AvatarFallback>
                                                    </Avatar>
                                                ))}
                                                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold">+{group.members - 5}</div>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button variant="ghost" className="rounded-xl font-bold gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5">
                                                    <MessageSquare className="h-4 w-4" />
                                                    {t("social:groups.card.chat")}
                                                </Button>
                                                <Button className="rounded-xl px-8 font-black gap-2 shadow-lg shadow-primary/10" onClick={() => toast.success(`${t("social:groups.card.join")} ${t(group.name as any)}!`)}>
                                                    {t("social:groups.card.join")}
                                                    <UserPlus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Leaderboard / Sidebar */}
                    <div className="space-y-8">
                        <div className="glass-card rounded-[2.5rem] p-8 border-warning/20 bg-gradient-to-br from-warning/5 to-transparent relative overflow-hidden">
                            <Trophy className="absolute -right-4 -top-4 h-24 w-24 text-warning opacity-10" />
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Shield className="h-6 w-6 text-warning" />
                                {t("social:groups.sidebar.leaderboard")}
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { name: "Algorithm Masters", xp: "1.2M", rank: 1, avatar: "algo", key: "g1" },
                                    { name: "Fullstack Ninjas", xp: "980K", rank: 2, avatar: "ninja", key: "ninja" },
                                    { name: "AI Explorers", xp: "850K", rank: 3, avatar: "ai", key: "ai" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-card border flex items-center justify-center font-black text-xs">{i + 1}</div>
                                            <Avatar className="h-10 w-10 border-2 border-primary/10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.avatar}`} />
                                                <AvatarFallback>{item.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-bold truncate w-24">{t(`social:mockup.groups.${item.key}.name` as any, { defaultValue: item.name })}</p>
                                                <p className="text-[10px] text-muted-foreground font-black">{item.xp} XP</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-1">
                                            <Progress value={100 - (i * 10)} className="w-12 h-1 bg-primary/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full mt-6 text-primary font-bold text-xs" onClick={() => navigate('/contests/leaderboard/elo')}>{t("social:feed.sidebar.viewAll")}</Button>
                        </div>

                        <div className="glass-card rounded-[2.5rem] p-8 border-primary/10">
                            <h2 className="text-xl font-black mb-4 flex items-center gap-3">
                                <Target className="h-6 w-6 text-primary" />
                                {t("social:groups.sidebar.goals")}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span>{t("social:mockup.groups.goals.dfs")}</span>
                                        <span className="text-primary">85%</span>
                                    </div>
                                    <Progress value={85} className="h-3 rounded-full bg-primary/10" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span>{t("social:mockup.groups.goals.system")}</span>
                                        <span className="text-success">62%</span>
                                    </div>
                                    <Progress value={62} className="h-3 rounded-full bg-success/10" />
                                </div>
                            </div>

                            <p className="text-[10px] text-muted-foreground mt-6 text-center italic">
                                {t("social:groups.sidebar.reward")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
