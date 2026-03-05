import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRole } from "@/contexts/RoleContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  BarChart3,
  School,
  Activity,
} from "lucide-react";

import {
  adminSystemStats as systemStatsData,
  adminActivities as recentActivities,
  adminClassOverview as classOverview,
  adminSystemAlerts as systemAlerts
} from "@/mocks";

const systemStats = [
  { ...systemStatsData[0], icon: GraduationCap },
  { ...systemStatsData[1], icon: Users },
  { ...systemStatsData[2], icon: BookOpen },
  { ...systemStatsData[3], icon: School },
];

export default function AdminDashboard() {
  const { startImpersonating } = useRole();
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboard", "common"]);

  return (
    <AppLayout>
      <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard:stats.systemOverview")}</h1>
            <p className="text-muted-foreground">
              {t("dashboard:continueLearning")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => navigate('/reports')}>
              <BarChart3 className="h-4 w-4" />
              {t("dashboard:actions.reports")}
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => navigate('/admin/system-health')}>
              <Activity className="h-4 w-4" />
              {t("dashboard:sections.systemHealth")}
            </Button>
            <Button className="gap-2" onClick={() => {
              startImpersonating('teacher');
              navigate('/');
            }}>
              <Eye className="h-4 w-4" />
              {t("dashboard:actions.impersonateTeacher")}
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t(stat.title as any)}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-primary mt-1">{stat.change} {t("dashboard:stats.comparedToLastMonth")}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {t("dashboard:mockup.admin.alerts.system")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl border ${alert.type === "warning"
                    ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200"
                    : alert.type === "success"
                      ? "bg-primary/10 dark:bg-primary/10 border-primary/30 dark:border-primary/20 text-emerald-900 dark:text-primary/30"
                      : "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-900 dark:text-blue-200"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                    {alert.type === "success" && <CheckCircle className="h-4 w-4 text-primary dark:text-primary" />}
                    {alert.type === "info" && <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    <span className="text-sm font-medium">{t(alert.messageKey as any, alert.params)}</span>
                  </div>
                  {alert.count && (
                    <Badge variant="secondary" className="bg-background/50 dark:bg-black/20">{alert.count}</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class Overview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("dashboard:mockup.admin.sections.classOverview")}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/admin/classes'}>{t("common:viewAll")}</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classOverview.map((cls) => (
                  <div key={cls.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{t(cls.name as any)}</p>
                        <p className="text-xs text-muted-foreground">
                          {t(cls.teacher as any)} • {cls.students} {t("dashboard:stats.totalStudents")}
                        </p>
                      </div>
                      <Badge
                        variant={cls.status === "warning" ? "destructive" : "secondary"}
                        className={cls.status === "active" ? "bg-primary/20 dark:bg-primary/10 text-primary dark:text-primary border-none" : ""}
                      >
                        {cls.progress}%
                      </Badge>
                    </div>
                    <Progress value={cls.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{t("dashboard:sections.recentActivity")}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => window.location.href = '/admin/users'}>{t("common:viewAll")}</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${activity.role === "teacher" ? "bg-primary" : "bg-blue-500"
                        }`}
                    >
                      {t(activity.user as any).charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{t(activity.user as any)}</span>{" "}
                        <span className="text-muted-foreground">{t(activity.actionKey as any, activity.params)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{t(`common:time.${activity.timeKey}`, { count: activity.timeCount })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">{t("dashboard:stats.examsToday")}</p>
                  <p className="text-3xl font-bold mt-1">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary to-primary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary/20">{t("dashboard:stats.completionRate")}</p>
                  <p className="text-3xl font-bold mt-1">87%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">{t("dashboard:stats.onlineUsers")}</p>
                  <p className="text-3xl font-bold mt-1">156</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
