import { useState } from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface ScheduleEvent {
  id: string;
  title: string;
  type: "class" | "exam" | "event" | "meeting";
  subject?: string;
  time: string;
  duration: string;
  location?: string;
  teacher?: string;
  child: string;
}

const children = [
  { id: "1", name: "parent:mocks.children.child1", avatar: "minhanh" },
  { id: "2", name: "parent:mocks.children.child2", avatar: "tuankiet" },
];

const scheduleEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "classroom:subjects.math",
    type: "class",
    subject: "classroom:subjects.math",
    time: "7:30",
    duration: "45 parent:schedule.minutes",
    location: "classroom:mocks.locations.room6a1",
    teacher: "classroom:mocks.teachers.hoa",
    child: "parent:mocks.children.child1",
  },
  {
    id: "2",
    title: "classroom:subjects.english",
    type: "class",
    subject: "classroom:subjects.english",
    time: "8:30",
    duration: "45 parent:schedule.minutes",
    location: "classroom:mocks.locations.audiovisual",
    teacher: "classroom:mocks.teachers.nam",
    child: "parent:mocks.children.child1",
  },
  {
    id: "3",
    title: "classroom:mocks.assignments.mathQuiz15",
    type: "exam",
    subject: "classroom:subjects.math",
    time: "9:30",
    duration: "15 parent:schedule.minutes",
    location: "classroom:mocks.locations.room6a1",
    child: "parent:mocks.children.child1",
  },
  {
    id: "4",
    title: "classroom:subjects.literature",
    type: "class",
    subject: "classroom:subjects.literature",
    time: "10:00",
    duration: "45 parent:schedule.minutes",
    location: "classroom:mocks.locations.room6a1",
    teacher: "classroom:mocks.teachers.mai",
    child: "parent:mocks.children.child1",
  },
  {
    id: "5",
    title: "parent:schedule.types.meeting",
    type: "meeting",
    time: "16:00",
    duration: "2 parent:schedule.hours",
    location: "classroom:mocks.locations.hallA",
    child: "parent:mocks.children.child1",
  },
  {
    id: "6",
    title: "classroom:subjects.math",
    type: "class",
    subject: "classroom:subjects.math",
    time: "7:30",
    duration: "35 parent:schedule.minutes",
    location: "classroom:mocks.locations.room4b2",
    teacher: "classroom:mocks.teachers.mai",
    child: "parent:mocks.children.child2",
  },
  {
    id: "7",
    title: "classroom:subjects.it",
    type: "class",
    subject: "classroom:subjects.it",
    time: "9:00",
    duration: "45 parent:schedule.minutes",
    location: "classroom:mocks.locations.compLab",
    teacher: "classroom:mocks.teachers.duc",
    child: "parent:mocks.children.child2",
  },
  {
    id: "8",
    title: "parent:schedule.types.stemDay",
    type: "event",
    time: "14:00",
    duration: "3 parent:schedule.hours",
    location: "classroom:mocks.locations.schoolYard",
    child: "parent:mocks.children.child2",
  },
];

const upcomingImportant = [
  {
    id: "1",
    title: "classroom:mocks.assignments.mathMidterm",
    date: "10/02/2026",
    child: "parent:mocks.children.child1",
    type: "exam",
  },
  {
    id: "2",
    title: "parent:schedule.types.meetingEnd",
    date: "15/02/2026",
    child: "Tất cả",
    type: "meeting",
  },
  {
    id: "3",
    title: "parent:schedule.types.sportsDay",
    date: "20/02/2026",
    child: "Tất cả",
    type: "event",
  },
  {
    id: "4",
    title: "classroom:mocks.assignments.engExam",
    date: "12/02/2026",
    child: "parent:mocks.children.child2",
    type: "exam",
  },
];

export default function Schedule() {
  const { t } = useTranslation();
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedDate, setSelectedDate] = useState(3);

  const typeConfig = {
    class: { color: "bg-primary", label: t("parent:schedule.types.class" as any) as any },
    exam: { color: "bg-warning", label: t("parent:schedule.types.exam" as any) as any },
    event: { color: "bg-success", label: t("parent:schedule.types.event" as any) as any },
    meeting: { color: "bg-accent", label: t("parent:schedule.types.meeting" as any) as any },
  };

  const currentWeekDates = [
    { day: t("parent:attendance.calendar.sun" as any) as any, date: 2, isToday: false },
    { day: t("parent:attendance.calendar.mon" as any) as any, date: 3, isToday: true },
    { day: t("parent:attendance.calendar.tue" as any) as any, date: 4, isToday: false },
    { day: t("parent:attendance.calendar.wed" as any) as any, date: 5, isToday: false },
    { day: t("parent:attendance.calendar.thu" as any) as any, date: 6, isToday: false },
    { day: t("parent:attendance.calendar.fri" as any) as any, date: 7, isToday: false },
    { day: t("parent:attendance.calendar.sat" as any) as any, date: 8, isToday: false },
  ];

  const filteredEvents = scheduleEvents.filter(
    (event) => selectedChild === "all" || event.child === selectedChild
  );

  const childName =
    selectedChild === "all"
      ? t("parent:schedule.all" as any) as any
      : children.find((c) => c.name === selectedChild)?.name || "";

  function EventCard({ event }: { event: ScheduleEvent }) {
    const config = typeConfig[event.type];

    return (
      <div className="flex gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
        <div className="flex flex-col items-center shrink-0">
          <span className="text-lg font-bold">{event.time}</span>
          <span className="text-xs text-muted-foreground">
            {event.duration.includes("minutes") || event.duration.includes("phút")
              ? t("common:time.minutes", { count: parseInt(event.duration) })
              : t("common:time.hours", { count: parseInt(event.duration) })}
          </span>
        </div>
        <div className={`w-1 rounded-full ${config.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{t(event.title as any)}</h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {t(event.child as any)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {t(event.location as any)}
              </span>
            )}
            {event.teacher && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {t(event.teacher as any)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-7 w-7 text-primary" />
              {t("parent:schedule.title" as any) as any}
            </h1>
            <p className="text-muted-foreground">
              {t("parent:schedule.subtitle" as any) as any}
            </p>
          </div>
          <Select
            value={selectedChild}
            onValueChange={setSelectedChild}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("parent:schedule.selectChild" as any) as any} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("parent:schedule.all" as any) as any}</SelectItem>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.name}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${child.avatar}`}
                      />
                      <AvatarFallback>{child.name[0]}</AvatarFallback>
                    </Avatar>
                    {t(child.name as any)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Week Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="font-semibold">{t("common:months.february")}, 2026</h3>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {currentWeekDates.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDate(item.date)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${selectedDate === item.date
                    ? "bg-primary text-primary-foreground"
                    : item.isToday
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                    }`}
                >
                  <span className="text-xs font-medium">{item.day}</span>
                  <span className="text-lg font-bold">{item.date}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Daily Schedule */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t("parent:schedule.dailyTitle", { date: `${selectedDate}/02` })}
                  {selectedChild !== "all" && ` - ${t(childName as any)}`}
                </CardTitle>
                <CardDescription>
                  {t("parent:schedule.activitiesCount" as any, { count: filteredEvents.length } as any) as any}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t("parent:schedule.empty" as any) as any}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Important */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-warning" />
                  {t("parent:schedule.upcoming" as any) as any}
                </CardTitle>
                <CardDescription>
                  {t("parent:schedule.upcomingDesc" as any) as any}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingImportant.map((item) => {
                  const config = typeConfig[item.type as keyof typeof typeConfig];
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className={`h-2 w-2 rounded-full mt-2 ${config.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {t(item.title as any)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {item.date}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.child === "Tất cả" ? t("parent:schedule.all") : t(item.child as any)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{t("parent:schedule.legendTitle" as any) as any}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(typeConfig).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <div className={`h-3 w-3 rounded-full ${value.color}`} />
                    <span className="text-muted-foreground">{value.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
