import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PaneWrapper } from "./PaneWrapper";
import { BookOpen, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface TutorialStep {
    title: string;
    content: string;
    video?: boolean;
}

export const TutorialPane: React.FC = () => {
    const { t } = useTranslation("hub");
    const [currentStep, setCurrentStep] = useState(0);

    const steps = (t("editor.workspace.tutorial.steps", { returnObjects: true }) as TutorialStep[]) || [
        {
            title: "Loading...",
            content: "...",
            video: true
        }
    ];

    const nextStep = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
    const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

    return (
        <PaneWrapper
            title={t("editor.workspace.tutorial.title")}
            icon={<BookOpen className="h-4 w-4" />}
            actions={
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={prevStep} disabled={currentStep === 0}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-[10px] font-medium w-8 text-center">
                        {currentStep + 1}/{steps.length}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            <div className="p-4 space-y-6">
                <div className="space-y-2">
                    <Progress value={((currentStep + 1) / steps.length) * 100} className="h-1" />
                    <p className="text-[10px] text-muted-foreground text-right italic font-medium">
                        {t("editor.workspace.tutorial.completed", { percent: Math.round(((currentStep + 1) / steps.length) * 100) })}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h4 className="font-bold text-lg text-primary">{steps[currentStep].title}</h4>

                        {steps[currentStep].video && (
                            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center border border-white/5 relative group cursor-pointer overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                                <PlayCircle className="h-12 w-12 text-primary group-hover:scale-110 transition-transform relative z-10" />
                                <p className="text-[10px] uppercase tracking-widest mt-2 font-bold text-white/60 relative z-10">
                                    {t("editor.workspace.tutorial.viewVideo")}
                                </p>
                            </div>
                        )}

                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p className="text-sm leading-relaxed text-muted-foreground">{steps[currentStep].content}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="pt-4 border-t border-border flex gap-2">
                    <Button className="w-full rounded-xl" size="sm" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                        {t("editor.workspace.tutorial.next")}
                    </Button>
                </div>
            </div>
        </PaneWrapper>
    );
};
