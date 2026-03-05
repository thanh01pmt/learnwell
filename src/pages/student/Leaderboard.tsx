import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Trophy,
    Medal,
    TrendingUp,
    Users,
    Globe,
    Search,
    School,
    Star,
    Target
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const leaderboardData = [
    { rank: 1, name: "Nguyễn Văn A", xp: 12500, level: 25, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=an", trend: "up" },
    { rank: 2, name: "Trần Thị B", xp: 11800, level: 24, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=binh", trend: "stable" },
    { rank: 3, name: "Lê Hoàng C", xp: 11200, level: 23, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cuong", trend: "up" },
    { rank: 4, name: "Phạm Thị D", xp: 10500, level: 22, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dung", trend: "down" },
    { rank: 5, name: "Student User", xp: 10200, level: 21, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you", trend: "up", isUser: true },
    { rank: 6, name: "Vũ Thị F", xp: 9800, level: 20, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=f", trend: "stable" },
    { rank: 7, name: "Đặng Văn G", xp: 9500, level: 19, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g", trend: "down" },
    { rank: 8, name: "Bùi Thị H", xp: 9200, level: 18, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=h", trend: "up" },
];

export default function Leaderboard() {
    const { t } = useTranslation(["leaderboard", "common"]) as any;
    const [activeTab, setActiveTab] = useState("class");

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
            case 2: return <Medal className="h-6 w-6 text-slate-400" />;
            case 3: return <Medal className="h-6 w-6 text-amber-600" />;
            default: return <span className="text-xl font-bold text-muted-foreground"># {rank}</span>;
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Trophy className="h-6 w-6 text-yellow-500" />
                            {t("title")}
                        </h1>
                        <p className="text-muted-foreground">{t("subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 glass-card rounded-2xl bg-primary/5">
                        <Target className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-[10px] text-primary uppercase font-bold tracking-wider">{t("yourRank")}</p>
                            <p className="text-xl font-black">
                                {t("rankOfTotal", { rank: 5, total: 42 })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Top 3 Spotlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {leaderboardData.slice(0, 3).map((player, idx) => (
                        <motion.div
                            key={player.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative p-6 rounded-3xl text-center flex flex-col items-center glass-card ${player.rank === 1 ? 'scale-110 border-yellow-500/30' : ''
                                }`}
                        >
                            {player.rank === 1 && (
                                <div className="absolute -top-4 w-full flex justify-center">
                                    <Badge className="bg-yellow-500 text-white border-0 py-1 px-4 shadow-xl">{t("crown")}</Badge>
                                </div>
                            )}
                            <div className="relative mb-4">
                                <Avatar className={`h-20 w-20 border-4 ${player.rank === 1 ? 'border-yellow-500' :
                                    player.rank === 2 ? 'border-slate-300' : 'border-amber-600'
                                    }`}>
                                    <AvatarImage src={player.avatar} />
                                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card flex items-center justify-center shadow-lg border border-border">
                                    {getRankIcon(player.rank)}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Badge variant="secondary" className="bg-primary/10 text-primary">{t("level")} {player.level}</Badge>
                                <div className="flex items-center gap-1 text-sm font-bold">
                                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                    {player.xp.toLocaleString()} XP
                                </div>
                            </div>
                            <Button size="sm" variant="outline" className="w-full rounded-xl">{t("viewProfile")}</Button>
                        </motion.div>
                    ))}
                </div>

                {/* List Section */}
                <Card className="glass-card">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                                <TabsList className="glass-card">
                                    <TabsTrigger value="class" className="gap-2">
                                        <Users className="h-4 w-4" /> {t("tabs.class")}
                                    </TabsTrigger>
                                    <TabsTrigger value="school" className="gap-2">
                                        <School className="h-4 w-4" /> {t("tabs.school")}
                                    </TabsTrigger>
                                    <TabsTrigger value="global" className="gap-2">
                                        <Globe className="h-4 w-4" /> {t("tabs.global")}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Button variant="ghost" className="text-sm gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                {t("actions.viewTrend")}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                            {leaderboardData.slice(3).map((player, idx) => (
                                <motion.div
                                    key={player.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`flex items-center justify-between px-6 py-4 hover:bg-muted/10 transition-colors ${player.isUser ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 text-center text-sm font-bold text-muted-foreground italic">
                                            # {player.rank}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={player.avatar} />
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-semibold ${player.isUser ? 'text-primary' : ''}`}>
                                                        {player.isUser ? t("common:you") : player.name}
                                                    </p>
                                                    <Badge variant="outline" className="text-[9px] h-3.5 py-0">{t("level")} {player.level}</Badge>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground">{t("mockup.accumulatedFrom")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-sm font-black">{player.xp.toLocaleString()} XP</p>
                                            <div className="flex items-center justify-end gap-1">
                                                {player.trend === "up" ? (
                                                    <TrendingUp className="h-3 w-3 text-primary" />
                                                ) : player.trend === "down" ? (
                                                    <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
                                                ) : null}
                                                <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">
                                                    {player.trend === "up"
                                                        ? t("mockup.trend.up", { count: 12 })
                                                        : player.trend === "down"
                                                            ? t("mockup.trend.down", { count: 2 })
                                                            : t("mockup.trend.stable")}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Medal className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Progression Call-to-action */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-card bg-gradient-to-r from-primary/10 to-transparent">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="bg-primary/20 p-3 rounded-2xl">
                                <Star className="h-8 w-8 text-primary fill-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold">{t("mockup.cta.howToEarn.title")}</h4>
                                <p className="text-sm text-muted-foreground">{t("mockup.cta.howToEarn.description")}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card bg-gradient-to-r from-amber-500/10 to-transparent">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="bg-amber-500/20 p-3 rounded-2xl">
                                <Medal className="h-8 w-8 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="font-bold">{t("mockup.cta.unlockBadges.title")}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t("mockup.cta.unlockBadges.description", { count: 1500 } as any)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
