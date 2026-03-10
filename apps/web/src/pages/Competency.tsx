import {
  Trophy,
  Target,
  TrendingUp,
  Star,
  Award,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { competencyData, mockSkills, mockCompetencyAchievements } from "@/mocks/data";


export default function Competency() {
  const { t } = useTranslation(["competencies", "dashboard"]);
  const getLevelStars = (level: number, maxLevel: number) => {
    return Array.from({ length: maxLevel }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < level ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
      />
    ));
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">{t("dashboard:sections.curriculum")}</h1>
            <p className="text-muted-foreground">
              {t("competencies:subtitle", "Phân tích và đánh giá năng lực học tập chi tiết")}
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:progress.stats.avgScore")}</p>
                <p className="text-2xl font-bold text-gradient">78/100</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("parent:dashboard.comparison.title")}</p>
                <p className="text-2xl font-bold text-success">+12%</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("parent:dashboard.curriculum.details.skills")}</p>
                <p className="text-2xl font-bold">12/20</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("dashboard:stats.achievements")}</p>
                <p className="text-2xl font-bold">4/6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-xl font-semibold mb-4">{t("dashboard:dashboard.comparison.title")}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competencyData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tickFormatter={(val) => t(val)}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name={t("dashboard:progress.stats.avgScore")}
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Progress */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{t("parent:dashboard.curriculum.details.skills")}</h2>
              <Button variant="ghost" size="sm">
                {t("common:viewAll")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {mockSkills.map((skill) => (
                <div key={skill.id} className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{t(skill.name)}</p>
                      <p className="text-sm text-muted-foreground">{t(skill.subject)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getLevelStars(skill.level, skill.maxLevel)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(skill.xp / skill.nextXp) * 100} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-20 text-right">
                      {skill.xp}/{skill.nextXp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{t("dashboard:stats.achievements")}</h2>
              <Sparkles className="h-5 w-5 text-warning" />
            </div>
            <Badge variant="secondary">
              {mockCompetencyAchievements.filter(a => a.unlocked).length}/{mockCompetencyAchievements.length} {t("dashboard:stats.graded")}
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCompetencyAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative p-4 rounded-2xl text-center transition-all ${achievement.unlocked
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 hover:shadow-lg cursor-pointer"
                  : "bg-muted/30 opacity-50"
                  }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-medium text-sm">{t(achievement.title)}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {t(achievement.description)}
                </p>
                {achievement.unlocked && (
                  <div className="absolute -top-1 -right-1">
                    <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
                      <Award className="h-3 w-3 text-success-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
