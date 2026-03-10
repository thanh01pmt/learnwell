import React, { useState } from "react";
import {
    Plus,
    Video,
    FileText,
    Settings,
    Save,
    Play,
    ChevronRight,
    GripVertical,
    Trash2,
    Image as ImageIcon,
    Layout,
    Link as LinkIcon
} from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import TutorialStepEditor from "../../components/authoring/TutorialStepEditor";

const TutorialBuilder = () => {
    const { t } = useTranslation(["authoring", "common"]);
    const [steps, setSteps] = useState([
        { id: "1", title: "Giới thiệu", type: "video" },
        { id: "2", title: "Thực hành biến số", type: "lab" },
    ]);

    return (
        <div className="container py-8 max-w-7xl space-y-8">
            <div className="flex justify-between items-end border-b pb-6">
                <div className="space-y-1">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 mb-2 font-black uppercase text-[10px]">{t('authoring:tutorials.badge')}</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight">{t('authoring:tutorials.builder_title')}</h1>
                    <p className="text-muted-foreground text-sm font-medium">{t('authoring:tutorials.builder_subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2"><Settings className="w-4 h-4" /> {t('authoring:tutorials.config_root')}</Button>
                    <Button className="gap-2 px-8"><Save className="w-4 h-4" /> {t('common:actions.publish')}</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Steps Sidebar */}
                <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                        {t('authoring:tutorials.steps_list')}
                        <Badge variant="secondary" className="h-5">{steps.length}</Badge>
                    </h3>

                    <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-2">
                        {steps.map((step, index) => (
                            <Reorder.Item key={step.id} value={step}>
                                <div className="group flex items-center gap-2 p-3 rounded-xl border bg-card hover:border-primary transition-all cursor-move shadow-sm">
                                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100" />
                                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-black">{index + 1}</span>
                                    <div className="flex-1 space-y-0.5 overflow-hidden">
                                        <div className="text-xs font-bold truncate">{step.title}</div>
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            {step.type === 'video' ? <Video className="w-2.5 h-2.5" /> : <Layout className="w-2.5 h-2.5" />}
                                            <span className="text-[9px] uppercase font-black">{step.type}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></Button>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

                    <Button variant="outline" className="w-full border-dashed gap-2 py-6 text-muted-foreground hover:text-primary transition-colors" onClick={() => setSteps([...steps, { id: Date.now().toString(), title: t('authoring:tutorials.add_step'), type: "lab" }])}>
                        <Plus className="w-4 h-4" />
                        {t('authoring:tutorials.add_step')}
                    </Button>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-2 border-primary/5 shadow-md">
                        <CardHeader className="bg-muted/10 border-b flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">{t('authoring:tutorials.editor_title', { title: steps[0]?.title })}</CardTitle>
                            <div className="flex gap-2">
                                <Button size="sm" variant="ghost"><Play className="w-3.5 h-3.5 mr-2" /> {t('authoring:tutorials.preview_step')}</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <TutorialStepEditor />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-indigo-50/30 border-indigo-100 flex flex-col justify-center p-6 space-y-3 cursor-pointer hover:bg-indigo-50 transition-colors border-2">
                            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                                <LinkIcon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm">{t('authoring:tutorials.template_link')}</h4>
                                <p className="text-xs text-muted-foreground italic truncate">{"pj_8291_starter_kit_python"}</p>
                            </div>
                        </Card>
                        <Card className="bg-emerald-50/30 border-emerald-100 flex flex-col justify-center p-6 space-y-3 cursor-pointer hover:bg-emerald-50 transition-colors border-2">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                                <Play className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm">{t('authoring:tutorials.video_intro')}</h4>
                                <p className="text-xs text-muted-foreground italic">{"https://youtu.be/v282_tutorial"}</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorialBuilder;
