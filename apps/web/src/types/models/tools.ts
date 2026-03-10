/**
 * Interactive Learning Tools Domain Models
 * Flashcards, Notes, Mindmaps, Whiteboard
 */

// =============================================================================
// Flashcards
// =============================================================================

export interface Flashcard {
    id: string;
    deckId: string;
    front: string; // Content/Question
    back: string; // Answer/Definition
    hint?: string;
    imageUrl?: string;
    audioUrl?: string;
    masteryLevel: 'new' | 'learning' | 'review' | 'mastered';
    nextReviewDue?: string; // Spaced repetition
}

export interface FlashcardDeck {
    id: string;
    title: string;
    description?: string;
    subject: string; // e.g., "Biology", "English Vocab"
    authorId: string;
    isPublic: boolean;
    cardCount: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

// =============================================================================
// Notes & Annotations
// =============================================================================

export interface UserNote {
    id: string;
    userId: string;
    title: string;
    content: string; // Rich text / Markdown
    relatedTo?: {
        type: 'Lesson' | 'Video' | 'Course';
        id: string;
    };
    tags: string[];
    isPinned: boolean;
    color?: string; // Sticky note color
    createdAt: string;
    updatedAt: string;
}

// =============================================================================
// Mind Maps
// =============================================================================

export interface MindMapNode {
    id: string;
    label: string;
    description?: string;
    x: number;
    y: number;
    level: number; // depth from center
    color?: string;
    type: 'root' | 'main' | 'sub';
}

export interface MindMapEdge {
    id: string;
    source: string; // from node ID
    target: string; // to node ID
    label?: string;
}

export interface MindMap {
    id: string;
    userId: string;
    topic: string; // or title
    centerNode?: {
        label: string;
        description: string;
    };
    nodes: MindMapNode[];
    edges: MindMapEdge[];
    createdAt: string;
    updatedAt: string;
}
