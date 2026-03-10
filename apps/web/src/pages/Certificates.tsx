import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle,
  BookOpen
} from "lucide-react";

const earnedCertificates = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    issuer: "TechEdu Academy",
    date: "2024-01-15",
    credentialId: "JS-2024-001234",
    skills: ["JavaScript", "ES6", "DOM Manipulation"],
    hours: 40,
    image: "javascript"
  },
  {
    id: 2,
    title: "React Developer",
    issuer: "TechEdu Academy",
    date: "2024-01-20",
    credentialId: "REACT-2024-005678",
    skills: ["React", "Hooks", "State Management"],
    hours: 60,
    image: "react"
  },
  {
    id: 3,
    title: "Python for Data Science",
    issuer: "TechEdu Academy",
    date: "2023-12-10",
    credentialId: "PY-2023-009012",
    skills: ["Python", "Pandas", "NumPy"],
    hours: 50,
    image: "python"
  },
];

const inProgressCertificates = [
  {
    id: 4,
    title: "TypeScript Advanced",
    issuer: "TechEdu Academy",
    progress: 75,
    estimatedCompletion: "2024-02-15",
    skills: ["TypeScript", "Generics", "Type Guards"],
    hours: 45,
    image: "typescript"
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    issuer: "TechEdu Academy",
    progress: 40,
    estimatedCompletion: "2024-03-01",
    skills: ["Node.js", "Express", "REST API"],
    hours: 55,
    image: "nodejs"
  },
];

export default function Certificates() {
  const { t } = useTranslation(["common", "dashboard", "classroom", "parent"]);
  const navigate = useNavigate();

  const getGradient = (image: string) => {
    switch (image) {
      case "javascript": return "from-yellow-500 to-yellow-600";
      case "react": return "from-cyan-500 to-blue-500";
      case "python": return "from-blue-500 to-green-500";
      case "typescript": return "from-blue-600 to-blue-700";
      case "nodejs": return "from-green-500 to-green-600";
      default: return "from-primary to-accent";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("common:certificates")}</h1>
            <p className="text-muted-foreground">{t("dashboard:certificates.subtitle")}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <Award className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">{t("dashboard:certificates.earned")}</p>
          </Card>
          <Card className="text-center p-4">
            <Clock className="h-8 w-8 mx-auto text-accent mb-2" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">{t("classroom:status.active")}</p>
          </Card>
          <Card className="text-center p-4">
            <BookOpen className="h-8 w-8 mx-auto text-success mb-2" />
            <p className="text-2xl font-bold">150</p>
            <p className="text-sm text-muted-foreground">{t("classroom:learningPaths.labels.studyTime")}</p>
          </Card>
          <Card className="text-center p-4">
            <CheckCircle className="h-8 w-8 mx-auto text-warning mb-2" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">{t("dashboard:stats.skills")}</p>
          </Card>
        </div>

        {/* Certificates */}
        <Tabs defaultValue="earned" className="space-y-4">
          <TabsList>
            <TabsTrigger value="earned">{t("dashboard:certificates.earned")} ({earnedCertificates.length})</TabsTrigger>
            <TabsTrigger value="progress">{t("dashboard:certificates.inProgress")} ({inProgressCertificates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="earned">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedCertificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Certificate Preview */}
                  <div className={`h-40 bg-gradient-to-br ${getGradient(cert.image)} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Award className="h-12 w-12 mx-auto mb-2 opacity-90" />
                        <p className="text-lg font-bold">{t("common:certificate")}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-white/20 text-white border-0">
                        {t("common:verified")}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {cert.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {cert.hours}h
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">
                      ID: {cert.credentialId}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        {t("common:download")}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-6">
              {inProgressCertificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <div className={`h-24 bg-gradient-to-br ${getGradient(cert.image)} opacity-50`} />
                  <CardContent className="p-4 -mt-8">
                    <div className="bg-background rounded-xl p-4 shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline">{cert.progress}%</Badge>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${getGradient(cert.image)}`}
                          style={{ width: `${cert.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {t("common:estimated")}: {cert.estimatedCompletion}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {cert.hours}h
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full">
                        {t("common:continueLearning")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};
