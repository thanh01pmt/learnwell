import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, GraduationCap, BookOpen, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
    const { t } = useTranslation(["landing"]);
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            {/* Animated grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Glowing orbs - Education colors */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-[15%] w-48 h-48 rounded-full bg-[#4F46E5]/20 blur-[80px]"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 right-[20%] w-64 h-64 rounded-full bg-[#22C55E]/15 blur-[100px]"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute top-1/2 left-[60%] w-32 h-32 rounded-full bg-[#818CF8]/20 blur-[60px]"
            />

            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-[#4F46E5]/30 bg-[#4F46E5]/10 backdrop-blur-sm px-6 py-2.5 text-sm font-bold text-[#4F46E5] mb-8 cursor-pointer"
                    >
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span className="uppercase tracking-wider">{t("landing:landing.hero.badge")}</span>
                    </motion.div>

                    {/* Title - Safe Area padding for Vietnamese accents */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.4]">
                        <span className="inline-block">
                            {t("landing:landing.hero.title")} <span className="text-[#4F46E5]">{t("landing:landing.hero.smart")}</span>
                        </span>
                        <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#818CF8] to-[#4F46E5] bg-[length:200%_auto] animate-gradient-x px-4 -mx-4 py-3 -my-3">
                            {t("landing:landing.hero.subtitle")}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
                        {t("landing:landing.hero.description")}
                    </p>

                    {/* CTA Buttons - Micro-interactions (50-100ms) */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.1 }}
                        >
                            <Button
                                size="lg"
                                className="h-14 px-8 text-base rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/30 font-bold tracking-wide group cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                {t("landing:landing.hero.startNow")}
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-100" />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.1 }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-base rounded-2xl font-bold tracking-wide border-2 border-[#4F46E5]/30 hover:bg-[#4F46E5]/10 cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                {t("landing:landing.hero.forTeachers")}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Stats Pills - Glassmorphism from Demo */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm cursor-pointer"
                        >
                            <div className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-foreground/80">{t("landing:landing.hero.free")}</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm cursor-pointer"
                        >
                            <div className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-foreground/80">{t("landing:landing.hero.secure")}</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.1 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm cursor-pointer"
                        >
                            <div className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-foreground/80">{t("landing:landing.hero.aiPersonalized")}</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Background Gradients - Education palette */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-25">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[#4F46E5]/25 blur-[150px] rounded-full" />
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#818CF8]/15 blur-[120px] rounded-full rotate-12" />
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#22C55E]/15 blur-[120px] rounded-full -rotate-12" />
            </div>

            {/* Floating Cards - Glassmorphism style from Demo */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 lg:left-20 hidden lg:block"
            >
                <div className="h-28 w-28 rounded-2xl border-2 border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-[#4F46E5]/10">
                    <GraduationCap className="h-14 w-14 text-[#4F46E5]" />
                </div>
            </motion.div>
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 lg:right-20 hidden lg:block"
            >
                <div className="h-28 w-28 rounded-2xl border-2 border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-[#22C55E]/10">
                    <Trophy className="h-14 w-14 text-[#22C55E]" />
                </div>
            </motion.div>
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 right-1/4 hidden xl:block"
            >
                <div className="h-24 w-24 rounded-2xl border-2 border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-xl shadow-[#818CF8]/10">
                    <BookOpen className="h-12 w-12 text-[#818CF8]" />
                </div>
            </motion.div>
            <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute top-1/3 left-1/4 hidden xl:block"
            >
                <div className="h-24 w-24 rounded-2xl border-2 border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-xl shadow-[#4F46E5]/10">
                    <Users className="h-12 w-12 text-[#4F46E5]" />
                </div>
            </motion.div>
        </section>
    );
};
