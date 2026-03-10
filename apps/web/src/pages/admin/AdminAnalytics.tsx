import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from "recharts";
import {
    Users,
    Clock,
    Zap,
    TrendingUp,
    Target,
    MousePointer2,
    FileText,
    Filter,
    Download,
    Calendar,
    ChevronDown
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const activeUserNodes = [
    { time: "08:00", students: 120, teachers: 15 },
    { time: "10:00", students: 450, teachers: 42 },
    { time: "12:00", students: 300, teachers: 28 },
    { time: "14:00", students: 680, teachers: 55 },
    { time: "16:00", students: 510, teachers: 48 },
    { time: "18:00", students: 220, teachers: 20 },
    { time: "20:00", students: 150, teachers: 12 },
];

const featureEngagement = [
    { name: "IDE", value: 85, color: "#6366f1" },
    { name: "Forum", value: 62, color: "#ec4899" },
    { name: "Practice", value: 78, color: "#f59e0b" },
    { name: "Projects", value: 45, color: "#10b981" },
    { name: "Video", value: 55, color: "#3b82f6" },
];

export default function AdminAnalytics() {
    const { t } = useTranslation(["dashboard", "common"]);

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard:mockup.admin.analytics.title")}</h1>
                        <p className="text-muted-foreground">{t("dashboard:mockup.admin.analytics.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.analytics.filters.last30Days")}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.analytics.actions.exportReport")}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: t("dashboard:mockup.admin.analytics.stats.activeUsers"), value: "1,284", trend: "+12.5%", icon: Users, color: "text-blue-600" },
                        { label: t("dashboard:mockup.admin.analytics.stats.avgSession"), value: "42m 15s", trend: "+5.2%", icon: Clock, color: "text-orange-600" },
                        { label: t("dashboard:mockup.admin.analytics.stats.engagement"), value: "78%", trend: "+2.1%", icon: MousePointer2, color: "text-green-600" },
                        { label: t("dashboard:mockup.admin.analytics.stats.successRate"), value: "94.2%", trend: "+0.8%", icon: Target, color: "text-indigo-600" },
                    ].map((stat, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground">{stat.label}</CardTitle>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1">
                                    <TrendingUp className="h-3 w-3" /> {stat.trend} <span className="text-muted-foreground font-normal">{t("dashboard:mockup.admin.analytics.stats.trendCompare")}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>{t("dashboard:mockup.admin.analytics.charts.usageTraffic")}</CardTitle>
                                    <CardDescription>{t("dashboard:mockup.admin.analytics.charts.usageDesc")}</CardDescription>
                                </div>
                                <Badge variant="outline">Real-time</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activeUserNodes}>
                                        <defs>
                                            <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} dx={-10} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", color: "#fff" }}
                                            itemStyle={{ fontSize: "10px" }}
                                        />
                                        <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" name={t("dashboard:mockup.admin.analytics.charts.students")} />
                                        <Area type="monotone" dataKey="teachers" stroke="#ec4899" strokeWidth={3} fill="transparent" name={t("dashboard:mockup.admin.analytics.charts.teachers")} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t("dashboard:mockup.admin.analytics.charts.featureEngagement")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.analytics.charts.featureDesc")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={featureEngagement}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {featureEngagement.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4">
                                {featureEngagement.map((feature, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: feature.color }} />
                                            <span className="text-xs font-medium">{feature.name}</span>
                                        </div>
                                        <span className="text-xs font-bold">{feature.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{t("dashboard:mockup.admin.analytics.aiAlerts.title")}</CardTitle>
                                <CardDescription>{t("dashboard:mockup.admin.analytics.aiAlerts.subtitle")}</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">{t("dashboard:mockup.admin.analytics.aiAlerts.viewAll")}</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    type: t("dashboard:mockup.admin.analytics.aiAlerts.types.abnormalScore"),
                                    user: "id_9422",
                                    detail: t("dashboard:mockup.admin.analytics.aiAlerts.details.scoreDetail"),
                                    severity: "high"
                                },
                                {
                                    type: t("dashboard:mockup.admin.analytics.aiAlerts.types.sessionDrop"),
                                    user: "id_4821",
                                    detail: t("dashboard:mockup.admin.analytics.aiAlerts.details.dropDetail"),
                                    severity: "medium"
                                },
                                {
                                    type: t("dashboard:mockup.admin.analytics.aiAlerts.types.spamAlert"),
                                    user: "id_1102",
                                    detail: t("dashboard:mockup.admin.analytics.aiAlerts.details.spamDetail"),
                                    severity: "medium"
                                },
                            ].map((alert, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center",
                                            alert.severity === 'high' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                                        )}>
                                            <Zap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold">{alert.type} - <span className="text-muted-foreground font-normal">{alert.user}</span></h5>
                                            <p className="text-xs text-muted-foreground">{alert.detail}</p>
                                        </div>
                                    </div>
                                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'}>{alert.severity}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
