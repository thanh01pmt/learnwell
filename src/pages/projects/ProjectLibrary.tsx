import { useState } from "react";
import {
    Code,
    Search,
    Filter,
    Rocket,
    ChevronRight,
    Zap,
    Star,
    Gamepad2,
    Palette,
    FlaskConical,
    Brain,
    Clock,
    Layout,
    Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProjectTemplate {
    id: string;
    title: string;
    description: string;
    category: "Game" | "Art" | "Science" | "AI/ML";
    difficulty: string;
    difficultyKey: string;
    estimatedTime: number;
    skills: string[];
    matchScore: number;
}



export default function ProjectLibrary() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const mockProjects: ProjectTemplate[] = [
        {
            id: "p1",
            title: t("projects:library.mock.p1.title"),
            description: t("projects:library.mock.p1.description"),
            category: "Game",
            difficulty: t("projects:library.card.difficulty.beginner"),
            difficultyKey: "beginner",
            estimatedTime: 2,
            skills: ["JavaScript", "Canvas", "Physics"],
            matchScore: 98,
        },
        {
            id: "p2",
            title: t("projects:library.mock.p2.title"),
            description: t("projects:library.mock.p2.description"),
            category: "Art",
            difficulty: t("projects:library.card.difficulty.intermediate"),
            difficultyKey: "intermediate",
            estimatedTime: 4,
            skills: ["JavaScript", "Math", "Creativity"],
            matchScore: 85,
        },
        {
            id: "p3",
            title: t("projects:library.mock.p3.title"),
            description: t("projects:library.mock.p3.description"),
            category: "Science",
            difficulty: t("projects:library.card.difficulty.advanced"),
            difficultyKey: "advanced",
            estimatedTime: 6,
            skills: ["React", "Three.js", "Physics"],
            matchScore: 72,
        },
        {
            id: "p4",
            title: t("projects:library.mock.p4.title"),
            description: t("projects:library.mock.p4.description"),
            category: "AI/ML",
            difficulty: t("projects:library.card.difficulty.intermediate"),
            difficultyKey: "intermediate",
            estimatedTime: 5,
            skills: ["JS", "ML", "Data Science"],
            matchScore: 65,
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Hero Section */}
                <div className="glass-card rounded-[2rem] p-10 bg-gradient-to-br from-primary/10 via-background to-background border-primary/10 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-grid-primary/[0.03] -z-1" />
                    <div className="max-w-3xl space-y-6 relative z-10">
                        <Badge className="bg-primary text-primary-foreground font-black px-4 py-1.5 rounded-full mb-2">
                            {t("projects:library.titleHighlight", { defaultValue: "PROJECT LIBRARY" })}
                        </Badge>
                        <h1 className="text-4xl lg:text-6xl font-black leading-tight">
                            {t("projects:library.header.title")} <br />
                            <span className="text-primary italic">{t("projects:library.header.titleHighlight")}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            {t("projects:library.header.subtitle")}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border border-primary/20 shadow-sm">
                                <Rocket className="h-5 w-5 text-primary" />
                                <span className="font-bold text-sm">
                                    {t("projects:library.header.newCount", { count: 24 })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border border-accent/20 shadow-sm">
                                <Brain className="h-5 w-5 text-accent" />
                                <span className="font-bold text-sm">{t("projects:library.header.aiSuggestion")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {["All", "Game", "Art", "Science", "AI/ML"].map(cat => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className="rounded-2xl h-12 px-6 font-bold transition-all whitespace-nowrap"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === "All" ? t("projects:library.filter.all") : cat}
                            </Button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("projects:library.filter.search")}
                            className="pl-12 h-12 rounded-2xl border-primary/10 bg-primary/5 focus-visible:ring-primary"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockProjects.filter(p => selectedCategory === "All" || p.category === selectedCategory).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card rounded-[2.5rem] p-8 border-primary/5 hover:border-primary/20 transition-all group cursor-pointer active:scale-[0.98]"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent text-primary`}>
                                    {project.category === "Game" && <Gamepad2 className="h-8 w-8" />}
                                    {project.category === "Art" && <Palette className="h-8 w-8" />}
                                    {project.category === "Science" && <FlaskConical className="h-8 w-8" />}
                                    {project.category === "AI/ML" && <Brain className="h-8 w-8" />}
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase mb-1">
                                        <Zap className="h-3 w-3 fill-primary" />
                                        {t("projects:library.card.matchScore", { score: project.matchScore })}
                                    </div>
                                    <Progress value={project.matchScore} className="h-1.5 w-24 rounded-full bg-primary/10" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] font-bold px-3 py-1">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                        <Clock className="h-3.5 w-3.5" />
                                        {t("projects:library.card.estimatedTime", { count: project.estimatedTime })}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                        <Layout className="h-3.5 w-3.5" />
                                        {t(`projects:library.card.difficulty.${(project as any).difficultyKey}`)}
                                    </span>
                                </div>
                                <Button className="rounded-full h-12 w-12 p-0 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
