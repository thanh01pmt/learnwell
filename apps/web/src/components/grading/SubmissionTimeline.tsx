import React from "react";
import {
    CheckCircle2,
    XCircle,
    Clock,
    MessageSquare,
    ChevronRight,
    Sparkles,
    Search,
    ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmissionTimelineProps {
    studentId?: string;
    projectId?: string;
}

const SubmissionTimeline: React.FC<SubmissionTimelineProps> = () => {
    const { t } = useTranslation(["teacher", "common"]);
    const submissions = [
        {
            id: "sub_1",
            time: "14:32:01",
            status: "success",
            score: 100,
            notes: "Hoàn thành xuất sắc, không có lỗi logic.",
            isAI: true
        },
        {
            id: "sub_2",
            time: "14:28:45",
            status: "partial",
            score: 64,
            notes: "Vượt qua 12/15 test cases. Lỗi runtime tại input biên.",
            isAI: true
        },
        {
            id: "sub_3",
            time: "14:25:12",
            status: "error",
            score: 0,
            notes: "Syntax Error: missing ':' at line 4.",
            isAI: false
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {submissions.map((sub, i) => (
                    <div key={sub.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        {/* Timeline element */}
                        <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg z-10",
                            sub.status === "success" ? "border-success/50 text-success" :
                                sub.status === "partial" ? "border-warning/50 text-warning" : "border-destructive/50 text-destructive"
                        )}>
                            {sub.status === "success" ? <CheckCircle2 className="w-5 h-5" /> :
                                sub.status === "partial" ? <Clock className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>

                        {/* Content card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card transition-all hover:border-primary/30 hover:shadow-md cursor-pointer group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <time className="text-xs font-black font-mono text-muted-foreground">{sub.time}</time>
                                    <Badge variant="outline" className={cn(
                                        "text-[9px] px-1.5 py-0 uppercase font-black",
                                        sub.status === "success" ? "bg-success/5 text-success border-success/20" :
                                            sub.status === "partial" ? "bg-warning/5 text-warning border-warning/20" : "bg-destructive/5 text-destructive border-destructive/20"
                                    )}>
                                        {sub.status === "success" ? t('teacher:analytics.status.accepted') : sub.status === "partial" ? t('teacher:analytics.status.partial') : t('teacher:analytics.status.failed')}
                                    </Badge>
                                </div>
                                <div className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                                    {sub.score}/100
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-muted rounded">
                                        <Search className="w-3 h-3 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs font-semibold text-foreground/70 line-clamp-1">{sub.notes}</p>
                                </div>

                                {sub.isAI && (
                                    <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 rounded-lg p-2 group/ai transition-colors hover:bg-indigo-50">
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Sparkles className="w-3 h-3 text-indigo-600 fill-indigo-200" />
                                        </motion.div>
                                        <span className="text-[10px] font-bold text-indigo-700">{t('teacher:analytics.ai_feedback')}</span>
                                        <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto text-indigo-400 group-hover/ai:text-indigo-600">
                                            <ArrowRight className="w-3 h-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                    {t('teacher:submissionAnalytics.timeline.loadMore')}
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default SubmissionTimeline;
