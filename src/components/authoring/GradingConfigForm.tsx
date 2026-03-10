import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Settings,
    Clock,
    Cpu,
    RotateCcw,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    Save,
    Wand2,
    Lock,
    Eye,
    Zap,
    Search
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface GradingConfig {
    engine: "static" | "diff" | "dynamic";
    time_limit_ms: number;
    memory_limit_kb: number;
    max_attempts: number;
    partial_credit: boolean;
    hide_test_cases: boolean;
    show_execution_log: boolean;
    scoring_mode: "weighted" | "all_or_nothing" | "progressive";
}

const GradingConfigForm = () => {
    const { t } = useTranslation(["authoring", "common"]);
    const [config, setConfig] = useState<GradingConfig>({
        engine: "static",
        time_limit_ms: 2000,
        memory_limit_kb: 131072,
        max_attempts: 5,
        partial_credit: true,
        hide_test_cases: true,
        show_execution_log: false,
        scoring_mode: "weighted"
    });

    return (
        <div className="space-y-6">
            <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Settings className="w-5 h-5 text-primary" />
                                {t("authoring:grading.title")}
                            </CardTitle>
                            <CardDescription>
                                {t("authoring:grading.description")}
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="h-6 gap-1 bg-yellow-500/5 text-yellow-600 border-yellow-200">
                            <Zap className="w-3 h-3" />
                            Standard Schema
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    {/* Engine Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'static' as const, title: t('authoring:grading.engine.static.title'), desc: t('authoring:grading.engine.static.desc'), icon: Search },
                            { id: 'diff' as const, title: t('authoring:grading.engine.diff.title'), desc: t('authoring:grading.engine.diff.desc'), icon: CheckCircle2 },
                            { id: 'dynamic' as const, title: t('authoring:grading.engine.dynamic.title'), desc: t('authoring:grading.engine.dynamic.desc'), icon: Cpu },
                        ].map((type) => (
                            <div
                                key={type.id}
                                onClick={() => setConfig({ ...config, engine: type.id })}
                                className={cn(
                                    "cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col gap-2",
                                    config.engine === type.id
                                        ? "border-primary bg-primary/5 shadow-inner"
                                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                                )}
                            >
                                <type.icon className={cn("w-5 h-5", config.engine === type.id ? "text-primary" : "text-muted-foreground")} />
                                <div className="font-bold text-sm">{type.title}</div>
                                <div className="text-[11px] text-muted-foreground font-medium leading-relaxed">{type.desc}</div>
                            </div>
                        ))}
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Performance Limits */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                <h3 className="font-bold text-sm uppercase tracking-wider">Giới hạn hiệu năng</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                                            <Clock className="w-3.5 h-3.5" />
                                            Thời gian thực thi (ms)
                                        </Label>
                                        <span className="text-sm font-black text-primary font-mono">{config.time_limit_ms}ms</span>
                                    </div>
                                    <Slider
                                        value={[config.time_limit_ms]}
                                        min={500}
                                        max={10000}
                                        step={500}
                                        onValueChange={([val]) => setConfig({ ...config, time_limit_ms: val })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                                            <Cpu className="w-3.5 h-3.5" />
                                            Bộ nhớ tối đa (KB)
                                        </Label>
                                        <span className="text-sm font-black text-primary font-mono">{config.memory_limit_kb.toLocaleString()} KB</span>
                                    </div>
                                    <Slider
                                        value={[config.memory_limit_kb]}
                                        min={32768}
                                        max={524288}
                                        step={32768}
                                        onValueChange={([val]) => setConfig({ ...config, memory_limit_kb: val })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Evaluation Logic */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                                <h3 className="font-bold text-sm uppercase tracking-wider">Quy tắc đánh giá</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground">{t('authoring:grading.scoring_mode')}</Label>
                                    <Select value={config.scoring_mode} onValueChange={(v: GradingConfig['scoring_mode']) => setConfig({ ...config, scoring_mode: v })}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weighted">{t('authoring:grading.modes.weighted')}</SelectItem>
                                            <SelectItem value="all_or_nothing">{t('authoring:grading.modes.all_or_nothing')}</SelectItem>
                                            <SelectItem value="progressive">{t('authoring:grading.modes.progressive')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground">Max Attempts</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            value={config.max_attempts}
                                            onChange={(e) => setConfig({ ...config, max_attempts: parseInt(e.target.value) })}
                                            className="h-9 font-mono"
                                        />
                                        <span className="text-xs text-muted-foreground italic">lần</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-bold">Tính điểm từng phần (Partial Credit)</span>
                                        <span className="text-[11px] text-muted-foreground">Cho phép học sinh nhận điểm lẻ nếu đạt một số test case.</span>
                                    </div>
                                    <Switch checked={config.partial_credit} onCheckedChange={(v) => setConfig({ ...config, partial_credit: v })} />
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-xs font-bold">Ẩn Test Case (Privacy)</span>
                                        <span className="text-[11px] text-muted-foreground">Học sinh không nhìn thấy nội dung đầu vào của test case bí mật.</span>
                                    </div>
                                    <Switch checked={config.hide_test_cases} onCheckedChange={(v) => setConfig({ ...config, hide_test_cases: v })} />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/50 border-t p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase cursor-pointer hover:underline">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Tài liệu hướng dẫn chấm điểm
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Xem trước JSON
                        </Button>
                        <Button className="gap-2 min-w-[120px]">
                            <Save className="w-4 h-4" />
                            Lưu cấu hình
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <Alert className="bg-indigo-50 border-indigo-200">
                <Wand2 className="h-4 w-4 text-indigo-600" />
                <AlertTitle className="text-indigo-800 font-bold">Gợi ý từ AI</AlertTitle>
                <AlertDescription className="text-indigo-700 text-sm">
                    Dựa trên bài toán này, cấu hình <strong>"Weighted"</strong> với <strong>2000ms</strong> là tối ưu nhất để tránh các vòng lặp vô hạn mà vẫn đảm bảo tính công bằng.
                </AlertDescription>
            </Alert>
        </div>
    );
};

const Separator = () => <div className="h-[1px] w-full bg-border" />;
const Badge = ({ children, variant = "outline", className }: { children: React.ReactNode, variant?: string, className?: string }) => (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black border uppercase leading-none", className)}>
        {children}
    </span>
);

export default GradingConfigForm;
