import React, { useState, useEffect } from "react";
import {
    Puzzle,
    Play,
    RotateCcw,
    Trash2,
    Search,
    ZoomIn,
    ZoomOut,
    ChevronRight,
    Monitor,
    Layout,
    Cpu,
    Settings
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BlocklyPaneProps {
    onCodeChange?: (code: string) => void;
    hardwareProfile?: "microbit" | "arduino" | "default";
}

const BlocklyPane: React.FC<BlocklyPaneProps> = ({ hardwareProfile = "microbit" }) => {
    const { t } = useTranslation(["code", "common"]);
    const [activeTab, setActiveTab] = useState<"blocks" | "javascript" | "python">("blocks");
    const [isSimulating, setIsSimulating] = useState(false);

    return (
        <div className="flex flex-col h-full bg-background overflow-hidden border">
            {/* Blockly Top Toolbar */}
            <div className="h-11 bg-muted/40 border-b flex items-center justify-between px-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white">
                            <Puzzle className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm hidden md:inline-block">{t('code:blockly.brand')}</span>
                    </div>
                    <Separator orientation="vertical" className="h-5" />
                    <Tabs value={activeTab} onValueChange={(v: "blocks" | "javascript" | "python") => setActiveTab(v)} className="h-8">
                        <TabsList className="bg-transparent h-full p-0 gap-1">
                            <TabsTrigger value="blocks" className="h-7 text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t('code:blockly.tabs.blocks')}</TabsTrigger>
                            <TabsTrigger value="javascript" className="h-7 text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t('code:blockly.tabs.js')}</TabsTrigger>
                            <TabsTrigger value="python" className="h-7 text-xs px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{t('code:blockly.tabs.py')}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex items-center gap-2">
                    {hardwareProfile === "microbit" && (
                        <Badge variant="outline" className="gap-1.5 py-0.5 px-2 bg-success/5 border-success/20 text-success">
                            <Cpu className="w-3 h-3" />
                            {t('code:blockly.hardware')}
                        </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Settings className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-5 mx-1" />
                    <Button
                        variant={isSimulating ? "destructive" : "default"}
                        size="sm"
                        className="h-8 px-4 gap-1.5"
                        onClick={() => setIsSimulating(!isSimulating)}
                    >
                        {isSimulating ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        {isSimulating ? t('code:blockly.stop') : t('code:blockly.start')}
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Toolbox / Flyout simulation */}
                <div className="w-14 md:w-48 bg-card border-r flex flex-col shrink-0">
                    <div className="p-2 border-b bg-muted/20">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                            <input
                                placeholder={t('code:blockly.search_placeholder')}
                                className="w-full bg-background rounded-md pl-7 py-1.5 text-xs outline-none border focus:ring-1 focus:ring-primary hidden md:block"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-1 py-2 space-y-1">
                        {[
                            { name: "Logic", color: "bg-blue-500" },
                            { name: "Vòng lặp", color: "bg-green-500" },
                            { name: "Toán học", color: "bg-purple-500" },
                            { name: "Văn bản", color: "bg-indigo-500" },
                            { name: "Biến", color: "bg-red-500" },
                            { name: "Hàm", color: "bg-orange-500" },
                            { name: "Cảm biến", color: "bg-emerald-500", highlight: true }
                        ].map((cat) => (
                            <div key={cat.name} className="flex items-center p-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors group">
                                <div className={`w-3 h-3 rounded-full ${cat.color} shrink-0`} />
                                <span className="ml-3 text-xs font-medium hidden md:block flex-1">{cat.name}</span>
                                <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workspace */}
                <div className="flex-1 relative bg-muted/5">
                    {activeTab === "blocks" ? (
                        <>
                            {/* SVG Workspace pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-5">
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>

                            {/* Simulated Floating Blocks */}
                            <div className="absolute top-20 left-20 space-y-1 drop-shadow-sm select-none">
                                <div className="w-40 h-8 bg-blue-500 rounded-t-lg border-b-2 border-blue-700 flex items-center px-4 text-white text-[11px] font-bold">{t('code:blockly.mock.if_do')}</div>
                                <div className="w-40 h-16 bg-blue-500/10 border-2 border-blue-500 border-t-0 p-2 flex flex-col justify-end">
                                    <div className="w-full h-8 bg-green-500 rounded-lg border-b-2 border-green-700 flex items-center px-4 text-white text-[11px] font-bold">{t('code:blockly.mock.repeat')}</div>
                                </div>
                            </div>

                            {/* Workspace Controls */}
                            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                                <div className="flex items-center bg-card border rounded-lg shadow-sm">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 border-r"><ZoomIn className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9 border-r"><ZoomOut className="w-4 h-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9"><Layout className="w-4 h-4" /></Button>
                                </div>
                                <Button variant="destructive" size="icon" className="h-10 w-10 shadow-lg scale-110">
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 p-4 font-mono text-sm bg-card overflow-auto">
                            <div className="opacity-50 select-none pointer-events-none mb-4">{t('code:blockly.generated_code')}</div>
                            <pre className="text-primary">
                                {activeTab === "javascript" ? (
                                    `function start() {
  for (let i = 0; i < 10; i++) {
    basic.showString("Hello LearnWell");
  }
}`
                                ) : (
                                    `def on_start():
    for i in range(10):
        basic.show_string("Hello LearnWell")
        
on_start()`
                                )}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Simulator Overlay/Pane */}
                {isSimulating && (
                    <div className="w-80 bg-background border-l flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="h-11 border-b flex items-center px-4 font-bold text-xs uppercase tracking-widest text-muted-foreground bg-muted/20">
                            <Monitor className="w-3.5 h-3.5 mr-2" />
                            {t('code:blockly.simulator')}
                        </div>
                        <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-8">
                            {/* Microbit SVG Mockup */}
                            <div className="w-48 h-40 bg-[#1e1e1e] rounded-xl relative border-4 border-[#333] shadow-xl p-4 flex flex-col">
                                <div className="flex justify-between mb-4">
                                    <div className="w-6 h-6 rounded-full bg-[#f1c40f] flex items-center justify-center text-[10px] font-black">A</div>
                                    <div className="w-6 h-6 rounded-full bg-[#f1c40f] flex items-center justify-center text-[10px] font-black">B</div>
                                </div>
                                <div className="grid grid-cols-5 grid-rows-5 gap-2 flex-grow mx-4 mb-4">
                                    {[...Array(25)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.1, 0.8, 0.1] }}
                                            transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                                            className="bg-red-500 rounded-sm"
                                        />
                                    ))}
                                </div>
                                <div className="h-2 bg-[#333] rounded-full w-full mt-auto" />
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-medium">{t('code:blockly.battery')}</span>
                                    <span className="text-success font-bold">100%</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-medium">{t('code:blockly.accelerometer')}</span>
                                    <span className="text-foreground">{t('code:blockly.xyz_stats', { x: 0, y: 10, z: 0 })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlocklyPane;
