import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    ArrowLeft,
    Users,
    Target,
    BookOpen,
    Calendar,
    Settings,
    MoreHorizontal,
    Mail,
    FileText
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { SeatingChart } from "@/components/classes/SeatingChart";

const mockClassData = {
    id: "1",
    name: "classroom:mocks.classes.math6a",
    subject: "classroom:table.subject",
    semester: "common:semester2",
    studentCount: 35,
    teacher: "classroom:mocks.students.teacherC",
    schedule: "classroom:table.schedule",
    room: "classroom:classPlaceholder",
};

export default function ClassDetail() {
    const { t } = useTranslation(["common", "classroom"]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("seating");

    return (
        <AppLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Navigation & Header */}
                <div className="flex flex-col gap-4">
                    <Button
                        variant="ghost"
                        className="w-fit gap-2 -ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate('/classes')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("classroom:classDetail.backToList")}
                    </Button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-start gap-5">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl lg:text-3xl font-bold">{t(mockClassData.name as any)}</h1>
                                    <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-medium">
                                        {t("classroom:classDetail.active")}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {t("classroom:classDetail.studentCount", { count: mockClassData.studentCount })}</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {t(mockClassData.schedule as any)}</span>
                                    <span className="flex items-center gap-1.5"><Target className="h-4 w-4" /> {t(mockClassData.room as any)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Mail className="h-4 w-4" />
                                {t("classroom:classDetail.sendAnnouncement")}
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>{t("classroom:classDetail.config")}</DropdownMenuItem>
                                    <DropdownMenuItem>{t("classroom:classDetail.export")}</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">{t("classroom:classDetail.archive")}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-muted/50 p-1 rounded-xl h-auto flex-wrap gap-1">
                        <TabsTrigger value="students" className="rounded-lg gap-2 px-4 py-2">
                            <Users className="h-4 w-4" />
                            {t("classroom:classDetail.tabs.list")}
                        </TabsTrigger>
                        <TabsTrigger value="seating" className="rounded-lg gap-2 px-4 py-2">
                            <Target className="h-4 w-4" />
                            {t("classroom:classDetail.tabs.seating")}
                        </TabsTrigger>
                        <TabsTrigger value="attendance" className="rounded-lg gap-2 px-4 py-2">
                            <Calendar className="h-4 w-4" />
                            {t("classroom:classDetail.tabs.attendance")}
                        </TabsTrigger>
                        <TabsTrigger value="grades" className="rounded-lg gap-2 px-4 py-2">
                            <FileText className="h-4 w-4" />
                            {t("classroom:classDetail.tabs.grades")}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="students">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>{t("classroom:classDetail.students.title")}</CardTitle>
                                <CardDescription>{t("classroom:classDetail.students.desc", { count: 35 })}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground italic">
                                    {t("classroom:classDetail.developing")}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="seating">
                        <SeatingChart />
                    </TabsContent>

                    <TabsContent value="attendance">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>{t("classroom:classDetail.attendance.title")}</CardTitle>
                                <CardDescription>{t("classroom:classDetail.attendance.today", { date: "29/01/2026" })}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground italic">
                                    {t("classroom:classDetail.developing")}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="grades">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>{t("classroom:classDetail.grades.title")}</CardTitle>
                                <CardDescription>{t("classroom:classDetail.grades.desc")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12 text-muted-foreground italic">
                                    {t("classroom:classDetail.developing")}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
