import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
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
  Shield,
  Users,
  GraduationCap,
  UserCheck,
  Ban,
} from "lucide-react";

import { toast } from "sonner";

type UserRole = "student" | "teacher" | "admin";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: UserRole;
  status: "active" | "inactive" | "pending";
  lastActive: string;
  createdAt: string;
}

const allUsers: User[] = [
  { id: 1, name: "classroom:mocks.teachers.teacherA", email: "nguyenvana@school.edu.vn", avatar: null, role: "teacher", status: "active", lastActive: "2024-01-15 10:30", createdAt: "2022-08-15" },
  { id: 2, name: "classroom:mocks.students.an", email: "nguyenvana@school.edu.vn", avatar: null, role: "student", status: "active", lastActive: "2024-01-15 09:45", createdAt: "2023-09-01" },
  { id: 3, name: "classroom:mocks.students.teacherC", email: "levanc@school.edu.vn", avatar: null, role: "student", status: "active", lastActive: "2024-01-14 16:20", createdAt: "2023-09-01" },
  { id: 4, name: "classroom:mocks.teachers.teacherD", email: "phamthid@school.edu.vn", avatar: null, role: "teacher", status: "inactive", lastActive: "2024-01-10 08:00", createdAt: "2020-08-20" },
  { id: 5, name: "classroom:mocks.teachers.teacherE", email: "hoangvane@school.edu.vn", avatar: null, role: "admin", status: "active", lastActive: "2024-01-15 11:00", createdAt: "2019-01-01" },
  { id: 6, name: "classroom:mocks.teachers.teacherF", email: "vuthif@school.edu.vn", avatar: null, role: "student", status: "pending", lastActive: "-", createdAt: "2024-01-14" },
  { id: 7, name: "classroom:mocks.teachers.teacherA", email: "dovang@school.edu.vn", avatar: null, role: "student", status: "active", lastActive: "2024-01-15 08:30", createdAt: "2023-09-01" },
  { id: 8, name: "classroom:mocks.teachers.teacherB", email: "ngothih@school.edu.vn", avatar: null, role: "teacher", status: "active", lastActive: "2024-01-15 10:00", createdAt: "2021-08-15" },
];

export default function AdminUsers() {
  const { t, i18n } = useTranslation(["dashboard", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch = t(user.name as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "all" || user.role === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-700">Admin</Badge>;
      case "teacher":
        return <Badge className="bg-primary/20 text-primary">{t("common:roles.teacher")}</Badge>;
      case "student":
        return <Badge className="bg-blue-100 text-blue-700">{t("common:roles.student")}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/20 text-primary">{t("dashboard:mockup.admin.users.status.active")}</Badge>;
      case "inactive":
        return <Badge variant="secondary">{t("dashboard:mockup.admin.users.status.inactive")}</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">{t("dashboard:mockup.admin.users.status.pending")}</Badge>;
      default:
        return null;
    }
  };

  const toggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    toast.success(t("dashboard:mockup.admin.users.bulkActions.successMessage", { action, count: selectedUserIds.length }), {
      description: t("dashboard:mockup.admin.users.bulkActions.successDesc"),
    });
    setSelectedUserIds([]);
  };

  const studentCount = allUsers.filter(u => u.role === "student").length;
  const teacherCount = allUsers.filter(u => u.role === "teacher").length;
  const adminCount = allUsers.filter(u => u.role === "admin").length;

  const currentLocale = i18n.language === "vi" ? "vi-VN" : "en-US";

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t("dashboard:mockup.admin.users.title")}</h1>
            <p className="text-muted-foreground">
              {t("dashboard:mockup.admin.users.subtitle")}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("dashboard:mockup.admin.users.addNew")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:mockup.admin.users.stats.total")}</p>
                <p className="text-2xl font-bold">{allUsers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("common:roles.student")}</p>
                <p className="text-2xl font-bold">{studentCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("common:roles.teacher")}</p>
                <p className="text-2xl font-bold">{teacherCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admin</p>
                <p className="text-2xl font-bold">{adminCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">{t("common:tabs.all")}</TabsTrigger>
                  <TabsTrigger value="student">{t("common:roles.student")}</TabsTrigger>
                  <TabsTrigger value="teacher">{t("common:roles.teacher")}</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("dashboard:mockup.admin.users.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {t("dashboard:mockup.admin.users.table.listTitle", { count: filteredUsers.length })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>{t("dashboard:mockup.admin.users.table.user")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.users.table.role")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.users.table.status")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.users.table.lastActive")}</TableHead>
                  <TableHead>{t("dashboard:mockup.admin.users.table.createdAt")}</TableHead>
                  <TableHead className="text-right">{t("dashboard:mockup.admin.users.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className={selectedUserIds.includes(user.id) ? "bg-muted/50" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(" ").pop()?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{t(user.name as any)}</div>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString(currentLocale)}
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
                            {t("dashboard:mockup.admin.users.actions.viewDetails")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("dashboard:mockup.admin.users.actions.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Shield className="h-4 w-4" />
                            {t("dashboard:mockup.admin.users.actions.changeRole")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Ban className="h-4 w-4" />
                            {t("dashboard:mockup.admin.users.actions.lockAccount")}
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

      {/* Floating Bulk Actions Bar */}
      {selectedUserIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md">
            <CardContent className="p-3 px-6 flex items-center gap-6">
              <div className="flex items-center gap-2 border-r pr-6">
                <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {selectedUserIds.length}
                </span>
                <span className="text-sm font-medium">{t("dashboard:mockup.admin.users.bulkActions.selected")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  onClick={() => handleBulkAction(t("dashboard:mockup.admin.users.actions.changeRole"))}
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("dashboard:mockup.admin.users.table.role")}</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  onClick={() => handleBulkAction(t("dashboard:mockup.admin.users.bulkActions.activate"))}
                >
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">{t("dashboard:mockup.admin.users.bulkActions.activate")}</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  onClick={() => handleBulkAction(t("dashboard:mockup.admin.users.bulkActions.lock"))}
                >
                  <Ban className="h-4 w-4 text-amber-600" />
                  <span className="hidden sm:inline">{t("dashboard:mockup.admin.users.bulkActions.lock")}</span>
                </Button>
                <div className="w-px h-6 bg-border mx-2" />
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={() => setSelectedUserIds([])}
                >
                  {t("common:cancel")}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkAction(t("common:actions.delete"))}
                >
                  {t("common:actions.delete")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
