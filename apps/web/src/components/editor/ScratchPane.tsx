import React, { useState, useEffect } from "react";
import { Loader2, Monitor, Code, Play, Square, Save, Download, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ScratchPaneProps {
    projectId?: string;
    initialData?: Record<string, unknown>;
    onSave?: (data: Record<string, unknown>) => void;
    onExport?: () => void;
}

/**
 * ScratchPane Component
 * 
 * This component provides the interface for Scratch 3 integration.
 * In a real implementation, it would use scratch-gui and scratch-vm.
 * For this scaffold, we provide the layout and state management.
 */
const ScratchPane: React.FC<ScratchPaneProps> = ({
    projectId,
    initialData,
    onSave,
    onExport
}) => {
    const { t } = useTranslation(["code", "common"]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [mode, setMode] = useState<"edit" | "preview">("edit");

    useEffect(() => {
        // Simulate engine loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate saving process
        setTimeout(() => {
            setIsSaving(false);
            onSave?.({ version: "3.0", lastModified: new Date().toISOString() });
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-[#f9f9f9] overflow-hidden">
            {/* Scratch Toolbar */}
            <div className="h-12 bg-[#4d97ff] flex items-center justify-between px-4 border-b border-[#3d87ef] shrink-0">
                <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-2 font-bold">
                        <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center border border-white/30">
                            <span className="text-white text-lg">S</span>
                        </div>
                        <span>{t('common:brand.scratch')}</span>
                    </div>
                    <div className="h-6 w-[1px] bg-white/20 mx-2" />
                    <Badge variant="outline" className="border-white/30 text-white bg-white/10 uppercase tracking-widest text-[10px]">
                        {t('common:brand.beta')}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/20 h-8 gap-2"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    <span className="hidden sm:inline">{t('common:actions.save')}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('code:scratch.tooltips.save')}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white hover:bg-white/20 h-8"
                                    onClick={onExport}
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('code:scratch.tooltips.export')}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('code:scratch.tooltips.share')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="h-6 w-[1px] bg-white/20 mx-2" />

                    <div className="flex p-0.5 bg-white/10 rounded-md border border-white/20">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-3 text-xs gap-1.5 transition-all ${mode === "edit" ? "bg-white text-[#4d97ff] shadow-sm" : "text-white hover:bg-white/10"}`}
                            onClick={() => setMode("edit")}
                        >
                            <Code className="w-3.5 h-3.5" />
                            {t('common:actions.edit')}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 px-3 text-xs gap-1.5 transition-all ${mode === "preview" ? "bg-white text-[#4d97ff] shadow-sm" : "text-white hover:bg-white/10"}`}
                            onClick={() => setMode("preview")}
                        >
                            <Monitor className="w-3.5 h-3.5" />
                            {t('common:actions.preview')}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex-1 relative bg-[#f0f0f0]">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-10 h-10 text-[#4d97ff] animate-spin" />
                        <p className="text-muted-foreground font-medium">{t('code:scratch.loading')}</p>
                    </div>
                ) : (
                    <div className="h-full flex overflow-hidden">
                        {/* Mock Sidebar/Blocks area */}
                        <div className="w-64 bg-white border-r border-[#e0e0e0] flex-col overflow-y-auto hidden md:flex shrink-0">
                            <div className="p-3 border-b border-[#e0e0e0] bg-[#f9f9f9] sticky top-0">
                                <div className="flex flex-wrap gap-2">
                                    {['Chuyển động', 'Hiển thị', 'Âm thanh', 'Sự kiện', 'Điều khiển', 'Cảm biến'].map((cat) => (
                                        <Badge key={cat} variant="secondary" className="cursor-pointer hover:bg-primary/10 text-[10px] px-2 py-0">
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-4 flex flex-col items-center space-y-4">
                                {/* Visual indicator of blocks */}
                                <div className="w-full h-12 bg-blue-500 rounded-lg shadow-sm flex items-center px-4 text-white text-xs font-bold border-b-4 border-blue-700">{t('code:scratch.blocks.move')}</div>
                                <div className="w-full h-12 bg-purple-500 rounded-lg shadow-sm flex items-center px-4 text-white text-xs font-bold border-b-4 border-purple-700">{t('code:scratch.blocks.say')}</div>
                                <div className="w-full h-12 bg-yellow-500 rounded-lg shadow-sm flex items-center px-4 text-black/80 text-xs font-bold border-b-4 border-yellow-600">{t('code:scratch.blocks.when_flag')}</div>
                                <div className="w-full h-16 bg-orange-500 rounded-lg shadow-sm p-3 text-white text-xs font-bold border-b-4 border-orange-700 flex flex-col justify-between">
                                    <span>{t('code:scratch.blocks.if_then')}</span>
                                    <div className="w-1/2 h-4 bg-white/20 rounded-sm"></div>
                                </div>
                            </div>
                        </div>

                        {/* Canvas/Engine Area */}
                        <div className={`flex-1 flex flex-col h-full ${mode === "preview" ? "items-center justify-center p-8 bg-black/5" : ""}`}>
                            {mode === "edit" ? (
                                <div className="flex-1 bg-white relative">
                                    {/* Grid background for editor */}
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/30 flex flex-col items-center">
                                        <MousePointer2 className="w-24 h-24 mb-4" />
                                        <span className="text-xl font-bold italic tracking-widest uppercase">{t('code:scratch.workspace_area')}</span>
                                    </div>
                                </div>
                            ) : (
                                <Card className="w-full max-w-[640px] aspect-[4/3] bg-white shadow-2xl relative overflow-hidden flex flex-col border-4 border-border">
                                    <div className="h-10 bg-muted/50 border-b border-border flex items-center justify-between px-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:bg-success/10">
                                                <Play className="w-5 h-5 fill-current" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                                <Square className="w-5 h-5 fill-current" />
                                            </Button>
                                        </div>
                                        <Badge variant="outline">{t('code:scratch.stage_size')}</Badge>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center bg-[#f9f9f9]">
                                        {/* Scratch Cat Placeholder */}
                                        <motion.div
                                            animate={{
                                                x: [0, 50, -50, 0],
                                                rotate: [0, 10, -10, 0]
                                            }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-32 h-32 text-[#4d97ff]"
                                        >
                                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                                                <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 M35 40 A5 5 0 0 1 45 40 A5 5 0 0 1 35 40 M55 40 A5 5 0 0 1 65 40 A5 5 0 0 1 55 40 M50 60 Q60 70 70 60" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Sprites Area */}
                        <div className="w-72 bg-white border-l border-[#e0e0e0] flex-col hidden lg:flex">
                            <div className="h-10 bg-muted/40 border-b border-[#e0e0e0] flex items-center px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">{t('code:scratch.sprites_area')}</div>
                            <div className="flex-1 p-3 grid grid-cols-3 gap-2 auto-rows-min overflow-y-auto">
                                <div className="aspect-square bg-blue-50 border-2 border-primary rounded-lg flex flex-col items-center justify-center p-2">
                                    <div className="w-10 h-10 bg-white rounded-md shadow-sm border border-primary/20" />
                                    <span className="text-[10px] mt-1 font-bold truncate w-full text-center">{t('code:scratch.sprites.cat')}</span>
                                </div>
                                <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center p-2 opacity-50">
                                    <div className="w-10 h-10 bg-white rounded-md shadow-sm border border-border" />
                                    <span className="text-[10px] mt-1 truncate w-full text-center">{t('code:scratch.sprites.sprite2')}</span>
                                </div>
                                <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors cursor-pointer">
                                    <Plus className="w-6 h-6 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const MousePointer2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
    </svg>
);

export default ScratchPane;
