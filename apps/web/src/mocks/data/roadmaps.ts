export const mockRoadmapSteps = [
    { id: '1', title: 'HTML & CSS Fundamentals', week: 1, status: 'completed', type: 'Lesson' },
    { id: '2', title: 'JavaScript Basics', week: 2, status: 'completed', type: 'Lesson' },
    { id: '3', title: 'DOM Manipulation', week: 3, status: 'current', type: 'Practice' },
    { id: '4', title: 'Async JS & APIs', week: 4, status: 'available', type: 'Project' },
    { id: '5', title: 'React Introduction', week: 5, status: 'locked', type: 'Lesson' },
    { id: '6', title: 'State Management', week: 6, status: 'locked', type: 'Lesson' },
];

export const mockRoadmap = [
    {
        id: "r1",
        title: "student:roadmap.steps.s1.title",
        description: "student:roadmap.steps.s1.description",
        status: "completed",
        icon: "🎯",
        date: "24/01/2026",
    },
    {
        id: "r2",
        title: "student:roadmap.steps.s2.title",
        description: "student:roadmap.steps.s2.description",
        status: "current",
        icon: "⚡",
        date: "05/02/2026",
    },
    {
        id: "r3",
        title: "student:roadmap.steps.s3.title",
        description: "student:roadmap.steps.s3.description",
        status: "upcoming",
        icon: "🌈",
        date: "15/02/2026",
    },
];

export const mockStats = [
    { label: "student:roadmap.stats.completed", value: "12", icon: "📚" },
    { label: "student:roadmap.stats.hours", value: "45h", icon: "⏱️" },
    { label: "student:roadmap.stats.score", value: "8.5", icon: "🎯" },
];

export const mockActivities = [
    { id: "a1", user: "classroom:mocks.students.lam", action: "student:roadmap.activities.completedChapter", time: "5m ago" },
    { id: "a2", user: "classroom:mocks.students.thu", action: "student:roadmap.activities.earnedBadge", time: "15m ago" },
    { id: "a3", user: "classroom:mocks.students.an_roadmap", action: "student:roadmap.activities.startedRoadmap", time: "1h ago" },
];
