import { getSupabaseClient } from '@/config';
import type { 
  Course, 
  CourseWithTeacher, 
  Lesson, 
  Assignment, 
  AssignmentWithCourse 
} from '@/types/models';
import type { ICourseService } from './types';

export class SupabaseCourseService implements ICourseService {
  async getCourses(filters?: { teacherId?: string; subject?: string }): Promise<CourseWithTeacher[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('courses')
      .select(`
        *,
        teacher:users!teacher_id(id, full_name, avatar_url)
      `)
      .eq('status', 'published');

    if (filters?.teacherId) {
      query = query.eq('teacher_id', filters.teacherId);
    }
    if (filters?.subject) {
      query = query.eq('subject', filters.subject);
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data as any[]).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      subject: row.subject,
      gradeLevel: row.grade_level,
      teacherId: row.teacher_id,
      thumbnailUrl: row.thumbnail_url ?? undefined,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      teacher: {
        id: row.teacher.id,
        fullName: row.teacher.full_name,
        avatarUrl: row.teacher.avatar_url ?? undefined,
      },
    }));
  }

  async getCourse(courseId: string): Promise<CourseWithTeacher | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        teacher:users!teacher_id(id, full_name, avatar_url)
      `)
      .eq('id', courseId)
      .single();

    if (error) throw error;

    const row = data as any;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      subject: row.subject,
      gradeLevel: row.grade_level,
      teacherId: row.teacher_id,
      thumbnailUrl: row.thumbnail_url ?? undefined,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      teacher: {
        id: row.teacher.id,
        fullName: row.teacher.full_name,
        avatarUrl: row.teacher.avatar_url ?? undefined,
      },
    };
  }

  async getLessons(courseId: string): Promise<Lesson[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('order', { ascending: true });

    if (error) throw error;

    return (data as any[]).map((row) => ({
      id: row.id,
      courseId: row.course_id,
      title: row.title,
      description: row.description ?? undefined,
      type: row.type,
      order: row.order,
      durationMinutes: row.duration_minutes ?? undefined,
      contentUrl: row.content_url ?? undefined,
      content: row.content ?? undefined,
      isRequired: row.is_required,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getAssignments(filters?: { courseId?: string; studentId?: string }): Promise<AssignmentWithCourse[]> {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    let query = supabase
      .from('assignments')
      .select(`
        *,
        course:courses(id, title, subject)
      `);

    if (filters?.courseId) {
      query = query.eq('course_id', filters.courseId);
    }

    const { data, error } = await query.order('due_date', { ascending: true });
    if (error) throw error;

    return (data as any[]).map((row) => ({
      id: row.id,
      courseId: row.course_id,
      lessonId: row.lesson_id ?? undefined,
      title: row.title,
      description: row.description,
      type: row.type,
      dueDate: row.due_date,
      maxScore: row.max_score,
      weight: row.weight,
      attachments: row.attachments ?? undefined,
      rubricId: row.rubric_id ?? undefined,
      allowLateSubmission: row.allow_late_submission,
      latePenaltyPercent: row.late_penalty_percent ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      course: {
        id: row.course.id,
        title: row.course.title,
        subject: row.course.subject,
      },
    }));
  }

  async getUpcomingAssignments(): Promise<AssignmentWithCourse[]> {
    // Basic implementation filtering by date in memory for simplicity
    // Could be optimized to a database query
    const assignments = await this.getAssignments();
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return assignments.filter((a) => {
      const due = new Date(a.dueDate);
      return due >= now && due <= nextWeek;
    });
  }

  async createAssignment(assignment: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Assignment> {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase not configured');

    const { data, error } = await supabase
      .from('assignments')
      .insert({
        course_id: assignment.courseId,
        lesson_id: assignment.lessonId,
        title: assignment.title,
        description: assignment.description,
        type: assignment.type,
        due_date: assignment.dueDate,
        max_score: assignment.maxScore,
        weight: assignment.weight,
        attachments: assignment.attachments,
        rubric_id: assignment.rubricId,
        allow_late_submission: assignment.allowLateSubmission,
        late_penalty_percent: assignment.latePenaltyPercent,
      })
      .select()
      .single();

    if (error) throw error;
    return data as any as Assignment;
  }
}
