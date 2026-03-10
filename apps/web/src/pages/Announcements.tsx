import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Megaphone,
    Plus,
    Bell,
    AlertTriangle,
    PartyPopper,
    Info,
    Calendar,
    Users,
    Search,
    Filter,
    CheckCircle2,
    Trash2
} from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRole } from "@/contexts/RoleContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const announcements = [
    {
        id: "1",
        title: "common:announcements.mock.item1Title",
        content: "common:announcements.mock.item1Content",
        date: "2024-02-10T10:30:00Z",
        type: "critical",
        target: "common:announcements.mock.item1Target",
        isRead: false,
        author: "common:announcements.mock.item1Author"
    },
    {
        id: "2",
        title: "common:announcements.mock.item2Title",
        content: "common:announcements.mock.item2Content",
        date: "2024-02-09T14:45:00Z",
        type: "event",
        target: "common:announcements.mock.item2Target",
        isRead: true,
        author: "common:announcements.mock.item2Author"
    },
];

export default function Announcements() {
    const { t } = useTranslation(["common", "dashboard", "teacher"]);
    const { role } = useRole();
    const isAdminOrTeacher = role === "admin" || role === "teacher";
    const [searchQuery, setSearchQuery] = useState("");

    const getIcon = (type: string) => {
        switch (type) {
            case "critical": return <AlertTriangle className="h-5 w-5 text-destructive" />;
            case "event": return <PartyPopper className="h-5 w-5 text-primary" />;
            default: return <Info className="h-5 w-5 text-info" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "critical": return "bg-destructive/10 text-destructive border-destructive/30";
            case "event": return "bg-primary/10 text-primary border-primary/30";
            default: return "bg-info/10 text-info border-info/30";
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
                            <Megaphone className="h-7 w-7 text-primary" />
                            {t("common:announcements.mainTitle")}
                        </h1>
                        <p className="text-muted-foreground">{t("common:announcements.mainSubtitle")}</p>
                    </div>

                    {isAdminOrTeacher && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="gap-2 shadow-lg shadow-primary/20">
                                    <Plus className="h-4 w-4" /> {t("common:announcements.mock.create.publish")}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>{t("common:announcements.mock.create.title")}</DialogTitle>
                                    <DialogDescription>
                                        {t("dashboard:announcements.createSubtitle")}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("common:announcements.mock.create.label")}</label>
                                        <Input placeholder={t("common:announcements.mock.create.placeholder")} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t("common:announcements.mock.create.contentLabel")}</label>
                                        <Textarea placeholder={t("common:announcements.mock.create.contentPlaceholder")} className="min-h-[120px]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline">{t("common:announcements.mock.create.saveDraft")}</Button>
                                    <Button className="bg-primary hover:bg-primary/90">
                                        <CheckCircle2 className="h-4 w-4 mr-2" /> {t("common:announcements.mock.create.publish")}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("common:announcements.mock.search.placeholder")}
                            className="pl-9 h-11 glass-card border-border/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="h-11 px-6 shrink-0">
                            <Filter className="h-4 w-4 mr-2" /> {t("common:announcements.mock.filter")}
                        </Button>
                        <Select defaultValue="newest">
                            <SelectTrigger className="w-[160px] glass-card border-border/50">
                                <SelectValue placeholder={t("common:announcements.mock.sortingTitle")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">{t("common:announcements.mock.sorting.newest")}</SelectItem>
                                <SelectItem value="oldest">{t("common:announcements.mock.sorting.oldest")}</SelectItem>
                                <SelectItem value="priority">{t("common:announcements.mock.sorting.priority")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Announcements List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {announcements.map((item) => (
                            <Card key={item.id} className="glass-card hover:shadow-xl transition-all border-border/30 overflow-hidden group">
                                <div className="flex">
                                    <div className={`w-2 ${getTypeColor(item.type).split(' ')[0]}`} />
                                    <div className="flex-1">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <Badge variant="outline" className={`px-2 py-0.5 text-[10px] uppercase font-black ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </Badge>
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {item.date}
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl group-hover:text-primary transition-colors">{t(item.title as any)}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-muted-foreground leading-relaxed italic border-l-2 border-border/50 pl-4">
                                                "{t(item.content as any)}"
                                            </p>
                                            <div className="flex items-center justify-between pt-2 border-t border-border/20">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-xs">
                                                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="font-medium text-muted-foreground">{t("common:announcements.mock.details.target")}: {t(item.target as any)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {t("common:announcements.mock.details.author")}: <span className="font-bold text-foreground/80">{t(item.author as any)}</span>
                                                    </div>
                                                </div>
                                                {isAdminOrTeacher && (
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="h-8 text-xs">{t("common:edit")}</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <Card className="glass-card border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-primary" />
                                    {t("common:announcements.mock.details.reminders")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-card border border-border/30 rounded-xl space-y-1">
                                    <p className="text-sm font-bold">{t("common:announcements.mock.surveyTitle")}</p>
                                    <p className="text-xs text-muted-foreground">{t("common:announcements.mock.surveyDesc", { count: 2 })}</p>
                                    <Button variant="link" className="p-0 h-auto text-xs">{t("common:announcements.mock.viewDetails")}</Button>
                                </div>
                                <div className="p-3 bg-card border border-border/30 rounded-xl space-y-1">
                                    <p className="text-sm font-bold">{t("common:announcements.mock.pblTitle")}</p>
                                    <p className="text-xs text-muted-foreground">{t("common:announcements.mock.deadlineToday", { time: "23:59" })}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-lg">{t("common:announcements.statsTitle")}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t("common:announcements.total")}:</span>
                                        <span className="font-bold">24</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t("common:announcements.today")}:</span>
                                        <span className="font-bold text-success">{t("common:announcements.newCount", { count: 3 })}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{t("common:announcements.important")}:</span>
                                        <span className="font-bold text-destructive">2</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
