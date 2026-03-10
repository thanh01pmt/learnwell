import React from "react";
import { useTranslation } from "react-i18next";
import { PaneWrapper } from "./PaneWrapper";
import { Play, RotateCcw, Monitor, Smartphone, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PreviewPane: React.FC = () => {
    const { t } = useTranslation("hub");
    return (
        <PaneWrapper
            title={t("editor.workspace.preview.coords.x").split(' ')[0] + " " + t("editor.workspace.preview.status")}
            icon={<Monitor className="h-4 w-4" />}
            actions={
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Smartphone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            }
        >
            <div className="h-full flex flex-col">
                {/* Preview Area */}
                <div className="flex-1 bg-slate-900 m-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                    {/* Mock Stage */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full animate-pulse border-2 border-primary/40 flex items-center justify-center">
                            <div className="w-10 h-10 bg-primary/60 rounded-full" />
                        </div>
                        <p className="absolute bottom-10 text-[10px] text-white/20 font-mono tracking-widest uppercase">Stage: LearnWell v1.0</p>
                    </div>

                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 fill-white" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-white/20 hover:bg-white/10 text-white">
                            <RotateCcw className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Stats / Metadata */}
                <div className="px-6 pb-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
                        <span>{t("editor.workspace.preview.status")}</span>
                        <span className="text-primary">{t("editor.workspace.preview.fps", { value: 60 })}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold">{t("editor.workspace.preview.coords.x")}</p>
                            <p className="text-sm font-black text-primary">124</p>
                        </div>
                        <div className="p-3 rounded-xl bg-card border border-border/50 text-center">
                            <p className="text-[10px] text-muted-foreground font-semibold">{t("editor.workspace.preview.coords.y")}</p>
                            <p className="text-sm font-black text-primary">-56</p>
                        </div>
                    </div>
                </div>
            </div>
        </PaneWrapper>
    );
};
