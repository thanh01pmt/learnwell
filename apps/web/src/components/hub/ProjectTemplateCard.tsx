import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectTemplateCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    thumbnail?: string;
    badge?: string;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

export const ProjectTemplateCard: React.FC<ProjectTemplateCardProps> = ({
    title,
    description,
    icon,
    thumbnail,
    badge,
    isSelected,
    onClick,
    className,
}) => {
    const { t } = useTranslation("hub");

    return (
        <Card
            className={cn(
                "group cursor-pointer transition-all duration-500 hover:scale-[1.01] overflow-hidden border-2",
                isSelected
                    ? "border-primary shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-primary/5 scale-[1.01]"
                    : "hover:shadow-lg border-transparent bg-card shadow-sm hover:border-primary/20",
                className
            )}
            onClick={onClick}
        >
            <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
                {thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="relative flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-105">
                        {/* More Sophisticated Placeholder Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-40" />

                        <div className="z-10 bg-white dark:bg-slate-900 border border-border/50 p-5 rounded-3xl shadow-2xl text-primary mb-3">
                            {icon && <div className="scale-150">{icon}</div>}
                        </div>
                    </div>
                )}

                {badge && (
                    <Badge className="absolute top-4 right-4 bg-primary text-white border-none backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {badge}
                    </Badge>
                )}

                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6",
                    isSelected && "opacity-100"
                )}>
                    <div className="text-white text-[10px] font-bold uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" />
                        {t("actions.clickToSelect")}
                    </div>
                </div>
            </div>

            <CardHeader className="p-6">
                <CardTitle className="text-base font-bold line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
                    {title}
                </CardTitle>
                <CardDescription className="text-xs font-medium line-clamp-2 min-h-[32px] mt-2 leading-relaxed opacity-80">
                    {description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};
