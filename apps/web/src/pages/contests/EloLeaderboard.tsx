import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    Search,
    ChevronRight,
    TrendingUp,
    Shield,
    Globe,
    Users,
    Filter,
    Timer,
    Medal,
    Star,
    Crown
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useTranslation } from "react-i18next";

const RANK_TIERS = [
    { name: 'Grandmaster', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: Trophy, minElo: 2800 },
    { name: 'Master', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Star, minElo: 2400 },
    { name: 'Diamond', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Shield, minElo: 2000 },
    { name: 'Platinum', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Medal, minElo: 1800 },
    { name: 'Gold', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Shield, minElo: 1500 },
    { name: 'Silver', color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20', icon: Shield, minElo: 1200 },
    { name: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-700/10', border: 'border-amber-700/20', icon: Shield, minElo: 0 },
];

const MOCK_ELO_RANKINGS = [
    { rank: 1, name: "classroom:mocks.students.minh", elo: 2950, tier: "Grandmaster", winRate: "78%", trend: "up", avatar: "HM" },
    { rank: 2, name: "Thanh Pham", elo: 2880, tier: "Grandmaster", winRate: "75%", trend: "stable", avatar: "TP" },
    { rank: 3, name: "Elena Volkov", elo: 2790, tier: "Master", winRate: "72%", trend: "up", avatar: "EV" },
    { rank: 4, name: "Alex Johnson", elo: 2650, tier: "Master", winRate: "68%", trend: "down", avatar: "AJ" },
    { rank: 5, name: "Kenji Sato", elo: 2540, tier: "Master", winRate: "65%", trend: "up", avatar: "KS" },
    { rank: 6, name: "Maria Garcia", elo: 2320, tier: "Diamond", winRate: "63%", trend: "stable", avatar: "MG" },
    { rank: 7, name: "You (Tony)", elo: 1476, tier: "Gold", winRate: "60%", trend: "up", avatar: "T", isUser: true },
    { rank: 8, name: "Robert Smith", elo: 2150, tier: "Diamond", winRate: "58%", trend: "none", avatar: "RS" },
];

interface EloLeaderboardProps {
    publicView?: boolean;
}

export const EloLeaderboard: React.FC<EloLeaderboardProps> = ({ publicView = false }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const userRanking = MOCK_ELO_RANKINGS.find(r => r.isUser);

    const getTierColor = (tierName: string) => {
        return RANK_TIERS.find(t => t.name === tierName) || RANK_TIERS[6];
    };

    const Container = publicView ? ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4">{children}</div> : AppLayout;

    return (
        <Container>
            <div className="py-16 md:py-24 space-y-10 animate-fade-in">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <Trophy className="w-4 h-4" />
                            {t("contests:eloLeaderboard.header.smallTitle" as any) as any}
                        </div>
                        <h1 className="text-2xl lg:text-4xl font-black tracking-tight">{t("contests:eloLeaderboard.header.title" as any) as any} <span className="text-primary">{t("contests:eloLeaderboard.header.subtitle" as any) as any}</span></h1>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                            <Timer className="w-4 h-4" /> {t("contests:eloLeaderboard.header.timerLabel" as any) as any} <span className="font-bold text-primary">{t("common:labels.daysCount", { count: 12 })} 04:20:15</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder={t("contests:eloLeaderboard.header.searchPlaceholder" as any) as any}
                                className="pl-10 w-[240px] h-10 glass-card bg-background/50 border-primary/10 focus:border-primary/30"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="h-10 glass-card border-primary/10 hover:border-primary/30">
                            <Filter className="w-4 h-4 mr-2" /> {t("contests:eloLeaderboard.header.filter" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Podium Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto py-10 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10" />

                    {/* 2nd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="order-2 md:order-1 flex flex-col items-center"
                    >
                        <div className="relative mb-4 group cursor-pointer">
                            <div className="absolute inset-0 bg-slate-400/20 blur-xl rounded-full group-hover:bg-slate-400/40 transition-all" />
                            <Avatar className="h-24 w-24 border-4 border-slate-400/50 shadow-2xl relative z-10">
                                <AvatarFallback className="text-2xl font-black bg-slate-100 text-slate-600">HM</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-slate-400 text-white rounded-full flex items-center justify-center border-4 border-background z-20 font-black shadow-lg">
                                2
                            </div>
                        </div>
                        <div className="text-center bg-slate-400/10 backdrop-blur-md p-6 rounded-t-3xl border-x border-t border-slate-400/20 w-full shadow-lg">
                            <h3 className="font-black text-lg group-hover:text-primary transition-colors italic">{t("classroom:mocks.students.minh")}</h3>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">2950 ELO</div>
                            <Badge className="mt-3 bg-slate-400/20 text-slate-600 hover:bg-slate-400/30 border-none font-black text-[9px]">SILVER TIER</Badge>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="order-1 md:order-2 flex flex-col items-center mb-8 md:mb-12"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative mb-6 group cursor-pointer"
                        >
                            <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 text-warning drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20" />
                            <div className="absolute inset-0 bg-warning/20 blur-2xl rounded-full group-hover:bg-warning/40 transition-all scale-150" />
                            <Avatar className="h-32 w-32 border-4 border-warning shadow-[0_0_50px_rgba(234,179,8,0.3)] relative z-10 scale-110">
                                <AvatarFallback className="text-3xl font-black bg-warning text-black">TP</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-warning text-black rounded-full flex items-center justify-center border-4 border-background z-20 font-black text-xl shadow-lg ring-4 ring-warning/20">
                                1
                            </div>
                        </motion.div>
                        <div className="text-center bg-warning/10 backdrop-blur-md p-8 rounded-t-[3rem] border-x border-t border-warning/20 w-full shadow-2xl relative">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-warning rounded-full blur-sm" />
                            <h3 className="font-black text-2xl text-warning italic tracking-tight uppercase">Thanh Pham</h3>
                            <div className="text-sm font-black text-primary mt-1 tracking-widest">3120 ELO</div>
                            <div className="flex justify-center gap-2 mt-4">
                                <Badge className="bg-warning text-black font-black text-[10px] uppercase tracking-widest px-4">GRANDMASTER</Badge>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="order-3 flex flex-col items-center"
                    >
                        <div className="relative mb-4 group cursor-pointer">
                            <div className="absolute inset-0 bg-amber-700/20 blur-xl rounded-full group-hover:bg-amber-700/40 transition-all" />
                            <Avatar className="h-24 w-24 border-4 border-amber-700/50 shadow-2xl relative z-10">
                                <AvatarFallback className="text-2xl font-black bg-amber-50 text-amber-900">EV</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-amber-700 text-white rounded-full flex items-center justify-center border-4 border-background z-20 font-black shadow-lg">
                                3
                            </div>
                        </div>
                        <div className="text-center bg-amber-700/10 backdrop-blur-md p-6 rounded-t-3xl border-x border-t border-amber-700/20 w-full shadow-lg">
                            <h3 className="font-black text-lg italic">Elena Volkov</h3>
                            <div className="text-xs font-bold text-amber-700 uppercase tracking-widest mt-1">2790 ELO</div>
                            <Badge className="mt-3 bg-amber-700/20 text-amber-900 border-none font-black text-[9px]">BRONZE TIER</Badge>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
                    {/* Main Rankings Table */}
                    <div className="space-y-6">
                        <Card className="glass-card border-primary/10 overflow-hidden">
                            <div className="grid grid-cols-[60px_1fr_120px_100px_80px] gap-4 p-4 border-b bg-muted/20 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                                <div className="text-center">{t("contests:leaderboard.table.rank" as any) as any}</div>
                                <div>{t("contests:leaderboard.table.name" as any) as any}</div>
                                <div className="text-center">{t("contests:eloLeaderboard.table.tier" as any) as any}</div>
                                <div className="text-center">{t("contests:eloLeaderboard.table.winRate" as any) as any}</div>
                                <div className="text-right">{t("contests:leaderboard.table.score" as any) as any}</div>
                            </div>
                            <ScrollArea className="h-[600px]">
                                <div className="divide-y divide-border/30">
                                    {MOCK_ELO_RANKINGS.map((user, i) => {
                                        const tier = getTierColor(user.tier);
                                        return (
                                            <motion.div
                                                key={user.rank}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`grid grid-cols-[60px_1fr_120px_100px_80px] gap-4 p-4 items-center transition-colors group ${user.isUser ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/50'
                                                    }`}
                                            >
                                                <div className="text-center font-black text-lg italic opacity-50 group-hover:opacity-100 transition-opacity">
                                                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border border-primary/10">
                                                        <AvatarFallback>{user.avatar}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-bold flex items-center gap-2">
                                                            {user.name.includes(':') ? t(user.name as any) : user.name}
                                                            {user.isUser && <Badge className="h-4 text-[8px] bg-primary/20 text-primary border-none uppercase">{t("common:labels.you")}</Badge>}
                                                        </div>
                                                        <div className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-tighter">
                                                            <Globe className="w-2.5 h-2.5" /> Vietnam
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Badge className={`h-6 rounded-md px-2 ${tier.bg} ${tier.color} border-none font-black text-[9px] uppercase italic tracking-tighter shadow-sm`}>
                                                        {user.tier}
                                                    </Badge>
                                                </div>
                                                <div className="text-center font-mono text-sm font-bold text-muted-foreground">
                                                    {user.winRate}
                                                </div>
                                                <div className="text-right font-black text-primary text-lg tabular-nums">
                                                    {user.elo.toLocaleString()}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        {publicView ? (
                            <Card className="card-modern bg-primary border-none text-primary-foreground overflow-hidden relative">
                                <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                <CardHeader>
                                    <h3 className="text-xs font-black uppercase tracking-widest opacity-70 italic">{t("contests:eloLeaderboard.sidebar.joinTitle" as any) as any}</h3>
                                </CardHeader>
                                <CardContent className="space-y-4 relative z-10">
                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                        {t("contests:eloLeaderboard.sidebar.joinDesc" as any) as any}
                                    </p>
                                    <Button
                                        className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-black italic uppercase text-xs h-10 tracking-widest shadow-xl"
                                        onClick={() => navigate("/login")}
                                    >
                                        {t("contests:eloLeaderboard.sidebar.loginAction" as any) as any}
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            /* User Status Spotlight */
                            <Card className="glass-card bg-primary border-none text-primary-foreground overflow-hidden relative">
                                <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                <CardHeader className="pb-2">
                                    <h3 className="text-xs font-black uppercase tracking-widest opacity-70 italic">{t("contests:userStats.rank" as any) as any}</h3>
                                </CardHeader>
                                <CardContent className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                                            <AvatarFallback className="text-primary text-xl font-bold">TP</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-2xl font-black italic tracking-tighter uppercase mb-1">Thanh Pham</div>
                                            <Badge className="bg-white/20 text-white border-none py-0 h-5 text-[9px] font-bold">GOLD III</Badge>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
                                            <div className="text-2xl font-black tabular-nums">1,476</div>
                                            <div className="text-[9px] font-bold uppercase opacity-60">Current ELO</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md">
                                            <div className="text-2xl font-black tabular-nums">#422</div>
                                            <div className="text-[9px] font-bold uppercase opacity-60">Global Pos</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                            <span>{t("contests:eloLeaderboard.sidebar.progressToTier" as any, { tier: "Platinum" } as any) as any}</span>
                                            <span className="opacity-70">{t("contests:eloLeaderboard.sidebar.ptsToTier" as any, { pts: 324 } as any) as any}</span>
                                        </div>
                                        <Progress value={65} className="h-1.5 bg-white/20 [&>div]:bg-white" />
                                    </div>
                                    <Button
                                        className="w-full bg-white text-primary hover:bg-white/90 font-black italic uppercase text-xs h-10 tracking-widest shadow-xl"
                                        onClick={() => navigate('/contests/quick-match')}
                                    >
                                        {t("contests:eloLeaderboard.sidebar.findMatch" as any) as any}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Recent Activity Mini-Feed */}
                        <Card className="glass-card border-primary/10">
                            <CardHeader className="pb-2 border-b">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <TrendingUp className="w-3.5 h-3.5" /> {t("contests:eloLeaderboard.sidebar.seasonTrends" as any) as any}
                                </h3>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                {[
                                    { user: "Alex J.", diff: "+50", action: t("contests:leaderboard.mockActions.streak") },
                                    { user: "Maria G.", diff: "-12", action: t("contests:leaderboard.mockActions.fail") },
                                    { user: "classroom:mocks.students.haianh", diff: "+22", action: t("contests:leaderboard.mockActions.record") },
                                ].map((act, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className={`w-1.5 h-8 rounded-full ${act.diff.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <div>
                                            <div className="text-xs font-bold leading-none">{act.user.includes(':') ? t(act.user as any) : act.user} <span className={act.diff.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{act.diff}</span></div>
                                            <p className="text-[10px] text-muted-foreground mt-1">{act.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Esports Community Ad */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 text-white space-y-4 shadow-xl shadow-purple-500/20">
                            <h4 className="font-black italic uppercase tracking-tighter leading-tight">{t("contests:eloLeaderboard.sidebar.clanTitle" as any) as any}</h4>
                            <p className="text-[10px] leading-relaxed opacity-80">{t("contests:eloLeaderboard.sidebar.clanDesc" as any) as any}</p>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="w-full h-8 text-[10px] font-bold uppercase tracking-widest"
                                onClick={() => navigate(publicView ? "/login" : "/contests")}
                            >
                                {publicView ? t("contests:eloLeaderboard.sidebar.clanActionJoin" as any) as any : t("contests:eloLeaderboard.sidebar.clanActionView" as any) as any}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default EloLeaderboard;
