import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Grid,
    Save,
    RotateCcw,
    Layout,
    Plus,
    Trash2,
    UserPlus,
    Info,
    Maximize2,
    Settings2,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    MoreVertical,
    Search
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useTranslation } from "react-i18next";

// Types
interface Student {
    id: string;
    name: string;
    status: 'present' | 'absent' | 'late';
    note?: string;
}

interface Seat {
    id: string;
    studentId: string | null;
    row: number;
    col: number;
}

const mockStudents: Student[] = [
    { id: "s1", name: "classroom:mocks.students.an", status: "present" },
    { id: "s2", name: "classroom:mocks.students.binh", status: "present" },
    { id: "s3", name: "classroom:mocks.students.cuong", status: "late", note: "dashboard:mockup.attendance.notes.lateRequest" },
    { id: "s4", name: "classroom:mocks.students.duc", status: "absent" },
    { id: "s5", name: "classroom:mocks.students.yen", status: "present" },
    { id: "s6", name: "classroom:mocks.students.dang", status: "present" },
    { id: "s7", name: "classroom:mocks.students.thao", status: "present" },
    { id: "s8", name: "classroom:mocks.students.tuan", status: "present" },
];

export default function SeatingChart() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [gridSize, setGridSize] = useState({ rows: 4, cols: 6 });
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [seats, setSeats] = useState<Seat[]>(
        Array.from({ length: 24 }, (_, i) => ({
            id: `seat-${i}`,
            studentId: i < 8 ? mockStudents[i].id : null,
            row: Math.floor(i / 6),
            col: i % 6
        }))
    );
    const [searchTerm, setSearchTerm] = useState("");

    const handleSeatClick = (seatId: string) => {
        if (selectedStudent) {
            // Check if student already in another seat
            const existingSeat = seats.find(s => s.studentId === selectedStudent);
            if (existingSeat) {
                setSeats(prev => prev.map(s => {
                    if (s.id === existingSeat.id) return { ...s, studentId: null };
                    if (s.id === seatId) return { ...s, studentId: selectedStudent };
                    return s;
                }));
            } else {
                setSeats(prev => prev.map(s => s.id === seatId ? { ...s, studentId: selectedStudent } : s));
            }
            setSelectedStudent(null);
            toast.success(t("teacher:seatingChart.messages.assignSuccess" as any) as any);
        }
    };

    const handleUnassign = (seatId: string) => {
        setSeats(prev => prev.map(s => s.id === seatId ? { ...s, studentId: null } : s));
        toast.info(t("teacher:seatingChart.messages.unassignSuccess" as any) as any);
    };

    const currentStudentsInSeats = seats.map(s => s.studentId).filter(Boolean);
    const unassignedStudents = mockStudents.filter(s => !currentStudentsInSeats.includes(s.id));

    const filteredUnassigned = unassignedStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                                <Grid className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:seatingChart.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("teacher:seatingChart.subtitle" as any, { class: (t("common:mockData.defaultClass" as any) as any || "10A1") } as any) as any}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" className="gap-2 glass-card">
                            <RotateCcw className="h-4 w-4" />
                            {t("teacher:seatingChart.actions.autoArrange" as any) as any}
                        </Button>
                        <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Save className="h-4 w-4" />
                            {t("teacher:seatingChart.actions.saveLayout" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Grid Area */}
                    <div className="lg:col-span-3 space-y-4">
                        <Card className="glass-card overflow-hidden">
                            <CardHeader className="bg-muted/30 border-b border-border/50 py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Layout className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-bold">{t("teacher:seatingChart.grid.label" as any) as any}: {gridSize.rows} x {gridSize.cols}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div className="h-2 w-2 rounded-full bg-success" /> {t("teacher:seatingChart.legend.present" as any) as any}
                                            <div className="h-2 w-2 rounded-full bg-destructive" /> {t("teacher:seatingChart.legend.absent" as any) as any}
                                            <div className="h-2 w-2 rounded-full bg-warning" /> {t("teacher:seatingChart.legend.late" as any) as any}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 bg-indigo-50">
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Maximize2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 bg-grid-pattern bg-[length:40px_40px]">
                                {/* Teacher Podium Placeholder */}
                                <div className="flex justify-center mb-16">
                                    <div className="w-64 h-8 bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        {t("teacher:seatingChart.grid.podium" as any) as any}
                                    </div>
                                </div>

                                {/* Seating Grid */}
                                <div
                                    className="grid gap-6 justify-center"
                                    style={{
                                        gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 120px))`,
                                    }}
                                >
                                    {seats.map((seat) => {
                                        const student = mockStudents.find(s => s.id === seat.studentId);
                                        return (
                                            <motion.div
                                                key={seat.id}
                                                layout
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={cn(
                                                    "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 relative transition-all duration-300",
                                                    seat.studentId
                                                        ? "bg-card border-primary/20 shadow-lg shadow-primary/5"
                                                        : selectedStudent
                                                            ? "bg-primary/5 border-primary border-dashed cursor-pointer animate-pulse"
                                                            : "bg-muted/10 border-dashed border-border/50"
                                                )}
                                                onClick={() => handleSeatClick(seat.id)}
                                            >
                                                {student ? (
                                                    <>
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mb-2">
                                                            {student.name.split(" ").pop()?.charAt(0)}
                                                        </div>
                                                        <p className="text-[10px] text-white/70 font-bold uppercase truncate w-full text-center">
                                                            {student.name.includes(':') ? t(student.name as any) : student.name}
                                                        </p>

                                                        {/* Status Indicator */}
                                                        <div className={cn(
                                                            "absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-card",
                                                            student.status === 'present' ? "bg-success" : student.status === 'absent' ? "bg-destructive" : "bg-warning"
                                                        )} />

                                                        {/* Actions Overlay (Hover) */}
                                                        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-card/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center gap-1 transition-opacity">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); handleUnassign(seat.id); }}>
                                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>{t("teacher:seatingChart.actions.unassign" as any) as any}</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                                <Info className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-muted-foreground/30 flex flex-col items-center gap-1">
                                                        <Plus className="h-4 w-4" />
                                                        <span className="text-[8px] font-bold uppercase tracking-tighter">{t("teacher:seatingChart.grid.empty" as any) as any}</span>
                                                    </div>
                                                )}

                                                {/* Seat ID bubble */}
                                                <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-muted text-[8px] font-bold">
                                                    {seat.row + 1}-{seat.col + 1}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="glass-card bg-indigo-50/50 border-indigo-200/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-indigo-600 font-bold uppercase">{t("teacher:seatingChart.stats.totalSeats" as any) as any}</p>
                                        <p className="text-2xl font-black text-indigo-700">{seats.length}</p>
                                    </div>
                                    <Users className="h-8 w-8 text-indigo-200" />
                                </CardContent>
                            </Card>
                            <Card className="glass-card bg-primary/10/50 border-primary/30/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-primary font-bold uppercase">{t("teacher:seatingChart.stats.assigned" as any) as any}</p>
                                        <p className="text-2xl font-black text-primary">{currentStudentsInSeats.length}</p>
                                    </div>
                                    <CheckCircle2 className="h-8 w-8 text-primary/30" />
                                </CardContent>
                            </Card>
                            <Card className="glass-card bg-slate-50/50 border-slate-200/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-slate-600 font-bold uppercase">{t("teacher:seatingChart.stats.empty" as any) as any}</p>
                                        <p className="text-2xl font-black text-slate-700">{seats.length - currentStudentsInSeats.length}</p>
                                    </div>
                                    <Layout className="h-8 w-8 text-slate-200" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-4">
                        <Card className="glass-card flex flex-col h-full ring-1 ring-primary/5">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-primary" />
                                    {t("teacher:seatingChart.list.unassigned" as any) as any}
                                </CardTitle>
                                <div className="relative mt-2">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                    <Input
                                        placeholder={t("teacher:seatingChart.actions.search" as any) as any}
                                        className="h-8 pl-7 text-xs glass-card"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto px-4 pb-4">
                                <div className="space-y-2">
                                    <AnimatePresence>
                                        {filteredUnassigned.length > 0 ? (
                                            filteredUnassigned.map((st) => (
                                                <motion.div
                                                    key={st.id}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className={cn(
                                                        "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all hover:shadow-md",
                                                        selectedStudent === st.id
                                                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                                                            : "bg-card border-border/50 hover:border-primary/50"
                                                    )}
                                                    onClick={() => setSelectedStudent(st.id === selectedStudent ? null : st.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs",
                                                            selectedStudent === st.id ? "bg-white/20" : "bg-primary/10 text-primary"
                                                        )}>
                                                            {st.name.split(" ").pop()?.charAt(0)}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-xs font-bold leading-none">{st.name.includes(':') ? t(st.name as any) : st.name}</p>
                                                            <Badge variant="outline" className={cn(
                                                                "text-[8px] h-3.5 px-1.5 border-none",
                                                                selectedStudent === st.id ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                                                            )}>
                                                                ID: {st.id.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className={cn("h-4 w-4 opacity-50", selectedStudent === st.id && "rotate-90")} />
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="py-10 text-center space-y-2">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto">
                                                    <CheckCircle2 className="h-5 w-5 text-muted-foreground/50" />
                                                </div>
                                                <p className="text-xs text-muted-foreground">{t("teacher:seatingChart.list.allAssigned" as any) as any}</p>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Layout Templates */}
                        <Card className="glass-card border-none bg-primary/5">
                            <CardContent className="p-4 space-y-3">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{t("teacher:seatingChart.templates.title" as any) as any}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="h-14 flex-col gap-1 text-[10px] glass-card" onClick={() => setGridSize({ rows: 4, cols: 6 })}>
                                        <div className="grid grid-cols-3 gap-0.5 opacity-20">
                                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-1 w-1 bg-current" />)}
                                        </div>
                                        {t("teacher:seatingChart.templates.default" as any) as any}
                                    </Button>
                                    <Button variant="outline" className="h-14 flex-col gap-1 text-[10px] glass-card" onClick={() => setGridSize({ rows: 6, cols: 4 })}>
                                        <div className="flex gap-2 opacity-20">
                                            <div className="w-1 h-3 bg-current" />
                                            <div className="w-1 h-3 bg-current" />
                                        </div>
                                        {t("teacher:seatingChart.templates.vertical" as any) as any}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
