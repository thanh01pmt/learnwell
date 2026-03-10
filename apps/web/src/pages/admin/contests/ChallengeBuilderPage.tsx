import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Plus,
    Trash2,
    PlayCircle,
    Save,
    Brain,
    Puzzle,
    ChevronRight,
    Database,
    Search,
    CheckCircle2,
    Lock,
    Eye,
    MoreVertical
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types based on the original migration but adapted to LearnWell
interface TestCase {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
    label?: string;
}

interface AlgoQuest {
    id: string;
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    sampleCases: TestCase[];
    hiddenCases: TestCase[];
}

export default function ChallengeBuilderPage() {
    const { id: contestId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation('contests');

    // Selection state
    const [selectedRound, setSelectedRound] = useState('r1');
    const [selectedExam, setSelectedExam] = useState('e1');
    const [quests, setQuests] = useState<AlgoQuest[]>([
        {
            id: 'q1',
            title: 'Tổng hai số nguyên',
            description: 'Cho hai số nguyên a và b. Hãy tính tổng của chúng.',
            inputFormat: 'Một dòng chứa hai số nguyên a, b cách nhau bởi dấu cách.',
            outputFormat: 'Một số nguyên duy nhất là tổng của a và b.',
            constraints: '-10^9 <= a, b <= 10^9',
            sampleCases: [{ input: '3 5', expectedOutput: '8', isHidden: false, label: t('management.challenges.sampleLabel', { index: 1 }) }],
            hiddenCases: [{ input: '-10 20', expectedOutput: '10', isHidden: true }]
        }
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [saving, setSaving] = useState(false);

    const current = quests[selectedIndex];

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success(t('management.challenges.saveSuccess'));
        }, 1000);
    };

    const addQuest = () => {
        const newQuest: AlgoQuest = {
            id: `q-${Date.now()}`,
            title: t('management.challenges.newQuest'),
            description: '',
            inputFormat: '',
            outputFormat: '',
            constraints: '',
            sampleCases: [],
            hiddenCases: []
        };
        setQuests([...quests, newQuest]);
        setSelectedIndex(quests.length);
    };

    const removeQuest = (index: number) => {
        const updated = quests.filter((_, i) => i !== index);
        setQuests(updated);
        if (selectedIndex >= updated.length) {
            setSelectedIndex(Math.max(0, updated.length - 1));
        }
    };

    const updateQuest = (updates: Partial<AlgoQuest>) => {
        setQuests(prev => prev.map((q, i) => i === selectedIndex ? { ...q, ...updates } : q));
    };

    const addTestCase = (type: 'sampleCases' | 'hiddenCases') => {
        if (!current) return;
        const newCase: TestCase = {
            input: '',
            expectedOutput: '',
            isHidden: type === 'hiddenCases',
            label: type === 'sampleCases' ? t('management.challenges.sampleLabel', { index: current.sampleCases.length + 1 }) : undefined
        };
        updateQuest({ [type]: [...current[type], newCase] });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] gap-6">
            {/* Selection Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('management.rounds.title')}</Label>
                    <Select value={selectedRound} onValueChange={setSelectedRound}>
                        <SelectTrigger className="bg-background/50 h-9">
                            <SelectValue placeholder={t('management.live.roundPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="r1">{t('management.rounds.r1')}</SelectItem>
                            <SelectItem value="r2">{t('management.rounds.r2')}</SelectItem>
                            <SelectItem value="r3">{t('management.rounds.r3')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('management.challenges.exam')}</Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                        <SelectTrigger className="bg-background/50 h-9">
                            <SelectValue placeholder={t('management.challenges.examPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="e1">{t('management.challenges.exams.e1')}</SelectItem>
                            <SelectItem value="e2">{t('management.challenges.exams.e2')}</SelectItem>
                            <SelectItem value="e3">{t('management.challenges.exams.e3')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-end gap-2">
                    <Button variant="outline" className="h-9 gap-2 flex-1">
                        <Plus className="h-4 w-4" /> {t('management.challenges.addExam')}
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="h-9 gap-2 flex-1 bg-primary">
                        <Save className="h-4 w-4" /> {saving ? t('management.challenges.saving') : t('management.challenges.saveExam')}
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
                {/* Quest List (Left) */}
                <Card className="w-80 flex flex-col border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardHeader className="py-4 px-4 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <Puzzle className="h-4 w-4" /> {t('management.challenges.listTitle')}
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={addQuest}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {quests.map((q, i) => (
                                <div
                                    key={q.id}
                                    onClick={() => setSelectedIndex(i)}
                                    className={cn(
                                        "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border border-transparent",
                                        i === selectedIndex
                                            ? "bg-primary/10 border-primary/20 text-primary font-semibold"
                                            : "hover:bg-muted/50 text-muted-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <span className="text-xs opacity-50 font-mono">#{i + 1}</span>
                                        <span className="truncate text-sm">{q.title || t('management.challenges.untitled')}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                                        onClick={(e) => { e.stopPropagation(); removeQuest(i); }}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            ))}
                            {quests.length === 0 && (
                                <div className="text-center py-10 text-muted-foreground text-sm italic">
                                    {t('management.challenges.noQuests')}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Editor Area (Right) */}
                <div className="flex-1 overflow-hidden min-h-0">
                    {current ? (
                        <ScrollArea className="h-full pr-4">
                            <div className="space-y-6 pb-6">
                                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                                    <CardHeader className="py-4 px-6 border-b border-border/50 flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-base">{t('management.challenges.editorTitle')}</CardTitle>
                                            <CardDescription>{t('management.challenges.editorDesc')}</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <PlayCircle className="h-4 w-4 text-emerald-500" /> {t('management.challenges.preview')}
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="q-title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.challenges.questTitle')}</Label>
                                            <Input
                                                id="q-title"
                                                value={current.title}
                                                onChange={(e) => updateQuest({ title: e.target.value })}
                                                className="text-base font-semibold bg-background/50"
                                                placeholder={t('management.challenges.questTitlePlaceholder')}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="q-desc" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.challenges.questDesc')}</Label>
                                            <Textarea
                                                id="q-desc"
                                                value={current.description}
                                                onChange={(e) => updateQuest({ description: e.target.value })}
                                                rows={6}
                                                className="bg-background/50 font-sans leading-relaxed resize-none"
                                                placeholder={t('management.challenges.questDescPlaceholder')}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="q-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.challenges.inputFormat')}</Label>
                                                <Input
                                                    id="q-input"
                                                    value={current.inputFormat}
                                                    onChange={(e) => updateQuest({ inputFormat: e.target.value })}
                                                    className="bg-background/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="q-output" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.challenges.outputFormat')}</Label>
                                                <Input
                                                    id="q-output"
                                                    value={current.outputFormat}
                                                    onChange={(e) => updateQuest({ outputFormat: e.target.value })}
                                                    className="bg-background/50"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="q-con" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.challenges.constraints')}</Label>
                                            <Input
                                                id="q-con"
                                                value={current.constraints}
                                                onChange={(e) => updateQuest({ constraints: e.target.value })}
                                                className="bg-background/50 font-mono text-xs"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Test Cases Tabs */}
                                <Tabs defaultValue="sample" className="w-full">
                                    <TabsList className="bg-muted/50 p-1 mb-4 h-11 w-full justify-start rounded-xl border border-border/50">
                                        <TabsTrigger value="sample" className="flex-1 gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                            <Eye className="h-4 w-4" /> {t('management.challenges.publicTests', { count: current.sampleCases.length })}
                                        </TabsTrigger>
                                        <TabsTrigger value="hidden" className="flex-1 gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                                            <Lock className="h-4 w-4" /> {t('management.challenges.hiddenTests', { count: current.hiddenCases.length })}
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="sample" className="mt-0 space-y-4">
                                        {current.sampleCases.map((tc, idx) => (
                                            <Card key={idx} className="border-none shadow-sm bg-muted/20 border border-border/50">
                                                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-start">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('management.challenges.input')}</Label>
                                                        <Textarea
                                                            value={tc.input}
                                                            onChange={(e) => {
                                                                const cases = [...current.sampleCases];
                                                                cases[idx].input = e.target.value;
                                                                updateQuest({ sampleCases: cases });
                                                            }}
                                                            className="font-mono text-xs h-20 bg-background/40"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('management.challenges.expectedOutput')}</Label>
                                                        <Textarea
                                                            value={tc.expectedOutput}
                                                            onChange={(e) => {
                                                                const cases = [...current.sampleCases];
                                                                cases[idx].expectedOutput = e.target.value;
                                                                updateQuest({ sampleCases: cases });
                                                            }}
                                                            className="font-mono text-xs h-20 bg-background/40"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="mt-6 text-destructive"
                                                        onClick={() => {
                                                            updateQuest({ sampleCases: current.sampleCases.filter((_, i) => i !== idx) });
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Button variant="outline" className="w-full h-12 gap-2 border-2 border-dashed border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all rounded-xl" onClick={() => addTestCase('sampleCases')}>
                                            <Plus className="h-4 w-4" /> {t('management.challenges.addPublic')}
                                        </Button>
                                    </TabsContent>

                                    <TabsContent value="hidden" className="mt-0 space-y-4">
                                        {current.hiddenCases.map((tc, idx) => (
                                            <Card key={idx} className="border-none shadow-sm bg-muted/20 border border-border/50">
                                                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-start">
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('management.challenges.inputTest')}</Label>
                                                        <Textarea
                                                            value={tc.input}
                                                            onChange={(e) => {
                                                                const cases = [...current.hiddenCases];
                                                                cases[idx].input = e.target.value;
                                                                updateQuest({ hiddenCases: cases });
                                                            }}
                                                            className="font-mono text-xs h-20 bg-background/40"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t('management.challenges.expectedOutput')}</Label>
                                                        <Textarea
                                                            value={tc.expectedOutput}
                                                            onChange={(e) => {
                                                                const cases = [...current.hiddenCases];
                                                                cases[idx].expectedOutput = e.target.value;
                                                                updateQuest({ hiddenCases: cases });
                                                            }}
                                                            className="font-mono text-xs h-20 bg-background/40"
                                                        />
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="mt-6 text-destructive"
                                                        onClick={() => {
                                                            updateQuest({ hiddenCases: current.hiddenCases.filter((_, i) => i !== idx) });
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Button variant="outline" className="w-full h-12 gap-2 border-2 border-dashed border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all rounded-xl" onClick={() => addTestCase('hiddenCases')}>
                                            <Plus className="h-4 w-4" /> {t('management.challenges.addHidden')}
                                        </Button>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border/50">
                            <Brain className="h-16 w-16 mb-4 opacity-10" />
                            <p>{t('management.challenges.emptyEditor')}</p>
                            <Button variant="link" className="text-primary gap-2 mt-2" onClick={addQuest}>
                                <Plus className="h-4 w-4" /> {t('management.challenges.addQuest')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
