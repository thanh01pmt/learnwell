import React, { useState } from "react";
import {
    Maximize2,
    Minimize2,
    ZoomIn,
    ZoomOut,
    Download,
    Share2,
    Plus,
    Search,
    Filter,
    Layers,
    Info,
    ChevronRight,
    Eye,
    FileDown,
    Layout
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const MOCK_MINDMAPS = [
    {
        id: "mm-1",
        title: "mindmaps:mockup.maps.python.title",
        subject: "Computer Science",
        difficulty: "Advanced",
        lastModified: "2026-02-01",
        nodes: 42,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        tags: ["Programming", "Design Patterns"],
        summary: "mindmaps:mockup.maps.python.summary"
    },
    {
        id: "mm-2",
        title: "mindmaps:mockup.maps.history.title",
        subject: "History",
        difficulty: "Medium",
        lastModified: "2026-01-25",
        nodes: 28,
        image: "https://images.unsplash.com/photo-1454165833742-2f05234560d3?w=800&q=80",
        tags: ["Lịch sử", "Việt Nam"],
        summary: "mindmaps:mockup.maps.history.summary"
    },
    {
        id: "mm-3",
        title: "mindmaps:mockup.maps.business.title",
        subject: "Business",
        difficulty: "High",
        lastModified: "2026-02-04",
        nodes: 35,
        image: "https://images.unsplash.com/photo-1543286386-713bcd534a70?w=800&q=80",
        tags: ["Strategy", "SWOT", "Scale"],
        summary: "mindmaps:mockup.maps.business.summary"
    }
];

export default function MindMaps() {
    const { t } = useTranslation(["mindmaps", "common"]);
    const [activeMap, setActiveMap] = useState(MOCK_MINDMAPS[0]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [zoom, setZoom] = useState(100);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            {t("mindmaps:title" as any)}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("mindmaps:subtitle" as any)}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("mindmaps:actions.exportPdf" as any)}
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("mindmaps:actions.createNew" as any)}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Map Viewer */}
                    <div className="lg:col-span-3 space-y-4">
                        <Card className={cn(
                            "overflow-hidden border-2 border-slate-200 transition-all shadow-xl bg-slate-50",
                            isFullScreen ? "fixed inset-0 z-50 rounded-none bg-white p-4" : "relative"
                        )}>
                            <div className="flex items-center justify-between p-4 bg-white border-b">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Layout className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{t(activeMap.title as any)}</h3>
                                        <p className="text-xs text-muted-foreground">{t("mindmaps:viewer.info" as any, { subject: activeMap.subject, count: activeMap.nodes })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-white" onClick={() => setZoom(Math.max(50, zoom - 10))}><ZoomOut className="h-4 w-4" /></Button>
                                    <span className="text-xs font-bold w-12 text-center text-slate-600">{zoom}%</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-white" onClick={() => setZoom(Math.min(200, zoom + 10))}><ZoomIn className="h-4 w-4" /></Button>
                                    <div className="w-px h-6 bg-slate-200 mx-1" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-white" onClick={() => setIsFullScreen(!isFullScreen)}>
                                        {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Mock Map Canvas */}
                            <div className="relative aspect-video bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center overflow-hidden">
                                <div
                                    className="transition-transform duration-300 transform-gpu relative p-20"
                                    style={{ transform: `scale(${zoom / 100})` }}
                                >
                                    {/* Central Node */}
                                    <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-xl border-4 border-white font-bold text-xl min-w-[200px] text-center relative z-10 animate-in fade-in zoom-in duration-500">
                                        {t(activeMap.title as any)}
                                    </div>

                                    {/* Lines & Branch Nodes */}
                                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="absolute inset-0 w-full h-full rotate-45">
                                            <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                                            <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                                            <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                                            <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4" />
                                        </svg>

                                        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 p-3 bg-white rounded-xl shadow-md border border-purple-200 text-sm font-semibold hover:border-purple-500 cursor-pointer pointer-events-auto transition-all hover:scale-105">
                                            {t("mindmaps:mockup.concepts.a" as any)}
                                        </div>
                                        <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 p-3 bg-white rounded-xl shadow-md border border-purple-200 text-sm font-semibold hover:border-purple-500 cursor-pointer pointer-events-auto transition-all hover:scale-105">
                                            {t("mindmaps:mockup.concepts.b" as any)}
                                        </div>
                                        <div className="absolute left-[10%] top-[50%] -translate-y-1/2 p-3 bg-white rounded-xl shadow-md border border-purple-200 text-sm font-semibold hover:border-purple-500 cursor-pointer pointer-events-auto transition-all hover:scale-105">
                                            {t("mindmaps:mockup.concepts.c" as any)}
                                        </div>
                                        <div className="absolute right-[10%] top-[50%] -translate-y-1/2 p-3 bg-white rounded-xl shadow-md border border-purple-200 text-sm font-semibold hover:border-purple-500 cursor-pointer pointer-events-auto transition-all hover:scale-105">
                                            {t("mindmaps:mockup.concepts.d" as any)}
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 left-4 p-3 bg-white/80 backdrop-blur-md rounded-lg border shadow-sm text-xs space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full" />
                                        <span>{t("mindmaps:viewer.legend.root" as any)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-purple-100 border border-purple-600 rounded-full" />
                                        <span>{t("mindmaps:viewer.legend.detail" as any)}</span>
                                    </div>
                                    <p className="text-muted-foreground">{t("mindmaps:viewer.legend.hint" as any)}</p>
                                </div>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <Info className="h-4 w-4 text-purple-600" />
                                        {t("mindmaps:viewer.summary" as any)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {t(activeMap.summary as any)}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <Share2 className="h-4 w-4 text-primary" />
                                        {t("mindmaps:viewer.collaboration" as any)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Plus className="mr-2 h-4 w-4" />
                                        {t("mindmaps:actions.invite" as any)}
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <FileDown className="mr-2 h-4 w-4" />
                                        {t("mindmaps:actions.exportJson" as any)}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar: Library */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-3 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-bold">{t("mindmaps:sidebar.library" as any)}</CardTitle>
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {MOCK_MINDMAPS.map(map => (
                                        <div
                                            key={map.id}
                                            className={cn(
                                                "p-4 flex gap-3 hover:bg-slate-50 cursor-pointer transition-all group",
                                                activeMap.id === map.id && "bg-purple-50 ring-1 ring-inset ring-purple-200"
                                            )}
                                            onClick={() => setActiveMap(map)}
                                        >
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                                <img src={map.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="min-w-0 flex-1 space-y-1">
                                                <h4 className="font-semibold text-sm truncate group-hover:text-purple-600 transition-colors">
                                                    {t(map.title as any)}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                    <Badge variant="outline" className="text-[9px] py-0 px-1 border-purple-200 bg-purple-50 text-purple-700">
                                                        {map.difficulty}
                                                    </Badge>
                                                    <span>•</span>
                                                    <span>{map.lastModified}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
