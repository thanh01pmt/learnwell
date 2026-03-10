import { useNavigate } from "react-router-dom";
import { Users, Calendar, MoreVertical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ClassCardProps {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  schedule: string;
  progress?: number;
  coverColor?: string;
  isActive?: boolean;
}

const colorPresets = [
  "bg-primary",
  "bg-accent",
  "bg-success",
  "bg-info",
  "bg-cyan",
  "bg-warning",
];

export function ClassCard({
  id,
  name,
  subject,
  studentCount,
  schedule,
  progress = 0,
  coverColor,
  isActive = true,
}: ClassCardProps) {
  const { t } = useTranslation("classroom");
  const navigate = useNavigate();
  const bgClass = coverColor || colorPresets[Math.floor(Math.random() * colorPresets.length)];

  return (
    <div className="card-modern overflow-hidden hover-lift cursor-pointer group">
      {/* Cover */}
      <div className={cn("h-24 relative", bgClass)}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6bTAgMGMwLTItMi00LTItNHMtMiAyLTIgNCAyIDQgMiA0IDItMiAyLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        {/* Actions */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-card/20 hover:bg-card/30 text-card rounded-lg"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{t("actions.edit")}</DropdownMenuItem>
              <DropdownMenuItem>{t("actions.viewDetails")}</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">{t("actions.deleteClass")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className={cn(
              "bg-card/90 text-foreground font-medium",
              !isActive && "bg-muted text-muted-foreground"
            )}
          >
            {isActive ? t("classes.card.statusActive") : t("classes.card.statusEnded")}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{subject}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{t("classes.card.studentCount", { count: studentCount })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{schedule}</span>
          </div>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{t("classes.card.programProgress")}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action */}
        <Button
          variant="ghost"
          className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground rounded-xl"
          onClick={() => navigate(`/classes/${id}`)}
        >
          {t("classes.card.enterClass")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
