import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Star,
  Award,
  Zap,
  Target,
  Flame,
  Code,
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  Lock
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { badges, achievements, leaderboard } from "@/mocks/data/achievements";
const Achievements = () => {
  const { t } = useTranslation(["dashboard", "achievements", "portfolio", "leaderboard", "common", "classroom"]);

  const getRarityColor = (rarityKey: string) => {
    const rarity = rarityKey.split('.').pop() || '';
    switch (rarity) {
      case "legendary": return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "epic": return "bg-purple-500 text-white";
      case "rare": return "bg-blue-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("dashboard:stats.achievements")} & {t("achievements:badges.title")}</h1>
          <p className="text-muted-foreground">{t("portfolio:securityDesc")}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5">
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">4,250</p>
            <p className="text-sm text-muted-foreground">{t("leaderboard:xp")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5">
            <Award className="h-8 w-8 mx-auto text-accent mb-2" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">{t("achievements:badges.title")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5">
            <CheckCircle className="h-8 w-8 mx-auto text-success mb-2" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">{t("dashboard:stats.achievements")}</p>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-br from-warning/10 to-warning/5">
            <Flame className="h-8 w-8 mx-auto text-warning mb-2" />
            <p className="text-2xl font-bold">22</p>
            <p className="text-sm text-muted-foreground">{t("common:streak")} {t("common:day")}</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="badges" className="space-y-4">
          <TabsList>
            <TabsTrigger value="badges">{t("achievements:badges.title")}</TabsTrigger>
            <TabsTrigger value="achievements">{t("dashboard:stats.achievements")}</TabsTrigger>
            <TabsTrigger value="leaderboard">{t("leaderboard:title")}</TabsTrigger>
          </TabsList>

          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card
                  key={badge.id}
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${!badge.earned ? "opacity-75" : ""
                    }`}
                >
                  {!badge.earned && (
                    <div className="absolute top-3 right-3">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${badge.earned
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-muted"
                        }`}>
                        <badge.icon className={`h-8 w-8 ${badge.earned ? "text-white" : "text-muted-foreground"
                          }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{t(badge.name)}</h3>
                        </div>
                        <Badge className={`mb-2 ${getRarityColor(badge.rarity)}`}>
                          {t(badge.rarity)}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{t(badge.description)}</p>
                        {badge.earned ? (
                          <p className="text-xs text-success mt-2">
                            {t("dashboard:stats.completed")}: {badge.date}
                          </p>
                        ) : (
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{t("classroom:table.progress")}</span>
                              <span>{badge.progress}/30</span>
                            </div>
                            <Progress value={(badge.progress || 0) / 30 * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${achievement.completed
                        ? "bg-success/10"
                        : "bg-muted"
                        }`}>
                        {achievement.completed ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : (
                          <Star className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{t(achievement.title)}</h3>
                          <Badge variant="outline">{t(achievement.category)}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{t(achievement.description)}</p>
                        {!achievement.completed && (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">+{achievement.xp} XP</p>
                        {achievement.completed ? (
                          <Badge variant="secondary">{t("dashboard:status.graded")}</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {achievement.progress}%
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {t("leaderboard:title")} {t("leaderboard:mockup.accumulatedFrom")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${user.isCurrentUser
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-muted/50 hover:bg-muted"
                        }`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${user.rank === 1 ? "bg-yellow-500 text-white" :
                        user.rank === 2 ? "bg-gray-400 text-white" :
                          user.rank === 3 ? "bg-amber-600 text-white" :
                            "bg-muted text-muted-foreground"
                        }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{t(user.name)}</p>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">{t("common:you")}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{user.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{t("leaderboard:xp")}</p>
                      </div>
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

export default Achievements;
