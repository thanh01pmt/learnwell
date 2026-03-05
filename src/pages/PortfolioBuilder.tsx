import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Target,
    Palette,
    Eye,
    ChevronRight,
    ChevronLeft,
    GraduationCap,
    Briefcase,
    University,
    CheckCircle2,
    Download,
    Share2,
    Mail,
    Award,
    BookOpen,
    Code2,
    MessageSquare,
    ShieldCheck,
    Zap,
    Users,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { mockStudents } from "@/mocks/data";
import { cn } from "@/lib/utils";

// steps will be moved inside PortfolioBuilder component

// purposes will be moved inside PortfolioBuilder component

const templates = [
    { id: "academic", name: "Academic Formal", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop" },
    { id: "tech", name: "Tech Modern", image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=500&fit=crop" },
    { id: "creative", name: "Creative Plus", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=500&fit=crop" },
];

export default function PortfolioBuilder() {
    const { t } = useTranslation(["portfolio", "common", "dashboard", "classroom", "achievements"]);

    const steps = [
        { id: 1, title: t("portfolio:steps.basicInfo"), icon: Target, description: t("portfolio:steps.basicInfo") },
        { id: 2, title: t("portfolio:steps.academic"), icon: FileText, description: t("portfolio:steps.academic") },
        { id: 3, title: t("portfolio:steps.achievements"), icon: Palette, description: t("portfolio:steps.achievements") },
        { id: 4, title: t("portfolio:steps.review"), icon: Eye, description: t("portfolio:steps.review") },
    ];

    const purposes = [
        {
            id: "scholarship",
            title: t("portfolio:sections.personalGoal"),
            description: t("portfolio:sections.personalGoal"),
            icon: GraduationCap,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            id: "internship",
            title: t("portfolio:steps.projects"),
            description: t("portfolio:steps.projects"),
            icon: Briefcase,
            color: "text-primary",
            bg: "bg-primary/10",
        },
        {
            id: "admission",
            title: t("portfolio:steps.academic"),
            description: t("portfolio:steps.academic"),
            icon: University,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState("academic");
    const [content, setContent] = useState({
        transcripts: true,
        achievements: true,
        projects: true,
        skills: true,
        recommendations: true,
        attendance: false,
    });

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const toggleContent = (key: keyof typeof content) => {
        setContent((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleExport = (type: string) => {
        toast.success(t("portfolio:preview.exportPdf"), {
            description: t("portfolio:status.saved"),
        });
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("portfolio:title")}</h1>
                        <p className="text-muted-foreground">{t("portfolio:subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={() => window.location.href = '/parent'}>{t("common:cancel")}</Button>
                        <Button className="shadow-lg shadow-primary/20">{t("portfolio:actions.saveDraft")}</Button>
                    </div>
                </div>

                {/* Stepper */}
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
                    <div className="relative flex justify-between">
                        {steps.map((step) => {
                            const StepIcon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                                    <div
                                        className={cn(
                                            "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                            isActive
                                                ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                                                : isCompleted
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "bg-background border-muted text-muted-foreground"
                                        )}
                                    >
                                        {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <StepIcon className="h-5 w-5" />}
                                    </div>
                                    <div className="hidden md:block text-center">
                                        <p className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-muted-foreground")}>
                                            {step.title}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/60">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Step 1: Purpose */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {purposes.map((purpose) => (
                                        <Card
                                            key={purpose.id}
                                            className={cn(
                                                "relative cursor-pointer transition-all duration-300 hover:shadow-xl group overflow-hidden border-2",
                                                selectedPurpose === purpose.id ? "border-primary shadow-lg scale-[1.02]" : "border-transparent"
                                            )}
                                            onClick={() => setSelectedPurpose(purpose.id)}
                                        >
                                            {selectedPurpose === purpose.id && (
                                                <div className="absolute top-4 right-4 text-primary">
                                                    <CheckCircle2 className="h-6 w-6" />
                                                </div>
                                            )}
                                            <CardHeader className="space-y-4">
                                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner", purpose.bg)}>
                                                    <purpose.icon className={cn("h-8 w-8", purpose.color)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <CardTitle className="text-xl">{purpose.title}</CardTitle>
                                                    <CardDescription className="text-sm leading-relaxed">{purpose.description}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Zap className="h-3 w-3 text-warning" />
                                                        {t("portfolio:preview.publishDate")}
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <ShieldCheck className="h-3 w-3 text-success" />
                                                        {t("portfolio:preview.exportPdf")}
                                                    </li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Content Selection */}
                            {currentStep === 2 && (
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle>{t("portfolio:steps.academic")}</CardTitle>
                                        <CardDescription>{t("portfolio:subtitle")}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                        <BookOpen className="h-5 w-5 text-blue-500" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("dashboard:sections.curriculum")}</Label>
                                                        <p className="text-xs text-muted-foreground">{t("dashboard:curriculum.subtitle")}</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.transcripts} onCheckedChange={() => toggleContent("transcripts")} />
                                            </div>

                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                                                        <Award className="h-5 w-5 text-warning" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("dashboard:stats.achievements")} & {t("achievements:badges.title")}</Label>
                                                        <p className="text-xs text-muted-foreground">{t("achievements:badges.description")}</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.achievements} onCheckedChange={() => toggleContent("achievements")} />
                                            </div>

                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Code2 className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("portfolio:steps.projects")}</Label>
                                                        <p className="text-xs text-muted-foreground">{t("projects:title")}</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.projects} onCheckedChange={() => toggleContent("projects")} />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                        <Zap className="h-5 w-5 text-purple-500" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("dashboard:dashboard.curriculum.details.skills")}</Label>
                                                        <p className="text-xs text-muted-foreground">Soft skills & Technical skills</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.skills} onCheckedChange={() => toggleContent("skills")} />
                                            </div>

                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                        <MessageSquare className="h-5 w-5 text-red-500" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("parent:report.sections.teacherRemarks")}</Label>
                                                        <p className="text-xs text-muted-foreground">{t("dashboard:dashboard.curriculum.details.lastUpdated", { time: "1" })}</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.recommendations} onCheckedChange={() => toggleContent("recommendations")} />
                                            </div>

                                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 opacity-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-slate-500/10 flex items-center justify-center">
                                                        <Users className="h-5 w-5 text-slate-500" />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <Label className="text-sm font-semibold">{t("parent:attendance.title")}</Label>
                                                        <p className="text-xs text-muted-foreground">{t("parent:attendance.info")}</p>
                                                    </div>
                                                </div>
                                                <Switch checked={content.attendance} onCheckedChange={() => toggleContent("attendance")} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Step 3: Design */}
                            {currentStep === 3 && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {templates.map((template) => (
                                            <div
                                                key={template.id}
                                                className={cn(
                                                    "group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300",
                                                    selectedTemplate === template.id ? "border-primary shadow-2xl scale-[1.05]" : "border-transparent grayscale-[0.3] hover:grayscale-0"
                                                )}
                                                onClick={() => setSelectedTemplate(template.id)}
                                            >
                                                <img src={template.image} alt={template.name} className="w-full aspect-[3/4] object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                    <p className="text-white font-bold">{template.name}</p>
                                                    <p className="text-white/60 text-xs text-pretty">{t("portfolio:preview.title")}</p>
                                                </div>
                                                {selectedTemplate === template.id && (
                                                    <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader className="p-4">
                                                <CardTitle className="text-sm">{t("portfolio:preview.title")}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 space-y-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("portfolio:sections.brandColor")}</Label>
                                                    <div className="flex gap-2">
                                                        <div className="h-6 w-6 rounded-full bg-blue-600 border-2 border-primary cursor-pointer" />
                                                        <div className="h-6 w-6 rounded-full bg-primary cursor-pointer" />
                                                        <div className="h-6 w-6 rounded-full bg-purple-600 cursor-pointer" />
                                                        <div className="h-6 w-6 rounded-full bg-orange-600 cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-xs">{t("classroom:table.students")}</Label>
                                                        <Switch checked={true} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-xs">QR</Label>
                                                        <Switch checked={true} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-xs">{t("portfolio:preview.exportPdf")}</Label>
                                                        <Switch checked={false} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-primary/5 border-primary/20">
                                            <CardHeader className="p-4">
                                                <CardTitle className="text-sm flex items-center gap-2">
                                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                                    {t("portfolio:sections.security")}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <p className="text-[10px] text-muted-foreground">{t("portfolio:sections.securityDesc")}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Preview */}
                            {currentStep === 4 && (
                                <div className="bg-muted p-8 rounded-3xl min-h-[600px] flex flex-col items-center gap-8 border-4 border-dashed border-muted-foreground/20">
                                    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-sm aspect-[1/1.414] overflow-hidden flex flex-col p-12 text-black animate-slide-up">
                                        <div className="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8">
                                            <div className="space-y-1">
                                                <h2 className="text-3xl font-serif font-bold text-slate-800 uppercase tracking-wider">{t("portfolio:title")}</h2>
                                                <p className="text-slate-500 font-medium">{t("classroom:table.academicYear")} 2024-2025 • {t("classroom:table.academicYearCode")}: LW-827-X92</p>
                                            </div>
                                            <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center p-2 border border-slate-200">
                                                <div className="w-full h-full bg-slate-200 rounded grid grid-cols-2 gap-1 p-1">
                                                    {[...Array(4)].map((_, i) => <div key={i} className="bg-slate-300" />)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-8 mb-8">
                                            <div className="h-32 w-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh" className="w-full h-full" alt="student" />
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("classroom:table.students")}</p>
                                                    <p className="text-2xl font-bold text-slate-800">{t("classroom:mocks.students.an").toUpperCase()}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GPA</p>
                                                        <p className="text-xl font-bold text-blue-600">8.5 / 10</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t("classroom:table.ranking")}</p>
                                                        <p className="text-xl font-bold text-slate-700">Top 5%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">{t("dashboard:stats.achievements")}</p>
                                                <ul className="space-y-2">
                                                    <li className="flex justify-between text-sm">
                                                        <span className="font-semibold text-slate-700">{t("achievements:badges.mathMaster.name")}</span>
                                                        <span className="text-slate-500 italic">{t("common:months.dec")}, 2024</span>
                                                    </li>
                                                    <li className="flex justify-between text-sm">
                                                        <span className="font-semibold text-slate-700">IELTS 7.5</span>
                                                        <span className="text-slate-500 italic">{t("common:months.jan")}, 2025</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">{t("portfolio:steps.projects")}</p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                                                        <p className="text-xs font-bold text-slate-700">Flappy Bird AI</p>
                                                        <p className="text-[10px] text-slate-500 line-clamp-1">Python, Neural Networks</p>
                                                    </div>
                                                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                                                        <p className="text-xs font-bold text-slate-700">Personal Blog System</p>
                                                        <p className="text-[10px] text-slate-500 line-clamp-1">React, Firebase, Tailwind</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-8 border-t border-slate-100 flex justify-between items-end">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{t("portfolio:preview.publishDate")}</p>
                                                <p className="text-xs text-slate-600">07 {t("common:months.jan")}, 2026</p>
                                            </div>
                                            <div className="text-right space-y-2">
                                                <p className="text-[14px] font-serif font-bold text-slate-800">LearnWell Verification</p>
                                                <p className="text-[8px] text-slate-400 font-mono tracking-tighter">AUTHENTICITY GUARANTEED BY LEARNWELL PLATFORM • UUID: 550e8400-e29b-41d4-a716-446655440000</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button size="lg" className="gap-2 px-8" onClick={() => handleExport("PDF")}>
                                            <Download className="h-5 w-5" /> {t("portfolio:preview.exportPdf")}
                                        </Button>
                                        <Button size="lg" variant="outline" className="gap-2 px-8" onClick={() => handleExport("Link")}>
                                            <Share2 className="h-5 w-5" /> {t("portfolio:preview.shareLink")}
                                        </Button>
                                        <Button size="lg" variant="outline" className="gap-2 px-8" onClick={() => handleExport("Email")}>
                                            <Mail className="h-5 w-5" /> {t("portfolio:preview.sendEmail")}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-muted">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" /> {t("portfolio:actions.back")}
                    </Button>

                    {currentStep < 4 ? (
                        <Button
                            onClick={nextStep}
                            disabled={currentStep === 1 && !selectedPurpose}
                            className="gap-2 px-8"
                        >
                            {t("portfolio:actions.next")} <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            className="gap-2 px-8 bg-success hover:bg-success/90"
                            onClick={() => {
                                toast.success(t("portfolio:status.saved"));
                                window.location.href = "/parent";
                            }}
                        >
                            <CheckCircle2 className="h-4 w-4" /> {t("portfolio:actions.complete")}
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
