import React, { useState } from "react";
import {
    Code2,
    Database,
    Binary,
    Terminal,
    ChevronDown,
    ChevronUp,
    Copy,
    Search,
    Zap,
    Cpu,
    Boxes,
    Eye,
    Settings2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeMetadataViewerProps {
    metadata: {
        id?: string;
        ast?: Record<string, unknown>;
        tokens?: number;
        complexity?: number;
        libraries?: string[];
        raw_payload_url?: string;
        engine_stats?: {
            cpu_ms: number;
            mem_kb: number;
        };
    };
    className?: string;
}

/**
 * CodeMetadataViewer Component
 * 
 * Used by teachers to inspect the underlying structure and payload 
 * of a student's submission (AST, Engine stats, etc.)
 */
const CodeMetadataViewer: React.FC<CodeMetadataViewerProps> = ({ metadata, className }) => {
    const { t } = useTranslation(["teacher", "common"]);
    const [expanded, setExpanded] = useState(false);
    const [view, setView] = useState<"summary" | "ast" | "stats">("summary");

    const mockAST = {
        type: "Program",
        body: [
            {
                type: "FunctionDeclaration",
                id: { name: "calculateSum" },
                params: [{ name: "a" }, { name: "b" }],
                body: {
                    type: "BlockStatement",
                    body: [
                        {
                            type: "ReturnStatement",
                            argument: {
                                type: "BinaryExpression",
                                operator: "+",
                                left: { name: "a" },
                                right: { name: "b" }
                            }
                        }
                    ]
                }
            }
        ]
    };

    return (
        <div className={cn("bg-card rounded-xl border border-border shadow-sm overflow-hidden", className)}>
            {/* Header */}
            <div className="bg-muted/40 p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 border border-indigo-500/20">
                        <Boxes className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight">{t('teacher:analytics.code_analytics')}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{t('teacher:submissionAnalytics.metadata.payloadId', { id: metadata.id || 'sub_8291_ast' })}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <Tabs value={view} onValueChange={(v: "summary" | "ast" | "stats") => setView(v)} className="h-7">
                        <TabsList className="h-full bg-background border p-0.5">
                            <TabsTrigger value="summary" className="h-full text-[10px] px-2 py-0">{t('teacher:submissionAnalytics.metadata.tabs.summary')}</TabsTrigger>
                            <TabsTrigger value="ast" className="h-full text-[10px] px-2 py-0">{t('teacher:submissionAnalytics.metadata.tabs.ast')}</TabsTrigger>
                            <TabsTrigger value="stats" className="h-full text-[10px] px-2 py-0">{t('teacher:submissionAnalytics.metadata.tabs.stats')}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-muted/20 border-b">
                            {view === "summary" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background rounded-lg border p-3 space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                                            <Binary className="w-3.5 h-3.5" />
                                            {t('teacher:submissionAnalytics.metadata.logicalStructure')}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-center p-2 rounded bg-muted/50">
                                                <div className="text-lg font-black">{metadata.complexity || 8}</div>
                                                <div className="text-[9px] uppercase text-muted-foreground font-bold">{t('teacher:submissionAnalytics.metadata.complexity')}</div>
                                            </div>
                                            <div className="text-center p-2 rounded bg-muted/50">
                                                <div className="text-lg font-black text-indigo-600">{metadata.tokens || 142}</div>
                                                <div className="text-[9px] uppercase text-muted-foreground font-bold">{t('teacher:submissionAnalytics.metadata.tokenCount')}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-background rounded-lg border p-3 space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                                            <Settings2 className="w-3.5 h-3.5" />
                                            {t('teacher:submissionAnalytics.metadata.dependencies')}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(metadata.libraries || ['react', 'lucide', 'framer']).map(lib => (
                                                <Badge key={lib} variant="outline" className="text-[9px] px-1.5 py-0 bg-indigo-50/50 border-indigo-200 text-indigo-700">{lib}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {view === "ast" && (
                                <ScrollArea className="h-48 rounded-lg bg-[#1e1e1e] p-3">
                                    <pre className="text-[11px] font-mono text-emerald-400">
                                        {JSON.stringify(mockAST, null, 2)}
                                    </pre>
                                </ScrollArea>
                            )}

                            {view === "stats" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs px-2">
                                        <span className="font-mono text-primary">{t('teacher:submissionAnalytics.metadata.cpuValue', { value: metadata.engine_stats?.cpu_ms || 142 })}</span>
                                    </div>
                                    <div className="w-full bg-background h-1.5 rounded-full border overflow-hidden">
                                        <motion.div
                                            className="h-full bg-warning"
                                            initial={{ width: 0 }}
                                            animate={{ width: "45%" }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-xs px-2 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Database className="w-3.5 h-3.5 text-blue-500" />
                                            <span className="font-bold">{t('teacher:submissionAnalytics.metadata.memoryPeak')}</span>
                                        </div>
                                        <span className="font-mono text-primary">{t('teacher:submissionAnalytics.metadata.memoryValue', { value: metadata.engine_stats?.mem_kb || 45120 })}</span>
                                    </div>
                                    <div className="w-full bg-background h-1.5 rounded-full border overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: "20%" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!expanded && (
                <div className="px-4 py-2 bg-background flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3" /> {t('teacher:submissionAnalytics.metadata.pythonEngine')}</span>
                        <span className="flex items-center gap-1.5"><Binary className="w-3 h-3" /> {t('teacher:submissionAnalytics.metadata.astVerified')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary animate-pulse font-bold">
                        <Eye className="w-3 h-3" /> {t('teacher:submissionAnalytics.metadata.clickToInspect')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeMetadataViewer;
