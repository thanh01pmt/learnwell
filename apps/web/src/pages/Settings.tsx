import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation(["settings", "common", "navigation"]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newSubmission: true,
    joinRequest: true,
    weeklyReport: true,
  });

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">{t("settings:settings.title")}</h1>
          <p className="text-muted-foreground">
            {t("settings:settings.subtitle")}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              {t("settings:settings.tabs.profile")}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              {t("settings:settings.tabs.notifications")}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              {t("settings:settings.tabs.appearance")}
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              {t("settings:settings.tabs.security")}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.profile.title")}</h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                      <AvatarFallback>GV</AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">{t("settings:settings.profile.avatar.title")}</p>
                    <p className="text-sm text-muted-foreground">{t("settings:settings.profile.avatar.description")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("settings:settings.profile.form.fullName")}</Label>
                    <Input id="fullName" defaultValue="Nguyễn Thị Minh" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("settings:settings.profile.form.email")}</Label>
                    <Input id="email" type="email" defaultValue="minh.nguyen@school.edu.vn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("settings:settings.profile.form.phone")}</Label>
                    <Input id="phone" defaultValue="0912345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">{t("settings:settings.profile.form.subject")}</Label>
                    <Select defaultValue="math">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Toán học</SelectItem>
                        <SelectItem value="literature">Ngữ văn</SelectItem>
                        <SelectItem value="english">Tiếng Anh</SelectItem>
                        <SelectItem value="physics">Vật lý</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  {t("settings:settings.profile.form.save")}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.notifications.channels.title")}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.channels.email.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.channels.email.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.channels.push.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.channels.push.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.channels.sms.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.channels.sms.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.notifications.types.title")}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.types.newSubmission.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.types.newSubmission.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.newSubmission}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newSubmission: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.types.joinRequest.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.types.joinRequest.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.joinRequest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, joinRequest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings:settings.notifications.types.weeklyReport.title")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.notifications.types.weeklyReport.description")}</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.appearance.title")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("settings:settings.appearance.theme.title")}</Label>
                    <div className="flex gap-4">
                      <div className="flex-1 p-4 rounded-xl border-2 border-primary bg-background cursor-pointer">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-background to-muted mb-2" />
                        <p className="text-center font-medium">{t("settings:settings.appearance.theme.light")}</p>
                      </div>
                      <div className="flex-1 p-4 rounded-xl border-2 border-transparent bg-muted/50 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 mb-2" />
                        <p className="text-center font-medium">{t("settings:settings.appearance.theme.dark")}</p>
                      </div>
                      <div className="flex-1 p-4 rounded-xl border-2 border-transparent bg-muted/50 cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="h-20 rounded-lg bg-gradient-to-br from-background via-muted to-zinc-800 mb-2" />
                        <p className="text-center font-medium">{t("settings:settings.appearance.theme.system")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.appearance.regional.title")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("settings:settings.appearance.regional.language")}</Label>
                    <Select defaultValue="vi">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings:settings.appearance.regional.timezone")}</Label>
                    <Select defaultValue="asia-hcm">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-hcm">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                        <SelectItem value="asia-hanoi">Asia/Hanoi (GMT+7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.security.changePassword.title")}</h2>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t("settings:settings.security.changePassword.current")}</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t("settings:settings.security.changePassword.new")}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("settings:settings.security.changePassword.confirm")}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>{t("settings:settings.security.changePassword.submit")}</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-lg font-semibold mb-4">{t("settings:settings.security.sessions.title")}</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div>
                      <p className="font-medium">Chrome trên Windows</p>
                      <p className="text-sm text-muted-foreground">{t("settings:settings.security.sessions.active")} • Hà Nội, Việt Nam</p>
                    </div>
                    <Badge className="bg-success/20 text-success">{t("settings:settings.security.sessions.active")}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div>
                      <p className="font-medium">Safari trên iPhone</p>
                      <p className="text-sm text-muted-foreground">2 ngày trước • TP.HCM, Việt Nam</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      {t("settings:settings.security.sessions.logout")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
