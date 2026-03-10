import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Trophy,
    MessageSquare,
    LayoutGrid,
    Settings,
    Play,
    Send,
    ChevronLeft,
    Clock,
    Medal,
    Users,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Panel,
    PanelGroup,
    PanelResizeHandle
} from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ContestArena = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
    const [activeProblem, setActiveProblem] = useState("A");
    const [consoleOutput, setConsoleOutput] = useState<{ type: string; msg: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Countdown effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleRun = () => {
        setConsoleOutput([
            { type: "info", msg: t("contests:arena.console.compiling" as any) as any },
            { type: "success", msg: t("contests:arena.console.compileSuccess" as any) as any },
            { type: "output", msg: "Input: [2,7,11,15], target = 9" },
            { type: "output", msg: "Output: [0,1]" },
            { type: "output", msg: "Expected: [0,1]" },
            { type: "success", msg: t("contests:arena.console.testPass" as any) as any },
        ]);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setConsoleOutput([
                { type: "info", msg: t("contests:arena.console.submitting" as any) as any },
                { type: "success", msg: "Accepted - 100pts" },
            ]);
        }, 1500);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background text-foreground">
            {/* Contest Header */}
            <header className="h-16 border-b border-border bg-muted/40 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/contests/${id}`)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        {t("contests:arena.actions.leave" as any) as any}
                    </Button>
                    <div className="h-6 w-[1px] bg-border" />
                    <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-primary" />
                        <h1 className="font-black tracking-tight text-lg">Spring Arena 2026</h1>
                        <Badge className="bg-red-500 text-[10px] animate-pulse">{t("contests:status.live" as any) as any}</Badge>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border font-mono">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className={cn(timeLeft < 300 ? "text-red-500 font-bold" : "text-foreground")}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <MessageSquare className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Settings className="w-5 h-5" />
                        </Button>
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold border border-primary/20 text-primary-foreground">
                            T
                        </div>
                    </div>
                </div>
            </header>

            {/* Problem Navigation Bar */}
            <div className="h-12 bg-card border-b border-border flex items-center px-6 gap-2">
                {["A", "B", "C", "D"].map((p) => (
                    <button
                        key={p}
                        onClick={() => setActiveProblem(p)}
                        className={cn(
                            "h-full px-6 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
                            activeProblem === p
                                ? "border-primary text-primary bg-primary/5"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {t("contests:arena.navigation.problem" as any, { p } as any) as any}
                        {p === "A" && <CheckCircle2 className="w-3 h-3 text-primary" />}
                    </button>
                ))}
            </div>

            {/* Main Arena Content */}
            <main className="flex-1 flex overflow-hidden">
                <PanelGroup direction="horizontal">
                    {/* Left: Problem Statement */}
                    <Panel defaultSize={30} minSize={20}>
                        <div className="h-full border-r border-border">
                            <ScrollArea className="h-full p-6">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl font-bold">{t("contests:arena.navigation.problem" as any, { p: activeProblem } as any) as any}: {t("contests:mock.problemTitle1" as any) as any}</h2>
                                        <Badge variant="outline" className="border-primary/20 text-primary px-3">100 Pts</Badge>
                                    </div>

                                    <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed dark:prose-invert">
                                        <p dangerouslySetInnerHTML={{ __html: t("contests:mock.problemDesc1" as any) as any }} />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">{t("contests:arena.problem.example" as any, { n: 1 } as any) as any}</h3>
                                        <div className="bg-muted/50 p-4 rounded-xl border border-border font-mono text-xs space-y-2">
                                            <div className="text-muted-foreground">Input: <span className="text-foreground">nums = [2,7,11,15], target = 9</span></div>
                                            <div className="text-muted-foreground">Output: <span className="text-foreground">[0,1]</span></div>
                                            <div className="text-muted-foreground/80 mt-2 italic text-[10px]">{t("contests:mock.explanation1" as any) as any}</div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border">
                                        <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">{t("contests:arena.problem.additionalInfo" as any) as any}</h3>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <Badge variant="outline" className="bg-muted border-none text-muted-foreground">{t("contests:arena.problem.memory" as any, { size: "256MB" } as any) as any}</Badge>
                                            <Badge variant="outline" className="bg-muted border-none text-muted-foreground">{t("contests:arena.problem.timeLimit" as any, { time: "2.0s" } as any) as any}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </Panel>

                    <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors" />

                    {/* Right: Editor & Console */}
                    <Panel defaultSize={70}>
                        <PanelGroup direction="vertical">
                            <Panel defaultSize={70} minSize={30}>
                                <div className="h-full bg-card relative">
                                    {/* Mock Editor Area */}
                                    <div className="absolute inset-0 p-6 font-mono text-sm leading-relaxed overflow-hidden">
                                        <div className="flex gap-4">
                                            <div className="text-muted-foreground/50 select-none text-right w-8">
                                                {Array.from({ length: 15 }).map((_, i) => (
                                                    <div key={i}>{i + 1}</div>
                                                ))}
                                            </div>
                                            <div className="text-foreground whitespace-pre">
                                                <span className="text-pink-500">class</span> <span className="text-yellow-500">Solution</span>:<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">def</span> <span className="text-blue-500">twoSum</span>(self, nums: List[int], target: int) -{">"} List[int]:<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prevMap = { } <span className="text-muted-foreground/50"># val : index</span><br /><br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">for</span> i, n <span className="text-pink-500">in</span> enumerate(nums):<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diff = target - n<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">if</span> diff <span className="text-pink-500">in</span> prevMap:<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">return</span> [prevMap[diff], i]<br />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prevMap[n] = i<br />
                                                <span className="animate-pulse border-l-2 border-primary ml-1 h-4 inline-block" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Action Buttons */}
                                    <div className="absolute bottom-6 right-6 flex gap-3">
                                        <Button
                                            onClick={handleRun}
                                            variant="secondary"
                                            className="bg-background/80 hover:bg-background text-foreground gap-2 px-6 backdrop-blur-md border border-border"
                                        >
                                            <Play className="w-4 h-4" />
                                            {t("contests:arena.actions.run" as any) as any}
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="bg-primary hover:bg-primary/90 text-white gap-2 px-8 shadow-xl shadow-primary/20"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                            {t("contests:arena.actions.submit" as any) as any}
                                        </Button>
                                    </div>
                                </div>
                            </Panel>

                            <PanelResizeHandle className="h-1 bg-border hover:bg-primary/50 transition-colors" />

                            <Panel defaultSize={30} minSize={10}>
                                <div className="h-full bg-card flex flex-col">
                                    <div className="h-10 px-6 border-b border-border flex items-center justify-between bg-muted/30">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{t("contests:arena.console.title" as any) as any}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setConsoleOutput([])}
                                            className="h-6 text-[10px] text-muted-foreground hover:text-foreground"
                                        >
                                            {t("contests:arena.console.clear" as any) as any}
                                        </Button>
                                    </div>
                                    <ScrollArea className="flex-1 p-6 font-mono text-sm">
                                        <AnimatePresence>
                                            {consoleOutput.map((log, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={cn(
                                                        "mb-2",
                                                        log.type === "success" ? "text-primary" :
                                                            log.type === "error" ? "text-red-500" :
                                                                log.type === "info" ? "text-primary" : "text-muted-foreground"
                                                    )}
                                                >
                                                    {log.type === "info" && "➜ "}
                                                    {log.msg}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {consoleOutput.length === 0 && (
                                            <div className="text-muted-foreground/50 italic text-xs">{t("contests:arena.console.empty" as any) as any}</div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </main>

            {/* Bottom Status Bar */}
            <footer className="h-10 border-t border-border bg-muted/40 px-6 flex items-center justify-between text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                <div className="flex gap-6">
                    <span className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-primary" />
                        {t("contests:arena.footer.online" as any, { count: "1,245" } as any) as any}
                    </span>
                    <span className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        {t("contests:arena.footer.latency" as any, { ms: 12 } as any) as any}
                    </span>
                </div>
                <div className="flex gap-6">
                    <span className="text-muted-foreground/50 italic">{t("contests:arena.footer.autosave" as any, { time: "2 min" } as any) as any}</span>
                    <span className="text-primary hover:text-primary/100 cursor-pointer">{t("contests:arena.footer.support" as any) as any}</span>
                </div>
            </footer>
        </div>
    );
};

export default ContestArena;
