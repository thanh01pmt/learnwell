import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, Play, FileCode2, Terminal, FolderOpen, PanelRightOpen } from "lucide-react";

export default function TextEditorMock() {
    const { t } = useTranslation("hub");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const projectType = searchParams.get("type") || "unknown";
    const lang = searchParams.get("lang") || "text";

    return (
        <div className="h-screen w-full flex flex-col bg-slate-950 text-slate-300 overflow-hidden font-mono text-sm">
            {/* Editor Header */}
            <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800" onClick={() => navigate("/hub")}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="font-bold flex items-center gap-2 text-white">
                        <FileCode2 className="w-5 h-5 text-blue-400" />
                        {t("editor.ide.title")}
                    </div>
                    <div className="h-4 w-px bg-slate-700 mx-2" />
                    <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">
                        {projectType.toUpperCase()} - {lang === 'python' ? 'Python3' : lang.toUpperCase()}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30">
                        <Play className="w-4 h-4 mr-2" /> {t("editor.ide.run")}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <PanelRightOpen className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Editor Body */}
            <div className="flex-1 flex overflow-hidden">
                {/* File Explorer */}
                <div className="w-48 bg-slate-900 border-r border-slate-800 flex flex-col">
                    <div className="p-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <FolderOpen className="w-3 h-3" /> {t("editor.ide.files")}
                    </div>
                    <div className="flex flex-col text-sm mt-1">
                        <div className="px-4 py-1.5 bg-slate-800/50 text-blue-400 cursor-pointer border-l-2 border-blue-500">
                            {t("editor.ide.filenames.main", { ext: lang === 'python' ? 'py' : 'js' })}
                        </div>
                        <div className="px-4 py-1.5 text-slate-400 hover:bg-slate-800/50 cursor-pointer border-l-2 border-transparent">
                            {t("editor.ide.filenames.utils", { ext: lang === 'python' ? 'py' : 'js' })}
                        </div>
                        <div className="px-4 py-1.5 text-slate-400 hover:bg-slate-800/50 cursor-pointer border-l-2 border-transparent">
                            {lang === 'python' ? t("editor.ide.filenames.requirements") : t("editor.ide.filenames.package")}
                        </div>
                    </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                    {/* Tabs */}
                    <div className="flex h-10 bg-slate-900 border-b border-slate-800">
                        <div className="px-4 flex items-center bg-[#1e1e1e] border-t-2 border-blue-500 text-blue-400">
                            {t("editor.ide.filenames.main", { ext: lang === 'python' ? 'py' : 'js' })}
                        </div>
                    </div>
                    {/* Code View */}
                    <div className="flex-1 p-4 overflow-y-auto leading-relaxed text-[15px]">
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">1</span><span className="text-slate-500 italic">{t("editor.ide.code.comment")}</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">2</span><span className="text-purple-400">{t("editor.ide.code.def")}</span> <span className="text-blue-400">{t("editor.ide.code.main")}</span><span className="text-slate-300">():</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">3</span><span className="pl-8 text-slate-300">{t("editor.ide.code.print")}</span><span className="text-green-400">"{t("editor.ide.code.welcome")}{projectType}"</span><span className="text-slate-300">)</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">4</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">5</span><span className="text-purple-400">{t("editor.ide.code.if")}</span> <span className="text-slate-300">{t("editor.ide.code.name")}</span> <span className="text-green-400">{t("editor.ide.code.mainModule")}</span><span className="text-slate-300">:</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">6</span><span className="pl-8 text-slate-300">{t("editor.ide.code.callMain")}</span></div>
                        <div className="flex"><span className="w-8 text-slate-600 select-none text-right pr-4">7</span><span className="w-2 h-5 bg-blue-500/50 animate-pulse mt-0.5" /></div>
                    </div>
                </div>

                {/* Terminal / Tutorial Sidebar */}
                <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
                    {/* Tutorial Tab */}
                    <div className="h-1/2 border-b border-slate-800 flex flex-col">
                        <div className="p-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-950/50">{t("editor.ide.tutorial.title")}</div>
                        <div className="p-4 flex-1 overflow-y-auto font-sans text-slate-300 prose prose-invert prose-sm">
                            <h3 className="text-slate-200 mt-0">{t("editor.ide.tutorial.gettingStarted")}</h3>
                            <p>{t("editor.ide.tutorial.welcome")}</p>
                            <ul>
                                <li>{t("editor.ide.tutorial.step1")}</li>
                                <li>{t("editor.ide.tutorial.step2")}</li>
                                <li>{t("editor.ide.tutorial.step3")}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Terminal Tab */}
                    <div className="h-1/2 flex flex-col bg-[#1e1e1e]">
                        <div className="p-2 text-xs font-bold text-slate-500 flex items-center gap-2 bg-slate-900/50">
                            <Terminal className="w-3 h-3" /> {t("editor.ide.console.title")}
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto text-green-400 font-mono text-xs">
                            <div>$ {t("editor.ide.console.initializing")}</div>
                            <div>$ {t("editor.ide.console.loadingFile", { file: `main.${lang === 'python' ? 'py' : 'js'}` })}</div>
                            <div className="text-slate-500 mt-2">{t("editor.ide.console.ready")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
