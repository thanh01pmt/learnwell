import React, { ReactNode } from "react";
import {
    Lock,
    ShieldAlert,
    AlertTriangle,
    Clock,
    EyeOff,
    Settings,
    ShieldCheck,
    UserX
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type SessionMode = "lesson" | "practice" | "exam" | "review";

interface SessionModeGuardProps {
    children: ReactNode;
    mode: SessionMode;
    isActive?: boolean;
}

/**
 * SessionModeGuard Component
 * 
 * High-order component wrapper that applies UI restrictions 
 * based on the current session mode (Exam, Practice, etc.)
 */
const SessionModeGuard: React.FC<SessionModeGuardProps> = ({
    children,
    mode = "lesson",
    isActive = true
}) => {
    const { t } = useTranslation(["common", "editor"]);
    if (!isActive) return <>{children}</>;

    const getRestrictions = (mode: SessionMode) => {
        switch (mode) {
            case "exam":
                return {
                    title: t('common:modes.exam'),
                    color: "bg-destructive/10 text-destructive border-destructive/20",
                    icon: ShieldAlert,
                    features: [
                        "Khóa chức năng Copy/Paste",
                        "Ẩn kết quả Test Case chi tiết",
                        "Vô hiệu hóa AI Tutor",
                        "Ghi nhật ký thay đổi tab"
                    ],
                    alert: "Nội dung bài thi được bảo mật. Mọi hành vi gian lận sẽ được hệ thống tự động ghi nhận."
                };
            case "practice":
                return {
                    title: "CHẾ ĐỘ LUYỆN TẬP",
                    color: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
                    icon: ShieldCheck,
                    features: ["Mở khóa AI Hints", "Hiển thị đầy đủ Test Case"],
                    alert: "Bạn đang trong chế độ luyện tập. Hãy tự do thử nghiệm các giải pháp khác nhau."
                };
            case "review":
                return {
                    title: "CHẾ ĐỘ XEM LẠI (READY ONLY)",
                    color: "bg-amber-500/10 text-amber-700 border-amber-500/20",
                    icon: EyeOff,
                    features: ["Vô hiệu hóa soạn thảo", "Xem lại code cũ", "Xem feedback AI"],
                    alert: "Bài làm này đã được nộp. Hiện tại bạn chỉ có thể xem lại lịch sử."
                };
            default:
                return null;
        }
    };

    const restriction = getRestrictions(mode);

    return (
        <div className="relative h-full w-full flex flex-col">
            {/* Dynamic Header Banner */}
            {restriction && (
                <div className={cn("h-10 px-4 flex items-center justify-between shrink-0 font-bold border-b transition-colors", restriction.color)}>
                    <div className="flex items-center gap-2">
                        <restriction.icon className="w-4 h-4 animate-pulse" />
                        <span className="text-[11px] uppercase tracking-widest font-black leading-none">{restriction.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                            {restriction.features.map((f, i) => (
                                <div key={i} title={f} className="w-6 h-6 rounded-full bg-background border flex items-center justify-center cursor-help overflow-hidden">
                                    <div className="p-1">
                                        {i === 0 ? <Lock className="w-3 h-3" /> : <Settings className="w-3 h-3" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-4 w-[1px] bg-current opacity-20" />
                        <div className="flex items-center gap-1.5 text-xs">
                            <Clock className="w-3 h-3" />
                            <span className="font-black font-mono">15:20</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={cn(
                "flex-1 relative transition-all duration-500",
                mode === "review" ? "pointer-events-none grayscale-[0.5] opacity-90" : ""
            )}>
                {children}

                {/* Overlay for specific modes if needed */}
                {mode === "review" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        <div className="p-4 bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border-4 border-amber-400/50 flex flex-col items-center gap-3 animate-bounce">
                            <UserX className="w-10 h-10 text-amber-500" />
                            <span className="text-sm font-black text-amber-700 uppercase p-2 border border-dashed border-amber-400">{t('common:status.readonly')}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Persistence Notification for Critical Modes */}
            {mode === "exam" && (
                <div className="absolute bottom-6 right-6 w-80 animate-in slide-in-from-bottom duration-1000">
                    <Alert variant="destructive" className="bg-destructive text-destructive-foreground border-none shadow-2xl">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle className="font-black text-xs uppercase tracking-widest mb-2">{t('editor:alerts.security_warning')}</AlertTitle>
                        <AlertDescription className="text-[10px] font-bold opacity-90 leading-relaxed">
                            {restriction?.alert}
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default SessionModeGuard;
