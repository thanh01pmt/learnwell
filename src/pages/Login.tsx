import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Shield,
  Heart,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type AuthMode = "login" | "register";

const getRoles = (t: any): { value: UserRole; label: string; icon: React.ElementType; desc: string }[] => [
  { value: "student", label: t("auth:roles.student.label"), icon: GraduationCap, desc: t("auth:roles.student.desc") },
  { value: "teacher", label: t("auth:roles.teacher.label"), icon: Users, desc: t("auth:roles.teacher.desc") },
  { value: "parent", label: t("auth:roles.parent.label"), icon: Heart, desc: t("auth:roles.parent.desc") },
  { value: "admin", label: t("auth:roles.admin.label"), icon: Shield, desc: t("auth:roles.admin.desc") },
];

const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case "student": return "/student";
    case "teacher": return "/dashboard";
    case "admin": return "/admin";
    case "parent": return "/parent";
  }
};

export default function Login() {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { setRole, role } = useRole();
  const { user, signIn } = useAuth();
  const isAuthenticated = !!user;
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);

  const roles = getRoles(t);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error(t("auth:fillInfo"));
      return;
    }
    if (mode === "register" && !form.name) {
      toast.error(t("auth:enterName"));
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      try {
        await signIn({ email: form.email, password: form.password });
        setRole(selectedRole);
        setIsLoading(false);
        toast.success(
          mode === "login" ? t("auth:loginSuccess") : t("auth:registerSuccess"),
          { description: t("auth:welcomeToLearnWell") }
        );
        navigate(getDashboardPath(selectedRole));
      } catch (error) {
        setIsLoading(false);
        toast.error("Auth error");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left - Branding Panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">LearnWell</span>
          </div>
          <p className="text-white/60 text-sm">{t("auth:branding.desc")}</p>
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              {(t("auth:branding.title") as any).split(',')[0]},
              <br />
              <span className="text-white/80">{(t("auth:branding.title") as any).split(',')[1]}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: Sparkles, text: t("auth:branding.feature1") },
              { icon: Users, text: t("auth:branding.feature2") },
              { icon: GraduationCap, text: t("auth:branding.feature3") },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80">
                <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-white/40 text-xs">
          {t("auth:branding.copyright")}
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">LearnWell</span>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">
              {mode === "login" ? t("auth:login") : t("auth:createAccount")}
            </h2>
            <p className="text-muted-foreground mt-1">
              {mode === "login"
                ? t("auth:welcomeBack")
                : t("auth:startJourney")}
            </p>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">{t("auth:selectRole")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => {
                const Icon = r.icon;
                const isActive = selectedRole === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setSelectedRole(r.value)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                      isActive
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={cn("text-sm font-semibold", isActive && "text-primary")}>
                        {r.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">{t("auth:fullName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder={t("auth:placeholderName")}
                      className="pl-10 rounded-xl"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth:email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth:placeholderEmail")}
                  className="pl-10 rounded-xl"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("auth:password")}</Label>
                {mode === "login" && (
                  <button type="button" className="text-xs text-primary hover:underline">
                    {t("auth:forgotPassword")}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth:placeholderPassword")}
                  className="pl-10 pr-10 rounded-xl"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl h-11 gap-2 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "login" ? t("auth:login") : t("auth:register")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? t("auth:noAccount") : t("auth:hasAccount")}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="ml-1 text-primary font-semibold hover:underline"
            >
              {mode === "login" ? t("auth:registerNow") : t("auth:loginNow")}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
