/**
 * Communication Domain Models
 * Messages, notifications, announcements, calendar
 */

// =============================================================================
// Messages
// =============================================================================

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  readBy: string[];
  createdAt: string;
  editedAt?: string;
}

export interface MessageThread {
  id: string;
  participants: string[];
  type: 'direct' | 'group';
  title?: string; // For group chats
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// Notifications
// =============================================================================

export type NotificationType = 
  | 'grade'
  | 'assignment'
  | 'message'
  | 'announcement'
  | 'reminder'
  | 'achievement'
  | 'contest'
  | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface NotificationPreference {
  userId: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
  sms?: boolean;
  types: {
    [key in NotificationType]: {
      email: boolean;
      push: boolean;
    };
  };
  thresholds?: {
    gradeBelow?: number;
    attendanceBelow?: number;
  };
  quietHours?: {
    enabled: boolean;
    start: string; // HH:mm
    end: string;
  };
}

export interface VideoMessage {
    id: string;
    fromId: string;
    toId: string;
    threadId: string;
    videoUrl: string;
    thumbnailUrl: string;
    duration: number;
    topic: 'progress' | 'behavior' | 'schedule' | 'general';
    sentAt: string;
    viewedAt?: string;
}

export interface WeeklyDigest {
    parentId: string;
    studentId: string;
    weekOf: string;
    summary: string;
    keyTopics: string[];
    lessons: {
        subject: string;
        title: string;
        takeaways: string[];
    }[];
    completedAssignments: number;
    upcomingDeadlines: {
        title: string;
        dueDate: string;
    }[];
}

// =============================================================================
// Announcements
// =============================================================================

export interface Announcement {
  id: string;
  authorId: string;
  title: string;
  content: string; // Markdown
  priority: 'normal' | 'important' | 'urgent';
  audience: {
    type: 'all' | 'role' | 'class' | 'course';
    ids?: string[];
    roles?: string[];
  };
  attachments?: string[];
  isPinned: boolean;
  publishedAt: string;
  expiresAt?: string;
  createdAt: string;
}

// =============================================================================
// Calendar & Events
// =============================================================================

export type EventType = 'class' | 'exam' | 'meeting' | 'deadline' | 'holiday' | 'contest' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  location?: string;
  meetingUrl?: string;
  color?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
    daysOfWeek?: number[];
  };
  attendees?: string[];
  reminders?: {
    method: 'email' | 'push' | 'both';
    minutesBefore: number;
  }[];
  createdBy: string;
  createdAt: string;
}

// =============================================================================
// Schedule (Class Timetable)
// =============================================================================

export interface ScheduleSlot {
  id: string;
  classId: string;
  courseId: string;
  teacherId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // HH:mm
  endTime: string;
  room?: string;
  isRecurring: boolean;
  effectiveFrom: string;
  effectiveUntil?: string;
}

export interface WeeklySchedule {
  classId: string;
  slots: ScheduleSlot[];
  lastUpdated: string;
}
