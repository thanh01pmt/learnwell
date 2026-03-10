import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  CheckSquare,
  FileSpreadsheet,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { GradingDetailDialog } from "@/components/grading/GradingDetailDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Submission {
  id: string;
  student: {
    name: string;
    avatar: string;
  };
  assignment: string;
  class: string;
  submittedAt: string;
  status: string;
  score: number | null;
}


const mockSubmissions: Submission[] = [
  {
    id: "1",
    student: {
      name: "classroom:mocks.students.an",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=an",
    },
    assignment: "classroom:mocks.gradebook.assignments.quizRational",
    class: "classroom:mocks.classes.math6a",
    submittedAt: "2024-01-29 08:30",
    status: "pending",
    score: null,
  },
  {
    id: "2",
    student: {
      name: "classroom:mocks.students.binh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=binh",
    },
    assignment: "classroom:mocks.gradebook.assignments.oral1",
    class: "classroom:mocks.classes.literature7b",
    submittedAt: "2024-01-29 07:45",
    status: "pending",
    score: null,
  },
  {
    id: "3",
    student: {
      name: "classroom:mocks.students.cuong",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cuong",
    },
    assignment: "classroom:mocks.gradebook.assignments.midterm",
    class: "classroom:mocks.classes.english8c",
    submittedAt: "2024-01-28 15:20",
    status: "graded",
    score: 8.5,
  },
  {
    id: "4",
    student: {
      name: "classroom:mocks.students.dung",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dung",
    },
    assignment: "classroom:mocks.gradebook.assignments.quizRational",
    class: "classroom:mocks.classes.math6a",
    submittedAt: "2024-01-28 14:00",
    status: "graded",
    score: 9.0,
  },
  {
    id: "5",
    student: {
      name: "classroom:mocks.students.em",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=em",
    },
    assignment: "classroom:mocks.gradebook.assignments.oral1",
    class: "classroom:mocks.classes.math6a",
    submittedAt: "2024-01-29 09:15",
    status: "late",
    score: null,
  },
];

export default function Grading() {
  const { t } = useTranslation(["classroom"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("pending");
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleOpenGrading = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsGradingOpen(true);
  };

  const filteredSubmissions = mockSubmissions.filter((sub) => {
    const matchesSearch =
      t(sub.student.name as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(sub.assignment as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || sub.class === classFilter;
    const matchesTab = activeTab === "all" || sub.status === activeTab ||
      (activeTab === "pending" && sub.status === "late");
    return matchesSearch && matchesClass && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge className="bg-success/20 text-success border-success/30">{t("classroom:status.graded")}</Badge>;
      case "pending":
        return <Badge className="bg-warning/20 text-warning border-warning/30">{t("classroom:status.pending")}</Badge>;
      case "late":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{t("classroom:status.late")}</Badge>;
      default:
        return null;
    }
  };

  const pendingCount = mockSubmissions.filter(s => s.status === "pending" || s.status === "late").length;
  const gradedCount = mockSubmissions.filter(s => s.status === "graded").length;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("classroom:grading.title")}</h1>
            <p className="text-muted-foreground">
              {t("classroom:grading.subtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 glass-card" onClick={() => navigate('/gradebook')}>
              <FileSpreadsheet className="h-4 w-4" />
              {t("classroom:grading.generalGradebook")}
            </Button>
            <Button variant="outline" className="gap-2 glass-card">
              <BarChart2 className="h-4 w-4" />
              {t("classroom:grading.gradeDistribution")}
            </Button>
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
                <p className="text-sm text-muted-foreground">{t("classroom:stats.pendingGrading")}</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("classroom:stats.graded")}</p>
                <p className="text-2xl font-bold">{gradedCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("classroom:stats.lateSubmissions")}</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("classroom:stats.avgScore")}</p>
                <p className="text-2xl font-bold">8.2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <TabsList className="glass-card">
                <TabsTrigger value="pending">{t("classroom:status.pending")} ({pendingCount})</TabsTrigger>
                <TabsTrigger value="graded">{t("classroom:status.graded")} ({gradedCount})</TabsTrigger>
                <TabsTrigger value="all">{t("common:tabs.all") as any}</TabsTrigger>
              </TabsList>
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("classroom:grading.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("classroom:grading.classPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("classroom:grading.allClasses")}</SelectItem>
                    <SelectItem value="classroom:mocks.classes.math6a">{t("classroom:mocks.classes.math6a")}</SelectItem>
                    <SelectItem value="classroom:mocks.classes.literature7b">{t("classroom:mocks.classes.literature7b")}</SelectItem>
                    <SelectItem value="classroom:mocks.classes.english8c">{t("classroom:mocks.classes.english8c")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-4 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                        <AvatarImage src={submission.student.avatar} />
                        <AvatarFallback>{t(submission.student.name as any).charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{t(submission.student.name as any)}</p>
                          {getStatusBadge(submission.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{t(submission.assignment as any)}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Badge variant="outline" className="text-[10px] h-4">{t(submission.class as any)}</Badge>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t("classroom:grading.submittedAt")} {submission.submittedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {submission.score !== null && (
                        <div className="text-right mr-2">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t("classroom:grading.scoreLabel")}</p>
                          <p className="text-xl font-black text-gradient leading-none">{submission.score}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 rounded-xl h-9"
                          onClick={() => handleOpenGrading(submission)}
                        >
                          <Eye className="h-4 w-4" />
                          {t("classroom:actions.viewWork")}
                        </Button>
                        {submission.status !== "graded" && (
                          <Button
                            size="sm"
                            className="gap-2 rounded-xl h-9 bg-primary hover:shadow-lg transition-all"
                            onClick={() => handleOpenGrading(submission)}
                          >
                            <CheckSquare className="h-4 w-4" />
                            {t("classroom:actions.grade")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredSubmissions.length === 0 && (
              <div className="glass-card rounded-2xl p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{t("common:status.noData") as any}</p>
                <p className="text-muted-foreground">{t("classroom:emptyState.description") as any}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <GradingDetailDialog
          isOpen={isGradingOpen}
          onOpenChange={setIsGradingOpen}
          submission={selectedSubmission}
        />
      </div>
    </AppLayout>
  );
}
