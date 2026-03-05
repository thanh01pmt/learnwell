import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    Bot,
    Cpu,
    Play,
    History,
    Trophy,
    Code2,
    Zap,
    Settings,
    ChevronRight,
    BrainCircuit,
    Rocket,
    Sword,
    Shield,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

export const BotArena: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('lab');

    const botStats = [
        { label: t("contests:quickMatch.lobby.wins"), value: 342, color: 'text-green-500' },
        { label: t("contests:quickMatch.lobby.losses"), value: 120, color: 'text-red-500' },
        { label: t("contests:botArena.sidebar.winrate"), value: '74%', color: 'text-primary' },
        { label: t("contests:botArena.sidebar.elo"), value: 1850, color: 'text-amber-500' },
    ];

    const recentBattles = [
        { opponent: 'AlphaBot v2', result: 'WIN', time: t("common:time.minutesAgo", { count: 2 }), points: '+15' },
        { opponent: 'NeuralNinja', result: 'LOSS', time: t("common:time.minutesAgo", { count: 15 }), points: '-12' },
        { opponent: 'ByteBeast', result: 'WIN', time: t("common:time.hoursAgo", { count: 1 }), points: '+18' },
    ];

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b pb-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <Cpu className="w-4 h-4" />
                        {t("contests:botArena.hero.smallTitle")}
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">{t("contests:botArena.hero.title" as any) as any}</h1>

                    <p className="text-muted-foreground max-w-xl">
                        {t("contests:botArena.hero.subtitle" as any) as any}
                        <br />
                        {t("contests:botArena.hero.desc" as any) as any}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1 font-bold italic">
                        {t("contests:botArena.hero.rankTag" as any) as any}
                    </Badge>
                    <div className="text-3xl font-black italic text-primary">{t("contests:botArena.hero.rankValue" as any) as any}</div>
                </div>
            </div>

            <Tabs defaultValue="lab" className="w-full space-y-6" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/30 p-1 rounded-xl border">
                    <TabsList className="bg-transparent h-12 gap-2">
                        <TabsTrigger value="lab" className="px-6 gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Code2 className="w-4 h-4" /> {t("contests:botArena.tabs.lab" as any) as any}
                        </TabsTrigger>
                        <TabsTrigger value="tournaments" className="px-6 gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <Sword className="w-4 h-4" /> {t("contests:botArena.tabs.tournaments" as any) as any}
                        </TabsTrigger>
                        <TabsTrigger value="history" className="px-6 gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            <History className="w-4 h-4" /> {t("contests:botArena.tabs.history" as any) as any}
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-4 px-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <Avatar key={i} className="w-8 h-8 border-2 border-background">
                                    <AvatarFallback className="text-[10px] bg-muted">B{i}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <Button size="sm" className="gap-2 h-9 font-bold bg-primary shadow-lg shadow-primary/20">
                            <Play className="w-3.5 h-3.5" /> {t("contests:botArena.actions.testBot" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* BOT LAB: Code & Configuration */}
                <TabsContent value="lab" className="grid grid-cols-1 lg:grid-cols-3 gap-8 m-0 outline-none">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="glass-card overflow-hidden flex flex-col min-h-[500px]">
                            <CardHeader className="py-3 bg-muted/40 border-b flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-primary/10 text-primary border-primary/20">Python 3.10</Badge>
                                    <span className="text-xs font-mono text-muted-foreground">my_bot_v4.py</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><History className="w-4 h-4" /></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 bg-zinc-950 relative overflow-hidden">
                                <div className="absolute top-0 left-0 bottom-0 w-12 border-r border-white/5 flex flex-col items-center pt-6 text-[10px] font-mono text-white/20 select-none">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => <div key={i} className="h-6">{i}</div>)}
                                </div>
                                <div className="p-6 pl-16 font-mono text-sm space-y-2">
                                    <p className="text-pink-400">import <span className="text-white">arena_api</span></p>
                                    <p className="text-pink-400">class <span className="text-blue-400">StrategyBot</span>(arena_api.BaseBot):</p>
                                    <p>&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-blue-400">on_move</span>(<span className="text-orange-400">self</span>, game_state):</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;enemy = game_state.get_nearest_enemy()</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">if</span> enemy.distance &lt; 5:</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground">{t("contests:botArena.lab.mockTyping" as any) as any}</span></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.deploy_shield()</p>
                                </div>
                                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                                    <Button className="rounded-full w-14 h-14 shadow-2xl bg-primary hover:bg-primary/90">
                                        <Rocket className="w-6 h-6" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        {/* Strategy Assistant */}
                        <Card className="glass-card bg-primary/5 border-primary/20">
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-bold flex items-center gap-2">
                                    <BrainCircuit className="w-4 h-4 text-primary" /> {t("contests:botArena.sidebar.assistantTitle" as any) as any}
                                </h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 rounded-xl bg-background border border-primary/10">
                                    <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">{t("contests:botArena.sidebar.suggestionLabel" as any) as any}</div>
                                    <p className="text-[10px] leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: t("contests:botArena.mock.assistantSuggestion" as any) as any }} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">{t("contests:botArena.sidebar.computePower" as any) as any}</div>
                                    <Progress value={68} className="h-1.5" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Live Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {botStats.map((stat, i) => (
                                <Card key={i} className="glass-card p-4 text-center">
                                    <div className={`text-xl font-black italic ${stat.color}`}>{stat.value}</div>
                                    <div className="text-[9px] uppercase font-bold text-muted-foreground">{stat.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <Card className="glass-card">
                            <CardHeader className="pb-2">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("contests:botArena.sidebar.recentActivity" as any) as any}</h3>
                            </CardHeader>
                            <CardContent className="px-2 pb-2">
                                {recentBattles.map((battle, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${battle.result === 'WIN' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                                            <div>
                                                <div className="text-[11px] font-bold group-hover:text-primary transition-colors">{battle.opponent}</div>
                                                <div className="text-[9px] text-muted-foreground">{battle.time}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-[10px] font-bold ${battle.result === 'WIN' ? 'text-green-600' : 'text-red-600'}`}>{battle.points}</div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full h-8 text-[10px] text-primary hover:bg-primary/5">{t("contests:botArena.sidebar.viewAllHistory" as any) as any}</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* TOURNAMENTS: Tournament Listings */}
                <TabsContent value="tournaments" className="m-0 outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Cyber Circuit #42', prize: '5,000 LearnCoins', entry: 'Free', status: 'In Progress', icon: Sword },
                            { title: 'Clan War: Ruby Division', prize: '100 Gems', entry: 'Level 10+', status: 'Registering', icon: Shield },
                            { title: 'Bot Blitz Night', prize: 'Exclusive Badge', entry: '10 Gems', status: 'Starts in 2h', icon: Zap },
                        ].map((tourney, i) => (
                            <Card key={i} className="glass-card overflow-hidden hover:translate-y-[-4px] transition-all cursor-pointer group">
                                <div className="h-32 bg-zinc-900 relative overflow-hidden bg-gradient-to-br from-primary/20 to-transparent">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform">
                                        <tourney.icon className="w-32 h-32" />
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-primary/80 backdrop-blur-md mb-2">{tourney.status}</Badge>
                                        <h3 className="text-lg font-black italic text-white">{tourney.title}</h3>
                                    </div>
                                </div>
                                <CardContent className="p-4 space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground font-bold uppercase text-[9px]">{t("contests:botArena.tournaments.prizeLabel")}</span>
                                        <span className="font-bold text-amber-500">{tourney.prize}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground font-bold uppercase text-[9px]">{t("contests:botArena.tournaments.entryLabel")}</span>
                                        <span className="font-bold">{tourney.entry}</span>
                                    </div>
                                    <Button className="w-full h-9 text-xs font-bold gap-2">
                                        {tourney.status === 'Registering' ? t("contests:botArena.tournaments.registerAction") : t("contests:botArena.tournaments.viewAction")}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Leaderboard Shortcut */}
            <Card className="glass-card border-none bg-gradient-to-r from-primary/10 to-transparent">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold">{t("contests:botArena.footer.leaderboardTitle" as any) as any}</h3>
                            <p className="text-sm text-muted-foreground">{t("contests:botArena.footer.leaderboardDesc" as any) as any}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                            <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{t("contests:botArena.footer.seasonResults" as any) as any}</div>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div className="w-2 h-2 rounded-full bg-muted" />
                            </div>
                        </div>
                        <Button variant="default" className="shadow-lg shadow-primary/20 h-10 px-6 font-bold truncate">
                            {t("contests:botArena.footer.rankingAction" as any) as any} <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
