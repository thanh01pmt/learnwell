import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Send,
  Clock,
  User,
  Search,
  Calendar,
  Video,
  History,
  ClipboardList
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface Teacher {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  email: string;
  phone: string;
  class: string;
  child: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  contentKey: string;
  timestamp: string;
  isMe: boolean;
}

interface CommunicationLog {
  id: string;
  date: string;
  titleKey: string;
  teacher: string;
  summaryKey: string;
  type: string;
}

import { contactTeachers as teachers, mockMessages, communicationLog } from "@/mocks";

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const { t } = useTranslation(["parent", "common", "classroom", "dashboard"]);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-background">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.avatar}`}
              />
              <AvatarFallback>{t(teacher.name as any)[0]}</AvatarFallback>
            </Avatar>
            {teacher.isOnline && (
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-success rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{t(teacher.name as any)}</h3>
                <p className="text-sm text-muted-foreground">{t(teacher.subject as any)}</p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {t(teacher.child as any)}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              {teacher.isOnline ? (
                <span className="text-success">● {t("parent:communication.chat.online")}</span>
              ) : (
                <span>{t("common:lastActive")} {teacher.lastSeen}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Dialog open={showChat} onOpenChange={setShowChat}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" />
                {t("parent:teacherContact.actions.message")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.avatar}`}
                    />
                    <AvatarFallback>{t(teacher.name as any)[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{t(teacher.name as any)}</p>
                    <p className="text-sm text-muted-foreground font-normal">
                      {t(teacher.subject as any)}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 rounded-lg">
                  {mockMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${msg.isMe
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-background rounded-bl-md"
                          }`}
                      >
                        <p className="text-sm">{t(msg.contentKey as any)}</p>
                        <p
                          className={`text-xs mt-1 ${msg.isMe
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                            }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Textarea
                    placeholder={t("parent:communication.chat.inputPlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                    rows={2}
                  />
                  <Button size="icon" className="h-full aspect-square">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleMeetingDialog() {
  const { t } = useTranslation(["parent", "common", "classroom", "dashboard"]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          {t("parent:teacherContact.actions.bookMeeting")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            {t("parent:teacherContact.actions.bookMeeting")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">{t("parent:teacherContact.fields.selectTeacher")}</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("parent:teacherContact.placeholders.selectTeacher")} />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {t(teacher.name as any)} - {t(teacher.subject as any)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("common:fields.date")}</label>
            <Input type="date" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("common:fields.time")}</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t("parent:teacherContact.placeholders.selectTime")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8:00">8:00 - 8:30</SelectItem>
                <SelectItem value="8:30">8:30 - 9:00</SelectItem>
                <SelectItem value="9:00">9:00 - 9:30</SelectItem>
                <SelectItem value="14:00">14:00 - 14:30</SelectItem>
                <SelectItem value="14:30">14:30 - 15:00</SelectItem>
                <SelectItem value="15:00">15:00 - 15:30</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("parent:teacherContact.fields.meetingContent")}</label>
            <Textarea placeholder={t("parent:teacherContact.placeholders.meetingContent")} />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1">
              {t("common:actions.cancel")}
            </Button>
            <Button className="flex-1 gap-2">
              <Calendar className="h-4 w-4" />
              {t("common:actions.submit")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TeacherContact() {
  const { t } = useTranslation(["parent", "common", "classroom", "dashboard"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState("all");

  const filteredTeachers = teachers.filter((teacher) => {
    const nameMatch = t(teacher.name as any).toLowerCase().includes(searchQuery.toLowerCase());
    const subjectMatch = t(teacher.subject as any).toLowerCase().includes(searchQuery.toLowerCase());
    const childMatch = selectedChild === "all" || t(teacher.child as any) === t(selectedChild as any);
    return (nameMatch || subjectMatch) && childMatch;
  });

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
              <MessageCircle className="h-7 w-7 text-primary" />
              {t("parent:teacherContact.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("parent:teacherContact.subtitle")}
            </p>
          </div>
          <ScheduleMeetingDialog />
        </div>

        <Tabs defaultValue="teachers" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="teachers" className="gap-2">
              <User className="h-4 w-4" /> {t("parent:teacherContact.sections.subject")}
            </TabsTrigger>
            <TabsTrigger value="log" className="gap-2">
              <History className="h-4 w-4" /> {t("parent:teacherContact.sections.logs")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teachers" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("parent:teacherContact.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger className="w-[180px]">
                  <User className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t("parent:schedule.selectChild")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common:filters.all")}</SelectItem>
                  <SelectItem value="classroom:mocks.students.minhanh">{t("classroom:mocks.students.minhanh")}</SelectItem>
                  <SelectItem value="classroom:mocks.students.tuankiet">{t("classroom:mocks.students.tuankiet")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t("parent:teacherContact.noTeachersFound")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="log">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">{t("parent:teacherContact.history.title")}</CardTitle>
                <CardDescription>{t("parent:teacherContact.history.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {communicationLog.map((log) => (
                  <div key={log.id} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${log.type === 'academic' ? 'bg-primary/20 text-primary' :
                      log.type === 'reminder' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                      }`}>
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold">{t(log.titleKey as any)}</h4>
                        <span className="text-xs text-muted-foreground">{log.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{t(log.summaryKey as any)}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">{t(log.teacher as any)}</Badge>
                        <Badge variant="secondary" className="text-[10px] uppercase">{log.type}</Badge>
                      </div>
                    </div>
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
