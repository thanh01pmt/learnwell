import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
    Save,
    Download,
    FileText,
    Settings,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { RoundManager } from "@/components/contests/RoundManager";
import { BoardManager } from "@/components/contests/BoardManager";
import { toast } from "sonner";

export default function ContestEditorPage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const { t } = useTranslation('contests');

    // Mock contest data
    const [contest, setContest] = useState({
        id: id || '',
        title: 'Kỳ thi Lập trình Hè 2026',
        description: 'Cuộc thi lập trình dành cho học sinh trung học phổ thông trên toàn quốc.',
        status: 'active',
        short_code: 'SUMMER26',
        settings: {
            scoringMode: 'highest',
            showHiddenTestCases: false,
        }
    });

    const getActiveTab = () => {
        if (location.pathname.endsWith('/rounds')) return 'rounds';
        if (location.pathname.endsWith('/boards')) return 'boards';
        return 'edit';
    };

    const handleSave = () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            toast.success(t('management.import.success'));
        }, 1000);
    };

    const exportJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contest, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `contest-${contest.short_code}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const activeTab = getActiveTab();

    return (
        <div className="space-y-6">
            {/* Header for Editor */}
            <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">{contest.title}</h2>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{contest.short_code}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportJson} className="gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('management.editor.exportJson')}</span>
                    </Button>
                    <Button size="sm" onClick={handleSave} disabled={saving} className="gap-2 bg-primary hover:bg-primary/90 min-w-[120px]">
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        <span>{saving ? t('management.editor.saving') : t('management.editor.saveChanges')}</span>
                    </Button>
                </div>
            </div>

            {activeTab === 'edit' && (
                <div className="grid gap-6">
                    <Card className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                        <CardHeader className="border-b border-border/50 bg-muted/20">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-secondary" />
                                <CardTitle className="text-lg">{t('management.editor.basicInfo')}</CardTitle>
                            </div>
                            <CardDescription>{t('management.editor.basicInfoDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.editor.titleLabel')}</Label>
                                <Input
                                    id="title"
                                    value={contest.title}
                                    onChange={(e) => setContest({ ...contest, title: e.target.value })}
                                    className="text-lg font-semibold bg-background/50 focus-visible:ring-primary/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.editor.descLabel')}</Label>
                                <Textarea
                                    id="description"
                                    value={contest.description}
                                    onChange={(e) => setContest({ ...contest, description: e.target.value })}
                                    rows={4}
                                    className="bg-background/50 focus-visible:ring-primary/30 resize-none leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.editor.statusLabel')}</Label>
                                    <Select
                                        value={contest.status}
                                        onValueChange={(v) => setContest({ ...contest, status: v })}
                                    >
                                        <SelectTrigger id="status" className="bg-background/50">
                                            <SelectValue placeholder={t('management.list.status.selectPlaceholder')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">{t('management.list.status.draft')}</SelectItem>
                                            <SelectItem value="scheduled">{t('management.list.status.scheduled')}</SelectItem>
                                            <SelectItem value="lobby">{t('management.list.status.lobby')}</SelectItem>
                                            <SelectItem value="active">{t('management.list.status.active')}</SelectItem>
                                            <SelectItem value="ended">{t('management.list.status.ended')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="code" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.editor.codeLabel')}</Label>
                                    <Input
                                        id="code"
                                        value={contest.short_code}
                                        disabled
                                        className="font-mono font-bold text-center tracking-widest bg-muted border-dashed"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                        <CardHeader className="border-b border-border/50 bg-muted/20">
                            <div className="flex items-center gap-2">
                                <Settings className="h-5 w-5 text-secondary" />
                                <CardTitle className="text-lg">{t('management.editor.rulesLabel')}</CardTitle>
                            </div>
                            <CardDescription>{t('management.editor.rulesDesc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            <div className="space-y-2">
                                <Label htmlFor="scoring" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.editor.scoringLabel')}</Label>
                                <Select
                                    value={contest.settings.scoringMode}
                                    onValueChange={(v) => setContest({
                                        ...contest,
                                        settings: { ...contest.settings, scoringMode: v }
                                    })}
                                >
                                    <SelectTrigger id="scoring" className="bg-background/50">
                                        <SelectValue placeholder={t('management.editor.scoringModePlaceholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="highest">{t('management.editor.scoring.highest')}</SelectItem>
                                        <SelectItem value="latest">{t('management.editor.scoring.latest')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50 transition-colors hover:bg-muted/80">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-bold">{t('management.editor.hiddenTestCases')}</Label>
                                    <p className="text-sm text-muted-foreground">{t('management.editor.hiddenTestCasesDesc')}</p>
                                </div>
                                <Switch
                                    checked={contest.settings.showHiddenTestCases}
                                    onCheckedChange={(v) => setContest({
                                        ...contest,
                                        settings: { ...contest.settings, showHiddenTestCases: v }
                                    })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'rounds' && (
                <RoundManager contestId={id || ''} />
            )}

            {activeTab === 'boards' && (
                <BoardManager contestId={id || ''} />
            )}
        </div>
    );
}
