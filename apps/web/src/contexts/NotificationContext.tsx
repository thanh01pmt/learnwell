import { createContext, useContext, useState, ReactNode } from "react";
import i18n from "@/i18n";
import { useRole, UserRole } from "./RoleContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  isRead: boolean;
  createdAt: Date;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "isRead" | "createdAt">) => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock notifications by role
const getInitialNotifications = (role: UserRole): Notification[] => {
  const now = new Date();

  const baseNotifications: Record<UserRole, Notification[]> = {
    student: [
      {
        id: "s1",
        title: "notifications:mocks.student.s1.title",
        message: "notifications:mocks.student.s1.message",
        type: "success",
        isRead: false,
        createdAt: new Date(now.getTime() - 10 * 60000),
        link: "/student/assignments",
      },
      {
        id: "s2",
        title: "notifications:mocks.student.s2.title",
        message: "notifications:mocks.student.s2.message",
        type: "info",
        isRead: false,
        createdAt: new Date(now.getTime() - 60 * 60000),
        link: "/student/materials",
      },
      {
        id: "s3",
        title: "notifications:mocks.student.s3.title",
        message: "notifications:mocks.student.s3.message",
        type: "warning",
        isRead: false,
        createdAt: new Date(now.getTime() - 2 * 60 * 60000),
        link: "/student/assignments",
      },
      {
        id: "s4",
        title: "notifications:mocks.student.s4.title",
        message: "notifications:mocks.student.s4.message",
        type: "success",
        isRead: true,
        createdAt: new Date(now.getTime() - 24 * 60 * 60000),
        link: "/achievements",
      },
    ],
    teacher: [
      {
        id: "t1",
        title: "notifications:mocks.teacher.t1.title",
        message: "notifications:mocks.teacher.t1.message",
        type: "info",
        isRead: false,
        createdAt: new Date(now.getTime() - 5 * 60000),
        link: "/students",
      },
      {
        id: "t2",
        title: "notifications:mocks.teacher.t2.title",
        message: "notifications:mocks.teacher.t2.message",
        type: "success",
        isRead: false,
        createdAt: new Date(now.getTime() - 60 * 60000),
        link: "/grading",
      },
      {
        id: "t3",
        title: "notifications:mocks.teacher.t3.title",
        message: "notifications:mocks.teacher.t3.message",
        type: "warning",
        isRead: false,
        createdAt: new Date(now.getTime() - 2 * 60 * 60000),
        link: "/grading",
      },
    ],
    admin: [
      {
        id: "a1",
        title: "notifications:mocks.admin.a1.title",
        message: "notifications:mocks.admin.a1.message",
        type: "success",
        isRead: false,
        createdAt: new Date(now.getTime() - 30 * 60000),
      },
      {
        id: "a2",
        title: "notifications:mocks.admin.a2.title",
        message: "notifications:mocks.admin.a2.message",
        type: "warning",
        isRead: false,
        createdAt: new Date(now.getTime() - 60 * 60000),
        link: "/admin/teachers",
      },
      {
        id: "a3",
        title: "notifications:mocks.admin.a3.title",
        message: "notifications:mocks.admin.a3.message",
        type: "info",
        isRead: false,
        createdAt: new Date(now.getTime() - 3 * 60 * 60000),
        link: "/authoring/exams",
      },
    ],
    parent: [
      {
        id: "p1",
        title: "notifications:mocks.parent.p1.title",
        message: "notifications:mocks.parent.p1.message",
        type: "success",
        isRead: false,
        createdAt: new Date(now.getTime() - 2 * 60 * 60000),
        link: "/parent/progress",
      },
      {
        id: "p2",
        title: "notifications:mocks.parent.p2.title",
        message: "notifications:mocks.parent.p2.message",
        type: "success",
        isRead: false,
        createdAt: new Date(now.getTime() - 5 * 60000),
        link: "/parent/progress",
      },
      {
        id: "p3",
        title: "notifications:mocks.parent.p3.title",
        message: "notifications:mocks.parent.p3.message",
        type: "warning",
        isRead: false,
        createdAt: new Date(now.getTime() - 24 * 60 * 60000),
      },
      {
        id: "p4",
        title: "notifications:mocks.parent.p4.title",
        message: "notifications:mocks.parent.p4.message",
        type: "info",
        isRead: true,
        createdAt: new Date(now.getTime() - 48 * 60 * 60000),
        link: "/parent/schedule",
      },
    ],
  };

  return baseNotifications[role];
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { role } = useRole();
  const [notifications, setNotifications] = useState<Notification[]>(getInitialNotifications(role));

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addNotification = (notification: Omit<Notification, "id" | "isRead" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `n-${Date.now()}`,
      isRead: false,
      createdAt: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / (60 * 60000));
  const diffDays = Math.floor(diffMs / (24 * 60 * 60000));

  if (diffMins < 1) return i18n.t("time.justNow");
  if (diffMins < 60) return i18n.t("time.minutesAgo", { count: diffMins });
  if (diffHours < 24) return i18n.t("time.hoursAgo", { count: diffHours });
  if (diffDays === 1) return i18n.t("time.yesterday");
  return i18n.t("time.daysAgo", { count: diffDays });
}
