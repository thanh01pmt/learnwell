import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code, Trophy, MessageSquare, BookOpen, ArrowRight } from "lucide-react";
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
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("landing:landing.showcase.title")}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t("landing:landing.showcase.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Tabs Navigation */}
                    <div className="lg:col-span-4 space-y-2">
                        {showcaseItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left p-6 rounded-2xl transition-all border ${activeTab === item.id
                                    ? "bg-primary/10 border-primary/30 ring-1 ring-primary/20"
                                    : "bg-transparent border-transparent hover:bg-muted"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                        }`}>
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold transition-colors ${activeTab === item.id ? "text-foreground" : "text-muted-foreground"}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {showcaseItems.filter(i => i.id === activeTab).map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="card-modern p-10 min-h-[400px] flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="h-1 w-12 bg-primary rounded-full" />
                                            <span className="text-primary font-semibold tracking-wider uppercase text-xs">
                                                {t("landing:landing.showcase.featureLabel", { title: item.title })}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="bg-muted/50 rounded-2xl p-6 border border-border/50 mb-8">
                                            <p className="text-foreground italic">
                                                "{item.preview}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <Button
                                            size="lg"
                                            className="w-full sm:w-auto rounded-xl"
                                            onClick={() => navigate(item.link)}
                                        >
                                            {t("landing:landing.showcase.exploreNow")}
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="ghost"
                                            className="w-full sm:w-auto text-muted-foreground hover:text-foreground"
                                            onClick={() => navigate("/login")}
                                        >
                                            {t("landing:landing.showcase.connectCommunity")} <ArrowRight className="ml-2 h-4 w-4" />
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
