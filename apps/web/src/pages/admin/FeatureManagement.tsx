import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
    Settings2,
    ShieldCheck,
    FileJson,
    RotateCcw,
    Save,
    Users,
    Trophy,
    BrainCircuit,
    Webhook,
    BookOpen,
    LayoutGrid,
    Search,
    AlertCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import { FEATURE_REGISTRY } from "@/utils/featureRegistry";
import { FeatureCategory } from "@/types/features";
import FeatureMatrix from "@/pages/admin/components/FeatureMatrix";
import ConfigImportExport from "@/pages/admin/components/ConfigImportExport";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES: { id: FeatureCategory | "all"; nameKey: string; icon: any }[] = [
    { id: "all", nameKey: "features:categories.all", icon: LayoutGrid },
    { id: "user-management", nameKey: "features:categories.user-management", icon: Users },
    { id: "contests", nameKey: "features:categories.contests", icon: Trophy },
    { id: "ai-features", nameKey: "features:categories.ai-features", icon: BrainCircuit },
    { id: "content-access", nameKey: "features:categories.content-access", icon: BookOpen },
    { id: "webhooks", nameKey: "features:categories.webhooks", icon: Webhook },
    { id: "parent-special", nameKey: "features:categories.parent-special", icon: ShieldCheck },
];

export default function FeatureManagement() {
    const { t } = useTranslation(["features", "common", "classroom"]);
    const { config, resetToDefault } = useFeatureFlag();
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isModified, setIsModified] = useState(false);

    const filteredFeatures = FEATURE_REGISTRY.filter(feature => {
        const matchesTab = activeTab === "all" || feature.category === activeTab;
        const matchesSearch = t(feature.name as any).toLowerCase().includes(searchQuery.toLowerCase()) ||
            t(feature.description as any).toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{t("features:page.title")}</h1>
                            <Badge variant="outline" className="font-mono text-[10px]">v{config.version}</Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {t("features:page.subtitle")}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <ConfigImportExport />
                        <Button variant="outline" size="sm" onClick={resetToDefault} className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            {t("common:actions.default")}
                        </Button>
                        <Button size="sm" onClick={() => toast.success(t("features:notifications.saved"))} className="gap-2 bg-primary hover:bg-primary/90">
                            <Save className="h-4 w-4" />
                            {t("common:actions.saveChanges")}
                        </Button>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-semibold text-amber-900 dark:text-amber-200">{t("features:info.banner.title")}:</p>
                        <p className="text-amber-800 dark:text-amber-300/80">
                            {t("features:info.banner.message")}
                        </p>
                    </div>
                </div>

                {/* Dashboard Filters & Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <TabsList className="bg-muted/50 p-1 h-auto flex flex-wrap gap-1">
                            {CATEGORIES.map(cat => (
                                <TabsTrigger key={cat.id} value={cat.id} className="gap-2 py-2 px-3">
                                    <cat.icon className="h-4 w-4" />
                                    <span className="hidden sm:inline">{t(cat.nameKey as any)}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="relative w-full lg:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("features:actions.searchPlaceholder")}
                                className="pl-9 rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Feature Grid/Matrix */}
                    <TabsContent value="all" className="mt-0">
                        <ScrollArea className="h-[calc(100vh-280px)]">
                            <div className="space-y-6 pb-10">
                                {filteredFeatures.map(feature => (
                                    <FeatureMatrix key={feature.id} feature={feature} />
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    {CATEGORIES.filter(c => c.id !== "all" && c.id !== "content-access" && c.id !== "webhooks").map(cat => (
                        <TabsContent key={cat.id} value={cat.id} className="mt-0">
                            <ScrollArea className="h-[calc(100vh-280px)]">
                                <div className="space-y-6 pb-10">
                                    {FEATURE_REGISTRY.filter(f => f.category === cat.id).map(feature => (
                                        <FeatureMatrix key={feature.id} feature={feature} />
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    ))}

                    {/* Content Access Mock UI */}
                    <TabsContent value="content-access" className="mt-0">
                        <Card className="rounded-3xl border-none bg-muted/30">
                            <CardHeader>
                                <CardTitle>{t("features:tabs.contentAccess.title")}</CardTitle>
                                <CardDescription>{t("features:tabs.contentAccess.description")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {config.contentAccess?.classGroups.map(group => (
                                        <div key={group.id} className="bg-background p-4 rounded-2xl border flex items-center justify-between">
                                            <div>
                                                <p className="font-bold">{group.name}</p>
                                                <p className="text-xs text-muted-foreground">{t("features:tabs.contentAccess.stats", { students: group.studentIds.length, resources: group.accessibleResources.length })}</p>
                                            </div>
                                            <Button variant="ghost" size="sm">{t("common:actions.configure")}</Button>
                                        </div>
                                    ))}
                                    <Button className="w-full rounded-xl border-dashed" variant="outline">+ {t("features:actions.addAccessGroup")}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Webhooks Mock UI */}
                    <TabsContent value="webhooks" className="mt-0">
                        <Card className="rounded-3xl border-none bg-muted/30">
                            <CardHeader>
                                <CardTitle>{t("features:tabs.webhooks.title")}</CardTitle>
                                <CardDescription>{t("features:tabs.webhooks.description")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {config.webhooks?.map(webhook => (
                                        <div key={webhook.id} className="bg-background p-4 rounded-2xl border flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-2 w-2 rounded-full ${webhook.enabled ? "bg-primary" : "bg-muted"}`} />
                                                <div>
                                                    <p className="font-mono text-xs">{webhook.url}</p>
                                                    <div className="flex gap-1 mt-1">
                                                        {webhook.events.map(e => <Badge key={e} variant="secondary" className="text-[8px]">{e}</Badge>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Switch checked={webhook.enabled} />
                                        </div>
                                    ))}
                                    <Button className="w-full rounded-xl border-dashed" variant="outline">+ {t("features:actions.addWebhook")}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Parent Special Permissions UI */}
                    <TabsContent value="parent-special" className="mt-0">
                        <Card className="rounded-3xl border-none bg-muted/30">
                            <CardHeader>
                                <CardTitle>{t("features:tabs.parentSpecial.title")}</CardTitle>
                                <CardDescription>{t("features:tabs.parentSpecial.description")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-4 rounded-2xl flex items-start gap-3 mb-6">
                                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-semibold text-amber-900 dark:text-amber-200">{t("features:tabs.parentSpecial.notesTitle")}:</p>
                                        <p className="text-amber-800 dark:text-amber-300/80">
                                            {t("features:tabs.parentSpecial.notesMessage")}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-background rounded-2xl border">
                                        <div className="space-y-0.5">
                                            <p className="font-medium text-sm">{t("features:tabs.parentSpecial.options.viewOnly.title")}</p>
                                            <p className="text-xs text-muted-foreground">{t("features:tabs.parentSpecial.options.viewOnly.description")}</p>
                                        </div>
                                        <Switch checked={true} />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-background rounded-2xl border">
                                        <div className="space-y-0.5">
                                            <p className="font-medium text-sm">{t("features:tabs.parentSpecial.options.contactTeacher.title")}</p>
                                            <p className="text-xs text-muted-foreground">{t("features:tabs.parentSpecial.options.contactTeacher.description")}</p>
                                        </div>
                                        <Switch checked={true} />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-background rounded-2xl border">
                                        <div className="space-y-0.5">
                                            <p className="font-medium text-sm">{t("features:tabs.parentSpecial.options.autoAssign.title")}</p>
                                            <p className="text-xs text-muted-foreground">{t("features:tabs.parentSpecial.options.autoAssign.description")}</p>
                                        </div>
                                        <Switch checked={false} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
