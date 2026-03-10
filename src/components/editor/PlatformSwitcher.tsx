import React from "react";
import {
    Code2,
    MousePointer2,
    Blocks,
    ChevronDown,
    ChevronRight,
    Monitor,
    Layout,
    Cpu,
    Settings,
    Sparkles,
    Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PlatformSwitcherProps {
    currentPlatform: "scratch" | "blockly" | "ide";
    onSwitch: (platform: "scratch" | "blockly" | "ide") => void;
    className?: string;
}

const platforms = {
    scratch: {
        name: "Scratch 3",
        icon: MousePointer2,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        borderColor: "border-orange-500/20",
        description: "Kéo thả khối lệnh trực quan"
    },
    blockly: {
        name: "Blockly PXT",
        icon: Blocks,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        description: "Lập trình khối nâng cao & Micro:bit"
    },
    ide: {
        name: "Web IDE",
        icon: Code2,
        color: "text-indigo-600",
        bg: "bg-indigo-600/10",
        borderColor: "border-indigo-600/20",
        description: "Soạn thảo mã nguồn chuyên nghiệp"
    }
};

const PlatformSwitcher: React.FC<PlatformSwitcherProps> = ({
    currentPlatform,
    onSwitch,
    className
}) => {
    const { t } = useTranslation(["editor", "common"]);
    const active = platforms[currentPlatform];

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "h-9 px-3 gap-2 border shadow-sm transition-all hover:shadow-md",
                            active.bg,
                            active.borderColor
                        )}
                    >
                        <div className={cn("flex items-center justify-center shrink-0", active.color)}>
                            <active.icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 opacity-70">Workspace</span>
                            <span className="text-xs font-bold">{active.name}</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 p-1">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-2 py-2">
                        Thay đổi môi trường
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(Object.entries(platforms) as [keyof typeof platforms, typeof platforms['scratch']][]).map(([key, platform]) => (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => onSwitch(key)}
                            className={cn(
                                "flex items-start gap-3 p-2 cursor-pointer transition-colors",
                                currentPlatform === key ? "bg-accent" : "hover:bg-accent/50"
                            )}
                        >
                            <div className={cn("mt-0.5 p-2 rounded-md", platform.bg)}>
                                <platform.icon className={cn("w-4 h-4", platform.color)} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold">{platform.name}</span>
                                    {currentPlatform === key && (
                                        <Badge variant="secondary" className="h-4 text-[9px] px-1 font-black bg-primary/10 text-primary border-primary/20">{t('common:status.active')}</Badge>
                                    )}
                                </div>
                                <span className="text-[11px] text-muted-foreground line-clamp-1">{platform.description}</span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <div className="p-2">
                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-md p-2 flex items-center gap-2">
                            <div className="p-1 bg-indigo-500 rounded text-white shadow-sm">
                                <Sparkles className="w-3 h-3" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[10px] font-bold">Auto-Convert</span>
                                <span className="text-[9px] text-muted-foreground">Chuyển Blocks sang Code bằng AI</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                                <ChevronRight className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block" />

            <TooltipProvider>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <Monitor className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <Zap className="w-4 h-4" />
                    </Button>
                </div>
            </TooltipProvider>
        </div>
    );
};

// Simple Mock Tooltip
const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default PlatformSwitcher;
