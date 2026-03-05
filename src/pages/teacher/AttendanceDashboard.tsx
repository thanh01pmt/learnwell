import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Filter,
    Download,
    Users,
    TrendingUp,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    FileSpreadsheet,
    QrCode
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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

// Mock Data
const attendanceData = [
    { id: 1, name: "classroom:mocks.students.an", status: "present", time: "07:30", note: "" },
    { id: 2, name: "classroom:mocks.students.binh", status: "present", time: "07:35", note: "" },
    { id: 3, name: "classroom:mocks.students.cuong", status: "late", time: "07:55", note: "dashboard:mockup.attendance.notes.bikeBroken" },
    { id: 4, name: "classroom:mocks.students.duc", status: "absent", time: "-", note: "dashboard:mockup.attendance.notes.sickExcused" },
    { id: 5, name: "classroom:mocks.students.yen", status: "present", time: "07:42", note: "" },
    { id: 6, name: "classroom:mocks.students.dang", status: "present", time: "07:31", note: "" },
    { id: 7, name: "classroom:mocks.students.thao", status: "absent", time: "-", note: "dashboard:mockup.attendance.notes.unexcused" },
    { id: 8, name: "classroom:mocks.students.tuan", status: "late", time: "08:10", note: "dashboard:mockup.attendance.notes.overslept" },
];

const weeklyStats = [
    { day: "dashboard:mockup.teacher.classes.monShort", rate: 95 },
    { day: "dashboard:mockup.teacher.classes.tueShort", rate: 98 },
    { day: "dashboard:mockup.teacher.classes.wedShort", rate: 92 },
    { day: "dashboard:mockup.teacher.classes.thuShort", rate: 88 },
    { day: "dashboard:mockup.teacher.classes.friShort", rate: 94 },
    { day: "dashboard:mockup.teacher.classes.satShort", rate: 90 },
];

export default function AttendanceDashboard() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredData = attendanceData.filter(s => {
        const matchesSearch = t(s.name as any).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || s.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AppLayout>
            <div className="container mx-auto py-6 md:py-10 space-y-8 animate-fade-in pb-20">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-primary/20 text-primary">
                                <CalendarIcon className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:attendance.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">
                            {t("teacher:attendance.subtitle" as any, {
                                class: "10A1",
                                date: new Date(2026, 1, 6).toLocaleDateString(t("common:locale" as any), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                            } as any) as any}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" className="gap-2 glass-card">
                            <QrCode className="h-4 w-4" />
                            {t("teacher:attendance.actions.qrScan" as any) as any}
                        </Button>
                        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary">
                            <FileSpreadsheet className="h-4 w-4" />
                            {t("teacher:attendance.actions.export" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: t("teacher:attendance.stats.totalStudents" as any) as any, value: "32", color: "bg-blue-500", icon: Users },
                        { label: t("teacher:attendance.stats.present" as any) as any, value: "28", color: "bg-primary", icon: CheckCircle2 },
                        { label: t("teacher:attendance.stats.absent" as any) as any, value: "2", color: "bg-destructive", icon: XCircle },
                        { label: t("teacher:attendance.stats.late" as any) as any, value: "2", color: "bg-warning", icon: Clock },
                    ].map((stat, i) => (
                        <Card key={i} className="glass-card">
                            <CardContent className="p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-3xl font-black mt-1">{stat.value}</p>
                                </div>
                                <div className={cn("p-3 rounded-2xl text-white", stat.color)}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Attendance List */}
                    <Card className="glass-card lg:col-span-2">
                        <CardHeader className="pb-4 border-b border-border/50">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-lg">{t("teacher:attendance.sections.list" as any) as any}</CardTitle>
                                    <CardDescription>{t("teacher:attendance.sections.listDesc" as any) as any}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                        <Input
                                            placeholder={t("teacher:attendance.actions.search" as any) as any}
                                            className="h-8 pl-8 text-xs w-40 glass-card"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                {['all', 'present', 'absent', 'late'].map((f) => (
                                    <Button
                                        key={f}
                                        variant={filter === f ? "default" : "outline"}
                                        className="h-7 px-3 text-[10px] rounded-full"
                                        onClick={() => setFilter(f)}
                                    >
                                        {t(`teacher:attendance.filters.${f}` as any) as any}
                                    </Button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="text-[10px] text-muted-foreground font-bold uppercase bg-muted/20">
                                        <tr>
                                            <th className="px-6 py-3">{t("teacher:attendance.table.student" as any) as any}</th>
                                            <th className="px-6 py-3">{t("teacher:attendance.table.status" as any) as any}</th>
                                            <th className="px-6 py-3">{t("teacher:attendance.table.time" as any) as any}</th>
                                            <th className="px-6 py-3">{t("teacher:attendance.table.note" as any) as any}</th>
                                            <th className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {filteredData.map((student) => (
                                            <tr key={student.id} className="group hover:bg-muted/10 transition-colors">
                                                <td className="px-6 py-4 font-bold">{student.name.includes(':') ? t(student.name as any) : student.name}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={cn(
                                                        "text-[10px] rounded-full border-none",
                                                        student.status === 'present' ? "bg-primary/10 text-primary" :
                                                            student.status === 'absent' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                                                    )}>
                                                        {t(`teacher:attendance.status.${student.status}` as any) as any}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-muted-foreground">{student.time}</td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-muted-foreground italic truncate block max-w-[150px]">
                                                        {student.note.includes('dashboard:') ? t(student.note as any) : student.note || "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Side Analytics */}
                    <div className="space-y-6">
                        {/* Weekly Trend */}
                        <Card className="glass-card overflow-hidden">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    {t("teacher:attendance.sections.weeklyTrend" as any) as any}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 pt-4">
                                <div className="h-[180px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklyStats}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                fontSize={10}
                                                stroke="hsl(var(--muted-foreground))"
                                                tickFormatter={(value) => t(value as any) as any}
                                            />
                                            <YAxis hide domain={[0, 100]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '10px' }}
                                                cursor={{ fill: 'hsl(var(--primary))', opacity: 0.1 }}
                                            />
                                            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                                                {weeklyStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.rate > 90 ? 'hsl(var(--success))' : 'hsl(var(--warning))'} fillOpacity={0.8} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="p-4 bg-muted/20 rounded-xl mt-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                        <span>{t("teacher:attendance.stats.avgRate" as any) as any}</span>
                                        <span className="text-primary">92.4%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Calendar Heatmap Placeholder */}
                        <Card className="glass-card">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold">{t("teacher:attendance.sections.history" as any) as any}</CardTitle>
                                <CardDescription className="text-[10px]">{t("teacher:attendance.sections.historyDesc" as any) as any}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-7 gap-1">
                                        {Array.from({ length: 28 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "aspect-square rounded-[2px] border-[0.5px] border-border/20",
                                                    Math.random() > 0.8 ? "bg-destructive/40" : Math.random() > 0.6 ? "bg-primary/40" : "bg-primary"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-[8px] text-muted-foreground font-bold uppercase">
                                        <span>{t("teacher:attendance.legend.low" as any) as any}</span>
                                        <div className="flex gap-0.5">
                                            <div className="w-2 h-2 bg-primary" />
                                            <div className="w-2 h-2 bg-primary/40" />
                                            <div className="w-2 h-2 bg-red-400" />
                                        </div>
                                        <span>{t("teacher:attendance.legend.high" as any) as any}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Alert */}
                        <Card className="glass-card bg-red-500/5 border-red-500/20">
                            <CardContent className="p-4 flex gap-3">
                                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-destructive">{t("teacher:attendance.alerts.absenteeismTitle" as any) as any}</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">{t("teacher:attendance.alerts.absenteeismDesc" as any, { name: t("classroom:mocks.students.thao"), count: 3 } as any) as any}</p>
                                    <Button variant="link" className="h-auto p-0 text-[10px] text-destructive mt-1 font-bold">{t("teacher:attendance.actions.contactParent" as any) as any}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
