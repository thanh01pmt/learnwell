import React from "react";
import {
    Trophy,
    Medal,
    Clock,
    ArrowUp,
    ArrowDown,
    Minus,
    CheckCircle2,
    XCircle,
    Brain,
    Users
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_RANKINGS = [
    { rank: 1, name: "Thanh Pham", score: 1100, solved: 4, penalty: "12:45", trend: "up", avatar: "TP" },
    { rank: 2, name: "Alex Johnson", score: 1050, solved: 4, penalty: "14:20", trend: "down", avatar: "AJ" },
    { rank: 3, name: "Maria Garcia", score: 900, solved: 3, penalty: "08:15", trend: "none", avatar: "MG" },
    { rank: 4, name: "Kenji Sato", score: 850, solved: 3, penalty: "10:30", trend: "up", avatar: "KS" },
    { rank: 5, name: "Elena Volkov", score: 700, solved: 2, penalty: "05:50", trend: "down", avatar: "EV" },
    { rank: 6, name: "Robert Smith", score: 650, solved: 2, penalty: "07:12", trend: "none", avatar: "RS" },
    { rank: 7, name: "You (Tony)", score: 600, solved: 2, penalty: "11:05", trend: "up", avatar: "T" },
    { rank: 8, name: "Liu Wei", score: 500, solved: 1, penalty: "02:40", trend: "none", avatar: "LW" },
];

const ContestLeaderboard = () => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen p-6 md:p-12 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <Trophy className="text-yellow-500 w-8 h-8" />
                        {t("contests:leaderboard.title" as any, { name: "Spring Code Challenge 2026" } as any) as any}
                    </h1>
                    <p className="text-muted-foreground">{t("contests:leaderboard.subtitle" as any, { time: "15s" } as any) as any}</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card px-6 py-3 flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-bold">1,245 <span className="text-muted-foreground font-normal">{t("contests:leaderboard.contestantsCount" as any, { count: " " } as any) as any}</span></span>
                    </div>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-4xl mx-auto pt-10">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-slate-400/20 border-4 border-slate-400 p-1 mb-4 relative">
                        <div className="w-full h-full rounded-full bg-slate-400 flex items-center justify-center text-2xl font-black text-slate-900">
                            AJ
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-xs font-bold text-slate-900 shadow-xl border-2 border-background">
                            2
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <div className="font-bold text-lg">Alex Johnson</div>
                        <div className="text-muted-foreground text-sm">1050 pts</div>
                    </div>
                    <div className="w-full h-32 bg-slate-400/10 border-x border-t border-slate-400/30 rounded-t-2xl flex items-center justify-center">
                        <Medal className="w-12 h-12 text-slate-400/20" />
                    </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-28 h-28 rounded-full bg-yellow-500/20 border-4 border-yellow-500 p-1 mb-4 relative animate-bounce-subtle">
                        <div className="w-full h-full rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-black text-slate-900">
                            TP
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-lg font-black text-slate-900 shadow-xl border-4 border-background">
                            1
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <div className="font-bold text-2xl text-yellow-500">Thanh Pham</div>
                        <div className="text-muted-foreground text-lg">1100 pts</div>
                    </div>
                    <div className="w-full h-48 bg-yellow-500/10 border-x border-t border-yellow-500/30 rounded-t-3xl flex items-center justify-center">
                        <Medal className="w-20 h-20 text-yellow-500/20" />
                    </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-20 h-20 rounded-full bg-amber-700/20 border-4 border-amber-700 p-1 mb-4 relative">
                        <div className="w-full h-full rounded-full bg-amber-700 flex items-center justify-center text-2xl font-black text-white">
                            MG
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-xs font-bold text-white shadow-xl border-2 border-background">
                            3
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <div className="font-bold text-lg">Maria Garcia</div>
                        <div className="text-muted-foreground text-sm">900 pts</div>
                    </div>
                    <div className="w-full h-24 bg-amber-700/10 border-x border-t border-amber-700/30 rounded-t-2xl flex items-center justify-center">
                        <Medal className="w-12 h-12 text-amber-700/20" />
                    </div>
                </motion.div>
            </div>

            {/* Ranking Table */}
            <div className="glass-card overflow-hidden max-w-5xl mx-auto border-border">
                <div className="grid grid-cols-[60px_1fr_100px_100px_120px_60px] gap-4 p-6 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground items-center">
                    <div className="text-center">{t("contests:leaderboard.table.rank" as any) as any}</div>
                    <div>{t("contests:leaderboard.table.name" as any) as any}</div>
                    <div className="text-center">{t("contests:leaderboard.table.solved" as any) as any}</div>
                    <div className="text-center">{t("contests:leaderboard.table.score" as any) as any}</div>
                    <div className="text-center">{t("contests:leaderboard.table.time" as any) as any}</div>
                    <div className="text-right">{t("contests:leaderboard.table.trend" as any) as any}</div>
                </div>

                <div className="divide-y divide-border">
                    {MOCK_RANKINGS.map((user) => (
                        <div
                            key={user.rank}
                            className={cn(
                                "grid grid-cols-[60px_1fr_100px_100px_120px_60px] gap-4 p-6 items-center transition-colors",
                                user.name.includes("You") ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-muted/50"
                            )}
                        >
                            <div className="text-center font-black text-lg">
                                {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm border border-border">
                                    {user.avatar}
                                </div>
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">Pro Developer</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className={cn(
                                        "w-2 h-2 rounded-full",
                                        i < user.solved ? "bg-primary" : "bg-muted"
                                    )} />
                                ))}
                            </div>
                            <div className="text-center font-black text-primary text-lg">{user.score}</div>
                            <div className="text-center text-muted-foreground font-mono text-sm">
                                <span className="flex items-center justify-center gap-2">
                                    <Clock className="w-3 h-3 opacity-30" />
                                    {user.penalty}
                                </span>
                            </div>
                            <div className="flex justify-end">
                                {user.trend === "up" ? (
                                    <ArrowUp className="w-4 h-4 text-primary" />
                                ) : user.trend === "down" ? (
                                    <ArrowDown className="w-4 h-4 text-red-500" />
                                ) : (
                                    <Minus className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-muted/30 border-t border-border flex justify-center">
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                        {t("contests:leaderboard.actions.viewAll" as any) as any}
                        <Users className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto pb-12">
                <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-black text-primary mb-1">100%</div>
                    <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("contests:leaderboard.stats.stability" as any) as any}</div>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-black text-primary mb-1">2,451</div>
                    <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("contests:leaderboard.stats.submissions" as any) as any}</div>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-black text-primary mb-1">12ms</div>
                    <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("contests:leaderboard.stats.latency" as any) as any}</div>
                </div>
                <div className="glass-card p-6 text-center">
                    <div className="text-3xl font-black text-primary mb-1">150</div>
                    <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("contests:leaderboard.stats.solvers" as any) as any}</div>
                </div>
            </div>
        </div>
    );
};

export default ContestLeaderboard;
