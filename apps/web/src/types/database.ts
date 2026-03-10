/**
 * Supabase Database Types
 * Auto-generated types from Supabase schema
 * 
 * To regenerate:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // =======================================================================
      // Users & Profiles
      // =======================================================================
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'student' | 'teacher' | 'parent' | 'admin'
          locale: 'en' | 'vi'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          avatar_url?: string | null
          role: 'student' | 'teacher' | 'parent' | 'admin'
          locale?: 'en' | 'vi'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          locale?: 'en' | 'vi'
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          id: string
          user_id: string
          class_id: string
          grade_level: number
          parent_id: string | null
          enrollment_date: string
          xp: number
          level: number
          learn_coins: number
          gems: number
          streak_days: number
          last_active_at: string
          gpa: number | null
          rank: number | null
        }
        Insert: {
          id?: string
          user_id: string
          class_id: string
          grade_level: number
          parent_id?: string | null
          enrollment_date?: string
          xp?: number
          level?: number
          learn_coins?: number
          gems?: number
          streak_days?: number
          last_active_at?: string
          gpa?: number | null
          rank?: number | null
        }
        Update: {
          class_id?: string
          grade_level?: number
          parent_id?: string | null
          xp?: number
          level?: number
          learn_coins?: number
          gems?: number
          streak_days?: number
          last_active_at?: string
          gpa?: number | null
          rank?: number | null
        }
      }
      teacher_profiles: {
        Row: {
          id: string
          user_id: string
          subjects: string[]
          department: string | null
          employee_id: string | null
          hire_date: string
          class_ids: string[]
        }
        Insert: {
          id?: string
          user_id: string
          subjects?: string[]
          department?: string | null
          employee_id?: string | null
          hire_date?: string
          class_ids?: string[]
        }
        Update: {
          subjects?: string[]
          department?: string | null
          employee_id?: string | null
          class_ids?: string[]
        }
      }
      parent_profiles: {
        Row: {
          id: string
          user_id: string
          children_ids: string[]
          preferred_contact_method: 'email' | 'phone' | 'app'
          phone: string | null
        }
        Insert: {
          id?: string
          user_id: string
          children_ids?: string[]
          preferred_contact_method?: 'email' | 'phone' | 'app'
          phone?: string | null
        }
        Update: {
          children_ids?: string[]
          preferred_contact_method?: 'email' | 'phone' | 'app'
          phone?: string | null
        }
      }

      // =======================================================================
      // Classes
      // =======================================================================
      classes: {
        Row: {
          id: string
          name: string
          grade_level: number
          academic_year: string
          semester: number
          teacher_id: string
          student_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          grade_level: number
          academic_year: string
          semester?: number
          teacher_id: string
          student_count?: number
          created_at?: string
        }
        Update: {
          name?: string
          grade_level?: number
          academic_year?: string
          semester?: number
          teacher_id?: string
          student_count?: number
        }
      }

      // =======================================================================
      // Courses & Lessons
      // =======================================================================
      courses: {
        Row: {
          id: string
          title: string
          description: string
          subject: string
          grade_level: number
          teacher_id: string
          thumbnail_url: string | null
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          subject: string
          grade_level: number
          teacher_id: string
          thumbnail_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          subject?: string
          grade_level?: number
          thumbnail_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          type: 'video' | 'reading' | 'interactive' | 'quiz' | 'assignment'
          order: number
          duration_minutes: number | null
          content_url: string | null
          content: string | null
          is_required: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          type: 'video' | 'reading' | 'interactive' | 'quiz' | 'assignment'
          order?: number
          duration_minutes?: number | null
          content_url?: string | null
          content?: string | null
          is_required?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          type?: 'video' | 'reading' | 'interactive' | 'quiz' | 'assignment'
          order?: number
          duration_minutes?: number | null
          content_url?: string | null
          content?: string | null
          is_required?: boolean
          updated_at?: string
        }
      }

      // =======================================================================
      // Assignments & Submissions
      // =======================================================================
      assignments: {
        Row: {
          id: string
          course_id: string
          lesson_id: string | null
          title: string
          description: string
          type: 'homework' | 'project' | 'essay' | 'presentation' | 'lab'
          due_date: string
          max_score: number
          weight: number
          attachments: string[] | null
          rubric_id: string | null
          allow_late_submission: boolean
          late_penalty_percent: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          lesson_id?: string | null
          title: string
          description: string
          type: 'homework' | 'project' | 'essay' | 'presentation' | 'lab'
          due_date: string
          max_score?: number
          weight?: number
          attachments?: string[] | null
          rubric_id?: string | null
          allow_late_submission?: boolean
          late_penalty_percent?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          type?: 'homework' | 'project' | 'essay' | 'presentation' | 'lab'
          due_date?: string
          max_score?: number
          weight?: number
          attachments?: string[] | null
          rubric_id?: string | null
          allow_late_submission?: boolean
          late_penalty_percent?: number | null
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          assignment_id: string
          student_id: string
          content: string | null
          attachments: string[] | null
          status: 'draft' | 'submitted' | 'graded' | 'returned'
          submitted_at: string | null
          score: number | null
          feedback: string | null
          graded_by: string | null
          graded_at: string | null
          is_late: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assignment_id: string
          student_id: string
          content?: string | null
          attachments?: string[] | null
          status?: 'draft' | 'submitted' | 'graded' | 'returned'
          submitted_at?: string | null
          score?: number | null
          feedback?: string | null
          graded_by?: string | null
          graded_at?: string | null
          is_late?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          attachments?: string[] | null
          status?: 'draft' | 'submitted' | 'graded' | 'returned'
          submitted_at?: string | null
          score?: number | null
          feedback?: string | null
          graded_by?: string | null
          graded_at?: string | null
          is_late?: boolean
          updated_at?: string
        }
      }

      // =======================================================================
      // Contests & Problems
      // =======================================================================
      problems: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          tags: string[]
          constraints: string
          input_format: string
          output_format: string
          sample_inputs: string[]
          sample_outputs: string[]
          time_limit_ms: number
          memory_limit_mb: number
          solved_count: number
          acceptance_rate: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          difficulty: 'easy' | 'medium' | 'hard'
          tags?: string[]
          constraints: string
          input_format: string
          output_format: string
          sample_inputs?: string[]
          sample_outputs?: string[]
          time_limit_ms?: number
          memory_limit_mb?: number
          solved_count?: number
          acceptance_rate?: number
          created_at?: string
        }
        Update: {
          title?: string
          slug?: string
          description?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          tags?: string[]
          constraints?: string
          input_format?: string
          output_format?: string
          sample_inputs?: string[]
          sample_outputs?: string[]
          time_limit_ms?: number
          memory_limit_mb?: number
          solved_count?: number
          acceptance_rate?: number
        }
      }
      contests: {
        Row: {
          id: string
          title: string
          description: string
          type: 'individual' | 'team' | '1v1' | 'relay'
          status: 'upcoming' | 'ongoing' | 'finished'
          start_time: string
          end_time: string
          duration_minutes: number
          problem_ids: string[]
          rules: string
          prizes: string[] | null
          max_participants: number | null
          registered_count: number
          banner_url: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type?: 'individual' | 'team' | '1v1' | 'relay'
          status?: 'upcoming' | 'ongoing' | 'finished'
          start_time: string
          end_time: string
          duration_minutes: number
          problem_ids?: string[]
          rules?: string
          prizes?: string[] | null
          max_participants?: number | null
          registered_count?: number
          banner_url?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          title?: string
          description?: string
          type?: 'individual' | 'team' | '1v1' | 'relay'
          status?: 'upcoming' | 'ongoing' | 'finished'
          start_time?: string
          end_time?: string
          duration_minutes?: number
          problem_ids?: string[]
          rules?: string
          prizes?: string[] | null
          max_participants?: number | null
          registered_count?: number
          banner_url?: string | null
        }
      }

      // =======================================================================
      // Gamification
      // =======================================================================
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          category: 'learning' | 'coding' | 'social' | 'streak' | 'milestone' | 'special'
          icon_url: string
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          xp_reward: number
          coin_reward: number | null
          gem_reward: number | null
          criteria: Json
          is_hidden: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: 'learning' | 'coding' | 'social' | 'streak' | 'milestone' | 'special'
          icon_url: string
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          xp_reward?: number
          coin_reward?: number | null
          gem_reward?: number | null
          criteria: Json
          is_hidden?: boolean
        }
        Update: {
          name?: string
          description?: string
          category?: 'learning' | 'coding' | 'social' | 'streak' | 'milestone' | 'special'
          icon_url?: string
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          xp_reward?: number
          coin_reward?: number | null
          gem_reward?: number | null
          criteria?: Json
          is_hidden?: boolean
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
          progress: number
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
          progress?: number
        }
        Update: {
          unlocked_at?: string
          progress?: number
        }
      }

      // =======================================================================
      // Notifications
      // =======================================================================
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'grade' | 'assignment' | 'message' | 'announcement' | 'reminder' | 'achievement' | 'contest' | 'system'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          title: string
          message: string
          data: Json | null
          action_url: string | null
          is_read: boolean
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'grade' | 'assignment' | 'message' | 'announcement' | 'reminder' | 'achievement' | 'contest' | 'system'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          title: string
          message: string
          data?: Json | null
          action_url?: string | null
          is_read?: boolean
          read_at?: string | null
          created_at?: string
        }
        Update: {
          is_read?: boolean
          read_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
