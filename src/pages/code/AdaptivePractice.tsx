import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    BrainCircuit,
    Target,
    Zap,
    Sparkles,
    BarChart3,
    ArrowUpRight,
    Search,
    Play,
    Timer,
    CheckCircle2,
    AlertTriangle,
    Flame,
    History,
    Settings2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const SKILL_GAPS = [
    { title: "code:adaptive.sidebar.gaps.nestedLoops", strength: 45, impact: "+20% Logic Score", color: "text-amber-500", trend: 'stagnant' },
    { title: "code:adaptive.sidebar.gaps.recursionBasics", strength: 32, impact: "+15% Efficiency", color: "text-rose-500", trend: 'declining' },
    { title: "code:adaptive.sidebar.gaps.arrayMethods", strength: 78, impact: "+5% Speed", color: "text-primary", trend: 'improving' },
    { title: "code:adaptive.sidebar.gaps.timeComplexity", strength: 20, impact: "+30% Optimization", color: "text-purple-500", trend: 'new' },
];


export const AdaptivePractice: React.FC = () => {
    const { t } = useTranslation(["code", "common"]);
    const navigate = useNavigate();

    const [difficulty, setDifficulty] = useState([65]);
    const [isStarting, setIsStarting] = useState(false);

    const handleStart = () => {
        setIsStarting(true);
        setTimeout(() => setIsStarting(false), 2000);
    };

    return (
        <AppLayout>
            <div className="container mx-auto py-8 px-4 max-w-6xl space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <BrainCircuit className="w-4 h-4" />
                            {t("code:adaptive.header.personalized")}
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">{t("code:adaptive.header.title")}</h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-2 italic">
                            <Sparkles className="w-4 h-4 text-amber-500" /> {t("code:adaptive.header.subtitle")}
                        </p>

                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-10 glass-card border-primary/10" onClick={() => toast.info(t("code:adaptive.header.historyToast"))}>
                            <History className="w-4 h-4 mr-2" /> {t("code:adaptive.header.history")}
                        </Button>
                        <Button variant="outline" className="h-10 glass-card border-primary/10" onClick={() => navigate('/student/skill-gap')}>
                            <BarChart3 className="w-4 h-4 mr-2" /> {t("code:adaptive.header.analysis")}
                        </Button>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
                    <div className="space-y-8">
                        {/* Primary Recommendation Card */}
                        <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <BrainCircuit className="w-48 h-48" />
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-primary/20 text-primary border-none text-[10px] font-black uppercase tracking-widest italic">{t("code:adaptive.recommendation.badge")}</Badge>
                                    <Badge variant="outline" className="text-[9px] border-primary/20 text-primary">{t("code:adaptive.recommendation.priority")}</Badge>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">{t("code:adaptive.recommendation.title")}</h2>
                                <p className="text-muted-foreground text-sm max-w-lg">
                                    <Trans
                                        i18nKey="code:adaptive.recommendation.description"
                                        components={{ strong: <strong /> }}
                                    />
                                </p>

                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("code:adaptive.recommendation.stats.match")}</div>
                                        <div className="text-xl font-black text-primary italic">98%</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("code:adaptive.recommendation.stats.difficulty")}</div>
                                        <div className="text-xl font-black text-amber-500 italic">Medium</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("code:adaptive.recommendation.stats.currency")}</div>
                                        <div className="text-xl font-black text-primary italic">+250 XP</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t("code:adaptive.recommendation.stats.time")}</div>
                                        <div className="text-xl font-black text-indigo-500 italic">15p</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="h-5 text-[9px] bg-muted/50">{t("code:adaptive.recommendation.tags.optimal")}</Badge>
                                    <Badge variant="secondary" className="h-5 text-[9px] bg-muted/50">{t("code:adaptive.recommendation.tags.gap")}</Badge>
                                    <Badge variant="secondary" className="h-5 text-[9px] bg-muted/50">{t("code:adaptive.recommendation.tags.efficiency")}</Badge>
                                    <Badge variant="secondary" className="h-5 text-[9px] bg-muted/50">{t("code:adaptive.recommendation.tags.repetition")}</Badge>
                                </div>

                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t p-6">
                                <div className="flex flex-col md:flex-row gap-3 w-full">
                                    <Button className="flex-1 h-12 text-sm font-black italic uppercase tracking-widest gap-3 shadow-xl shadow-primary/20" onClick={handleStart}>
                                        {isStarting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                                        {t("code:adaptive.recommendation.startAction")}
                                    </Button>
                                    <Button variant="outline" className="h-12 px-6 text-[10px] font-bold uppercase tracking-widest">{t("code:adaptive.recommendation.docsAction")}</Button>

                                </div>
                            </CardFooter>
                        </Card>

                        {/* Adaptive Difficulty Control */}
                        <Card className="glass-card border-primary/10">
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Settings2 className="w-4 h-4 text-primary" /> {t("code:adaptive.difficulty.title")}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">{t("code:adaptive.difficulty.subtitle")}</p>
                                </div>
                                <Badge className="bg-amber-500/10 text-amber-600 border-none font-bold text-[10px]">{t("code:adaptive.difficulty.badge")}</Badge>

                            </CardHeader>
                            <CardContent className="py-8 space-y-8">
                                <div className="px-4 space-y-6">
                                    <Slider
                                        value={difficulty}
                                        onValueChange={setDifficulty}
                                        max={100}
                                        step={5}
                                        className="[&>span]:bg-primary"
                                    />
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        <span className={difficulty[0] < 30 ? "text-primary" : ""}>{t("code:adaptive.difficulty.zones.comfort")}</span>
                                        <span className={difficulty[0] >= 30 && difficulty[0] < 70 ? "text-amber-500" : ""}>{t("code:adaptive.difficulty.zones.growth")}</span>
                                        <span className={difficulty[0] >= 70 ? "text-rose-600 animate-pulse" : ""}>{t("code:adaptive.difficulty.zones.danger")}</span>
                                    </div>

                                </div>
                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4">
                                    <div className="p-2 rounded-lg bg-primary/20 h-fit">
                                        <Target className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold uppercase italic">{t("code:adaptive.difficulty.analysis", { val: difficulty[0] })}</h4>
                                        <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                                            <Trans
                                                i18nKey="code:adaptive.difficulty.message"
                                                components={{ strong: <strong /> }}
                                            />
                                        </p>
                                    </div>

                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar: Gap Pulse & Insights */}
                    <div className="space-y-8">
                        {/* Skill Gap Pulse */}
                        <Card className="glass-card border-primary/20 bg-primary/5 overflow-hidden shadow-xl">
                            <CardHeader className="pb-0">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary italic flex items-center gap-2">
                                    <Flame className="w-4 h-4" /> {t("code:adaptive.sidebar.priorityGaps")}
                                </h3>

                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {SKILL_GAPS.map((gap, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-bold">{t(gap.title)}</span>
                                            <span className="text-[9px] font-bold text-muted-foreground uppercase">{gap.impact}</span>
                                        </div>

                                        <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${gap.strength}%` }}
                                                transition={{ delay: i * 0.2, duration: 1 }}
                                                className={`h-full bg-gradient-to-r from-primary to-primary/60`}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[8px] font-mono text-muted-foreground/60 uppercase tracking-tighter">
                                            <span>{t("code:adaptive.sidebar.strength")}</span>
                                            <span>{gap.strength}%</span>
                                        </div>

                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="bg-primary/10 p-4 justify-center border-t border-primary/5">
                                <Button variant="link" className="text-primary text-[10px] font-black uppercase tracking-widest p-0 h-auto" onClick={() => navigate('/student/skill-gap')}>
                                    {t("code:adaptive.sidebar.viewMore")} <ArrowUpRight className="w-3 h-3 ml-1" />
                                </Button>

                            </CardFooter>
                        </Card>

                        {/* Session Streak/Incentive */}
                        <Card className="glass-card bg-amber-500 border-none text-white shadow-xl shadow-amber-500/20">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-2xl">
                                    <Zap className="w-8 h-8 text-white fill-current" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-black italic tracking-tighter leading-none mt-1 uppercase">{t("code:adaptive.sidebar.dailyGoal.title")}</h4>
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider">{t("code:adaptive.sidebar.dailyGoal.message")}</p>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Inline AI Tutor Hint */}
                        <div className="p-6 rounded-3xl bg-secondary/30 border border-border space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10 border-2 border-primary/20">
                                    <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs">AI</AvatarFallback>
                                </Avatar>
                                <div className="space-y-0.5">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">{t("code:adaptive.tip.title")}</div>
                                    <div className="text-xs font-bold">{t("code:adaptive.tip.subtitle")}</div>
                                </div>

                            </div>
                            <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                                <Trans
                                    i18nKey="code:adaptive.tip.message"
                                    components={{ strong: <strong /> }}
                                />
                            </p>
                            <Button size="sm" variant="outline" className="w-full text-[9px] font-black uppercase tracking-widest h-8 border-primary/10" onClick={() => navigate('/student/study-planner')}>{t("code:adaptive.tip.plannerAction")}</Button>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdaptivePractice;
