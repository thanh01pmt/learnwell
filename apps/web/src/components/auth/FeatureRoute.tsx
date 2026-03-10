import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AppLayout } from "@/components/layout/AppLayout";

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
            <AppLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-6 animate-fade-in">
                    <div className="h-24 w-24 rounded-full bg-amber-50 flex items-center justify-center border-4 border-white shadow-sm">
                        <Lock className="h-12 w-12 text-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight">{t("auth:features.unavailable")}</h1>
                        <p className="text-muted-foreground max-w-md mx-auto text-sm lg:text-base leading-relaxed">
                            {t("auth:features.unavailableDesc")}
                            <br />
                            <span className="text-xs mt-2 block opacity-80">{t("auth:features.contactAdmin")}</span>
                        </p>
                    </div>
                    <Button onClick={() => window.history.back()} variant="outline" className="px-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                        {t("common:back")}
                    </Button>
                </div>
            </AppLayout>
        );
    }

    return <>{children}</>;
};

