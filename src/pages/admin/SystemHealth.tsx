import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Activity,
    Server,
    Database,
    Cpu,
    HardDrive,
    AlertTriangle,
    CheckCircle2,
    Clock,
    RefreshCw,
    Search,
    Filter
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
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


// Mock data for system metrics
const metricsHistory = Array.from({ length: 60 }, (_, i) => ({
    time: `${i}m`,
    cpu: 45 + Math.random() * 20,
    memory: 60 + Math.random() * 15,
    latency: 120 + Math.random() * 50,
}));

const errorLogs = [
    { id: 1, type: "404 Not Found", route: "/api/v1/students/stats", count: 124, lastSeen: { key: "dashboard:mockup.notifications.time.minutes", count: 2 }, severity: "low" },
    { id: 2, type: "500 Internal Server Error", route: "/api/v1/assignments/submit", count: 12, lastSeen: { key: "dashboard:mockup.notifications.time.minutes", count: 15 }, severity: "high" },
    { id: 3, type: "401 Unauthorized", route: "/api/v1/admin/settings", count: 45, lastSeen: { key: "dashboard:mockup.notifications.time.hours", count: 1 }, severity: "medium" },
    { id: 4, type: "Timeout", route: "/api/v1/reports/generate", count: 8, lastSeen: { key: "dashboard:mockup.notifications.time.hours", count: 3 }, severity: "medium" },
];

const userSessionData = [
    { roleKey: "student", value: 450, color: "hsl(var(--primary))" },
    { roleKey: "teacher", value: 85, color: "hsl(var(--accent))" },
    { roleKey: "parent", value: 120, color: "hsl(var(--warning))" },
    { roleKey: "admin", value: 12, color: "hsl(var(--destructive))" },
];


export default function SystemHealth() {
    const { t } = useTranslation(["dashboard", "common"]);
    const [cpuUsage, setCpuUsage] = useState(54);
    const [memUsage, setMemUsage] = useState(68);
    const [isRefreshing, setIsRefreshing] = useState(false);


    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
            setMemUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Activity className="h-6 w-6 text-primary" />
                            {t("dashboard:mockup.admin.health.title")}
                        </h1>
                        <p className="text-muted-foreground">{t("dashboard:mockup.admin.health.subtitle")}</p>
                    </div>
                    <Button
                        variant="outline"
                        className="gap-2 glass-card"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {t("dashboard:mockup.admin.health.actions.refresh")}
                    </Button>

                </div>

                {/* Real-time Status Gauges */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">{t("dashboard:mockup.admin.health.stats.cpuUsage")}</p>
                                    <div className="flex items-end justify-between">
                                        <p className="text-2xl font-bold">{cpuUsage.toFixed(1)}%</p>
                                        <Badge variant={cpuUsage > 80 ? "destructive" : "outline"} className="text-[10px]">
                                            {cpuUsage > 80 ? t("dashboard:mockup.admin.health.status.high") : t("dashboard:mockup.admin.health.status.normal")}
                                        </Badge>
                                    </div>

                                    <Progress value={cpuUsage} className="h-1.5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                    <HardDrive className="h-6 w-6 text-accent" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">{t("dashboard:mockup.admin.health.stats.memory")}</p>
                                    <div className="flex items-end justify-between">
                                        <p className="text-2xl font-bold">{memUsage.toFixed(1)}%</p>
                                        <Badge variant="outline" className="text-[10px]">12.4GB / 16GB</Badge>
                                    </div>
                                    <Progress value={memUsage} className="h-1.5" />
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                                    <Server className="h-6 w-6 text-success" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">{t("dashboard:mockup.admin.health.stats.dbLatency")}</p>
                                    <p className="text-2xl font-bold">42ms</p>
                                    <div className="flex items-center gap-1 text-[10px] text-success">
                                        <CheckCircle2 className="h-3 w-3" />
                                        {t("dashboard:mockup.admin.health.status.optimal")}
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-warning" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm text-muted-foreground font-medium">{t("dashboard:mockup.admin.health.stats.uptime")}</p>
                                    <p className="text-2xl font-bold">99.98%</p>
                                    <p className="text-[10px] text-muted-foreground italic">{t("dashboard:mockup.admin.health.stats.last30days")}</p>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Historical Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">{t("dashboard:mockup.admin.health.charts.systemLoad")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.health.charts.systemLoadDesc")}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={metricsHistory}>
                                        <defs>
                                            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                                        <XAxis dataKey="time" hide />
                                        <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                            }}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="cpu"
                                            stroke="hsl(var(--primary))"
                                            fill="url(#colorCpu)"
                                            name={t("dashboard:mockup.admin.health.charts.cpuName")}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="memory"
                                            stroke="hsl(var(--accent))"
                                            fill="url(#colorMem)"
                                            name={t("dashboard:mockup.admin.health.charts.memName")}
                                        />

                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">{t("dashboard:mockup.admin.health.charts.userSessions")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.health.charts.userSessionsDesc")}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userSessionData.map(d => ({
                                                ...d,
                                                name: t(`dashboard:mockup.admin.health.charts.roles.${d.roleKey}`)
                                            }))}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >

                                            {userSessionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '12px',
                                            }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Error Tracking Table */}
                <Card className="glass-card overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/20">
                        <div>
                            <CardTitle className="text-lg">{t("dashboard:mockup.admin.health.errors.title")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.health.errors.subtitle")}</CardDescription>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/30 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-6 py-3">{t("dashboard:mockup.admin.health.errors.table.type")}</th>
                                        <th className="px-6 py-3">{t("dashboard:mockup.admin.health.errors.table.route")}</th>
                                        <th className="px-6 py-3 text-center">{t("dashboard:mockup.admin.health.errors.table.frequency")}</th>
                                        <th className="px-6 py-3">{t("dashboard:mockup.admin.health.errors.table.lastSeen")}</th>
                                        <th className="px-6 py-3">{t("dashboard:mockup.admin.health.errors.table.severity")}</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>

                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {errorLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-muted/10 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-primary">{log.type}</td>
                                            <td className="px-6 py-4 font-mono text-xs">{log.route}</td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant="outline">{log.count}</Badge>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{t(log.lastSeen.key, { count: log.lastSeen.count })}</td>

                                            <td className="px-6 py-4">
                                                <Badge
                                                    className={
                                                        log.severity === 'high' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                            log.severity === 'medium' ? 'bg-warning/10 text-warning border-warning/20' :
                                                                'bg-success/10 text-success border-success/20'
                                                    }
                                                    variant="outline"
                                                >
                                                    {log.severity.toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm">{t("dashboard:mockup.admin.health.errors.table.details")}</Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
