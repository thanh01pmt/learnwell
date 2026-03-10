import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    AlertTriangle,
    UserCheck,
    MessageCircle,
    Clock,
    ChevronRight,
    Filter,
    Search,
    MoreVertical,
    Calendar,
    FileText,
    Mail,
    Zap,
    TrendingDown,
    Activity,
    UserX
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface InterventionAlert {
    id: string;
    name: string;
    riskLevel: number;
    riskFactors: string[];
    lastActivity: string;
    params?: { [key: string]: any };
    status: "critical" | "monitoring" | "resolved";
    class: string;
}

const MOCK_INTERVENTIONS: InterventionAlert[] = [
    {
        id: "1",
        name: "classroom:mocks.students.an",
        status: "critical",
        riskLevel: 85,
        riskFactors: ["teacher:intervention.mock.riskFactor1", "teacher:intervention.mock.riskFactor2", "teacher:intervention.mock.riskFactor3"],
        lastActivity: "teacher:intervention.mock.daysAgo",
        params: { count: 2 },
        class: "teacher:intervention.mock.math6A"
    },
    {
        id: "2",
        name: "classroom:mocks.students.binh",
        status: "critical",
        riskLevel: 78,
        riskFactors: ["teacher:intervention.mock.riskFactor4", "teacher:intervention.mock.riskFactor5"],
        lastActivity: "teacher:intervention.mock.hoursAgo",
        params: { count: 6 },
        class: "teacher:intervention.mock.pythonB1"
    },
    {
        id: "3",
        name: "classroom:mocks.students.duc",
        status: "monitoring",
        riskLevel: 62,
        riskFactors: ["teacher:intervention.mock.riskFactor6", "teacher:intervention.mock.riskFactor7"],
        lastActivity: "teacher:intervention.mock.hoursAgo",
        params: { count: 1 },
        class: "teacher:intervention.mock.math6A"
    },
    {
        id: "4",
        name: "classroom:mocks.students.hanh",
        status: "monitoring",
        riskLevel: 45,
        riskFactors: ["teacher:intervention.mock.riskFactor8"],
        lastActivity: "teacher:intervention.mock.daysAgo",
        params: { count: 3 },
        class: "teacher:intervention.mock.literature7B"
    },
];

export default function InterventionDashboard() {
    const { t } = useTranslation(["teacher", "dashboard", "common", "classroom"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "critical" | "monitoring" | "resolved">("all"); // Updated filter types

    const filteredAlerts = MOCK_INTERVENTIONS.filter(alert => {
        const matchesSearch = t(alert.name as any).toLowerCase().includes(searchTerm.toLowerCase()) ||
            t(alert.class as any).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || alert.status === filter; // Filter by new status
        return matchesSearch && matchesFilter;
    });

    const getRiskColor = (status: InterventionAlert['status']) => { // Updated to take status
        switch (status) {
            case "critical": return "text-red-500 bg-red-500/10 border-red-500/20";
            case "monitoring": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
            case "resolved": return "text-green-500 bg-green-500/10 border-green-500/20";
            default: return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"; // Fallback
        }
    };

    const handleIntervention = (studentName: string, action: string) => {
        toast.success(t("teacher:intervention.messages.initiated" as any, { action, name: studentName } as any) as any);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("teacher:intervention.title" as any) as any}</h1>
                        <p className="text-muted-foreground">
                            {t("teacher:intervention.subtitle" as any) as any}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            {t("teacher:intervention.actions.history" as any) as any}
                        </Button>
                        <Button size="sm" className="bg-primary hover:opacity-90">
                            <Zap className="mr-2 h-4 w-4" />
                            {t("teacher:intervention.actions.aiInsights" as any) as any}
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-red-500/5 border-red-500/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-red-500">{t("teacher:intervention.stats.critical" as any) as any}</p>
                                    <p className="text-3xl font-bold text-red-600">{MOCK_INTERVENTIONS.filter(a => a.status === 'critical').length}</p>
                                </div>
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="h-6 w-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-500/5 border-orange-500/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-orange-500">{t("teacher:intervention.stats.monitoring" as any) as any}</p>
                                    <p className="text-3xl font-bold text-orange-600">{MOCK_INTERVENTIONS.filter(a => a.status === 'monitoring').length}</p>
                                </div>
                                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-500/5 border-green-500/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-500">{t("teacher:intervention.stats.resolved" as any) as any}</p>
                                    <p className="text-3xl font-bold text-green-600">{MOCK_INTERVENTIONS.filter(a => a.status === 'resolved').length}</p>
                                </div>
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder={t("teacher:intervention.search.placeholder" as any) as any}
                            className="pl-9 bg-card border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={filter === "all" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setFilter("all")}
                        >
                            {t("teacher:intervention.filters.all" as any) as any}
                        </Badge>
                        <Badge
                            variant={filter === "critical" ? "destructive" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setFilter("critical")}
                        >
                            {t("teacher:intervention.filters.critical" as any) as any}
                        </Badge>
                        <Badge
                            variant={filter === "monitoring" ? "secondary" : "outline"} // Changed to monitoring
                            className={cn("cursor-pointer", filter === "monitoring" && "bg-orange-500 hover:bg-orange-600")} // Changed to monitoring
                            onClick={() => setFilter("monitoring")}
                        >
                            {t("teacher:intervention.filters.monitoring" as any) as any} {/* Changed text */}
                        </Badge>
                        <Badge
                            variant={filter === "resolved" ? "secondary" : "outline"} // Added resolved filter
                            className={cn("cursor-pointer", filter === "resolved" && "bg-green-500 hover:bg-green-600")}
                            onClick={() => setFilter("resolved")}
                        >
                            {t("teacher:intervention.filters.resolved" as any) as any}
                        </Badge>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAlerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="overflow-hidden hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center">
                                            {/* Risk Level Indicator */}
                                            <div className={cn("w-2 md:self-stretch",
                                                alert.status === 'critical' ? 'bg-red-500' :
                                                    alert.status === 'monitoring' ? 'bg-orange-500' : 'bg-green-500' // Updated based on status
                                            )} />

                                            <div className="flex-1 p-4 flex flex-col md:flex-row items-center gap-4">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t(alert.name as any).split(' ').pop()}`} alt={t(alert.name as any)} className="h-12 w-12 rounded-full bg-slate-100" /> {/* Avatar based on translated name */}
                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                                        <h3 className="font-semibold text-lg">{t(alert.name as any)}</h3> {/* Translated name */}
                                                        <Badge className={getRiskColor(alert.status)}> {/* Used status for color */}
                                                            {alert.riskLevel}% {/* Display numerical risk level */}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{t(alert.class as any)} • {t("teacher:intervention.alerts.lastActivity" as any)}: {t(alert.lastActivity as any, alert.params) as string}</p> {/* Translated class and last activity with params */}
                                                </div>

                                                {/* Risk Factors - Tooltip Style but shown inline for better UX */}
                                                <div className="flex flex-wrap justify-center md:justify-start gap-2 max-w-md">
                                                    {alert.riskFactors.map((factor, i) => (
                                                        <Badge key={i} variant="outline" className="text-xs font-normal bg-slate-50">
                                                            {t(factor as any)} {/* Translated risk factor */}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Panel */}
                                            <div className="p-4 bg-slate-50/50 border-t md:border-t-0 md:border-l flex items-center justify-center gap-2">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="icon" variant="outline" className="h-9 w-9 rounded-full hover:bg-white" onClick={() => handleIntervention(alert.name, t("teacher:intervention.alerts.actions.schedule1on1" as any))}>
                                                                <Calendar className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>{t("teacher:intervention.alerts.tooltips.schedule" as any) as any}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="icon" variant="outline" className="h-9 w-9 rounded-full hover:bg-white" onClick={() => handleIntervention(alert.name, t("teacher:intervention.alerts.actions.parentNotify" as any))}>
                                                                <Mail className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>{t("teacher:intervention.alerts.tooltips.mail" as any) as any}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button size="icon" variant="outline" className="h-9 w-9 rounded-full hover:bg-white" onClick={() => handleIntervention(alert.name, t("teacher:intervention.alerts.actions.supplementalExercise" as any))}>
                                                                <FileText className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>{t("teacher:intervention.alerts.tooltips.exercise" as any) as any}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleIntervention(alert.name, t("teacher:intervention.alerts.actions.ignore" as any))}>
                                                            <UserX className="mr-2 h-4 w-4" /> {t("teacher:intervention.alerts.actions.ignore" as any) as any}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleIntervention(alert.name, t("teacher:intervention.alerts.actions.markResolved" as any))}>
                                                            <UserCheck className="mr-2 h-4 w-4 text-green-500" /> {t("teacher:intervention.alerts.actions.markResolved" as any) as any}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                <Button size="sm" className="ml-2 group">
                                                    {t("teacher:intervention.alerts.actions.mainAction" as any) as any} <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredAlerts.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium">{t("teacher:intervention.empty.title" as any) as any}</h3>
                            <p className="text-muted-foreground">{t("teacher:intervention.empty.desc" as any) as any}</p>
                        </div>
                    )}
                </div>

                {/* Action Sidebar / Contextual Help Area could go here */}
            </div>
        </AppLayout>
    );
}
