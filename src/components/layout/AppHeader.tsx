import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Search, Sun, Moon, User, Settings, LogOut, ChevronDown, Check, Menu, GraduationCap, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRole } from "@/contexts/RoleContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications, formatTimeAgo } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import { SidebarNavContent } from "./AppSidebar";
import { RoleSwitcher } from "./RoleSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";

interface AppHeaderProps {
  isImpersonating?: boolean;
  impersonatedUser?: string;
}

export function AppHeader({ isImpersonating = false, impersonatedUser }: AppHeaderProps) {
  const navigate = useNavigate();
  const { role, stopImpersonating } = useRole();
  const { signOut } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { t } = useTranslation("navigation");
  const [isDark, setIsDark] = useState(false);

  const getRoleLabel = () => {
    switch (role) {
      case "student": return t("student");
      case "teacher": return t("teachers");
      case "admin": return t("admin");
      case "parent": return t("parent");
    }
  };

  const getAvatarInitials = () => {
    switch (role) {
      case "student": return "HS";
      case "teacher": return "GV";
      case "admin": return "AD";
      case "parent": return "PH";
    }
  };

  const getUserName = () => {
    switch (role) {
      case "student": return t("roles.student_demo");
      case "teacher": return t("roles.teacher_system");
      case "admin": return t("roles.admin");
      case "parent": return t("roles.parent_demo");
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success": return "bg-success";
      case "warning": return "bg-warning";
      case "alert": return "bg-destructive";
      default: return "bg-primary";
    }
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <>
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="bg-warning text-warning-foreground px-4 py-2 text-center text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-warning-foreground"></span>
            </span>
            {t("impersonation.viewingAs", { name: impersonatedUser })}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs hover:bg-warning-foreground/20"
              onClick={stopImpersonating}
            >
              {t("impersonation.exit")}
            </Button>
          </span>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-card sticky top-0 z-40 border-b border-border px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl"
                aria-label={t("header.menuLabel")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-card">
              <SheetHeader className="sr-only">
                <SheetTitle>{t("header.menuLabel")}</SheetTitle>
                <SheetDescription>{t("header.menuDesc")}</SheetDescription>
              </SheetHeader>
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link to="/" className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-lg">{t("header.logo", { defaultValue: "LearnWell" })}</span>
                </Link>
              </div>
              <div className="overflow-y-auto flex-1">
                <SidebarNavContent collapsed={false} />
              </div>
              <div className="border-t border-border mt-auto">
                <RoleSwitcher collapsed={false} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("search")}
                className="pl-10 bg-muted/50 border-transparent focus:border-primary rounded-xl"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/90 shadow-sm shadow-primary/20 mr-2"
              onClick={() => navigate("/hub")}
            >
              <Plus className="h-4 w-4" />
              <span className="font-bold text-xs">{t("create", { defaultValue: "Create Project" })}</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl relative"
                  aria-label={t("header.notifications")}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {t("header.notifications")}
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {t("header.newCount", { count: unreadCount })}
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  {recentNotifications.length === 0 ? (
                    <div className="py-6 text-center text-muted-foreground text-sm">
                      {t("header.noNotifications")}
                    </div>
                  ) : (
                    recentNotifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.link) {
                            navigate(notification.link);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={cn(
                            "h-2 w-2 rounded-full shrink-0",
                            notification.isRead ? "bg-muted" : getNotificationColor(notification.type)
                          )} />
                          {!notification.isRead && (
                            <Check className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex justify-between gap-2 mb-1">
                          <p className={cn("text-xs font-semibold", !notification.isRead ? "text-primary" : "text-muted-foreground uppercase tracking-widest")}>
                            {t(notification.title)}
                          </p>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-2 text-foreground/80 leading-snug">
                          {t(notification.message)}
                        </p>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-center text-primary font-medium cursor-pointer"
                  onClick={() => navigate("/notifications")}
                >
                  {t("header.viewAll")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
              aria-label={t("header.themeSwitcher")}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-xl px-2"
                >
                  <Avatar className="h-8 w-8 border-2 border-primary/20 bg-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getAvatarInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium">{getUserName()}</span>
                    <span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t("header.userMenu")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  {t("header.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("header.settings")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => {
                    signOut();
                    navigate("/login");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("header.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
