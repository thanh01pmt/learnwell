import { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "@/i18n";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useNotifications,
  Notification,
  formatTimeAgo,
} from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function NotificationIcon({ type }: { type: Notification["type"] }) {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    default:
      return <Info className="h-5 w-5 text-primary" />;
  }
}

function NotificationCard({
  notification,
  onMarkRead,
  onDelete,
  onClick,
}: {
  notification: Notification;
  onMarkRead: () => void;
  onDelete: () => void;
  onClick: () => void;
}) {
  const { t } = useTranslation(["notifications", "common"]);
  return (
    <div
      className={cn(
        "p-4 rounded-xl transition-all cursor-pointer hover:shadow-md",
        notification.isRead
          ? "bg-muted/30"
          : "bg-primary/5 border-l-4 border-primary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-2 rounded-lg shrink-0",
            notification.type === "success" && "bg-success/10",
            notification.type === "warning" && "bg-warning/10",
            notification.type === "alert" && "bg-destructive/10",
            notification.type === "info" && "bg-primary/10"
          )}
        >
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                className={cn(
                  "font-medium",
                  !notification.isRead && "font-semibold"
                )}
              >
                {t(notification.title as any)}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t(notification.message as any)}
              </p>
            </div>
            {!notification.isRead && (
              <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(notification.createdAt)}
            </span>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={onMarkRead}
                >
                  <Check className="h-3 w-3 mr-1" />
                  {i18n.t("notifications:actions.markRead")}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Notifications() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
  } = useNotifications();
  const { t } = useTranslation(["notifications", "common"]);
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "read") return n.isRead;
    return true;
  });

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{t("notifications:title")}</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0
                  ? t("notifications:subtitle.unread", { count: unreadCount })
                  : t("notifications:subtitle.none")}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4" />
              {t("notifications:actions.markAllRead")}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{notifications.length}</p>
            <p className="text-sm text-muted-foreground">{t("notifications:stats.total")}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-warning">{unreadCount}</p>
            <p className="text-sm text-muted-foreground">{t("notifications:stats.unread")}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-success">
              {notifications.length - unreadCount}
            </p>
            <p className="text-sm text-muted-foreground">{t("notifications:stats.read")}</p>
          </div>
        </div>

        {/* Notifications List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="glass-card rounded-2xl p-4">
            <TabsList>
              <TabsTrigger value="all">
                {t("notifications:tabs.all", { count: notifications.length })}
              </TabsTrigger>
              <TabsTrigger value="unread">
                {t("notifications:tabs.unread", { count: unreadCount })}
              </TabsTrigger>
              <TabsTrigger value="read">
                {t("notifications:tabs.read", { count: notifications.length - unreadCount })}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-3 mt-4">
            {filteredNotifications.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{t("notifications:empty.title")}</p>
                <p className="text-muted-foreground">
                  {activeTab === "unread"
                    ? t("notifications:empty.allRead")
                    : t("notifications:empty.none")}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkRead={() => markAsRead(notification.id)}
                  onDelete={() => clearNotification(notification.id)}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
