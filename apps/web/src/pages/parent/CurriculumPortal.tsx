import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Map,
    BookOpen,
    HelpCircle,
    ChevronRight,
    TrendingUp,
    CheckCircle2,
    Calendar,
    Zap,
    Star,
    Download,
    Share2,
    Lightbulb
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const curriculumMilestones = [
    {
        id: 1,
        title: "parent:curriculum.mocks.milestone1.title",
        status: "completed",
        completion: 100,
        howToHelp: "parent:curriculum.mocks.milestone1.howToHelp",
        skills: ["Logic", "Memory Management"]
    },
    {
        id: 2,
        title: "parent:curriculum.mocks.milestone2.title",
        status: "in_progress",
        completion: 65,
        howToHelp: "parent:curriculum.mocks.milestone2.howToHelp",
        skills: ["Decision Making", "Problem Solving"]
    },
    {
        id: 3,
        title: "parent:curriculum.mocks.milestone3.title",
        status: "upcoming",
        completion: 0,
        howToHelp: "parent:curriculum.mocks.milestone3.howToHelp",
        skills: ["Automation", "Data Organization"]
    },
    {
        id: 4,
        title: "parent:curriculum.mocks.milestone4.title",
        status: "upcoming",
        completion: 0,
        howToHelp: "parent:curriculum.mocks.milestone4.howToHelp",
        skills: ["Creativity", "Integration"]
    }
];

export default function CurriculumPortal() {
    const { t } = useTranslation();
    const [selectedMilestone, setSelectedMilestone] = useState(curriculumMilestones[1]);

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("parent:curriculum.title" as any) as any}</h1>
                        <p className="text-muted-foreground">
                            {t("parent:curriculum.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("parent:curriculum.actions.downloadPdf" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-primary">
                            <Share2 className="mr-2 h-4 w-4" />
                            {t("parent:curriculum.actions.shareProgress" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Interactive Roadmap Sidebar */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Map className="h-5 w-5 text-primary" />
                                {t("parent:curriculum.roadmap.title" as any) as any}
                            </CardTitle>
                            <CardDescription>{t("parent:curriculum.roadmap.desc" as any) as any}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="relative">
                                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
                                <div className="space-y-4 px-4 pb-6">
                                    {curriculumMilestones.map((milestone) => (
                                        <div
                                            key={milestone.id}
                                            className={cn(
                                                "relative pl-12 pr-4 py-3 rounded-lg cursor-pointer transition-all border",
                                                selectedMilestone.id === milestone.id
                                                    ? "bg-primary/5 border-primary/20 shadow-sm"
                                                    : "bg-transparent border-transparent hover:bg-slate-50"
                                            )}
                                            onClick={() => setSelectedMilestone(milestone)}
                                        >
                                            <div className={cn(
                                                "absolute left-6 -translate-x-1/2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 z-10",
                                                milestone.status === 'completed' ? 'bg-green-500 border-green-200' :
                                                    milestone.status === 'in_progress' ? 'bg-primary border-primary/30 animate-pulse' : 'bg-white border-slate-300'
                                            )}>
                                                {milestone.status === 'completed' && <CheckCircle2 className="h-3 w-3 text-white" />}
                                            </div>
                                            <h4 className={cn("text-sm font-semibold", selectedMilestone.id === milestone.id ? "text-primary" : "text-slate-700")}>
                                                {t(milestone.title as any)}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Progress value={milestone.completion} className="h-1 flex-1" />
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{t("parent:curriculum.roadmap.completion" as any, { count: milestone.completion } as any) as any}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed View & Tips */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-t-4 border-t-primary">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className="text-xs">{t("parent:curriculum.details.title" as any) as any}</Badge>
                                    {selectedMilestone.status === 'in_progress' && (
                                        <Badge className="bg-amber-500 text-white border-none">{t("parent:curriculum.details.inProgress" as any) as any}</Badge>
                                    )}
                                </div>
                                <CardTitle className="text-2xl">{t(selectedMilestone.title as any)}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold flex items-center gap-2 mb-3">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        {t("parent:curriculum.details.skills" as any) as any}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMilestone.skills.map((skill, i) => (
                                            <Badge key={i} variant="secondary" className="bg-slate-100 hover:bg-slate-200">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                                    <h4 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                                        <Lightbulb className="h-5 w-5 text-amber-500" />
                                        {t("parent:curriculum.details.howToHelp" as any) as any}
                                    </h4>
                                    <p className="text-blue-800 text-sm leading-relaxed italic">
                                        "{t(selectedMilestone.howToHelp as any)}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <BookOpen className="h-5 w-5 text-primary mb-2" />
                                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors text-left">{t("parent:curriculum.details.summaryDoc" as any) as any}</h5>
                                        <p className="text-xs text-muted-foreground text-left">{t("parent:curriculum.details.summaryDocDesc" as any) as any}</p>
                                    </div>
                                    <div className="p-4 border rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <HelpCircle className="h-5 w-5 text-primary mb-2" />
                                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors text-left">{t("parent:curriculum.details.quizSuggestions" as any) as any}</h5>
                                        <p className="text-xs text-muted-foreground text-left">{t("parent:curriculum.details.quizSuggestionsDesc" as any) as any}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 flex justify-between">
                                <span className="text-xs text-muted-foreground">{t("parent:curriculum.details.lastUpdated", { time: t("common:time.3hours") })}</span>
                                <Button size="sm">{t("parent:curriculum.details.askTeacher" as any) as any}</Button>
                            </CardFooter>
                        </Card>

                        {/* AI Weekly Digest Preview */}
                        <Card className="overflow-hidden bg-slate-900 text-white relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Zap className="h-32 w-32" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 text-warning mb-2">
                                    <Star className="h-4 w-4 fill-warning" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{t("parent:curriculum.weeklyDigest.badge" as any) as any}</span>
                                </div>
                                <CardTitle>{t("parent:curriculum.weeklyDigest.title" as any) as any}</CardTitle>
                                <CardDescription className="text-slate-400">{t("parent:curriculum.weeklyDigest.desc" as any) as any}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        {t("parent:curriculum.weeklyDigest.summary", { hours: "4.5", score: "8/10" })}
                                    </p>
                                    <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border-white/10 text-white">
                                        {t("parent:curriculum.weeklyDigest.viewDraft" as any) as any} <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
