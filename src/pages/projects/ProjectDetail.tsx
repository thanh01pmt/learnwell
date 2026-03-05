import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Star,
    Users,
    MessageSquare,
    Eye,
    Calendar,
    Code,
    Sparkles,
    Flag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Trans } from 'react-i18next';
import { toast } from 'sonner';
import { mockProjects } from '@/mocks/data';

export default function ProjectDetail() {
    const { t } = useTranslation(["common", "classroom", "projects", "dashboard"]);
    const { id } = useParams();
    const navigate = useNavigate();
    const project = mockProjects[id as keyof typeof mockProjects] || mockProjects["p1"];

    return (
        <AppLayout>
            <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8 animate-fade-in">
                {/* Back button */}
                <Button
                    variant="ghost"
                    className="w-fit gap-2 -ml-2 text-muted-foreground hover:text-foreground font-bold"
                    onClick={() => navigate('/project-library')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("classroom:projectDetail.backToList")}
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-border shadow-2xl relative group">
                                <img src={project.image} alt={t(project.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <Badge key={tag} className="bg-primary/20 backdrop-blur-md text-white border-white/20 font-bold uppercase tracking-widest text-[10px]">
                                                    {t(tag)}
                                                </Badge>
                                            ))}
                                        </div>
                                        <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase">{t(project.title)}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <Card className="glass-card p-6 text-center space-y-1">
                                    <Star className="w-5 h-5 mx-auto text-warning fill-warning" />
                                    <div className="text-xl font-black">{project.stats.stars}</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{t("projects:detail.stats.stars")}</div>
                                </Card>
                                <Card className="glass-card p-6 text-center space-y-1">
                                    <Users className="w-5 h-5 mx-auto text-primary" />
                                    <div className="text-xl font-black">{project.stats.forks}</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{t("projects:detail.stats.forks")}</div>
                                </Card>
                                <Card className="glass-card p-6 text-center space-y-1">
                                    <Eye className="w-5 h-5 mx-auto text-accent" />
                                    <div className="text-xl font-black">{project.stats.views}</div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{t("projects:detail.stats.views")}</div>
                                </Card>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-black italic uppercase tracking-widest border-l-4 border-primary pl-4">{t("classroom:actions.viewDetails")}</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg italic">
                                "{t(project.description)}"
                            </p>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="leading-relaxed">
                                    {t(project.longDescription)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-black italic uppercase tracking-widest border-l-4 border-accent pl-4">{t("dashboard:stats.achievements")}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border items-start">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-medium text-sm pt-0.5">{t(feature)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card className="glass-card border-primary/20 overflow-hidden relative group">
                            <div className="h-24 bg-gradient-to-br from-primary/20 to-accent/20" />
                            <CardHeader className="text-center -mt-12 pb-4">
                                <Avatar className="h-24 w-24 mx-auto border-4 border-card shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                    <AvatarImage src={project.author.avatar} />
                                    <AvatarFallback>HN</AvatarFallback>
                                </Avatar>
                                <div className="pt-4">
                                    <h3 className="text-xl font-black">{project.author.name}</h3>
                                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mt-1">
                                        {t(project.author.role as any)}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                                    <div className="text-[10px] font-black uppercase text-muted-foreground mb-1">{t("projects:detail.author.personalGoal")}</div>
                                    <p className="text-xs font-bold italic leading-tight">"{t("projects:detail.author.mockGoal", { defaultValue: "Xây dựng các công cụ hỗ trợ giáo dục dễ tiếp cận cho mọi người." })}"</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground">{t("projects:detail.author.module")}</span>
                                        <span className="font-bold">{t("dashboard:subjects.english")}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-muted-foreground">{t("projects:detail.author.memberSince")}</span>
                                        <span className="font-bold">{t("common:months.oct")} 2025</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0 pb-8 flex justify-center">
                                <Button className="w-full mx-6 rounded-xl font-black italic tracking-widest uppercase text-[10px] h-11 shadow-xl shadow-primary/20">{t("projects:detail.author.follow")}</Button>
                            </CardFooter>
                        </Card>

                        <div className="space-y-4">
                            <Button className="w-full h-14 rounded-2xl bg-slate-900 border border-white/10 text-white font-black italic tracking-widest uppercase gap-3 shadow-2xl hover:bg-slate-800 transition-all border-b-4 border-slate-950">
                                <ExternalLink className="w-5 h-5" />
                                {t("projects:detail.actions.liveDemo")}
                            </Button>
                            <Button variant="outline" className="w-full h-14 rounded-2xl glass-card font-black italic tracking-widest uppercase gap-3 hover:bg-primary/5 transition-all">
                                <Github className="w-5 h-5" />
                                {t("projects:detail.actions.sourceCode")}
                            </Button>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/20 space-y-4 relative overflow-hidden">
                            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-accent opacity-10" />
                            <h4 className="font-black italic uppercase tracking-tighter text-accent">{t("projects:detail.aiChallenge.title")}</h4>
                            <p className="text-[11px] leading-relaxed text-muted-foreground font-medium italic">
                                <Trans
                                    i18nKey="projects:detail.aiChallenge.description"
                                    values={{ score: 94 }}
                                    components={{ strong: <strong /> }}
                                />
                            </p>
                            <div className="pt-2">
                                <Badge className="bg-accent/20 text-accent border-none font-bold text-[9px] uppercase tracking-widest">{t("projects:detail.aiChallenge.verified")}</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
