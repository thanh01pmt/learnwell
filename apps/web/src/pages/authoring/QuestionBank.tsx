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
  HelpCircle,
  CheckSquare,
  List,
  FileText
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const mockQuestions = [
  {
    id: "1",
    content: "authoring:mock.questions.calcValue",
    type: "multiple_choice",
    subject: "authoring:mock.subjects.math",
    topic: "authoring:mock.topics.algebra",
    difficulty: "easy",
    usedCount: 15,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    content: "authoring:mock.questions.analyzeLaoHac",
    type: "essay",
    subject: "authoring:mock.subjects.literature",
    topic: "authoring:mock.topics.modernLit",
    difficulty: "hard",
    usedCount: 8,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    content: "authoring:mock.questions.englishGrammar",
    type: "multiple_choice",
    subject: "authoring:mock.subjects.english",
    topic: "authoring:mock.topics.grammarTenses",
    difficulty: "easy",
    usedCount: 25,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    content: "authoring:mock.questions.quadraticEquation",
    type: "fill_blank",
    subject: "authoring:mock.subjects.math",
    topic: "authoring:mock.topics.equations",
    difficulty: "medium",
    usedCount: 12,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    content: "authoring:mock.questions.newtonLaws",
    type: "essay",
    subject: "authoring:mock.subjects.physics",
    topic: "authoring:mock.topics.mechanics",
    difficulty: "medium",
    usedCount: 6,
    createdAt: "2024-01-03",
  },
];

export default function QuestionBank() {
  const { t } = useTranslation(["authoring", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const filteredQuestions = mockQuestions.filter((q) => {
    const matchesSearch = t(q.content as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || q.subject === subjectFilter;
    const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return <CheckSquare className="h-4 w-4" />;
      case "fill_blank":
        return <List className="h-4 w-4" />;
      case "essay":
        return <FileText className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    return <Badge variant="outline">{t(`authoring:questionBank.types.${type}` as any)}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-success/20 text-success border-success/30">{t("authoring:questionBank.difficulties.easy")}</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">{t("authoring:questionBank.difficulties.medium")}</Badge>;
      case "hard":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{t("authoring:questionBank.difficulties.hard")}</Badge>;
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
            <h1 className="text-2xl lg:text-3xl font-bold">{t("authoring:questionBank.title")}</h1>
            <p className="text-muted-foreground">
              {t("authoring:questionBank.subtitle")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("authoring:questionBank.actions.addQuestion")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:questionBank.stats.totalQuestions")}</p>
            <p className="text-2xl font-bold text-gradient">256</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:questionBank.stats.multipleChoice")}</p>
            <p className="text-2xl font-bold">180</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:questionBank.stats.essay")}</p>
            <p className="text-2xl font-bold">56</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("authoring:questionBank.stats.fillBlank")}</p>
            <p className="text-2xl font-bold">20</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("authoring:questionBank.filters.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("authoring:mock.subjects.math")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("authoring:questionBank.filters.allSubjects")}</SelectItem>
                <SelectItem value="authoring:mock.subjects.math">{t("authoring:mock.subjects.math")}</SelectItem>
                <SelectItem value="authoring:mock.subjects.literature">{t("authoring:mock.subjects.literature")}</SelectItem>
                <SelectItem value="authoring:mock.subjects.english">{t("authoring:mock.subjects.english")}</SelectItem>
                <SelectItem value="authoring:mock.subjects.physics">{t("authoring:mock.subjects.physics")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder={t("authoring:questionBank.table.difficulty")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("authoring:questionBank.filters.allDifficulties")}</SelectItem>
                <SelectItem value="easy">{t("authoring:questionBank.difficulties.easy")}</SelectItem>
                <SelectItem value="medium">{t("authoring:questionBank.difficulties.medium")}</SelectItem>
                <SelectItem value="hard">{t("authoring:questionBank.difficulties.hard")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="w-12"></TableHead>
                <TableHead>{t("authoring:questionBank.table.content")}</TableHead>
                <TableHead>{t("authoring:questionBank.table.type")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("authoring:questionBank.table.topic")}</TableHead>
                <TableHead>{t("authoring:questionBank.table.difficulty")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("authoring:questionBank.table.used")}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id} className="border-border/50">
                  <TableCell>
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {getTypeIcon(question.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium line-clamp-2">{t(question.content as any)}</p>
                      <p className="text-sm text-muted-foreground">{t(question.subject as any)}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(question.type)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{t(question.topic as any)}</Badge>
                  </TableCell>
                  <TableCell>{getDifficultyBadge(question.difficulty)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-muted-foreground">{t("authoring:questionBank.table.times", { count: question.usedCount })}</span>
                  </TableCell>
                  <TableCell>
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
                          {t("authoring:questionBank.actions.deleteQuestion")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("common:pagination.showing", { count: filteredQuestions.length, total: mockQuestions.length })}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              {t("common:pagination.prev")}
            </Button>
            <Button variant="outline" size="sm" disabled>
              {t("common:pagination.next")}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
