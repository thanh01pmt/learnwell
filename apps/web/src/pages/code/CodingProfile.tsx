import React from "react";
import { useTranslation } from "react-i18next";

import {
    Activity,
    Zap,
    Target,
    Trophy,
    Brain,
    Flame,
    BarChart3,
    Calendar,
    ChevronDown,
    Settings,
    Share2,
    Star,
    Shield,
    Award,
    Users,
    Medal,
    Heart
} from "lucide-react";
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const HEATMAP_DATA = Array.from({ length: 365 }, (_, i) => ({
    day: i,
    value: Math.floor(Math.random() * 5), // 0 to 4 intensity
}));

const CodingProfile = () => {
    const { t } = useTranslation(["code", "common"]);

    const SKILL_DATA = [
        { subject: t("code:blog.tags.algorithms"), A: 120, fullMark: 150 },
        { subject: t("common:subjects.math"), A: 98, fullMark: 150 },
        { subject: t("code:blog.tags.webdev"), A: 86, fullMark: 150 },
        { subject: t("code:blog.tags.backend"), A: 99, fullMark: 150 },
        { subject: t("code:blog.tags.devops"), A: 85, fullMark: 150 },
        { subject: t("code:blog.tags.ai"), A: 65, fullMark: 150 },
    ];

    const LANGUAGE_DATA = [
        { name: 'Python', value: 45, color: '#3776ab' },
        { name: 'JavaScript', value: 30, color: '#f7df1e' },
        { name: 'C++', value: 15, color: '#00599c' },
        { name: 'Java', value: 10, color: '#b07219' },
    ];

    return (
        <div className="min-h-screen text-foreground bg-background p-6 md:p-12 space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-12">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border-4 border-background shadow-2xl overflow-hidden">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tony"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                            <Flame className="w-4 h-4 text-white fill-white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black">Tony Pham</h1>
                            <Badge className="bg-primary text-primary-foreground font-bold hover:bg-primary/90">{t("code:roles.expert")}</Badge>
                        </div>

                        <p className="text-muted-foreground font-mono text-sm mb-4">@tonypham • {t("code:profile.header.joined", { date: "Feb 2026" })}</p>
                        <div className="flex gap-6 text-sm font-bold">
                            <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500" /> 2,450 Elo</span>
                            <span className="flex items-center gap-2 text-primary"><Flame className="w-4 h-4" /> {t("code:profile.header.streak", { count: 12 })}</span>
                            <span className="flex items-center gap-2 text-blue-500"><Target className="w-4 h-4" /> {t("code:profile.header.rank", { count: 1245 })}</span>
                        </div>

                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        {t("code:profile.header.share")}
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 font-bold px-8">
                        <Settings className="w-4 h-4" />
                        {t("code:profile.header.settings")}
                    </Button>
                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Skill Radar & Langs */}
                <div className="space-y-8">
                    <div className="glass-card p-6 bg-card border border-border">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Brain className="text-primary w-5 h-5" />
                            {t("code:profile.analysis.title")}
                        </h2>

                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                                    <PolarGrid stroke="hsl(var(--border))" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Tony"
                                        dataKey="A"
                                        stroke="hsl(var(--primary))"
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.4}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--popover-foreground))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--primary))' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-card border border-border">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <BarChart3 className="text-primary w-5 h-5" />
                            {t("code:profile.analysis.languages")}
                        </h2>

                        <div className="space-y-4">
                            {LANGUAGE_DATA.map(lang => (
                                <div key={lang.name} className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-muted-foreground">{lang.name}</span>
                                        <span className="text-primary">{lang.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${lang.value}%` }}
                                            style={{ backgroundColor: lang.color }}
                                            className="h-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity Heatmap & Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Activity Heatmap */}
                    <div className="glass-card p-8 bg-card border border-border">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <Calendar className="text-primary w-6 h-6" />
                                {t("code:profile.activity.title")}
                            </h2>

                            <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                {t("code:profile.activity.less")}
                                {[0, 1, 2, 3, 4].map(v => (
                                    <div
                                        key={v}
                                        className={cn(
                                            "w-3 h-3 rounded-sm",
                                            v === 0 ? "bg-muted" :
                                                v === 1 ? "bg-primary/30" :
                                                    v === 2 ? "bg-primary/60" :
                                                        v === 3 ? "bg-primary/80" : "bg-primary"
                                        )}
                                    />
                                ))}
                                {t("code:profile.activity.more")}
                            </div>

                        </div>

                        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-4 custom-scrollbar">
                            {HEATMAP_DATA.map(item => (
                                <div
                                    key={item.day}
                                    className={cn(
                                        "w-[10px] h-[10px] rounded-sm transition-colors cursor-pointer hover:border-black/20 dark:hover:border-white/20 border border-transparent",
                                        item.value === 0 ? "bg-muted" :
                                            item.value === 1 ? "bg-primary/30" :
                                                item.value === 2 ? "bg-primary/60" :
                                                    item.value === 3 ? "bg-primary/80" : "bg-primary"
                                    )}
                                    title={t("code:profile.activity.summary", { count: item.value })}
                                />

                            ))}
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">{t("code:profile.activity.summary", { count: 452 })}</p>
                    </div>


                    {/* Stats Tiles */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: t("code:profile.stats.solved"), val: "452", icon: Activity, color: "text-blue-500" },
                            { label: t("code:profile.stats.elo"), val: "2,450", icon: Trophy, color: "text-yellow-500" },
                            { label: t("code:profile.stats.awards"), val: "12", icon: Medal, color: "text-primary" },
                            { label: t("code:profile.stats.badges"), val: "24", icon: Star, color: "text-purple-500" },
                        ].map(stat => {
                            const Icon = stat.icon;

                            return (
                                <div key={stat.label} className="glass-card p-6 flex flex-col items-center text-center bg-card border border-border">
                                    <Icon className={cn("w-6 h-6 mb-3", stat.color)} />
                                    <div className="text-2xl font-black">{stat.val}</div>
                                    <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progression Chart */}
                    <div className="glass-card p-8 bg-card border border-border">
                        <h2 className="text-xl font-bold mb-8">{t("code:profile.stats.eloHistory")}</h2>

                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { month: 'Sep', elo: 1200 },
                                    { month: 'Oct', elo: 1450 },
                                    { month: 'Nov', elo: 1800 },
                                    { month: 'Dec', elo: 2100 },
                                    { month: 'Jan', elo: 2300 },
                                    { month: 'Feb', elo: 2450 },
                                ]}>
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--popover-foreground))' }}
                                        labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                                        cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                                    />
                                    <Bar dataKey="elo" radius={[6, 6, 0, 0]}>
                                        {[1200, 1450, 1800, 2100, 2300, 2450].map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medals & Achievements */}
            <div className="glass-card p-8 bg-card border border-border">
                <h2 className="text-xl font-bold mb-8">{t("code:profile.achievements.title")}</h2>
                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                    {[
                        { name: t("code:profile.achievements.mock.titan.name"), desc: t("code:profile.achievements.mock.titan.desc"), icon: Shield, color: "text-red-500" },
                        { name: t("code:profile.achievements.mock.learner.name"), desc: t("code:profile.achievements.mock.learner.desc"), icon: Heart, color: "text-pink-500" },
                        { name: t("code:profile.achievements.mock.hunter.name"), desc: t("code:profile.achievements.mock.hunter.desc"), icon: Brain, color: "text-primary" },
                        { name: t("code:profile.achievements.mock.star.name"), desc: t("code:profile.achievements.mock.star.desc"), icon: Users, color: "text-blue-500" },
                        { name: t("code:profile.achievements.mock.contender.name"), desc: t("code:profile.achievements.mock.contender.desc"), icon: Award, color: "text-yellow-500" },
                    ].map(ach => {
                        const Icon = ach.icon;

                        return (
                            <div key={ach.name} className="flex flex-col items-center gap-3 w-32 group cursor-pointer">
                                <div className="w-16 h-16 rounded-full bg-muted border border-border flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(13,148,136,0.3)]">
                                    <Icon className={cn("w-8 h-8", ach.color)} />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-bold">{ach.name}</div>
                                    <div className="text-[10px] text-muted-foreground">{ach.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Required for Recharts components that aren't imported in my environment
export default CodingProfile;
