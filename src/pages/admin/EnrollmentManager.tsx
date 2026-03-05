import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Search,
    Filter,
    Download,
    UserPlus,
    CheckCircle2,
    Clock,
    XCircle,
    MoreHorizontal,
    Mail,
    Phone,
    ArrowRight
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export default function EnrollmentManager() {
    const { t } = useTranslation(["dashboard", "common"]);
    const [searchQuery, setSearchQuery] = useState("");

    const enrollmentStats = [
        { label: t("dashboard:mockup.admin.enrollment.stats.new"), count: 45, icon: UserPlus, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: t("dashboard:mockup.admin.enrollment.stats.interview"), count: 12, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: t("dashboard:mockup.admin.enrollment.stats.enrolled"), count: 128, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
        { label: t("dashboard:mockup.admin.enrollment.stats.rejected"), count: 8, icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
    ];

    const applications = [
        { id: "APP001", nameKey: "classroom:mocks.students.minhanh", grade: "10", date: "2026-02-05", status: "new", email: "minhanh@gmail.com", phone: "0901234567" },
        { id: "APP002", nameKey: "classroom:mocks.students.cuong", grade: "11", date: "2026-02-04", status: "interview", email: "tunglevan@gmail.com", phone: "0912345678" },
        { id: "APP003", nameKey: "classroom:mocks.students.binh", grade: "10", date: "2026-02-03", status: "pending", email: "betran@gmail.com", phone: "0923456789" },
        { id: "APP004", nameKey: "classroom:mocks.students.an", grade: "12", date: "2026-02-02", status: "enrolled", email: "quangpham@gmail.com", phone: "0934567890" },
        { id: "APP005", nameKey: "classroom:mocks.students.thao", grade: "10", date: "2026-02-01", status: "rejected", email: "thaodang@gmail.com", phone: "0945678901" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "new": return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{t("dashboard:mockup.admin.enrollment.status.new")}</Badge>;
            case "interview": return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">{t("dashboard:mockup.admin.enrollment.status.interview")}</Badge>;
            case "pending": return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">{t("dashboard:mockup.admin.enrollment.status.pending")}</Badge>;
            case "enrolled": return <Badge className="bg-primary/10 text-primary border-primary/20">{t("dashboard:mockup.admin.enrollment.status.enrolled")}</Badge>;
            case "rejected": return <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20">{t("dashboard:mockup.admin.enrollment.status.rejected")}</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
                            <Users className="h-7 w-7 text-primary" />
                            {t("dashboard:mockup.admin.enrollment.title")}
                        </h1>
                        <p className="text-muted-foreground">{t("dashboard:mockup.admin.enrollment.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Download className="h-4 w-4" /> {t("dashboard:mockup.admin.enrollment.actions.exportReport")}
                        </Button>
                        <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20">
                            <UserPlus className="h-4 w-4" /> {t("dashboard:mockup.admin.enrollment.actions.addNew")}
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {enrollmentStats.map((stat, i) => (
                        <Card key={i} className="glass-card border-none overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-3xl font-black group-hover:scale-110 transition-transform">{stat.count}</span>
                                </div>
                                <p className="mt-4 text-sm font-medium text-muted-foreground">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Database */}
                <Card className="glass-card border-none">
                    <CardHeader className="pb-3 border-b border-border/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-lg">{t("dashboard:mockup.admin.enrollment.table.listTitle")}</CardTitle>
                                <CardDescription>{t("dashboard:mockup.admin.enrollment.table.listDesc", { count: applications.length })}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder={t("dashboard:mockup.admin.enrollment.table.searchPlaceholder")}
                                        className="pl-9 w-[240px] glass-card"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="shrink-0"><Filter className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow className="hover:bg-transparent border-border/10">
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.id")}</TableHead>
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.student")}</TableHead>
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.grade")}</TableHead>
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.date")}</TableHead>
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.contact")}</TableHead>
                                        <TableHead className="font-bold">{t("dashboard:mockup.admin.enrollment.table.status")}</TableHead>
                                        <TableHead className="text-right font-bold">{t("dashboard:mockup.admin.enrollment.table.actions")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {applications.map((app) => (
                                        <TableRow key={app.id} className="border-border/10 hover:bg-primary/5 transition-colors group">
                                            <TableCell className="font-mono text-xs font-bold">{app.id}</TableCell>
                                            <TableCell className="font-bold">{t(app.nameKey as any)}</TableCell>
                                            <TableCell>{t("dashboard:mockup.admin.enrollment.table.gradeLevel", { grade: app.grade })}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs">{app.date}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><Mail className="h-3.5 w-3.5" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><Phone className="h-3.5 w-3.5" /></Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {t("dashboard:mockup.admin.enrollment.rowActions.details")} <ArrowRight className="h-3 w-3" />
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[160px]">
                                                            <DropdownMenuLabel>{t("dashboard:mockup.admin.enrollment.rowActions.options")}</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>{t("dashboard:mockup.admin.enrollment.rowActions.edit")}</DropdownMenuItem>
                                                            <DropdownMenuItem>{t("dashboard:mockup.admin.enrollment.rowActions.changeStatus")}</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">{t("dashboard:mockup.admin.enrollment.status.rejected")}</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Funnel Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">{t("dashboard:mockup.admin.enrollment.funnel.title")}</CardTitle>
                            <CardDescription>{t("dashboard:mockup.admin.enrollment.funnel.description")}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-8">
                            <div className="space-y-6">
                                {[
                                    { label: t("dashboard:mockup.admin.enrollment.funnel.steps.reach"), value: 100, color: "bg-blue-500" },
                                    { label: t("dashboard:mockup.admin.enrollment.funnel.steps.register"), value: 45, color: "bg-amber-500" },
                                    { label: t("dashboard:mockup.admin.enrollment.funnel.steps.interview"), value: 20, color: "bg-purple-500" },
                                    { label: t("dashboard:mockup.admin.enrollment.funnel.steps.enrolled"), value: 15, color: "bg-primary" },
                                ].map((step, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between text-xs font-bold">
                                            <span>{step.label}</span>
                                            <span>{step.value}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${step.value}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full ${step.color} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">{t("dashboard:mockup.admin.enrollment.todo.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">{t("dashboard:mockup.admin.enrollment.todo.approveNew")}</p>
                                        <p className="text-xs text-muted-foreground">{t("dashboard:mockup.admin.enrollment.todo.approveNewDesc")}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">{t("dashboard:mockup.admin.enrollment.todo.scheduleInterview")}</p>
                                        <p className="text-xs text-muted-foreground">{t("dashboard:mockup.admin.enrollment.todo.scheduleInterviewDesc")}</p>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" variant="outline">{t("dashboard:mockup.admin.enrollment.todo.viewAll")}</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
