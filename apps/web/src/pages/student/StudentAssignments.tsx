import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Play,
  Eye,
  Calendar,
  ChevronRight,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { AssignmentSubmissionDialog } from "@/components/assignments/AssignmentSubmissionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const mockAssignments = [
  {
    id: "1",
    title: "assignments:mockup.titles.mathQuiz",
    subject: "common:roles.subjects.math",
    class: "6A",
    type: "exam",
    duration: 15,
    questionCount: 10,
    dueDate: "2026-01-29 15:00",
    status: "pending",
    score: null,
    startedAt: null,
  },
  {
    id: "2",
    title: "assignments:mockup.titles.englishHomework",
    subject: "common:roles.subjects.english",
    class: "6A",
    type: "homework",
    duration: 45,
    questionCount: 20,
    dueDate: "2026-01-30 23:59",
    status: "in_progress",
    score: null,
    progress: 60,
    startedAt: "2026-01-28 10:00",
  },
  {
    id: "3",
    title: "assignments:mockup.titles.literatureEssay",
    subject: "common:roles.subjects.literature",
    class: "6A",
    type: "essay",
    duration: 90,
    questionCount: 3,
    dueDate: "2026-01-28 17:00",
    status: "submitted",
    score: null,
    submittedAt: "2026-01-28 16:45",
  },
  {
    id: "4",
    title: "assignments:mockup.titles.mathMidterm",
    subject: "common:roles.subjects.math",
    class: "6A",
    type: "exam",
    duration: 90,
    questionCount: 25,
    dueDate: "2026-01-25 10:00",
    status: "graded",
    score: 8.5,
    maxScore: 10,
    submittedAt: "2026-01-25 09:50",
  },
  {
    id: "5",
    title: "assignments:mockup.titles.mathFraction",
    subject: "common:roles.subjects.math",
    class: "6A",
    type: "homework",
    duration: 30,
    questionCount: 15,
    dueDate: "2026-01-20 23:59",
    status: "graded",
    score: 9.0,
    maxScore: 10,
    submittedAt: "2026-01-20 20:30",
  },
  {
    id: "6",
    title: "assignments:mockup.titles.englishGrammar",
    subject: "common:roles.subjects.english",
    class: "6A",
    type: "exam",
    duration: 30,
    questionCount: 30,
    dueDate: "2026-01-22 15:00",
    status: "late",
    score: null,
    submittedAt: null,
  },
];

export default function StudentAssignments() {
  const { t } = useTranslation(["assignments", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<{ id: string, title: string } | null>(null);

  const handleOpenSubmission = (id: string, title: string) => {
    setSelectedAssignment({ id, title });
    setIsSubmissionOpen(true);
  };

  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch = t(assignment.title as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || assignment.subject === subjectFilter;
    const matchesTab = activeTab === "all" ||
      (activeTab === "pending" && ["pending", "in_progress"].includes(assignment.status)) ||
      (activeTab === "submitted" && assignment.status === "submitted") ||
      (activeTab === "graded" && assignment.status === "graded") ||
      (activeTab === "late" && assignment.status === "late");
    return matchesSearch && matchesSubject && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-warning/20 text-warning border-warning/30">{t("assignments:status.pending")}</Badge>;
      case "in_progress":
        return <Badge className="bg-primary/20 text-primary border-primary/30">{t("assignments:status.in_progress")}</Badge>;
      case "submitted":
        return <Badge className="bg-info/20 text-info border-info/30">{t("assignments:status.submitted")}</Badge>;
      case "graded":
        return <Badge className="bg-success/20 text-success border-success/30">{t("assignments:status.graded")}</Badge>;
      case "late":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{t("assignments:status.late")}</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return "📝";
      case "homework":
        return "📋";
      case "essay":
        return "✍️";
      default:
        return "📄";
    }
  };

  const pendingCount = mockAssignments.filter(a => ["pending", "in_progress"].includes(a.status)).length;
  const submittedCount = mockAssignments.filter(a => a.status === "submitted").length;
  const gradedCount = mockAssignments.filter(a => a.status === "graded").length;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("assignments:title")}</h1>
            <p className="text-muted-foreground">
              {t("assignments:subtitle")}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("assignments:stats.pending")}</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-info/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("assignments:stats.submitted")}</p>
                <p className="text-2xl font-bold">{submittedCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("assignments:stats.graded")}</p>
                <p className="text-2xl font-bold text-success">{gradedCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("assignments:stats.avgScore")}</p>
                <p className="text-2xl font-bold text-gradient">8.75</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <TabsList className="glass-card">
                <TabsTrigger value="all">{t("assignments:tabs.all")}</TabsTrigger>
                <TabsTrigger value="pending">{t("assignments:tabs.pending")} ({pendingCount})</TabsTrigger>
                <TabsTrigger value="submitted">{t("assignments:tabs.submitted")} ({submittedCount})</TabsTrigger>
                <TabsTrigger value="graded">{t("assignments:tabs.graded")} ({gradedCount})</TabsTrigger>
              </TabsList>
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("assignments:filters.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("assignments:filters.subjectDefault")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("assignments:filters.allSubjects") as any}</SelectItem>
                    <SelectItem value="common:roles.subjects.math">{t("common:roles.subjects.math") as any}</SelectItem>
                    <SelectItem value="common:roles.subjects.literature">{t("common:roles.subjects.literature") as any}</SelectItem>
                    <SelectItem value="common:roles.subjects.english">{t("common:roles.subjects.english") as any}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-5 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {getTypeIcon(assignment.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{t(assignment.title as any) as any}</h3>
                          {getStatusBadge(assignment.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{t(assignment.subject as any) as any}</Badge>
                          <span>•</span>
                          <span>{t("dashboard:mockup.schedule.grade" as any, { grade: assignment.class }) as any}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{t("assignments:details.duration", { count: assignment.duration } as any) as any}</span>
                          <span>•</span>
                          <FileText className="h-3 w-3" />
                          <span>{t("assignments:details.questions", { count: assignment.questionCount } as any) as any}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className={assignment.status === "late" ? "text-destructive" : "text-muted-foreground"}>
                            {t("assignments:details.dueDate", { date: assignment.dueDate } as any) as any}
                          </span>
                        </div>

                        {/* Progress for in_progress assignments */}
                        {assignment.status === "in_progress" && assignment.progress && (
                          <div className="mt-3 max-w-xs">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">{t("assignments:details.progress")}</span>
                              <span className="font-medium">{assignment.progress}%</span>
                            </div>
                            <Progress value={assignment.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Score display for graded assignments */}
                      {assignment.status === "graded" && assignment.score !== null && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{t("assignments:details.score")}</p>
                          <p className="text-2xl font-bold text-gradient">{assignment.score}/{assignment.maxScore}</p>
                        </div>
                      )}

                      {/* Action buttons based on status */}
                      <div className="flex gap-2">
                        {(assignment.status === "pending" || assignment.status === "in_progress") && (
                          <Button
                            className="gap-2 rounded-xl"
                            onClick={() => handleOpenSubmission(assignment.id, assignment.title)}
                          >
                            <Upload className="h-4 w-4" />
                            {assignment.status === "pending" ? t("assignments:actions.submit") : t("assignments:actions.continue")}
                          </Button>
                        )}
                        {assignment.status === "submitted" && (
                          <Button variant="outline" className="gap-2 rounded-xl">
                            <Eye className="h-4 w-4" />
                            {t("assignments:actions.viewWork")}
                          </Button>
                        )}
                        {assignment.status === "graded" && (
                          <Button variant="outline" className="gap-2 rounded-xl">
                            <Eye className="h-4 w-4" />
                            {t("assignments:actions.viewResult")}
                          </Button>
                        )}
                        {assignment.status === "late" && (
                          <Button variant="destructive" className="gap-2 rounded-xl" disabled>
                            <AlertCircle className="h-4 w-4" />
                            {t("assignments:actions.overdue")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredAssignments.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{t("assignments:emptyState.title")}</p>
                <p className="text-muted-foreground">{t("assignments:emptyState.description")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {selectedAssignment && (
          <AssignmentSubmissionDialog
            isOpen={isSubmissionOpen}
            onOpenChange={setIsSubmissionOpen}
            assignmentTitle={selectedAssignment.title}
            assignmentId={selectedAssignment.id}
          />
        )}
      </div>
    </AppLayout>
  );
}
