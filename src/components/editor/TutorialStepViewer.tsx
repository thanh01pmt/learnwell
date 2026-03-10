import React, { useState } from "react";
import {
    Video,
    ChevronLeft,
    ChevronRight,
    Play,
    CheckCircle2,
    BookOpen,
    Lightbulb,
    Maximize2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface TutorialStep {
    id: string;
    title: string;
    type: "video" | "info" | "task";
    content: string;
    videoUrl?: string;
}

const TutorialStepViewer = () => {
    const { t } = useTranslation(["editor", "common"]);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const steps: TutorialStep[] = [
        {
            id: "1",
            title: "Làm quen với Sprite",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            content: "Trong bài học này, chúng ta sẽ học cách điều khiển nhân vật chính trong Scratch."
        },
        {
            id: "2",
            title: "Câu lệnh Di chuyển",
            type: "task",
            content: "Hãy kéo khối lệnh 'di chuyển 10 bước' và gắn vào sự kiện 'khi nhấn vào 🚩'."
        }
    ];

    const currentStep = steps[currentStepIdx];

    return (
        <div className="h-full flex flex-col bg-card overflow-hidden">
            {/* Step Header */}
            <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-black tracking-widest px-2 py-0">
                        {t('editor:tutorials.step_counter', { current: currentStepIdx + 1, total: steps.length })}
                    </Badge>
                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all ${i === currentStepIdx ? 'w-6 bg-primary' : 'w-2 bg-muted'}`} />
                        ))}
                    </div>
                </div>
                <h3 className="font-bold text-lg leading-tight">{currentStep.title}</h3>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="space-y-6"
                        >
                            {currentStep.type === 'video' && currentStep.videoUrl && (
                                <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg relative group">
                                    <iframe
                                        className="w-full h-full"
                                        src={currentStep.videoUrl}
                                        title="Tutorial Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <Button variant="ghost" className="text-white hover:bg-white/20"><Maximize2 className="w-6 h-6" /></Button>
                                    </div>
                                </div>
                            )}

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-sm font-medium leading-relaxed text-foreground/80">
                                    {currentStep.content}
                                </p>
                            </div>

                            {currentStep.type === 'task' && (
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
                                        <Lightbulb className="w-3.5 h-3.5" />
                                        Nhiệm vụ của bạn
                                    </div>
                                    <ul className="space-y-2">
                                        <li className="flex gap-2 text-xs font-bold text-foreground/70 leading-snug">
                                            <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                            Gắn khối lệnh Di chuyển 10 bước.
                                        </li>
                                        <li className="flex gap-2 text-xs font-bold text-foreground/70 leading-snug opacity-40">
                                            <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                            Kết nối vào khối lệnh Khi nhấn vào 🚩.
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </ScrollArea>

            {/* Navigation Footer */}
            <div className="p-4 bg-muted/30 border-t flex items-center justify-between gap-4 pt-10">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={currentStepIdx === 0}
                    onClick={() => setCurrentStepIdx(prev => prev - 1)}
                    className="h-10 w-10 shrink-0"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    className="flex-1 h-10 gap-2 font-bold shadow-md shadow-primary/10"
                    onClick={() => currentStepIdx < steps.length - 1 && setCurrentStepIdx(prev => prev + 1)}
                >
                    {currentStepIdx === steps.length - 1 ? (
                        <>{t('editor:tutorials.finish')} <CheckCircle2 className="w-4 h-4 ml-1" /></>
                    ) : (
                        <>{t('editor:tutorials.next')} <ChevronRight className="w-4 h-4 ml-1" /></>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default TutorialStepViewer;
