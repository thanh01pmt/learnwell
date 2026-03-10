import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Rocket,
    Gamepad2,
    Layout,
    Brain,
    Atom,
    Cpu,
    Binary,
    Plus,
    ArrowRight,
    Sparkles
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProjectCategory {
    id: string;
    type: string;
    icon: LucideIcon;
    color: string;
    gradient: string;
}

const CATEGORIES: ProjectCategory[] = [
    { id: "intro", type: "intro", icon: Rocket, color: "text-blue-500", gradient: "from-blue-500/30 to-blue-500/5" },
    { id: "game", type: "game", icon: Gamepad2, color: "text-purple-500", gradient: "from-purple-500/30 to-purple-500/5" },
    { id: "app", type: "app", icon: Layout, color: "text-emerald-500", gradient: "from-emerald-500/30 to-emerald-500/5" },
    { id: "stem", type: "stem", icon: Brain, color: "text-amber-500", gradient: "from-amber-500/30 to-amber-500/5" },
    { id: "physics", type: "physics", icon: Atom, color: "text-cyan-500", gradient: "from-cyan-500/30 to-cyan-500/5" },
    { id: "robotics", type: "robotics", icon: Cpu, color: "text-rose-500", gradient: "from-rose-500/30 to-rose-500/5" },
    { id: "algo", type: "algo", icon: Binary, color: "text-indigo-500", gradient: "from-indigo-500/30 to-indigo-500/5" },
];

export default function ExploreProjects({ publicView = false }: { publicView?: boolean }) {
    const { t } = useTranslation("hub");
    const navigate = useNavigate();

    const Container = publicView ?
        ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4 pt-12">{children}</div> :
        AppLayout;

    return (
        <Container>
            <div className="space-y-12 pb-20 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-950 border border-border/50 dark:border-white/5 p-12 lg:p-20 text-center space-y-8 shadow-sm dark:shadow-none">
                    <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02] -z-1" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 relative z-10"
                    >
                        <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                            <Sparkles className="h-3.5 w-3.5 mr-2 animate-pulse" />
                            {t("explore.badge", { defaultValue: "KHÁM PHÁ DỰ ÁN" })}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter uppercase">
                            {t("explore.title")}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
                            {t("explore.subtitle")}
                        </p>
                    </motion.div>

                    {!publicView && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                onClick={() => navigate("/hub")}
                                className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <Plus className="h-6 w-6" />
                                {t("explore.cta.create")}
                            </Button>
                        </motion.div>
                    )}
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card
                                className="group relative h-full rounded-[2rem] border-border/50 bg-slate-100 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 overflow-hidden cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-xl hover:border-primary/20"
                                onClick={() => navigate(`/hub?type=${cat.type}`)}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <CardContent className="p-8 space-y-6 relative z-10">
                                    <div className={`h-16 w-16 rounded-2xl bg-slate-900/5 dark:bg-slate-950/40 backdrop-blur-md flex items-center justify-center ${cat.color} group-hover:scale-110 group-hover:bg-slate-900/10 dark:group-hover:bg-slate-950/60 transition-all duration-500 border border-border/50 dark:border-white/5 shadow-inner`}>
                                        <cat.icon className="h-8 w-8" />
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
                                            {t(`explore.categories.${cat.id}.title`)}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                                            {t(`explore.categories.${cat.id}.desc`)}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <span>{t("explore.cta.learnMore")}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
