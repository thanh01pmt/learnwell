import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Download,
  Play,
  ChevronRight,
  Clock,
  Star,
  CheckCircle,
  Library
} from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "practice";
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Chapter {
  id: string;
  title: string;
  subject: string;
  lessons: Lesson[];
  progress: number;
  icon: string;
}

const mockChapters: Chapter[] = [
  {
    id: "1",
    title: "materials:mockup.chapters.ch1",
    subject: "common:roles.subjects.math",
    icon: "🔢",
    progress: 80,
    lessons: [
      { id: "1-1", title: "materials:mockup.lessons.l1_1", type: "video", duration: "15", completed: true, locked: false },
      { id: "1-2", title: "materials:mockup.lessons.l1_2", type: "reading", duration: "10", completed: true, locked: false },
      { id: "1-3", title: "materials:mockup.lessons.l1_3", type: "video", duration: "20", completed: true, locked: false },
      { id: "1-4", title: "materials:mockup.lessons.l1_4", type: "practice", duration: "15", completed: true, locked: false },
      { id: "1-5", title: "materials:mockup.lessons.l1_5", type: "quiz", duration: "30", completed: false, locked: false },
    ],
  },
  {
    id: "2",
    title: "materials:mockup.chapters.ch2",
    subject: "common:roles.subjects.math",
    icon: "➗",
    progress: 50,
    lessons: [
      { id: "2-1", title: "materials:mockup.lessons.l2_1", type: "video", duration: "15", completed: true, locked: false },
      { id: "2-2", title: "materials:mockup.lessons.l2_2", type: "reading", duration: "10", completed: true, locked: false },
      { id: "2-3", title: "materials:mockup.lessons.l2_3", type: "video", duration: "18", completed: false, locked: false },
      { id: "2-4", title: "materials:mockup.lessons.l2_4", type: "video", duration: "20", completed: false, locked: true },
      { id: "2-5", title: "materials:mockup.lessons.l2_5", type: "practice", duration: "20", completed: false, locked: true },
    ],
  },
  {
    id: "3",
    title: "materials:mockup.chapters.ch3",
    subject: "common:roles.subjects.english",
    icon: "🇬🇧",
    progress: 30,
    lessons: [
      { id: "3-1", title: "materials:mockup.lessons.l3_1", type: "video", duration: "12", completed: true, locked: false },
      { id: "3-2", title: "materials:mockup.lessons.l3_2", type: "reading", duration: "15", completed: false, locked: false },
      { id: "3-3", title: "materials:mockup.lessons.l3_3", type: "video", duration: "20", completed: false, locked: true },
      { id: "3-4", title: "materials:mockup.lessons.l3_4", type: "practice", duration: "15", completed: false, locked: true },
    ],
  },
  {
    id: "4",
    title: "materials:mockup.chapters.ch4",
    subject: "common:roles.subjects.literature",
    icon: "📚",
    progress: 0,
    lessons: [
      { id: "4-1", title: "materials:mockup.lessons.l4_1", type: "video", duration: "20", completed: false, locked: false },
      { id: "4-2", title: "materials:mockup.lessons.l4_2", type: "reading", duration: "25", completed: false, locked: true },
      { id: "4-3", title: "materials:mockup.lessons.l4_3", type: "video", duration: "18", completed: false, locked: true },
    ],
  },
];

const downloadableResources = [
  { id: "1", title: "materials:mockup.resources.r1", type: "pdf", size: "2.5 MB", subject: "common:roles.subjects.math" },
  { id: "2", title: "materials:mockup.resources.r2", type: "pdf", size: "1.2 MB", subject: "common:roles.subjects.english" },
  { id: "3", title: "materials:mockup.resources.r3", type: "pdf", size: "3.1 MB", subject: "common:roles.subjects.literature" },
  { id: "4", title: "materials:mockup.resources.r4", type: "pdf", size: "0.8 MB", subject: "common:roles.subjects.math" },
];

interface StudentMaterialsProps {
  publicView?: boolean;
}

export default function StudentMaterials({ publicView = false }: StudentMaterialsProps) {
  const { t } = useTranslation(["materials" as any, "common" as any]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [openChapters, setOpenChapters] = useState<string[]>(["1", "2"]);
  const [activeTab, setActiveTab] = useState("lessons");

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filteredChapters = mockChapters.filter((chapter) => {
    const matchesSearch = t(chapter.title as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || chapter.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      case "quiz":
        return <FileText className="h-4 w-4" />;
      case "practice":
        return <Star className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const types: Record<string, { label: string; className: string }> = {
      video: { label: t("materials:lessonTypes.video"), className: "bg-primary/20 text-primary" },
      reading: { label: t("materials:lessonTypes.reading"), className: "bg-info/20 text-info" },
      quiz: { label: t("materials:lessonTypes.quiz"), className: "bg-warning/20 text-warning" },
      practice: { label: t("materials:lessonTypes.practice"), className: "bg-accent/20 text-accent" },
    };
    const config = types[type] || { label: type, className: "" };
    return <Badge className={cn("text-xs", config.className)}>{config.label}</Badge>;
  };

  const totalLessons = mockChapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessons = mockChapters.reduce(
    (acc, ch) => acc + ch.lessons.filter((l) => l.completed).length,
    0
  );

  const Container = publicView ? ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4">{children}</div> : AppLayout;

  return (
    <Container>
      <div className="pt-16 md:pt-24 pb-20 space-y-12 animate-fade-in">
        <Breadcrumbs items={[{ label: t("materials:title") }]} />
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Library className="h-8 w-8 text-primary" />
              <h1 className="text-2xl lg:text-4xl font-black">{t("materials:title")}</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {t("materials:subtitle")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t("materials:stats.totalLessons"), value: totalLessons, icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
            { label: t("materials:stats.completed"), value: completedLessons, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
            { label: t("materials:stats.duration"), value: "4h 30m", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
            { label: t("materials:stats.materials"), value: downloadableResources.length, icon: FileText, color: "text-accent", bg: "bg-accent/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 border-white/5 bg-white/5 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-4">
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-black mt-1">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs & Search */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="inline-flex items-center p-1.5 bg-muted/50 rounded-2xl border border-border/50 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("lessons")}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  activeTab === "lessons"
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("materials:tabs.lessons")}
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  activeTab === "resources"
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("materials:tabs.resources")}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-2xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder={t("materials:filters.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-muted/30 border-border/50 rounded-2xl focus:bg-background transition-all text-base"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-56 h-14 bg-muted/30 border-border/50 rounded-2xl font-bold">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <SelectValue placeholder={t("materials:filters.subjectDefault")} />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                  <SelectItem value="all">{t("materials:filters.allSubjects")}</SelectItem>
                  <SelectItem value="common:roles.subjects.math">{t("common:roles.subjects.math") as any}</SelectItem>
                  <SelectItem value="common:roles.subjects.literature">{t("common:roles.subjects.literature") as any}</SelectItem>
                  <SelectItem value="common:roles.subjects.english">{t("common:roles.subjects.english") as any}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

            {/* Lessons Tab */}
            <TabsContent value="lessons" className="space-y-4">
              {filteredChapters.map((chapter) => (
                <Collapsible
                  key={chapter.id}
                  open={openChapters.includes(chapter.id)}
                  onOpenChange={() => toggleChapter(chapter.id)}
                >
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                              {chapter.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{t(chapter.title as any) as any}</h3>
                                <Badge variant="outline">{t(chapter.subject as any) as any}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {t("materials:chapterInfo.lessonsCount", { count: chapter.lessons.length } as any) as any} • {t("materials:chapterInfo.completedCount", { count: chapter.lessons.filter(l => l.completed).length } as any) as any}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2">
                              <Progress value={chapter.progress} className="w-24 h-2" />
                              <span className="text-sm text-muted-foreground w-10">
                                {chapter.progress}%
                              </span>
                            </div>
                            <ChevronRight
                              className={cn(
                                "h-5 w-5 text-muted-foreground transition-transform",
                                openChapters.includes(chapter.id) && "rotate-90"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t border-border/50">
                        {chapter.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 border-b border-border/30 last:border-b-0 transition-colors",
                              lesson.locked ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/30 cursor-pointer",
                              lesson.completed && "bg-success/5"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center",
                                lesson.completed ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                              )}>
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : lesson.locked ? (
                                  <span className="text-xs">🔒</span>
                                ) : (
                                  getLessonIcon(lesson.type)
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className={cn(
                                    "font-medium text-sm",
                                    lesson.completed && "text-muted-foreground"
                                  )}>
                                    {t(lesson.title as any) as any}
                                  </p>
                                  {getTypeBadge(lesson.type)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{t("common:minutes", { count: lesson.duration } as any) as any}</span>
                                </div>
                              </div>
                            </div>
                            {!lesson.locked && (
                              <Button variant="ghost" size="sm" className="gap-1">
                                {lesson.completed ? (
                                  <>{t("materials:actions.review")}</>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4" />
                                    {publicView ? t("materials:actions.loginToLearn") : t("materials:actions.learnNow")}
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {downloadableResources.map((resource) => (
                  <div key={resource.id} className="glass-card rounded-2xl p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium">{t(resource.title as any) as any}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{t(resource.subject as any) as any}</Badge>
                            <span>•</span>
                            <span>{resource.type.toUpperCase()}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                        if (publicView) navigate("/login");
                        // Else download logic
                      }}>
                        <Download className="h-4 w-4" />
                        {publicView ? t("materials:actions.loginToDownload") : t("materials:actions.download")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Container>
  );
}
