import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Download
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { mockStudents } from "@/mocks/data";


export default function Students() {
  const { t } = useTranslation(["classroom", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      t(student.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const getScoreBadge = (score: number) => {
    if (score >= 8.5) return <Badge className="bg-success/20 text-success border-success/30">{t("classroom:status.excellent")}</Badge>;
    if (score >= 7.0) return <Badge className="bg-primary/20 text-primary border-primary/30">{t("classroom:status.good")}</Badge>;
    if (score >= 5.0) return <Badge className="bg-warning/20 text-warning border-warning/30">{t("classroom:status.average")}</Badge>;
    return <Badge className="bg-destructive/20 text-destructive border-destructive/30">{t("classroom:status.weak")}</Badge>;
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("classroom:students.title")}</h1>
            <p className="text-muted-foreground">
              {t("classroom:students.subtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              {t("classroom:students.exportExcel")}
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              {t("classroom:students.addStudent")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("classroom:stats.totalStudents")}</p>
            <p className="text-2xl font-bold text-gradient">245</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("classroom:stats.active")}</p>
            <p className="text-2xl font-bold text-success">238</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("classroom:stats.highestAvg")}</p>
            <p className="text-2xl font-bold text-primary">9.8</p>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <p className="text-sm text-muted-foreground">{t("classroom:stats.classAvg")}</p>
            <p className="text-2xl font-bold">7.6</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("classroom:students.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t("classroom:students.classPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("classroom:students.allClasses")}</SelectItem>
                <SelectItem value="classroom:mocks.classes.math6a">{t("classroom:mocks.classes.math6a")}</SelectItem>
                <SelectItem value="classroom:mocks.classes.literature7b">{t("classroom:mocks.classes.literature7b")}</SelectItem>
                <SelectItem value="classroom:mocks.classes.english8c">{t("classroom:mocks.classes.english8c")}</SelectItem>
                <SelectItem value="classroom:mocks.classes.physics9a">{t("classroom:mocks.classes.physics9a")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>{t("classroom:table.students")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("classroom:table.contact")}</TableHead>
                <TableHead>{t("classroom:table.className")}</TableHead>
                <TableHead>{t("classroom:table.avgScore")}</TableHead>
                <TableHead>{t("classroom:table.ranking")}</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="border-border/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{t(student.name).split(" ").pop()?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{t(student.name)}</p>
                        <p className="text-sm text-muted-foreground md:hidden">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t(student.class)}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{student.avgScore.toFixed(1)}</span>
                  </TableCell>
                  <TableCell>{getScoreBadge(student.avgScore)}</TableCell>
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
                          {t("classroom:actions.viewProfile")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {t("classroom:actions.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t("classroom:actions.deleteStudent")}
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
            {t("classroom:pagination.showing", { count: filteredStudents.length, total: mockStudents.length })}
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
