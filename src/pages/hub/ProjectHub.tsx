import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Code2, Rocket, LibrarySquare, Cuboid, LocateFixed, Atom, CircuitBoard } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";

const projectTypes = [
    { id: "intro", title: "Intro", icon: <LibrarySquare className="w-8 h-8 mb-2" />, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { id: "game", title: "Game Design", icon: <Gamepad2 className="w-8 h-8 mb-2" />, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { id: "app", title: "App", icon: <LocateFixed className="w-8 h-8 mb-2" />, color: "bg-green-500/10 text-green-500 border-green-500/20" },
    { id: "stem", title: "STEM & AI", icon: <Rocket className="w-8 h-8 mb-2" />, color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    { id: "physics", title: "Physics Sim", icon: <Atom className="w-8 h-8 mb-2" />, color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
    { id: "robotics", title: "Robotics Sim", icon: <CircuitBoard className="w-8 h-8 mb-2" />, color: "bg-red-500/10 text-red-500 border-red-500/20" },
    { id: "algo", title: "Algorithm", icon: <Code2 className="w-8 h-8 mb-2" />, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
];

const codingModes = [
    { id: "block", title: "Block Coding", type: "block" },
    { id: "python", title: "Python", type: "text" },
    { id: "js", title: "JavaScript", type: "text" },
];

export default function ProjectHub() {
    const { t } = useTranslation("hub");
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<string | null>("block");

    const handleStart = () => {
        if (!selectedType || !selectedMode) return;

        // Determine the base editor type (Scratch vs Blockly/Text)
        // For this prototype, we'll route based on mode directly using EditorRedirect
        navigate(`/editor?type=${selectedType}&mode=${selectedMode}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AppHeader />

                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
                            <p className="text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Badge variant="outline" className="rounded-full w-6 h-6 flex items-center justify-center p-0">1</Badge>
                                {t("steps.type")}
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {projectTypes.map((pt) => (
                                    <Card
                                        key={pt.id}
                                        className={`cursor-pointer transition-all hover:scale-105 ${selectedType === pt.id ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-md'}`}
                                        onClick={() => setSelectedType(pt.id)}
                                    >
                                        <CardHeader className={`flex flex-col items-center justify-center text-center p-6 ${selectedType === pt.id ? pt.color : 'text-slate-600 dark:text-slate-400'}`}>
                                            {pt.icon}
                                            <CardTitle className="text-lg">{t(`projectTypes.${pt.id}`)}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {selectedType && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Badge variant="outline" className="rounded-full w-6 h-6 flex items-center justify-center p-0">2</Badge>
                                    {t("steps.mode")}
                                </h2>

                                <div className="flex flex-wrap gap-4">
                                    {codingModes.map((mode) => (
                                        <Card
                                            key={mode.id}
                                            className={`cursor-pointer min-w-[150px] transition-all ${selectedMode === mode.id ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                            onClick={() => setSelectedMode(mode.id)}
                                        >
                                            <CardContent className="p-4 flex items-center justify-center font-medium">
                                                {t(`modes.${mode.id}`)}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedType && selectedMode && (
                            <div className="pt-8 flex justify-end animate-in fade-in duration-300">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14" onClick={handleStart}>
                                    {t("actions.start")} <Rocket className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
