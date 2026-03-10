import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Gamepad2,
    Rocket,
    LibrarySquare,
    LocateFixed,
    Atom,
    CircuitBoard,
    Code2,
    Plus,
    LayoutGrid,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ProjectTemplateCard } from "@/components/hub/ProjectTemplateCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = [
    { id: "intro", icon: <LibrarySquare className="w-5 h-5" />, color: "text-blue-500" },
    { id: "game", icon: <Gamepad2 className="w-5 h-5" />, color: "text-purple-500" },
    { id: "app", icon: <LocateFixed className="w-5 h-5" />, color: "text-green-500" },
    { id: "stem", icon: <Rocket className="w-5 h-5" />, color: "text-orange-500" },
    { id: "physics", icon: <Atom className="w-5 h-5" />, color: "text-cyan-500" },
    { id: "robotics", icon: <CircuitBoard className="w-5 h-5" />, color: "text-red-500" },
    { id: "algo", icon: <Code2 className="w-5 h-5" />, color: "text-indigo-500" },
];

const codingModes = [
    { id: "block", type: "block" },
    { id: "python", type: "text" },
    { id: "js", type: "text" },
    { id: "cpp", type: "text" },
    { id: "lua", type: "text" },
    { id: "swift", type: "text" },
];

// Mock Guided Projects Data
const guidedProjects = [
    { id: "moveActor", category: "intro", thumbnail: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400" },
    { id: "miniGames", category: "game", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
    { id: "designer", category: "app", thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=400" },
];

export default function ProjectHub() {
    const { t } = useTranslation("hub");
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("intro");
    const [selectedMode, setSelectedMode] = useState("block");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGuidedProjects = useMemo(() => {
        return guidedProjects.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const handleStartBlank = () => {
        navigate(`/editor?type=${activeCategory}&mode=${selectedMode}`);
    };

    const handleStartGuided = (projectId: string) => {
        // Guided projects default to specific modes usually, but for now we'll just lead to editor
        navigate(`/editor?type=${activeCategory}&mode=block&tutorial=${projectId}`);
    };

    return (
        <div className="h-screen bg-[#FDFDFD] dark:bg-slate-950 flex overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AppHeader />

                <div className="flex-1 flex overflow-hidden">
                    {/* Category Sidebar */}
                    <aside className="w-64 border-r border-border/30 bg-white/40 dark:bg-slate-900/10 backdrop-blur-md hidden md:flex flex-col p-8 shrink-0 overflow-y-auto">
                        <div className="mb-6">
                            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-8 px-1">
                                {t("ui.categories")}
                            </h2>
                            <div className="space-y-3">
                                {projectTypes.map((pt) => (
                                    <button
                                        key={pt.id}
                                        onClick={() => setActiveCategory(pt.id)}
                                        className={cn(
                                            "w-full flex items-center gap-4 px-3 py-3 rounded-2xl text-[13px] font-black transition-all duration-500 group relative",
                                            activeCategory === pt.id
                                                ? "text-primary scale-[1.02]"
                                                : "text-muted-foreground/80 hover:text-primary hover:translate-x-1"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 bg-white dark:bg-slate-900 shadow-sm border border-transparent",
                                            activeCategory === pt.id
                                                ? "shadow-lg shadow-primary/10 border-primary/20 scale-110"
                                                : "group-hover:shadow-md group-hover:border-primary/10",
                                            activeCategory === pt.id ? pt.color : "text-muted-foreground/40 group-hover:text-primary"
                                        )}>
                                            {pt.icon}
                                        </div>
                                        <span className="relative z-10 transition-colors text-left leading-tight">{t(`projectTypes.${pt.id}`)}</span>

                                        {activeCategory === pt.id && (
                                            <motion.div
                                                layoutId="activeTabGlow"
                                                className="absolute -inset-1 bg-primary/5 rounded-3xl blur-xl"
                                                transition={{ duration: 1 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Content Gallery */}
                    <main className="flex-1 flex flex-col min-w-0 bg-transparent">
                        <header className="px-12 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <h1 className="text-5xl font-black tracking-tighter flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-3xl bg-primary shadow-[0_15px_35px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
                                        <LayoutGrid className="w-6 h-6" />
                                    </div>
                                    {t(`projectTypes.${activeCategory}`)}
                                </h1>
                                <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-4 opacity-70">
                                    <div className="w-3 h-[2px] rounded-full bg-primary" />
                                    {t("subtitle")}
                                </p>
                            </motion.div>

                            <div className="flex items-center gap-4">
                                <div className="relative w-full sm:w-80 group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input
                                        placeholder={t("ui.searchPlaceholder")}
                                        className="pl-14 h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus-visible:ring-4 focus-visible:ring-primary/5 transition-all font-bold text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto px-12 pb-12 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="max-w-[1600px] mx-auto space-y-24"
                                >
                                    {/* Blank Project Section */}
                                    <section className="bg-white/60 dark:bg-slate-900/40 rounded-[4rem] p-16 border border-white dark:border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.02)] relative overflow-hidden group/section">
                                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/[0.03] blur-[120px] -translate-x-1/4 -translate-y-1/2 rounded-full pointer-events-none" />

                                        <div className="flex items-center justify-between mb-16 relative z-10">
                                            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-5">
                                                <div className="w-4 h-[2px] rounded-full bg-primary" />
                                                {t("ui.createBlank")}
                                            </h2>
                                        </div>

                                        <div className="flex flex-col xl:flex-row gap-20 items-center xl:items-stretch relative z-10">
                                            <div className="w-full max-w-[22rem] shrink-0">
                                                <ProjectTemplateCard
                                                    title={t("templates.blank.title")}
                                                    description={t("templates.blank.desc")}
                                                    icon={<Plus className="w-10 h-10" />}
                                                    isSelected={true}
                                                    className="shadow-3xl shadow-primary/[0.03] border-primary/10 cursor-pointer active:scale-95 transition-transform"
                                                    onClick={handleStartBlank}
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center space-y-16">
                                                <div className="space-y-10">
                                                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 px-3">
                                                        {t("ui.selectMode")}
                                                    </h3>
                                                    <Tabs value={selectedMode} onValueChange={setSelectedMode} className="w-full">
                                                        <TabsList className="bg-slate-100/50 dark:bg-slate-950 p-2 rounded-[2.5rem] h-auto shadow-inner border border-white/50 dark:border-slate-800 grid grid-cols-2 md:grid-cols-3 gap-2">
                                                            {codingModes.map(mode => (
                                                                <TabsTrigger
                                                                    key={mode.id}
                                                                    value={mode.id}
                                                                    className="rounded-[1.75rem] px-6 transition-all data-[state=active]:bg-primary/[0.08] dark:data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-primary/20 font-bold text-[13px] uppercase tracking-wider h-14 whitespace-nowrap border border-transparent"
                                                                >
                                                                    {t(`modes.${mode.id}`)}
                                                                </TabsTrigger>
                                                            ))}
                                                        </TabsList>
                                                    </Tabs>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Guided Projects Section */}
                                    <section className="space-y-16">
                                        <div className="flex items-center justify-between group/header">
                                            <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-5">
                                                <div className="w-4 h-[2px] rounded-full bg-emerald-500" />
                                                {t("ui.guidedTutorials")}
                                            </h2>
                                            <Button variant="ghost" size="sm" className="text-[11px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-full px-10 h-14 transition-all hover:scale-105 active:scale-95">
                                                {t("actions.viewAll")}
                                            </Button>
                                        </div>

                                        {filteredGuidedProjects.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12">
                                                {filteredGuidedProjects.map((gp) => (
                                                    <ProjectTemplateCard
                                                        key={gp.id}
                                                        title={t(`templates.guided.${gp.id}.title`)}
                                                        description={t(`templates.guided.${gp.id}.desc`)}
                                                        thumbnail={gp.thumbnail}
                                                        badge="Guided"
                                                        onClick={() => handleStartGuided(gp.id)}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-96 rounded-[4rem] border-4 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-muted-foreground text-[11px] font-bold uppercase tracking-widest bg-white/40 dark:bg-slate-900/20">
                                                <LibrarySquare className="w-16 h-16 mb-8 opacity-5" />
                                                {t("ui.comingSoon")}
                                            </div>
                                        )}
                                    </section>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
