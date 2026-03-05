/**
 * Teacher & Academic Management Domain Models
 * IEP, Skill Grouping, Dashboard Widgets, Intervention Alerts
 */

// =============================================================================
// Individualized Education Program (IEP)
// =============================================================================

export interface IEPPlan {
    id: string;
    studentId: string;
    studentName: string;
    teacherId: string;
    diagnosis: string;
    startDate: string;
    lastReviewDate: string;
    nextReviewDate: string;
    goals: {
        id: string;
        title: string;
        targetDate: string;
        status: 'Not Started' | 'In Progress' | 'Achieved';
    }[];
    accommodations: string[];
    meetings: {
        date: string;
        notes: string;
        attendees: string[];
    }[];
    interventionsThisMonth: number;
    skillGrowthPercent: number;
}

// =============================================================================
// Skill Grouping & Differentiated Instruction
// =============================================================================

export type GroupCategory = 'Remedial' | 'Core' | 'Enrichment';

export interface SkillGroup {
    id: string;
    classId: string;
    name: string;
    category: GroupCategory;
    students: {
        id: string;
        name: string;
        avatar?: string;
        progress: number;
    }[];
    strategyNote: string;
    recommendedMaterials: string[]; // IDs of materials
    weeklyGoal: string;
    targetProgress: number; // 0-100
}

// =============================================================================
// Early Warning & Intervention
// =============================================================================

export type AlertType = 'Absence' | 'GradeDrop' | 'LowActivity' | 'Behavior';

export interface RiskIndicator {
    type: 'engagement' | 'performance' | 'attendance' | 'behavior';
    severity: 'low' | 'medium' | 'high' | 'critical';
    metric: string;
    threshold: number;
    currentValue: number;
    trend: 'improving' | 'stable' | 'declining';
}

export interface AtRiskStudent {
    studentId: string;
    name: string;
    classId: string;
    overallRiskScore: number; // 0-100
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    indicators: RiskIndicator[];
    patterns: {
        type: string;
        description: string;
        severity: string;
    }[];
}

export interface DetailedIntervention {
    id: string;
    studentId: string;
    teacherId: string;
    type: 'one_on_one' | 'parent_contact' | 'remedial_content' | 'peer_mentoring' | 'counseling_referral';
    status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
    notes: string;
    effectiveness?: 'very_effective' | 'somewhat_effective' | 'not_effective';
    assignedContentIds?: string[];
    scheduledAt?: string;
    executedAt?: string;
}

export interface InterventionAlert {
    id: string;
    studentId: string;
    studentName: string;
    classId: string;
    type: AlertType;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    status: 'Open' | 'Resolved' | 'Ignored';
    triggeredAt: string;
    lastActivityAt?: string;
    interventions: DetailedIntervention[];
}

// =============================================================================
// Dashboard Customization
// =============================================================================

export interface DashboardWidget {
    id: string;
    type: 'Stats' | 'Chart' | 'Todo' | 'Calendar' | 'Chat' | 'Alerts';
    title: string;
    config?: Record<string, any>;
    position: { x: number; y: number; w: number; h: number };
}

export interface TeacherDashboardConfig {
    teacherId: string;
    layoutTemplate: 'Homeroom' | 'Subject' | 'Custom';
    widgets: DashboardWidget[];
}
