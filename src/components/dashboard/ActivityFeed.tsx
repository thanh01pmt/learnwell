import { UserPlus, FileCheck, AlertCircle, MessageSquare, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
type ActivityType = "join_request" | "submission" | "alert" | "comment";
interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  actionable?: boolean;
}
const activityIcons: Record<ActivityType, React.ElementType> = {
  join_request: UserPlus,
  submission: FileCheck,
  alert: AlertCircle,
  comment: MessageSquare
};
const activityColors: Record<ActivityType, string> = {
  join_request: "bg-primary/10 text-primary",
  submission: "bg-success/10 text-success",
  alert: "bg-warning/10 text-warning",
  comment: "bg-secondary text-secondary-foreground"
};
interface ActivityItemProps {
  activity: Activity;
}
function ActivityItem({
  activity
}: ActivityItemProps) {
  const { t } = useTranslation("common");
  const Icon = activityIcons[activity.type];
  return <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", activityColors[activity.type])}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{activity.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {activity.description}
          </p>
        </div>
        {activity.user && <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={activity.user.avatar} />
          <AvatarFallback className="text-xs bg-secondary">
            {activity.user.initials}
          </AvatarFallback>
        </Avatar>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{activity.time}</span>
        </div>
        {activity.actionable && <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            {t("common:actions.reject")}
          </Button>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
            {t("common:actions.accept")}
          </Button>
        </div>
        }
      </div>
    </div>
  </div>;
}
interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
  title?: string;
  showActions?: boolean;
  emptyMessage?: string;
}
export function ActivityFeed({ activities, className, title, showActions = false, emptyMessage }: ActivityFeedProps) {
  const { t } = useTranslation("common");
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{emptyMessage || t("common:no_activities")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
export type { Activity, ActivityType };