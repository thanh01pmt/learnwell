import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Plus,
    Trash2,
    Copy,
    Save,
    Grid,
    Settings2,
    ListChecks,
    ChevronRight,
    ChevronLeft,
    Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Criterion {
    id: string;
    name: string;
    weight: number;
    levels: { score: number; description: string }[];
}

const defaultLevels = [
    { score: 4, label: "teacher:rubricBuilder.levels.excellent" },
    { score: 3, label: "teacher:rubricBuilder.levels.good" },
    { score: 2, label: "teacher:rubricBuilder.levels.average" },
    { score: 1, label: "teacher:rubricBuilder.levels.poor" }
];

export default function RubricBuilder() {
    const { t } = useTranslation("teacher");
    const [rubricName, setRubricName] = useState("teacher:rubricBuilder.mock.essayTitle");
    const [criteria, setCriteria] = useState<Criterion[]>([
        {
            id: "c1",
            name: "teacher:rubricBuilder.mock.contentQuality",
            weight: 70,
            levels: [
                { score: 4, description: "teacher:rubricBuilder.mock.contentLevel4" },
                { score: 3, description: "teacher:rubricBuilder.mock.contentLevel3" },
                { score: 2, description: "teacher:rubricBuilder.mock.contentLevel2" },
                { score: 1, description: "teacher:rubricBuilder.mock.contentLevel1" }
            ]
        },
        {
            id: "1",
            name: "teacher:rubricBuilder.mock.presentationSkill",
            weight: 30,
            levels: [
                { score: 4, description: "teacher:rubricBuilder.mock.descLevel4" },
                { score: 3, description: "teacher:rubricBuilder.mock.descLevel3" },
                { score: 2, description: "teacher:rubricBuilder.mock.descLevel2" },
                { score: 1, description: "teacher:rubricBuilder.mock.descLevel1" },
            ]
        },
    ]);

    const addCriterion = () => {
        const newId = `c${criteria.length + 1}`;
        setCriteria([...criteria, {
            id: "2",
            name: "teacher:rubricBuilder.mock.newCriterion",
            weight: 0,
            levels: []
        }]);
    };

    const removeCriterion = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const updateCriterion = (id: string, updates: Partial<Criterion>) => {
        setCriteria(criteria.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const updateLevel = (criterionId: string, score: number, description: string) => {
        setCriteria(criteria.map(c =>
            c.id === criterionId
                ? { ...c, levels: c.levels.map(l => l.score === score ? { ...l, description } : l) }
                : c
        ));
    };

    const totalWeight = criteria.reduce((sum, c) => sum + (c.weight || 0), 0);

    const handleSave = () => {
        if (totalWeight !== 100) {
            toast.error(t("teacher:rubricBuilder.messages.weightError" as any) as any);
            return;
        }
        toast.success(t("teacher:rubricBuilder.messages.saveSuccess" as any) as any);
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                                <Grid className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:rubricBuilder.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("teacher:rubricBuilder.subtitle" as any) as any}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2 glass-card">
                            <Copy className="h-4 w-4" />
                            {t("teacher:rubricBuilder.actions.useTemplate" as any) as any}
                        </Button>
                        <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20">
                            <Save className="h-4 w-4" />
                            {t("teacher:rubricBuilder.actions.save" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Settings Bar */}
                <Card className="glass-card">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="rubric-name">{t("teacher:rubricBuilder.labels.rubricName" as any) as any}</Label>
                                <Input
                                    value={t(rubricName as any)}
                                    onChange={(e) => setRubricName(e.target.value)}
                                    className="text-2xl font-black bg-transparent border-none focus-visible:ring-0 p-0"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label>{t("teacher:rubricBuilder.labels.totalWeight" as any) as any}</Label>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-10 bg-muted/50 rounded-lg flex items-center px-4">
                                            <div
                                                className={cn(
                                                    "h-2 rounded-full transition-all duration-500",
                                                    totalWeight === 100 ? "bg-success" : "bg-warning",
                                                )}
                                                style={{ width: `${Math.min(100, totalWeight)}%` }}
                                            />
                                        </div>
                                        <span className={cn("font-bold w-12 text-right", totalWeight === 100 ? "text-success" : "text-warning")}>
                                            {totalWeight}%
                                        </span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="mb-0.5">
                                    <Settings2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Builder Interface */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {criteria.map((criterion, idx) => (
                            <motion.div
                                key={criterion.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="glass-card border-none ring-1 ring-border/50 overflow-hidden group">
                                    <div className="bg-muted/30 p-4 flex items-center justify-between border-b border-border/50">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="flex items-center gap-2">
                                                <ListChecks className="h-4 w-4 text-primary" />
                                                <Input
                                                    value={t(criterion.name as any)}
                                                    onChange={(e) => updateCriterion(criterion.id, { name: e.target.value })}
                                                    className="h-8 w-48 border-none bg-transparent font-bold focus-visible:ring-0 p-0"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Label className="text-xs text-muted-foreground whitespace-nowrap">{t("teacher:rubricBuilder.labels.weight" as any) as any}:</Label>
                                                <Input
                                                    type="number"
                                                    value={criterion.weight}
                                                    onChange={(e) => updateCriterion(criterion.id, { weight: parseInt(e.target.value) || 0 })}
                                                    className="h-8 w-16 text-center"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeCriterion(criterion.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardContent className="p-0">
                                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-border/50">
                                            {defaultLevels.map((lvl) => {
                                                const levelData = criterion.levels.find(l => l.score === lvl.score);
                                                return (
                                                    <div key={lvl.score} className="p-4 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <Badge variant="secondary" className="text-[10px] font-bold">
                                                                {t(defaultLevels.find(l => l.score === lvl.score)?.label as any)}
                                                            </Badge>
                                                            <span className="text-xs font-bold text-muted-foreground">{t("common:scoreUnit", { count: lvl.score })}</span>
                                                        </div>
                                                        <Textarea
                                                            placeholder={t("teacher:rubricBuilder.labels.description" as any) as any}
                                                            value={t(levelData?.description as any) || ""}
                                                            onChange={(e) => updateLevel(criterion.id, lvl.score, e.target.value)}
                                                            className="min-h-[100px] text-sm resize-none bg-transparent border-none focus-visible:ring-0 p-0"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Button
                        variant="outline"
                        className="w-full h-16 border-dashed border-2 hover:bg-primary/5 hover:border-primary/50 transition-all rounded-xl"
                        onClick={addCriterion}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        {t("teacher:rubricBuilder.actions.addCriterion" as any) as any}
                    </Button>
                </div>

                {/* Preview Footer */}
                <div className="flex justify-center pt-6">
                    <Card className="w-full max-w-2xl bg-primary/5 border-primary/20">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Layout className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold">{t("teacher:rubricBuilder.labels.previewTitle" as any) as any}</p>
                                    <p className="text-xs text-muted-foreground">{t("teacher:rubricBuilder.labels.previewDesc" as any) as any}</p>
                                </div>
                            </div>
                            <Button className="gap-2">
                                {t("teacher:rubricBuilder.actions.preview" as any) as any}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
