import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CheckCircle,
    Loader2,
    Save,
    ChevronRight,
    User,
    FileText,
    MessageSquare,
    BarChart3,
    Star,
    Info,
    Mic,
    Video,
    Volume2,
    PlayCircle
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RubricCriterion {
    id: string;
    name: string;
    weight: number;
    levels: {
        score: number;
        label: string;
        description: string;
    }[];
}

interface GradingDetailDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    submission: {
        id: string;
        student: { name: string; avatar: string };
        assignment: string;
        class: string;
    } | null;
}

export function GradingDetailDialog({
    isOpen,
    onOpenChange,
    submission
}: GradingDetailDialogProps) {
    const { t } = useTranslation(["assignments", "common"]);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [feedback, setFeedback] = useState("");
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);

    const mockRubric: RubricCriterion[] = [
        {
            id: "accuracy",
            name: t("assignments:grading.criteria.accuracy"),
            weight: 0.5,
            levels: [
                { score: 1, label: t("assignments:grading.criteria.labels.poor"), description: t("assignments:grading.criteria.descriptions.accuracyPoor") },
                { score: 3, label: t("assignments:grading.criteria.labels.average"), description: t("assignments:grading.criteria.descriptions.accuracyAverage") },
                { score: 5, label: t("assignments:grading.criteria.labels.good"), description: t("assignments:grading.criteria.descriptions.accuracyGood") },
            ]
        },
        {
            id: "presentation",
            name: t("assignments:grading.criteria.presentation"),
            weight: 0.3,
            levels: [
                { score: 1, label: t("assignments:grading.criteria.labels.scant"), description: t("assignments:grading.criteria.descriptions.presentationScant") },
                { score: 3, label: t("assignments:grading.criteria.labels.clear"), description: t("assignments:grading.criteria.descriptions.presentationClear") },
                { score: 5, label: t("assignments:grading.criteria.labels.excellent"), description: t("assignments:grading.criteria.descriptions.presentationExcellent") },
            ]
        },
        {
            id: "effort",
            name: t("assignments:grading.criteria.effort"),
            weight: 0.2,
            levels: [
                { score: 1, label: t("assignments:grading.criteria.labels.low"), description: t("assignments:grading.criteria.descriptions.effortLow") },
                { score: 3, label: t("assignments:grading.criteria.labels.full"), description: t("assignments:grading.criteria.descriptions.effortFull") },
                { score: 5, label: t("assignments:grading.criteria.labels.exceeds"), description: t("assignments:grading.criteria.descriptions.effortExceeds") },
            ]
        }
    ];

    const feedbackChips = [
        { label: t("assignments:grading.feedback.chips.wellDone"), value: t("assignments:grading.feedback.chips.wellDone") },
        { label: t("assignments:grading.feedback.chips.careful"), value: t("assignments:grading.feedback.chips.careful") },
        { label: t("assignments:grading.feedback.chips.improvePresentation"), value: t("assignments:grading.feedback.chips.improvePresentation") },
        { label: t("assignments:grading.feedback.chips.creative"), value: t("assignments:grading.feedback.chips.creative") },
    ];

    // Initialize scores
    useEffect(() => {
        if (isOpen) {
            setScores({
                accuracy: 0,
                presentation: 0,
                effort: 0
            });
            setFeedback("");
        }
    }, [isOpen]);

    // Auto-save simulation
    useEffect(() => {
        if (feedback.length > 5 || Object.values(scores).some(s => s > 0)) {
            setIsAutoSaving(true);
            const timer = setTimeout(() => setIsAutoSaving(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [feedback, scores]);

    const calculateTotal = () => {
        let total = 0;
        mockRubric.forEach(criterion => {
            const score = scores[criterion.id] || 0;
            total += score * criterion.weight * 2; // Normalize to scale of 10
        });
        return total.toFixed(1);
    };

    const handleLevelSelect = (criterionId: string, score: number) => {
        setScores(prev => ({ ...prev, [criterionId]: score }));
    };

    const toggleRecording = (type: 'audio' | 'video') => {
        if (isRecording) {
            setIsRecording(false);
            setRecordingType(null);
            toast.success(t("assignments:grading.feedback.multimedia.saveSuccess", {
                type: type === 'audio' ? t("assignments:grading.feedback.multimedia.typeAudio") : t("assignments:grading.feedback.multimedia.typeVideo")
            }), {
                description: t("assignments:grading.feedback.multimedia.saveDescription"),
            });
        } else {
            setIsRecording(true);
            setRecordingType(type);
        }
    };

    const handleSubmit = () => {
        if (Object.values(scores).some(s => s === 0)) {
            toast.error(t("assignments:grading.messages.errorCriteria"));
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success(t("assignments:grading.messages.successTitle"), {
                description: t("assignments:grading.messages.successDescription", {
                    name: submission?.student.name,
                    score: calculateTotal()
                }),
            });
            onOpenChange(false);
        }, 2000);
    };

    if (!submission) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[1000px] h-[90vh] glass-card border-2 border-border/60 p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 pb-4 border-b border-border/40 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                                <img src={submission.student.avatar} alt={submission.student.name} className="h-full w-full object-cover rounded-full" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    {submission.student.name}
                                    <Badge variant="outline" className="text-[10px] font-normal px-1.5 h-4">ID: {submission.id}</Badge>
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <FileText className="h-3 w-3" />
                                    {submission.assignment} • {submission.class}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <AnimatePresence>
                                    {isAutoSaving && (
                                        <motion.span
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-[10px] text-muted-foreground flex items-center gap-1"
                                        >
                                            <Save className="h-2 w-2 animate-pulse" />
                                            {t("assignments:grading.previews.autoSaving")}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-bold text-primary">{t("assignments:grading.previews.totalScore", { score: calculateTotal() })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                    {/* Submission Preview (Left) */}
                    <div className="flex-1 bg-muted/20 border-r border-border/40 p-4 overflow-auto min-h-[200px] lg:min-h-0">
                        <div className="aspect-[3/4] bg-card rounded-xl border border-border/60 shadow-inner flex flex-col items-center justify-center p-8 text-center">
                            <div className="h-20 w-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                                <FileText className="h-10 w-10 text-primary/40" />
                            </div>
                            <h3 className="font-semibold text-lg text-muted-foreground">{t("assignments:grading.previews.submissionPreview")}</h3>
                            <p className="text-sm text-muted-foreground/60 max-w-xs mt-1">
                                (Simulated submission content: Student uploaded PDF/Image would be displayed here)
                            </p>
                            <Button variant="outline" className="mt-6 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
                                {t("assignments:grading.actions.openNewTab")}
                            </Button>
                        </div>
                    </div>

                    {/* Grading Interface (Right) */}
                    <div className="w-full lg:w-[450px] flex flex-col h-full bg-card/30 backdrop-blur-sm">
                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-8">
                                {/* Rubric section */}
                                <div className="space-y-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        {t("assignments:grading.previews.gradingCriteria")}
                                    </h4>

                                    {mockRubric.map((criterion) => (
                                        <div key={criterion.id} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-semibold">{criterion.name}</label>
                                                <Badge variant="secondary" className="text-[10px] opacity-70">{t("assignments:grading.previews.weight", { weight: criterion.weight * 100 })}</Badge>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {criterion.levels.map((level) => (
                                                    <TooltipProvider key={level.score}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => handleLevelSelect(criterion.id, level.score)}
                                                                    className={`
                                    relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-300
                                    ${scores[criterion.id] === level.score
                                                                            ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]'
                                                                            : 'border-border/40 hover:border-primary/30 hover:bg-muted/50'}
                                  `}
                                                                >
                                                                    {scores[criterion.id] === level.score && (
                                                                        <motion.div layoutId={`active-level-${criterion.id}`} className="absolute top-1 right-1">
                                                                            <CheckCircle className="h-3 w-3 text-primary" />
                                                                        </motion.div>
                                                                    )}
                                                                    <span className={`text-[10px] font-bold mb-0.5 ${scores[criterion.id] === level.score ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                        {level.label}
                                                                    </span>
                                                                    <span className="text-lg font-black">{level.score}</span>
                                                                </motion.button>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="bottom" className="max-w-[200px] rounded-lg p-2 text-xs">
                                                                {level.description}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="bg-border/40" />

                                {/* Feedback section */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        {t("assignments:grading.feedback.title")}
                                    </h4>
                                    <Textarea
                                        placeholder={t("assignments:grading.feedback.placeholder")}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="min-h-[120px] rounded-xl border-border/60 bg-muted/20 focus:bg-card transition-all text-sm resize-none"
                                    />

                                    {/* Quick feedback chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {feedbackChips.map(chip => (
                                            <button
                                                key={chip.label}
                                                onClick={() => setFeedback(prev => prev + (prev ? " " : "") + chip.value)}
                                                className="text-[10px] px-2 py-1 rounded-full border border-border/60 hover:border-primary hover:text-primary transition-colors bg-card"
                                            >
                                                + {chip.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Multimedia Feedback */}
                                    <div className="pt-4 space-y-3">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <Volume2 className="h-4 w-4" />
                                            {t("assignments:grading.feedback.multimedia.title")}
                                        </h4>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`flex-1 gap-2 rounded-xl h-10 transition-all ${isRecording && recordingType === 'audio' ? 'bg-destructive/10 border-destructive text-destructive animate-pulse' : ''}`}
                                                onClick={() => toggleRecording('audio')}
                                                disabled={isRecording && recordingType !== 'audio'}
                                            >
                                                <Mic className="h-4 w-4" />
                                                {isRecording && recordingType === 'audio' ? t("assignments:grading.feedback.multimedia.audio.stop") : t("assignments:grading.feedback.multimedia.audio.start")}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={`flex-1 gap-2 rounded-xl h-10 transition-all ${isRecording && recordingType === 'video' ? 'bg-destructive/10 border-destructive text-destructive animate-pulse' : ''}`}
                                                onClick={() => toggleRecording('video')}
                                                disabled={isRecording && recordingType !== 'video'}
                                            >
                                                <Video className="h-4 w-4" />
                                                {isRecording && recordingType === 'video' ? t("assignments:grading.feedback.multimedia.video.stop") : t("assignments:grading.feedback.multimedia.video.start")}
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <Info className="h-3 w-3" />
                                            {t("assignments:grading.feedback.multimedia.description")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>

                        <DialogFooter className="p-6 pt-4 border-t border-border/40 flex-row gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                className="flex-1 rounded-xl"
                                disabled={isSubmitting}
                            >
                                {t("assignments:grading.actions.cancel")}
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex-[2] rounded-xl font-bold bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
                                disabled={isSubmitting || Object.values(scores).some(s => s === 0)}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        {t("assignments:grading.actions.saving")}
                                    </>
                                ) : (
                                    t("assignments:grading.actions.completeAndSave")
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
