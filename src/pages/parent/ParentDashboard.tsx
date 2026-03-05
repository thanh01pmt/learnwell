import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  MessageCircle,
  Bell,
  ChevronRight,
  Star,
  LineChart as LineChartIcon,
} from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Child {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  class: string;
  overallScore: number;
  attendance: number;
  recentActivity: string;
}

import {
  parentChildren as mockChildren,
  upcomingEvents,
  parentNotifications as notifications,
  comparisonData
} from "@/mocks";

function ChildCard({ child }: { child: Child }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-background shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${child.avatar}`}
            />
            <AvatarFallback className="text-lg font-bold">
              {child.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{t(child.name as any)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(child.grade as any)} • {t(child.class as any)}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-warning mb-1">
              <Star className="h-4 w-4 fill-warning" />
              <span className="font-bold text-xl">{child.overallScore}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("parent:dashboard.labels.averageScore" as any) as any}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-success mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="font-bold text-xl">{child.attendance}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("parent:dashboard.labels.attendance" as any) as any}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="line-clamp-1">{t(child.recentActivity as any)}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="gap-2 px-1" onClick={() => navigate('/parent/progress')}>
            {t("parent:dashboard.actions.viewProgress" as any) as any}
          </Button>
          <Button variant="outline" size="sm" className="gap-2 px-1" onClick={() => navigate('/parent/attendance')}>
            {t("parent:dashboard.actions.viewAttendance" as any) as any}
          </Button>
          <Button variant="default" size="sm" className="gap-2 px-1 shadow-lg shadow-primary/20" onClick={() => navigate('/parent/report')}>
            {t("parent:dashboard.actions.viewReport" as any) as any}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboard", "common"]);
  return (
    <AppLayout>
      <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
              {t("dashboard:welcome.greeting", { name: t("parent:parentName", { defaultValue: t("parent:mocks.parentName") }) }) as string} 👋
            </h1>
            <p className="text-muted-foreground">
              {t("dashboard:continueLearning")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/parent/contact')}>
              <MessageCircle className="h-4 w-4" />
              {t("parent:dashboard.actions.contactTeacher")}
            </Button>
            <Button className="gap-2" onClick={() => navigate('/parent/schedule')}>
              <Calendar className="h-4 w-4" />
              {t("parent:dashboard.actions.bookMeeting")}
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20" onClick={() => navigate('/portfolio-builder')}>
              <Award className="h-4 w-4" />
              {t("parent:dashboard.actions.buildPortfolio")}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockChildren.length}</p>
                <p className="text-xs text-muted-foreground">{t("parent:dashboard.stats.children")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">{t("parent:dashboard.stats.achievements")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">{t("parent:dashboard.stats.pendingAssignments")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">{t("parent:dashboard.stats.upcomingEvents")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart Section */}
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                  {t("parent:dashboard.comparison.title")}
                </CardTitle>
                <CardDescription>{t("parent:dashboard.comparison.desc")}</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/5">{t("common:semester2")}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(monthKey) => t(monthKey as any)}
                  />
                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    labelFormatter={(monthKey) => t(monthKey as any)}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    type="monotone"
                    dataKey="child"
                    name={t(mockChildren[0]?.name as any)}
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
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
          {/* Children Section */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t("parent:dashboard.sections.myChildren")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockChildren.map((child) => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  {t("parent:dashboard.sections.notifications")}
                  <Badge variant="secondary" className="ml-auto">
                    {notifications.filter((n) => n.isNew).length} {t("parent:dashboard.labels.new")}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg text-sm ${notif.isNew ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                      }`}
                  >
                    <p className={notif.isNew ? "font-medium" : ""}>
                      {t(notif.messageKey as any)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t(`common:time.${notif.timeKey}Ago`, { count: notif.timeCount, defaultValue: t(`common:time.${notif.timeKey}`, { count: notif.timeCount }) }) as string}
                    </p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm" onClick={() => navigate('/notifications')}>
                  {t("parent:dashboard.actions.viewAllNotifications")}
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {t("parent:dashboard.sections.upcomingEvents")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${event.type === "meeting"
                        ? "bg-primary"
                        : event.type === "exam"
                          ? "bg-warning"
                          : "bg-success"
                        }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {t(event.title as any, event.params as any) as string}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm" onClick={() => navigate('/parent/schedule')}>
                  {t("parent:dashboard.actions.viewFullSchedule")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
