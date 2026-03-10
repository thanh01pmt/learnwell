import { useState } from "react";
import {
  Search,
  Plus,
  FolderOpen,
  FileText,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  GripVertical
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz";
  duration: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

const mockCurriculum: Chapter[] = [
  {
    id: "1",
    title: "authoring:mock.chapters.arithmetic",
    progress: 80,
    lessons: [
      { id: "1-1", title: "authoring:mock.lessons.arithmetic", type: "video", duration: "15", completed: true },
      { id: "1-2", title: "authoring:mock.lessons.factors", type: "reading", duration: "10", completed: true },
      { id: "1-3", title: "authoring:mock.lessons.primes", type: "video", duration: "20", completed: true },
      { id: "1-4", title: "authoring:mock.lessons.quizCh1", type: "quiz", duration: "30", completed: false },
    ],
  },
  {
    id: "2",
    title: "authoring:mock.chapters.fractions",
    progress: 50,
    lessons: [
      { id: "2-1", title: "authoring:mock.lessons.fractions", type: "video", duration: "15", completed: true },
      { id: "2-2", title: "authoring:mock.lessons.simplifying", type: "reading", duration: "10", completed: true },
      { id: "2-3", title: "authoring:mock.lessons.comparing", type: "video", duration: "18", completed: false },
      { id: "2-4", title: "authoring:mock.lessons.arithmeticFractions", type: "video", duration: "20", completed: false },
    ],
  },
  {
    id: "3",
    title: "authoring:mock.chapters.geometry",
    progress: 0,
    lessons: [
      { id: "3-1", title: "authoring:mock.lessons.geometryBasic", type: "video", duration: "15", completed: false },
      { id: "3-2", title: "authoring:mock.lessons.angles", type: "reading", duration: "12", completed: false },
      { id: "3-3", title: "authoring:mock.lessons.triangles", type: "video", duration: "25", completed: false },
    ],
  },
];

export default function Curriculum() {
  const { t } = useTranslation(["authoring", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openChapters, setOpenChapters] = useState<string[]>(["1"]);

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return "🎬";
      case "reading":
        return "📖";
      case "quiz":
        return "✏️";
      default:
        return "📄";
    }
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant="secondary" className="text-xs">
        {t(`authoring:curriculum.lessonTypes.${type}` as any)}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("authoring:curriculum.title")}</h1>
            <p className="text-muted-foreground">
              {t("authoring:curriculum.subtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              {t("authoring:curriculum.actions.addChapter")}
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("authoring:curriculum.actions.addLesson")}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:curriculum.stats.totalChapters")}</p>
            <p className="text-2xl font-bold text-gradient">{mockCurriculum.length}</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:curriculum.stats.totalLessons")}</p>
            <p className="text-2xl font-bold">
              {mockCurriculum.reduce((acc, ch) => acc + ch.lessons.length, 0)}
            </p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:curriculum.stats.duration")}</p>
            <p className="text-2xl font-bold">5h 30m</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:curriculum.stats.avgProgress")}</p>
            <p className="text-2xl font-bold text-success">43%</p>
          </div>
        </div>

        {/* Search */}
        <div className="glass-card rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("authoring:curriculum.filters.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Curriculum List */}
        <div className="space-y-4">
          {mockCurriculum.map((chapter, index) => (
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
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{t(chapter.title as any)}</h3>
                          <p className="text-sm text-muted-foreground">
                            {chapter.lessons.length} {t("common:lessons")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                          <Progress value={chapter.progress} className="w-24 h-2" />
                          <span className="text-sm text-muted-foreground w-12">
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
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                          <span className="text-lg">{getLessonIcon(lesson.type)}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className={cn(
                                "font-medium",
                                lesson.completed && "text-muted-foreground line-through"
                              )}>
                                {t(lesson.title as any)}
                              </p>
                              {lesson.completed && (
                                <Badge className="bg-success/20 text-success text-xs">✓</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {getTypeBadge(lesson.type)}
                              <span className="text-xs text-muted-foreground">
                                {lesson.duration} {t("common:minutesShort")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              {t("authoring:curriculum.actions.preview")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("authoring:curriculum.actions.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("authoring:curriculum.actions.deleteLesson")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
