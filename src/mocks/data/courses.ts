import type { 
  CourseWithTeacher, 
  Lesson, 
  AssignmentWithCourse
} from '@/types/models';

export const mockCourses: CourseWithTeacher[] = [
  {
    id: 'course1',
    title: 'classroom:mocks.courses.math10.title',
    description: 'classroom:mocks.courses.math10.description',
    subject: 'classroom:mocks.courses.math10.subject',
    gradeLevel: 10,
    teacherId: '2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    teacher: {
      id: '2',
      fullName: 'classroom:mocks.students.binh',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    },
  },
  {
    id: 'course2',
    title: 'classroom:mocks.courses.python.title',
    description: 'classroom:mocks.courses.python.description',
    subject: 'classroom:mocks.courses.python.subject',
    gradeLevel: 10,
    teacherId: '2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    teacher: {
      id: '2',
      fullName: 'classroom:mocks.students.binh',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    },
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson1',
    courseId: 'course1',
    title: 'classroom:mocks.courses.lesson1.title',
    description: 'classroom:mocks.courses.lesson1.description',
    type: 'reading',
    order: 1,
    durationMinutes: 45,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lesson2',
    courseId: 'course1',
    title: 'classroom:mocks.courses.lesson2.title',
    description: 'classroom:mocks.courses.lesson2.description',
    type: 'video',
    order: 2,
    durationMinutes: 60,
    contentUrl: 'https://example.com/video',
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockAssignments: AssignmentWithCourse[] = [
  {
    id: 'assign1',
    courseId: 'course1',
    lessonId: 'lesson1',
    title: 'classroom:mocks.courses.assign1.title',
    description: 'classroom:mocks.courses.assign1.description',
    type: 'homework',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxScore: 100,
    weight: 10,
    allowLateSubmission: true,
    latePenaltyPercent: 10,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    course: {
      id: 'course1',
      title: 'classroom:mocks.courses.math10.title',
      subject: 'classroom:mocks.courses.math10.subject',
    },
  },
];
