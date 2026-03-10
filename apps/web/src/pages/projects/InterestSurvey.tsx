import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Gamepad2,
    Palette,
    FlaskConical,
    Brain,
    Rocket,
    ChevronRight,
    Sparkles,
    Check,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Interest {
    id: string;
    label: string;
    description: string;
    icon: any;
    color: string;
    bg: string;
}

export default function InterestSurvey() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [step, setStep] = useState(1);

    const interests: Interest[] = [
        {
            id: "game",
            label: t("projects:survey.topics.game.label"),
            description: t("projects:survey.topics.game.description"),
            icon: Gamepad2,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
        },
        {
            id: "art",
            label: t("projects:survey.topics.art.label"),
            description: t("projects:survey.topics.art.description"),
            icon: Palette,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            id: "science",
            label: t("projects:survey.topics.science.label"),
            description: t("projects:survey.topics.science.description"),
            icon: FlaskConical,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            id: "ai",
            label: t("projects:survey.topics.ai.label"),
            description: t("projects:survey.topics.ai.description"),
            icon: Brain,
            color: "text-cyan-500",
            bg: "bg-cyan-500/10",
        },
    ];

    const toggleInterest = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleNext = () => {
        if (selectedInterests.length === 0) {
            toast.error(t("projects:survey.messages.error"));
            return;
        }
        setStep(2);
        setTimeout(() => {
            toast.success(t("projects:survey.messages.success"));
            navigate("/project-library");
        }, 2000);
    };

    return (
        <AppLayout>
            <div className="min-h-[80vh] flex items-center justify-center py-10">
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-4xl w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    {t("projects:survey.header.badge")}
                                </motion.div>
                                <h1 className="text-4xl lg:text-5xl font-black">
                                    {t("projects:survey.header.title")} <span className="text-primary italic">{t("projects:survey.header.titleHighlight")}</span>?
                                </h1>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    {t("projects:survey.header.subtitle")}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {interests.map((interest) => (
                                    <motion.div
                                        key={interest.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleInterest(interest.id)}
                                        className={`
                      relative cursor-pointer p-8 rounded-3xl border-2 transition-all duration-300
                      ${selectedInterests.includes(interest.id)
                                                ? "border-primary bg-primary/5 shadow-xl shadow-primary/5"
                                                : "border-border hover:border-primary/50 bg-card"}
                    `}
                                    >
                                        <div className={`h-16 w-16 rounded-2xl ${interest.bg} ${interest.color} flex items-center justify-center mb-6`}>
                                            <interest.icon className="h-8 w-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">{interest.label}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {interest.description}
                                            </p>
                                        </div>
                                        <AnimatePresence>
                                            {selectedInterests.includes(interest.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                                                >
                                                    <Check className="h-4 w-4 stroke-[4]" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-center pt-6">
                                <Button
                                    size="lg"
                                    className="h-16 px-12 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20 group"
                                    onClick={handleNext}
                                >
                                    {t("projects:survey.actions.continue")}
                                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-8"
                        >
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                <Rocket className="h-32 w-32 text-primary relative animate-bounce" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black">{t("projects:survey.loading.title")}</h2>
                                <p className="text-muted-foreground">{t("projects:survey.loading.subtitle")}</p>
                            </div>
                            <div className="max-w-xs mx-auto space-y-2">
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                    <span>{t("projects:survey.loading.analyzing")}</span>
                                    <span>{t("projects:survey.loading.suggesting")}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </AppLayout>
    );
}
