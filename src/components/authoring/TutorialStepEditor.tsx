import React, { useState } from "react";
import {
    Type,
    Video,
    ImageIcon,
    Layout,
    Sparkles,
    Link as LinkIcon,
    Trash2,
    PlusCircle,
    GripHorizontal,
    ChevronDown,
    Info
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const TutorialStepEditor = () => {
    const { t } = useTranslation(["authoring", "common"]);
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('authoring:tutorials.step_title')}</Label>
                        <Input placeholder={t('authoring:tutorials.step_title_placeholder')} className="font-bold border-2" />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('authoring:tutorials.content_type')}</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'video', label: t('authoring:tutorials.types.video'), icon: Video },
                                { id: 'info', label: t('authoring:tutorials.types.theory'), icon: Type },
                                { id: 'task', label: t('authoring:tutorials.types.practice'), icon: Layout },
                            ].map((item) => (
                                <Button key={item.id} variant="outline" className="h-20 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 border-2">
                                    <item.icon className="w-5 h-5 text-primary" />
                                    <span className="text-xs font-bold">{item.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Media Link */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('authoring:tutorials.media_url')}</Label>
                        <div className="flex gap-2">
                            <Input placeholder="https://youtube.com/..." className="font-mono text-xs border-2" />
                            <Button size="icon" variant="secondary" className="shrink-0 h-10 w-10"><LinkIcon className="w-4 h-4" /></Button>
                        </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold">{t('authoring:tutorials.auto_thumbnail')}</span>
                                <span className="text-[10px] text-muted-foreground font-medium">{t('authoring:tutorials.auto_thumbnail_desc')}</span>
                            </div>
                        </div>
                        <Switch />
                    </div>
                </div>
            </div>

            <Separator />

            {/* Rich Content Editor Placeholder */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{t('authoring:tutorials.detailed_content')}</Label>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('authoring:tutorials.ai_rewrite')}
                    </Button>
                </div>
                <div className="min-h-[200px] border-2 rounded-xl p-4 bg-background shadow-inner relative group">
                    <Textarea
                        placeholder={t('authoring:tutorials.markdown_placeholder')}
                        className="border-none shadow-none focus-visible:ring-0 min-h-[160px] resize-none text-sm font-medium leading-relaxed"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-1 px-2 rounded bg-muted text-[10px] font-black uppercase cursor-help">{t('authoring:tutorials.markdown_supported')}</div>
                    </div>
                </div>
            </div>

            {/* Checklist Editor for TASKS */}
            <div className="space-y-4 bg-muted/20 p-6 rounded-2xl border">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                            <PlusCircle className="w-4 h-4 text-primary" />
                            {t('authoring:tutorials.tasks_list')}
                        </h4>
                        <p className="text-[10px] text-muted-foreground font-medium">{t('authoring:tutorials.tasks_desc')}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-2 font-bold bg-background shadow-sm">
                        <PlusCircle className="w-3.5 h-3.5" />
                        {t('authoring:tutorials.add_task')}
                    </Button>
                </div>

                <div className="space-y-2">
                    {[1, 2].map(i => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg border group shadow-sm hover:border-primary transition-colors">
                            <GripHorizontal className="w-4 h-4 text-muted-foreground opacity-30 cursor-move group-hover:opacity-100" />
                            <Input defaultValue={i === 1 ? "Gắn khối lệnh Di chuyển 10 bước." : "Kết nối vào khối lệnh Khi nhấn vào 🚩."} className="h-8 text-xs font-semibold border-none shadow-none focus-visible:ring-0" />
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                    <strong>{t('authoring:tutorials.tip')}:</strong> {t('authoring:tutorials.tip_desc')}
                </p>
            </div>
        </div>
    );
};

const Separator = () => <div className="h-[1px] w-full bg-border" />;

export default TutorialStepEditor;
