import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useRole } from "@/contexts/RoleContext";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Code,
  BookOpen,
  Trophy,
  Star,
  Github,
  Linkedin,
  Globe
} from "lucide-react";

const skills = [
  { name: "JavaScript", level: 85, color: "bg-yellow-500" },
  { name: "Python", level: 72, color: "bg-blue-500" },
  { name: "React", level: 78, color: "bg-cyan-500" },
  { name: "TypeScript", level: 65, color: "bg-blue-600" },
  { name: "Node.js", level: 60, color: "bg-green-500" },
  { name: "SQL", level: 55, color: "bg-orange-500" },
];

const recentAchievements = [
  { icon: Trophy, title: "profile:mock.achievements.codeMaster.title", description: "profile:mock.achievements.codeMaster.desc", date: "2024-01-15" },
  { icon: Star, title: "profile:mock.achievements.perfectScore.title", description: "profile:mock.achievements.perfectScore.desc", date: "2024-01-10" },
  { icon: Award, title: "profile:mock.achievements.earlyBird.title", description: "profile:mock.achievements.earlyBird.desc", date: "2024-01-08" },
];

const Profile = () => {
  const { t } = useTranslation(["common", "profile", "dashboard", "classroom"]);
  const { role } = useRole();

  const getUserData = () => {
    switch (role) {
      case "student":
        return {
          name: "classroom:mocks.teachers.teacherA",
          email: "nguyenvana@student.edu.vn",
          phone: "0901234567",
          location: "profile:mock.student.location",
          joinDate: "profile:mock.student.joinDate",
          bio: "profile:mock.student.bio",
          role: "profile:mock.student.role",
          stats: { courses: 5, projects: 12, badges: 8, points: 2450 }
        };
      case "teacher":
        return {
          name: "classroom:mocks.teachers.teacherB",
          email: "nguyenthib@teacher.edu.vn",
          phone: "0912345678",
          location: "profile:mock.teacher.location",
          joinDate: "profile:mock.teacher.joinDate",
          bio: "profile:mock.teacher.bio",
          role: "profile:mock.teacher.role",
          stats: { courses: 8, students: 245, classes: 6, rating: 4.8 }
        };
      case "admin":
        return {
          name: "dashboard:actions.reports",
          email: "admin@system.edu.vn",
          phone: "0923456789",
          location: "profile:mock.admin.location",
          joinDate: "profile:mock.admin.joinDate",
          bio: "profile:mock.admin.bio",
          role: "profile:mock.admin.role",
          stats: { users: 1250, schools: 15, uptime: 99.9, tickets: 23 }
        };
    }
  };

  const userData = getUserData();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("profile:sections.personalInfo")}</h1>
            <p className="text-muted-foreground">{t("profile:subtitle", "Manage your account information and settings")}</p>
          </div>
          <Button>
            {t("common:actions.save")}
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg bg-white/80 backdrop-blur-sm">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {t(userData?.name as any).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 pt-4 md:pt-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{t(userData?.name as any)}</h2>
                    <Badge variant="secondary" className="mt-1">
                      {t(userData?.role as any)}
                    </Badge>
                    <p className="text-muted-foreground mt-2 max-w-lg">{t(userData?.bio as any)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {role === "student" && (
            <>
              <Card className="text-center p-4">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.courses}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.courses")}</p>
              </Card>
              <Card className="text-center p-4">
                <Code className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.projects}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.projects")}</p>
              </Card>
              <Card className="text-center p-4">
                <Award className="h-8 w-8 mx-auto text-success mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.badges}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.badges")}</p>
              </Card>
              <Card className="text-center p-4">
                <Trophy className="h-8 w-8 mx-auto text-warning mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.points}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.points")}</p>
              </Card>
            </>
          )}
          {role === "teacher" && (
            <>
              <Card className="text-center p-4">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.courses}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.courses")}</p>
              </Card>
              <Card className="text-center p-4">
                <Code className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.students}</p>
                <p className="text-sm text-muted-foreground">{t("common:stats.students")}</p>
              </Card>
              <Card className="text-center p-4">
                <Award className="h-8 w-8 mx-auto text-success mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.classes}</p>
                <p className="text-sm text-muted-foreground">{t("profile:labels.class")}</p>
              </Card>
              <Card className="text-center p-4">
                <Star className="h-8 w-8 mx-auto text-warning mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.rating}</p>
                <p className="text-sm text-muted-foreground">{t("profile:labels.rating")}</p>
              </Card>
            </>
          )}
          {role === "admin" && (
            <>
              <Card className="text-center p-4">
                <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.users}</p>
                <p className="text-sm text-muted-foreground">{t("profile:labels.userType")}</p>
              </Card>
              <Card className="text-center p-4">
                <Code className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.schools}</p>
                <p className="text-sm text-muted-foreground">{t("profile:labels.school")}</p>
              </Card>
              <Card className="text-center p-4">
                <Award className="h-8 w-8 mx-auto text-success mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.uptime}%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </Card>
              <Card className="text-center p-4">
                <Trophy className="h-8 w-8 mx-auto text-warning mb-2" />
                <p className="text-2xl font-bold">{userData?.stats.tickets}</p>
                <p className="text-sm text-muted-foreground">Tickets</p>
              </Card>
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">{t("profile:tabs.info")}</TabsTrigger>
            <TabsTrigger value="skills">{t("profile:tabs.skills")}</TabsTrigger>
            <TabsTrigger value="achievements">{t("profile:tabs.achievements")}</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile:sections.personalInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("profile:fields.fullName")}</Label>
                    <Input id="name" defaultValue="Tony Pham" className="glass-card" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">{t("profile:fields.bio")}</Label>
                    <Textarea id="bio" defaultValue={t(userData?.bio as any)} rows={3} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("profile:sections.contactInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("profile:fields.email")}</p>
                      <p className="text-sm text-muted-foreground">{userData?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("profile:fields.phone")}</p>
                      <p className="text-sm text-muted-foreground">{userData?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("profile:fields.address")}</p>
                      <p className="text-sm text-muted-foreground">{t(userData?.location as any)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("profile:fields.joinDate")}</p>
                      <p className="text-sm text-muted-foreground">{t(userData?.joinDate as any)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile:sections.codingSkills")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile:sections.recentAchievements")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{t(achievement.title as any)}</p>
                        <p className="text-sm text-muted-foreground">{t(achievement.description as any)}</p>
                      </div>
                      <Badge variant="outline">{achievement.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
