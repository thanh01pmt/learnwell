import React from "react";
import { useTranslation } from "react-i18next";

import {
    Brain,
    Sparkles,
    ArrowRight,
    Target,
    Zap,
    ShieldAlert,
    CheckCircle2,
    Lightbulb,
    Code2,
    ChevronRight,
    Search,
    BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const AIRecommendations = () => {
    const { t } = useTranslation(["code", "common"]);

    const MOCK_RECOMMENDATIONS = [
        {
            id: "r1",
            title: t("code:ai.recommendations.mock.r1.title"),
            type: t("code:ai.recommendations.mock.r1.type"),
            reason: t("code:ai.recommendations.mock.r1.reason"),
            difficulty: "Medium",
            xp: 250,
            icon: ShieldAlert,
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            id: "r2",
            title: t("code:ai.recommendations.mock.r2.title"),
            type: t("code:ai.recommendations.mock.r2.type"),
            reason: t("code:ai.recommendations.mock.r2.reason"),
            difficulty: "Hard",
            xp: 500,
            icon: Zap,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            id: "r3",
            title: t("code:ai.recommendations.mock.r3.title"),
            type: t("code:ai.recommendations.mock.r3.type"),
            reason: t("code:ai.recommendations.mock.r3.reason"),
            difficulty: "Easy",
            xp: 150,
            icon: Target,
            color: "text-primary",
            bgColor: "bg-primary/10"
        }
    ];

    const GAPS_DATA = [
        { name: "Dynamic Programming", level: 35, status: "critical" },
        { name: "Graph Theory", level: 50, status: "improving" },
        { name: "System Design", level: 20, status: "critical" },
        { name: "Unit Testing", level: 75, status: "good" },
    ];

    return (
        <div className="min-h-screen text-foreground bg-background p-6 md:p-12 space-y-12">
            {/* AI Hero Section */}
            <div className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-card to-background border border-border overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/30 transition-colors duration-700" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 animate-pulse">
                            <Sparkles className="w-3 h-3 mr-2" />
                            {t("code:ai.hero.badge")}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                            {t("code:ai.hero.title")} <br />
                            <span className="text-primary italic">{t("code:ai.hero.titleHighlight")}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            {t("code:ai.hero.subtitle")}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14 px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-2">
                                <Target className="w-5 h-5" />
                                {t("code:ai.hero.startNow")}
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-2xl h-14 px-8 font-bold">
                                {t("code:ai.hero.viewAnalysis")}
                            </Button>
                        </div>

                    </div>

                    <div className="w-full lg:w-96 glass-card p-8 space-y-6 bg-card/50 border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("code:ai.goals.title")}</span>
                            <span className="text-primary font-bold">75%</span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>{t("code:ai.goals.dp")}</span>
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <Progress value={100} className="h-1 bg-muted" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>{t("code:ai.goals.blog")}</span>
                                    <span className="text-muted-foreground">1/2</span>
                                </div>
                                <Progress value={50} className="h-1 bg-muted" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>{t("code:ai.goals.contest")}</span>
                                    <span className="text-muted-foreground">0/1</span>
                                </div>
                                <Progress value={10} className="h-1 bg-muted" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left: Knowledge Gaps */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <ShieldAlert className="text-red-500 w-6 h-6" />
                        {t("code:ai.gaps.title")}
                    </h2>

                    <div className="space-y-4">
                        {GAPS_DATA.map(gap => (
                            <div key={gap.name} className="glass-card p-6 space-y-4 group hover:border-primary/30 transition-colors bg-card border border-border">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">{gap.name}</h3>
                                    <Badge className={cn(
                                        "text-[10px] px-2 py-0 border-none",
                                        gap.status === "critical" ? "bg-red-500/20 text-red-500" :
                                            gap.status === "improving" ? "bg-yellow-500/20 text-yellow-500" : "bg-primary/20 text-primary"
                                    )}>
                                        {t(`code:ai.gaps.status.${gap.status}`)}
                                    </Badge>

                                </div>
                                <Progress value={gap.level} className="h-1.5 bg-muted" />
                                <Button variant="ghost" className="w-full text-[10px] font-black uppercase text-primary tracking-widest h-8 hover:bg-primary/10">
                                    {t("code:ai.gaps.practiceNow")}
                                </Button>

                            </div>
                        ))}
                    </div>

                    <div className="glass-card p-8 bg-primary/10 border-primary/20 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                            <Lightbulb className="text-primary-foreground w-6 h-6 fill-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">{t("code:ai.tips.title")}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            "{t("code:ai.tips.message")}"
                        </p>

                    </div>
                </div>

                {/* Right: Recommendations Grid */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Brain className="text-primary w-6 h-6" />
                            {t("code:ai.recommendations.title")}
                        </h2>
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">{t("code:ai.recommendations.viewAll")}</Button>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_RECOMMENDATIONS.map(rec => {
                            const Icon = rec.icon;
                            return (
                                <motion.div
                                    key={rec.id}
                                    whileHover={{ y: -5 }}
                                    className="glass-card p-8 flex flex-col group cursor-pointer bg-card border border-border shadow-sm hover:shadow-md"
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", rec.bgColor)}>
                                        <Icon className={cn("w-7 h-7", rec.color)} />
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{rec.type}</span>
                                        <Badge variant="outline" className="border-border text-[10px] font-bold">{rec.difficulty}</Badge>
                                    </div>
                                    <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{rec.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed flex-1">
                                        {rec.reason}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-border">
                                        <div className="flex items-center gap-2 font-bold text-yellow-500">
                                            <Sparkles className="w-4 h-4" />
                                            {rec.xp} XP
                                        </div>
                                        <Button className="bg-muted hover:bg-primary text-foreground hover:text-primary-foreground transition-all rounded-xl h-10 px-6 font-bold text-xs uppercase tracking-widest">
                                            {t("code:ai.recommendations.details")}
                                        </Button>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Learning Path Simulation */}
                    <div className="glass-card p-8 space-y-8 bg-card border border-border">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <BookOpen className="text-primary w-6 h-6" />
                            {t("code:ai.progression.title")}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 hidden md:block" />
                            {[
                                { title: t("code:ai.progression.steps.junior"), status: "completed", icon: CheckCircle2, color: "text-primary" },
                                { title: t("code:ai.progression.steps.mid"), status: "inProgress", icon: Zap, color: "text-primary" },
                                { title: t("code:ai.progression.steps.senior"), status: "locked", icon: Target, color: "text-muted-foreground" },
                            ].map((step, idx) => {

                                const Icon = step.icon;
                                return (
                                    <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                                        <div className={cn(
                                            "w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-2xl",
                                            step.status === "completed" ? "bg-primary" :
                                                step.status === "inProgress" ? "bg-primary animate-pulse" : "bg-muted"
                                        )}>
                                            <Icon className={cn("w-8 h-8", step.status === "locked" ? "text-muted-foreground" : "text-primary-foreground")} />
                                        </div>

                                        <div>
                                            <div className="font-bold text-sm mb-1">{step.title}</div>
                                            <div className={cn("text-[10px] font-black uppercase tracking-widest", step.color)}>{t(`code:ai.progression.status.${step.status}`)}</div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIRecommendations;
