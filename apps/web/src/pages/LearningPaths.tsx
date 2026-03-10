import React from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  ChevronRight,
  Play,
  Lock,
  Star,
  TrendingUp,
  Award
} from "lucide-react";

const learningPaths = [
  {
    id: 1,
    title: "classroom:learningPaths.mocks.frontendTitle",
    description: "classroom:learningPaths.mocks.frontendDesc",
    progress: 65,
    totalCourses: 8,
    completedCourses: 5,
    estimatedHours: 120,
    level: "intermediate",
    enrolled: true,
    courses: [
      { name: "HTML & CSS Basics", completed: true, duration: "10h" },
      { name: "JavaScript Fundamentals", completed: true, duration: "15h" },
      { name: "React Basics", completed: true, duration: "20h" },
      { name: "Advanced React", completed: true, duration: "15h" },
      { name: "TypeScript", completed: true, duration: "12h" },
      { name: "State Management", completed: false, duration: "10h", current: true },
      { name: "Testing", completed: false, duration: "8h", locked: true },
      { name: "Performance", completed: false, duration: "10h", locked: true },
    ]
  },
  {
    id: 2,
    title: "classroom:learningPaths.mocks.backendTitle",
    description: "classroom:learningPaths.mocks.backendDesc",
    progress: 30,
    totalCourses: 7,
    completedCourses: 2,
    estimatedHours: 100,
    level: "intermediate",
    enrolled: true,
    courses: [
      { name: "Node.js Basics", completed: true, duration: "12h" },
      { name: "Express Framework", completed: true, duration: "10h" },
      { name: "Database Design", completed: false, duration: "15h", current: true },
      { name: "REST API", completed: false, duration: "12h", locked: true },
      { name: "Authentication", completed: false, duration: "8h", locked: true },
      { name: "Deployment", completed: false, duration: "6h", locked: true },
      { name: "Microservices", completed: false, duration: "15h", locked: true },
    ]
  },
  {
    id: 3,
    title: "classroom:learningPaths.mocks.dataTitle",
    description: "classroom:learningPaths.mocks.dataDesc",
    progress: 0,
    totalCourses: 6,
    completedCourses: 0,
    estimatedHours: 80,
    level: "advanced",
    enrolled: false,
    courses: [
      { name: "Python Basics", completed: false, duration: "15h" },
      { name: "NumPy & Pandas", completed: false, duration: "12h" },
      { name: "Data Visualization", completed: false, duration: "10h" },
      { name: "Statistics", completed: false, duration: "12h" },
      { name: "Machine Learning", completed: false, duration: "20h" },
      { name: "Deep Learning", completed: false, duration: "15h" },
    ]
  },
  {
    id: 4,
    title: "classroom:learningPaths.mocks.devopsTitle",
    description: "classroom:learningPaths.mocks.devopsDesc",
    progress: 0,
    totalCourses: 5,
    completedCourses: 0,
    estimatedHours: 60,
    level: "advanced",
    enrolled: false,
    courses: [
      { name: "Linux Basics", completed: false, duration: "10h" },
      { name: "Docker", completed: false, duration: "12h" },
      { name: "Kubernetes", completed: false, duration: "15h" },
      { name: "CI/CD Pipelines", completed: false, duration: "10h" },
      { name: "Cloud Services", completed: false, duration: "15h" },
    ]
  },
];

const LearningPaths = () => {
  const { t } = useTranslation(["common", "classroom"]);
  const getLevelColor = (level: string) => {
    switch (level) {
      case "basic": return "bg-green-500";
      case "intermediate": return "bg-blue-500";
      case "advanced": return "bg-purple-500";
      default: return "bg-muted";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("classroom:learningPaths.title")}</h1>
            <p className="text-muted-foreground">{t("classroom:learningPaths.subtitle")}</p>
          </div>
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("classroom:learningPaths.viewProgress")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <BookOpen className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">{t("classroom:status.active")}</p>
          </Card>
          <Card className="text-center p-4">
            <CheckCircle className="h-8 w-8 mx-auto text-success mb-2" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-muted-foreground">{t("classroom:learningPaths.labels.completed")}</p>
          </Card>
          <Card className="text-center p-4">
            <Clock className="h-8 w-8 mx-auto text-accent mb-2" />
            <p className="text-2xl font-bold">85h</p>
            <p className="text-sm text-muted-foreground">{t("classroom:learningPaths.labels.studyTime")}</p>
          </Card>
          <Card className="text-center p-4">
            <Award className="h-8 w-8 mx-auto text-warning mb-2" />
            <p className="text-2xl font-bold">47%</p>
            <p className="text-sm text-muted-foreground">{t("classroom:learningPaths.labels.overallProgress")}</p>
          </Card>
        </div>

        {/* Learning Paths */}
        <div className="space-y-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{t(path.title as any)}</CardTitle>
                      <Badge className={`${getLevelColor(path.level)} text-white`}>
                        {t(`common:levels.${path.level}` as any)}
                      </Badge>
                      {path.enrolled && (
                        <Badge variant="outline" className="border-success text-success">
                          {t("classroom:learningPaths.enrolled")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{t(path.description as any)}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {t("classroom:learningPaths.coursesCount", { count: path.totalCourses })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {t("classroom:learningPaths.estimatedHours", { count: path.estimatedHours })}
                      </span>
                      {path.enrolled && (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {t("classroom:learningPaths.completedCount", { completed: path.completedCourses, total: path.totalCourses })}
                        </span>
                      )}
                    </div>
                  </div>
                  {path.enrolled ? (
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      {t("classroom:learningPaths.continue")}
                    </Button>
                  ) : (
                    <Button variant="outline">
                      {t("classroom:learningPaths.enroll")}
                    </Button>
                  )}
                </div>
                {path.enrolled && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t("classroom:learningPaths.progressLabel")}</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                )}
              </CardHeader>

              {path.enrolled && (
                <CardContent className="border-t pt-4">
                  <div className="grid gap-2">
                    {path.courses.map((course, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${course.current
                            ? "bg-primary/10 border border-primary"
                            : course.locked
                              ? "bg-muted/30 opacity-60"
                              : "bg-muted/50 hover:bg-muted"
                          }`}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${course.completed
                            ? "bg-success text-white"
                            : course.current
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          }`}>
                          {course.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : course.locked ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${course.locked ? "text-muted-foreground" : ""}`}>
                            {course.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{course.duration}</p>
                        </div>
                        {course.current && (
                          <Badge className="bg-primary text-primary-foreground">
                            {t("classroom:learningPaths.active")}
                          </Badge>
                        )}
                        {!course.locked && !course.completed && !course.current && (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default LearningPaths;
