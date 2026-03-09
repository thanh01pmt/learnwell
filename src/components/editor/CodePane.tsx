import React, { useState } from "react";
import { PaneWrapper } from "./PaneWrapper";
import { Wand2, Zap, Code2, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export const CodePane: React.FC = () => {
    const { t } = useTranslation("hub");
    const [viewMode, setViewMode] = useState<"block" | "text">("block");

    return (
        <PaneWrapper
            title={t("editor.workspace.code.modes.block")}
            icon={viewMode === "block" ? <Blocks className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
            actions={
                <div className="flex items-center gap-2">
                    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "block" | "text")} className="h-7">
                        <TabsList className="h-7 bg-muted/50 p-0.5 rounded-lg border border-border/50">
                            <TabsTrigger value="block" className="h-6 text-[10px] rounded-md px-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                                {t("editor.workspace.code.modes.block")}
                            </TabsTrigger>
                            <TabsTrigger value="text" className="h-6 text-[10px] rounded-md px-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                                {t("editor.workspace.code.modes.text")}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Button variant="outline" size="sm" className="h-7 px-2 rounded-lg gap-1 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary group">
                        <Zap className="h-3 w-3 fill-primary group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold">{t("editor.workspace.code.run")}</span>
                    </Button>
                </div>
            }
        >
            <div className="h-full w-full bg-slate-100 dark:bg-[#0f1117] flex items-center justify-center p-8 overflow-hidden">
                {viewMode === "block" ? (
                    <div className="w-full h-full border-2 border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center text-center p-10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                            <Blocks className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-black mb-2 tracking-tight">{t("editor.workspace.code.placeholder.title")}</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">{t("editor.workspace.code.placeholder.desc")}</p>
                    </div>
                ) : (
                    <div className="w-full h-full font-mono text-sm p-4 bg-slate-950 text-slate-300 rounded-xl border border-white/5 overflow-auto">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-[10px] text-white/20 ml-2">{t("editor.workspace.code.mock.filename")}</span>
                        </div>
                        <span className="text-blue-400">{"import"}</span>{" learnwell"}<br />
                        <br />
                        <span className="text-purple-400">{"def"}</span> <span className="text-yellow-400">{"on_start"}</span>{"():"}<br />
                        {"  learnwell."}<span className="text-green-400">{"move"}</span>{"("}<span className="text-orange-400">{10}</span>{")"}<br />
                        {"  learnwell."}<span className="text-green-400">{"say"}</span>{"(\""}<span className="text-orange-400">{t("editor.workspace.code.mock.greeting")}</span>{"\")"}<br />
                        <br />
                        <span className="text-slate-500">{"# "}{t("editor.workspace.code.placeholder.desc")}</span>
                    </div>
                )}

                {/* Floating Tooltips or AI Button */}
                <div className="absolute bottom-4 right-4 group">
                    <Button size="icon" className="h-12 w-12 rounded-2xl shadow-xl shadow-primary/20 hover:scale-110 transition-transform bg-primary">
                        <Wand2 className="h-6 w-6 text-white" />
                    </Button>
                    <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-popover text-popover-foreground text-[10px] font-bold px-3 py-1 rounded-lg border border-border shadow-lg whitespace-nowrap">
                            {t("editor.workspace.code.ai.ready")}
                        </div>
                    </div>
                </div>
            </div>
        </PaneWrapper>
    );
};
