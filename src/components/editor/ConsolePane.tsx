import React from "react";
import { useTranslation } from "react-i18next";
import { PaneWrapper } from "./PaneWrapper";
import { Terminal, ShieldCheck, Clock, Cpu, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ConsolePane: React.FC = () => {
    const { t } = useTranslation("hub");
    return (
        <PaneWrapper
            title={t("editor.ide.console.title")}
            icon={<Terminal className="h-4 w-4" />}
            actions={
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3 px-2 py-0.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-border/50">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-medium">{t("editor.workspace.console.metrics.ms", { value: 12 })}</span>
                        </div>
                        <div className="h-3 w-[1px] bg-border" />
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-medium">{t("editor.workspace.console.metrics.mb", { value: 4 })}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            <div className="p-4 flex flex-col h-full overflow-hidden">
                {/* Execution Logs */}
                <div className="flex-1 font-mono text-xs space-y-2 overflow-auto mb-4 bg-slate-950/20 p-4 rounded-xl border border-border/30">
                    <div className="flex gap-2">
                        <span className="text-blue-400 shrink-0">[10:30:01]</span>
                        <span className="text-slate-400">{t("editor.ide.console.initializing")}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-blue-400 shrink-0">[10:30:02]</span>
                        <span className="text-green-400">{t("editor.workspace.console.logs.resourcesLoaded")}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-blue-400 shrink-0">[10:30:04]</span>
                        <span className="text-slate-200">{t("editor.workspace.console.logs.runningLine", { line: 1 })}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-blue-400 shrink-0">[10:30:05]</span>
                        <span className="text-yellow-400">{t("editor.workspace.console.logs.warningFps")}</span>
                    </div>
                    <div className="animate-pulse flex gap-2">
                        <span className="text-primary shrink-0">_</span>
                    </div>
                </div>

                {/* Test Cases / Grading Status */}
                <div className="border-t border-border pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <span>{t("editor.workspace.console.testCases")}</span>
                        <span className="text-green-500 font-black">{t("editor.workspace.console.passed", { passed: 2, total: 3 })}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-[10px] font-bold text-green-700 dark:text-green-400">{t("editor.workspace.console.cases.move")}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            <span className="text-[10px] font-bold text-green-700 dark:text-green-400">{t("editor.workspace.console.cases.collision")}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                            <XCircle className="h-3.5 w-3.5 text-red-500" />
                            <span className="text-[10px] font-bold text-red-700 dark:text-red-400">{t("editor.workspace.console.cases.loop")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PaneWrapper>
    );
};
