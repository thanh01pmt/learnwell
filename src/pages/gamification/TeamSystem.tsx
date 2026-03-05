import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Users,
    Shield,
    Sword,
    Trophy,
    Plus,
    Search,
    MessageSquare,
    Zap,
    Medal,
    ChevronRight,
    Star,
    Globe,
    Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/AppLayout";

const TeamSystem = () => {
    const { t } = useTranslation(["gamification", "common"]);
    const [searchQuery, setSearchQuery] = useState("");

    // Mock Data localized within component or using keys
    const MOCK_TEAMS = [
        {
            id: "t1",
            name: "Binary Beasts",
            tag: "BB",
            members: 24,
            maxMembers: 30,
            level: 45,
            elo: 2450,
            description: t("gamification:teams.mock.t1"),
            type: "public",
            rank: 1
        },
        {
            id: "t2",
            name: "Cyber Pandas",
            tag: "CP",
            members: 12,
            maxMembers: 15,
            level: 22,
            elo: 1850,
            description: t("gamification:teams.mock.t2"),
            type: "private",
            rank: 12
        },
        {
            id: "t3",
            name: "Code Wizards",
            tag: "CW",
            members: 48,
            maxMembers: 50,
            level: 68,
            elo: 3100,
            description: t("gamification:teams.mock.t3"),
            type: "public",
            rank: 2
        },
        {
            id: "t4",
            name: "Algorithm Alchemists",
            tag: "AA",
            members: 5,
            maxMembers: 10,
            level: 8,
            elo: 1200,
            description: t("gamification:teams.mock.t4"),
            type: "public",
            rank: 45
        }
    ];

    const TeamCard = ({ team }: { team: typeof MOCK_TEAMS[0] }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6 flex flex-col group cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 text-2xl font-black text-primary">
                    {team.tag}
                </div>
                <div className="flex flex-col items-end">
                    <Badge variant="outline" className="border-border bg-muted text-[10px] mb-2 uppercase">
                        {t("gamification:teams.card.rank", { rank: team.rank })}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        {team.elo} Elo
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{team.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 h-10">{team.description}</p>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase font-black tracking-widest">{t("gamification:teams.card.members", { count: team.members, max: team.maxMembers })}</span>
                    <span className="text-muted-foreground">{Math.round((team.members / team.maxMembers) * 100)}%</span>
                </div>
                <Progress value={(team.members / team.maxMembers) * 100} className="h-1.5 bg-muted" />
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {team.type === "public" ? <Globe className="w-3 h-3 text-primary" /> : <Lock className="w-3 h-3 text-amber-500" />}
                    {t(`gamification:teams.card.type.${team.type}`)}
                </div>
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 text-primary h-auto text-xs font-bold uppercase tracking-widest">
                    {t("gamification:teams.card.details")}
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </motion.div>
    );

    return (
        <AppLayout>
            <div className="min-h-screen p-6 md:p-12 space-y-12 text-foreground">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-2">
                            <Users className="w-4 h-4" />
                            {t("gamification:teams.hero.badge")}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">
                            {t("gamification:teams.hero.title")} <span className="text-primary">{t("gamification:teams.hero.titleHighlight")}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">{t("gamification:teams.hero.subtitle")}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="bg-background/50 border-input hover:bg-muted h-14 px-8 text-lg font-bold">
                            {t("gamification:teams.hero.leaderboard")}
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 px-8 shadow-xl shadow-primary/20 text-lg font-bold gap-2">
                            <Plus className="w-5 h-5" />
                            {t("gamification:teams.hero.create")}
                        </Button>
                    </div>
                </div>

                {/* Your Team Dashboard (Mocked for current user in a team) */}
                <div className="glass-card p-8 bg-gradient-to-br from-card to-background border-border relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border-2 border-primary/20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 z-10">
                        <div className="w-32 h-32 rounded-3xl bg-primary flex items-center justify-center border-4 border-background shadow-2xl text-5xl font-black text-primary-foreground transform -rotate-3 group hover:rotate-0 transition-transform">
                            BB
                        </div>
                        <div>
                            <h2 className="text-3xl font-black mb-2 flex items-center justify-center lg:justify-start gap-3">
                                Binary Beasts
                                <Medal className="w-8 h-8 text-yellow-500" />
                            </h2>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Badge className="bg-primary/20 text-primary border-primary/30">{t("gamification:teams.dashboard.level", { level: 45 })}</Badge>
                                <Badge className="bg-primary/20 text-primary border-primary/30">{t("gamification:teams.dashboard.region", { rank: 1 })}</Badge>
                                <Badge className="bg-muted text-muted-foreground border-border">{t("gamification:teams.dashboard.members", { count: 30, max: 30 })}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full z-10">
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col items-center justify-center text-center">
                            <div className="text-2xl font-black text-primary">2,450</div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mt-1">{t("gamification:teams.dashboard.rating")}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col items-center justify-center text-center">
                            <div className="text-2xl font-black text-primary">12</div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mt-1">{t("gamification:teams.dashboard.trophies")}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col items-center justify-center text-center">
                            <div className="text-2xl font-black text-amber-500">156k</div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mt-1">{t("gamification:teams.dashboard.coins")}</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col items-center justify-center text-center">
                            <div className="text-2xl font-black text-blue-500">#1</div>
                            <div className="text-[10px] font-black uppercase text-muted-foreground mt-1">{t("gamification:teams.dashboard.thisWeek")}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full lg:w-fit z-10">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl font-bold shadow-lg shadow-primary/20 gap-2">
                            <Sword className="w-5 h-5" />
                            {t("gamification:teams.dashboard.battle")}
                        </Button>
                        <Button variant="outline" size="lg" className="bg-background/50 border-input h-14 rounded-xl font-bold gap-2">
                            <MessageSquare className="w-5 h-5" />
                            {t("gamification:teams.dashboard.chat")}
                        </Button>
                    </div>
                </div>

                {/* Explore Teams Section */}
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <h2 className="text-3xl font-bold">{t("gamification:teams.explore.title")}</h2>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={t("gamification:teams.explore.searchPlaceholder")}
                                className="bg-background border-input h-12 pl-10 rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="popular" className="space-y-8">
                        <TabsList className="bg-muted p-1 border border-border rounded-xl">
                            <TabsTrigger value="popular" className="rounded-lg px-8 data-[state=active]:bg-primary">{t("gamification:teams.explore.tabs.popular")}</TabsTrigger>
                            <TabsTrigger value="new" className="rounded-lg px-8 data-[state=active]:bg-primary">{t("gamification:teams.explore.tabs.new")}</TabsTrigger>
                            <TabsTrigger value="friends" className="rounded-lg px-8 data-[state=active]:bg-primary">{t("gamification:teams.explore.tabs.friends")}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="popular" className="m-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {MOCK_TEAMS.map(team => (
                                    <TeamCard key={team.id} team={team} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Team Battle Event Banner */}
                <div className="p-8 rounded-3xl bg-red-500 border border-red-400 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 font-black uppercase italic tracking-widest text-white/80">
                            <Zap className="w-4 h-4 fill-white" />
                            {t("gamification:teams.event.badge")}
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">{t("gamification:teams.event.title")}</h2>
                        <p className="text-white/80 text-lg mt-2">{t("gamification:teams.event.prize")}</p>
                    </div>
                    <Button className="bg-white text-red-500 hover:bg-white/90 h-16 px-10 rounded-2xl text-xl font-black uppercase tracking-tighter group-hover:scale-110 transition-transform relative z-10 shadow-2xl">
                        {t("gamification:teams.event.join")}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
};

export default TeamSystem;
