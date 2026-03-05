/**
 * Administrative Domain Models
 * System health, enrollment, timetable, configuration
 */

import { UserRole } from './user';

// =============================================================================
// System Health & Monitoring
// =============================================================================

export interface SystemMetrics {
    cpuUsagePercent: number;
    memoryUsagePercent: number;
    databaseLatencyMs: number;
    uptimeSeconds: number;
    activeUserSessions: {
        student: number;
        teacher: number;
        admin: number;
        parent: number;
        total: number;
    };
    lastUpdated: string;
}

export interface SystemError {
    id: string;
    type: string; // e.g., "DatabaseConnectionError"
    route: string; // e.g., "/api/v1/users"
    frequency: number;
    lastSeen: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    details?: string;
}

export interface HealthStatus {
    status: 'optimal' | 'normal' | 'degraded' | 'maintenance';
    message?: string;
    metrics: SystemMetrics;
    activeAlerts: number;
}

// =============================================================================
// Enrollment Management
// =============================================================================

export type EnrollmentStatus = 'new' | 'interview' | 'pending' | 'enrolled' | 'rejected' | 'waitlist';

export interface EnrollmentApplication {
    id: string;
    studentName: string;
    studentEmail: string;
    parentName?: string;
    parentEmail?: string;
    parentPhone?: string;
    gradeLevel: number;
    applyDate: string;
    interviewDate?: string;
    status: EnrollmentStatus;
    notes?: string;
    assignedCounselorId?: string;
    documents?: {
        name: string;
        url: string;
        type: string;
    }[];
}

export interface EnrollmentFunnelStats {
    totalApplications: number;
    reach: number;
    registered: number;
    interviewed: number;
    enrolled: number;
    conversionRate: {
        registration: number; // %
        interview: number;
        enrollment: number;
    }
}

// =============================================================================
// Timetable & Scheduling (Admin View)
// =============================================================================

export interface AdminTimetableSlot {
    id: string;
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    startTime: string; // HH:mm
    endTime: string;
    classId: string;
    className: string;
    teacherId: string;
    teacherName: string;
    roomId: string;
    roomName: string;
    subject: string;
}

export interface ScheduleConflict {
    id: string;
    type: 'room_double_book' | 'teacher_double_book' | 'capacity_exceeded';
    description: string;
    entityIds: string[]; // IDs of conflicting slots/resources
    severity: 'warning' | 'error';
    detectedAt: string;
}

// =============================================================================
// System Configuration
// =============================================================================

export interface SystemFeatureToggle {
    id: string;
    name: string;
    isEnabled: boolean;
    allowedRoles: UserRole[];
}

export interface SystemConfig {
    version: string;
    schoolName: string;
    academicYear: string;
    features: SystemFeatureToggle[];
    theme?: {
        primaryColor: string;
        logoUrl: string;
    };
    maintenanceMode: {
        enabled: boolean;
        message?: string;
        scheduledEnd?: string;
    };
    lastModified: string;
    modifiedBy: string;
}

// =============================================================================
// Learning Outcomes & Curriculum Analytics
// =============================================================================

export interface LearningOutcome {
    id: string;
    code: string; // e.g., "MATH.6.NS.1"
    description: string;
    subject: string;
    grade: string;
    standard: string;
}

export interface CompetencyData {
    loId: string;
    overallMastery: number; // %
    grade: string;
    masteryTrend: {
        month: string;
        mastery: number;
    }[];
    teacherBreakdown: {
        teacherId: string;
        studentCount: number;
        averageMastery: number;
    }[];
}

export interface CurriculumGap {
    loId: string;
    severity: 'low' | 'medium' | 'high';
    masteryRate: number;
    affectedStudents: number;
    recommendation: string;
}

// =============================================================================
// Longitudinal Cohort Tracking
// =============================================================================

export interface StudentCohort {
    id: string; // "Class of 2026"
    enrollmentYear: number;
    graduationYear: number;
    totalStudents: number;
    status: 'active' | 'graduated' | 'transferred' | 'dropped';
}

export interface CohortPerformance {
    cohortId: string;
    yearlyMetrics: {
        year: number;
        avgGPA: number;
        attendanceRate: number;
        dropoutRate: number;
    }[];
    graduationPrediction: number; // %
    atRiskCount: number;
}

// =============================================================================
// Standards Compliance
// =============================================================================

export interface CoverageGap {
    standardCode: string;
    subject: string;
    grade: string;
    coverageRate: number; // %
    missingFromUnits: string[];
}

export interface ComplianceReport {
    id: string;
    schoolYear: string;
    totalStandards: number;
    coveredStandards: number;
    coverageRate: number;
    generatedAt: string;
    generatedBy: string;
}

// =============================================================================
// Professional Development (PD)
// =============================================================================

export interface PDCourse {
    id: string;
    title: string;
    category: 'pedagogy' | 'technology' | 'subject_matter' | 'dei';
    modules: {
        id: string;
        title: string;
        type: 'video' | 'reading' | 'quiz' | 'activity';
        durationMinutes: number;
    }[];
    estimatedHours: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    enrolledCount: number;
    rating: number;
}

export interface TeacherPDProgress {
    teacherId: string;
    courseId: string;
    progressPercent: number;
    enrolledAt: string;
    completedAt?: string;
    certificateUrl?: string;
}
