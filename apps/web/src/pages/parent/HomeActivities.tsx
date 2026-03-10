import React, { useState } from "react";
import {
    Home,
    BookOpen,
    Clock,
    Users,
    Lightbulb,
    CheckCircle2,
    ChevronRight,
    Search,
    Filter,
    PlayCircle,
    FileText,
    Star,
    Plus,
    MessageCircle,
    Download,
    Share2
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_ACTIVITIES = [
    {
        id: "act-1",
        title: "parent:homeActivities.mocks.act1.title",
        subject: "dashboard:subjects.math",
        topic: "parent:homeActivities.mocks.act1.topic",
        estimatedTime: 30,
        involvement: "parent:homeActivities.labels.medium",
        age: "parent:homeActivities.mocks.act1.age",
        image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=400&q=80",
        description: "parent:homeActivities.mocks.act1.description",
        materials: ["parent:homeActivities.mocks.act1.materials.paper", "parent:homeActivities.mocks.act1.materials.pencil", "parent:homeActivities.mocks.act1.materials.houseItems"],
        steps: [
            "parent:homeActivities.mocks.act1.steps.step1",
            "parent:homeActivities.mocks.act1.steps.step2",
            "parent:homeActivities.mocks.act1.steps.step3"
        ],
        parentTips: "parent:homeActivities.mocks.act1.parentTips",
        rating: 4.8,
        reviews: 24,
        category: "parent:homeActivities.categories.practice"
    },
    {
        id: "act-2",
        title: "parent:homeActivities.mocks.act2.title",
        subject: "dashboard:subjects.science",
        topic: "parent:homeActivities.mocks.act2.topic",
        estimatedTime: 15, // daily
        involvement: "parent:homeActivities.labels.low",
        age: "parent:homeActivities.mocks.act2.age",
        image: "https://images.unsplash.com/photo-1591857177580-dc32d7abc496?w=400&q=80",
        description: "parent:homeActivities.mocks.act2.description",
        materials: ["parent:homeActivities.mocks.act2.materials.beans", "parent:homeActivities.mocks.act2.materials.cotton", "parent:homeActivities.mocks.act2.materials.container"],
        steps: [
            "parent:homeActivities.mocks.act2.steps.step1",
            "parent:homeActivities.mocks.act2.steps.step2",
            "parent:homeActivities.mocks.act2.steps.step3"
        ],
        parentTips: "parent:homeActivities.mocks.act2.parentTips",
        rating: 4.9,
        reviews: 56,
        category: "parent:homeActivities.categories.discovery"
    },
    {
        id: "act-3",
        title: "parent:homeActivities.mocks.act3.title",
        subject: "dashboard:subjects.it",
        topic: "parent:homeActivities.mocks.act3.topic",
        estimatedTime: 45,
        involvement: "parent:homeActivities.labels.high",
        age: "parent:homeActivities.mocks.act3.age",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
        description: "parent:homeActivities.mocks.act3.description",
        materials: ["parent:homeActivities.mocks.act3.materials.paints", "parent:homeActivities.mocks.act3.materials.paper"],
        steps: [
            "parent:homeActivities.mocks.act3.steps.step1",
            "parent:homeActivities.mocks.act3.steps.step2",
            "parent:homeActivities.mocks.act3.steps.step3"
        ],
        parentTips: "parent:homeActivities.mocks.act3.parentTips",
        rating: 4.7,
        reviews: 18,
        category: "parent:homeActivities.categories.art"
    }
];

export default function HomeActivities() {
    const { t } = useTranslation();
    const [selectedActivity, setSelectedActivity] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("all");

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
                            {t("parent:homeActivities.title" as any) as any}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("parent:homeActivities.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("parent:homeActivities.actions.suggestNew" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary text-white">
                            <Star className="mr-2 h-4 w-4" />
                            {t("parent:homeActivities.actions.myCollection" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Area: Library */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder={t("parent:homeActivities.searchPlaceholder" as any) as any} className="pl-10" />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                                <Badge variant={activeTab === 'all' ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => setActiveTab('all')}>{t("parent:homeActivities.tabs.all" as any) as any}</Badge>
                                <Badge variant={activeTab === 'math' ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => setActiveTab('math')}>{t("parent:homeActivities.tabs.math" as any) as any}</Badge>
                                <Badge variant={activeTab === 'science' ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => setActiveTab('science')}>{t("parent:homeActivities.tabs.science" as any) as any}</Badge>
                                <Badge variant={activeTab === 'art' ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => setActiveTab('art')}>{t("parent:homeActivities.tabs.art" as any) as any}</Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {MOCK_ACTIVITIES.map(activity => (
                                <Card
                                    key={activity.id}
                                    className="group overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-none ring-1 ring-slate-200 cursor-pointer"
                                    onClick={() => setSelectedActivity(activity)}
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 left-2 flex gap-1">
                                            <Badge className="bg-white/80 backdrop-blur-md text-primary hover:bg-white text-[10px] px-2">
                                                {t(activity.category as any)}
                                            </Badge>
                                        </div>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" size="sm" className="shadow-lg">{t("parent:homeActivities.details.viewDetails" as any) as any}</Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-5 flex-1 space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            <span>{t(activity.subject as any) as any}</span>
                                            <span>•</span>
                                            <span>{t(activity.age as any)}</span>
                                        </div>
                                        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">{t(activity.title as any)}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {t(activity.description as any)}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="px-5 py-4 border-t bg-slate-50/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{t("parent:homeActivities.labels.estimatedTime", { count: activity.estimatedTime })}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span>{t(activity.involvement as any)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                                            <Star className="h-3 w-3 fill-amber-500" />
                                            <span>{t("parent:homeActivities.labels.rating", { count: activity.rating })}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Selected Activity or Featured */}
                    <div className="space-y-6">
                        {selectedActivity ? (
                            <Card className="sticky top-6 border-primary/30 shadow-xl animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="p-0">
                                    <div className="relative aspect-video">
                                        <img src={selectedActivity.image} className="w-full h-full object-cover" alt="" />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md rounded-full"
                                            onClick={() => setSelectedActivity(null)}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-bold">{t(selectedActivity.title as any)}</h2>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{t(selectedActivity.description as any)}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            {t("parent:homeActivities.details.materials" as any) as any}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedActivity.materials.map((m: any, i: number) => (
                                                <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{t(m as any)}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2 text-primary">
                                            <PlayCircle className="h-4 w-4" />
                                            {t("parent:homeActivities.details.steps" as any) as any}
                                        </h4>
                                        <div className="space-y-4">
                                            {selectedActivity.steps.map((step: any, i: number) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                                        {i + 1}
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{t(step as any)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Card className="bg-amber-50 border-amber-200 border-dashed">
                                        <CardContent className="p-4 flex gap-3">
                                            <Lightbulb className="h-5 w-5 text-amber-500 shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">{t("parent:homeActivities.details.parentTips" as any) as any}</p>
                                                <p className="text-xs text-amber-700 italic">"{t(selectedActivity.parentTips as any)}"</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                                    <Button className="w-full bg-primary hover:bg-primary text-white shadow-lg shadow-primary/30">
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        {t("parent:homeActivities.details.markComplete" as any) as any}
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Download className="mr-2 h-3 w-3" />
                                            {t("parent:homeActivities.details.downloadPdf" as any) as any}
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Share2 className="mr-2 h-3 w-3" />
                                            {t("parent:homeActivities.details.share" as any) as any}
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ) : (
                            <div className="space-y-6 sticky top-6">
                                <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white overflow-hidden border-none shadow-xl">
                                    <div className="p-6 space-y-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                            <Star className="h-6 w-6 fill-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-lg">{t("parent:homeActivities.sidebar.topThisWeek" as any) as any}</h3>
                                            <p className="text-xs opacity-80">{t("parent:homeActivities.sidebar.topThisWeekDesc" as any) as any}</p>
                                        </div>
                                        <Button variant="secondary" className="w-full shadow-lg">{t("parent:homeActivities.sidebar.viewList" as any) as any}</Button>
                                    </div>
                                    <div className="bg-white/10 h-1" />
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                                            <MessageCircle className="h-4 w-4 text-primary" />
                                            {t("parent:homeActivities.sidebar.forum" as any) as any}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 space-y-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="flex gap-3 text-xs pb-3 border-b last:border-0 last:pb-0">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">P</div>
                                                <div className="space-y-1">
                                                    <p className="font-bold">{t(`parent:homeActivities.forum.topic${i}.title` as any)}</p>
                                                    <p className="text-muted-foreground line-clamp-2 italic">"{t(`parent:homeActivities.forum.topic${i}.desc` as any)}"</p>
                                                </div>
                                            </div>
                                        ))}
                                        <Button variant="ghost" size="sm" className="w-full text-xs text-primary">{t("parent:homeActivities.sidebar.goToForum" as any) as any} <ChevronRight className="h-3 w-3" /></Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
