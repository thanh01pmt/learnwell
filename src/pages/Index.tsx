import { useRole } from "@/contexts/RoleContext";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";
import ParentDashboard from "./parent/ParentDashboard";
import AdminDashboard from "./admin/AdminDashboard";

export default function Index() {
  const { role } = useRole();

  // Role-based redirection logic
  switch (role) {
    case "teacher":
      return <TeacherDashboard />;
    case "student":
      return <StudentDashboard />;
    case "parent":
      return <ParentDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "instructional_designer":
      return <TeacherDashboard />; // Fallback to teacher dashboard for core stats
    case "assessor":
      return <TeacherDashboard />; // Fallback to teacher dashboard for core stats
    default:
      return <StudentDashboard />;
  }
}
