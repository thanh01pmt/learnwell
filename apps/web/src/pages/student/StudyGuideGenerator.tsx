import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Sparkles,
    Search,
    BookOpen,
    FileText,
    Brain,
    Download,
    Printer,
    Share2,
    ChevronRight,
    Lightbulb,
    CheckCircle2,
    Loader2,
    AlertCircle,
    HelpCircle,
    Clock,
    Plus,
    Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockTopics } from "@/mocks/data";


export default function StudyGuideGenerator() {
    const { t } = useTranslation(["studyGuide", "common"]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    const startGeneration = () => {
        if (!selectedTopic) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResult(true);
        }, 3000);
    };

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("studyGuide:title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("studyGuide:description" as any) as any}</p>
                    </div>
                </div>

                {!showResult ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Topic Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="glass-card shadow-xl border-primary/10">
                                <CardHeader>
                                    <CardTitle className="text-lg">{t("studyGuide:steps.step1.title" as any) as any}</CardTitle>
                                    <CardDescription>{t("studyGuide:steps.step1.description" as any) as any}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockTopics.map((topic) => (
                                        <div
                                            key={topic.id}
                                            onClick={() => setSelectedTopic(topic.id)}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative group",
                                                selectedTopic === topic.id
                                                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                                    : "border-border/40 hover:border-primary/30 bg-muted/20"
                                            )}
                                        >
                                            <Badge className="mb-2 bg-indigo-50 text-indigo-600 border-none">{t(topic.subject as any) as any}</Badge>
                                            <h3 className="font-bold mb-1">{t(topic.title as any) as any}</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t("studyGuide:ui.relatedLessons" as any, { count: topic.lessons } as any) as any}</p>
                                            <div className={cn(
                                                "absolute top-4 right-4 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                selectedTopic === topic.id ? "bg-primary border-primary text-white" : "border-border"
                                            )}>
                                                {selectedTopic === topic.id && <CheckCircle2 className="h-3.5 w-3.5" />}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="p-4 rounded-2xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-all cursor-pointer opacity-60">
                                        <Plus className="h-6 w-6 mb-2 text-muted-foreground" />
                                        <span className="text-xs font-bold text-muted-foreground">{t("studyGuide:ui.addTopic" as any) as any}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5" />
                                        {t("studyGuide:ui.aiConfig" as any) as any}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold">{t("studyGuide:ui.detailLevel" as any) as any}</p>
                                            <p className="text-[10px] text-muted-foreground">{t("studyGuide:ui.detailLevelDesc" as any) as any}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            {['summary', 'standard', 'advanced'].map(mode => (
                                                <Button key={mode} size="sm" variant={mode === 'standard' ? 'default' : 'outline'} className="text-[10px] h-7 rounded-full">
                                                    {t(`studyGuide:ui.modes.${mode}` as any) as any}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold">{t("studyGuide:ui.includeQuestions" as any) as any}</p>
                                            <p className="text-[10px] text-muted-foreground">{t("studyGuide:ui.includeQuestionsDesc" as any) as any}</p>
                                        </div>
                                        <div className="flex items-center gap-2 h-6 w-10 bg-primary/20 rounded-full p-1 cursor-pointer">
                                            <div className="h-4 w-4 bg-primary rounded-full ml-auto" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Generator Action */}
                        <div className="space-y-6">
                            <Card className="glass-card bg-purple-600 text-white overflow-hidden relative shadow-2xl shadow-purple-200 border-none">
                                <CardHeader>
                                    <CardTitle className="text-white">{t("studyGuide:ui.generateTitle" as any) as any}</CardTitle>
                                    <CardDescription className="text-purple-100">
                                        {t("studyGuide:ui.generateDesc" as any, { count: selectedTopic ? "14" : "0" } as any) as any}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Sparkles className="absolute -bottom-10 -right-10 h-40 w-40 text-white/10" />
                                    <div className="space-y-4 relative z-10">
                                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t("studyGuide:ui.estimatedTime" as any) as any}</p>
                                            <p className="text-xl font-black">{t("studyGuide:ui.estimatedSeconds" as any, { count: 45 } as any) as any}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 relative z-10">
                                    <Button
                                        onClick={startGeneration}
                                        disabled={!selectedTopic || isGenerating}
                                        className="w-full bg-white text-purple-600 hover:bg-white/90 font-bold h-12 rounded-xl shadow-lg"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                {t("studyGuide:ui.processing" as any) as any}
                                            </>
                                        ) : (
                                            t("studyGuide:ui.startNow" as any) as any
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>

                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 glass-card border-purple-500/20 space-y-4"
                                >
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-purple-600 uppercase tracking-widest">{t("studyGuide:ui.analyzing" as any) as any}</span>
                                        <span>65%</span>
                                    </div>
                                    <Progress value={65} className="h-2 bg-purple-100 [&>div]:bg-purple-600" />
                                    <div className="space-y-2">
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                                            <CheckCircle2 className="h-3 w-3 text-primary" /> {t("studyGuide:ui.extractingKeywords" as any, { count: 24 } as any) as any}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                                            <CheckCircle2 className="h-3 w-3 text-primary" /> {t("studyGuide:ui.classifyingKnowledge" as any, { count: 3 } as any) as any}
                                        </p>
                                        <p className="text-[10px] text-purple-600 font-bold flex items-center gap-2 animate-pulse">
                                            <Brain className="h-3 w-3" /> {t("studyGuide:ui.writingGuide" as any) as any}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
                    >
                        {/* Main Result */}
                        <Card className="lg:col-span-3 glass-card shadow-2xl border-primary/5 min-h-[600px] flex flex-col">
                            <CardHeader className="p-8 border-b border-border/40 bg-muted/10">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge className="bg-purple-100 text-purple-600 border-none px-3">{t("studyGuide:ui.badge" as any) as any}</Badge>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="h-9 w-9 glass-card"><Printer className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon" className="h-9 w-9 glass-card"><Download className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon" className="h-9 w-9 glass-card"><Share2 className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-black mb-2">{t("studyGuide:mockResult.title" as any) as any}</CardTitle>
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {t("studyGuide:mockResult.subject" as any) as any}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t("common:common.date" as any) as any}: {new Date().toLocaleDateString()}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none">
                                <section className="mb-8">
                                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 not-prose">
                                        <Brain className="h-5 w-5" /> 1. {t("studyGuide:ui.coreConcepts" as any) as any}
                                    </h3>
                                    <p className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary mt-2">
                                        {t("studyGuide:mockResult.definition" as any) as any}
                                    </p>
                                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <li className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-lg">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {t("studyGuide:mockResult.quickSort" as any) as any}
                                        </li>
                                        <li className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-lg">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {t("studyGuide:mockResult.mergeSort" as any) as any}
                                        </li>
                                        <li className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-lg">
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" /> {t("studyGuide:mockResult.bubbleSort" as any) as any}
                                        </li>
                                    </ul>
                                </section>

                                <section className="mb-8 p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                    <h3 className="text-lg font-bold text-amber-600 flex items-center gap-2 not-prose">
                                        <AlertCircle className="h-5 w-5" /> 2. {t("studyGuide:ui.keyTakeaways" as any) as any}
                                    </h3>
                                    <p className="text-xs text-amber-800 leading-relaxed mt-2 italic">
                                        {t("studyGuide:mockResult.takeaway" as any) as any}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-primary flex items-center gap-2 not-prose">
                                        <HelpCircle className="h-5 w-5" /> 3. {t("studyGuide:ui.practiceQuestions" as any) as any}
                                    </h3>
                                    <div className="mt-4 space-y-3">
                                        {['q1', 'q2', 'q3'].map((key, i) => (
                                            <div key={key} className="p-3 bg-muted rounded-xl flex items-start gap-3">
                                                <span className="font-black text-primary">Q{i + 1}:</span>
                                                <p className="text-sm font-medium">{t(`studyGuide:mockResult.practiceQuestions.${key}` as any) as any}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </CardContent>
                        </Card>

                        {/* Side Tools */}
                        <div className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <Brain className="h-4 w-4 text-purple-600" />
                                        {t("studyGuide:ui.aiSuggestions" as any) as any}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="outline" className="w-full justify-start text-[10px] h-9 gap-2 group border-purple-500/20">
                                        <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                            <FileText className="h-3.5 w-3.5" />
                                        </div>
                                        {t("studyGuide:ui.createFlashcards" as any) as any}
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start text-[10px] h-9 gap-2 group border-primary/20">
                                        <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <Play className="h-3.5 w-3.5" />
                                        </div>
                                        {t("studyGuide:ui.startQuickTest" as any) as any}
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="glass-card bg-muted/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-bold">{t("studyGuide:ui.history" as any) as any}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[
                                        { t: "studyGuide:history.h1.title", d: "studyGuide:history.h1.date" },
                                        { t: "studyGuide:history.h2.title", d: "studyGuide:history.h2.date" },
                                    ].map((h, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-bold truncate max-w-[120px]">{t(h.t as any) as any}</p>
                                                <p className="text-[8px] text-muted-foreground">{t(h.d as any) as any}</p>
                                            </div>
                                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Button
                                onClick={() => { setShowResult(false); setSelectedTopic(null); }}
                                variant="ghost"
                                className="w-full text-xs text-muted-foreground"
                            >
                                {t("studyGuide:ui.createNew" as any) as any}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}
