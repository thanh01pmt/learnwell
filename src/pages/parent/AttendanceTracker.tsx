import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Clock,
    Info
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const attendanceData = [
    { date: "2024-01-01", status: "present" },
    { date: "2024-01-02", status: "present" },
    { date: "2024-01-03", status: "late" },
    { date: "2024-01-04", status: "present" },
    { date: "2024-01-05", status: "absent" },
    { date: "2024-01-08", status: "present" },
    { date: "2024-01-09", status: "present" },
    { date: "2024-01-10", status: "present" },
    { date: "2024-01-11", status: "late" },
    { date: "2024-01-12", status: "present" },
    { date: "2024-01-15", status: "present" },
    { date: "2024-01-16", status: "present" },
    { date: "2024-01-17", status: "present" },
    { date: "2024-01-18", status: "absent" },
    { date: "2024-01-19", status: "present" },
];

export default function AttendanceTracker() {
    const { t } = useTranslation();
    const [currentMonth, setCurrentMonth] = useState(`${t("common:months.january")}, 2024`);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "present": return "bg-success/20 text-success border-success/30";
            case "absent": return "bg-destructive/20 text-destructive border-destructive/30";
            case "late": return "bg-warning/20 text-warning border-warning/30";
            default: return "bg-muted text-muted-foreground";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "present": return <CheckCircle2 className="h-4 w-4" />;
            case "absent": return <XCircle className="h-4 w-4" />;
            case "late": return <Clock className="h-4 w-4" />;
            default: return null;
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6 text-primary" />
                            {t("parent:attendance.title" as any) as any}
                        </h1>
                        <p className="text-muted-foreground">{t("parent:attendance.studentInfo" as any, { name: t("parent:mocks.children.child1"), class: "6A1" } as any) as any}</p>
                    </div>
                    <div className="flex items-center gap-2 glass-card p-2 rounded-xl">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-bold px-2">{currentMonth}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="glass-card border-success/30 bg-success/5">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-black">{t("parent:attendance.stats.present" as any) as any}</p>
                                <p className="text-3xl font-black text-success">18/22</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-success opacity-50" />
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-warning/30 bg-warning/5">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-black">{t("parent:attendance.stats.late" as any) as any}</p>
                                <p className="text-3xl font-black text-warning">2</p>
                            </div>
                            <Clock className="h-8 w-8 text-warning opacity-50" />
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-destructive/30 bg-destructive/5">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-black">{t("parent:attendance.stats.absent" as any) as any}</p>
                                <p className="text-3xl font-black text-destructive">2</p>
                            </div>
                            <XCircle className="h-8 w-8 text-destructive opacity-50" />
                        </CardContent>
                    </Card>
                </div>

                {/* Calendar View */}
                <Card className="glass-card overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-4">
                        <div className="grid grid-cols-7 text-center text-xs font-black text-muted-foreground tracking-widest uppercase">
                            <span>{t("parent:attendance.calendar.mon" as any) as any}</span>
                            <span>{t("parent:attendance.calendar.tue" as any) as any}</span>
                            <span>{t("parent:attendance.calendar.wed" as any) as any}</span>
                            <span>{t("parent:attendance.calendar.thu" as any) as any}</span>
                            <span>{t("parent:attendance.calendar.fri" as any) as any}</span>
                            <span className="text-destructive/50">{t("parent:attendance.calendar.sat" as any) as any}</span>
                            <span className="text-destructive/50">{t("parent:attendance.calendar.sun" as any) as any}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-7 border-t border-border/30">
                            {/* Empty days padding */}
                            <div className="h-24 sm:h-32 border-b border-r border-border/10 bg-muted/5"></div>

                            {Array.from({ length: 31 }).map((_, i) => {
                                const day = i + 1;
                                const dateStr = `2024-01-${day.toString().padStart(2, '0')}`;
                                const record = attendanceData.find(d => d.date === dateStr);
                                const isWeekend = (day + 1) % 7 === 6 || (day + 1) % 7 === 0;

                                return (
                                    <div key={day} className={`h-24 sm:h-32 border-b border-r border-border/10 p-2 sm:p-4 flex flex-col justify-between transition-colors hover:bg-muted/5 ${isWeekend ? 'bg-muted/10' : ''}`}>
                                        <span className={`text-xs font-bold ${isWeekend ? 'text-destructive/50' : 'text-muted-foreground'}`}>{day}</span>
                                        {record && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className={`mt-auto p-1.5 sm:p-2 rounded-lg flex flex-col items-center gap-1 ${getStatusColor(record.status)}`}
                                            >
                                                {getStatusIcon(record.status)}
                                                <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:block">
                                                    {t(`parent:attendance.status.${record.status}` as any) as any}
                                                </span>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Legend & Notifications */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 glass-card p-6 rounded-2xl flex items-center justify-around border-border/50">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-success"></div>
                            <span className="text-xs font-medium">{t("parent:attendance.legend.present" as any) as any}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-warning"></div>
                            <span className="text-xs font-medium">{t("parent:attendance.legend.late" as any) as any}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-destructive"></div>
                            <span className="text-xs font-medium">{t("parent:attendance.legend.excused" as any) as any}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-slate-400"></div>
                            <span className="text-xs font-medium">{t("parent:attendance.legend.unexcused" as any) as any}</span>
                        </div>
                    </div>

                    <Card className="max-w-md w-full glass-card border-primary/20 bg-primary/5">
                        <CardContent className="p-4 flex gap-4">
                            <Info className="h-6 w-6 text-primary shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {t("parent:attendance.info" as any) as any}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
