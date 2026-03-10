import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "stat" | "class" | "activity";
}

export function SkeletonCard({ className, variant = "stat" }: SkeletonCardProps) {
  if (variant === "stat") {
    return (
      <div className={cn("stat-card", className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 rounded-lg animate-shimmer" />
            <div className="h-8 w-16 rounded-lg animate-shimmer" />
            <div className="h-3 w-32 rounded-lg animate-shimmer" />
          </div>
          <div className="h-12 w-12 rounded-2xl animate-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "class") {
    return (
      <div className={cn("glass-card rounded-2xl overflow-hidden", className)}>
        <div className="h-24 animate-shimmer" />
        <div className="p-4 space-y-3">
          <div className="h-5 w-3/4 rounded-lg animate-shimmer" />
          <div className="h-4 w-1/2 rounded-lg animate-shimmer" />
          <div className="flex gap-4">
            <div className="h-4 w-20 rounded-lg animate-shimmer" />
            <div className="h-4 w-20 rounded-lg animate-shimmer" />
          </div>
          <div className="h-10 w-full rounded-lg animate-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "activity") {
    return (
      <div className={cn("activity-item", className)}>
        <div className="h-10 w-10 rounded-xl animate-shimmer shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-lg animate-shimmer" />
          <div className="h-3 w-full rounded-lg animate-shimmer" />
          <div className="h-3 w-1/4 rounded-lg animate-shimmer" />
        </div>
      </div>
    );
  }

  return null;
}
