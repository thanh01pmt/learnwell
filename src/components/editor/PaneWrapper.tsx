import React from "react";
import { cn } from "@/lib/utils";

interface PaneWrapperProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
}

export const PaneWrapper: React.FC<PaneWrapperProps> = ({
    title,
    children,
    className,
    icon,
    actions,
}) => {
    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30 select-none">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-muted-foreground">{icon}</span>}
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            </div>
            <div className="flex-1 overflow-auto relative">
                {children}
            </div>
        </div>
    );
};
