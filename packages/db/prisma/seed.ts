/**
 * LearnWell Database Seed Script
 *
 * Usage: pnpm --filter @learnwell/db seed
 *
 * This script populates the database with initial development data.
 * The data here mirrors the mock data in apps/web/src/mocks/.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding LearnWell database...");

	// ─── Users ──────────────────────────────────────────────────────────────────
	const admin = await prisma.user.upsert({
		where: { email: "admin@learnwell.edu.vn" },
		update: {},
		create: {
			email: "admin@learnwell.edu.vn",
			fullName: "Quản trị viên",
			role: "admin",
			locale: "vi",
		},
	});

	const teacher = await prisma.user.upsert({
		where: { email: "teacher@learnwell.edu.vn" },
		update: {},
		create: {
			email: "teacher@learnwell.edu.vn",
			fullName: "Nguyễn Văn A",
			role: "teacher",
			locale: "vi",
		},
	});

	const student = await prisma.user.upsert({
		where: { email: "student@learnwell.edu.vn" },
		update: {},
		create: {
			email: "student@learnwell.edu.vn",
			fullName: "Học sinh (Demo)",
			role: "student",
			locale: "vi",
		},
	});

	const parent = await prisma.user.upsert({
		where: { email: "parent@learnwell.edu.vn" },
		update: {},
		create: {
			email: "parent@learnwell.edu.vn",
			fullName: "Phụ huynh (Demo)",
			role: "parent",
			locale: "vi",
		},
	});

	console.log("  ✅ Users seeded:", {
		admin: admin.id,
		teacher: teacher.id,
		student: student.id,
		parent: parent.id,
	});

	// ─── Teacher Profile ────────────────────────────────────────────────────────
	const teacherProfile = await prisma.teacherProfile.upsert({
		where: { userId: teacher.id },
		update: {},
		create: {
			userId: teacher.id,
			subjects: ["Tin học", "Lập trình"],
			department: "Khoa Công nghệ",
			employeeId: "GV001",
		},
	});

	// ─── Class ──────────────────────────────────────────────────────────────────
	const class10A = await prisma.class.upsert({
		where: { id: "class-10a" },
		update: {},
		create: {
			id: "class-10a",
			name: "10A1 - Tin học",
			gradeLevel: 10,
			academicYear: "2025-2026",
			semester: 2,
			teacherId: teacherProfile.id,
			studentCount: 35,
		},
	});

	// ─── Student Profile ────────────────────────────────────────────────────────
	await prisma.studentProfile.upsert({
		where: { userId: student.id },
		update: {},
		create: {
			userId: student.id,
			classId: class10A.id,
			gradeLevel: 10,
			parentId: parent.id,
			xp: 2450,
			level: 12,
			learnCoins: 580,
			gems: 15,
			streakDays: 7,
			gpa: 8.2,
		},
	});

	// ─── Sample Achievements ────────────────────────────────────────────────────
	const achievements = [
		{
			name: "First Steps",
			description: "Hoàn thành bài tập đầu tiên",
			category: "learning" as const,
			iconUrl: "/icons/first-steps.png",
			rarity: "common" as const,
			xpReward: 50,
			coinReward: 10,
			criteria: { type: "submission_count", value: 1 },
		},
		{
			name: "Code Warrior",
			description: "Giải quyết 50 bài tập lập trình",
			category: "coding" as const,
			iconUrl: "/icons/code-warrior.png",
			rarity: "rare" as const,
			xpReward: 200,
			coinReward: 50,
			criteria: { type: "problems_solved", value: 50 },
		},
		{
			name: "Streak Master",
			description: "Duy trì streak 30 ngày liên tiếp",
			category: "streak" as const,
			iconUrl: "/icons/streak-master.png",
			rarity: "epic" as const,
			xpReward: 500,
			coinReward: 100,
			gemReward: 5,
			criteria: { type: "streak_days", value: 30 },
		},
	];

	for (const achievement of achievements) {
		await prisma.achievement.upsert({
			where: { id: achievement.name.toLowerCase().replace(/\s+/g, "-") },
			update: {},
			create: {
				id: achievement.name.toLowerCase().replace(/\s+/g, "-"),
				...achievement,
			},
		});
	}

	console.log("  ✅ Achievements seeded:", achievements.length);

	// ─── Sample Project Templates ───────────────────────────────────────────────
	const templates = [
		{
			title: "Hello World",
			description: "Bắt đầu với chương trình đầu tiên",
			language: "python" as const,
			starterCode: 'print("Hello, World!")',
			difficulty: "beginner",
			tags: ["intro", "python"],
		},
		{
			title: "Web Calculator",
			description: "Xây dựng máy tính đơn giản bằng HTML/CSS/JS",
			language: "javascript" as const,
			starterCode:
				'// TODO: Build a calculator\nconsole.log("Calculator");',
			difficulty: "intermediate",
			tags: ["web", "javascript", "html"],
		},
	];

	for (const template of templates) {
		await prisma.projectTemplate.create({ data: template });
	}

	console.log("  ✅ Project templates seeded:", templates.length);
	console.log("\n🎉 Seeding complete!");
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
