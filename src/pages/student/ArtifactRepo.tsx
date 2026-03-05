import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Plus, Search, Filter, Share2, Download, Video,
    FileText, Image as ImageIcon, Link as LinkIcon,
    MessageSquare, MoreVertical, LayoutGrid, List,
    History, Star, Bookmark, ShieldCheck, ExternalLink,
    ChevronRight, Camera, Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { mockArtifacts, mockCredentials } from "@/mocks/data";


export default function ArtifactRepo() {
    const { t } = useTranslation(["artifacts", "common"]);
    const [view, setView] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <AppLayout>
            <div className="p-6 space-y-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                            {t("artifacts:title")} <Bookmark className="w-8 h-8 text-blue-400" />
                        </h1>
                        <p className="text-slate-400 max-w-lg font-medium">
                            {t("artifacts:subtitle")}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                        <Button size="icon" variant="ghost" className={view === "grid" ? "bg-white/10 text-white" : "text-slate-400"} onClick={() => setView("grid")}>
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className={view === "list" ? "bg-white/10 text-white" : "text-slate-400"} onClick={() => setView("list")}>
                            <List className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl gap-2 font-semibold shadow-lg shadow-blue-500/20">
                            <Plus className="w-4 h-4" /> {t("artifacts:actions.add")}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters & Credentials */}
                    <div className="space-y-8">
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-blue-400" /> {t("artifacts:filters.title")}
                                </h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder={t("artifacts:filters.searchPlaceholder")}
                                        className="bg-white/5 border-white/10 rounded-xl pl-10 text-white placeholder:text-slate-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("artifacts:filters.categories")}</p>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-300 hover:bg-white/5 rounded-lg">Science (12)</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-300 hover:bg-white/5 rounded-lg">Computer Science (8)</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-300 hover:bg-white/5 rounded-lg">History (5)</Button>
                                    <Button variant="ghost" className="w-full justify-start text-sm text-slate-300 hover:bg-white/5 rounded-lg">Art (3)</Button>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("artifacts:filters.fileTypes")}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">{t("artifacts:types.video")}</Badge>
                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">{t("artifacts:types.photo")}</Badge>
                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">{t("artifacts:types.document")}</Badge>
                                        <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">{t("artifacts:types.link")}</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-4">
                            <h3 className="text-white font-bold flex items-center justify-between">
                                <span>{t("artifacts:credentials.title")}</span>
                                <ShieldCheck className="w-4 h-4 text-primary" />
                            </h3>
                            <div className="space-y-4">
                                {mockCredentials.map((cred) => (
                                    <div key={cred.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group">
                                        <div className={`p-2 rounded-lg bg-white/5 ${cred.color}`}>
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{t(cred.name as any)}</p>
                                            <p className="text-xs text-slate-500">{cred.level} • {cred.issued}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5">
                                    {t("artifacts:credentials.viewAll")}
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Main Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Quick Action Upload Card */}
                            <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-blue-500/30 border-dashed border-2 flex flex-col items-center justify-center p-6 space-y-4 text-center group cursor-pointer hover:from-blue-600/30 hover:to-indigo-600/30 transition-all">
                                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Camera className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t("artifacts:quickUpload.title")}</h4>
                                    <p className="text-xs text-slate-400 mt-1">{t("artifacts:quickUpload.subtitle")}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-white/10 bg-white/5 text-white hover:bg-white/10">
                                        <Camera className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-white/10 bg-white/5 text-white hover:bg-white/10">
                                        <Mic className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-white/10 bg-white/5 text-white hover:bg-white/10">
                                        <Video className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>

                            {mockArtifacts.map((art) => (
                                <motion.div
                                    key={art.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group"
                                >
                                    <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/[0.08] transition-all cursor-pointer">
                                        <div className="aspect-[4/3] relative overflow-hidden">
                                            <img
                                                src={art.thumbnail}
                                                alt={t(art.title as any)}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <Badge className="bg-black/60 backdrop-blur-md border-white/20 text-white font-medium">
                                                    {art.type === 'video' ? <Video className="w-3 h-3 mr-1" /> : art.type === 'photo' ? <ImageIcon className="w-3 h-3 mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
                                                    {t(art.category as any)}
                                                </Badge>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <div className="flex justify-between w-full items-center">
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20">
                                                            <Share2 className="w-3.5 h-3.5" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20">
                                                            <Download className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                    <Badge className="bg-blue-600 text-white border-0">{t("artifacts:actions.viewDetails")}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors line-clamp-1">{t(art.title as any)}</h4>
                                                <button className="text-slate-500 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">{art.date}</p>
                                            <p className="text-xs text-slate-300 line-clamp-2 italic border-l-2 border-white/10 pl-2">
                                                "{t(art.reflection as any)}"
                                            </p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {art.badges.map((b, i) => (
                                                    <Badge key={i} variant="outline" className="text-[10px] bg-white/5 border-white/10 text-blue-400 px-1.5 py-0">
                                                        {b}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                <span className="text-[10px] flex items-center gap-1 text-slate-500">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {t("artifacts:stats.stars", { count: art.stars })}
                                                </span>
                                                <span className="text-[10px] flex items-center gap-1 text-slate-500">
                                                    <MessageSquare className="w-3 h-3" /> {t("artifacts:stats.feedback", { count: 4 })}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Timeline View Suggestion */}
                        <div className="flex items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                            <div className="text-center space-y-3">
                                <History className="w-8 h-8 text-slate-500 mx-auto" />
                                <h4 className="text-white font-bold">{t("artifacts:timeline.end")}</h4>
                                <p className="text-sm text-slate-400">{t("artifacts:timeline.subtitle")}</p>
                                <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl gap-2 backdrop-blur-md">
                                    {t("artifacts:timeline.browse")} <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
