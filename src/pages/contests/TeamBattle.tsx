import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
    Users,
    Shield,
    Zap,
    MessageSquare,
    Send,
    Flag,
    ArrowRight,
    Trophy,
    Clock,
    Mic,
    Video,
    Play,
    ChevronRight,
    HandMetal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

export const TeamBattle: React.FC = () => {
    const { t } = useTranslation();
    const [view, setView] = useState<'lobby' | 'battle'>('lobby');
    const [teamStatus, setTeamStatus] = useState<'ready' | 'waiting'>('waiting');
    const [activePlayer, setActivePlayer] = useState(0); // Index of team member currently coding

    const teamMembers = [
        { name: 'Tony Pham', role: 'Leader', status: 'ready', avatar: 'TP' },
        { name: 'classroom:mocks.students.haianh', role: 'Support', status: 'ready', avatar: 'HA' },
        { name: 'classroom:mocks.students.tuankiet', role: 'Architect', status: 'waiting', avatar: 'MT' },
    ];

    const opponents = [
        { name: 'contests:teamBattle.mock.opponent1', clan: 'contests:teamBattle.mock.clanName', score: 450 },
        { name: 'contests:teamBattle.mock.opponent2', clan: 'contests:teamBattle.mock.clanName', score: 380 },
        { name: 'contests:teamBattle.mock.opponent3', clan: 'contests:teamBattle.mock.clanName', score: 410 },
    ];

    const handleStart = () => setView('battle');

    if (view === 'lobby') {
        return (
            <div className="container mx-auto py-8 px-4 max-w-5xl space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                            <Shield className="w-4 h-4" />
                            {t("contests:teamBattle.lobby.smallTitle" as any) as any}
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter">{t("contests:teamBattle.lobby.title" as any) as any}</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" /> {t("contests:teamBattle.lobby.yourTeamLabel" as any) as any} <span className="text-foreground font-bold underline">{t("contests:teamBattle.mock.teamName" as any)}</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary/5">
                            <Mic className="w-4 h-4" /> {t("contests:teamBattle.lobby.voiceChatAction" as any) as any}
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Flag className="w-4 h-4" /> {t("contests:teamBattle.lobby.inviteMemberAction" as any) as any}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Team Lobby List */}
                        <Card className="glass-card border-primary/20 bg-primary/5 shadow-xl shadow-primary/5">
                            <CardHeader className="pb-2">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{t("contests:teamBattle.lobby.memberCount" as any, { current: 3, max: 5 } as any) as any}</h3>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {teamMembers.map((member, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <Avatar className="w-12 h-12 border-2 border-primary/20">
                                                    <AvatarFallback className="font-bold">{member.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${member.status === 'ready' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                                            </div>
                                            <div>
                                                <div className="font-bold flex items-center gap-2">
                                                    {member.name.includes(':') ? t(member.name as any) : member.name}
                                                    {member.role === 'Leader' && <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] px-1 h-3.5">{t("contests:teamBattle.lobby.leaderTag" as any) as any}</Badge>}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">{member.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant="outline" className={`text-[10px] ${member.status === 'ready' ? 'border-green-500/30 text-green-600' : 'border-amber-500/30 text-amber-600'}`}>
                                                {member.status === 'ready' ? t("contests:teamBattle.lobby.readyStatus" as any) as any : t("contests:teamBattle.lobby.waitingStatus" as any) as any}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-40"><ArrowRight className="w-4 h-4" /></Button>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="border border-dashed border-primary/20 rounded-xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-primary/5 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-xs font-medium">{t("contests:teamBattle.lobby.waitingForOthers" as any) as any}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-primary/10 p-6 flex justify-between items-center">
                                <div className="text-xs text-muted-foreground italic">{t("contests:teamBattle.lobby.autoStartNote" as any) as any}</div>
                                <Button className="gap-2 bg-primary hover:bg-primary/90 font-black italic tracking-tighter" onClick={handleStart} disabled={teamStatus === 'waiting'}>
                                    {t("contests:teamBattle.lobby.playAction" as any) as any} <Shield className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Quick Chat in Lobby */}
                        <Card className="glass-card h-64 flex flex-col">
                            <CardHeader className="py-3 bg-muted/30 border-b">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5" /> {t("contests:teamBattle.lobby.chatTitle" as any) as any}
                                </h3>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                                <div className="text-[10px] bg-muted inline-block p-1.5 rounded-lg"><strong>{t("classroom:mocks.students.haianh")}:</strong> {t("contests:teamBattle.chatLobby.m1")}</div>
                                <div className="text-[10px] bg-primary/10 border border-primary/10 inline-block p-1.5 rounded-lg"><strong>Tony Pham:</strong> {t("contests:teamBattle.chatLobby.m2")}</div>
                            </CardContent>
                            <CardFooter className="p-3 border-t flex gap-2">
                                <Input className="h-8 text-xs placeholder:text-[10px]" placeholder={t("contests:teamBattle.lobby.chatPlaceholder" as any) as any} />
                                <Button size="icon" className="h-8 w-8 shrink-0"><Send className="w-3.5 h-3.5" /></Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <h3 className="font-bold text-sm">{t("contests:teamBattle.lobby.modeTitle" as any) as any}</h3>
                            </CardHeader>
                            <CardContent className="text-[11px] text-muted-foreground space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">1</div>
                                    <p dangerouslySetInnerHTML={{ __html: t("contests:teamBattle.lobby.modeDesc1" as any) as any }} />
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">2</div>
                                    <p>{t("contests:teamBattle.lobby.modeDesc2" as any) as any}</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">3</div>
                                    <p dangerouslySetInnerHTML={{ __html: t("contests:teamBattle.lobby.modeDesc3" as any) as any }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-red-500/20 bg-red-500/5">
                            <CardHeader className="pb-2">
                                <h3 className="text-[10px] font-bold text-red-600 uppercase">{t("contests:teamBattle.lobby.rivalTitle" as any) as any}</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black italic">DK</div>
                                    <div>
                                        <div className="text-sm font-bold">{t("contests:teamBattle.mock.clanName" as any)}</div>
                                        <div className="text-[9px] uppercase font-bold text-muted-foreground">Clan LVL. 12</div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span>{t("contests:teamBattle.lobby.avgElo" as any) as any}</span>
                                    <span className="font-bold">1,620</span>
                                </div>
                                <Progress value={85} className="h-1 bg-red-100 [&>div]:bg-red-600" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // BATTLE VIEW (MOCK)
    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            <header className="h-14 border-b bg-muted/40 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Badge className="bg-red-600 border-none font-bold italic h-6 px-2">{t("contests:teamBattle.battle.liveTag" as any) as any}</Badge>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{t("contests:teamBattle.battle.problemLabel" as any) as any}</span>
                        <span className="text-sm font-bold">{t("contests:teamBattle.mock.problemTitle" as any)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 w-8 rounded-full ${i === 1 ? 'bg-primary' : 'bg-muted'}`} />
                        ))}
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black italic tabular-nums text-primary">04:12</span>
                        <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
                    </div>
                    <div className="h-8 w-[1px] bg-border" />
                    <div className="flex -space-x-2">
                        {teamMembers.map((m, i) => (
                            <Avatar key={i} className={`w-8 h-8 border-2 border-background ring-2 ${i === activePlayer ? 'ring-primary' : 'ring-transparent'}`}>
                                <AvatarFallback className="text-[10px]">{m.avatar}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden grid grid-cols-[1fr,320px]">
                {/* Main Relay Coding Area */}
                <div className="flex flex-col relative">
                    <div className="flex-1 bg-zinc-950 p-8 font-mono text-sm leading-loose">
                        <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6 text-primary animate-pulse">
                            <HandMetal className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">{t("contests:teamBattle.battle.yourTurnLabel" as any, { name: "TONY PHAM" } as any) as any}</span>
                        </div>

                        <span className="text-pink-400">class</span> <span className="text-blue-400">TaskRunner</span>:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-400">self</span>, concurrency):<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.concurrency = concurrency<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.queue = []<br /><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/30">{t("contests:teamBattle.battle.mockTyping" as any) as any}</span>
                    </div>

                    {/* Member Notification Overlay */}
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-primary/20 flex items-center justify-between shadow-2xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-amber-600">{t("contests:teamBattle.battle.timeWarningTitle" as any) as any}</div>
                                    <div className="text-[10px] text-muted-foreground" dangerouslySetInnerHTML={{ __html: t("contests:teamBattle.battle.timeWarningDesc" as any, { seconds: 48, name: t("classroom:mocks.students.haianh") } as any) as any }} />
                                </div>
                            </div>
                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 gap-2 h-8 text-[10px] font-bold italic">
                                {t("contests:teamBattle.battle.handoverAction" as any) as any} <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Tactical Overview Sidebar */}
                <aside className="border-l bg-muted/20 flex flex-col">
                    <Tabs defaultValue="intel" className="flex-1 flex flex-col">
                        <TabsList className="w-full h-12 rounded-none border-b bg-transparent px-2">
                            <TabsTrigger value="intel" className="flex-1 text-[10px] font-bold">{t("contests:teamBattle.battle.intel" as any) as any}</TabsTrigger>
                            <TabsTrigger value="comms" className="flex-1 text-[10px] font-bold">{t("contests:teamBattle.battle.comms" as any) as any} (9+)</TabsTrigger>
                        </TabsList>

                        <TabsContent value="intel" className="flex-1 p-6 space-y-8 overflow-y-auto m-0">
                            {/* Global Progress */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                                    <Trophy className="w-3.5 h-3.5 text-amber-500" /> {t("contests:teamBattle.battle.standingsTitle" as any) as any}
                                </h4>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold">Antigravity</span>
                                            <span className="text-primary font-black">42%</span>
                                        </div>
                                        <Progress value={42} className="h-1.5 bg-muted [&>div]:bg-primary" />
                                        <div className="flex justify-between text-[9px] text-muted-foreground italic">
                                            <span>{t("contests:teamBattle.mock.phase2" as any)}</span>
                                            <span>MVP: TONY PHAM</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-bold">{t("contests:teamBattle.mock.clanName" as any)}</span>
                                            <span className="text-red-500 font-black">35%</span>
                                        </div>
                                        <Progress value={35} className="h-1.5 bg-muted [&>div]:bg-red-500" />
                                        <div className="flex justify-between text-[9px] text-muted-foreground italic">
                                            <span>{t("contests:teamBattle.mock.phase1" as any)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tactical Advice (AI) */}
                            <div className="p-4 rounded-xl bg-background border border-primary/20 shadow-lg shadow-primary/5 space-y-2">
                                <div className="flex items-center gap-2 text-primary font-bold text-[10px]">
                                    <Shield className="w-3 h-3" /> {t("contests:teamBattle.battle.aiSuggestionTitle" as any) as any}
                                </div>
                                <p className="text-[10px] leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: t("contests:teamBattle.mock.aiSuggestion" as any) as any }} />
                            </div>

                            {/* Quick Commands */}
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="h-8 text-[9px] font-bold border-muted-foreground/20">{t("contests:teamBattle.reportError")}</Button>
                                <Button variant="outline" className="h-8 text-[9px] font-bold border-muted-foreground/20">{t("contests:teamBattle.hint")}</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="comms" className="flex-1 p-4 m-0 flex flex-col bg-background/50">
                            <div className="flex-1 space-y-4 overflow-y-auto pr-2 mb-4">
                                <div className="text-[10px] p-2 rounded-lg bg-muted self-start max-w-[80%]">
                                    <strong>{t("classroom:mocks.students.haianh")}:</strong> {t("contests:teamBattle.chat.m1")}
                                </div>
                                <div className="text-[10px] p-2 rounded-lg bg-primary/20 text-primary self-end max-w-[80%] flex flex-col ml-auto">
                                    <span className="font-bold">{t("common:labels.you")}:</span> {t("contests:teamBattle.chat.m2")}
                                </div>
                            </div>
                            <div className="pt-4 border-t flex gap-2">
                                <Input className="h-8 text-xs h-9" placeholder="Quick response..." />
                            </div>
                        </TabsContent>
                    </Tabs>
                </aside>
            </main>
        </div>
    );
};
