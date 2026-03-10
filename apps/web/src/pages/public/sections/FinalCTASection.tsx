import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const FinalCTASection = () => {
    const { t } = useTranslation(["landing"]);
    const navigate = useNavigate();

    return (
        <section className="py-20 lg:py-24 relative overflow-hidden">
            <div className="container relative z-10">
                {/* Large glassmorphism CTA card */}
                <div className="relative p-12 md:p-16 lg:p-20 rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border-2 border-white/30 shadow-2xl overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 -z-10">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0]
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#818CF8]/10 to-transparent blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: [90, 0, 90]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-tl from-[#22C55E]/20 via-[#818CF8]/10 to-transparent blur-3xl"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center relative z-10"
                    >
                        {/* Badge */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-2 rounded-full bg-[#4F46E5]/10 backdrop-blur-sm px-5 py-2 text-sm font-bold text-[#4F46E5] mb-8 border-2 border-[#4F46E5]/20 cursor-pointer"
                        >
                            <Sparkles className="h-4 w-4 animate-pulse" />
                            <span className="uppercase tracking-wide">{t("landing:landing.cta.badge")}</span>
                        </motion.div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 max-w-4xl mx-auto leading-tight tracking-tight">
                            {t("landing:landing.cta.title")}
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            {t("landing:landing.cta.description")}
                        </p>

                        {/* CTA Buttons with micro-interactions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.1 }}
                            >
                                <Button
                                    size="lg"
                                    className="h-14 px-10 text-base rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] shadow-lg shadow-[#22C55E]/30 font-bold tracking-wide group cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    {t("landing:landing.cta.signUpFree")}
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
                                    className="h-14 px-10 text-base rounded-2xl font-bold tracking-wide border-2 border-[#4F46E5]/30 hover:bg-[#4F46E5]/10 cursor-pointer"
                                    onClick={() => navigate("/contact")}
                                >
                                    {t("landing:landing.cta.contactUs")}
                                </Button>
                            </motion.div>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                                <span>Miễn phí mãi mãi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                                <span>Không cần thẻ tín dụng</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                                <span>Đăng ký trong 30 giây</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F46E5]/10 rounded-full blur-[150px]" />
            </div>
        </section>
    );
};
