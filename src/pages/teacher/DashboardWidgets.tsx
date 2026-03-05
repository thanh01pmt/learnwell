import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Layout as LayoutIcon,
    Plus,
    Settings2,
    Trash2,
    GripVertical,
    BarChart3,
    Calendar,
    CheckCircle2,
    Clock,
    MessageSquare,
    AlertCircle,
    TrendingUp,
    Target,
    Users,
    Search,
    ChevronRight,
    Maximize2,
    MoreVertical
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
interface Widget {
    id: string;
    type: string;
    title: string;
    size: 'small' | 'medium' | 'large';
    color: string;
}

const WIDGET_TYPES = [
    { id: 'stats', title: 'teacher:dashboardWidgets.types.stats', icon: Target, color: 'bg-blue-500' },
    { id: 'chart', title: 'teacher:dashboardWidgets.types.chart', icon: BarChart3, color: 'bg-indigo-500' },
    { id: 'todo', title: 'teacher:dashboardWidgets.types.todo', icon: CheckCircle2, color: 'bg-primary' },
    { id: 'calendar', title: 'teacher:dashboardWidgets.types.calendar', icon: Calendar, color: 'bg-purple-500' },
    { id: 'chat', title: 'teacher:dashboardWidgets.types.chat', icon: MessageSquare, color: 'bg-amber-500' },
    { id: 'alerts', title: 'teacher:dashboardWidgets.types.alerts', icon: AlertCircle, color: 'bg-destructive' },
];

export default function DashboardWidgets() {
    const { t } = useTranslation(["teacher", "dashboard", "common"]);
    const [widgets, setWidgets] = useState<Widget[]>([
        { id: 'w1', type: 'stats', title: 'teacher:dashboardWidgets.mock.average10A1', size: 'small', color: 'bg-blue-500' },
        { id: 'w2', type: 'chart', title: 'common:labels.completionProgress', size: 'medium', color: 'bg-indigo-500' },
        { id: 'w3', type: 'todo', title: 'common:labels.gradingNeeded', size: 'small', color: 'bg-primary' },
        { id: 'w4', type: 'calendar', title: 'common:labels.todaySchedule', size: 'medium', color: 'bg-purple-500' },
    ]);
    const [isEditing, setIsEditing] = useState(false);

    const addWidget = (typeId: string) => {
        const type = WIDGET_TYPES.find(t => t.id === typeId);
        if (!type) return;

        const newWidget: Widget = {
            id: `w-${Date.now()}`,
            type: typeId,
            title: type.title,
            size: 'small',
            color: type.color
        };
        setWidgets([...widgets, newWidget]);
    };

    const removeWidget = (id: string) => {
        setWidgets(widgets.filter(w => w.id !== id));
    };

    const renderWidgetContent = (widget: Widget) => {
        switch (widget.type) {
            case 'stats':
                return (
                    <div className="flex flex-col justify-center h-full">
                        <div className="text-4xl font-black text-primary">7.82</div>
                        <div className="flex items-center gap-1 text-[10px] text-success font-bold">
                            <TrendingUp className="h-3 w-3" /> {t("teacher:dashboardWidgets.mock.scoreDiff", { count: 0.45 })}
                        </div>
                    </div>
                );
            case 'chart':
                return (
                    <div className="space-y-4 pt-4">
                        <div className="flex justify-between items-end h-24 gap-1">
                            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-full bg-primary/20 rounded-t-sm relative group overflow-hidden"
                                    style={{ height: `${h}%` }}
                                >
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: '100%' }}
                                        transition={{ delay: i * 0.1 }}
                                        className="absolute bottom-0 w-full bg-primary"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[8px] font-bold text-muted-foreground uppercase">
                            <span>{t("common:days.monday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.tuesday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.wednesday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.thursday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.friday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.saturday" as any).substring(0, 3)}</span>
                            <span>{t("common:days.sunday" as any).substring(0, 3)}</span>
                        </div>
                    </div>
                );
            case 'todo':
                return (
                    <div className="space-y-3 pt-2">
                        {[
                            { t: 'teacher:dashboardWidgets.mock.essayGrading', c: t('common:countUnit', { count: 12 }) },
                            { t: 'teacher:dashboardWidgets.mock.midtermDraft', c: 'common:labels.inProgress' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                                <span className="text-[10px] font-bold line-clamp-1">{item.t.includes(':') ? t(item.t as any) : item.t}</span>
                                <Badge variant="outline" className="text-[8px] h-4">{item.c.includes(':') ? t(item.c as any) : item.c}</Badge>
                            </div>
                        ))}
                    </div>
                );
            case 'calendar':
                return (
                    <div className="space-y-3 pt-2">
                        {[
                            { t: 'teacher:dashboardWidgets.mock.math12A1', s: '08:00 - 09:30', p: 'P.302' },
                            { t: 'teacher:dashboardWidgets.mock.physics10B2', s: '10:00 - 11:30', p: 'teacher:dashboardWidgets.mock.labA' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 border-l-2 border-primary bg-primary/5 rounded-r-lg">
                                <div>
                                    <p className="text-[10px] font-bold">{item.t.includes(':') ? t(item.t as any) : item.t}</p>
                                    <p className="text-[8px] text-muted-foreground">{item.s} • {item.p.includes(':') ? t(item.p as any) : item.p}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="h-3 w-3" /></Button>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div className="text-muted-foreground text-[10px] italic pt-4">{t("teacher:dashboardWidgets.content.updating" as any) as any}</div>;
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-in fade-in duration-500 pb-20">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                                <LayoutIcon className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("teacher:dashboardWidgets.title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t("teacher:dashboardWidgets.subtitle" as any) as any}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="gap-2 shadow-lg shadow-primary/20">
                                    <Plus className="h-4 w-4" />
                                    {t("teacher:dashboardWidgets.actions.addWidget" as any) as any}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>{t("teacher:dashboardWidgets.dropdown.selectType" as any) as any}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {WIDGET_TYPES.map(type => (
                                    <DropdownMenuItem key={type.id} className="gap-2" onClick={() => addWidget(type.id)}>
                                        <div className={cn("p-1.5 rounded-md text-white", type.color)}>
                                            <type.icon className="h-3 w-3" />
                                        </div>
                                        <span>{type.title.includes(':') ? t(type.title as any) : type.title}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant={isEditing ? "default" : "outline"}
                            className="gap-2 glass-card"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <Settings2 className="h-4 w-4" />
                            {isEditing ? t("teacher:dashboardWidgets.actions.finish" as any) : t("teacher:dashboardWidgets.actions.arrange" as any)}
                        </Button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <Reorder.Group
                    axis="y"
                    values={widgets}
                    onReorder={setWidgets}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {widgets.map((widget) => (
                            <Reorder.Item
                                key={widget.id}
                                value={widget}
                                className={cn(
                                    "relative group",
                                    widget.size === 'medium' ? 'md:col-span-2' : '',
                                    widget.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''
                                )}
                            >
                                <Card className={cn(
                                    "glass-card h-full transition-all group-hover:shadow-xl group-hover:border-primary/20",
                                    isEditing && "cursor-grab active:cursor-grabbing border-primary ring-2 ring-primary/20 shadow-lg"
                                )}>
                                    <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-3">
                                            {isEditing && <GripVertical className="h-4 w-4 text-primary opacity-50" />}
                                            <div className={cn("p-1.5 rounded-lg text-white", widget.color)}>
                                                {(() => {
                                                    const Icon = WIDGET_TYPES.find(t => t.id === widget.type)?.icon || Target;
                                                    return <Icon className="h-3.5 w-3.5" />;
                                                })()}
                                            </div>
                                            <CardTitle className="text-xs font-bold leading-none">{widget.title.includes(':') ? t(widget.title as any) : widget.title}</CardTitle>
                                        </div>

                                        {isEditing ? (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-destructive"
                                                onClick={() => removeWidget(widget.id)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        ) : (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                        <MoreVertical className="h-3.5 w-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="text-xs">{t("teacher:dashboardWidgets.widgetActions.edit" as any) as any}</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">{t("teacher:dashboardWidgets.widgetActions.maximize" as any) as any}</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-xs text-destructive" onClick={() => removeWidget(widget.id)}>
                                                        {t("teacher:dashboardWidgets.widgetActions.remove" as any) as any}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </CardHeader>
                                    <CardContent className="p-4 pt-4 h-full min-h-[120px]">
                                        {renderWidgetContent(widget)}
                                    </CardContent>
                                </Card>
                            </Reorder.Item>
                        ))}
                    </AnimatePresence>

                    {/* Add Widget Placeholder */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border/50 rounded-2xl bg-muted/5 group cursor-pointer hover:bg-muted/10 hover:border-primary/50 transition-all border-spacing-4"
                    >
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="mt-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">
                            {t("teacher:dashboardWidgets.placeholders.addNode" as any) as any}
                        </p>
                    </motion.div>
                </Reorder.Group>

                {/* Templates Section */}
                <div className="flex items-center gap-4 mt-12 bg-card/40 p-6 rounded-3xl border border-border/50 backdrop-blur-sm">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <LayoutIcon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">{t("teacher:dashboardWidgets.templates.title" as any) as any}</p>
                        <p className="text-xs text-muted-foreground">{t("teacher:dashboardWidgets.templates.subtitle" as any) as any}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-xs glass-card">{t("teacher:dashboardWidgets.templates.homeroom" as any) as any}</Button>
                        <Button variant="outline" className="text-xs glass-card">{t("teacher:dashboardWidgets.templates.subject" as any) as any}</Button>
                        <Button variant="ghost" className="text-xs hover:bg-primary/5">{t("teacher:dashboardWidgets.templates.viewAll" as any) as any}</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
