import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    FileStack,
    Search,
    Filter,
    Plus,
    ChevronRight,
    Star,
    Clock,
    BookOpen,
    Tag,
    Copy,
    Share2,
    Edit3,
    Eye,
    Info,
    Layout,
    Layers,
    Sparkles,
    ArrowRight,
    Library,
    FileText,
    Calendar,
    BrainCircuit
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_TEMPLATES = [
    {
        id: "tp-1",
        title: "teacher:learningPath.mock.title.python",
        subject: "classroom:subjects.it",
        level: "common:levels.beginner",
        duration: 8,
        modules: 12,
        rating: 4.9,
        usage: 124,
        tags: ["teacher:learningPath.mock.tags.basic", "common:roles.subjects.python", "teacher:learningPath.mock.tags.thinking"],
        description: "teacher:learningPath.mock.desc.python",
        previewImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",
        isAIGenerated: false
    },
    {
        id: "tp-2",
        title: "teacher:learningPath.mock.title.math12",
        subject: "common:roles.subjects.math",
        level: "common:levels.advanced",
        duration: 12,
        modules: 24,
        rating: 4.8,
        usage: 850,
        tags: ["teacher:learningPath.mock.tags.exam", "teacher:learningPath.mock.tags.math12", "teacher:learningPath.mock.tags.intensive"],
        description: "teacher:learningPath.mock.desc.math12",
        previewImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
        isAIGenerated: true
    },
    {
        id: "tp-3",
        title: "teacher:learningPath.mock.title.english",
        subject: "common:roles.subjects.english",
        level: "common:levels.intermediate",
        duration: 6,
        modules: 10,
        rating: 4.7,
        usage: 312,
        tags: ["teacher:learningPath.mock.tags.ielts", "teacher:learningPath.mock.tags.academic", "teacher:learningPath.mock.tags.writing"],
        description: "teacher:learningPath.mock.desc.english",
        previewImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80",
        isAIGenerated: false
    }
];

export default function LearningPathTemplates() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("teacher:learningPath.title" as any) as any}</h1>
                        <p className="text-muted-foreground">
                            {t("teacher:learningPath.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Library className="mr-2 h-4 w-4" />
                            {t("teacher:learningPath.actions.organize" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("teacher:learningPath.actions.createNew" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Area: Template Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder={t("teacher:learningPath.search.placeholder" as any) as any}
                                    className="pl-9 bg-card border-slate-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                                <Badge
                                    variant={filter === "all" ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => setFilter("all")}
                                >
                                    {t("teacher:learningPath.filters.all" as any) as any}
                                </Badge>
                                <Badge
                                    variant={filter === "math" ? "secondary" : "outline"}
                                    className={cn("cursor-pointer", filter === "math" && "bg-blue-500 hover:bg-blue-600 text-white")}
                                    onClick={() => setFilter("math")}
                                >
                                    {t("teacher:learningPath.filters.math" as any) as any}
                                </Badge>
                                <Badge
                                    variant={filter === "cs" ? "secondary" : "outline"}
                                    className={cn("cursor-pointer", filter === "cs" && "bg-indigo-500 hover:bg-indigo-600 text-white")}
                                    onClick={() => setFilter("cs")}
                                >
                                    {t("teacher:learningPath.filters.cs" as any) as any}
                                </Badge>
                                <Badge
                                    variant={filter === "popular" ? "secondary" : "outline"}
                                    className={cn("cursor-pointer", filter === "popular" && "bg-amber-500 hover:bg-amber-600 text-white")}
                                    onClick={() => setFilter("popular")}
                                >
                                    {t("teacher:learningPath.filters.popular" as any) as any}
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {MOCK_TEMPLATES.map(template => (
                                <Card
                                    key={template.id}
                                    className="group flex flex-col hover:shadow-xl transition-all duration-300 border-none ring-1 ring-slate-200 cursor-pointer overflow-hidden"
                                    onClick={() => setSelectedTemplate(template)}
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={template.previewImage}
                                            alt={template.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-slate-800">
                                                {t(template.level as any)}
                                            </Badge>
                                        </div>
                                        {template.isAIGenerated && (
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">
                                                    <Sparkles className="h-3 w-3 mr-1" /> {t("teacher:learningPath.template.aiPattern" as any) as any}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-5 flex-1 space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            <span>{t(template.subject as any)}</span>
                                            <span>•</span>
                                            <span>{t("common:weeksCount", { count: template.duration })}</span>
                                        </div>
                                        <h3 className="font-bold text-lg leading-snug group-hover:text-teal-600 transition-colors">{t(template.title as any)}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {t(template.description as any)}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {template.tags.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="outline" className="text-[9px] py-0">{t(tag as any)}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="px-5 py-4 border-t bg-slate-50/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-3 w-3" />
                                                {t("teacher:learningPath.template.modulesCount" as any, { count: template.modules } as any) as any}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Copy className="h-3 w-3" />
                                                <span>{template.usage}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                                            <Star className="h-3 w-3 fill-amber-500" />
                                            <span>{template.rating}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}

                            <Card className="border-dashed border-2 flex items-center justify-center p-6 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="text-center space-y-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                        <Plus className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="text-sm font-semibold">{t("teacher:learningPath.template.addCustom" as any) as any}</h3>
                                    <p className="text-[10px] text-muted-foreground mt-1">{t("teacher:learningPath.template.importFile" as any) as any}</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar: Selected Template Details */}
                    <div className="space-y-6">
                        {selectedTemplate ? (
                            <Card className="sticky top-6 border-teal-200 shadow-xl animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{t("teacher:learningPath.template.detailsTitle" as any) as any}</CardTitle>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedTemplate(null)}>✕</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                                    <div className="space-y-4">
                                        <div className="aspect-video rounded-lg overflow-hidden ring-1 ring-slate-200">
                                            <img src={selectedTemplate.previewImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="font-bold text-xl">{t(selectedTemplate.title as any)}</h3>
                                        <div className="flex gap-2">
                                            <Badge variant="outline">{t(selectedTemplate.subject as any)}</Badge>
                                            <Badge variant="outline">{t(selectedTemplate.level as any)}</Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{t(selectedTemplate.description as any)}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Layout className="h-4 w-4 text-teal-600" />
                                            {t("teacher:learningPath.template.structureTitle" as any) as any}
                                        </h4>
                                        <div className="space-y-2">
                                            {[
                                                { title: "teacher:learningPath.mock.phases.intro", items: 4 },
                                                { title: "teacher:learningPath.mock.phases.concepts", items: 6 },
                                                { title: "teacher:learningPath.mock.phases.projects", items: 2 }
                                            ].map((phase, i) => (
                                                <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                                                    <span className="text-xs font-bold">{t(phase.title as any)}</span>
                                                    <Badge variant="secondary" className="text-[10px]">{phase.items} {t("common:lessons" as any) as any}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-primary" />
                                            {t("teacher:learningPath.template.suitableForTitle" as any) as any}
                                        </h4>
                                        <div className="text-[11px] space-y-2 text-slate-600 italic">
                                            <p>• {t("teacher:learningPath.template.suitableFor.visualKinesthetic" as any) as any}</p>
                                            <p>• {t("teacher:learningPath.template.suitableFor.math11Background" as any) as any}</p>
                                            <p>• {t("teacher:learningPath.template.suitableFor.flexibleTime" as any) as any}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2 p-6 border-t">
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg">
                                        <Copy className="mr-2 h-4 w-4" />
                                        {t("teacher:learningPath.actions.useTemplate" as any) as any}
                                    </Button>
                                    <div className="flex gap-2 w-full">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Share2 className="mr-2 h-3 w-3" />
                                            {t("common:share" as any) as any}
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Edit3 className="mr-2 h-3 w-3" />
                                            {t("common:edit" as any) as any}
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ) : (
                            <div className="space-y-6 sticky top-6">
                                <Card className="bg-indigo-600 text-white border-none overflow-hidden">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                <Sparkles className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-bold">{t("teacher:learningPath.aiSuggestion.title" as any) as any}</h3>
                                        </div>
                                        <p className="text-xs opacity-90 leading-relaxed">
                                            {t("teacher:learningPath.aiSuggestion.description", { subject: t("common:subjects.math_intensive"), topic: t("teacher:formativeAssessment.mock.points.arrays") })}
                                        </p>
                                        <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                                            {t("teacher:learningPath.aiSuggestion.viewAnalysis" as any) as any} <ArrowRight className="ml-2 h-3 w-3" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                                            <FileStack className="h-4 w-4 text-teal-600" />
                                            {t("teacher:learningPath.collections.title" as any) as any}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 space-y-3">
                                        <div className="flex items-center justify-between text-xs py-2 border-b">
                                            <span>{t("teacher:learningPath.collections.math10" as any) as any}</span>
                                            <Badge variant="secondary">05</Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs py-2 border-b">
                                            <span>{t("teacher:learningPath.collections.codingProjects" as any) as any}</span>
                                            <Badge variant="secondary">12</Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs py-2">
                                            <span>{t("teacher:learningPath.collections.academicEnglish" as any) as any}</span>
                                            <Badge variant="secondary">08</Badge>
                                        </div>
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
