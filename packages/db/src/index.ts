/**
 * @learnwell/db - Database client & types
 *
 * Usage in apps:
 *   import { prisma } from "@learnwell/db";
 *   import type { User, Course } from "@learnwell/db";
 */

export { PrismaClient } from "@prisma/client";
export type {
	User,
	StudentProfile,
	TeacherProfile,
	ParentProfile,
	Class,
	Course,
	Lesson,
	Assignment,
	Submission,
	Problem,
	Contest,
	CodeSubmission,
	Achievement,
	UserAchievement,
	ShopItem,
	UserInventory,
	Team,
	TeamMember,
	Project,
	ProjectTemplate,
	ForumPost,
	ForumComment,
	BlogPost,
	Notification,
} from "@prisma/client";
