import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Filter,
} from "lucide-react";

const allClasses = [
  { id: 1, name: "dashboard:mockup.teacher.classes.math6A", teacherKey: "classroom:mocks.teachers.teacherA", subject: "dashboard:mockup.subjects.math", students: 42, progress: 78, status: "active", grade: "10" },
  { id: 2, name: "dashboard:mockup.teacher.classes.van7B", teacherKey: "classroom:mocks.teachers.teacherB", subject: "dashboard:mockup.subjects.literature", students: 40, progress: 65, status: "active", grade: "10" },
  { id: 3, name: "dashboard:mockup.teacher.classes.math6A", teacherKey: "classroom:mocks.teachers.teacherC", subject: "dashboard:mockup.subjects.physics", students: 38, progress: 82, status: "active", grade: "11" },
  { id: 4, name: "dashboard:mockup.teacher.classes.van7B", teacherKey: "classroom:mocks.teachers.teacherD", subject: "dashboard:mockup.subjects.chemistry", students: 41, progress: 45, status: "warning", grade: "11" },
  { id: 5, name: "dashboard:mockup.teacher.classes.math6A", teacherKey: "classroom:mocks.teachers.teacherE", subject: "dashboard:mockup.subjects.biology", students: 35, progress: 91, status: "active", grade: "12" },
  { id: 6, name: "dashboard:mockup.teacher.classes.van7B", teacherKey: "classroom:mocks.teachers.teacherF", subject: "dashboard:mockup.subjects.english", students: 38, progress: 73, status: "active", grade: "12" },
  { id: 7, name: "dashboard:mockup.teacher.classes.math6A", teacherKey: "classroom:mocks.teachers.teacherA", subject: "dashboard:mockup.subjects.history", students: 40, progress: 58, status: "active", grade: "10" },
  { id: 8, name: "dashboard:mockup.teacher.classes.van7B", teacherKey: "classroom:mocks.teachers.teacherB", subject: "dashboard:mockup.subjects.math", students: 37, progress: 69, status: "active", grade: "11" },
];

export default function AdminClasses() {
  const { t } = useTranslation(["dashboard", "common", "classroom"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const filteredClasses = allClasses.filter((cls) => {
    const matchesSearch = t(cls.name as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(cls.teacherKey as any).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = !selectedGrade || cls.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const totalStudents = allClasses.reduce((sum, cls) => sum + cls.students, 0);
  const averageProgress = Math.round(
    allClasses.reduce((sum, cls) => sum + cls.progress, 0) / allClasses.length
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard:mockup.admin.sections.classManagement")}</h1>
            <p className="text-muted-foreground">
              {t("dashboard:mockup.admin.sections.classManagementDesc")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard:mockup.admin.classes.addNew")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.classes.stats.totalClasses")}</p>
                <p className="text-2xl font-bold">{allClasses.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.classes.stats.totalStudents")}</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Progress value={averageProgress} className="w-20 h-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.classes.stats.averageProgress")}</p>
                <p className="text-2xl font-bold">{averageProgress}%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard:mockup.admin.classes.filters.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {["10", "11", "12"].map((grade) => (
                  <Button
                    key={grade}
                    variant={selectedGrade === grade ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                  >
                    {t("dashboard:mockup.admin.classes.filters.grade", { grade })}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classes Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("dashboard:mockup.admin.classes.table.listTitle", { count: filteredClasses.length })}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("dashboard:mockup.admin.classes.table.className")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.classes.table.teacher")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.classes.table.subject")}</TableHead>
                  <TableHead className="text-center">{t("dashboard:mockup.admin.classes.table.students")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.classes.table.progress")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.classes.table.status")}</TableHead>
                  <TableHead className="text-right">{t("dashboard:mockup.admin.classes.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{t(cls.name as any)}</TableCell>
                    <TableCell>{t(cls.teacherKey as any)}</TableCell>
                    <TableCell>{t(cls.subject as any)}</TableCell>
                    <TableCell className="text-center">{cls.students}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={cls.progress} className="w-16 h-2" />
                        <span className="text-sm text-muted-foreground">{cls.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={cls.status === "warning" ? "destructive" : "secondary"}
                        className={cls.status === "active" ? "bg-primary/20 text-primary" : ""}
                      >
                        {cls.status === "active" ? t("dashboard:mockup.admin.classes.status.active") : t("dashboard:mockup.admin.classes.status.warning")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            {t("dashboard:mockup.admin.classes.actions.viewDetails")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("dashboard:mockup.admin.classes.actions.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            {t("dashboard:mockup.admin.classes.actions.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
