import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
    Search,
    Filter,
    ChevronDown,
    ArrowUpDown,
    CheckCircle2,
    Circle,
    Brain,
    Trophy,
    ArrowRight,
    Lock
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock Data
const ProblemLibrary = () => {
    const { t } = useTranslation(["code", "common"]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [difficulty, setDifficulty] = useState<string | null>(null);

    // Mock Data with localization
    const MOCK_PROBLEMS = [
        {
            id: "1",
            title: t("code:problems.mock.p1.title"),
            difficulty: "easy",
            category: t("code:problems.mock.p1.category"),
            acceptance: "45.2%",
            status: "solved",
            tags: ["Array", "Hash Table"]
        },
        {
            id: "2",
            title: t("code:problems.mock.p2.title"),
            difficulty: "easy",
            category: t("code:problems.mock.p2.category"),
            acceptance: "72.1%",
            status: "todo",
            tags: ["Linked List"]
        },
        {
            id: "3",
            title: t("code:problems.mock.p3.title"),
            difficulty: "hard",
            category: t("code:problems.mock.p3.category"),
            acceptance: "31.5%",
            status: "todo",
            tags: ["Graph", "DFS", "BFS"]
        },
        {
            id: "4",
            title: t("code:problems.mock.p4.title"),
            difficulty: "easy",
            category: t("code:problems.mock.p4.category"),
            acceptance: "52.8%",
            status: "attempted",
            tags: ["Dynamic Programming", "Math"]
        },
        {
            id: "5",
            title: t("code:problems.mock.p5.title"),
            difficulty: "medium",
            category: t("code:problems.mock.p5.category"),
            acceptance: "32.4%",
            status: "todo",
            tags: ["String", "Dynamic Programming"]
        },
        {
            id: "6",
            title: t("code:problems.mock.p6.title"),
            difficulty: "medium",
            category: t("code:problems.mock.p6.category"),
            acceptance: "65.0%",
            status: "todo",
            tags: ["Tree", "BFS"]
        }
    ];

    const filteredProblems = MOCK_PROBLEMS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = !difficulty || p.difficulty === difficulty;
        return matchesSearch && matchesDifficulty;
    });


    return (
        <div className="container mx-auto pt-16 md:pt-24 pb-20 space-y-12 animate-fade-in">
            <Breadcrumbs items={[{ label: t("code:problems.breadcrumbs") }]} />
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-black mb-2 flex items-center gap-3">
                        <Brain className="text-primary w-10 h-10 animate-pulse" />
                        {t("code:problems.title")} <span className="text-primary">{t("code:problems.titleHighlight")}</span>
                    </h1>
                    <p className="text-muted-foreground">{t("code:problems.subtitle")}</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Trophy className="text-primary w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">{t("code:problems.progress")}</div>
                            <div className="font-bold">45 / 150 <span className="text-xs text-muted-foreground ml-1">{t("code:problems.solved")}</span></div>
                            <Progress value={30} className="h-1 mt-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-10 py-4 bg-background/80 backdrop-blur-md">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={t("code:problems.searchPlaceholder")}
                        className="pl-10 bg-background border-input focus:border-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 whitespace-nowrap">
                                <Filter className="w-4 h-4" />
                                {difficulty ? t(`code:problems.${difficulty}`) : t("code:problems.difficulty")}
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover border-border text-popover-foreground">
                            <DropdownMenuItem onClick={() => setDifficulty(null)}>{t("code:problems.all")}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDifficulty("easy")}>{t("code:problems.easy")}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDifficulty("medium")}>{t("code:problems.medium")}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDifficulty("hard")}>{t("code:problems.hard")}</DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>

                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                        <ArrowUpDown className="w-4 h-4" />
                        {t("code:problems.acceptanceRate")}
                    </Button>
                </div>
            </div>

            {/* Problems List */}
            <div className="glass-card overflow-hidden border-border/40">
                <div className="grid grid-cols-[50px_1fr_120px_120px_100px] gap-4 p-4 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <div className="text-center">{t("code:problems.table.rank")}</div>
                    <div>{t("code:problems.table.title")}</div>
                    <div className="text-center">{t("code:problems.table.difficulty")}</div>
                    <div className="text-center">{t("code:problems.table.acceptance")}</div>
                    <div className="text-right">{t("code:problems.table.action")}</div>
                </div>

                <div className="divide-y divide-border">
                    {filteredProblems.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-[50px_1fr_120px_120px_100px] gap-4 p-5 items-center hover:bg-primary/5 transition-all group cursor-pointer border-b border-border/30 last:border-b-0"
                            onClick={() => navigate(`/problems/${p.id}/solve`)}
                        >
                            <div className="text-center text-muted-foreground font-mono text-xs font-bold">{p.id}</div>
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                    p.status === "solved" ? "bg-success/10 text-success" :
                                        p.status === "attempted" ? "bg-warning/10 text-warning" :
                                            "bg-muted text-muted-foreground/30"
                                )}>
                                    {p.status === "solved" ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : p.status === "attempted" ? (
                                        <Circle className="w-5 h-5 fill-current opacity-50" />
                                    ) : (
                                        <Circle className="w-5 h-5" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold group-hover:text-primary transition-colors text-base">{p.title}</h3>
                                    <div className="flex gap-2 mt-1.5">
                                        {p.tags.map(tag => (
                                            <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0 h-5 border-border/50 bg-muted/30 text-muted-foreground font-medium">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Badge
                                    className={cn(
                                        "font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg border",
                                        p.difficulty === "easy" ? "text-success bg-success/10 border-success/20" :
                                            p.difficulty === "medium" ? "text-warning bg-warning/10 border-warning/20" :
                                                "text-destructive bg-destructive/10 border-destructive/20"
                                    )}
                                >
                                    {t(`code:problems.${p.difficulty}`)}
                                </Badge>

                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-foreground/80">{p.acceptance}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{t("code:hub.details.acceptance")}</div>
                            </div>

                            <div className="text-right">
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl h-9 px-4 font-bold shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    {t("code:problems.tryNow")}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProblems.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground italic">
                        {t("code:problems.noProblems")}
                    </div>
                )}
            </div>

            {/* Learning Path Suggestion */}
            <div className="grid md:grid-cols-2 gap-6 pb-12">
                <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Brain className="w-32 h-32 text-primary" />
                    </div>
                    <Badge className="bg-primary text-primary-foreground mb-4 italic">{t("code:problems.learningPath.aiSuggested")}</Badge>
                    <h2 className="text-xl font-bold mb-2">{t("code:problems.learningPath.dpPathTitle")}</h2>
                    <p className="text-muted-foreground mb-6 text-sm max-w-md">{t("code:problems.learningPath.dpPathDesc")}</p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        {t("code:problems.learningPath.startPath")}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="glass-card p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t("code:problems.premium.title")}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{t("code:problems.premium.googleTitle")}</h2>
                        <p className="text-muted-foreground mb-6 text-sm">{t("code:problems.premium.googleDesc")}</p>
                    </div>
                    <Button variant="outline" className="border-input hover:bg-muted gap-2 w-fit">
                        {t("code:problems.premium.unlock")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProblemLibrary;
