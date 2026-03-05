export const mockGradebookData = [
    { id: 1, name: "classroom:mocks.students.an", class: "10A1", grades: [8.5, 7.0, 9.2, 8.0, 7.5] },
    { id: 2, name: "classroom:mocks.students.binh", class: "10A1", grades: [6.0, 8.5, 7.5, 9.0, 8.2] },
    { id: 3, name: "classroom:mocks.students.cuong", class: "10A1", grades: [9.5, 9.0, 10.0, 9.5, 9.8] },
    { id: 4, name: "classroom:mocks.students.duc", class: "10A1", grades: [4.5, 5.5, 6.0, 5.0, 6.5] },
    { id: 5, name: "classroom:mocks.students.em", class: "10A1", grades: [7.5, 8.0, 7.0, 7.5, 8.0] },
    { id: 6, name: "classroom:mocks.students.chi", class: "10A1", grades: [8.0, 7.5, 8.5, 8.0, 9.0] },
    { id: 7, name: "classroom:mocks.students.giang", class: "10A1", grades: [5.5, 6.0, 5.0, 6.5, 5.5] },
    { id: 8, name: "classroom:mocks.students.ha", class: "10A1", grades: [9.0, 9.5, 9.0, 8.5, 9.2] },
];

export const mockAssignmentColumns = [
    "classroom:mocks.gradebook.assignments.oral1",
    "classroom:mocks.gradebook.assignments.quizRational",
    "classroom:mocks.gradebook.assignments.examCh1",
    "classroom:mocks.gradebook.assignments.midterm",
    "classroom:mocks.gradebook.assignments.project"
];

export const gradeDistribution = [
    { range: "0-2", count: 0, color: "hsl(var(--destructive))" },
    { range: "2-4", count: 1, color: "hsl(var(--destructive))" },
    { range: "4-6", count: 5, color: "hsl(var(--warning))" },
    { range: "6-8", count: 12, color: "hsl(var(--primary))" },
    { range: "8-10", count: 18, color: "hsl(var(--success))" },
];
