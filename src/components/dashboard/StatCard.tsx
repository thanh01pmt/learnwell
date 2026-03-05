import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "primary" | "accent" | "success" | "warning" | "info" | "cyan";
  className?: string;
}

const iconBoxStyles = {
  primary: "icon-box-primary",
  accent: "icon-box-accent",
  success: "icon-box-success",
  warning: "icon-box-warning",
  info: "icon-box-info",
  cyan: "icon-box-cyan",
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  variant = "primary",
  className,
}: StatCardProps) {
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={iconBoxStyles[variant]}>
          {icon}
        </div>
        {trend && (
          <span className={trend.isPositive ? "trend-up" : "trend-down"}>
            {trend.isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
