import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { RouteConfig, UserRole } from "@/types/features";
import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import { Lock, Info, ChevronRight, Hash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface RouteToggleRowProps {
    featureId: string;
    route: RouteConfig;
    disabled: boolean;
}

const ROLES: UserRole[] = ["student", "teacher", "parent", "admin"];

export default function RouteToggleRow({ featureId, route, disabled }: RouteToggleRowProps) {
    const { t } = useTranslation("features");
    const { config, updateRoutePermission, hasAccess } = useFeatureFlag();
    const featureConfig = config.features[featureId];

    if (!featureConfig) return null;

    const permissions = featureConfig.routes[route.path];

    return (
        <TableRow className={`hover:bg-muted/30 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
            <TableCell className="font-medium py-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        {route.parentPath && <div className="w-4 h-4 border-l-2 border-b-2 border-muted rounded-bl-lg ml-1 -mt-2" />}
                        <span className={route.isParent ? "font-bold" : "text-muted-foreground ml-1"}>
                            {t(route.name as any)}
                        </span>
                        {route.isParent && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Info className="h-3 w-3 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t("features:matrix.tooltips.parentRoute")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded ml-6 w-fit text-muted-foreground font-mono">
                        {route.path}
                    </code>
                </div>
            </TableCell>

            {ROLES.map(role => {
                const isGranted = permissions?.[role] ?? false;
                const isAdmin = role === "admin";

                // Final effective access check (takes hierarchy into account)
                const canActuallyAccess = hasAccess(route.path, role);
                const isDisabledByParent = isGranted && !canActuallyAccess && !disabled;

                return (
                    <TableCell key={role} className="text-center p-0">
                        <div className="flex items-center justify-center p-4">
                            {isAdmin ? (
                                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Lock className="h-3 w-3 text-primary" />
                                </div>
                            ) : (
                                <div className="relative">
                                    <Checkbox
                                        checked={isGranted}
                                        onCheckedChange={(checked) => updateRoutePermission(featureId, route.path, role, !!checked)}
                                        className={isDisabledByParent ? "border-amber-400 opacity-60" : ""}
                                    />
                                    {isDisabledByParent && (
                                        <div className="absolute -top-4 -right-4">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info className="h-3 w-3 text-amber-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{t("features:matrix.tooltips.disabledByParent")}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </TableCell>
                );
            })}
        </TableRow>
    );
}
