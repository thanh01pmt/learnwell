import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Clock,
  Users,
  Calendar,
  FileText,
  Play
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockExams = [
  {
    id: "1",
    title: "authoring:mock.exams.quizCh3",
    subject: "authoring:mock.subjects.math",
    class: "6A",
    duration: 15,
    questionCount: 10,
    maxScore: 10,
    status: "active",
    startDate: "2024-01-29 08:00",
    endDate: "2024-01-29 08:15",
    submissions: 28,
    totalStudents: 35,
  },
  {
    id: "2",
    title: "authoring:mock.exams.midterm",
    subject: "authoring:mock.subjects.literature",
    class: "7B",
    duration: 90,
    questionCount: 5,
    maxScore: 10,
    status: "scheduled",
    startDate: "2024-02-01 08:00",
    endDate: "2024-02-01 09:30",
    submissions: 0,
    totalStudents: 32,
  },
  {
    id: "3",
    title: "authoring:mock.exams.homeworkUnit5",
    subject: "authoring:mock.subjects.english",
    class: "8C",
    duration: 45,
    questionCount: 20,
    maxScore: 10,
    status: "completed",
    startDate: "2024-01-25 00:00",
    endDate: "2024-01-28 23:59",
    submissions: 28,
    totalStudents: 28,
  },
  {
    id: "4",
    title: "authoring:mock.exams.reviewElectricity",
    subject: "authoring:mock.subjects.physics",
    class: "9A",
    duration: 45,
    questionCount: 15,
    maxScore: 10,
    status: "draft",
    startDate: null,
    endDate: null,
    submissions: 0,
    totalStudents: 30,
  },
];

export default function Exams() {
  const { t } = useTranslation(["authoring", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch = t(exam.title as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
    const matchesTab = activeTab === "all" || exam.status === activeTab;
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">{t("authoring:exams.stats.active")}</Badge>;
      case "scheduled":
        return <Badge className="bg-primary/20 text-primary border-primary/30">{t("authoring:exams.stats.scheduled")}</Badge>;
      case "completed":
        return <Badge variant="secondary">{t("authoring:exams.stats.completed")}</Badge>;
      case "draft":
        return <Badge variant="outline">{t("authoring:exams.stats.draft")}</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("authoring:exams.title")}</h1>
            <p className="text-muted-foreground">
              {t("authoring:exams.subtitle")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("authoring:exams.actions.createExam")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("authoring:exams.stats.total")}</p>
                <p className="text-2xl font-bold">{mockExams.length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Play className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("authoring:exams.stats.active")}</p>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === "active").length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("authoring:exams.stats.scheduled")}</p>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === "scheduled").length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                <Edit className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("authoring:exams.stats.draft")}</p>
                <p className="text-2xl font-bold">{mockExams.filter(e => e.status === "draft").length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <TabsList className="glass-card">
                <TabsTrigger value="all">{t("authoring:exams.tabs.all")}</TabsTrigger>
                <TabsTrigger value="active">{t("authoring:exams.tabs.active")}</TabsTrigger>
                <TabsTrigger value="scheduled">{t("authoring:exams.tabs.scheduled")}</TabsTrigger>
                <TabsTrigger value="draft">{t("authoring:exams.tabs.draft")}</TabsTrigger>
              </TabsList>
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("authoring:exams.placeholders.search")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map((exam) => (
                <div key={exam.id} className="glass-card rounded-2xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{t(exam.title as any)}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{t(exam.subject as any)}</Badge>
                        <span>•</span>
                        <span>{t("authoring:exams.card.classLabel", { class: exam.class })}</span>
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
                          {t("authoring:exams.actions.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {t("authoring:exams.actions.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          {t("authoring:exams.actions.duplicate")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("authoring:exams.actions.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{t("authoring:exams.card.duration", { count: exam.duration })}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <FileText className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{t("authoring:exams.card.questions", { count: exam.questionCount })}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/50">
                      <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium">{t("authoring:exams.card.submissions", { current: exam.submissions, total: exam.totalStudents })}</p>
                    </div>
                  </div>

                  {exam.startDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.startDate} - {exam.endDate}</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      {t("authoring:exams.actions.preview")}
                    </Button>
                    {exam.status === "draft" && (
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        {t("authoring:exams.actions.publish")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredExams.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{t("authoring:exams.empty.title")}</p>
                <p className="text-muted-foreground">{t("authoring:exams.empty.description")}</p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  {t("authoring:exams.actions.createExam")}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
