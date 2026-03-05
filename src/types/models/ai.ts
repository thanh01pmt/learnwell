/**
 * AI & Personalization Domain Models
 * Recommendations, Learning Paths, Gaps, Tutor
 */

// =============================================================================
// AI Insights & Recommendations
// =============================================================================

export type RecommendationType = 'Knowledge Gap' | 'New Skill' | 'Maintain Momentum' | 'Challenge';
export type ResourceType = 'Problem' | 'Lesson' | 'Blog' | 'Video' | 'Project';

export interface AIRecommendation {
    id: string;
    userId: string;
    title: string;
    type: RecommendationType;
    reason: string;
    resourceType: ResourceType;
    resourceId: string;
    matchScore: number; // 0-100%
    priority: 'High' | 'Medium' | 'Low';
    estimatedTimeMinutes?: number;
    createdAt: string;
}

export interface SkillGap {
    userId: string;
    topic: string; // e.g., "Recursion", "DP"
    masteryLevel: number; // 0-100%
    lastPracticed?: string;
    improvementTip?: string;
    priority: 'Critical' | 'Improving' | 'Good';
}

export interface AITip {
    id: string;
    message: string;
    context: 'General' | 'Timing' | 'Focus' | 'Rest';
    trigger?: string; // e.g., "Late night coding"
    createdAt: string;
}

// =============================================================================
// Learning Paths (AI Generated)
// =============================================================================

export interface CareerPath {
    id: string;
    title: string; // "Senior Tech Lead"
    steps: {
        id: string;
        title: string; // "Junior Developer"
        status: 'Completed' | 'In Progress' | 'Locked';
        skills: string[];
    }[];
    currentStepIndex: number;
    estimatedCompletion?: string;
}

export interface RoadmapConfig {
    currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    primaryGoal: 'Web Dev' | 'Data Science' | 'Mobile App' | 'AI/ML' | 'Game Dev';
    weeklyHours: number;
    preferredLearningStyle?: 'Visual' | 'Hands-on' | 'Reading';
}

export interface PersonalizedRoadmap {
    id: string;
    userId: string;
    config: RoadmapConfig;
    totalWeeks: number;
    currentWeek: number;
    phases: {
        name: string;
        weekStart: number;
        weekEnd: number;
        description: string;
        status: 'Completed' | 'In Progress' | 'Upcoming';
    }[];
    weeklyPlan: {
        week: number;
        focusTopic: string;
        modules: {
            id: string;
            type: 'Lesson' | 'Project' | 'Practice';
            title: string;
            estimatedHours: number;
            isCompleted: boolean;
        }[];
    }[];
    lastUpdated: string;
}

// =============================================================================
// Learning Autonomy & Habits
// =============================================================================

export interface SmartGoal {
    id: string;
    userId: string;
    title: string; // "Solve 5 Hard DP problems"
    metric: 'problems_solved' | 'lessons_completed' | 'study_hours' | 'streak_days';
    targetValue: number;
    currentValue: number;
    deadline: string;
    isAchieved: boolean;
    createdAt: string;
}

export interface StudyAutonomyProfile {
    userId: string;
    focusTrends: {
        timeOfDay: string; // "08:00", "20:00"
        focusScore: number; // 0-100 efficiency
    }[];
    bestStudyWindow: {
        start: string; // "19:00"
        end: string;   // "22:00"
        efficiencyMultiplier: number; // e.g., 1.25x
    };
    activeGoals: SmartGoal[];
    weeklyReadinessScore: number; // 0-100 indicating exam preparedness
}

// =============================================================================
// AI Tutor Interactions
// =============================================================================

export interface TutorSession {
    id: string;
    userId: string;
    contextType: 'Problem' | 'Lesson' | 'Code';
    contextId?: string;
    messages: {
        role: 'user' | 'assistant';
        content: string;
        timestamp: string;
    }[];
    startedAt: string;
    endedAt?: string;
}

// =============================================================================
// AI Study Guides
// =============================================================================

export interface KnowledgeNode {
    title: string;
    content: string;
    keywords?: string[];
}

export interface StudyGuide {
    id: string;
    userId: string;
    title: string;
    subject: string;
    sourceLessonIds: string[];
    detailLevel: 'Summary' | 'Standard' | 'Advanced';
    coreConcepts: KnowledgeNode[];
    keyTakeaways: string[];
    practiceQuestions: {
        question: string;
        answer: string;
        explanation?: string;
    }[];
    aiSuggestions?: string[];
    createdAt: string;
}
