import React, { useState } from "react";
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Download,
    Clock,
    List,
    MessageSquare,
    Headphones,
    Info,
    ChevronRight,
    Search,
    BookOpen
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_PODCASTS = [
    {
        id: "audio-001",
        title: "audio:mockup.lessons.python.title",
        subject: "Computer Science",
        duration: "15:20",
        date: "2026-02-05",
        narrator: "Dr. Minh",
        tags: ["Python", "Nơ-ron", "Cơ bản"],
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80",
        description: "audio:mockup.lessons.python.description",
        chapters: [
            { time: "0:00", title: "audio:mockup.lessons.python.chapters.intro" },
            { time: "2:15", title: "audio:mockup.lessons.python.chapters.what" },
            { time: "5:30", title: "audio:mockup.lessons.python.chapters.numbers" },
            { time: "9:45", title: "audio:mockup.lessons.python.chapters.strings" },
            { time: "13:10", title: "audio:mockup.lessons.python.chapters.summary" }
        ]
    },
    {
        id: "audio-002",
        title: "audio:mockup.lessons.industrial.title",
        subject: "History",
        duration: "22:45",
        date: "2026-02-03",
        narrator: "Ms. Lan",
        tags: ["Lịch sử", "Công nghiệp", "Xã hội"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
        description: "audio:mockup.lessons.industrial.description",
        chapters: [
            { time: "0:00", title: "audio:mockup.lessons.industrial.chapters.context" },
            { time: "4:20", title: "audio:mockup.lessons.industrial.chapters.steam" },
            { time: "10:15", title: "audio:mockup.lessons.industrial.chapters.production" },
            { time: "16:40", title: "audio:mockup.lessons.industrial.chapters.consequences" }
        ]
    },
    {
        id: "audio-003",
        title: "audio:mockup.lessons.goldenRatio.title",
        subject: "Math",
        duration: "18:10",
        date: "2026-01-28",
        narrator: "Thầy Hưng",
        tags: ["Toán học", "Thiên nhiên", "Hình học"],
        image: "https://images.unsplash.com/photo-1509228468518-180dd48219d1?w=400&q=80",
        description: "audio:mockup.lessons.goldenRatio.description",
        chapters: [
            { time: "0:00", title: "audio:mockup.lessons.goldenRatio.chapters.fibonacci" },
            { time: "5:00", title: "audio:mockup.lessons.goldenRatio.chapters.definition" },
            { time: "12:30", title: "audio:mockup.lessons.goldenRatio.chapters.arts" }
        ]
    }
];

export default function AudioLessons() {
    const { t } = useTranslation(["audio", "common"]);
    const [activePodcast, setActivePodcast] = useState(MOCK_PODCASTS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(320); // seconds
    const [volume, setVolume] = useState(80);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const totalSeconds = (timeStr: string) => {
        const [m, s] = timeStr.split(':').map(Number);
        return m * 60 + s;
    };

    const currentPodcastDuration = totalSeconds(activePodcast.duration);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {t("audio:title" as any)}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("audio:subtitle" as any)}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("audio:actions.downloadAll" as any)}
                        </Button>
                        <Button size="sm">
                            <List className="mr-2 h-4 w-4" />
                            {t("audio:actions.myPlaylist" as any)}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Player Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl">
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center space-y-6">
                                    {/* Album Art mockup */}
                                    <div className="relative group">
                                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 group-hover:ring-primary/50 transition-all duration-500">
                                            <img
                                                src={activePodcast.image}
                                                alt={t(activePodcast.title as any)}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md">
                                                    <Info className="h-8 w-8 text-white" />
                                                </Button>
                                            </div>
                                        </div>
                                        {/* Animated visualizer effect */}
                                        {isPlaying && (
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                                    <div
                                                        key={i}
                                                        className="w-1 bg-primary rounded-full animate-bounce"
                                                        style={{
                                                            height: `${20 + Math.random() * 60}%`,
                                                            animationDuration: `${0.5 + Math.random()}s`
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Badge variant="outline" className="border-white/20 text-blue-300">
                                            {activePodcast.subject}
                                        </Badge>
                                        <h2 className="text-2xl md:text-3xl font-bold">{t(activePodcast.title as any)}</h2>
                                        <p className="text-slate-400">{t("audio:player.narrator" as any, { name: activePodcast.narrator })}</p>
                                    </div>

                                    {/* Player Controls */}
                                    <div className="w-full max-w-xl space-y-4">
                                        <div className="space-y-1">
                                            <Slider
                                                value={[currentTime]}
                                                max={currentPodcastDuration}
                                                step={1}
                                                className="cursor-pointer"
                                                onValueChange={(v) => setCurrentTime(v[0])}
                                            />
                                            <div className="flex justify-between text-xs text-slate-400">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{activePodcast.duration}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center gap-6">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                <SkipBack className="h-6 w-6" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                                                onClick={() => setIsPlaying(!isPlaying)}
                                            >
                                                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                <SkipForward className="h-6 w-6" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-white hover:bg-white/10"
                                                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                                            >
                                                {t("audio:actions.speed" as any, { speed: playbackSpeed })}
                                            </Button>
                                            <div className="flex-1 flex items-center gap-2">
                                                < Headphones className="h-4 w-4 text-slate-400" />
                                                <Slider
                                                    value={[volume]}
                                                    max={100}
                                                    className="w-24"
                                                    onValueChange={(v) => setVolume(v[0])}
                                                />
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                {t("audio:actions.transcript" as any)}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1">
                                <TabsTrigger value="overview">{t("audio:player.tabs.overview" as any)}</TabsTrigger>
                                <TabsTrigger value="chapters">{t("audio:player.tabs.chapters" as any)}</TabsTrigger>
                                <TabsTrigger value="resources">{t("audio:player.tabs.resources" as any)}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{t("audio:player.about" as any)}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {t(activePodcast.description as any)}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {activePodcast.tags.map(tag => (
                                                <Badge key={tag} variant="secondary">#{tag}</Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-6 pt-4 border-t text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{t("common:roadmap.nodes.quarter" as any, { count: 1 })}: 2026-Q1</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{activePodcast.subject.slice(0, 3).toUpperCase()}101</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="chapters">
                                <Card>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-100">
                                            {activePodcast.chapters.map((chapter, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                                                    onClick={() => setCurrentTime(totalSeconds(chapter.time))}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm font-medium text-slate-400 w-8">{chapter.time}</span>
                                                        <span className="font-medium group-hover:text-primary transition-colors">{t(chapter.title as any)}</span>
                                                    </div>
                                                    <Play className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="resources">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                        <BookOpen className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Summary Notes.pdf</p>
                                                        <p className="text-xs text-muted-foreground">1.2 MB</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                                            </div>
                                            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                                        <List className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Vocabulary List.xlsx</p>
                                                        <p className="text-xs text-muted-foreground">450 KB</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar: More Podcast */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">{t("audio:sidebar.related" as any)}</CardTitle>
                                <CardDescription>{t("audio:sidebar.relatedDesc" as any)}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {MOCK_PODCASTS.filter(p => p.id !== activePodcast.id).map(podcast => (
                                        <div
                                            key={podcast.id}
                                            className="p-4 flex gap-4 hover:bg-slate-50 cursor-pointer transition-all group"
                                            onClick={() => setActivePodcast(podcast)}
                                        >
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm relative">
                                                <img src={podcast.image} alt={t(podcast.title as any)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play className="h-6 w-6 text-white fill-current" />
                                                </div>
                                            </div>
                                            <div className="space-y-1 min-w-0">
                                                <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                    {t(podcast.title as any)}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">{podcast.narrator}</p>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{podcast.duration}</span>
                                                    <span>•</span>
                                                    <span>{podcast.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
                                    {t("audio:actions.viewAll" as any)}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    < Headphones className="h-4 w-4 text-primary" />
                                    {t("audio:sidebar.recommendation" as any)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-4">
                                <p className="text-muted-foreground italic" dangerouslySetInnerHTML={{ __html: t("audio:sidebar.recommendationText" as any) }} />
                                <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                                    {t("audio:actions.listenNow" as any)}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
