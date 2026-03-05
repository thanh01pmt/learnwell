import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
    BarChart3,
    Target,
    BrainCircuit,
    Sparkles,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Zap,
    Filter,
    Download,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillGapDashboard: React.FC = () => {
    const { t } = useTranslation(['student' as any, 'common' as any]);
    const skills = [
        { name: 'Data Structures', level: 85, trend: '+12%', color: 'bg-blue-500' },
        { name: 'Algorithms', level: 62, trend: '-5%', color: 'bg-amber-500' },
        { name: 'Frontend Dev', level: 92, trend: '+2%', color: 'bg-green-500' },
        { name: 'Backend Logic', level: 45, trend: '+18%', color: 'bg-purple-500' },
        { name: 'Clean Code', level: 78, trend: '+0%', color: 'bg-pink-500' },
    ];

    const skillGaps = [
        {
            title: 'Nested Loops Optimization',
            category: 'Algorithms',
            urgency: 'High',
            impact: t('student:skills.gap.benefit', { impact: 'Giảm 40% thời gian thực thi code' } as any),
            suggestion: t('student:skills.gap.aiSuggestion', { suggestion: 'Thực hành bài tập "Matrix Traversals" và "Dynamic Programming Basics".' } as any)
        },
        {
            title: 'Async/Await Patterns',
            category: 'Frontend',
            urgency: 'Medium',
            impact: t('student:skills.gap.benefit', { impact: 'Cải thiện UX khi load dữ liệu' } as any),
            suggestion: t('student:skills.gap.aiSuggestion', { suggestion: 'Hoàn thành lab "Advanced Promises" trong chương 4.' } as any)
        }
    ];

    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                        <BarChart3 className="w-4 h-4" />
                        {t('student:skills.title')}
                    </div>
                    <h1 className="text-3xl font-bold">{t('student:skills.header')}</h1>
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-amber-500" /> {t('student:skills.aiAnalysis', { count: 124 } as any)}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 h-9 text-xs">
                        <Calendar className="w-4 h-4" /> {t('student:skills.last30Days')}
                    </Button>
                    <Button variant="outline" className="gap-2 h-9 text-xs">
                        <Download className="w-4 h-4" /> {t('student:skills.export')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Skill Radar & Main Stats */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Skill Radar Visualization (Mock) */}
                    <Card className="glass-card min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-6 left-6">
                            <h3 className="font-bold">{t('student:skills.radar.title')}</h3>
                            <p className="text-xs text-muted-foreground">{t('student:skills.radar.desc')}</p>
                        </div>

                        {/* Mock Radar Chart with SVG */}
                        <div className="relative w-64 h-64 mt-8">
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                {/* Hexagon Rings */}
                                {[20, 40, 60, 80, 100].map(r => (
                                    <circle key={r} cx="50" cy="50" r={r / 2} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20" />
                                ))}
                                {/* Skill Area */}
                                <polygon
                                    points="50,10 80,30 85,65 50,85 15,65 20,30"
                                    fill="rgba(var(--primary-rgb), 0.15)"
                                    stroke="var(--primary)"
                                    strokeWidth="2"
                                    className="animate-pulse"
                                />
                            </svg>
                            {/* Skill Labels */}
                            <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-popover text-foreground border">DS</Badge>
                            <Badge className="absolute top-1/4 -right-8 bg-popover text-foreground border">Algo</Badge>
                            <Badge className="absolute bottom-0 -right-8 bg-popover text-foreground border">Backend</Badge>
                            <Badge className="absolute bottom-0 -left-8 bg-popover text-foreground border">Style</Badge>
                            <Badge className="absolute top-1/4 -left-8 bg-popover text-foreground border">Frontend</Badge>
                        </div>

                        <div className="mt-12 grid grid-cols-3 gap-12 text-center w-full px-12 pb-6">
                            <div>
                                <div className="text-2xl font-black text-primary italic">8.4</div>
                                <div className="text-[10px] font-bold uppercase text-muted-foreground">{t('student:skills.radar.labels.technical')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-primary italic">7.2</div>
                                <div className="text-[10px] font-bold uppercase text-muted-foreground">{t('student:skills.radar.labels.logic')}</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-primary italic">9.1</div>
                                <div className="text-[10px] font-bold uppercase text-muted-foreground">{t('student:skills.radar.labels.creative')}</div>
                            </div>
                        </div>
                    </Card>

                    {/* Skill Breakdown List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill, i) => (
                            <Card key={i} className="glass-card hover:bg-primary/5 transition-colors cursor-pointer group">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className={`w-1.5 h-12 rounded-full ${skill.color}`} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold">{skill.name}</span>
                                            <span className={`text-[10px] font-bold ${skill.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                                {skill.trend}
                                            </span>
                                        </div>
                                        <Progress value={skill.level} className="h-1.5" />
                                    </div>
                                    <div className="text-lg font-black italic opacity-20 group-hover:opacity-100 transition-opacity">
                                        {skill.level}%
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* AI Gaps & Recommendation Sidebar */}
                <div className="space-y-8">
                    {/* Skill Gaps Analysis */}
                    <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                        <CardHeader className="pb-2">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" /> {t('student:skills.gap.title')}
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {skillGaps.map((gap, i) => (
                                <div key={i} className="p-4 rounded-xl bg-background/50 border border-amber-500/10 space-y-2 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-[8px] h-4 border-amber-500/30 text-amber-600 bg-amber-50">{t('student:skills.gap.urgency', { level: gap.urgency } as any)}</Badge>
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{gap.category}</span>
                                    </div>
                                    <h4 className="text-xs font-bold">{gap.title}</h4>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                                        {gap.impact}
                                    </p>
                                    <div className="pt-2 border-t border-dashed mt-2">
                                        <p className="text-[10px] font-medium text-primary">
                                            {gap.suggestion}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <Button className="w-full h-9 text-xs font-bold gap-2 bg-amber-500 hover:bg-amber-600 border-none shadow-lg shadow-amber-500/20 text-white">
                                {t('student:skills.gap.startPractice')}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Learning Patterns (AI Insights) */}
                    <Card className="glass-card bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4 text-primary" /> {t('student:skills.patterns.title')}
                            </h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 mt-0.5">
                                        <Zap className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold">{t('student:skills.patterns.primeTime')}</div>
                                        <p className="text-[10px] text-muted-foreground">Hiệu suất code của bạn cao nhất vào tối Thứ 3 & Thứ 5 (20:00 - 22:00).</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 mt-0.5">
                                        <Target className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold">{t('student:skills.patterns.bias')}</div>
                                        <p className="text-[10px] text-muted-foreground">Bạn có xu hướng chạy code thử nghiệm rất nhiều trước khi hoàn tất logic.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3">{t('student:skills.patterns.adaptive')}</div>
                                <div className="flex justify-between items-end gap-1">
                                    {[30, 45, 60, 40, 75, 55, 80].map((h, i) => (
                                        <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[8px] text-muted-foreground mt-2 font-mono uppercase">
                                    <span>Mon</span>
                                    <span>Wed</span>
                                    <span>Fri</span>
                                    <span>Sun</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-primary/10 py-3">
                            <p className="text-[9px] text-center w-full italic">{t('student:skills.patterns.aiAdvise', { percent: 15 } as any)}</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};
