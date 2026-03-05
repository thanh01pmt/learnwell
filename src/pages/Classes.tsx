import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Users,
  Calendar,
  BookOpen,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const mockClasses = [
  {
    id: "1",
    name: "classroom:mocks.classes.math6a",
    subject: "common:roles.subjects.math",
    semester: "classroom:mocks.semesters.semester2",
    studentCount: 35,
    schedule: "classroom:mocks.schedule.m_w_f_8",
    progress: 65,
    status: "active",
  },
  {
    id: "2",
    name: "classroom:mocks.classes.literature7b",
    subject: "common:roles.subjects.literature",
    semester: "classroom:mocks.semesters.semester2",
    studentCount: 32,
    schedule: "classroom:mocks.schedule.t_th_9",
    progress: 45,
    status: "active",
  },
  {
    id: "3",
    name: "classroom:mocks.classes.english8c",
    subject: "common:roles.subjects.english",
    semester: "classroom:mocks.semesters.semester2",
    studentCount: 28,
    schedule: "classroom:mocks.schedule.m_w_10",
    progress: 80,
    status: "active",
  },
  {
    id: "4",
    name: "classroom:mocks.classes.physics9a",
    subject: "common:roles.subjects.physics",
    semester: "classroom:mocks.semesters.semester2",
    studentCount: 30,
    schedule: "classroom:mocks.schedule.t_th_s_8",
    progress: 55,
    status: "active",
  },
  {
    id: "5",
    name: "classroom:mocks.classes.class10A1",
    subject: "common:roles.subjects.chemistry",
    semester: "classroom:mocks.semesters.semester1",
    studentCount: 33,
    schedule: "classroom:mocks.schedule.m_f_14",
    progress: 100,
    status: "completed",
  },
];

export default function Classes() {
  const { t } = useTranslation(["classroom", "common"]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredClasses = mockClasses.filter((cls) => {
    const matchesSearch = t(cls.name as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || cls.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">{t("classroom:status.active")}</Badge>;
      case "completed":
        return <Badge variant="secondary">{t("classroom:status.completed")}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("classroom:classes.title")}</h1>
            <p className="text-muted-foreground">
              {t("classroom:classes.subtitle")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("classroom:classes.createNew")}
          </Button>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("classroom:classes.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("classroom:classes.subjectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("classroom:classes.allSubjects")}</SelectItem>
                <SelectItem value="common:roles.subjects.math">{t("common:roles.subjects.math")}</SelectItem>
                <SelectItem value="common:roles.subjects.literature">{t("common:roles.subjects.literature")}</SelectItem>
                <SelectItem value="common:roles.subjects.english">{t("common:roles.subjects.english")}</SelectItem>
                <SelectItem value="common:roles.subjects.physics">{t("common:roles.subjects.physics")}</SelectItem>
                <SelectItem value="common:roles.subjects.chemistry">{t("common:roles.subjects.chemistry")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>{t("classroom:table.className")}</TableHead>
                <TableHead>{t("classroom:table.subject")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("classroom:table.schedule")}</TableHead>
                <TableHead className="hidden sm:table-cell">{t("classroom:table.students")}</TableHead>
                <TableHead>{t("classroom:table.progress")}</TableHead>
                <TableHead>{t("classroom:table.status")}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow
                  key={cls.id}
                  className="border-border/50 cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/classes/${cls.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{t(cls.name as any)}</p>
                        <p className="text-sm text-muted-foreground">{t(cls.semester as any)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t(cls.subject as any)}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {t(cls.schedule as any)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{cls.studentCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={cls.progress} className="w-20 h-2" />
                      <span className="text-sm text-muted-foreground">{cls.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(cls.status)}</TableCell>
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
                          {t("classroom:actions.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {t("classroom:actions.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("classroom:actions.deleteClass")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t("classroom:pagination.showing", { count: filteredClasses.length, total: mockClasses.length }) as string}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              {t("classroom:pagination.prev")}
            </Button>
            <Button variant="outline" size="sm" disabled>
              {t("classroom:pagination.next")}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
