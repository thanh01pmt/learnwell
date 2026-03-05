import { useTranslation } from "react-i18next";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import {
    Server,
    Cpu,
    Database,
    Search,
    Zap,
    HardDrive,
    RefreshCw,
    Plus,
    Play,
    RotateCcw,
    AlertCircle,
    BarChart3
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const resourceUsage = [
    { resource: "Storage (CDN)", current: 850, total: 1000, color: "#6366f1" },
    { resource: "API Calls / Day", current: 42000, total: 50000, color: "#ec4899" },
    { resource: "Video Processing", current: 25, total: 100, color: "#10b981" },
    { resource: "Database IOPS", current: 320, total: 500, color: "#f59e0b" },
];

export default function ResourceOptimization() {
    const { t } = useTranslation(["dashboard", "common"]);

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard:mockup.admin.resourceOptimization.title")}</h1>
                        <p className="text-muted-foreground">{t("dashboard:mockup.admin.resourceOptimization.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.resourceOptimization.actions.refresh")}
                        </Button>
                        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" />
                            {t("dashboard:mockup.admin.resourceOptimization.actions.addCluster")}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Real-time Load Cards */}
                    <Card className="bg-slate-900 text-white overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Cpu className="h-20 w-20" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t("dashboard:mockup.admin.resourceOptimization.stats.cpuLoad")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">42.8%</div>
                            <div className="flex items-center gap-2 mt-4 bg-white/5 p-2 rounded-lg">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[42.8%]" />
                                </div>
                                <span className="text-[10px] font-bold">{t("dashboard:mockup.admin.resourceOptimization.stats.stable")}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Database className="h-20 w-20" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t("dashboard:mockup.admin.resourceOptimization.stats.dbRam")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">68.2%</div>
                            <div className="flex items-center gap-2 mt-4 bg-white/5 p-2 rounded-lg">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[68.2%]" />
                                </div>
                                <span className="text-[10px] font-bold">{t("dashboard:mockup.admin.resourceOptimization.stats.optimize")}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <HardDrive className="h-20 w-20" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">{t("dashboard:mockup.admin.resourceOptimization.stats.latency")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">14ms</div>
                            <div className="flex items-center gap-2 mt-4 bg-white/5 p-2 rounded-lg">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[15%]" />
                                </div>
                                <span className="text-[10px] font-bold">{t("dashboard:mockup.admin.resourceOptimization.stats.excellent")}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("dashboard:mockup.admin.resourceOptimization.quotas.title")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.resourceOptimization.quotas.description")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resourceUsage.map((r, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold">{r.resource}</span>
                                        <span className="text-muted-foreground">{r.current} / {r.total}</span>
                                    </div>
                                    <Progress value={(r.current / r.total) * 100} className="h-2" />
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t flex justify-center py-3">
                            <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">{t("dashboard:mockup.admin.resourceOptimization.actions.autoScaling")}</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-slate-50 border-dashed">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">{t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.title")}</span>
                            </div>
                            <CardTitle>{t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.strategyTitle")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-white border rounded-xl shadow-sm space-y-2">
                                <h5 className="font-bold text-sm">{t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.cdnCompression.title")}</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.cdnCompression.desc")}
                                </p>
                                <Button size="sm" className="mt-2 h-8 text-[10px] uppercase font-bold">{t("dashboard:mockup.admin.resourceOptimization.actions.executeNow")}</Button>
                            </div>
                            <div className="p-4 bg-white border rounded-xl shadow-sm space-y-2">
                                <h5 className="font-bold text-sm">{t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.coldStorage.title")}</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {t("dashboard:mockup.admin.resourceOptimization.aiRecommendations.coldStorage.desc")}
                                </p>
                                <Button size="sm" variant="outline" className="mt-2 h-8 text-[10px] uppercase font-bold">{t("dashboard:mockup.admin.resourceOptimization.actions.schedule")}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            {t("dashboard:mockup.admin.resourceOptimization.cost.title")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: "Week 1", cost: 120 },
                                    { name: "Week 2", cost: 145 },
                                    { name: "Week 3", cost: 110 },
                                    { name: "Week 4", cost: 160 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} />
                                    <Bar dataKey="cost" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
