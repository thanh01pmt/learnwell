import React, { useState } from "react";
import {
    Sparkles,
    BrainCircuit,
    Lightbulb,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    ChevronRight,
    RefreshCcw,
    Ghost,
    Cpu
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface AIFeedbackPanelProps {
    status: "success" | "warning" | "error" | "idle";
    feedback?: {
        summary: string;
        score?: number;
        hints: string[];
        performance_score?: number;
        clean_code_score?: number;
    };
    isLoading?: boolean;
}

const AIFeedbackPanel: React.FC<AIFeedbackPanelProps> = ({
    status = "idle",
    feedback,
    isLoading = false
}) => {
    const { t } = useTranslation(["code", "common"]);
    const [activeTab, setActiveTab] = useState<"feedback" | "analysis">("feedback");

    if (status === "idle") {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-card/20 rounded-xl border border-dashed border-border m-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <BrainCircuit className="w-8 h-8 text-muted-foreground opacity-30" />
                </div>
                <h4 className="font-bold text-sm">{t('code:ai_editor.no_results')}</h4>
                <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">{t('code:ai_editor.no_results_desc')}</p>
                <Button variant="outline" size="sm" className="mt-6 gap-2 rounded-full border-dashed group">
                    <Sparkles className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                    {t('code:ai_editor.how_it_works')}
                </Button>
            </div>
        );
    }

    return (
        <Card className="h-full flex flex-col border-none shadow-none bg-transparent m-0 overflow-hidden">
            <div className="p-4 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-b">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Sparkles className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-tighter">{t('code:ai_editor.pro_title')}</h4>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                <span className="text-[9px] font-bold text-success uppercase">{t('code:ai_editor.active_intel')}</span>
                            </div>
                        </div>
                    </div>
                    {feedback?.score && (
                        <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center bg-background p-1">
                            <div className="text-[10px] font-black text-primary">{feedback.score}<span className="text-[8px] opacity-50">%</span></div>
                        </div>
                    )}
                </div>

                <Tabs value={activeTab} onValueChange={(v: "feedback" | "analysis") => setActiveTab(v)}>
                    <TabsList className="grid grid-cols-2 h-7 bg-muted/40 p-0.5 border">
                        <TabsTrigger value="feedback" className="text-[10px] h-full font-bold uppercase transition-all">{t('code:ai_editor.tabs.feedback')}</TabsTrigger>
                        <TabsTrigger value="analysis" className="text-[10px] h-full font-bold uppercase transition-all">{t('code:ai_editor.tabs.analysis')}</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <ScrollArea className="flex-1 p-4">
                <AnimatePresence mode="wait">
                    {activeTab === "feedback" ? (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-6 pb-6"
                        >
                            {/* Summary Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 px-1.5 rounded bg-blue-50 text-blue-600 text-[9px] font-black border border-blue-100">{t('code:ai_editor.summary_title')}</div>
                                </div>
                                <p className="text-sm font-medium leading-relaxed italic text-foreground/80 border-l-2 border-primary/30 pl-3">
                                    {feedback?.summary || "Mã nguồn của bạn đã tiếp cận đúng hướng, tuy nhiên cần tối ưu vòng lặp để tránh tràn bộ nhớ khi tập dữ liệu lớn."}
                                </p>
                            </div>

                            {/* Hints List */}
                            <div className="space-y-3">
                                <h5 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2 tracking-widest">
                                    <Lightbulb className="w-3 h-3 text-warning" />
                                    {t('code:ai_editor.hints_title')}
                                </h5>
                                <div className="space-y-2">
                                    {(feedback?.hints || [
                                        "Hãy thử sử dụng `dictionary` (hoặc `Map`) thay vì vòng lặp lồng nhau.",
                                        "Kiểm tra xem bạn đã xử lý trường hợp mảng rỗng hay chưa.",
                                        "Tối ưu hóa các biến nháp không cần thiết."
                                    ]).map((hint, i) => (
                                        <div key={i} className="group p-3 rounded-lg bg-muted/30 border hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
                                            <div className="w-5 h-5 rounded bg-background flex items-center justify-center text-[10px] font-black border border-border group-hover:border-primary shrink-0 transition-colors">
                                                {i + 1}
                                            </div>
                                            <span className="text-xs font-semibold text-foreground/80 leading-snug">{hint}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="analysis"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-8 pb-6"
                        >
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">{t('code:ai_editor.performance')}</span>
                                            <span className="text-[11px] font-bold">{t('code:ai_editor.performance_score')}</span>
                                        </div>
                                        <span className="text-xs font-black text-indigo-600">82/100</span>
                                    </div>
                                    <Progress value={82} className="h-1.5" />
                                    <p className="text-[10px] text-muted-foreground">{t('code:ai_editor.perf_desc')}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">{t('code:ai_editor.clean_code')}</span>
                                            <span className="text-[11px] font-bold">{t('code:ai_editor.clean_code_score')}</span>
                                        </div>
                                        <span className="text-xs font-black text-amber-600">64/100</span>
                                    </div>
                                    <Progress value={64} className="h-1.5 bg-amber-100" />
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        <Badge variant="outline" className="text-[8px] bg-red-50 text-red-600 border-red-200">{t('code:ai_editor.naming_issue')}</Badge>
                                        <Badge variant="outline" className="text-[8px] bg-red-50 text-red-600 border-red-200">{t('code:ai_editor.line_length_issue')}</Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-3">
                                <h6 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 opacity-60">
                                    <Cpu className="w-3 h-3" />
                                    {t('code:ai_editor.engine_report')}
                                </h6>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-bold text-muted-foreground">{t('code:ai_editor.execution')}</div>
                                        <div className="text-xs font-black">{t('code:ai_editor.passed')}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-bold text-muted-foreground">{t('code:ai_editor.tests')}</div>
                                        <div className="text-xs font-black">12/15</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ScrollArea>

            <div className="p-4 border-t bg-muted/20">
                <Button variant="outline" className="w-full text-xs h-9 gap-2 shadow-sm bg-background">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    {t('code:ai_editor.re_analyze')}
                </Button>
            </div>
        </Card>
    );
};

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("bg-card rounded-xl border border-border shadow-sm", className)}>
        {children}
    </div>
);

export default AIFeedbackPanel;
