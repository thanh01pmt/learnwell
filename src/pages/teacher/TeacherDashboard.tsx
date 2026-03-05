import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    Calendar,
    Users,
    ChevronRight,
    Bell,
    School,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Clock,
    UserCheck,
    TrendingUp,
    Sparkles,
    Pen
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teacherActivities as mockActivities, teacherClasses as mockClasses } from "@/mocks";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClassCard } from "@/components/dashboard/ClassCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const { t } = useTranslation(["teacher", "dashboard", "common", "classroom"]);

    const today = new Date().toLocaleDateString(t("common:locale"), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Prepare localized data
    const localizedClasses = mockClasses.map(c => ({
        ...c,
        name: t(c.name as any),
        subject: t(c.subject as any),
        schedule: t(c.schedule as any)
    }));

    const localizeParams = (params?: Record<string, any>) => {
        if (!params) return undefined;
        const localized: Record<string, any> = {};
        for (const [key, value] of Object.entries(params)) {
            // If value looks like an i18n key (contains ':'), translate it
            if (typeof value === "string" && value.includes(":")) {
                localized[key] = t(value as any);
            } else {
                localized[key] = value;
            }
        }
        return localized;
    };

    const localizedActivities = mockActivities.map(a => {
        const params = localizeParams(a.params);
        return {
            ...a,
            title: t(a.title as any, params as any),
            description: t(a.description as any, params as any),
            time: t(`common:time.${a.timeKey}`, { count: a.timeCount }),
            user: a.user ? {
                ...a.user,
                name: a.user.name.includes(":") ? t(a.user.name as any) : a.user.name
            } : undefined
        };
    });

    return (
        <AppLayout>
            <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in">
                {/* Header section with Stats */}
                <div className="flex flex-col gap-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                {t("teacher:dashboard.greeting", { name: t("teacher:dashboard.teacherTony") })}
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 text-sm lg:text-base">
                                <Calendar className="h-4 w-4 text-primary" />
                                {t("teacher:dashboard.todayDate", { date: today })}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-card rounded-xl" onClick={() => navigate("/teacher/attendance")}>
                                <UserCheck className="mr-2 h-4 w-4" /> {t("teacher:dashboard.quickActions.attendance")}
                            </Button>
                            <Button size="sm" className="bg-primary rounded-xl">
                                <Plus className="mr-2 h-4 w-4" /> {t("teacher:dashboard.quickActions.createAssignment")}
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title={t("teacher:dashboard.stats.totalClasses")}
                            value="6"
                            icon={<School className="h-5 w-5" />}
                            variant="primary"
                        />
                        <StatCard
                            title={t("teacher:dashboard.stats.totalStudents")}
                            value="184"
                            icon={<Users className="h-5 w-5" />}
                            variant="success"
                        />
                        <StatCard
                            title={t("teacher:dashboard.stats.gradingPending")}
                            value="12"
                            icon={<Pen className="h-5 w-5" />}
                            variant="warning"
                        />
                        <StatCard
                            title={t("teacher:dashboard.stats.urgentRequests")}
                            value="2"
                            icon={<AlertCircle className="h-5 w-5" />}
                            variant="accent"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* My Classes Summary */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{t("teacher:dashboard.sections.myClasses")}</h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:bg-primary/10"
                                        onClick={() => navigate("/teacher/classes")}
                                    >
                                        {t("teacher:dashboard.actions.seeAll")}
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {localizedClasses.map((classItem) => (
                                        <ClassCard key={classItem.id} {...classItem} />
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{t("teacher:dashboard.sections.recentActivity")}</h2>
                                    <Button variant="outline" size="sm" className="rounded-xl">
                                        {t("teacher:dashboard.actions.filter")}
                                    </Button>
                                </div>
                                <ActivityFeed activities={localizedActivities as any} />
                            </div>
                        </div>

                        {/* Sidebar Area */}
                        <div className="space-y-8">
                            {/* Notifications / Quick Actions */}
                            <div className="glass-card rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Bell className="h-5 w-5 text-primary" />
                                    <h3 className="font-bold">{t("teacher:dashboard.sections.notifications")}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Sparkles className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold">{t("dashboard:actions.continueWorking")}</p>
                                            <p className="text-[10px] text-muted-foreground">{t("dashboard:mockup.planner.pendingTasks", { count: 2 })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Students Join Request */}
                            <div className="glass-card rounded-2xl p-5 border-l-4 border-primary">
                                <h3 className="font-bold mb-4">{t("teacher:dashboard.sections.newStudents")}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                                AN
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{t("classroom:mocks.students.an")}</p>
                                                <p className="text-[10px] text-muted-foreground">{t("classroom:mocks.classes.math6a")}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">{t("dashboard:stats.pending")}</Badge>
                                    </div>
                                </div>
                                <Button className="w-full mt-4 rounded-xl gap-2">
                                    {t("teacher:dashboard.actions.approveAll")}
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
