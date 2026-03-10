import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Users, BookOpen, Trophy, Target, Activity, Calendar, Clock, MousePointer2, CheckCircle2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

const performanceData = [
  { month: "teacher:reports.mock.months.t1", avgScore: 72, submissions: 145, attendance: 92 },
  { month: "teacher:reports.mock.months.t2", avgScore: 75, submissions: 162, attendance: 89 },
  { month: "teacher:reports.mock.months.t3", avgScore: 78, submissions: 178, attendance: 94 },
  { month: "teacher:reports.mock.months.t4", avgScore: 74, submissions: 156, attendance: 91 },
  { month: "teacher:reports.mock.months.t5", avgScore: 82, submissions: 189, attendance: 96 },
  { month: "teacher:reports.mock.months.t6", avgScore: 85, submissions: 201, attendance: 95 },
];

const classPerformanceData = [
  { name: "teacher:reports.mock.classes.math6a", avgScore: 82, students: 35 },
  { name: "teacher:reports.mock.classes.math7b", avgScore: 78, students: 32 },
  { name: "teacher:reports.mock.classes.math8a", avgScore: 85, students: 30 },
  { name: "teacher:reports.mock.classes.math9c", avgScore: 76, students: 28 },
  { name: "teacher:reports.mock.classes.math6b", avgScore: 80, students: 33 },
];

const competencyData = [
  { subject: "teacher:reports.mock.competencies.arithmetic", value: 85 },
  { subject: "teacher:reports.mock.competencies.algebra", value: 78 },
  { subject: "teacher:reports.mock.competencies.geometry", value: 72 },
  { subject: "teacher:reports.mock.competencies.statistics", value: 88 },
  { subject: "teacher:reports.mock.competencies.probability", value: 65 },
  { subject: "teacher:reports.mock.competencies.trigonometry", value: 70 },
];

const gradeDistribution = [
  { name: "teacher:reports.mock.grades.excellent", value: 25, color: "hsl(var(--success))" },
  { name: "teacher:reports.mock.grades.good", value: 35, color: "hsl(var(--primary))" },
  { name: "teacher:reports.mock.grades.fair", value: 28, color: "hsl(var(--accent))" },
  { name: "teacher:reports.mock.grades.average", value: 10, color: "hsl(var(--warning))" },
  { name: "teacher:reports.mock.grades.poor", value: 2, color: "hsl(var(--destructive))" },
];

const weeklyActivityData = [
  { day: "teacher:reports.mock.days.mon", lessons: 12, exercises: 45, exams: 2 },
  { day: "teacher:reports.mock.days.tue", lessons: 15, exercises: 52, exams: 1 },
  { day: "teacher:reports.mock.days.wed", lessons: 18, exercises: 48, exams: 3 },
  { day: "teacher:reports.mock.days.thu", lessons: 14, exercises: 55, exams: 2 },
  { day: "teacher:reports.mock.days.fri", lessons: 20, exercises: 62, exams: 4 },
  { day: "teacher:reports.mock.days.sat", lessons: 8, exercises: 30, exams: 1 },
  { day: "teacher:reports.mock.days.sun", lessons: 5, exercises: 20, exams: 0 },
];

// Phase 2.4: Mock Heatmap Data (Engagment - 7 days x 24 hours)
const heatmapData = Array.from({ length: 7 }, (_, i) =>
  Array.from({ length: 24 }, (_, j) => ({
    day: ["teacher:reports.mock.days.mon", "teacher:reports.mock.days.tue", "teacher:reports.mock.days.wed", "teacher:reports.mock.days.thu", "teacher:reports.mock.days.fri", "teacher:reports.mock.days.sat", "teacher:reports.mock.days.sun"][i],
    hour: j,
    value: Math.floor(Math.random() * 100)
  }))
).flat();

const cohortData = [
  { period: "teacher:reports.mock.months.t1", cohort2023: 85, cohort2024: 78, cohort2025: 70 },
  { period: "teacher:reports.mock.months.t2", cohort2023: 82, cohort2024: 80, cohort2025: 75 },
  { period: "teacher:reports.mock.months.t3", cohort2023: 88, cohort2024: 85, cohort2025: 82 },
  { period: "teacher:reports.mock.months.t4", cohort2023: 84, cohort2024: 82, cohort2025: 80 },
  { period: "teacher:reports.mock.months.t5", cohort2023: 90, cohort2024: 88, cohort2025: 85 },
  { period: "teacher:reports.mock.months.t6", cohort2023: 92, cohort2024: 90, cohort2025: 88 },
];

const contentEffectivenessData = [
  { name: "teacher:reports.mock.chapters.rationalNumbers", completion: 92, avgTime: 45, engagement: 88 },
  { name: "teacher:reports.mock.chapters.realNumbers", completion: 85, avgTime: 55, engagement: 82 },
  { name: "teacher:reports.mock.chapters.planeGeometry", completion: 78, avgTime: 65, engagement: 75 },
  { name: "teacher:reports.mock.chapters.statistics", completion: 95, avgTime: 35, engagement: 92 },
  { name: "teacher:reports.mock.chapters.midtermReview", completion: 88, avgTime: 90, engagement: 95 },
];

const correlationData = [
  { time: 30, score: 6.5, name: "Student 1" },
  { time: 45, score: 7.2, name: "Student 2" },
  { time: 60, score: 7.8, name: "Student 3" },
  { time: 20, score: 5.5, name: "Student 4" },
  { time: 90, score: 9.2, name: "Student 5" },
  { time: 120, score: 9.5, name: "Student 6" },
  { time: 55, score: 8.0, name: "Student 7" },
  { time: 75, score: 8.5, name: "Student 8" },
  { time: 40, score: 6.8, name: "Student 9" },
  { time: 100, score: 9.0, name: "Student 10" },
];

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
}

function ReportStatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const { t } = useTranslation(["teacher", "common"]);
  const isPositive = change >= 0;
  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{t("teacher:reports.stats.vsLastMonth", { percent: Math.abs(change) })}</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Reports() {
  const { t } = useTranslation(["teacher", "common", "dashboard", "classroom"]);
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("teacher:reports.title")}</h1>
            <p className="text-muted-foreground">{t("teacher:reports.subtitle")}</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="month">
              <SelectTrigger className="w-[160px] glass-card">
                <SelectValue placeholder={t("teacher:reports.actions.selectTime")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">{t("teacher:reports.filters.week")}</SelectItem>
                <SelectItem value="month">{t("teacher:reports.filters.month")}</SelectItem>
                <SelectItem value="quarter">{t("teacher:reports.filters.quarter")}</SelectItem>
                <SelectItem value="year">{t("teacher:reports.filters.year")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t("teacher:reports.actions.export")}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReportStatCard title={t("teacher:reports.stats.avgScore")} value="8.2" change={5.3} icon={Trophy} />
          <ReportStatCard title={t("teacher:reports.stats.totalStudents")} value="158" change={12} icon={Users} />
          <ReportStatCard title={t("teacher:reports.stats.submissions")} value="1,247" change={8.7} icon={BookOpen} />
          <ReportStatCard title={t("teacher:reports.stats.completionRate")} value="94%" change={-2.1} icon={Target} />
        </div>

        {/* Main Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="glass-card">
            <TabsTrigger value="overview">{t("teacher:reports.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="performance">{t("teacher:reports.tabs.performance")}</TabsTrigger>
            <TabsTrigger value="competency">{t("teacher:reports.tabs.competency")}</TabsTrigger>
            <TabsTrigger value="engagement">{t("teacher:reports.tabs.engagement")}</TabsTrigger>
            <TabsTrigger value="cohorts">{t("teacher:reports.tabs.cohorts")}</TabsTrigger>
            <TabsTrigger value="activity">{t("teacher:reports.tabs.activity")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Performance Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.scoreTrend")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.scoreTrendDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => t(val)} />
                        <YAxis domain={[60, 100]} className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="avgScore"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorScore)"
                          name={t("teacher:reports.charts.avgScoreShort")}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.gradeDist")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.gradeDistDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={gradeDistribution.map(item => ({ ...item, name: t(item.name) }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                          formatter={(value: number) => [`${value}%`, t("teacher:reports.charts.gradeScale")]}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Class Performance Comparison */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.classComp")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.classCompDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classPerformanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => t(val)} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                        <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} name="Điểm TB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Submissions & Attendance Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.subAttendance")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.subAttendanceDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => t(val)} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="submissions"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--primary))' }}
                          name={t("teacher:reports.stats.submissions")}
                        />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="hsl(var(--accent))"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--accent))' }}
                          name={t("teacher:reports.charts.attendPercent")}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competency" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Competency Radar */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.competencyMap")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.competencyMapDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={competencyData}>
                        <PolarGrid className="stroke-border/50" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(val) => t(val)} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Radar
                          name={t("teacher:reports.tabs.competency")}
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Competency Details */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.competencyDetail")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.competencyDetailDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {competencyData.map((item) => (
                      <div key={item.subject} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{t(item.subject)}</span>
                          <span className="text-muted-foreground">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="glass-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.weeklyActivity")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.weeklyActivityDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => t(val)} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="lessons" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name={t("teacher:reports.charts.lessons")} />
                        <Bar dataKey="exercises" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name={t("teacher:reports.charts.exercises")} />
                        <Bar dataKey="exams" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} name={t("teacher:reports.charts.exams")} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2.4: Content Effectiveness Dashboard */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.contentEff")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.contentEffDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contentEffectivenessData.map((chapter) => (
                      <div key={chapter.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold truncate max-w-[150px]">{t(chapter.name)}</span>
                          <Badge variant="outline" className="text-[10px]">{t("teacher:reports.charts.engagementUnit", { percent: chapter.engagement })}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground mb-1">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-success" />
                            {t("teacher:reports.charts.completionUnit", { percent: chapter.completion })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {t("teacher:reports.charts.avgTimeUnit", { count: chapter.avgTime })}
                          </div>
                        </div>
                        <Progress value={chapter.completion} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2.4: Correlation Chart */}
              <Card className="glass-card lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg">{t("teacher:reports.charts.correlation")}</CardTitle>
                  <CardDescription>{t("teacher:reports.charts.correlationDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                        <XAxis
                          type="number"
                          dataKey="time"
                          name={t("common:time")}
                          unit={t("common:timeUnit.minute")}
                          label={{ value: t("teacher:reports.charts.timeLabel"), position: 'bottom', fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="score"
                          name={t("common:grade")}
                          domain={[0, 10]}
                          label={{ value: t("teacher:reports.charts.scoreLabel"), angle: -90, position: 'left', fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                        />
                        <ZAxis type="number" range={[60, 400]} />
                        <RechartsTooltip
                          cursor={{ strokeDasharray: '3 3' }}
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '12px',
                          }}
                        />
                        <Scatter name={t("teacher:reports.charts.studentLabel")} data={correlationData} fill="hsl(var(--primary))">
                          {correlationData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fillOpacity={0.6} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <strong>{t("teacher:reports.charts.analysis")}:</strong> {t("teacher:reports.charts.correlationAnalysis")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Phase 2.4: Engagement Heatmap Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{t("teacher:reports.charts.heatmap")}</CardTitle>
                    <CardDescription>{t("teacher:reports.charts.heatmapDesc")}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{t("teacher:reports.charts.low")}</span>
                    <div className="flex gap-1">
                      <div className="h-3 w-3 rounded-sm bg-primary/10" />
                      <div className="h-3 w-3 rounded-sm bg-primary/30" />
                      <div className="h-3 w-3 rounded-sm bg-primary/60" />
                      <div className="h-3 w-3 rounded-sm bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{t("teacher:reports.charts.high")}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[800px]">
                    <div className="flex mb-2">
                      <div className="w-12" />
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="flex-1 text-[10px] text-center text-muted-foreground">
                          {i}h
                        </div>
                      ))}
                    </div>
                    {["teacher:reports.mock.days.mon", "teacher:reports.mock.days.tue", "teacher:reports.mock.days.wed", "teacher:reports.mock.days.thu", "teacher:reports.mock.days.fri", "teacher:reports.mock.days.sat", "teacher:reports.mock.days.sun"].map((day, dayIndex) => (
                      <div key={day} className="flex items-center mb-1">
                        <div className="w-12 text-xs font-medium text-muted-foreground">{t(day)}</div>
                        {Array.from({ length: 24 }, (_, hourIndex) => {
                          const val = heatmapData.find(d => d.day === day && d.hour === hourIndex)?.value || 0;
                          return (
                            <TooltipProvider key={hourIndex}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className="flex-1 h-8 m-[1px] rounded-sm transition-all hover:scale-110 cursor-pointer"
                                    style={{
                                      backgroundColor: `hsl(var(--primary) / ${val / 100})`,
                                    }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">{t(day)}, {hourIndex}:00: <strong>{t("teacher:reports.charts.interactions", { count: val })}</strong></p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phase 2.4: Cohort Analysis Tab */}
          <TabsContent value="cohorts" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">{t("teacher:reports.charts.cohortAnalysis")}</CardTitle>
                <CardDescription>{t("teacher:reports.charts.cohortAnalysisDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cohortData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => t(val)} />
                      <YAxis domain={[60, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cohort2023"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Khóa 2023 (Lớp 9)"
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cohort2024"
                        stroke="hsl(var(--accent))"
                        strokeWidth={3}
                        name="Khóa 2024 (Lớp 8)"
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cohort2025"
                        stroke="hsl(var(--warning))"
                        strokeWidth={3}
                        name="Khóa 2025 (Lớp 7)"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">{t("teacher:reports.charts.cohortGrowth", { name: "Khóa 2023" })}</p>
                    <p className="text-xl font-bold text-primary">+12.5%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <p className="text-xs text-muted-foreground mb-1">{t("teacher:reports.charts.cohortGrowth", { name: "Khóa 2024" })}</p>
                    <p className="text-xl font-bold text-accent">+15.2%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-warning/5 border border-warning/10">
                    <p className="text-xs text-muted-foreground mb-1">{t("teacher:reports.charts.cohortGrowth", { name: "Khóa 2025" })}</p>
                    <p className="text-xl font-bold text-warning">+25.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
