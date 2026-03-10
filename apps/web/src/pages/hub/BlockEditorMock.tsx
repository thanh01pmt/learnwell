import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Play, Puzzle, Image as ImageIcon, Settings, Expand } from "lucide-react";

export default function BlockEditorMock() {
    const { t } = useTranslation("hub");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const projectType = searchParams.get("type") || "unknown";

    return (
        <div className="h-screen w-full flex flex-col bg-slate-100 dark:bg-slate-900 overflow-hidden font-sans">
            {/* Editor Header */}
            <header className="h-14 bg-indigo-600 dark:bg-indigo-900 text-white flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => navigate("/hub")}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="font-bold flex items-center gap-2">
                        <Puzzle className="w-5 h-5 text-indigo-300" />
                        {t("editor.blocks.title")}
                    </div>
                    <div className="h-4 w-px bg-white/30 mx-2" />
                    <span className="text-sm font-medium px-2 py-1 bg-white/10 rounded">{t("editor.blocks.project", { type: projectType.toUpperCase() })}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                        <Save className="w-4 h-4 mr-2" /> {t("editor.blocks.save")}
                    </Button>
                </div>
            </header>

            {/* Editor Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* Toolbox / Block Palette */}
                <div className="w-20 lg:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center lg:items-stretch overflow-y-auto">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 text-center lg:text-left">{t("editor.blocks.toolbox")}</div>
                    <div className="flex flex-col gap-2 p-2">
                        {["Events", "Control", "Motion", "Looks", "Sound", "Sensors"].map((cat, i) => (
                            <div key={i} className="flex flex-col lg:flex-row items-center gap-2 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer">
                                <div className={`w-4 h-4 rounded-full ${['bg-yellow-400', 'bg-orange-400', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500'][i]}`} />
                                <span className="text-sm font-medium hidden lg:block">{t(`editor.blocks.categories.${cat.toLowerCase()}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workspace */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-900 overflow-hidden relative" style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    <div className="absolute top-8 left-8 p-4 bg-yellow-400 text-yellow-950 font-bold rounded-xl rounded-tl-none shadow border-b-4 border-yellow-500">
                        {t("editor.blocks.code.whenClicked")} <Play className="w-4 h-4 inline mx-1" /> {t("editor.blocks.code.clicked")}
                    </div>
                    <div className="absolute top-24 left-8 p-4 bg-orange-400 text-orange-950 font-bold rounded-xl shadow border-b-4 border-orange-500">
                        {t("editor.blocks.code.forever")}
                        <div className="ml-4 mt-2 p-3 bg-blue-500 text-white rounded shadow-inner border-b-4 border-blue-600">
                            {t("editor.blocks.code.moveSteps")}
                        </div>
                    </div>
                </div>

                {/* Stage & Assets */}
                <div className="w-72 lg:w-96 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col">
                    {/* Stage Preview */}
                    <div className="p-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-100 dark:bg-slate-900">
                        <span className="text-sm font-bold">{t("editor.blocks.stage")}</span>
                        <div className="flex gap-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"><Play className="w-4 h-4 fill-current" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-100"><div className="w-3 h-3 bg-current" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8"><Expand className="w-4 h-4" /></Button>
                        </div>
                    </div>
                    <div className="aspect-video bg-sky-100 dark:bg-sky-900 border-b border-slate-200 dark:border-slate-800 relative flex items-center justify-center">
                        <div className="absolute text-4xl transform animate-bounce">🐧</div>
                    </div>

                    {/* Asset Library */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-500">{t("editor.blocks.actors")}</span>
                            <Button size="sm" variant="outline" className="h-7 text-xs"><ImageIcon className="w-3 h-3 mr-1" /> {t("editor.blocks.add")}</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex flex-col items-center justify-center border-2 border-indigo-500 shadow-sm cursor-pointer text-2xl relative">
                                <Settings className="w-3 h-3 absolute top-2 right-2 text-slate-400" />
                                🐧
                                <span className="text-xs font-medium mt-2 text-slate-700 dark:text-slate-300">{t("editor.blocks.penguin")}</span>
                            </div>
                            <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-indigo-300 cursor-pointer text-2xl relative">
                                <Settings className="w-3 h-3 absolute top-2 right-2 text-slate-400" />
                                🍎
                                <span className="text-xs font-medium mt-2 text-slate-700 dark:text-slate-300">{t("editor.blocks.apple")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
