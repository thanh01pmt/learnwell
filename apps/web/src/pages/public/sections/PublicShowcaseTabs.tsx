import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code, Trophy, MessageSquare, BookOpen, ArrowRight, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export const PublicShowcaseTabs = () => {
    const { t } = useTranslation(["landing"]);
    const navigate = useNavigate();

    const showcaseItems = [
        {
            id: "gallery",
            title: t("landing:landing.showcase.items.gallery.title"),
            icon: Code,
            description: t("landing:landing.showcase.items.gallery.description"),
            preview: t("landing:landing.showcase.items.gallery.preview"),
            link: "/explore/gallery"
        },
        {
            id: "projects",
            title: t("landing:landing.showcase.items.projects.title"),
            icon: Rocket,
            description: t("landing:landing.showcase.items.projects.description"),
            preview: t("landing:landing.showcase.items.projects.preview"),
            link: "/explore/projects"
        },
        {
            id: "leaderboard",
            title: t("landing:landing.showcase.items.leaderboard.title"),
            icon: Trophy,
            description: t("landing:landing.showcase.items.leaderboard.description"),
            preview: t("landing:landing.showcase.items.leaderboard.preview"),
            link: "/explore/leaderboard"
        },
        {
            id: "forum",
            title: t("landing:landing.showcase.items.forum.title"),
            icon: MessageSquare,
            description: t("landing:landing.showcase.items.forum.description"),
            preview: t("landing:landing.showcase.items.forum.preview"),
            link: "/explore/forum"
        },
        {
            id: "blog",
            title: t("landing:landing.showcase.items.blog.title"),
            icon: BookOpen,
            description: t("landing:landing.showcase.items.blog.description"),
            preview: t("landing:landing.showcase.items.blog.preview"),
            link: "/explore/blog"
        }
    ];

    const [activeTab, setActiveTab] = useState("gallery");

    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight uppercase">
                        {t("landing:landing.showcase.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        {t("landing:landing.showcase.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                    {/* Tabs Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        {showcaseItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left p-6 rounded-[2rem] transition-all duration-300 border ${activeTab === item.id
                                    ? "bg-white dark:bg-slate-900 border-primary/30 shadow-xl shadow-primary/5 ring-1 ring-primary/20 scale-[1.02]"
                                    : "bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-900/40"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${activeTab === item.id ? "bg-primary text-primary-foreground rotate-6" : "bg-muted text-muted-foreground"
                                        }`}>
                                        <item.icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-black transition-colors ${activeTab === item.id ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="lg:col-span-8 h-full">
                        <AnimatePresence mode="wait">
                            {showcaseItems.filter(i => i.id === activeTab).map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                    className="relative rounded-[3rem] p-12 lg:p-16 min-h-[500px] flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-950 border border-border/50 dark:border-white/5 shadow-xl dark:shadow-2xl"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-1" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="h-1.5 w-16 bg-primary rounded-full" />
                                            <span className="text-primary font-black tracking-[0.2em] uppercase text-xs">
                                                {t("landing:landing.showcase.featureLabel", { title: item.title })}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xl mb-10 leading-relaxed font-medium">
                                            {item.description}
                                        </p>

                                        <div className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-8 border border-border/50 dark:border-white/5 mb-10 backdrop-blur-sm group hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                            <p className="text-slate-700 dark:text-white text-lg font-medium italic leading-relaxed">
                                                "{item.preview}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                                        <Button
                                            size="lg"
                                            className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                                            onClick={() => navigate(item.link)}
                                        >
                                            {t("landing:landing.showcase.exploreNow")}
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="w-full sm:w-auto h-14 px-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-bold text-lg gap-2 border border-border/50 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all"
                                            onClick={() => navigate("/login")}
                                        >
                                            {t("landing:landing.showcase.connectCommunity")} <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section >
    );
};
