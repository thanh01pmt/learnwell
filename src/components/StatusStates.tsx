import { motion } from "framer-motion";
import { Loader2, Inbox, AlertCircle, RefreshCw, FileSearch, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface StateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const LoadingState = ({ title, description }: StateProps) => {
    const { t } = useTranslation("common");
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
            <div className="relative mb-6">
                <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 animate-pulse" />
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{title || t("common:status.loading")}</h3>
            <p className="text-muted-foreground max-w-xs">{description || t("common:status.loadingDesc")}</p>
        </div>
    );
};

export const EmptyState = ({
    icon: Icon = FileSearch,
    title,
    description,
    actionLabel,
    onAction
}: StateProps & { icon?: any }) => {
    const { t } = useTranslation("common");
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
            <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
                <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title || t("common:status.noData")}</h3>
            <p className="text-muted-foreground mb-8 max-w-xs">{description || t("common:status.noDataDesc")}</p>
            {onAction && actionLabel && (
                <Button onClick={onAction} className="gap-2 rounded-xl">
                    <Plus className="h-4 w-4" />
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export const ErrorState = ({ title, description, actionLabel, onAction }: StateProps) => {
    const { t } = useTranslation("common");
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
            <div className="h-20 w-20 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title || t("common:status.error")}</h3>
            <p className="text-muted-foreground mb-8 max-w-xs">{description || t("common:status.errorDesc")}</p>
            <Button variant="outline" onClick={onAction} className="gap-2 rounded-xl border-destructive/50 text-destructive hover:bg-destructive/10">
                <RefreshCw className="h-4 w-4" />
                {actionLabel || t("common:actions.tryAgain")}
            </Button>
        </div>
    );
};
