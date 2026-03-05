import { 
  TrendingUp,
  Calendar,
  BookOpen,
  Clock,
  Target,
  Award
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "recharts";

const weeklyData = [
  { day: "T2", minutes: 45, lessons: 3 },
  { day: "T3", minutes: 60, lessons: 4 },
  { day: "T4", minutes: 30, lessons: 2 },
  { day: "T5", minutes: 90, lessons: 6 },
  { day: "T6", minutes: 75, lessons: 5 },
  { day: "T7", minutes: 120, lessons: 8 },
  { day: "CN", minutes: 45, lessons: 3 },
];

const monthlyProgress = [
  { week: "Tuần 1", score: 72 },
  { week: "Tuần 2", score: 75 },
  { week: "Tuần 3", score: 78 },
  { week: "Tuần 4", score: 82 },
];

const recentActivities = [
  { id: "1", title: "Hoàn thành bài kiểm tra Toán", type: "exam", score: 9.0, time: "2 giờ trước" },
  { id: "2", title: "Bài học: Phương trình bậc hai", type: "lesson", duration: "25 phút", time: "5 giờ trước" },
  { id: "3", title: "Luyện tập Grammar - Tenses", type: "practice", accuracy: 85, time: "1 ngày trước" },
  { id: "4", title: "Hoàn thành bài tập Văn", type: "assignment", score: 8.5, time: "1 ngày trước" },
  { id: "5", title: "Bài học: Cơ học Newton", type: "lesson", duration: "30 phút", time: "2 ngày trước" },
];

const subjectProgress = [
  { subject: "Toán học", progress: 78, trend: "+5%" },
  { subject: "Ngữ văn", progress: 65, trend: "+3%" },
  { subject: "Tiếng Anh", progress: 85, trend: "+8%" },
  { subject: "Vật lý", progress: 52, trend: "+2%" },
];

export default function StudentProgress() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "exam":
        return "📝";
      case "lesson":
        return "📖";
      case "practice":
        return "🎯";
      case "assignment":
        return "📋";
      default:
        return "📌";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Tiến độ học tập</h1>
            <p className="text-muted-foreground">
              Theo dõi hoạt động và sự tiến bộ của bạn
            </p>
          </div>
          <Badge variant="outline" className="self-start sm:self-auto py-1.5 px-3">
            <Calendar className="h-4 w-4 mr-1.5" />
            Tháng 1, 2026
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Thời gian học</p>
                <p className="text-2xl font-bold">8h 45m</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bài học</p>
                <p className="text-2xl font-bold">31</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bài tập</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Điểm TB</p>
                <p className="text-2xl font-bold text-gradient">8.2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">Hoạt động tuần này</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Phút học" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Score Trend */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">Xu hướng điểm số</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis domain={[60, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--success))"
                    fill="url(#colorScore)"
                    strokeWidth={2}
                    name="Điểm TB"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Subject Progress */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">Tiến độ theo môn</h2>
            <div className="space-y-4">
              {subjectProgress.map((item) => (
                <div key={item.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                      <Badge className="bg-success/20 text-success text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center text-xl">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.score !== undefined && (
                    <Badge className="bg-success/20 text-success">{activity.score}</Badge>
                  )}
                  {activity.accuracy !== undefined && (
                    <Badge variant="secondary">{activity.accuracy}%</Badge>
                  )}
                  {activity.duration && (
                    <Badge variant="outline">{activity.duration}</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
