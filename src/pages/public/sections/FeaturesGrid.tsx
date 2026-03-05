import { motion } from "framer-motion";
import { GraduationCap, Users, Heart, Zap, Globe, Shield, BarChart, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

export const FeaturesGrid = () => {
    const { t } = useTranslation(["landing"]);

    const features = [
        {
            role: t("landing:landing.features.roles.student"),
            color: "#4F46E5", // Education primary
            bgColor: "bg-[#4F46E5]/10",
            icon: GraduationCap,
            items: [
                { title: t("landing:landing.features.items.aiPath.title"), desc: t("landing:landing.features.items.aiPath.desc"), icon: Zap },
                { title: t("landing:landing.features.items.competition.title"), desc: t("landing:landing.features.items.competition.desc"), icon: Rocket },
                { title: t("landing:landing.features.items.autoPortfolio.title"), desc: t("landing:landing.features.items.autoPortfolio.desc"), icon: Globe },
            ]
        },
        {
            role: t("landing:landing.features.roles.teacher"),
            color: "#22C55E", // Progress green
            bgColor: "bg-[#22C55E]/10",
            icon: Users,
            items: [
                { title: t("landing:landing.features.items.autoGrading.title"), desc: t("landing:landing.features.items.autoGrading.desc"), icon: Shield },
                { title: t("landing:landing.features.items.skillAnalysis.title"), desc: t("landing:landing.features.items.skillAnalysis.desc"), icon: BarChart },
                { title: t("landing:landing.features.items.aiLectures.title"), desc: t("landing:landing.features.items.aiLectures.desc"), icon: Zap },
            ]
        },
        {
            role: t("landing:landing.features.roles.parent"),
            color: "#818CF8", // Secondary indigo
            bgColor: "bg-[#818CF8]/10",
            icon: Heart,
            items: [
                { title: t("landing:landing.features.items.realtimeTracking.title"), desc: t("landing:landing.features.items.realtimeTracking.desc"), icon: BarChart },
                { title: t("landing:landing.features.items.weeklyReports.title"), desc: t("landing:landing.features.items.weeklyReports.desc"), icon: Rocket },
                { title: t("landing:landing.features.items.familyActivities.title"), desc: t("landing:landing.features.items.familyActivities.desc"), icon: Heart },
            ]
        }
    ];

    return (
        <section className="py-20 lg:py-24 relative overflow-hidden">
            {/* Decorative background orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#4F46E5]/20 blur-[100px]"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.12, 0.08] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-[#22C55E]/15 blur-[100px]"
            />

            <div className="container relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                        {t("landing:landing.features.title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("landing:landing.features.subtitle")}
                    </p>
                </motion.div>

                {/* Features grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {features.map((roleSection, sectionIndex) => (
                        <motion.div
                            key={roleSection.role}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIndex * 0.15, duration: 0.5 }}
                            className="flex flex-col h-full"
                        >
                            {/* Role header */}
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.15 }}
                                    className={`h-12 w-12 rounded-xl ${roleSection.bgColor} flex items-center justify-center shadow-lg`}
                                    style={{ color: roleSection.color }}
                                >
                                    <roleSection.icon className="h-6 w-6" />
                                </motion.div>
                                <h3 className="text-2xl font-black tracking-tight">{roleSection.role}</h3>
                            </div>

                            {/* Feature cards */}
                            <div className="space-y-4 flex-grow">
                                {roleSection.items.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        transition={{ duration: 0.15 }}
                                        className="p-5 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <motion.div
                                                whileHover={{ scale: 1.15, rotate: 10 }}
                                                transition={{ duration: 0.1 }}
                                                className="mt-0.5 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    backgroundColor: `${roleSection.color}20`,
                                                    color: roleSection.color
                                                }}
                                            >
                                                <feature.icon className="h-5 w-5" />
                                            </motion.div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h4 className="font-bold text-foreground mb-1.5 leading-tight">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
