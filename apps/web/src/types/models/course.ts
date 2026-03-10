/**
 * Course & Learning Domain Models
 * Courses, lessons, assignments, materials
 */

// =============================================================================
// Course
// =============================================================================

export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  gradeLevel: number;
  teacherId: string;
  thumbnailUrl?: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CourseWithTeacher extends Course {
  teacher: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

// =============================================================================
// Lesson
// =============================================================================

export type LessonType = 'video' | 'reading' | 'interactive' | 'quiz' | 'assignment';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type: LessonType;
  order: number;
  durationMinutes?: number;
  contentUrl?: string;
  content?: string; // For reading/markdown content
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  studentId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercent: number;
  completedAt?: string;
  timeSpentSeconds: number;
}

// =============================================================================
// Assignment
// =============================================================================

export type AssignmentType = 'homework' | 'project' | 'essay' | 'presentation' | 'lab';

export interface Assignment {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  type: AssignmentType;
  dueDate: string;
  maxScore: number;
  weight: number; // Percentage weight in final grade
  attachments?: string[];
  rubricId?: string;
  allowLateSubmission: boolean;
  latePenaltyPercent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentWithCourse extends Assignment {
  course: {
    id: string;
    title: string;
    subject: string;
  };
}

// =============================================================================
// Submission
// =============================================================================

export type SubmissionStatus = 'draft' | 'submitted' | 'graded' | 'returned';

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content?: string;
  attachments?: string[];
  status: SubmissionStatus;
  submittedAt?: string;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  isLate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionWithDetails extends Submission {
  assignment: Assignment;
  student: {
    id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

// =============================================================================
// Learning Materials
// =============================================================================

export type MaterialType = 'document' | 'video' | 'audio' | 'link' | 'simulation' | 'mindmap';

export interface LearningMaterial {
  id: string;
  lessonId?: string;
  courseId?: string;
  title: string;
  description?: string;
  type: MaterialType;
  category?: string; // e.g., "javascript", "react"
  url: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  fileSize?: number;
  tags: string[];
  createdAt: string;
}

export interface VideoLessonDetails {
    id: string;
    videoId: string;
    transcript: {
        startTime: number;
        endTime: number;
        text: string;
    }[];
    quizzes: {
        timestamp: number;
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
    bookmarks: {
        userId: string;
        timestamp: number;
        note: string;
        createdAt: string;
    }[];
}

export interface VideoProgress {
    studentId: string;
    videoId: string;
    watchedSegments: { start: number; end: number }[];
    lastPosition: number;
    quizScores: number[];
    completionRate: number; // 0-100
}

export interface AudioResources {
    id: string;
    audioUrl: string;
    transcript: string;
    keyPoints: string[];
    narrator?: string;
}

export interface SimulationConfig {
    id: string;
    type: 'physics' | 'chemistry' | 'math' | 'history';
    embedUrl: string;
    parameters: {
        name: string;
        type: 'slider' | 'input' | 'toggle';
        min?: number;
        max?: number;
        default: any;
    }[];
}

// =============================================================================
// Class / Section
// =============================================================================

export interface Class {
  id: string;
  name: string;
  gradeLevel: number;
  academicYear: string;
  semester: 1 | 2;
  teacherId: string; // Homeroom teacher
  studentCount: number;
  createdAt: string;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  studentId: string;
  enrolledAt: string;
  status: 'active' | 'transferred' | 'graduated' | 'dropped';
}

// =============================================================================
// Seating Chart
// =============================================================================

export interface Seat {
  id: string; // e.g., "A1", "B2"
  row: number;
  col: number;
  studentId?: string;
  status: 'occupied' | 'empty' | 'broken';
}

export interface SeatingChart {
  id: string;
  classId: string;
  name: string; // "Standard Layout 2026"
  rows: number;
  columns: number;
  seats: Seat[];
  teacherDeskPosition: 'front' | 'back' | 'left' | 'right';
  isActive: boolean;
  createdAt: string;
}

// =============================================================================
// Project Based Learning (PBL)
// =============================================================================

export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed';

export interface ProjectPhase {
  id: string;
  title: string;
  description?: string;
  order: number;
  tasks: ProjectTask[];
  isCompleted: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  assigneeId?: string; // For group projects
  status: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
}

export interface StudentProject {
  id: string;
  studentId: string; // or teamId
  courseId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  phases: ProjectPhase[];
  repositoryUrl?: string; // Git link
  deployedUrl?: string;
  finalGrade?: number;
  feedback?: string;
  startDate: string;
  endDate?: string;
}

// =============================================================================
// Parent Portal - Curriculum Transparency
// =============================================================================

export interface ParentFriendlyLO {
    id: string;
    originalLO: string;
    parentTranslation: string;
    realWorldExample: string;
    whyItMatters: string;
}

export interface LessonOverview {
    lessonId: string;
    title: string;
    subject: string;
    week: number;
    keyTakeaways: string[];
    learningObjectives: ParentFriendlyLO[];
    vocabulary: { word: string; definition: string }[];
    howToHelpAtHome: string[];
    conversationStarters: string[];
}

export interface HomeActivity {
    id: string;
    title: string;
    subject: string;
    topic: string;
    description: string;
    materials: string[];
    steps: string[];
    estimatedMinutes: number;
    parentInvolvement: 'minimal' | 'moderate' | 'high';
    rating?: number;
}
