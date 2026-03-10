import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    Sword,
    Users,
    Clock,
    Trophy,
    Search,
    Loader2,
    Timer,
    MessageSquare,
    ChevronRight,
    TrendingUp,
    Zap,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickMatch: React.FC = () => {
    const { t } = useTranslation();
    const [gameState, setGameState] = useState<'lobby' | 'searching' | 'found' | 'battle' | 'results'>('lobby');
    const [searchTime, setSearchTime] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [battleTime, setBattleTime] = useState(900); // 15 minutes
    const [passedTests, setPassedTests] = useState(0);
    const [opponentPassedTests, setOpponentPassedTests] = useState(0);

    // SEARCHING STATE: Timer effect
    useEffect(() => {
        let interval: any;
        if (gameState === 'searching') {
            interval = setInterval(() => {
                setSearchTime(prev => prev + 1);
                // Mock match found after 3 seconds
                if (searchTime >= 3) {
                    setGameState('found');
                    setSearchTime(0);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, searchTime]);

    // FOUND STATE: Countdown effect
    useEffect(() => {
        let interval: any;
        if (gameState === 'found') {
            interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        setGameState('battle');
                        return 5;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    // BATTLE STATE: Timer and progress simulation
    useEffect(() => {
        let interval: any;
        if (gameState === 'battle') {
            interval = setInterval(() => {
                setBattleTime(prev => {
                    if (prev <= 1) {
                        setGameState('results');
                        return 900;
                    }
                    return prev - 1;
                });

                // Mock opponent progress
                if (Math.random() > 0.95 && opponentPassedTests < 10) {
                    setOpponentPassedTests(prev => prev + 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, opponentPassedTests]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTest = () => {
        if (passedTests < 10) {
            setPassedTests(prev => prev + 1);
            if (passedTests + 1 === 10) {
                setTimeout(() => setGameState('results'), 1000);
            }
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl min-h-[calc(100vh-4rem)]">
            <AnimatePresence mode="wait">
                {/* LOBBY STATE */}
                {gameState === 'lobby' && (
                    <motion.div
                        key="lobby"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-md mx-auto space-y-6"
                    >
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 border border-primary/20">
                                <Sword className="w-3 h-3" />
                                {t("contests:quickMatch.lobby.smallTitle" as any) as any}
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">{t("contests:quickMatch.lobby.title" as any) as any}</h1>
                            <p className="text-muted-foreground text-sm">{t("contests:quickMatch.lobby.subtitle" as any) as any}</p>
                        </div>

                        <Card className="glass-card overflow-hidden border-primary/10">
                            <CardHeader className="bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-10 h-10 border-2 border-primary/20">
                                            <AvatarImage src="/avatar.png" />
                                            <AvatarFallback>TP</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold text-sm">Tony Pham</div>
                                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <Badge variant="outline" className="h-4 px-1 text-[8px] font-bold border-green-500/30 text-green-600 bg-green-50">GOLD III</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-primary">1,452</div>
                                        <div className="text-[9px] text-muted-foreground uppercase font-bold">{t("contests:quickMatch.lobby.eloRating" as any) as any}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("contests:quickMatch.lobby.difficultyLabel" as any) as any}</Label>
                                    <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-2">
                                        {['Easy', 'Medium', 'Hard'].map((diff) => (
                                            <div key={diff}>
                                                <RadioGroupItem value={diff.toLowerCase()} id={diff} className="peer sr-only" />
                                                <Label
                                                    htmlFor={diff}
                                                    className="flex h-9 items-center justify-center rounded-lg border bg-popover text-[11px] font-bold hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-all cursor-pointer"
                                                >
                                                    {t(`contests:difficulties.${diff.toLowerCase()}` as any) as any}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="p-3 rounded-lg border bg-muted/20 text-center">
                                        <div className="text-lg font-bold">12</div>
                                        <div className="text-[9px] text-muted-foreground uppercase font-bold">{t("contests:quickMatch.lobby.wins" as any) as any}</div>
                                    </div>
                                    <div className="p-3 rounded-lg border bg-muted/20 text-center">
                                        <div className="text-lg font-bold">8</div>
                                        <div className="text-[9px] text-muted-foreground uppercase font-bold">{t("contests:quickMatch.lobby.losses" as any) as any}</div>
                                    </div>
                                </div>

                                <Button className="w-full h-12 text-sm font-bold gap-2 shadow-lg shadow-primary/20" onClick={() => setGameState('searching')}>
                                    <Search className="w-4 h-4" /> {t("contests:quickMatch.lobby.startAction" as any) as any}
                                </Button>
                            </CardContent>
                            <CardFooter className="bg-muted/30 p-3 border-t">
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mx-auto font-medium">
                                    <Users className="w-3 h-3" /> {t("contests:quickMatch.lobby.onlineCount" as any, { count: 124 } as any) as any}
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {/* SEARCHING STATE */}
                {gameState === 'searching' && (
                    <motion.div
                        key="searching"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 space-y-8"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-x-[-100px] inset-y-[-100px] m-auto bg-primary/20 rounded-full blur-3xl"
                            />
                            <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30 animate-spin-slow flex items-center justify-center relative z-10">
                                <Search className="w-10 h-10 text-primary animate-pulse" />
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold">{t("contests:quickMatch.searching.title" as any) as any}</h2>
                            <p className="text-muted-foreground font-mono text-sm">{t("contests:quickMatch.searching.timer" as any, { time: searchTime } as any) as any}</p>
                        </div>

                        <Button variant="ghost" className="text-muted-foreground" onClick={() => setGameState('lobby')}>{t("contests:quickMatch.searching.cancel" as any) as any}</Button>
                    </motion.div>
                )}

                {/* MATCH FOUND STATE */}
                {gameState === 'found' && (
                    <motion.div
                        key="found"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg mx-auto space-y-8 py-10"
                    >
                        <h2 className="text-4xl font-black text-center italic text-primary animate-pulse tracking-tighter uppercase">{t("contests:quickMatch.found.title" as any) as any}</h2>

                        <div className="flex items-center justify-center gap-12 relative">
                            {/* VS Divider */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <div className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center text-xl font-black italic shadow-xl">VS</div>
                            </div>

                            {/* Player 1 */}
                            <div className="flex flex-col items-center gap-3">
                                <Avatar className="w-24 h-24 border-4 border-primary shadow-xl">
                                    <AvatarImage src="/p1.png" />
                                    <AvatarFallback className="bg-primary text-primary-foreground font-black text-2xl">YOU</AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <div className="font-bold">Tony Pham</div>
                                    <Badge variant="outline" className="mt-1 border-primary/20 text-[10px]">1,452 ELO</Badge>
                                </div>
                            </div>

                            {/* Player 2 */}
                            <div className="flex flex-col items-center gap-3">
                                <Avatar className="w-24 h-24 border-4 border-destructive shadow-xl">
                                    <AvatarImage src="/p2.png" />
                                    <AvatarFallback className="bg-destructive text-destructive-foreground font-black text-2xl">H.A</AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <div className="font-bold">{t("contests:quickMatch.results.opponentName")}</div>
                                    <Badge variant="outline" className="mt-1 border-destructive/20 text-[10px]">1,489 ELO</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-muted/40 border border-muted-foreground/10">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{t("contests:quickMatch.found.countdownLabel" as any) as any}</div>
                            <div className="text-6xl font-black tabular-nums text-primary">{countdown}</div>
                        </div>
                    </motion.div>
                )}

                {/* BATTLE STATE */}
                {gameState === 'battle' && (
                    <motion.div
                        key="battle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6"
                    >
                        {/* Split Arena */}
                        <div className="space-y-4">
                            <header className="flex items-center justify-between p-4 bg-muted/30 border rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-sm">Two Sum ({t("contests:difficulty.medium")})</h2>
                                        <p className="text-[10px] text-muted-foreground">{t("contests:mock.problemDesc1")}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-xs font-bold text-primary font-mono">{formatTime(battleTime)}</div>
                                        <div className="text-[8px] text-muted-foreground uppercase font-bold">{t("contests:quickMatch.battle.remaining" as any) as any}</div>
                                    </div>
                                    <div className="h-8 w-[1px] bg-border" />
                                    <Button size="sm" onClick={handleTest} className="gap-1.5 h-8 font-bold text-[10px]">
                                        <PlayCircle className="w-3.5 h-3.5" /> {t("contests:quickMatch.battle.runAction" as any) as any}
                                    </Button>
                                </div>
                            </header>

                            <div className="aspect-video w-full rounded-xl border bg-zinc-950 flex flex-col overflow-hidden">
                                {/* Simplified IDE UI */}
                                <div className="h-8 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    <span className="text-[10px] text-white/30 font-mono ml-2">solution.py</span>
                                </div>
                                <div className="flex-1 p-6 font-mono text-sm text-green-400 leading-relaxed">
                                    <span className="text-pink-400">def</span> <span className="text-blue-400">twoSum</span>(nums, target):<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;hash_map = { }<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">for</span> i, num <span className="text-pink-400">in</span> <span className="text-blue-400">enumerate</span>(nums):<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;complement = target - num<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-muted-foreground">{t("contests:quickMatch.battle.mockTyping" as any) as any}</span>
                                </div>
                            </div>
                        </div>

                        {/* Battle Feed */}
                        <aside className="space-y-6 flex flex-col h-full">
                            {/* Opponent Status */}
                            <Card className="border-destructive/20 bg-destructive/5 overflow-hidden">
                                <CardHeader className="p-3 border-b border-destructive/10">
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Avatar className="w-8 h-8 border border-destructive/20">
                                                <AvatarImage src="/opponent.png" />
                                                <AvatarFallback>HA</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-background animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold">{t("contests:quickMatch.results.opponentName")}</div>
                                            <Badge className="h-3 text-[7px] bg-destructive/10 text-destructive border-none px-1 uppercase tracking-widest">{t("contests:quickMatch.battle.opponentLabel")}</Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-3 space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-muted-foreground tracking-tighter uppercase font-medium">Test Cases</span>
                                            <span>{opponentPassedTests}/10</span>
                                        </div>
                                        <Progress value={opponentPassedTests * 10} className="h-1 bg-muted border-none overflow-hidden [&>div]:bg-destructive" />
                                    </div>
                                    <div className="flex items-center gap-2 text-[9px] text-destructive/80 italic font-medium">
                                        <Clock className="w-2.5 h-2.5 animate-spin-slow" /> {t("contests:quickMatch.battle.mockAction" as any) as any}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Your Status */}
                            <Card className="border-primary/20 bg-primary/5 overflow-hidden">
                                <CardHeader className="p-3 border-b border-primary/10">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8 border border-primary/20">
                                            <AvatarFallback>YOU</AvatarFallback>
                                        </Avatar>
                                        <div className="text-[10px] font-bold">Tony Pham ({t("contests:quickMatch.results.youLabel")})</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-3 space-y-3">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold">
                                            <span className="text-muted-foreground tracking-tighter uppercase font-medium">Test Cases</span>
                                            <span>{passedTests}/10</span>
                                        </div>
                                        <Progress value={passedTests * 10} className="h-1 bg-muted border-none overflow-hidden [&>div]:bg-primary" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Battle Feed */}
                            <ScrollArea className="flex-1 border rounded-xl bg-muted/20">
                                <div className="p-3 space-y-3">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("contests:quickMatch.battle.feedTitle" as any) as any}</h4>
                                    {[
                                        { time: '12:45', msg: t("contests:quickMatch.battle.startFeed" as any) as any, type: 'info' },
                                        { time: '10:30', msg: t("contests:quickMatch.battle.opponentAction" as any, { num: 1 } as any) as any, type: 'opponent' },
                                        { time: '09:12', msg: t("contests:quickMatch.battle.playerAction" as any, { num: 1 } as any) as any, type: 'player' },
                                        { time: '08:45', msg: t("contests:quickMatch.battle.mockAction" as any) as any, type: 'opponent' },
                                    ].map((feed, i) => (
                                        <div key={i} className="flex gap-2 text-[10px]">
                                            <span className="text-muted-foreground/50 font-mono">{feed.time}</span>
                                            <span className={cn(
                                                feed.type === 'player' ? 'text-primary' :
                                                    feed.type === 'opponent' ? 'text-destructive' :
                                                        'text-muted-foreground'
                                            )}>

                                                {feed.msg}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </aside>
                    </motion.div>
                )}

                {/* RESULTS STATE */}
                {gameState === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto space-y-8 py-10"
                    >
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ rotate: -10, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                className="inline-block p-4 rounded-full bg-amber-500 text-white shadow-2xl shadow-amber-500/20 mb-4"
                            >
                                <Trophy className="w-12 h-12" />
                            </motion.div>
                            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">{t("contests:quickMatch.results.victoryTitle")}</h1>
                            <p className="text-muted-foreground">{t("contests:quickMatch.results.victoryDesc")}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="absolute inset-x-0 top-1/2 flex items-center justify-center pointer-events-none -translate-y-1/2 z-10">
                                <Badge className="bg-muted text-foreground border-none font-bold italic tracking-tighter text-lg px-4 shadow-xl">VS</Badge>
                            </div>

                            {/* You */}
                            <Card className="border-green-500/30 bg-green-500/5 overflow-hidden">
                                <CardHeader className="p-4 items-center text-center">
                                    <Avatar className="w-16 h-16 border-4 border-green-500/20 mb-3">
                                        <AvatarFallback>YOU</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-bold">Tony Pham</h3>
                                    <Badge variant="outline" className="text-[9px] border-green-500/20 bg-green-50 text-green-600">VICTORY</Badge>
                                </CardHeader>
                                <CardContent className="p-4 bg-muted/30 border-t space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{t("contests:quickMatch.results.newRank" as any) as any}</span>
                                        <div className="flex items-center gap-1 text-green-600 font-bold">
                                            <TrendingUp className="w-3 h-3" /> +24 ELO
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-center tabular-nums">1,476</div>
                                </CardContent>
                            </Card>

                            {/* Opponent */}
                            <Card className="border-destructive/10 opacity-70 grayscale-[0.5] overflow-hidden">
                                <CardHeader className="p-4 items-center text-center">
                                    <Avatar className="w-16 h-16 border-4 border-destructive/10 mb-3">
                                        <AvatarImage src="/opponent.png" />
                                        <AvatarFallback>HA</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-bold">{t("contests:quickMatch.results.opponentName")}</h3>
                                    <Badge variant="outline" className="text-[9px] uppercase">{t("contests:quickMatch.results.defeatTitle")}</Badge>
                                </CardHeader>
                                <CardContent className="p-4 bg-muted/30 border-t space-y-4 text-muted-foreground">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-bold">{t("contests:quickMatch.results.newRank" as any) as any}</span>
                                        <div className="flex items-center gap-1 font-bold">
                                            -18 ELO
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-center tabular-nums">1,471</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex grid-cols-2 gap-4">
                            <Button variant="outline" className="flex-1 h-12 uppercase tracking-widest font-black italic text-xs border-primary/20">
                                <MessageSquare className="w-4 h-4 mr-2" /> {t("contests:quickMatch.results.chatAction")}
                            </Button>
                            <Button className="flex-1 h-12 uppercase tracking-widest font-black italic text-xs shadow-xl shadow-primary/20" onClick={() => setGameState('lobby')}>
                                {t("contests:quickMatch.results.continueAction")}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Simplified lucide export simulation if missing locally
const PlayCircle = ({ className }: { className?: string }) => <ChevronRight className={className} />;
