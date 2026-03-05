import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
    Lightbulb,
    Info,
    Code2,
    Lock,
    Sparkles,
    ChevronRight,
    CheckCircle2,
    ShieldAlert,
    Zap,
    Star,
    Loader2
} from 'lucide-react';


import { motion, AnimatePresence } from 'framer-motion';

interface Hint {
    level: 1 | 2 | 3;
    title: string;
    content: string;
    type: 'subtle' | 'specific' | 'code';
    cost?: string;
}

export const ProgressiveHints: React.FC = () => {
    const { t } = useTranslation(["code", "common"]);
    const [hintLevel, setHintLevel] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);


    const hints: Hint[] = [
        {
            level: 1,
            title: t("code:ide.hints.levels.subtle"),
            content: t("code:ide.hints.mock.h1"),
            type: 'subtle',
            cost: t("code:ide.hints.levels.free")
        },
        {
            level: 2,
            title: t("code:ide.hints.levels.specific"),
            content: t("code:ide.hints.mock.h2"),
            type: 'specific',
            cost: t("code:ide.hints.levels.free")
        },
        {
            level: 3,
            title: t("code:ide.hints.levels.code"),
            content: t("code:ide.hints.mock.h3"),
            type: 'code',
            cost: t("code:ide.hints.levels.penalty", { count: 10 })
        }
    ];


    const handleRunReview = () => {
        setIsReviewing(true);
        setTimeout(() => {
            setIsReviewing(false);
            setShowReview(true);
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <Card className="border-none shadow-none bg-background/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="p-4 border-b bg-muted/30 flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                            <Lightbulb className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-semibold">{t("code:ide.hints.header.title")}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{t("code:ide.hints.header.ready", { count: 3 })}</span>
                    </div>

                </CardHeader>

                <CardContent className="p-4 space-y-4">
                    <div className="space-y-3">
                        {hints.map((hint, idx) => (
                            <div key={idx} className="relative">
                                <AnimatePresence>
                                    {hintLevel >= hint.level ? (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <Badge variant={hint.type === 'code' ? 'destructive' : 'outline'} className="text-[10px] h-5">
                                                    {t("code:ide.hints.levels.level", { count: hint.level })} - {t(`code:ide.hints.levels.${hint.type}`).toUpperCase()}
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground">{hint.cost}</span>

                                            </div>
                                            <Alert className={`bg-background/80 ${hint.type === 'code' ? 'border-destructive/20' : 'border-primary/10'}`}>
                                                <div className="flex gap-2">
                                                    {hint.type === 'subtle' && <Info className="w-4 h-4 text-blue-500 mt-0.5" />}
                                                    {hint.type === 'specific' && <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5" />}
                                                    {hint.type === 'code' && <Code2 className="w-4 h-4 text-destructive mt-0.5" />}
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-[11px] font-medium leading-normal">
                                                            {hint.content.split('\n').map((line, i) => (
                                                                <span key={i} className="block">{line}</span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Alert>
                                        </motion.div>
                                    ) : (
                                        <div className="group relative">
                                            <div className="absolute inset-0 bg-muted/20 backdrop-blur-[2px] rounded-lg z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="h-7 text-[10px] gap-1"
                                                    onClick={() => setHintLevel(hint.level)}
                                                    disabled={hintLevel !== hint.level - 1}
                                                >
                                                    <Lock className="w-3 h-3" />
                                                    {hint.type === 'code'
                                                        ? t("code:ide.hints.actions.unlockPenalty", { count: hint.level })
                                                        : t("code:ide.hints.actions.unlock", { count: hint.level })}
                                                </Button>

                                            </div>
                                            <div className="p-3 border border-dashed rounded-lg flex items-center justify-between grayscale opacity-50">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="text-[10px]">{t("code:ide.hints.levels.level", { count: hint.level })}</Badge>
                                                    <span className="text-[11px]">{t("code:ide.hints.actions.placeholder", { count: hint.level })}</span>
                                                </div>

                                                <Lock className="w-3 h-3 text-muted-foreground" />
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="p-4 border-t bg-muted/10 grid grid-cols-1 gap-3">
                    <Button
                        variant="default"
                        className="w-full h-9 text-xs gap-2 group relative overflow-hidden"
                        onClick={handleRunReview}
                        disabled={isReviewing}
                    >
                        {isReviewing ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                {t("code:ide.hints.actions.analyzing")}
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-3.5 h-3.5" />
                                {t("code:ide.hints.actions.checkAction")}
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </>
                        )}

                    </Button>
                    <p className="text-[9px] text-center text-muted-foreground">
                        {t("code:ide.hints.badges.notUsed")}
                    </p>

                </CardFooter>
            </Card>

            {/* Review Modal Mockup */}
            <AnimatePresence>
                {showReview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-lg bg-card border rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                                <h3 className="font-bold">{t("code:ide.hints.review.title")}</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowReview(false)}>

                                    ×
                                </Button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                    <div className="relative">
                                        <svg className="w-20 h-20 transform -rotate-90">
                                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                                            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 * (1 - 0.85)} className="text-primary" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">85</div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-1">{t("code:ide.hints.review.excellent")}</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {t("code:ide.hints.review.description")}
                                        </p>
                                    </div>

                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: t("code:ide.hints.review.correctness"), value: 100, color: 'bg-green-500', icon: CheckCircle2 },
                                        { label: t("code:ide.hints.review.efficiency"), value: 70, color: 'bg-amber-500', icon: Zap },
                                        { label: t("code:ide.hints.review.style"), value: 85, color: 'bg-blue-500', icon: Star },
                                    ].map((item, i) => (

                                        <div key={i} className="space-y-1.5">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <item.icon className="w-3.5 h-3.5 opacity-70" />
                                                    {item.label}
                                                </span>
                                                <span>{item.value}%</span>
                                            </div>
                                            <Progress value={item.value} className="h-1.5" />
                                        </div>
                                    ))}
                                </div>

                                <Alert className="bg-amber-500/5 border-amber-500/20">
                                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                                    <AlertDescription className="text-xs">
                                        <span className="font-semibold text-amber-500 underline decoration-amber-500/30 mr-1">{t("code:ide.hints.review.tipHighlight")}</span>
                                        {t("code:ide.hints.review.tip")}
                                    </AlertDescription>

                                </Alert>

                            </div>

                            <div className="p-4 border-t bg-muted/30 flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setShowReview(false)}>{t("code:ide.hints.review.close")}</Button>
                                <Button size="sm">{t("code:ide.hints.review.viewSolution")}</Button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
