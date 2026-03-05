import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeatureRouteProps {
    children: React.ReactNode;
    path: string;
}

export const FeatureRoute: React.FC<FeatureRouteProps> = ({ children, path }) => {
    const { t } = useTranslation(["auth", "common"]);
    const hasAccess = useFeatureAccess(path);
    const location = useLocation();

    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-amber-50 flex items-center justify-center">
                    <Lock className="h-10 w-10 text-amber-500" />
                </div>
                <h1 className="text-2xl font-bold">{t("auth:features.unavailable")}</h1>
                <p className="text-muted-foreground max-w-md">
                    {t("auth:features.unavailableDesc")}
                    <br />
                    {t("auth:features.contactAdmin")}
                </p>
                <Button onClick={() => window.history.back()} variant="outline">
                    {t("common:back")}
                </Button>
            </div>
        );
    }

    return <>{children}</>;
};

