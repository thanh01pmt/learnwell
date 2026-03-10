import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    Download,
    MoreVertical,
    GripVertical
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const scheduleData = [
    { id: "1", subjectKey: "math", class: "10A1", teacherKey: "classroom:mocks.teachers.teacherA", room: "302", dayIndex: 0, time: "08:00", duration: "2h", color: "bg-blue-500" },
    { id: "2", subjectKey: "literature", class: "10A1", teacherKey: "classroom:mocks.teachers.teacherB", room: "201", dayIndex: 0, time: "10:00", duration: "2h", color: "bg-primary" },
    { id: "3", subjectKey: "physics", class: "11B2", teacherKey: "classroom:mocks.students.teacherC", room: "Lab 1", dayIndex: 1, time: "13:00", duration: "1.5h", color: "bg-purple-500" },
    { id: "4", subjectKey: "english", class: "10A1", teacherKey: "classroom:mocks.teachers.teacherD", room: "105", dayIndex: 2, time: "09:00", duration: "1h", color: "bg-amber-500", conflict: true },
    { id: "5", subjectKey: "chemistry", class: "12C3", teacherKey: "classroom:mocks.teachers.teacherE", room: "Lab 2", dayIndex: 3, time: "15:00", duration: "2h", color: "bg-rose-500" },
];


export default function TimetableBuilder() {
    const { t } = useTranslation(["dashboard", "common"]);
    const days = t("dashboard:mockup.admin.timetable.days", { returnObjects: true }) as string[];
    const [selectedGrade, setSelectedGrade] = useState("all");


    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
                            <Calendar className="h-7 w-7 text-primary" />
                            {t("dashboard:mockup.admin.timetable.title")}
                        </h1>
                        <p className="text-muted-foreground">{t("dashboard:mockup.admin.timetable.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Download className="h-4 w-4" /> {t("dashboard:mockup.admin.timetable.actions.exportExcel")}
                        </Button>
                        <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20">
                            <Plus className="h-4 w-4" /> {t("dashboard:mockup.admin.timetable.actions.addNew")}
                        </Button>
                    </div>

                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center bg-card/50 p-2 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        {[
                            { id: "all", label: t("dashboard:mockup.admin.timetable.filters.all") },
                            { id: "10", label: t("dashboard:mockup.admin.enrollment.table.gradeLevel", { grade: 10 }) },
                            { id: "11", label: t("dashboard:mockup.admin.enrollment.table.gradeLevel", { grade: 11 }) },
                            { id: "12", label: t("dashboard:mockup.admin.enrollment.table.gradeLevel", { grade: 12 }) }
                        ].map((grade) => (
                            <Button
                                key={grade.id}
                                variant={selectedGrade === grade.id ? "default" : "ghost"}
                                size="sm"
                                className="rounded-xl whitespace-nowrap"
                                onClick={() => setSelectedGrade(grade.id)}
                            >
                                {grade.label}
                            </Button>
                        ))}
                    </div>

                    <div className="h-4 w-px bg-border hidden sm:block mx-1"></div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="gap-2 rounded-xl flex-1 sm:flex-none">
                            <Filter className="h-4 w-4" /> {t("dashboard:mockup.admin.timetable.filters.advanced")}
                        </Button>
                        <div className="flex items-center gap-1 bg-muted/50 rounded-xl px-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4" /></Button>
                            <span className="text-xs font-bold px-2">{t("dashboard:mockup.admin.timetable.table.weekLabel", { week: 12, start: "09/02", end: "14/02" })}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4" /></Button>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Main Timetable Grid */}
                    <Card className="xl:col-span-3 glass-card overflow-hidden">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <div className="min-w-[800px]">
                                    {/* Grid Header */}
                                    <div className="grid grid-cols-6 border-b border-border/50 bg-muted/30">
                                        <div className="p-4 border-r border-border/50"></div>
                                        {days.map(day => (
                                            <div key={day} className="p-4 text-center font-black text-xs uppercase tracking-widest text-muted-foreground border-r border-border/50 last:border-0">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Grid Body */}
                                    <div className="relative">
                                        {timeSlots.map(time => (
                                            <div key={time} className="grid grid-cols-6 border-b border-border/10 h-24 sm:h-32">
                                                <div className="p-2 text-[10px] font-bold text-muted-foreground border-r border-border/50 text-right pr-4">
                                                    {time}
                                                </div>
                                                {days.map((day, dIndex) => {
                                                    const items = scheduleData.filter(d => d.dayIndex === dIndex && d.time === time);
                                                    return (
                                                        <div key={`${day}-${time}`} className="relative border-r border-border/10 last:border-0 p-1 group">

                                                            {items.map(item => (
                                                                <motion.div
                                                                    key={item.id}
                                                                    initial={{ scale: 0.95, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    className={`absolute inset-1 rounded-xl p-2 text-white shadow-xl ${item.color} z-10 cursor-move flex flex-col justify-between group/item`}
                                                                >
                                                                    <div>
                                                                        <div className="flex items-center justify-between mb-1">
                                                                            <Badge className="bg-white/20 hover:bg-white/30 text-[9px] px-1 h-3.5 border-0">
                                                                                {item.class}
                                                                            </Badge>
                                                                            <MoreVertical className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                                        </div>
                                                                        <h4 className="font-bold text-[11px] leading-tight truncate">{t(`dashboard:mockup.subjects.${item.subjectKey}`)}</h4>
                                                                        <p className="text-[9px] opacity-90 truncate">{t(item.teacherKey as any)}</p>
                                                                    </div>
                                                                    <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/20">
                                                                        <div className="flex items-center gap-1 text-[9px]">
                                                                            <MapPin className="h-2.5 w-2.5" />
                                                                            {t("dashboard:mockup.schedule.room", { room: item.room })}
                                                                        </div>

                                                                        {item.conflict && (
                                                                            <AlertCircle className="h-3 w-3 text-white animate-pulse" />
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity border-2 border-dashed border-primary/20 rounded-lg m-1">
                                                                <Plus className="h-4 w-4 text-primary" />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar - Unassigned & Analytics */}
                    <div className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-warning" />
                                    {t("dashboard:mockup.admin.timetable.conflicts.title", { count: 2 })}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl space-y-2">
                                    <p className="text-xs font-bold text-destructive">{t("dashboard:mockup.admin.timetable.conflicts.roomConflict")}</p>
                                    <p className="text-[10px] text-muted-foreground">{t("dashboard:mockup.admin.timetable.conflicts.roomConflictDesc", { room: "105", class1: "10A1", class2: "11A2", time: "09:00" })}</p>
                                    <Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-destructive font-black underline">{t("dashboard:mockup.admin.timetable.conflicts.solveNow")}</Button>
                                </div>
                                <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl space-y-2">
                                    <p className="text-xs font-bold text-warning">{t("dashboard:mockup.admin.timetable.conflicts.teacherConflict")}</p>
                                    <p className="text-[10px] text-muted-foreground">{t("dashboard:mockup.admin.timetable.conflicts.teacherConflictDesc", { teacher: "Mr. Nam", day: days[4] })}</p>
                                </div>
                            </CardContent>
                        </Card>


                        <Card className="glass-card">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <Users className="h-4 w-4 text-primary" />
                                    {t("dashboard:mockup.admin.timetable.unassigned.title", { count: 5 })}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="space-y-1">
                                    {[
                                        { nameKey: "dashboard:mockup.subjects.math", key: "math", suffix: "12C1" },
                                        { nameKey: "dashboard:mockup.subjects.physics", key: "physics", suffix: "11B3" },
                                        { nameKey: "dashboard:mockup.subjects.chemistry", key: "chemistry", suffix: "10A5" },
                                        { nameKey: "dashboard:mockup.subjects.english", key: "english", suffix: "12D1" },
                                        { nameKey: "dashboard:mockup.subjects.civics", key: "civics", suffix: "10A1" }
                                    ].map((c, i) => (
                                        <div key={i} className="px-4 py-2 hover:bg-muted/30 flex items-center justify-between group cursor-pointer border-b border-border/10 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                                                <span className="text-xs font-medium">{t(c.nameKey as any)} {c.suffix}</span>
                                            </div>
                                            <Badge variant="secondary" className="text-[9px]">{t("dashboard:mockup.admin.timetable.table.duration", { count: 2 })}</Badge>
                                        </div>
                                    ))}

                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card bg-primary shadow-xl shadow-primary/20">
                            <CardContent className="p-4 space-y-4">
                                <div className="bg-white/10 rounded-2xl p-4 text-white text-center">
                                    <p className="text-[10px] opacity-70 uppercase tracking-widest font-black">{t("dashboard:mockup.admin.timetable.unassigned.performance")}</p>
                                    <p className="text-3xl font-black">92%</p>
                                </div>
                                <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                                    {t("dashboard:mockup.admin.timetable.actions.autoSchedule")}
                                </Button>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
