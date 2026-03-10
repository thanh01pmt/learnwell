import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Code2,
    Blocks,
    MousePointer2,
    ArrowRight,
    Sparkles,
    Layers,
    Cpu,
    Globe
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { AppLayout } from "@/components/layout/AppLayout";

const PlatformLauncher = () => {
    const { t } = useTranslation(["code", "common"]);
    const navigate = useNavigate();

    const platforms = [
        {
            id: "scratch",
            title: t('code:launcher.platforms.scratch.title'),
            description: t('code:launcher.platforms.scratch.description'),
            icon: MousePointer2,
            color: "bg-orange-500",
            lightColor: "bg-orange-50",
            borderColor: "border-orange-200",
            textColor: "text-orange-700",
            features: [
                t('code:launcher.platforms.scratch.features.drag_drop'),
                t('code:launcher.platforms.scratch.features.audio_visual'),
                t('code:launcher.platforms.scratch.features.community')
            ],
            path: "/code/scratch"
        },
        {
            id: "blockly",
            title: t('code:launcher.platforms.blockly.title'),
            description: t('code:launcher.platforms.blockly.description'),
            icon: Blocks,
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-700",
            features: [
                t('code:launcher.platforms.blockly.features.hardware'),
                t('code:launcher.platforms.blockly.features.preview'),
                t('code:launcher.platforms.blockly.features.logic')
            ],
            path: "/code/blockly"
        },
        {
            id: "webide",
            title: t('code:launcher.platforms.webide.title'),
            description: t('code:launcher.platforms.webide.description'),
            icon: Code2,
            color: "bg-indigo-600",
            lightColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
            textColor: "text-indigo-700",
            features: [
                t('code:launcher.platforms.webide.features.intellisense'),
                t('code:launcher.platforms.webide.features.multi_lang'),
                t('code:launcher.platforms.webide.features.pro_tools')
            ],
            path: "/code/ide"
        }
    ];

    return (
        <AppLayout>
            <div className="container max-w-6xl py-12 space-y-12 animate-fade-in">
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="px-3 py-1 mb-4 border-primary/30 text-primary bg-primary/5">
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            {t('code:launcher.badge')}
                        </Badge>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {t('code:launcher.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                            {t('code:launcher.description')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {platforms.map((platform, index) => (
                        <motion.div
                            key={platform.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                className={cn(
                                    "h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 group cursor-pointer overflow-hidden",
                                    "hover:-translate-y-2",
                                    platform.borderColor
                                )}
                                onClick={() => navigate(platform.path)}
                            >
                                <CardHeader className={cn("pb-8 relative", platform.lightColor)}>
                                    <div className={cn(
                                        "w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300",
                                        platform.color
                                    )}>
                                        <platform.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{platform.title}</CardTitle>
                                    <CardDescription className="text-muted-foreground mt-2 line-clamp-3 min-h-[4.5rem]">
                                        {platform.description}
                                    </CardDescription>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <platform.icon className="w-16 h-16" />
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 pt-6">
                                    <div className="space-y-3">
                                        {platform.features.map((feature, i) => (
                                            <div key={i} className="flex items-center text-sm text-foreground/80">
                                                <div className={cn("w-1.5 h-1.5 rounded-full mr-3", platform.color)} />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-2 border-t border-dashed">
                                    <Button
                                        className={cn("w-full group/btn", platform.color, "hover:opacity-90")}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(platform.path);
                                        }}
                                    >
                                        {t('common:actions.start_now')}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-muted/30 rounded-2xl p-8 border border-border mt-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-4">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Layers className="w-6 h-6 text-primary" />
                                {t('code:launcher.ai_path_title')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('code:launcher.ai_path_description')}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button variant="outline" className="rounded-full">
                                    {t('code:launcher.view_path')}
                                </Button>
                                <Button variant="link" className="text-primary font-semibold">
                                    {t('code:launcher.learn_more')}
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            <div className="bg-background p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('code:launcher.hardware')}</span>
                                <span className="text-sm font-medium">{t('code:launcher.microbit_support')}</span>
                            </div>
                            <div className="bg-background p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('code:launcher.connectivity')}</span>
                                <span className="text-sm font-medium">{t('code:launcher.web_api_support')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PlatformLauncher;
