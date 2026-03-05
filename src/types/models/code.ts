/**
 * Coding & Technical Domain Models
 * Problems, Solutions, Code Review, Tech Blog, Playground
 */

import { User } from './user';

// =============================================================================
// Algorithms & Problems
// =============================================================================

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type ProblemCategory = 'Array' | 'String' | 'DP' | 'Graph' | 'Tree' | 'Hash Map' | 'Two Pointers' | 'Other';

export interface CodingProblem {
    id: string;
    title: string;
    slug: string;
    difficulty: DifficultyLevel;
    category: ProblemCategory;
    tags: string[];
    description: string;
    examples: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string[];
    starterCode: Record<string, string>; // language -> code
    testCases?: {
        input: string;
        expectedOutput: string;
        isHidden?: boolean;
    }[];
    acceptanceRate: number;
    likes: number;
    dislikes: number;
    isPremium?: boolean;
}

// =============================================================================
// Code Solutions & Gallery
// =============================================================================

export interface CodeSolution {
    id: string;
    problemId: string;
    problemTitle: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        level: number;
        reputation: number;
    };
    language: string;
    code: string;
    approach: string; // e.g., "Two Pointers", "Brute Force"
    description?: string;
    complexity?: {
        time: string; // O(n)
        space: string; // O(1)
    };
    likes: number;
    forks: number;
    views: number;
    commentsCount: number;
    tags: string[];
    isWeeklyTop?: boolean;
    createdAt: string;
    updatedAt: string;
}

// =============================================================================
// Peer Review Marketplace
// =============================================================================

export type ReviewStatus = 'Open' | 'In Progress' | 'Completed';

export interface ReviewRequest {
    id: string;
    title: string;
    problemTitle: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        level: number;
        reputation: number;
    };
    reviewer?: {
        id: string;
        name: string;
    };
    language: string;
    difficulty: DifficultyLevel;
    codeSnippet: string;
    description: string; // Specific questions or context
    status: ReviewStatus;
    reward: number; // LearnCoins
    reviewCount: number;
    visualFeedback?: {
        correctness: number; // 0-100
        efficiency: number;
        style: number;
    };
    createdAt: string;
    deadline?: string;
}

// =============================================================================
// Tech Blog
// =============================================================================

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string; // Markdown
    coverImage?: string;
    author: {
        id: string;
        name: string;
        role: string; // Teacher, Expert, Student
        avatar?: string;
    };
    tags: string[]; // e.g., "React", "System Design"
    readTimeMinutes: number;
    likes: number;
    views: number;
    commentsCount: number;
    publishedAt: string;
    isFeatured?: boolean;
}

// =============================================================================
// Code Playground
// =============================================================================

export interface CodeSnippet {
    id: string;
    userId: string;
    title: string;
    description?: string;
    language: string;
    code: string;
    isPublic: boolean;
    tags?: string[];
    forkedFromId?: string;
    createdAt: string;
    updatedAt: string;
}
