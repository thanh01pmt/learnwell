import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
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
  Mail,
  UserCog,
  Users,
  BookOpen,
  Award,
} from "lucide-react";

import { adminTeachers as teachers } from "@/mocks";

export default function AdminTeachers() {
  const { t, i18n } = useTranslation(["dashboard", "common", "classroom"]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    t(teacher.name as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(teacher.subject as any).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === "active").length;
  const totalClasses = teachers.reduce((sum, t) => sum + t.classes, 0);

  const currentLocale = i18n.language === "vi" ? "vi-VN" : "en-US";

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard:mockup.admin.teachers.title")}</h1>
            <p className="text-muted-foreground">
              {t("dashboard:mockup.admin.teachers.subtitle")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard:mockup.admin.teachers.addNew")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.teachers.stats.totalTeachers")}</p>
                <p className="text-2xl font-bold">{totalTeachers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.teachers.stats.activeTeachers")}</p>
                <p className="text-2xl font-bold">{activeTeachers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.teachers.stats.totalClasses")}</p>
                <p className="text-2xl font-bold">{totalClasses}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("dashboard:mockup.admin.teachers.filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {t("dashboard:mockup.admin.teachers.table.listTitle", { count: filteredTeachers.length })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("dashboard:mockup.admin.teachers.table.teacher")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.teachers.table.subject")}</TableHead>
                  <TableHead className="text-center">{t("dashboard:mockup.admin.teachers.table.classes")}</TableHead>
                  <TableHead className="text-center">{t("dashboard:mockup.admin.teachers.table.students")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.teachers.table.status")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.teachers.table.joinDate")}</TableHead>
                  <TableHead className="text-right">{t("dashboard:mockup.admin.teachers.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={teacher.avatar || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {t(teacher.name as any).split(" ").pop()?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{t(teacher.name as any)}</p>
                          <p className="text-xs text-muted-foreground">{teacher.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(teacher.subject as any)}</Badge>
                    </TableCell>
                    <TableCell className="text-center">{teacher.classes}</TableCell>
                    <TableCell className="text-center">{teacher.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant={teacher.status === "inactive" ? "destructive" : "secondary"}
                        className={teacher.status === "active" ? "bg-primary/20 text-primary" : ""}
                      >
                        {teacher.status === "active"
                          ? t("dashboard:mockup.admin.teachers.status.active")
                          : t("dashboard:mockup.admin.teachers.status.inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(teacher.joinDate).toLocaleDateString(currentLocale)}
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
                            {t("dashboard:mockup.admin.teachers.actions.viewDetails")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("dashboard:mockup.admin.teachers.actions.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            {t("dashboard:mockup.admin.teachers.actions.sendEmail")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserCog className="h-4 w-4" />
                            {t("dashboard:mockup.admin.teachers.actions.assignClass")}
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
