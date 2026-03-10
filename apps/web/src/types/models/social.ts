/**
 * Social Learning & Community Domain Models
 * Forums, Groups, Comments, Friends
 */

// =============================================================================
// Q&A Forum
// =============================================================================

export type ForumCategory = 'General' | 'Algorithms' | 'Web Dev' | 'AI/ML' | 'Career' | 'Help';

export interface ForumPost {
    id: string;
    userId: string;
    author: {
        name: string;
        avatar?: string;
        role: string;
        level?: number;
    };
    title: string;
    content: string; // Markdown
    category: ForumCategory;
    tags: string[];
    views: number;
    likes: number;
    commentsCount: number;
    isSolved: boolean; // Accepted answer exists
    isFeatured?: boolean; // Pinned or trending
    createdAt: string;
    updatedAt: string;
}

export interface ForumComment {
    id: string;
    postId: string;
    userId: string;
    author: {
        name: string;
        avatar?: string;
        role: string;
    };
    content: string;
    likes: number;
    isAccepted?: boolean; // Stack Overflow style
    parentId?: string; // Threaded reply
    createdAt: string;
}

// =============================================================================
// Social Learning
// =============================================================================

export interface StudyGroup {
    id: string;
    name: string;
    description: string;
    subject: string; // e.g., "Python Basics"
    membersCount: number;
    isPrivate: boolean;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GroupMember {
    groupId: string;
    userId: string;
    role: 'admin' | 'member';
    joinedAt: string;
}

export interface Friendship {
    id: string;
    userId: string;
    friendId: string;
    status: 'pending' | 'accepted' | 'blocked';
    createdAt: string;
}

export interface SocialActivity {
    id: string;
    userId: string;
    type: 'post_created' | 'problem_solved' | 'level_up' | 'badge_earned' | 'streak_milestone';
    content: string; // "Just reached Level 10!"
    targetId?: string; // Link to problem/post
    createdAt: string;
    likes: number;
}

// =============================================================================
// Study Buddies & Tutoring
// =============================================================================

export interface StudyMatch {
    id: string;
    student1Id: string;
    student2Id: string;
    matchScore: number; // 0-100
    sharedSubjects: string[];
    sharedGoals: string[];
    status: 'pending' | 'accepted' | 'active' | 'ended';
    createdAt: string;
}

export interface StudyPairSession {
    id: string;
    participants: string[];
    subject: string;
    scheduledTime: string;
    durationMinutes: number;
    meetingLink?: string;
    agenda: string;
    isCompleted: boolean;
}

export interface TutorProfile {
    userId: string;
    subjects: {
        subject: string;
        proficiency: 'competent' | 'expert' | 'master';
        hoursTutored: number;
        rating: number;
    }[];
    ratePerHour: number; // LearnCoins
    bio: string;
    totalEarnings: number;
}

export interface TutoringSession {
    id: string;
    tutorId: string;
    studentId: string;
    subject: string;
    scheduledTime: string;
    durationMinutes: number;
    status: 'scheduled' | 'completed' | 'cancelled';
    payment: number;
}

// =============================================================================
// Collaborative Content
// =============================================================================

export interface SharedNote {
    id: string;
    ownerId: string;
    title: string;
    subject: string;
    content: string; // Markdown
    tags: string[];
    visibility: 'private' | 'class' | 'public';
    collaborators: {
        userId: string;
        permission: 'view' | 'edit';
    }[];
    views: number;
    upvotes: number;
}
