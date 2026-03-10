import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sparkles,
    Map,
    Target,
    Clock,
    ChevronRight,
    CheckCircle2,
    Circle,
    Lock,
    RefreshCcw,
    LayoutDashboard,
    BrainCircuit,
    Rocket,
    Info as LucideInfo
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRoadmapSteps } from '@/mocks/data';

export const PersonalizedRoadmap: React.FC = () => {
    const { t } = useTranslation(['student', 'common']);
    const [hasRoadmap, setHasRoadmap] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [step, setStep] = useState(1);


    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setHasRoadmap(true);
        }, 3000);
    };

    if (!hasRoadmap) {
        return (
            <div className="container mx-auto max-w-2xl py-12 px-4">
                <AnimatePresence mode="wait">
                    {isGenerating ? (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="flex flex-col items-center justify-center text-center space-y-6 pt-20"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                                <BrainCircuit className="w-20 h-20 text-primary animate-bounce" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">{t('student:roadmap.generating.title')}</h2>
                                <p className="text-muted-foreground italic">{t('student:roadmap.generating.subtitle')}</p>
                            </div>
                            <div className="w-full max-w-xs">
                                <Progress value={65} className="h-2" />
                                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
                                    <span>{t('student:roadmap.generating.analyzing')}</span>
                                    <span>65%</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="builder"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 border border-primary/20">
                                    <Sparkles className="w-3 h-3" />
                                    {t('student:roadmap.builder.version')}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight">{t('student:roadmap.builder.welcome')}</h1>
                                <p className="text-muted-foreground">{t('student:roadmap.builder.desc')}</p>
                            </div>

                            <Card className="border-primary/10 shadow-xl shadow-primary/5 glass-card bg-background/50">
                                <CardHeader>
                                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                                        <span>{t('student:roadmap.builder.config')}</span>
                                        <span>{t('student:roadmap.builder.step', { current: step, total: 3 })}</span>
                                    </div>
                                    <Progress value={(step / 3) * 100} className="h-1" />
                                </CardHeader>

                                <CardContent className="py-6 min-h-[300px]">
                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-sm font-semibold flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-primary" />
                                                    {t('student:roadmap.builder.goals.title')}
                                                </Label>
                                                <RadioGroup defaultValue="web" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {[
                                                        { id: 'web', title: t('student:roadmap.builder.goals.web'), icon: LayoutDashboard },
                                                        { id: 'ds', title: t('student:roadmap.builder.goals.ds'), icon: BrainCircuit },
                                                        { id: 'ai', title: t('student:roadmap.builder.goals.ai'), icon: Sparkles },
                                                        { id: 'app', title: t('student:roadmap.builder.goals.app'), icon: Rocket },
                                                    ].map((goal) => (
                                                        <div key={goal.id} className="relative">
                                                            <RadioGroupItem value={goal.id} id={goal.id} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={goal.id}
                                                                className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer"
                                                            >
                                                                <goal.icon className="mb-3 h-6 w-6 text-primary" />
                                                                <span className="text-xs font-semibold">{goal.title}</span>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <div className="space-y-4">
                                                <Label className="text-sm font-semibold flex items-center gap-2">
                                                    <BrainCircuit className="w-4 h-4 text-primary" />
                                                    {t('student:roadmap.builder.level.title')}
                                                </Label>
                                                <RadioGroup defaultValue="beginner" className="space-y-3">
                                                    {[
                                                        { id: 'beg', title: t('student:roadmap.builder.level.beginner'), desc: t('student:roadmap.builder.level.beginnerDesc') },
                                                        { id: 'int', title: t('student:roadmap.builder.level.intermediate'), desc: t('student:roadmap.builder.level.intermediateDesc') },
                                                        { id: 'adv', title: t('student:roadmap.builder.level.advanced'), desc: t('student:roadmap.builder.level.advancedDesc') },
                                                    ].map((level) => (
                                                        <div key={level.id} className="relative">
                                                            <RadioGroupItem value={level.id} id={level.id} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={level.id}
                                                                className="flex justify-between items-center rounded-xl border border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer"
                                                            >
                                                                <div>
                                                                    <div className="text-sm font-semibold">{level.title}</div>
                                                                    <div className="text-[10px] text-muted-foreground">{level.desc}</div>
                                                                </div>
                                                                <div className="p-1 rounded-full border bg-muted">
                                                                    <ChevronRight className="w-4 h-4" />
                                                                </div>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                            <div className="space-y-4">
                                                <Label className="text-sm font-semibold flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    {t('student:roadmap.builder.time.title')}
                                                </Label>
                                                <div className="pt-6 px-4">
                                                    <Slider defaultValue={[10]} max={20} min={2} step={1} />
                                                </div>
                                                <div className="flex justify-between text-xs text-muted-foreground font-medium px-2">
                                                    <span>{t('student:roadmap.builder.time.low')}</span>
                                                    <span className="text-primary font-bold">{t('student:roadmap.builder.time.optimal', { count: 10 })}</span>
                                                    <span>{t('student:roadmap.builder.time.fast')}</span>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex gap-4 items-center">
                                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                    <Info className="w-5 h-5" />
                                                </div>
                                                <p className="text-[11px] leading-relaxed italic">
                                                    {t('student:roadmap.builder.time.estimate', { hours: 10, weeks: 12 }) as any}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </CardContent>

                                <CardFooter className="flex justify-between border-t p-6 bg-muted/20">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep(s => Math.max(1, s - 1))}
                                        disabled={step === 1}
                                    >
                                        {t('student:roadmap.builder.back')}
                                    </Button>
                                    {step < 3 ? (
                                        <Button onClick={() => setStep(s => s + 1)} className="gap-2">
                                            {t('student:roadmap.builder.continue')} <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={handleGenerate} className="gap-2 bg-gradient-to-r from-primary to-blue-600 border-none">
                                            {t('student:roadmap.builder.generate')}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* Roadmap Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-widest">
                        <Sparkles className="w-4 h-4" />
                        {t('student:roadmap.header.title')}
                    </div>
                    <h1 className="text-3xl font-bold">{t('student:roadmap.mock.title')}</h1>
                    <p className="text-muted-foreground flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t('student:roadmap.header.duration', { count: 12 })}</span>
                        <span className="flex items-center gap-1.5"><Target className="w-4 h-4" /> {t('student:roadmap.header.target', { goal: 'Frontend Dev' })}</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 text-xs h-9">
                        <RefreshCcw className="w-4 h-4" /> {t('student:roadmap.header.refresh')}
                    </Button>
                    <Button className="gap-2 text-xs h-9">
                        <Map className="w-4 h-4" /> {t('student:roadmap.header.viewMap')}
                    </Button>
                </div>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">48%</div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{t('student:roadmap.stats.overall')}</p>
                        <Progress value={48} className="h-1.5 mt-3" />
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">24/50</div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{t('student:roadmap.stats.lessonsDone')}</p>
                        <div className="flex gap-1 mt-3">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-muted'}`} />)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-amber-500/20">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-amber-500">{t('student:roadmap.path.week', { count: 5 })}</div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{t('student:roadmap.stats.currentPhase')}</p>
                        <Badge variant="outline" className="mt-3 text-[9px] border-amber-500/20 text-amber-600">{t('student:roadmap.mock.phaseHighlight')}</Badge>
                    </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">Rank 12</div>
                        <p className="text-[10px] text-primary-foreground/70 uppercase tracking-widest mt-1">{t('student:roadmap.stats.studySpeed')}</p>
                        <p className="text-[10px] mt-3 font-medium">{t('student:roadmap.stats.breakthrough', { percent: 5 })}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Roadmap Path Viz */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="glass-card min-h-[500px] flex flex-col">
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <h3 className="font-bold">{t('student:roadmap.path.title')}</h3>
                                <p className="text-xs text-muted-foreground">{t('student:roadmap.path.desc')}</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="gap-1 px-2 py-0.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t('student:roadmap.path.lesson')}</Badge>
                                <Badge variant="secondary" className="gap-1 px-2 py-0.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('student:roadmap.path.project')}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 relative p-12 overflow-hidden flex flex-col justify-center gap-12">
                            {/* Simple Visual Path representation */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)]" />

                            <div className="relative flex flex-col gap-12">
                                {mockRoadmapSteps.map((s, i) => (
                                    <motion.div
                                        key={s.id}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`flex items-center gap-6 ${i % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${s.status === 'completed' ? 'bg-green-500 border-green-500/20 text-white shadow-lg shadow-green-500/20' :
                                            s.status === 'current' ? 'bg-primary border-primary/20 text-white shadow-xl shadow-primary/30 animate-pulse' :
                                                'bg-muted border-muted-foreground/10 text-muted-foreground'
                                            }`}>
                                            {s.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                                                s.status === 'locked' ? <Lock className="w-4 h-4" /> :
                                                    <Circle className="w-5 h-5" />}
                                        </div>

                                        <Card className={`group flex-1 max-w-sm hover:translate-y-[-2px] transition-all cursor-pointer ${s.status === 'current' ? 'border-primary/50 shadow-lg bg-primary/5' :
                                            s.status === 'locked' ? 'opacity-50' :
                                                'border-primary/10 hover:border-primary/30'
                                            }`}>
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <div>
                                                    <Badge variant="outline" className="text-[9px] mb-1.5 uppercase font-bold tracking-tighter">
                                                        {t('student:roadmap.path.week', { count: s.week })} • {t(`student:roadmap.path.${s.type.toLowerCase()}` as any, { defaultValue: s.type })}
                                                    </Badge>
                                                    <h4 className="text-sm font-semibold">{s.title}</h4>
                                                </div>
                                                <ChevronRight className={`w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform`} />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                {/* Vertical Connector Path */}
                                <div className="absolute top-0 bottom-0 left-[22px] md:left-auto md:inset-x-0 mx-auto w-1 bg-gradient-to-b from-green-500 via-primary to-muted z-0 opacity-20 hidden md:block" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Focus & Insights Sidebar */}
                <div className="space-y-8">
                    {/* Current Focus */}
                    <Card className="glass-card border-primary/20 shadow-lg shadow-primary/5">
                        <CardHeader>
                            <h3 className="font-bold flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary" /> {t('student:roadmap.focus.title')}
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { title: t('student:roadmap.mock.task1.title'), desc: t('student:roadmap.mock.task1.desc'), time: '40m' },
                                { title: t('student:roadmap.mock.task2.title'), desc: t('student:roadmap.mock.task2.desc'), time: '1h 15m' },
                                { title: t('student:roadmap.mock.task3.title'), desc: t('student:roadmap.mock.task3.desc'), time: '10m' },
                            ].map((task, i) => (
                                <div key={i} className="flex gap-3 group">
                                    <Checkbox className="mt-1" />
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-semibold group-hover:text-primary transition-colors cursor-pointer">{task.title}</h4>
                                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                            <span>{task.desc}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                            <span className="flex items-center gap-1"><Clock className="w-2 h-2" /> {task.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full mt-2 h-8 text-xs font-medium">{t('student:roadmap.focus.startNow')}</Button>
                        </CardContent>
                    </Card>

                    {/* AI Insights & Gap Detection */}
                    <Card className="glass-card bg-gradient-to-br from-background to-primary/5">
                        <CardHeader className="pb-2">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" /> {t('student:roadmap.insights.title')}
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-lg border border-primary/10 bg-background/50 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase text-primary">{t('student:roadmap.insights.gapDetected')}</span>
                                    <Badge className="bg-amber-500/20 text-amber-600 text-[8px] h-4">{t('student:roadmap.insights.priority')}</Badge>
                                </div>
                                <p className="text-[10px] leading-relaxed">
                                    <span dangerouslySetInnerHTML={{ __html: t('student:roadmap.mock.insightGap') }} />
                                </p>
                                <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-primary">{t('student:roadmap.insights.viewSupplemental')}</Button>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase text-muted-foreground">{t('student:roadmap.insights.forecast')}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-bold">15/05</span>
                                    <span className="text-[10px] text-green-500 font-medium">{t('student:roadmap.insights.early', { count: 4 })}</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[65%]" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 pb-4">
                            <p className="text-[9px] text-muted-foreground italic">{t('student:roadmap.insights.habitNote')}</p>
                        </CardFooter>
                    </Card>

                    {/* Peer Activity Mini Feed */}
                    <div className="space-y-3 px-1">
                        <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">{t('student:roadmap.peers.title')}</h4>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <Avatar key={i} className="w-7 h-7 border-2 border-background">
                                    <AvatarFallback className="text-[8px]">{i}</AvatarFallback>
                                </Avatar>
                            ))}
                            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold border-2 border-background">+12</div>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            {t('student:roadmap.peers.completedNote', { name: 'Hải Anh', week: 'Week 4' }) as any}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Components not fully implemented but imported/used in mockup
const Info = ({ className }: { className?: string }) => <Map className={className} />;
const CircularProgress = ({ value, size }: { value: number, size: 'lg' }) => (
    <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={264} strokeDashoffset={264 * (1 - value / 100)} className="text-primary" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">{value}%</div>
        </div>
    </div>
);
