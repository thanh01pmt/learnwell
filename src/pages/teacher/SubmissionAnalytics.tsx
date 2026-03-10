import React from "react";
import {
    Users,
    ChevronRight,
    Filter,
    Download,
    Calendar,
    ArrowUpRight,
    TrendingDown,
    Activity,
    UserCheck,
    Search,
    MoreVertical
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FunnelChart from "../../components/dashboard/FunnelChart";
import SubmissionTimeline from "../../components/grading/SubmissionTimeline";

const SubmissionAnalytics = () => {
    const { t } = useTranslation(["teacher", "common"]);
    return (
        <div className="container py-8 space-y-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight">{t('teacher:analytics.title')}</h1>
                    <p className="text-muted-foreground">{t('teacher:analytics.description')}</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="w-4 h-4" />
                        {t('teacher:submissionAnalytics.header.last7Days')}
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        {t('teacher:submissionAnalytics.header.exportReport')}
                    </Button>
                </div>
            </div>

            {/* Insight Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Tổng lượt nộp", value: "1,284", change: "+12%", trend: "up", icon: Activity },
                    { label: "Tỷ lệ hoàn thành", value: "68.2%", change: "-2.5%", trend: "down", icon: UserCheck },
                    { label: "Thời gian TB", value: "42 phút", change: "+4m", trend: "up", icon: Users },
                    { label: "Học sinh tích cực", value: "156", change: "+8", trend: "up", icon: TrendingDown },
                ].map((stat, i) => (
                    <Card key={i} className="bg-card/50">
                        <CardContent className="p-4 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-muted rounded-lg">
                                    <stat.icon className="w-4 h-4 text-primary" />
                                </div>
                                <Badge variant="secondary" className={cn(
                                    "text-[10px] items-center gap-1",
                                    stat.trend === "up" ? "bg-success/5 text-success border-success/20" : "bg-destructive/5 text-destructive border-destructive/20"
                                )}>
                                    {stat.change}
                                    <ArrowUpRight className={cn("w-2.5 h-2.5", stat.trend === "down" && "rotate-90")} />
                                </Badge>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-black">{stat.value}</div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">{stat.label}</div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Visualization */}
                <Card className="lg:col-span-2 shadow-sm border-2 border-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-1">
                            <CardTitle>{t('teacher:submissionAnalytics.funnel.title')}</CardTitle>
                            <CardDescription>{t('teacher:submissionAnalytics.funnel.description')}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-[400px] w-full p-8 pt-0">
                            <FunnelChart
                                data={[
                                    { step: "Khởi tạo (Try)", count: 240, percentage: 100 },
                                    { step: "Chạy mã (Run)", count: 180, percentage: 75 },
                                    { step: "Nộp bài (Submit)", count: 120, percentage: 50 },
                                    { step: "Chấp nhận (Pass)", count: 85, percentage: 35 },
                                ]}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Context */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{t('teacher:submissionAnalytics.aiInsights.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-200">
                                        <Users className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                        <div className="text-[11px] font-bold truncate">{t('teacher:submissionAnalytics.aiInsights.studentIssue', { id: i })}</div>
                                        <div className="text-[10px] text-muted-foreground">{t('teacher:submissionAnalytics.aiInsights.mockFeedback')}</div>
                                    </div>
                                    <ChevronRight className="w-3 h-3 ml-auto self-center opacity-40" />
                                </div>
                            ))}
                            <Button variant="link" className="w-full text-[11px] text-primary p-0 h-auto">{t('teacher:submissionAnalytics.aiInsights.viewAll')}</Button>
                        </CardContent>
                    </Card>

                    <Card border-dashed className="border-2 border-dashed bg-muted/20">
                        <CardContent className="p-6 text-center space-y-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-bold text-sm">{t('teacher:submissionAnalytics.performance.title')}</h4>
                            <p className="text-xs text-muted-foreground italic">{t('teacher:submissionAnalytics.performance.goalDescription')}</p>
                            <Button size="sm" className="w-full text-xs">{t('teacher:submissionAnalytics.performance.setGoal')}</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Timeline for Detail inspection */}
            <div className="space-y-4 pt-12">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        {t('teacher:submissionAnalytics.timeline.title')}
                    </h3>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder={t('teacher:submissionAnalytics.timeline.searchPlaceholder')} className="pl-9 h-9" />
                        </div>
                        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('teacher:submissionAnalytics.timeline.filter')}</Button>
                    </div>
                </div>

                <SubmissionTimeline />
            </div>
        </div>
    );
};

export default SubmissionAnalytics;
