import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Panel,
    PanelGroup,
    PanelResizeHandle
} from "react-resizable-panels";
import {
    Play,
    Send,
    Settings,
    RotateCcw,
    Maximize2,
    ChevronDown,
    Terminal,
    BookOpen,
    History,
    FileCode,
    HelpCircle,
    Brain,
    Trophy,
    Sparkles,
    Lightbulb
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AITutorPanel } from "./components/AITutorPanel";
import { ProgressiveHints } from "./components/ProgressiveHints";


// Mock Data
const CodeIDE = () => {
    const { t } = useTranslation(["code", "common"]);

    // Updated Mock Data with translations
    const MOCK_PROBLEM = {
        id: "p1",
        title: t("code:ide.mock.p1.title"),
        difficulty: t("code:problems.easy"),
        category: t("code:ide.mock.p1.category"),
        points: 100,
        description: t("code:ide.mock.p1.description"),
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: t("code:ide.mock.p1.explanation1")
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]"
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            t("code:ide.mock.p1.constraints")
        ],
        starterCode: {
            python: `def twoSum(nums, target):\n    # ${t("code:ide.mock.p1.starter")}\n    pass`,
            javascript: `function twoSum(nums, target) {\n    // ${t("code:ide.mock.p1.starter")}\n};`,
            java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // ${t("code:ide.mock.p1.starter")}\n    }\n}`
        }
    };

    const [language, setLanguage] = useState<keyof typeof MOCK_PROBLEM.starterCode>("python");

    const [code, setCode] = useState(MOCK_PROBLEM.starterCode.python);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAITutor, setShowAITutor] = useState(true);


    const handleRun = () => {
        setIsRunning(true);
        setOutput(t("code:ide.terminal.running"));
        setTimeout(() => {
            setOutput(t("code:ide.terminal.success"));
            setIsRunning(false);
        }, 1000);
    };


    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            // Will show a success modal or toast in real impl
        }, 2000);
    };

    return (
        <div className="flex flex-col h-screen text-foreground bg-background overflow-hidden">
            {/* Header */}
            <header className="h-12 border-b border-border flex items-center justify-between px-4 bg-muted/40">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
                            <FileCode className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg hidden md:block">Code Arena</span>
                    </div>
                    <div className="h-6 w-[1px] bg-border mx-2" />
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">{MOCK_PROBLEM.id}.</span>
                        <h1 className="font-medium">{MOCK_PROBLEM.title}</h1>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20 ml-2">
                            {MOCK_PROBLEM.difficulty}
                        </Badge>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-1.5 border border-border">
                        <Trophy className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">{MOCK_PROBLEM.points} pts</span>
                    </div>
                    <Button
                        variant={showAITutor ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowAITutor(!showAITutor)}
                        className={cn("gap-2", showAITutor && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20")}
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Tutor
                    </Button>
                    <Button variant="outline" size="sm" className="bg-background hover:bg-muted border-border">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {t("code:ide.header.help")}
                    </Button>

                </div>

            </header>

            {/* Main IDE Area */}
            <main className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal">
                    {/* Problem Panel */}
                    <Panel defaultSize={30} minSize={20}>
                        <div className="h-full bg-card/50 border-r border-border">
                            <Tabs defaultValue="description" className="h-full flex flex-col">
                                <div className="px-2 pt-2 border-b border-border">
                                    <TabsList className="bg-transparent h-10 w-full justify-start gap-2">
                                        <TabsTrigger
                                            value="description"
                                            className="data-[state=active]:bg-muted data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                                        >
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            {t("code:ide.tabs.description")}
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="solutions"
                                            className="data-[state=active]:bg-muted data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                                        >
                                            <Brain className="w-4 h-4 mr-2" />
                                            {t("code:ide.tabs.solutions")}
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="submissions"
                                            className="data-[state=active]:bg-muted data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                                        >
                                            <History className="w-4 h-4 mr-2" />
                                            {t("code:ide.tabs.history")}
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="hints"
                                            className="data-[state=active]:bg-muted data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none"
                                        >
                                            <Lightbulb className="w-4 h-4 mr-2" />
                                            {t("code:ide.tabs.hints")}
                                        </TabsTrigger>

                                    </TabsList>

                                </div>

                                <ScrollArea className="flex-1">
                                    <TabsContent value="description" className="p-6 m-0">
                                        <div className="space-y-6">
                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                                                    {MOCK_PROBLEM.description}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-primary rounded-full" />
                                                    {t("code:ide.content.examples")}
                                                </h3>

                                                {MOCK_PROBLEM.examples.map((ex, idx) => (
                                                    <div key={idx} className="space-y-4 p-4 rounded-lg bg-muted/50 border border-border">
                                                        <div className="space-y-2">
                                                            <div className="text-xs font-bold text-muted-foreground uppercase">Input</div>
                                                            <code className="text-primary font-mono block bg-background p-2 rounded border border-border">{ex.input}</code>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="text-xs font-bold text-muted-foreground uppercase">Output</div>
                                                            <code className="text-foreground font-mono block bg-background p-2 rounded border border-border">{ex.output}</code>
                                                        </div>
                                                        {ex.explanation && (
                                                            <div className="text-sm text-foreground/80 italic p-2 border-l-2 border-border">
                                                                {ex.explanation}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4 pb-8">
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-primary rounded-full" />
                                                    {t("code:ide.content.constraints")}
                                                </h3>

                                                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                                                    {MOCK_PROBLEM.constraints.map((c, idx) => (
                                                        <li key={idx}><code>{c}</code></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="solutions" className="p-6">
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Brain className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                            <p>{t("code:ide.content.solutionsEmpty")}</p>
                                        </div>

                                    </TabsContent>
                                    <TabsContent value="submissions" className="p-6">
                                        <div className="text-center py-12 text-muted-foreground">
                                            <History className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                            <p>{t("code:ide.content.historyEmpty")}</p>
                                        </div>

                                    </TabsContent>
                                    <TabsContent value="hints" className="p-0 m-0">
                                        <div className="p-4">
                                            <ProgressiveHints />
                                        </div>
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>
                        </div>
                    </Panel>


                    <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" />

                    {/* Editor & Console Panel */}
                    <Panel defaultSize={70}>
                        <PanelGroup direction="vertical">
                            {/* Editor Panel */}
                            <Panel defaultSize={70} minSize={30}>
                                <div className="h-full bg-card flex flex-col">
                                    <div className="h-10 border-b border-border flex items-center justify-between px-3">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-xs font-medium hover:bg-muted gap-2 text-muted-foreground"
                                            >
                                                {language === "python" ? "Python 3" : language === "javascript" ? "JavaScript" : "Java"}
                                                <ChevronDown className="w-3 h-3" />
                                            </Button>
                                            <div className="h-4 w-[1px] bg-border mx-1" />
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                                <RotateCcw className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                                <Settings className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                                <Maximize2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Mock Editor */}
                                    <div className="flex-1 font-mono p-4 relative group bg-background">
                                        <textarea
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            spellCheck={false}
                                            className="w-full h-full bg-transparent outline-none resize-none text-foreground selection:bg-primary/30"
                                        />
                                        <div className="absolute top-4 left-0 w-8 flex flex-col items-center pointer-events-none text-muted-foreground select-none text-sm leading-[1.5rem]">
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i}>{i + 1}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-border hover:bg-primary/50 transition-colors" />

                            {/* Console Panel */}
                            <Panel defaultSize={30} minSize={10}>
                                <div className="h-full bg-card/50 flex flex-col">
                                    <div className="h-10 border-b border-border flex items-center justify-between px-4">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">Console</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={handleRun}
                                                disabled={isRunning}
                                                size="sm"
                                                variant="outline"
                                                className="bg-background hover:bg-muted h-7 px-3 border-border"
                                            >
                                                {isRunning ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                        <RotateCcw className="w-3.5 h-3.5" />
                                                    </motion.div>
                                                ) : <Play className="w-3.5 h-3.5 mr-1.5" />}
                                                Run Code
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                size="sm"
                                                variant="default"
                                                className="h-7 px-4 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                                            >
                                                {isSubmitting ? t("code:ide.terminal.submitting") : (
                                                    <div className="flex items-center">
                                                        <Send className="w-3.5 h-3.5 mr-1.5" />
                                                        Submit
                                                    </div>
                                                )}
                                            </Button>

                                        </div>
                                    </div>
                                    <ScrollArea className="flex-1 font-mono text-sm">
                                        <div className="p-4">
                                            <AnimatePresence mode="wait">
                                                {output ? (
                                                    <motion.div
                                                        key="output"
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="whitespace-pre-wrap text-success"
                                                    >
                                                        {output}
                                                    </motion.div>
                                                ) : (
                                                    <div className="text-muted-foreground italic">
                                                        {t("code:ide.terminal.placeholder")}
                                                    </div>
                                                )}

                                            </AnimatePresence>
                                        </div>
                                    </ScrollArea>
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>

                    {showAITutor && (
                        <>
                            <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" />
                            <Panel defaultSize={20} minSize={15}>
                                <div className="h-full border-l border-border">
                                    <AITutorPanel />
                                </div>
                            </Panel>
                        </>
                    )}
                </PanelGroup>

            </main>
        </div>
    );
};

export default CodeIDE;
