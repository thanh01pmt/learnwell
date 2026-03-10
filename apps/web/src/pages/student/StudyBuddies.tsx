import React, { useState } from "react";
import {
    Users,
    Search,
    Filter,
    Star,
    MessageCircle,
    Calendar,
    UserPlus,
    CheckCircle2,
    Clock,
    Sparkles,
    Trophy,
    Target,
    TrendingUp,
    MapPin,
    Plus,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_BUDDIES = [
    {
        id: "buddy-1",
        nameKey: "social:mockup.buddies.tam.name",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tam",
        major: "Computer Science",
        compatibility: 95,
        interests: ["React", "AI", "Algorithms"],
        bioKey: "social:mockup.buddies.tam.bio",
        rank: "Gold II",
        completedSessions: 12
    },
    {
        id: "buddy-2",
        nameKey: "social:mockup.buddies.ngoc.name",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ngoc",
        major: "Data Science",
        compatibility: 88,
        interests: ["Python", "ML", "Statistics"],
        bioKey: "social:mockup.buddies.ngoc.bio",
        rank: "Silver I",
        completedSessions: 8
    },
    {
        id: "buddy-3",
        nameKey: "social:mockup.buddies.huy.name",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=huy",
        major: "Graphic Design",
        compatibility: 72,
        interests: ["UI/UX", "Figma", "Branding"],
        bioKey: "social:mockup.buddies.huy.bio",
        rank: "Bronze III",
        completedSessions: 5
    }
];

const COMPLETED_SESSIONS = [
    { title: "social:mockup.sessions.algo", date: "social:mockup.sessions.yesterday", participants: 4 },
    { title: "social:mockup.sessions.ui", date: "social:mockup.sessions.daysAgo", participants: 2, dateValue: 2 },
    { title: "social:mockup.sessions.english", date: "social:mockup.sessions.daysAgo", participants: 6, dateValue: 5 },
];

export default function StudyBuddies() {
    const { t } = useTranslation(["social", "common"]);
    const [activeTab, setActiveTab] = useState("discover");

    return (
        <AppLayout>
            <div className="space-y-8 animate-fade-in pb-12">
                {/* Header with gradient background and stats */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-xl">
                    <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
                            >
                                <Users className="h-4 w-4" />
                                {t("social:title" as any)}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-4 text-4xl font-bold tracking-tight"
                            >
                                {t("social:title" as any)}
                            </motion.h1>
                            <p className="mb-8 text-lg text-indigo-100 opacity-90">
                                {t("social:subtitle" as any)}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6 h-12 rounded-xl border-0">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    {t("social:actions.schedule" as any)}
                                </Button>
                                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-6 h-12 rounded-xl">
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    {t("social:actions.aiMatching" as any)}
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/20 text-yellow-300">
                                        <Trophy className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-indigo-100 uppercase tracking-wider">{t("social:mockup.stats.ranks" as any)}</p>
                                        <p className="text-xl font-bold">Gold II</p>
                                    </div>
                                    <Progress value={75} className="h-1 bg-white/10" />
                                    <p className="text-[10px] text-indigo-200">{t("social:mockup.stats.progressToNext" as any, { rank: "Platinum" } as any) as any}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/10 border-white/20 backdrop-blur-md text-white">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-400/20 text-indigo-200">
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-indigo-100 uppercase tracking-wider">{t("social:mockup.stats.topPercent" as any, { percent: 5 } as any) as any}</p>
                                        <p className="text-xl font-bold">Top 5%</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? "bg-emerald-400" : "bg-white/10"}`} />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-indigo-200">{t("common:you" as any)}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t("social:searchPlaceholder" as any)}
                                    className="pl-11 h-12 rounded-xl bg-gray-50/50 border-gray-100 focus-visible:ring-indigo-500"
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button variant="outline" className="h-11 rounded-xl border-gray-100 hover:bg-gray-50 flex-1 md:flex-none">
                                    <Filter className="h-4 w-4 mr-2 text-indigo-600" />
                                    {t("social:actions.filter" as any)}
                                </Button>
                                <Button variant="outline" className="h-11 rounded-xl border-gray-100 hover:bg-gray-50 flex-1 md:flex-none">
                                    <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                                    {t("social:actions.nearMe" as any)}
                                </Button>
                            </div>
                        </div>

                        {/* Tabs content */}
                        <Tabs defaultValue="discover" className="w-full">
                            <TabsList className="mb-6 h-12 p-1 bg-gray-100/50 rounded-xl">
                                <TabsTrigger
                                    value="discover"
                                    onClick={() => setActiveTab("discover")}
                                    className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
                                >
                                    {t("social:tabs.discover" as any)}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="friends"
                                    onClick={() => setActiveTab("friends")}
                                    className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
                                >
                                    {t("social:tabs.friends" as any, { count: 42 } as any) as any}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="requests"
                                    onClick={() => setActiveTab("requests")}
                                    className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600"
                                >
                                    {t("social:tabs.requests" as any)}
                                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 rounded-full border-0">2</Badge>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="discover" className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {MOCK_BUDDIES.map((buddy) => (
                                        <Card key={buddy.id} className="group overflow-hidden border-gray-100 hover:border-indigo-200 transition-all hover:shadow-xl rounded-3xl h-full flex flex-col">
                                            <CardContent className="p-6 flex-1">
                                                <div className="flex gap-4 items-start mb-4">
                                                    <div className="relative">
                                                        <Avatar className="h-16 w-16 border-2 border-indigo-50 ring-4 ring-indigo-50/10">
                                                            <AvatarImage src={buddy.avatar} />
                                                            <AvatarFallback>{(t(buddy.nameKey as any) as string)[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/20" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-bold text-lg text-indigo-950 group-hover:text-indigo-600 transition-colors">{t(buddy.nameKey as any)}</h3>
                                                            <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                                                                <Star className="h-3 w-3 fill-orange-500" />
                                                                4.9
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground font-medium mb-2">{buddy.major}</p>
                                                        <div className="w-full space-y-1">
                                                            <div className="flex justify-between text-[10px] font-bold">
                                                                <span className="text-muted-foreground uppercase">{t("social:compatibility" as any)}</span>
                                                                <span className="text-indigo-600">{buddy.compatibility}%</span>
                                                            </div>
                                                            <Progress value={buddy.compatibility} className="h-1.5 bg-indigo-50" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {buddy.interests.map((interest) => (
                                                        <Badge key={interest} variant="secondary" className="bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 text-[10px] py-0 border-0 transition-colors">
                                                            {interest}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed italic">
                                                    "{t(buddy.bioKey as any)}"
                                                </p>
                                            </CardContent>
                                            <CardFooter className="px-6 py-4 border-t bg-gray-50/30 flex gap-2">
                                                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold h-10 rounded-xl shadow-indigo-200 shadow-lg">
                                                    <MessageCircle className="mr-2 h-4 w-4" />
                                                    {t("social:actions.connect" as any)}
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-10 w-10 border-gray-100 rounded-xl hover:text-indigo-600 hover:bg-indigo-50">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}

                                    <div className="group border-2 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-indigo-300 hover:bg-indigo-50/10 transition-all cursor-pointer bg-white">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                            <UserPlus className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{t("social:actions.addManual" as any)}</p>
                                            <p className="text-xs text-slate-500 mt-1">{t("social:mockup.addManualDesc" as any)}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="friends">
                                <div className="flex flex-col items-center justify-center p-20 text-center rounded-3xl bg-gray-50/50 border-2 border-dashed border-gray-200">
                                    <Users className="h-16 w-16 text-gray-200 mb-6" />
                                    <h3 className="text-lg font-bold text-gray-400 mb-2">{t("social:tabs.friends" as any, { count: 0 } as any) as any}</h3>
                                    <p className="text-sm text-gray-400 max-w-xs">{t("social:mockup.status.tabFriendsDev" as any)}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="requests">
                                <div className="p-20 text-center rounded-3xl bg-gray-50/50 border-2 border-dashed border-gray-200">
                                    <p className="text-gray-400 font-medium">No pending requests</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar components */}
                    <div className="space-y-6">
                        {/* Weekly Goal Card */}
                        <Card className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white rounded-3xl overflow-hidden border-0 shadow-2xl relative">
                            <CardHeader className="relative z-10 pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-emerald-400" />
                                    {t("social:mockup.goals.title" as any)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-medium">
                                        <span className="text-gray-300">{t("social:mockup.goals.studySessions" as any, { current: 3, total: 5 } as any) as any}</span>
                                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">60%</span>
                                    </div>
                                    <Progress value={60} className="h-2 bg-white/10" />
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300 ring-1 ring-white/10">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold leading-tight">{t("social:mockup.goals.helpFriend" as any)}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">Earn 500 XP bonus</p>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-indigo-600/20 blur-3xl rounded-full" />
                        </Card>

                        {/* Recent Activity */}
                        <Card className="rounded-3xl border-gray-100 shadow-sm overflow-hidden">
                            <CardHeader className="pb-4 border-b border-gray-50">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-950">
                                        <Clock className="h-4 w-4 text-indigo-600" />
                                        {t("social:mockup.history.title" as any)}
                                    </CardTitle>
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-50">
                                    {COMPLETED_SESSIONS.map((session, i) => (
                                        <div key={i} className="p-5 hover:bg-gray-50/50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-indigo-600">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-[13px] font-bold text-indigo-950 leading-tight group-hover:text-indigo-600 transition-colors">{t(session.title as any)}</p>
                                                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">{session.participants}P</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {t(session.date as any, { count: session.dateValue } as any) as any}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    120m
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 bg-gray-50/30">
                                <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-[11px] font-bold uppercase tracking-wider h-10 rounded-xl">
                                    {t("social:actions.viewAllHistory" as any)}
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
