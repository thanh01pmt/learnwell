import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    Settings,
    Maximize,
    CheckCircle2,
    FileQuestion,
    Headphones,
    Video,
    Beaker,
    Award,
    ChevronRight,
    BookOpen,
    MessageSquare,
    Clock
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function RichMaterials() {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(35);
    const [activeTab, setActiveTab] = useState("video");

    const timelineCheckpoints = [
        { time: 10, type: "quiz", label: t("student:materials.video.checkpoints.variables"), completed: true },
        { time: 45, type: "concept", label: t("student:materials.video.checkpoints.scope"), completed: false },
        { time: 80, type: "quiz", label: t("student:materials.video.checkpoints.loop"), completed: false },
    ];

    const handleCheckpointClick = (label: string) => {
        toast.info(t("student:materials.video.jumpTo", { label }));
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("student:materials.header.title")}</h1>
                        <p className="text-muted-foreground">
                            {t("student:materials.header.subtitle")}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="px-3 py-1">
                            <Clock className="mr-2 h-4 w-4" />
                            {t("student:materials.header.totalTime", { time: "2h 45p" })}
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="overflow-hidden border-none shadow-2xl bg-black">
                            {/* Mock Video Player */}
                            <div className="aspect-video relative group flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Poster Image / Backdrop */}
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                    <Video className="h-20 w-20 text-white/10" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="h-20 w-20 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-primary/40"
                                            onClick={() => setIsPlaying(!isPlaying)}
                                        >
                                            {isPlaying ? <Pause className="h-8 w-8 text-white fill-white" /> : <Play className="h-8 w-8 text-white fill-white translate-x-1" />}
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Overlays / Interactive Elements */}
                                <AnimatePresence>
                                    {progress > 10 && progress < 15 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl z-20 text-slate-900"
                                        >
                                            <Badge className="mb-2">{t("student:materials.video.quiz")}</Badge>
                                            <h4 className="font-bold mb-4">{t("student:materials.video.quizQuestion")}</h4>
                                            <div className="space-y-2">
                                                {["var 1name", "let name", "const name!", "all of above"].map((opt, i) => (
                                                    <Button key={i} variant="outline" className="w-full justify-start text-xs border-slate-200 hover:bg-primary/10 hover:border-primary/30" onClick={() => toast.success(t("student:materials.video.correct"))}>
                                                        {opt}
                                                    </Button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Video Controls */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent pointer-events-auto">
                                    <div className="relative h-1.5 w-full bg-white/20 rounded-full mb-4 cursor-pointer group/progress">
                                        <div className="absolute h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />

                                        {/* Checkpoints on Timeline */}
                                        {timelineCheckpoints.map((cp, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-slate-900 z-10 cursor-help",
                                                    cp.completed ? "bg-green-500" : "bg-white/40",
                                                    "hover:scale-150 transition-transform"
                                                )}
                                                style={{ left: `${cp.time}%` }}
                                                onClick={() => handleCheckpointClick(cp.label)}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-4">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white"><SkipBack className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/10 text-white" onClick={() => setIsPlaying(!isPlaying)}>
                                                {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white"><SkipForward className="h-4 w-4" /></Button>
                                            <div className="flex items-center gap-2 ml-4">
                                                <Volume2 className="h-4 w-4" />
                                                <Slider defaultValue={[70]} max={100} step={1} className="w-24 opacity-60 hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-xs font-mono ml-4">12:45 / 35:00</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" className="text-xs hover:bg-white/10 text-white">1.25x</Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white"><Settings className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white"><Maximize className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="flex flex-col md:flex-row gap-4">
                            <Card className="flex-1">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">{t("student:materials.ai.notes")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                                        {t("student:materials.ai.summary")}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="flex-1">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">{t("student:materials.ai.related")}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    <Badge variant="outline" className="cursor-pointer">Handouts.pdf</Badge>
                                    <Badge variant="outline" className="cursor-pointer">Code_Snip.js</Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Playlist / Sidebar */}
                    <div className="space-y-4">
                        <h3 className="font-bold flex items-center gap-2">
                            <Play className="h-4 w-4 text-primary" />
                            {t("student:materials.playlist.title")}
                        </h3>
                        <div className="space-y-2">
                            {[
                                { title: t("student:materials.playlist.items.intro"), dur: "05:00", type: "video", active: false },
                                { title: t("student:materials.playlist.items.setup"), dur: "12:30", type: "video", active: false },
                                { title: t("student:materials.playlist.items.variables"), dur: "35:00", type: "video", active: true },
                                { title: t("student:materials.playlist.items.logic"), dur: "15:00", type: "audio", active: false },
                                { title: t("student:materials.playlist.items.practice"), dur: "Practice", type: "lab", active: false },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all",
                                        item.active ? "bg-primary/5 border-primary/20 shadow-sm" : "bg-card hover:bg-slate-50 border-slate-100"
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                                        item.type === 'video' ? "bg-red-100 text-red-600" :
                                            item.type === 'audio' ? "bg-blue-100 text-blue-600" : "bg-primary/20 text-primary"
                                    )}>
                                        {item.type === 'video' ? <Video className="h-4 w-4" /> :
                                            item.type === 'audio' ? <Headphones className="h-4 w-4" /> : <Beaker className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={cn("text-xs font-bold truncate", item.active && "text-primary")}>{item.title}</p>
                                        <span className="text-[10px] text-muted-foreground">{item.dur}</span>
                                    </div>
                                    {item.active && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                </div>
                            ))}
                        </div>

                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Award className="h-4 w-4 text-warning" />
                                    {t("student:materials.playlist.progress")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <Progress value={60} className="h-1.5 mb-2" />
                                <p className="text-[10px] text-muted-foreground">{t("student:materials.playlist.badgeNote")}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
