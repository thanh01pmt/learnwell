import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Video,
    FileText,
    Bell,
    Search,
    Plus,
    MoreVertical,
    Paperclip,
    Send,
    User,
    CheckCheck,
    Download,
    Filter,
    ArrowUpRight,
    ShieldAlert,
    Calendar
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    sender: "teacher" | "parent";
    text: string;
    time: string;
    read: boolean;
    type?: "text" | "video" | "file";
    attachmentName?: string;
}

const initialMessages: Message[] = [
    { id: "1", sender: "teacher", text: "parent:communications.mocks.msg1", time: "09:30", read: true },
    { id: "2", sender: "parent", text: "parent:communications.mocks.msg2", time: "10:15", read: true },
    { id: "3", sender: "teacher", text: "parent:communications.mocks.msg3", time: "11:00", read: true, type: "file", attachmentName: "An_Report_Week4.pdf" },
    { id: "4", sender: "teacher", text: "parent:communications.mocks.msg4", time: "11:02", read: true, type: "video", attachmentName: "An_Final_Project.mp4" },
];

const reports = [
    { id: 1, title: "parent:communications.mocks.report1.title", date: "31/01/2026", size: "2.4 MB", type: "parent:communications.mocks.report1.type" },
    { id: 2, title: "parent:communications.mocks.report2.title", date: "20/12/2025", size: "5.1 MB", type: "parent:communications.mocks.report2.type" },
    { id: 3, title: "parent:communications.mocks.report3.title", date: "28/01/2026", size: "1.2 MB", type: "parent:communications.mocks.report3.type" },
];

export default function CommunicationHub() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState(initialMessages);
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: "parent",
            text: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
        };
        setMessages([...messages, newMessage]);
        setInputMessage("");
        toast.success(t("common:messageSent"));
    };

    return (
        <AppLayout>
            <div className="h-full max-h-[calc(100vh-140px)] flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("parent:communications.title")}</h1>
                        <p className="text-muted-foreground">{t("parent:communications.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Bell className="mr-2 h-4 w-4" />
                            {t("parent:communications.actions.notifications", { count: 3 })}
                        </Button>
                        <Button size="sm" variant="destructive">
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            {t("parent:communications.actions.emergency")}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
                    <TabsList className="w-full justify-start mb-4 bg-transparent border-b rounded-none px-0 h-11">
                        <TabsTrigger value="chat" className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11 px-6">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t("parent:communications.tabs.chat")}
                        </TabsTrigger>
                        <TabsTrigger value="archive" className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11 px-6">
                            <FileText className="h-4 w-4 mr-2" />
                            {t("parent:communications.tabs.reports")}
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none h-11 px-6">
                            <Bell className="h-4 w-4 mr-2" />
                            {t("parent:communications.tabs.settings")}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="chat" className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
                        {/* Contact List (Mobile scroll horizontal, Desktop vertical) */}
                        <Card className="w-full md:w-80 shrink-0 overflow-y-auto hidden md:block">
                            <CardHeader className="p-4 bg-slate-50 border-b">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold">{t("parent:communications.contacts.title")}</h4>
                                    <Plus className="h-4 w-4 cursor-pointer text-muted-foreground" />
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                    <Input placeholder={t("parent:communications.contacts.searchPlaceholder")} className="h-8 pl-7 text-xs bg-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {[
                                    { name: t("classroom:mocks.teachers.hoa"), role: t("teacher:role.primary"), active: true },
                                    { name: t("classroom:mocks.teachers.nam"), role: t("teacher:role.subject"), active: false },
                                    { name: t("parent:communications.contacts.support"), role: t("parent:communications.contacts.supportRole"), active: false },
                                ].map((contact, i) => (
                                    <div key={i} className={cn("p-4 border-b flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors", contact.active && "bg-primary/5 border-l-2 border-l-primary")}>
                                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                            <User className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-semibold truncate">{contact.name}</h5>
                                            <p className="text-[10px] text-muted-foreground truncate">{contact.role}</p>
                                        </div>
                                        {contact.active && <div className="h-2 w-2 rounded-full bg-primary" />}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Chat Area */}
                        <Card className="flex-1 flex flex-col overflow-hidden bg-white shadow-sm border-slate-200">
                            <div className="p-4 border-b flex items-center justify-between bg-white z-10">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <User className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{t("classroom:mocks.teachers.hoa")}</h4>
                                        <span className="text-[10px] text-green-500 font-medium">{t("common:online")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                                <AnimatePresence>
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: msg.sender === 'teacher' ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "flex w-full mb-4",
                                                msg.sender === 'parent' ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "max-w-[80%] rounded-2xl p-3 shadow-sm",
                                                msg.sender === 'parent' ? "bg-primary text-white" : "bg-white border text-slate-800"
                                            )}>
                                                {msg.type === "video" ? (
                                                    <div className="space-y-2">
                                                        <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                                            <Video className="h-10 w-10 text-white/50" />
                                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                                <Plus className="h-12 w-12 text-white fill-white" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs font-medium flex items-center gap-1">
                                                            <ArrowUpRight className="h-3 w-3" /> {msg.attachmentName}
                                                        </p>
                                                    </div>
                                                ) : msg.type === "file" ? (
                                                    <div className="flex items-center gap-3 bg-slate-50 text-slate-700 p-2 rounded-lg border">
                                                        <FileText className="h-8 w-8 text-primary" />
                                                        <div className="flex-1">
                                                            <p className="text-xs font-bold truncate">{msg.attachmentName}</p>
                                                            <span className="text-[10px] opacity-70">2.4 MB</span>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-4 w-4" /></Button>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm leading-relaxed">{t(msg.text as any)}</p>
                                                )}
                                                <div className={cn(
                                                    "flex items-center gap-1 mt-1 opacity-70 text-[10px]",
                                                    msg.sender === 'parent' ? "justify-end text-white/80" : "justify-start"
                                                )}>
                                                    <span>{msg.time}</span>
                                                    {msg.sender === 'parent' && <CheckCheck className="h-3 w-3" />}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="p-4 border-t bg-white">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0"><Paperclip className="h-5 w-5" /></Button>
                                    <Input
                                        placeholder={t("parent:communications.chat.placeholder")}
                                        className="flex-1 bg-slate-50 border-none h-11 px-4 focus-visible:ring-1"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <Button className="h-11 w-11 p-0 shrink-0" onClick={handleSendMessage}>
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="archive" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">{t("parent:communications.reports.title")}</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> {t("common:filter")}</Button>
                                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> {t("parent:communications.reports.requestNew")}</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                            {reports.map((report) => (
                                <Card key={report.id} className="group hover:border-primary/50 transition-colors">
                                    <CardHeader className="p-4 flex flex-row items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-sm">{t(report.title as any)}</CardTitle>
                                            <CardDescription className="text-xs">{report.date} • {report.size}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="p-4 pt-0 flex justify-between">
                                        <Badge variant="secondary" className="text-[10px]">{t(report.type as any)}</Badge>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">{t("common:download")}</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <Card className="bg-primary/5 border-dashed border-primary/30">
                            <CardContent className="p-10 flex flex-col items-center text-center">
                                <Video className="h-12 w-12 text-primary mb-4" />
                                <h4 className="font-bold mb-2">{t("parent:communications.videoReport.title")}</h4>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                                    {t("parent:communications.videoReport.desc")}
                                </p>
                                <Button variant="outline">{t("parent:communications.videoReport.configure")}</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("parent:communications.tabs.settings")}</CardTitle>
                                <CardDescription>{t("parent:communications.settings.desc")}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {[
                                    { title: "parent:communications.settings.weekly.title", desc: "parent:communications.settings.weekly.desc", icon: Calendar },
                                    { title: "parent:communications.settings.teacherMsg.title", desc: "parent:communications.settings.teacherMsg.desc", icon: MessageSquare },
                                    { title: "parent:communications.settings.alerts.title", desc: "parent:communications.settings.alerts.desc", icon: ShieldAlert },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-xl">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                                <item.icon className="h-5 w-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-bold">{t(item.title as any)}</h5>
                                                <p className="text-xs text-muted-foreground">{t(item.desc as any)}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">{t("common:configure")}</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
