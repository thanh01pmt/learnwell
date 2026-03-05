export const areaChartData = [
  { name: '01 Apr', value: 800 },
  { name: '02 Apr', value: 950 },
  { name: '03 Apr', value: 1100 },
  { name: '04 Apr', value: 1250 },
  { name: '05 Apr', value: 1100 },
  { name: '06 Apr', value: 1300 },
  { name: '07 Apr', value: 1200 },
];

export const pieChartData = [
  { name: 'Household', value: 43, color: 'hsl(186, 100%, 42%)' },
  { name: 'Food', value: 28, color: 'hsl(142, 76%, 42%)' },
  { name: 'Clothing', value: 16, color: 'hsl(45, 100%, 51%)' },
  { name: 'Entertainment', value: 13, color: 'hsl(142, 76%, 75%)' },
];

export const transactions = [
  { id: 1, name: 'Lunch money', date: '06 April 2023', amount: -10, color: 'bg-accent' },
  { id: 2, name: 'April Bonus', date: '05 April 2023', amount: 500, color: 'bg-success' },
  { id: 3, name: 'Allowance', date: '05 April 2023', amount: 500, color: 'bg-success' },
  { id: 4, name: 'Pay David', date: '05 April 2023', amount: -50, color: 'bg-cyan' },
  { id: 5, name: 'Netflix subscription', date: '05 April 2023', amount: -10, color: 'bg-warning' },
];

export const demoActivities = [
  {
    id: '1',
    type: 'join_request',
    title: 'dashboard:mockup.teacher.activities.mathJoinRequest',
    description: 'dashboard:mockup.teacher.activities.mathDescription',
    params: { name: 'classroom:mocks.students.an' },
    timeKey: 'minutes',
    timeCount: 5,
    user: { name: 'classroom:mocks.students.an', initials: 'NA' },
    actionable: true
  },
  {
    id: '2',
    type: 'submission',
    title: 'dashboard:mockup.teacher.activities.submissionTitle',
    description: 'dashboard:mockup.teacher.activities.submissionDescription',
    params: { name: 'classroom:mocks.students.binh', subject: 'dashboard:mockup.subjects.math' },
    timeKey: 'minutes',
    timeCount: 15,
    user: { name: 'classroom:mocks.students.binh', initials: 'TB' }
  },
  {
    id: '3',
    type: 'alert',
    title: 'dashboard:mockup.teacher.activities.gradingAlert',
    description: 'dashboard:mockup.teacher.activities.gradingDescription',
    params: { count: 5, subject: 'dashboard:mockup.subjects.math' },
    timeKey: 'hours',
    timeCount: 1
  },
  {
    id: '4',
    type: 'comment',
    title: 'dashboard:mockup.notifications.newLesson',
    description: 'dashboard:mockup.teacher.activities.mathDescription',
    params: { name: 'classroom:mocks.students.mai', subject: 'dashboard:mockup.subjects.calculus' },
    timeKey: 'hours',
    timeCount: 2,
    user: { name: 'classroom:mocks.students.mai', initials: 'LC' }
  },
];

export const demoStudents = [
  { id: 1, name: 'classroom:mocks.students.an', email: 'an.nguyen@school.edu', class: 'classroom:mocks.classes.class10A1', progress: 85, status: 'active', avatar: 'NA' },
  { id: 2, name: 'classroom:mocks.students.binh', email: 'binh.tran@school.edu', class: 'classroom:mocks.classes.class10A1', progress: 92, status: 'active', avatar: 'TB' },
  { id: 3, name: 'classroom:mocks.students.mai', email: 'chau.le@school.edu', class: 'classroom:mocks.classes.class11B1', progress: 67, status: 'warning', avatar: 'LC' },
  { id: 4, name: 'classroom:mocks.students.duc', email: 'dung.pham@school.edu', class: 'classroom:mocks.classes.class10A2', progress: 45, status: 'danger', avatar: 'PD' },
  { id: 5, name: 'classroom:mocks.students.em', email: 'em.hoang@school.edu', class: 'classroom:mocks.classes.class10A1', progress: 78, status: 'active', avatar: 'HE' },
];

export const demoAssignments = [
  { id: 1, title: 'dashboard:mockup.assignments.mathQuiz', class: 'classroom:mocks.classes.class10A1', dueDate: '2024-02-15', submitted: 28, total: 32, status: 'active' },
  { id: 2, title: 'parent:dashboard.schedule.types.exam', class: 'classroom:mocks.classes.class11B1', dueDate: '2024-02-10', submitted: 30, total: 30, status: 'completed' },
  { id: 3, title: 'dashboard:mockup.subjects.chemistry', class: 'classroom:mocks.classes.class10A2', dueDate: '2024-02-18', submitted: 15, total: 35, status: 'active' },
  { id: 4, title: 'dashboard:mockup.assignments.literatureAnalysis', class: 'classroom:mocks.classes.class11B1', dueDate: '2024-02-08', submitted: 25, total: 32, status: 'overdue' },
];
