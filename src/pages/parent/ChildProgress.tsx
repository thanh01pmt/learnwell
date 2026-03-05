import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  Calendar,
  Clock,
  Star,
  ChevronDown,
  FileText,
  CheckCircle,
  AlertCircle,
  LineChart as LineChartIcon,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppLayout } from "@/components/layout/AppLayout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface SubjectScore {
  subject: string;
  score: number;
  trend: "up" | "down" | "stable";
  change: number;
  color: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  score?: number;
}

const children = [
  { id: "1", name: "parent:mocks.children.child1", avatar: "minhanh", class: "6A1" },
  { id: "2", name: "parent:mocks.children.child2", avatar: "tuankiet", class: "4B2" },
];

const subjectScores: SubjectScore[] = [
  { subject: "classroom:subjects.math", score: 9.0, trend: "up", change: 0.5, color: "bg-blue-500" },
  { subject: "classroom:subjects.literature", score: 8.5, trend: "stable", change: 0, color: "bg-primary" },
  { subject: "classroom:subjects.english", score: 9.2, trend: "up", change: 0.8, color: "bg-purple-500" },
  { subject: "classroom:subjects.science", score: 8.0, trend: "down", change: -0.3, color: "bg-orange-500" },
  { subject: "classroom:subjects.history", score: 7.5, trend: "up", change: 0.2, color: "bg-rose-500" },
  { subject: "classroom:subjects.it", score: 9.5, trend: "up", change: 1.0, color: "bg-cyan-500" },
];

const recentAssignments: Assignment[] = [
  {
    id: "1",
    title: "classroom:mocks.assignments.math3",
    subject: "classroom:subjects.math",
    dueDate: "05/02/2026",
    status: "completed",
    score: 9.5,
  },
  {
    id: "2",
    title: "classroom:mocks.assignments.lit1",
    subject: "classroom:subjects.literature",
    dueDate: "06/02/2026",
    status: "completed",
    score: 8.5,
  },
  {
    id: "3",
    title: "classroom:mocks.assignments.eng5",
    subject: "classroom:subjects.english",
    dueDate: "08/02/2026",
    status: "pending",
  },
  {
    id: "4",
    title: "classroom:mocks.assignments.sciLight",
    subject: "classroom:subjects.science",
    dueDate: "03/02/2026",
    status: "overdue",
  },
];

const achievements = [
  { id: "1", title: "parent:dashboard.achievements.mathStar", icon: "🌟", date: "01/02/2026" },
  { id: "2", title: "parent:dashboard.achievements.taskMaster", icon: "🎯", date: "28/01/2026" },
  { id: "3", title: "parent:dashboard.achievements.englishPerfect", icon: "💯", date: "25/01/2026" },
  { id: "4", title: "parent:dashboard.achievements.streak7", icon: "🔥", date: "20/01/2026" },
];

const performanceData = [
  { week: "common:months.week1", child: 8.2, average: 7.5 },
  { week: "common:months.week2", child: 8.5, average: 7.6 },
  { week: "common:months.week3", child: 8.0, average: 7.4 },
  { week: "common:months.week4", child: 8.8, average: 7.7 },
  { week: "common:months.week5", child: 9.2, average: 7.8 },
];

function SubjectCard({ subject }: { subject: SubjectScore }) {
  const { t } = useTranslation(["common", "classroom"]);
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${subject.color}`} />
          <span className="font-medium">{t(subject.subject as any)}</span>
        </div>
        <div className="flex items-center gap-1">
          {subject.trend === "up" && (
            <TrendingUp className="h-4 w-4 text-success" />
          )}
          {subject.trend === "down" && (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          {subject.trend !== "stable" && (
            <span
              className={`text-xs ${subject.trend === "up" ? "text-success" : "text-destructive"
                }`}
            >
              {subject.change > 0 ? "+" : ""}
              {subject.change}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">{subject.score}</span>
        <span className="text-muted-foreground mb-1">/10</span>
      </div>
      <Progress value={subject.score * 10} className="mt-2 h-2" />
    </div>
  );
}

function AssignmentRow({ assignment }: { assignment: Assignment }) {
  const { t } = useTranslation(["common", "classroom"]);
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10",
      label: "classroom:projectDetail.status.completed",
    },
    pending: {
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
      label: "classroom:projectDetail.status.pending",
    },
    overdue: {
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      label: "classroom:projectDetail.status.overdue",
    },
  };

  const status = statusConfig[assignment.status];
  const StatusIcon = status.icon;

  return (
    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-lg ${status.bg}`}>
        <StatusIcon className={`h-4 w-4 ${status.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm line-clamp-1">{t(assignment.title as any)}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t(assignment.subject as any)}</span>
          <span>•</span>
          <span>{t("common:dueDate")}: {assignment.dueDate}</span>
        </div>
      </div>
      {assignment.score !== undefined && (
        <Badge variant="secondary" className="shrink-0">
          <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
          {assignment.score}
        </Badge>
      )}
    </div>
  );
}

export default function ChildProgress() {
  const { t } = useTranslation(["common", "classroom", "parent", "dashboard"]);
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState(children[0].id);
  const currentChild = children.find((c) => c.id === selectedChild) || children[0];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="h-7 w-7 text-primary" />
              {t("parent:dashboard.actions.viewProgress")}
            </h1>
            <p className="text-muted-foreground">
              {t("parent:dashboard.progress.subtitle")}
            </p>
          </div>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentChild.avatar}`}
                  />
                  <AvatarFallback>{currentChild.name[0]}</AvatarFallback>
                </Avatar>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${child.avatar}`}
                      />
                      <AvatarFallback>{child.name[0]}</AvatarFallback>
                    </Avatar>
                    {t(child.name)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8.6</p>
                  <p className="text-xs text-muted-foreground">{t("dashboard:stats.averageScore")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">{t("classroom:stats.graded")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">{t("classroom:stats.pendingGrading")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">{t("dashboard:stats.achievements")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* performance line Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-primary" />
              {t("parent:dashboard.comparison.title")}
            </CardTitle>
            <CardDescription>{t("parent:dashboard.comparison.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => t(value)}
                  />
                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="child"
                    name={t(currentChild.name)}
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name={t("parent:dashboard.comparison.legend.classAvg")}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Subject Scores */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {t("classroom:grading.gradeDistribution")}
                </CardTitle>
                <CardDescription>{t("common:semester2")} - {t("common:schoolYear")} 2025-2026</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subjectScores.map((subject) => (
                    <SubjectCard key={subject.subject} subject={subject} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                {t("dashboard:stats.achievements")} {t("common:recent")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{t(achievement.title as any)}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => navigate('/portfolio-builder')}>
                {t("parent:dashboard.actions.viewAllAchievements")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t("parent:dashboard.sections.recentAssignments")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("common:all")}</TabsTrigger>
                <TabsTrigger value="completed">{t("classroom:projectDetail.status.completed")}</TabsTrigger>
                <TabsTrigger value="pending">{t("classroom:projectDetail.status.pending")}</TabsTrigger>
                <TabsTrigger value="overdue">{t("classroom:projectDetail.status.overdue")}</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-2">
                {recentAssignments.map((assignment) => (
                  <AssignmentRow key={assignment.id} assignment={assignment} />
                ))}
              </TabsContent>
              <TabsContent value="completed" className="space-y-2">
                {recentAssignments
                  .filter((a) => a.status === "completed")
                  .map((assignment) => (
                    <AssignmentRow key={assignment.id} assignment={assignment} />
                  ))}
              </TabsContent>
              <TabsContent value="pending" className="space-y-2">
                {recentAssignments
                  .filter((a) => a.status === "pending")
                  .map((assignment) => (
                    <AssignmentRow key={assignment.id} assignment={assignment} />
                  ))}
              </TabsContent>
              <TabsContent value="overdue" className="space-y-2">
                {recentAssignments
                  .filter((a) => a.status === "overdue")
                  .map((assignment) => (
                    <AssignmentRow key={assignment.id} assignment={assignment} />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
