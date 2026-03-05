import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    FileText,
    Download,
    TrendingUp,
    Award,
    AlertCircle,
    BarChart,
    Target,
    User,
    Brain
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from "recharts";
import { useTranslation } from "react-i18next";
import { performanceComparison, skillData } from "@/mocks/data";


export default function ParentReport() {
    const { t } = useTranslation();
    const studentName = t("classroom:mocks.students.an");

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary" />
                            {t("parent:report.title")}
                        </h1>
                        <p className="text-muted-foreground">{t("parent:report.subtitle", { name: studentName, semester: 1, year: "2023-2024" })}</p>
                    </div>
                    <Button className="gap-2 rounded-xl">
                        <Download className="h-4 w-4" />
                        {t("parent:report.actions.downloadPdf")}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Comparative Analytics */}
                    <Card className="glass-card lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart className="h-5 w-5 text-primary" />
                                {t("parent:report.sections.progressComparison")}
                            </CardTitle>
                            <CardDescription>{t("parent:report.sections.progressComparisonDesc", { name: t("classroom:mocks.students.an") })}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceComparison}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                                        <XAxis dataKey="month" tickFormatter={(val) => t(val)} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                        <YAxis domain={[0, 10]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="student"
                                            name={t("classroom:mocks.students.an")}
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={3}
                                            dot={{ r: 6, fill: 'hsl(var(--primary))' }}
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="classAvg"
                                            name={t("parent:dashboard.comparison.legend.classAvg" as any) as any}
                                            stroke="hsl(var(--muted-foreground))"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skill Radar */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Brain className="h-5 w-5 text-primary" />
                                {t("parent:report.sections.coreSkills" as any) as any}
                            </CardTitle>
                            <CardDescription>{t("parent:report.sections.coreSkillsDesc" as any) as any}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={skillData}>
                                        <PolarGrid className="stroke-border/50" />
                                        <PolarAngleAxis dataKey="subject" tickFormatter={(val) => t(val)} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                                        <Radar
                                            name={t("parent:report.sections.coreSkills")}
                                            dataKey="value"
                                            stroke="hsl(var(--primary))"
                                            fill="hsl(var(--primary))"
                                            fillOpacity={0.4}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{t("parent:report.stats.bestSubject")}</span>
                                    <Badge variant="outline" className="text-success border-success/30 font-bold">{t("dashboard:subjects.math")} (9.0)</Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{t("parent:report.stats.needsImprovement")}</span>
                                    <Badge variant="outline" className="text-warning border-warning/30 font-bold">{t("dashboard:subjects.chemistry")} (6.5)</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Behavior & Remarks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-success" />
                                {t("parent:report.sections.teacherRemarks" as any) as any}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/50 italic text-sm text-balance">
                                {t("parent:report.sections.mockRemarks")}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-muted-foreground">{t("common:save")} {t("common:time.pm")}:</span>
                                <div className="h-8 w-24 bg-muted/50 rounded flex items-center justify-center text-[10px] font-serif">{t("parent:report.sections.mockTeacherName")}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-warning" />
                                {t("parent:report.sections.behaviorIndex")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span>{t("parent:report.stats.attendance")}</span>
                                        <span className="font-bold">100%</span>
                                    </div>
                                    <Progress value={100} className="h-1.5" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span>{t("parent:report.stats.collaboration")}</span>
                                        <span className="font-bold">85%</span>
                                    </div>
                                    <Progress value={85} className="h-1.5" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span>{t("parent:report.stats.problemSolving")}</span>
                                        <span className="font-bold">92%</span>
                                    </div>
                                    <Progress value={92} className="h-1.5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
