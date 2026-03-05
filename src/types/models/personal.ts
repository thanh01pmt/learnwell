/**
 * Personal Development Domain Models
 * Portfolio, resumes, tasks, goals
 */

import { Credential } from './gamification';
import { ProjectStatus } from './course';

// =============================================================================
// Portfolio
// =============================================================================

export interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    role: string;
    technologies: string[];
    imageUrl?: string;
    demoUrl?: string;
    repoUrl?: string;
    startDate: string;
    endDate?: string;
    isFeatured: boolean;
}

export interface LearningArtifact {
    id: string;
    userId: string;
    title: string;
    category: string; // e.g., "Science Project"
    reflection: string;
    type: 'video' | 'photo' | 'document' | 'link';
    fileUrl: string;
    thumbnailUrl?: string;
    stats: {
        stars: number;
        feedbackCount: number;
    };
    createdAt: string;
    publishedAt?: string;
}

// =============================================================================
// Time Tracking & Analytics
// =============================================================================

export interface StudySession {
    id: string;
    userId: string;
    subject: string;
    startTime: string;
    endTime: string;
    duration: number; // minutes
    focusScore: number; // 0-100
    distractions: number;
    completed: boolean;
}

export interface TimeAnalytics {
    totalStudyTime: number; // this week
    averageFocusScore: number;
    subjectBreakdown: {
        subject: string;
        totalMinutes: number;
        sessions: number;
    }[];
    peakPerformanceTime: {
        hour: number; // 0-23
        dayOfWeek: number; // 0-6
        avgFocusScore: number;
    };
}

// =============================================================================
// SMART Goals
// =============================================================================

export interface LearningGoal {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: 'academic' | 'skill' | 'habit' | 'project';
    specific: string;
    measurable: {
        metric: string;
        target: number;
        current: number;
        unit: string;
    };
    achievable: string;
    relevant: string;
    timeBound: {
        startDate: string;
        endDate: string;
        milestones: {
            date: string;
            description: string;
            completed: boolean;
        }[];
    };
    status: 'active' | 'completed' | 'abandoned' | 'draft' | 'pending_review' | 'approved';
    progress: number; // 0-100
    createdAt: string;
    updatedAt: string;
}

export interface GoalCheckIn {
    goalId: string;
    date: string;
    progress: number;
    reflection: string;
    obstacles: string[];
    nextSteps: string[];
}

export interface CollaborativeGoal extends LearningGoal {
    createdBy: 'student' | 'teacher' | 'parent';
    stakeholderInput: {
        role: 'student' | 'teacher' | 'parent';
        userId: string;
        input: string;
        timestamp: string;
    }[];
    status: 'active' | 'completed' | 'abandoned' | 'draft' | 'pending_review' | 'approved';
    approvals: {
        role: 'student' | 'teacher' | 'parent';
        userId: string;
        approved: boolean;
        timestamp: string;
    }[];
    studentCommitment: string;
    teacherCommitment: string;
    parentCommitment: string;
}

// =============================================================================
// AI Optimizer & Exam Prep
// =============================================================================

export interface StudyRecommendation {
    recommendedTime: {
        hour: number;
        dayOfWeek: number;
    };
    subject: string;
    durationMinutes: number;
    reasoning: string;
    priority: 'high' | 'medium' | 'low';
}

export interface ExamCountdown {
    examId: string;
    subject: string;
    date: string;
    daysUntil: number;
    studyPlan: {
        date: string;
        topics: string[];
        estimatedMinutes: number;
        status: 'pending' | 'in-progress' | 'completed';
    }[];
    readinessScore: number; // 0-100
}

export interface Portfolio {
    id: string;
    userId: string;
    slug: string; // e.g., "tony-pham"
    themeColor: string;
    bio: string;
    contactEmail: string;
    socialLinks: {
        linkedin?: string;
        github?: string;
        website?: string;
        twitter?: string;
    };
    sections: {
        about: boolean;
        projects: boolean;
        certificates: boolean;
        skills: boolean;
        experience: boolean;
        contact: boolean;
    };
    customSections?: {
        id: string;
        title: string;
        content: string;
    }[];
    featuredProjectIds: string[];
    featuredCredentialIds: string[];
    brandColor?: string; // e.g., "#007AFF"
    security: {
        uuid: string;
        isVerified: boolean;
        verifyUrl: string;
    };
    isPublic: boolean;
    views: number;
    lastUpdated: string;
    publishedAt?: string;
}

export interface PortfolioPreview {
    id: string;
    title: string; // The user's name or portfolio title
    thumbnailUrl?: string;
    summary: string;
    tags: string[];
    author: {
        name: string;
        avatar?: string;
    };
}

// =============================================================================
// Planner & Tasks
// =============================================================================

export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface StudyTask {
    id: string;
    userId: string;
    title: string;
    description?: string;
    subject?: string;
    dueDate: string; // Date string
    dueTime?: string; // Time string HH:mm
    durationMinutes: number;
    status: TaskStatus;
    priority: TaskPriority; // Derived from due date or set manually
    relatedTo?: {
        type: 'Assignment' | 'Lesson' | 'Goal';
        id: string;
    };
    isRecurring: boolean;
    recurrencePattern?: string; // "weekly", "daily"
    completedAt?: string;
}

export interface StudyGoal {
    id: string;
    userId: string;
    title: string;
    description?: string;
    category: 'academic' | 'skill' | 'habit';
    deadline: string;
    metrics: {
        target: number;
        current: number;
        unit: string; // "exercises", "hours", "words"
    };
    status: 'active' | 'completed' | 'abandoned';
    tasks: string[]; // Task IDs linked to this goal
    createdAt: string;
}
