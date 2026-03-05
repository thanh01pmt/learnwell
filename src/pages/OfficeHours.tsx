import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    User,
    Plus,
    CheckCircle2,
    Monitor,
    MessageSquare
} from "lucide-react";
import { useState } from "react";
import { useRole } from "@/contexts/RoleContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

import { officeHourTeachers as teachers, officeHourSessions as sessions } from "@/mocks";

const DAYS = [
    { key: "common:days.monday", label: "monday" },
    { key: "common:days.tuesday", label: "tuesday" },
    { key: "common:days.wednesday", label: "wednesday" },
    { key: "common:days.thursday", label: "thursday" },
    { key: "common:days.friday", label: "friday" }
];

const TIME_SLOTS = ["09:00", "10:00", "14:00", "15:00", "16:00"];

export default function OfficeHours() {
    const { role } = useRole();
    const { t } = useTranslation(["dashboard", "common", "parent", "classroom"]);
    const isTeacher = role === "teacher";
    const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
                            <Monitor className="h-7 w-7 text-primary" />
                            {t("dashboard:mockup.parent.officeHours.title")}
                        </h1>
                        <p className="text-muted-foreground">
                            {isTeacher
                                ? t("dashboard:mockup.parent.officeHours.subtitleManager")
                                : t("dashboard:mockup.parent.officeHours.subtitleStudent")
                            }
                        </p>
                    </div>
                    {isTeacher && (
                        <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Plus className="h-4 w-4" /> {t("dashboard:mockup.parent.officeHours.setupAvailability")}
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {!isTeacher && (
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="text-lg">{t("dashboard:mockup.parent.officeHours.selectTeacher")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {teachers.map((t_item) => (
                                            <div
                                                key={t_item.id}
                                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${selectedTeacher.id === t_item.id ? 'border-primary bg-primary/5' : 'border-border/50 bg-card'
                                                    }`}
                                                onClick={() => setSelectedTeacher(t_item)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t_item.avatar}`} />
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-bold">{t(t_item.name as any)}</p>
                                                        <p className="text-xs text-muted-foreground">{t(t_item.subject as any)}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <CalendarIcon className="h-3.5 w-3.5" />
                                                        {t_item.days.map((d: any) => t(d as any)).join(", ")}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {t_item.availability.join(", ")}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CalendarIcon className="h-5 w-5 text-primary" />
                                    {t("dashboard:mockup.parent.officeHours.availableSchedule")}
                                </CardTitle>
                                <CardDescription>{t("dashboard:mockup.parent.officeHours.availableScheduleDesc")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {DAYS.map((day) => (
                                        <div key={day.key} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-border/30 hover:bg-muted/10 transition-colors">
                                            <div className="w-20 font-bold text-sm">{t(day.key as any)}</div>
                                            <div className="flex flex-wrap gap-2">
                                                {TIME_SLOTS.map((time) => {
                                                    const isAvailable = Math.random() > 0.4;
                                                    return (
                                                        <Dialog key={time}>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant={isAvailable ? "outline" : "ghost"}
                                                                    size="sm"
                                                                    disabled={!isAvailable}
                                                                    className={`rounded-lg text-xs ${isAvailable ? 'hover:bg-primary/10' : 'opacity-30'}`}
                                                                >
                                                                    {time}
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>{t("dashboard:mockup.parent.officeHours.confirmTitle")}</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-4 py-4">
                                                                    <div className="p-4 bg-muted/30 rounded-xl flex items-center gap-3">
                                                                        <Avatar className="h-10 w-10">
                                                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTeacher.avatar}`} />
                                                                        </Avatar>
                                                                        <div>
                                                                            <p className="font-bold">{t(selectedTeacher.name as any)}</p>
                                                                            <p className="text-xs text-muted-foreground">{t(day.key as any)}, {time}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="text-sm font-medium">{t("dashboard:mockup.parent.officeHours.supportTopic")}</label>
                                                                        <Textarea placeholder={t("dashboard:mockup.parent.officeHours.topicPlaceholder")} />
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <Button className="w-full gap-2">
                                                                        <CheckCircle2 className="h-4 w-4" /> {t("dashboard:mockup.parent.officeHours.confirmBooking")}
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Coming sessions */}
                    <div className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-lg">{t("dashboard:mockup.parent.officeHours.upcomingSessions")}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                                <div className="space-y-1">
                                    {sessions.map((s) => (
                                        <div key={s.id} className="px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border/10 last:border-0 group">
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant={s.status === 'confirmed' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                                                    {s.status === 'confirmed'
                                                        ? t("dashboard:mockup.parent.officeHours.status.confirmed")
                                                        : t("dashboard:mockup.parent.officeHours.status.pending")
                                                    }
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {t(s.dateKey as any)} {s.dateValue}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-sm leading-tight flex items-center gap-2">
                                                {t(s.topicKey as any)}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground font-medium">
                                                <User className="h-3 w-3" />
                                                {t(s.teacher as any)}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-primary font-black">
                                                <Clock className="h-3 w-3" />
                                                {s.time}
                                            </div>
                                            {s.status === 'confirmed' && (
                                                <Button size="sm" className="w-full mt-3 gap-2 bg-success hover:bg-success/90">
                                                    <Video className="h-3.5 w-3.5" /> {t("dashboard:mockup.parent.officeHours.join")}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {sessions.length === 0 && (
                                    <div className="p-8 text-center">
                                        <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-20" />
                                        <p className="text-xs text-muted-foreground">{t("dashboard:mockup.parent.officeHours.noSessions")}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-warning/20 bg-warning/5">
                            <CardContent className="p-4 flex gap-3">
                                <Clock className="h-5 w-5 text-warning shrink-0" />
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                    {t("dashboard:mockup.parent.officeHours.preparationTip")}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
