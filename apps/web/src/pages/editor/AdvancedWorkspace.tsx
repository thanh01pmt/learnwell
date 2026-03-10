import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WorkspaceLayout } from "@/components/editor/WorkspaceLayout";
import { TutorialPane } from "@/components/editor/TutorialPane";
import { CodePane } from "@/components/editor/CodePane";
import { PreviewPane } from "@/components/editor/PreviewPane";
import { ConsolePane } from "@/components/editor/ConsolePane";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Save, Settings, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdvancedWorkspace: React.FC = () => {
    const { t } = useTranslation("hub");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const projectType = searchParams.get("type") || "Intro";
    const codingMode = searchParams.get("mode") || "Block";

    return (
        <div className="flex flex-col h-screen w-screen bg-background overflow-hidden">
            {/* Workspace Header */}
            <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/hub")} className="rounded-full h-8 w-8">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="h-6 w-[1px] bg-border mx-1" />
                    <div className="flex flex-col">
                        <h1 className="text-sm font-black tracking-tight flex items-center gap-2">
                            {t("editor.workspace.header.project", { type: projectType })}
                            <Badge variant="outline" className="text-[10px] h-4 bg-primary/5 text-primary border-primary/20 px-1.5 uppercase font-bold">
                                {codingMode}
                            </Badge>
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-medium italic">{t("editor.workspace.header.lastSaved", { time: "2" })}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-bold gap-1.5 hidden sm:flex">
                        <Save className="h-3.5 w-3.5" /> {t("editor.workspace.header.save")}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-bold gap-1.5 hidden sm:flex border-primary/20 text-primary">
                        <Share2 className="h-3.5 w-3.5" /> {t("editor.workspace.header.share")}
                    </Button>
                    <div className="h-6 w-[1px] bg-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <UserCircle className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            {/* Main Workspace Area (The 4 Panes) */}
            <main className="flex-1 min-h-0">
                <WorkspaceLayout
                    tutorial={<TutorialPane />}
                    editor={<CodePane />}
                    preview={<PreviewPane />}
                    console={<ConsolePane />}
                />
            </main>
        </div>
    );
};

export default AdvancedWorkspace;
