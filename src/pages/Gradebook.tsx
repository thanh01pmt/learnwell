import { AppLayout } from "@/components/layout/AppLayout";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Download,
    Search,
    Filter,
    MoreHorizontal,
    Save,
    Undo,
    ArrowUpDown,
    FileSpreadsheet,
    AlertCircle,
    CheckCircle2,
    BarChart2,
    Zap
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Legend
} from "recharts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for students and assignments
import { mockGradebookData as students, mockAssignmentColumns as assignments, gradeDistribution } from "@/mocks";

export default function Gradebook() {
    const { t } = useTranslation(["common", "classroom", "teacher", "dashboard"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState(students);

    const handleSave = () => {
        setIsEditing(false);
        toast.success(t("common:saveSuccess"));
    };

    const calculateAverage = (grades: number[]) => {
        const sum = grades.reduce((a, b) => a + b, 0);
        return (sum / grades.length).toFixed(1);
    };

    const getGradeBadge = (score: number) => {
        if (score >= 8.5) return "bg-success/10 text-success border-success/20";
        if (score >= 6.5) return "bg-primary/10 text-primary border-primary/20";
        if (score >= 5.0) return "bg-warning/10 text-warning border-warning/20";
        return "bg-destructive/10 text-destructive border-destructive/20";
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <FileSpreadsheet className="h-6 w-6 text-primary" />
                            {t("classroom:grading.title")}
                        </h1>
                        <p className="text-muted-foreground">{t("classroom:mocks.classes.math6a")} • {t("common:semester2")}, 2024</p>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <Button variant="outline" className="gap-2 glass-card" onClick={() => setIsEditing(true)}>
                                {t("common:quickEdit")}
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" className="gap-2" onClick={() => setIsEditing(false)}>
                                    <Undo className="h-4 w-4" />
                                    {t("common:cancel")}
                                </Button>
                                <Button className="gap-2" onClick={handleSave}>
                                    <Save className="h-4 w-4" />
                                    {t("common:saveChanges")}
                                </Button>
                            </>
                        )}
                        <Button variant="outline" size="icon" className="glass-card">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("classroom:grading.searchPlaceholder")}
                            className="pl-9 glass-card"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="gap-2 glass-card">
                        <Filter className="h-4 w-4" />
                        {t("common:filter")}
                    </Button>
                    <Button variant="outline" className="gap-2 glass-card">
                        <ArrowUpDown className="h-4 w-4" />
                        {t("common:sort")}
                    </Button>
                </div>

                {/* Phase 2.5: Grade Distribution & Auto-grading */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="glass-card lg:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart2 className="h-5 w-5 text-primary" />
                                {t("classroom:grading.gradeDistribution")}
                            </CardTitle>
                            <CardDescription>{t("classroom:grading.subtitle")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={gradeDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                                        <XAxis dataKey="range" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                            }}
                                        />
                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                            {gradeDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-500" />
                                {t("teacher:autoGrading.title")}
                            </CardTitle>
                            <CardDescription>{t("teacher:autoGrading.desc")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-amber-700">{t("teacher:autoGrading.analyzing")}</span>
                                    <span className="text-amber-600 font-bold">75%</span>
                                </div>
                                <Progress value={75} className="h-2 bg-amber-500/20" />
                                <p className="text-[10px] text-amber-600/80 italic">{t("teacher:autoGrading.aiComparing")}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{t("classroom:stats.totalStudents")}:</span>
                                    <span className="font-bold">42</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{t("classroom:stats.graded")}:</span>
                                    <span className="font-bold text-success">32</span>
                                </div>
                                <Button className="w-full mt-2 h-8 text-xs bg-amber-500 hover:bg-amber-600">
                                    {t("teacher:autoGrading.approveResults")}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Gradebook Table */}
                <Card className="glass-card overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 sticky left-0 z-10 bg-muted/30 whitespace-nowrap min-w-[200px]">{t("classroom:table.students")}</th>
                                        {assignments.map((assignment, idx) => (
                                            <th key={idx} className="px-6 py-4 text-center whitespace-nowrap border-l border-border/20 min-w-[150px]">
                                                {t(assignment as any)}
                                                <div className="text-[10px] font-normal mt-1 opacity-60">{t("common:weight")}: {(idx === 2 ? 0.3 : 0.1).toFixed(1)}</div>
                                            </th>
                                        ))}
                                        <th className="px-6 py-4 text-center sticky right-0 z-10 bg-muted/30 border-l border-border/50 font-bold min-w-[100px]">{t("classroom:table.avgScore")}</th>
                                        <th className="px-6 py-4 text-center sticky right-0 z-10 bg-muted/30 min-w-[50px]"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {data
                                        .filter(s => t(s.name as any).toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((student) => {
                                            const avg = calculateAverage(student.grades);
                                            return (
                                                <tr key={student.id} className="hover:bg-muted/5 transition-colors group">
                                                    <td className="px-6 py-4 sticky left-0 z-10 bg-card/80 backdrop-blur-sm font-medium border-r border-border/20 group-hover:bg-muted/10">
                                                        {t(student.name as any)}
                                                    </td>
                                                    {student.grades.map((grade, idx) => (
                                                        <td key={idx} className="px-6 py-4 text-center border-l border-border/10">
                                                            {isEditing ? (
                                                                <Input
                                                                    defaultValue={grade}
                                                                    className="h-8 w-16 mx-auto text-center"
                                                                    type="number"
                                                                    step="0.1"
                                                                />
                                                            ) : (
                                                                <Badge variant="outline" className={getGradeBadge(grade)}>
                                                                    {grade.toFixed(1)}
                                                                </Badge>
                                                            )}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4 text-center sticky right-0 z-10 bg-card/80 backdrop-blur-sm border-l border-border/50 font-bold group-hover:bg-muted/10">
                                                        <Badge className={getGradeBadge(Number(avg))}>
                                                            {avg}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-center sticky right-0 z-10 bg-card/80 backdrop-blur-sm group-hover:bg-muted/10">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>{t("classroom:table.actions")}</DropdownMenuLabel>
                                                                <DropdownMenuItem>{t("classroom:actions.viewProfile")}</DropdownMenuItem>
                                                                <DropdownMenuItem>{t("teacher:parentFeedback.title")}</DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-destructive">{t("classroom:actions.deleteStudent")}</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer info/stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="glass-card bg-primary/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-success" />
                            <div>
                                <p className="text-xs text-muted-foreground">{t("classroom:table.progress")}</p>
                                <p className="text-lg font-bold">94.2%</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card bg-warning/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-warning" />
                            <div>
                                <p className="text-xs text-muted-foreground">{t("classroom:stats.pendingGrading")}</p>
                                <p className="text-lg font-bold">12 {t("common:assignments")}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card bg-accent/5">
                        <CardContent className="p-4 flex items-center gap-3">
                            <ArrowUpDown className="h-5 w-5 text-accent" />
                            <div>
                                <p className="text-xs text-muted-foreground">{t("dashboard:stats.improvement")}</p>
                                <p className="text-lg font-bold">+0.4 {t("common:grade")}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
