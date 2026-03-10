import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, BookOpen, GraduationCap, Clock } from "lucide-react";

export const LiveStatsSection = () => {
    const { t } = useTranslation(["landing"]);

    const stats = [
        {
            label: t("landing:landing.stats.activeStudents"),
            value: "5,000+",
            color: "#4F46E5",
            bgColor: "bg-[#4F46E5]/10",
            icon: Users
        },
        {
            label: t("landing:landing.stats.assignmentsProjects"),
            value: "2,500+",
            color: "#22C55E",
            bgColor: "bg-[#22C55E]/10",
            icon: BookOpen
        },
        {
            label: t("landing:landing.stats.teachers"),
            value: "120+",
            color: "#818CF8",
            bgColor: "bg-[#818CF8]/10",
            icon: GraduationCap
        },
        {
            label: t("landing:landing.stats.hoursCompleted"),
            value: "50,000+",
            color: "#EEF2FF",
            bgColor: "bg-[#EEF2FF]/20",
            icon: Clock
        },
    ];

    return (
        <section className="py-20 lg:py-24 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

            <div className="container relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                        Cộng đồng <span className="text-[#4F46E5]">LearnWell</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hàng nghìn học sinh, giáo viên đang tin tùng và sử dụng nền tảng mỗi ngày
                    </p>
                </motion.div>

                {/* Stats grid - Demo style stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ scale: 1.03, y: -4 }}
                                className="relative p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer group"
                            >
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-150`}>
                                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                                </div>

                                {/* Value */}
                                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tight" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                                    {stat.label}
                                </div>

                                {/* Hover gradient border effect */}
                                <div
                                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 -z-10"
                                    style={{
                                        background: `linear-gradient(135deg, ${stat.color}20, transparent, ${stat.color}10)`
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
