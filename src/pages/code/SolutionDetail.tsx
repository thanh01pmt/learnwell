import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSolutions } from "@/mocks/data";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowLeft,
    ThumbsUp,
    MessageCircle,
    GitFork,
    Eye,
    Share2,
    MoreVertical,
    CheckCircle2,
    Copy,
    Sparkles,
    Flag,
    Code
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';


export const SolutionDetail: React.FC = () => {
    const { t } = useTranslation(["code", "common"]);
    const { id } = useParams();
    const navigate = useNavigate();
    const solution = mockSolutions[id as keyof typeof mockSolutions] || mockSolutions["s1"];
    const [isLiked, setIsLiked] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(solution.code);
        toast.success(t("code:hub.actions.copySuccess"));
    };

    const handleFork = () => {
        toast.info(t("code:hub.actions.isInitializing"));
        setTimeout(() => navigate('/playground'), 1000);
    };


    return (
        <AppLayout>
            <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8 animate-fade-in">
                {/* Back button */}
                <Button
                    variant="ghost"
                    className="gap-2 -ml-4 hover:bg-transparent hover:text-primary transition-colors font-bold"
                    onClick={() => navigate('/code-gallery')}
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t("code:hub.actions.backToGallery")}
                </Button>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Solution Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <header className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-wider text-[10px]">
                                    {solution.language}
                                </Badge>
                                <Badge className="bg-accent/10 text-accent border-none font-bold uppercase tracking-wider text-[10px]">
                                    {solution.approach}
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">{solution.problemTitle} — {t("code:hub.details.detailedSolution")}</h1>

                            <p className="text-muted-foreground leading-relaxed">
                                {solution.description}
                            </p>
                        </header>

                        {/* Code Editor Mockup */}
                        <Card className="glass-card border-primary/20 bg-slate-950 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40 ml-4">solution.js</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white" onClick={handleCopy}>
                                        <Copy className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">
                                        <Share2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-0">
                                <pre className="p-6 text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed">
                                    {solution.code}
                                </pre>
                            </CardContent>
                            <CardFooter className="px-6 py-4 border-t border-white/5 bg-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className={`flex items-center gap-2 text-xs font-bold transition-colors ${isLiked ? 'text-rose-500 font-black' : 'text-white/60 hover:text-white'}`}
                                    >
                                        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                        {solution.likes + (isLiked ? 1 : 0)} {t("code:hub.details.likes")}
                                    </button>

                                    <div className="flex items-center gap-2 text-xs font-bold text-white/60">
                                        <MessageCircle className="w-4 h-4" />
                                        {solution.comments} {t("code:hub.actions.discussions")}
                                    </div>

                                </div>
                                <Button className="gap-2 px-6 h-10 font-black italic uppercase text-xs tracking-widest shadow-xl shadow-primary/20" onClick={handleFork}>
                                    <GitFork className="w-4 h-4" />
                                    {t("code:gallery.forkAndRemix")}
                                </Button>

                            </CardFooter>
                        </Card>

                        {/* Discussion Section Placeholder */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                {t("code:hub.actions.comments", { count: 12 })}
                            </h3>

                            <div className="p-6 rounded-2xl bg-muted/30 border border-border flex gap-4">
                                <Avatar className="w-10 h-10 border border-border">
                                    <AvatarFallback className="font-bold text-xs">MA</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <Input placeholder={t("code:hub.details.commentPlaceholder")} className="bg-transparent border-dashed" />
                                    <div className="flex justify-end">
                                        <Button size="sm" className="text-[10px] font-bold uppercase tracking-widest">{t("code:hub.actions.sendComment")}</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right: Author & Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="glass-card border-primary/10 overflow-hidden shadow-lg">
                            <div className="h-20 bg-gradient-to-br from-primary/20 to-accent/20" />
                            <CardHeader className="text-center -mt-10 pb-2">
                                <Avatar className="w-20 h-20 mx-auto border-4 border-card shadow-xl">
                                    <AvatarImage src={solution.author.avatar} />
                                    <AvatarFallback>{solution.author.initials}</AvatarFallback>
                                </Avatar>
                                <div className="pt-4">
                                    <h3 className="text-xl font-bold">{solution.author.name}</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Level {solution.author.level} {t("code:roles.developer")}</p>
                                </div>

                            </CardHeader>
                            <CardContent className="space-y-6 pt-0">
                                <div className="flex justify-between p-4 bg-muted/50 rounded-2xl border border-border">
                                    <div className="text-center px-4">
                                        <div className="text-lg font-black">{solution.author.reputation}</div>
                                        <div className="text-[9px] font-bold uppercase text-muted-foreground">{t("code:hub.details.reputation")}</div>
                                    </div>

                                    <div className="w-px bg-border my-2" />
                                    <div className="text-center px-4">
                                        <div className="text-lg font-black">42</div>
                                        <div className="text-[9px] font-bold uppercase text-muted-foreground">{t("code:hub.details.solutions")}</div>
                                    </div>
                                </div>


                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> {t("code:hub.details.views")}</span>

                                        <span className="font-bold">{solution.views.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground flex items-center gap-2"><GitFork className="w-3.5 h-3.5" /> {t("code:hub.details.forks")}</span>

                                        <span className="font-bold">{solution.forks}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> {t("code:hub.details.bestApproach")}</span>

                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t">
                                <Button variant="outline" className="w-full text-xs font-bold gap-2">
                                    {t("code:hub.actions.viewProfile")}
                                </Button>
                            </CardFooter>

                        </Card>

                        {/* Related Tags */}
                        <div className="p-6 rounded-3xl bg-secondary/30 border border-border space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Code className="w-4 h-4 text-primary" /> {t("code:hub.details.topics")}
                            </h4>

                            <div className="flex flex-wrap gap-2">
                                {solution.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-[10px] font-bold bg-background/50 hover:bg-primary/10 transition-colors cursor-pointer capitalize">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Quick AI Tip */}
                        <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-3">
                            <div className="flex items-center gap-2 text-amber-600">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{t("code:hub.details.aiTipLabel")}</span>
                            </div>

                            <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                                "{t("code:hub.details.aiTip")}"
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default SolutionDetail;
