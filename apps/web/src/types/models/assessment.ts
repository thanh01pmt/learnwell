/**
 * Assessment Domain Models
 * Quizzes, exit tickets, rubrics, grades
 */

// =============================================================================
// Quiz / Test
// =============================================================================

export type QuestionType = 
  | 'multiple_choice' 
  | 'true_false' 
  | 'short_answer' 
  | 'essay' 
  | 'fill_blank' 
  | 'matching' 
  | 'ordering';

export interface Question {
  id: string;
  quizId: string;
  type: QuestionType;
  content: string;
  options?: string[]; // For MCQ, matching
  correctAnswer?: string | string[] | number; // Index for MCQ, text for short answer
  points: number;
  explanation?: string;
  order: number;
  mediaUrl?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string; // For Question Bank filtering
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description?: string;
  type: 'practice' | 'graded' | 'diagnostic';
  status: 'draft' | 'published' | 'archived';
  timeLimitMinutes?: number;
  passingScore: number; // Percentage
  maxAttempts: number;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
  availableFrom?: string;
  availableUntil?: string;
  questions?: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  attemptNumber: number;
  startedAt: string;
  completedAt?: string;
  score?: number;
  maxScore: number;
  passed: boolean;
  answers: {
    questionId: string;
    answer: string | string[] | number;
    isCorrect: boolean;
    pointsEarned: number;
  }[];
}

// =============================================================================
// Exit Tickets (Formative Assessment)
// =============================================================================

export interface ExitTicket {
  id: string;
  classId: string;
  lessonId?: string;
  teacherId: string;
  title: string;
  questions: {
    id: string;
    question: string;
    type: 'multiple_choice' | 'short_answer' | 'scale';
    options?: string[];
    correctAnswer?: number;
  }[];
  summary?: {
      confidentCount: number;
      okayCount: number;
      confusedCount: number;
  };
  aiInterventionTips?: string[];
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface ExitTicketResponse {
  id: string;
  ticketId: string;
  studentId: string;
  confidence: 'Confident' | 'Okay' | 'Confused';
  answers: {
    questionId: string;
    answer: string | number;
  }[];
  submittedAt: string;
  score?: number;
}

// =============================================================================
// Rubric
// =============================================================================

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  levels: {
    score: number;
    label: string;
    description: string;
  }[];
}

export interface Rubric {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  criteria: RubricCriterion[];
  maxScore: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// Grades & History
// =============================================================================

export interface GradingHistoryEntry {
    id: string;
    gradeId: string;
    studentId: string;
    oldScore: number;
    newScore: number;
    reason: string;
    performedBy: string; // Teacher ID
    timestamp: string;
}

// =============================================================================
// Grades
// =============================================================================

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId?: string;
  quizId?: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade?: string;
  weight: number;
  gradedBy: string;
  gradedAt: string;
  comments?: string;
}

export interface CourseGradeSummary {
  courseId: string;
  studentId: string;
  currentGrade: number;
  letterGrade: string;
  completedAssignments: number;
  totalAssignments: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

// =============================================================================
// Attendance
// =============================================================================

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
  notes?: string;
  recordedBy: string;
}

// =============================================================================
// Formative & Live Assessment
// =============================================================================

export interface ConfidenceEntry {
  studentId: string;
  level: 'Confident' | 'Okay' | 'Confused';
  timestamp: string;
}

export interface FormativeSession {
  id: string;
  classId: string;
  lessonId?: string;
  topic: string;
  status: 'live' | 'ended';
  confidenceResponses: ConfidenceEntry[];
  muddyPoints: {
    topic: string;
    mentions: number;
    aiExplanationSuggestion?: string;
  }[];
  startedAt: string;
  endedAt?: string;
}

export interface AttendanceSummary {
  studentId: string;
  classId: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  attendanceRate: number;
}
