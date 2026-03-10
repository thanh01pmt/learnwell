import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Send,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    Image as ImageIcon,
    Smile,
    Check,
    CheckCheck,
    UserPlus
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const contacts = [
    { id: "1", name: "messages:mockup.contacts.teacher1", role: "common:roles.teacher", avatar: "teacher1", status: "online", lastMsg: "messages:mockup.messages.m2", time: "09:45" },
    { id: "2", name: "messages:mockup.contacts.student2", role: "common:roles.student", avatar: "student2", status: "offline", lastMsg: "messages:mockup.messages.m5", time: "messages:yesterday" },
    { id: "3", name: "messages:mockup.contacts.teacher2", role: "common:roles.teacher", avatar: "teacher2", status: "online", lastMsg: "messages:mockup.messages.m6", time: "11:20" },
    { id: "4", name: "messages:mockup.contacts.parent1", role: "common:roles.parent", avatar: "parent1", status: "offline", lastMsg: "messages:mockup.messages.m7", time: "messages:daysAgo" },
];

const mockMessages = [
    { id: "1", senderId: "2", text: "messages:mockup.messages.m1", time: "09:00", isMe: false },
    { id: "2", senderId: "me", text: "messages:mockup.messages.m2", time: "09:05", isMe: true, status: "read" },
    { id: "3", senderId: "2", text: "messages:mockup.messages.m3", time: "09:10", isMe: false },
    { id: "4", senderId: "me", text: "messages:mockup.messages.m4", time: "09:15", isMe: true, status: "sent" },
];

export default function DirectMessages() {
    const { t } = useTranslation();
    const [activeContact, setActiveContact] = useState(contacts[0]);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="h-[calc(100vh-180px)] min-h-[600px] flex gap-4 animate-fade-in">
                {/* Sidebar - Conversation List */}
                <Card className="w-80 glass-card flex flex-col overflow-hidden shrink-0">
                    <div className="p-4 border-b border-border/30 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-lg">{t("messages:title" as any) as any}</h2>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary/10">
                                <UserPlus className="h-4 w-4 text-primary" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("messages:searchPlaceholder" as any) as any}
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {filteredContacts.map((contact) => (
                            <Button
                                key={contact.id}
                                variant="ghost"
                                className={`w-full justify-start h-16 gap-3 rounded-xl px-2 ${activeContact.id === contact.id ? 'bg-primary/10' : ''
                                    }`}
                                onClick={() => setActiveContact(contact)}
                            >
                                <div className="relative">
                                    <Avatar>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`} />
                                        <AvatarFallback>{(t(contact.name as any) as any)[0]}</AvatarFallback>
                                    </Avatar>
                                    {contact.status === "online" && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-success rounded-full border-2 border-background" />
                                    )}
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold truncate text-sm">{t(contact.name as any) as any}</p>
                                        <span className="text-[10px] text-muted-foreground">{t(contact.time as any, { count: 2 }) as any}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{t(contact.lastMsg as any) as any}</p>
                                </div>
                            </Button>
                        ))}
                    </div>
                </Card>

                {/* Main Chat Area */}
                <Card className="flex-1 glass-card flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-border/30 flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeContact.avatar}`} />
                                <AvatarFallback>{(t(activeContact.name as any) as any)[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold leading-tight">{t(activeContact.name as any) as any}</h3>
                                <div className="flex items-center gap-1.5">
                                    <Badge variant="outline" className="text-[9px] h-3.5 px-1 uppercase font-bold text-muted-foreground">
                                        {t(activeContact.role as any) as any}
                                    </Badge>
                                    {activeContact.status === "online" ? (
                                        <span className="text-[10px] text-success font-medium flex items-center gap-1">
                                            <div className="h-1.5 w-1.5 bg-success rounded-full animate-pulse" />
                                            {t("messages:activeNow" as any) as any}
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-muted-foreground">{t("messages:lastActive" as any) as any}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Phone className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><Video className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground"><MoreVertical className="h-5 w-5" /></Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-muted/10">
                        <div className="text-center">
                            <Badge variant="secondary" className="px-3 bg-muted/50 text-muted-foreground font-normal">{t("messages:today" as any) as any}</Badge>
                        </div>

                        <AnimatePresence>
                            {mockMessages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[70%] ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                                        {!msg.isMe && (
                                            <Avatar className="h-8 w-8 shrink-0 mt-auto">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeContact.avatar}`} />
                                            </Avatar>
                                        )}
                                        <div className="flex flex-col">
                                            <div className={`p-4 rounded-3xl ${msg.isMe
                                                ? 'bg-primary text-primary-foreground rounded-br-md shadow-lg shadow-primary/20'
                                                : 'bg-card border border-border/30 rounded-bl-md shadow-sm'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{t(msg.text as any) as any}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 mt-1 px-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-[10px] text-muted-foreground">{t(msg.time as any) as any}</span>
                                                {msg.isMe && (
                                                    msg.status === "read" ? <CheckCheck className="h-3 w-3 text-primary" /> : <Check className="h-3 w-3 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-border/30">
                        <div className="flex items-center gap-2 p-1.5 bg-muted/30 rounded-2xl border border-border/50 focus-within:border-primary/30 transition-colors">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary"><Paperclip className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary"><ImageIcon className="h-5 w-5" /></Button>
                            <Input
                                placeholder={t("messages:inputPlaceholder" as any) as any}
                                className="border-0 bg-transparent focus-visible:ring-0 shadow-none px-2 h-10"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && message.trim() && (setMessage(""))}
                            />
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary"><Smile className="h-5 w-5" /></Button>
                            <Button
                                className={`h-10 w-10 rounded-xl transition-all ${message.trim() ? 'bg-primary scale-100' : 'bg-muted scale-90'
                                    }`}
                                size="icon"
                                disabled={!message.trim()}
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
