// =============================================================================
// Student Dashboard
// =============================================================================

export const recentLessons = [
  {
    id: "1",
    title: "dashboard:mockup.lessons.rationalNumbers",
    subject: "dashboard:mockup.subjects.math",
    progress: 100,
    durationKey: "common:labels.minutesShort",
    durationCount: 45,
    icon: "📐",
  },
  {
    id: "2",
    title: "dashboard:mockup.lessons.englishTenses",
    subject: "dashboard:mockup.subjects.english",
    progress: 75,
    durationKey: "common:labels.minutesShort",
    durationCount: 60,
    icon: "🔤",
  },
  {
    id: "3",
    title: "dashboard:mockup.lessons.newtonMechanics",
    subject: "dashboard:mockup.subjects.physics",
    progress: 40,
    durationKey: "common:labels.minutesShort",
    durationCount: 30,
    icon: "⚙️",
  },
];

export const studentNotifications = [
  { id: "1", messageKey: "dashboard:mockup.notifications.mathGrade", timeKey: "minutes", timeCount: 10, type: "grade" },
  { id: "2", messageKey: "dashboard:mockup.notifications.newLesson", timeKey: "hours", timeCount: 1, type: "lesson" },
  { id: "3", messageKey: "dashboard:mockup.notifications.essayReminder", timeKey: "hours", timeCount: 2, type: "reminder" },
];

// =============================================================================
// Parent Dashboard
// =============================================================================

export const parentChildren = [
  {
    id: "1",
    name: "classroom:mocks.students.minhanh",
    avatar: "minhanh",
    grade: "dashboard:mockup.parent.grades.g6",
    class: "6A1",
    overallScore: 8.5,
    attendance: 95,
    recentActivity: "dashboard:mockup.parent.activities.mathCh3",
  },
  {
    id: "2",
    name: "classroom:mocks.students.tuankiet",
    avatar: "tuankiet",
    grade: "dashboard:mockup.parent.grades.g4",
    class: "4B2",
    overallScore: 9.2,
    attendance: 98,
    recentActivity: "dashboard:mockup.parent.activities.englishBadge",
  },
];

export const upcomingEvents = [
  {
    id: "1",
    title: "dashboard:mockup.parent.events.meeting",
    params: { class: "6A1" },
    date: "2026-02-08T08:00:00",
    time: "8:00 - 10:00",
    type: "meeting",
  },
  {
    id: "2",
    title: "dashboard:mockup.parent.events.exam",
    params: { name: "classroom:mocks.students.minhanh" },
    date: "2026-02-10T07:30:00",
    time: "7:30 - 9:00",
    type: "exam",
  },
  {
    id: "3",
    title: "dashboard:mockup.parent.events.stem",
    params: { name: "classroom:mocks.students.tuankiet" },
    date: "2026-02-14T14:00:00",
    time: "14:00 - 17:00",
    type: "event",
  },
];

export const parentNotifications = [
  {
    id: "1",
    messageKey: "dashboard:mockup.parent.activities.examSuccess",
    timeKey: "hours",
    timeCount: 2,
    isNew: true,
  },
  {
    id: "2",
    messageKey: "dashboard:mockup.parent.activities.teacherPraise",
    timeKey: "hours",
    timeCount: 5,
    isNew: true,
  },
  {
    id: "3",
    messageKey: "dashboard:mockup.parent.activities.feeReminder",
    timeKey: "days",
    timeCount: 1,
    isNew: false,
  },
];

export const comparisonData = [
  { month: "common:months.sepShort", child: 7.5, average: 7.2 },
  { month: "common:months.octShort", child: 8.0, average: 7.5 },
  { month: "common:months.novShort", child: 8.2, average: 7.4 },
  { month: "common:months.decShort", child: 7.8, average: 7.6 },
  { month: "common:months.janShort", child: 8.5, average: 7.8 },
  { month: "common:months.febShort", child: 9.0, average: 7.9 },
];

// =============================================================================
// Teacher Dashboard
// =============================================================================

export const teacherActivities = [
    {
        id: "1",
        type: "join_request",
        title: "dashboard:mockup.teacher.activities.mathJoinRequest",
        description: "dashboard:mockup.teacher.activities.mathDescription",
        params: { name: "classroom:mocks.students.an" },
        timeKey: "minutes",
        timeCount: 5,
        user: {
            name: "classroom:mocks.students.an",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=an",
            initials: "NA",
        },
        actionable: true,
    },
    {
        id: "2",
        type: "submission",
        title: "dashboard:mockup.teacher.activities.submissionTitle",
        description: "dashboard:mockup.teacher.activities.submissionDescription",
        params: { completed: 28, total: 30, subject: "dashboard:mockup.subjects.math" },
        timeKey: "hours",
        timeCount: 1,
    },
    {
        id: "3",
        type: "alert",
        title: "dashboard:mockup.teacher.activities.gradingAlert",
        description: "dashboard:mockup.teacher.activities.gradingDescription",
        params: { count: 12, subject: "dashboard:mockup.subjects.math" },
        timeKey: "hours",
        timeCount: 2,
    },
];

export const teacherClasses = [
    {
        id: "1",
        name: "dashboard:mockup.teacher.classes.math6A",
        subject: "dashboard:mockup.teacher.classes.mathSemester",
        studentCount: 35,
        schedule: "dashboard:mockup.teacher.classes.scheduleMath",
        progress: 65,
        coverColor: "bg-primary",
    },
    {
        id: "2",
        name: "dashboard:mockup.teacher.classes.van7B",
        subject: "dashboard:mockup.teacher.classes.vanSemester",
        studentCount: 32,
        schedule: "dashboard:mockup.teacher.classes.scheduleScience",
        progress: 45,
        coverColor: "bg-accent",
    },
];

// =============================================================================
// Admin Dashboard
// =============================================================================

export const adminSystemStats = [
  { title: "dashboard:mockup.admin.stats.totalStudents", value: "1,247", change: "+12%", color: "text-blue-600" },
  { title: "dashboard:mockup.admin.stats.teachers", value: "48", change: "+3", color: "text-primary" },
  { title: "dashboard:mockup.admin.stats.classes", value: "32", change: "+2", color: "text-purple-600" },
  { title: "dashboard:mockup.admin.stats.courses", value: "156", change: "+8%", color: "text-amber-600" },
];

export const adminActivities = [
  { user: "classroom:mocks.students.an", actionKey: "dashboard:mockup.admin.activities.createdExam", role: "teacher", timeKey: "minutes", timeCount: 5 },
  { user: "classroom:mocks.students.binh", actionKey: "dashboard:mockup.admin.activities.submittedHomework", role: "student", timeKey: "minutes", timeCount: 12 },
  { user: "classroom:mocks.students.teacherC", actionKey: "dashboard:mockup.admin.activities.gradedPapers", params: { count: 25 }, role: "teacher", timeKey: "minutes", timeCount: 30 },
];

export const adminClassOverview = [
  { name: "classroom:mocks.classes.class10A1", teacher: "classroom:mocks.students.an", students: 42, progress: 78, status: "active" },
  { name: "classroom:mocks.classes.class10A2", teacher: "classroom:mocks.students.binh", students: 40, progress: 65, status: "active" },
  { name: "classroom:mocks.classes.class11B1", teacher: "classroom:mocks.students.teacherC", students: 38, progress: 82, status: "active" },
];

export const adminSystemAlerts = [
  { type: "warning", messageKey: "dashboard:mockup.admin.alerts.ungraded", params: { count: 5 }, count: 5 },
  { type: "info", messageKey: "dashboard:mockup.admin.alerts.pendingApproval", params: { count: 12 }, count: 12 },
  { type: "success", messageKey: "dashboard:mockup.admin.alerts.backupSuccess", count: null },
];
