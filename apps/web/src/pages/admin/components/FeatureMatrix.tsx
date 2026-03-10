import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { FeatureDefinition, UserRole } from "@/types/features";
import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import { Shield, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import RouteToggleRow from "@/pages/admin/components/RouteToggleRow";

interface FeatureMatrixProps {
    feature: FeatureDefinition;
}

const ROLES: { id: UserRole; nameKey: string }[] = [
    { id: "student", nameKey: "common:roles.student" },
    { id: "teacher", nameKey: "common:roles.teacher" },
    { id: "parent", nameKey: "common:roles.parent" },
    { id: "admin", nameKey: "common:roles.admin" },
];

export default function FeatureMatrix({ feature }: FeatureMatrixProps) {
    const { t } = useTranslation(["features", "common", "classroom"]);
    const { config, toggleFeature } = useFeatureFlag();
    const featureConfig = config.features[feature.id];

    if (!featureConfig) return null;

    const isEnabled = featureConfig.enabled;

    return (
        <Card className={`overflow-hidden transition-all border-none shadow-none bg-muted/30 rounded-3xl ${!isEnabled ? "opacity-60 grayscale-[0.5]" : ""}`}>
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">{t(feature.name as any)}</CardTitle>
                            <Badge variant={feature.priority === "critical" ? "destructive" : "secondary"}>
                                {feature.priority.toUpperCase()}
                            </Badge>
                        </div>
                        <CardDescription>{t(feature.description as any)}</CardDescription>
                    </div>
                    <div className="flex items-center gap-3 bg-background/50 p-2 px-4 rounded-2xl border">
                        <span className="text-sm font-medium">{isEnabled ? t("features:matrix.status.active") : t("features:matrix.status.disabled")}</span>
                        <Switch
                            checked={isEnabled}
                            onCheckedChange={(checked) => toggleFeature(feature.id, checked)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="bg-background rounded-2xl border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="border-b hover:bg-transparent">
                                <TableHead className="w-[300px] font-bold">{t("features:matrix.table.header")}</TableHead>
                                {ROLES.map(role => (
                                    <TableHead key={role.id} className="text-center font-bold">
                                        <div className="flex flex-col items-center gap-1">
                                            {t(role.nameKey as any)}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feature.routes.map(route => (
                                <RouteToggleRow
                                    key={route.path}
                                    featureId={feature.id}
                                    route={route}
                                    disabled={!isEnabled}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
