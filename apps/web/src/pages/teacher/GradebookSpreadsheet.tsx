import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FileSpreadsheet,
    Save,
    Download,
    Calculator,
    Settings,
    MoreHorizontal,
    Undo,
    Info,
    ChevronDown,
    Percent,
    TrendingUp,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

// Types
interface Assignment {
    id: string;
    name: string;
    weight: number;
    category: 'homework' | 'quiz' | 'exam';
    maxScore: number;
}

interface StudentGrade {
    studentId: number;
    studentName: string;
    grades: Record<string, number>; // assignmentId -> score
}

// Mock Categories Configuration
const categories = [
    { id: 'homework', name: 'homework', weight: 0.3, color: 'text-blue-600 bg-blue-50' },
    { id: 'quiz', name: 'quiz', weight: 0.2, color: 'text-primary bg-primary/10' },
    { id: 'exam', name: 'exam', weight: 0.5, color: 'text-purple-600 bg-purple-50' }
];

// Mock Assignments
const initialAssignments: Assignment[] = [
    { id: 'hw1', name: 'dashboard:mockup.attendance.gradebook.assignments.hwWeek1', category: 'homework', weight: 10, maxScore: 10 },
    { id: 'hw2', name: 'dashboard:mockup.attendance.gradebook.assignments.hwWeek2', category: 'homework', weight: 10, maxScore: 10 },
    { id: 'qz1', name: 'dashboard:mockup.attendance.gradebook.assignments.quizRational', category: 'quiz', weight: 100, maxScore: 10 },
    { id: 'ex1', name: 'dashboard:mockup.attendance.gradebook.assignments.examCh1', category: 'exam', weight: 100, maxScore: 10 },
];

// Mock Students
const initialStudentData: StudentGrade[] = [
    { studentId: 1, studentName: "classroom:mocks.students.an", grades: { hw1: 8.5, hw2: 9.0, qz1: 8.5, ex1: 9.0 } },
    { studentId: 2, studentName: "classroom:mocks.students.binh", grades: { hw1: 7.2, hw2: 7.5, qz1: 8.0, ex1: 8.2 } },
    { studentId: 3, studentName: "classroom:mocks.students.cuong", grades: { hw1: 9.5, hw2: 9.5, qz1: 10.0, ex1: 9.2 } },
    { studentId: 4, studentName: "classroom:mocks.students.duc", grades: { hw1: 6.0, hw2: 5.5, qz1: 6.5, ex1: 7.0 } },
    { studentId: 5, studentName: "classroom:mocks.students.yen", grades: { hw1: 8.0, hw2: 8.0, qz1: 8.5, ex1: 8.5 } },
];

export default function GradebookSpreadsheet() {
    const { t } = useTranslation(["teacher", "dashboard", "common", "classroom"]);
    const [students, setStudents] = useState<StudentGrade[]>(initialStudentData);
    const [assignments] = useState<Assignment[]>(initialAssignments);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationOffsets, setSimulationOffsets] = useState<Record<string, number>>({});

    // Calculation logic
    const calculateFinalGrade = (studentGrades: Record<string, number>, offsets: Record<string, number> = {}) => {
        const categoryScores: Record<string, number[]> = { homework: [], quiz: [], exam: [] };

        assignments.forEach(assig => {
            const score = (studentGrades[assig.id] || 0) + (offsets[assig.id] || 0);
            const normalized = (score / assig.maxScore) * 10;
            categoryScores[assig.category].push(normalized);
        });

        let totalWeightedScore = 0;
        categories.forEach(cat => {
            const scores = categoryScores[cat.id];
            if (scores.length > 0) {
                const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                totalWeightedScore += avg * cat.weight;
            }
        });

        return totalWeightedScore.toFixed(2);
    };

    const handleGradeChange = (studentId: number, assignmentId: string, value: string) => {
        const numValue = Math.min(10, Math.max(0, parseFloat(value) || 0));
        setStudents(prev => prev.map(s =>
            s.studentId === studentId
                ? { ...s, grades: { ...s.grades, [assignmentId]: numValue } }
                : s
        ));
    };

    const handleSimulationChange = (assignmentId: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setSimulationOffsets(prev => ({ ...prev, [assignmentId]: numValue }));
    };

    const getScoreColor = (score: number) => {
        if (score >= 8.5) return "text-success";
        if (score >= 6.5) return "text-primary";
        if (score >= 5.0) return "text-warning";
        return "text-destructive";
    };

    const filteredStudents = students.filter(s =>
        t(s.studentName as any).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-primary/10">
                                <FileSpreadsheet className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:gradebook.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("teacher:gradebook.subtitle" as any, { class: "12A1", term: t("common:terms.semester2" as any), year: "2023-2024" } as any) as any}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant={isSimulating ? "default" : "outline"}
                            className={cn("gap-2 glass-card", isSimulating && "bg-amber-500 hover:bg-amber-600 border-none")}
                            onClick={() => {
                                setIsSimulating(!isSimulating);
                                if (!isSimulating) setSimulationOffsets({});
                            }}
                        >
                            <Calculator className="h-4 w-4" />
                            {isSimulating ? t("teacher:gradebook.actions.simulating" as any) : t("teacher:gradebook.actions.simulate" as any)}
                        </Button>

                        <div className="h-8 w-px bg-border mx-1 hidden sm:block" />

                        <Button
                            variant={isEditing ? "default" : "outline"}
                            className="gap-2 glass-card"
                            onClick={() => {
                                setIsEditing(!isEditing);
                                if (isEditing) toast.success(t("teacher:gradebook.messages.updateSuccess" as any) as any);
                            }}
                        >
                            {isEditing ? <Save className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                            {isEditing ? t("teacher:gradebook.actions.save" as any) : t("teacher:gradebook.actions.customize" as any)}
                        </Button>

                        <Button variant="outline" size="icon" className="glass-card">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Categories Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <Card key={cat.id} className="glass-card overflow-hidden">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(`teacher:gradebook.categories.${cat.id}` as any) as any}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{(cat.weight * 100)}%</span>
                                        <Badge variant="secondary" className={cn("text-[10px]", cat.color)}>
                                            {t("teacher:gradebook.stats.weight" as any) as any}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-3 rounded-2xl bg-muted/50">
                                    <Percent className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Top Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("teacher:gradebook.actions.search")}
                            className="pl-10 glass-card"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 glass-card">
                                {t("teacher:gradebook.actions.filter" as any) as any}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>{t("teacher:gradebook.filters.show" as any) as any}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                {t("teacher:gradebook.filters.onlyHomework" as any) as any}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                {t("teacher:gradebook.filters.onlyQuiz" as any) as any}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <div className="h-2 w-2 rounded-full bg-purple-500" />
                                {t("teacher:gradebook.filters.onlyExam" as any) as any}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Spreadsheet Table */}
                <Card className="glass-card overflow-hidden border-primary/10">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 hover:bg-muted/30">
                                    <TableHead className="w-64 min-w-[250px] sticky left-0 z-20 bg-muted/30 font-bold border-r">
                                        {t("teacher:gradebook.table.student" as any) as any}
                                    </TableHead>
                                    {assignments.map(assig => (
                                        <TableHead key={assig.id} className="min-w-[150px] text-center p-0 h-auto">
                                            <div className="p-4 space-y-2">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <span className="font-bold text-sm">{t(assig.name as any)}</span>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Info className="h-3 w-3 text-muted-foreground" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{t("teacher:gradebook.table.max" as any) as any}: {t("common:scoreUnit", { count: assig.maxScore })}</p>
                                                                <p>{t("teacher:gradebook.table.type" as any) as any}: {t(`teacher:gradebook.categories.${assig.category}` as any) as any}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                                <Badge variant="outline" className={cn("text-[10px] font-normal",
                                                    categories.find(c => c.id === assig.category)?.color
                                                )}>
                                                    {t(`teacher:gradebook.categories.${assig.category}` as any) as any}
                                                </Badge>

                                                {isSimulating && (
                                                    <div className="pt-2 animate-in slide-in-from-top-2 duration-300">
                                                        <Input
                                                            type="number"
                                                            placeholder="+/-"
                                                            className="h-7 text-[10px] bg-amber-50 border-amber-200 text-center focus:ring-amber-200"
                                                            onChange={(e) => handleSimulationChange(assig.id, e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </TableHead>
                                    ))}
                                    <TableHead className="w-32 min-w-[120px] sticky right-0 z-20 bg-muted/30 text-center font-bold border-l">
                                        {t("teacher:gradebook.table.average" as any) as any}
                                    </TableHead>
                                    <TableHead className="w-12 sticky right-0 z-20 bg-muted/30"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student) => {
                                    const finalGrade = calculateFinalGrade(student.grades);
                                    const simulatedGrade = isSimulating ? calculateFinalGrade(student.grades, simulationOffsets) : null;

                                    return (
                                        <TableRow key={student.studentId} className="group hover:bg-primary/5 transition-colors">
                                            <TableCell className="sticky left-0 z-10 bg-card group-hover:bg-primary/5 border-r font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                        {student.studentName.split(" ").pop()?.charAt(0)}
                                                    </div>
                                                    <span>{t(student.studentName as any)}</span>
                                                </div>
                                            </TableCell>

                                            {assignments.map(assig => {
                                                const score = student.grades[assig.id] || 0;
                                                return (
                                                    <TableCell key={assig.id} className="text-center">
                                                        {isEditing ? (
                                                            <Input
                                                                type="number"
                                                                defaultValue={score}
                                                                className="h-9 w-20 mx-auto text-center font-medium focus:ring-primary/20"
                                                                onChange={(e) => handleGradeChange(student.studentId, assig.id, e.target.value)}
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <span className={cn("font-bold text-lg", getScoreColor(score))}>
                                                                    {score.toFixed(1)}
                                                                </span>
                                                                {isSimulating && simulationOffsets[assig.id] !== 0 && (
                                                                    <span className={cn("text-[10px] font-bold",
                                                                        (simulationOffsets[assig.id] || 0) > 0 ? "text-success" : "text-destructive"
                                                                    )}>
                                                                        {(simulationOffsets[assig.id] || 0) > 0 ? "+" : ""}{simulationOffsets[assig.id]}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                );
                                            })}

                                            <TableCell className="sticky right-0 z-10 bg-card group-hover:bg-primary/5 border-l text-center font-black text-xl">
                                                <div className="flex flex-col items-center">
                                                    <span className={isSimulating ? "text-muted-foreground text-sm line-through opacity-50" : getScoreColor(Number(finalGrade))}>
                                                        {finalGrade}
                                                    </span>
                                                    {isSimulating && (
                                                        <motion.span
                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            className={cn("text-xl", getScoreColor(Number(simulatedGrade)))}
                                                        >
                                                            {simulatedGrade}
                                                        </motion.span>
                                                    )}
                                                </div>
                                            </TableCell>

                                            <TableCell className="sticky right-0 z-10 bg-card group-hover:bg-primary/5 text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>{t("teacher:gradebook.actions.viewDetail" as any) as any}</DropdownMenuItem>
                                                        <DropdownMenuItem>{t("teacher:gradebook.actions.editHistory" as any) as any}</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive">{t("teacher:gradebook.actions.markViolation" as any) as any}</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* Footer Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-card bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                {t("teacher:gradebook.insights.prediction" as any) as any}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-4">
                                <div className="text-3xl font-bold text-primary">8.42</div>
                                <div className="text-xs text-success font-bold pb-1 flex items-center gap-1">
                                    {t("teacher:gradebook.insights.targetDiff" as any, { diff: "+0.15" } as any) as any}
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                {t("teacher:gradebook.insights.predictionDesc" as any) as any}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-amber-500/5 border-amber-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Undo className="h-4 w-4 text-amber-500" />
                                {t("teacher:gradebook.insights.editLog" as any) as any}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{t("teacher:gradebook.insights.lastUpdate" as any) as any}:</span>
                                <span className="font-semibold">{t("common:time.today" as any) as any}, 08:30 {t("common:time.am" as any) as any}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{t("teacher:gradebook.insights.performer" as any) as any}:</span>
                                <span className="font-semibold">{t("roles.teacher" as any)} {t("teacher:gradebook.mock.teacherB")}</span>
                            </div>
                            <Button variant="link" className="p-0 h-auto text-[10px] text-amber-600">
                                {t("teacher:gradebook.insights.viewFullHistory" as any) as any}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
