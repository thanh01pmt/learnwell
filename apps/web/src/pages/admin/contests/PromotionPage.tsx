import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Trophy,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ChevronRight,
    Filter,
    ArrowLeft
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Candidate {
    id: string;
    display_name: string;
    username: string;
    total_score: number;
    rank: number;
    status: 'qualified' | 'on-hold';
}

export default function PromotionPage() {
    const { id: contestId } = useParams<{ id: string }>();
    const [promoting, setPromoting] = useState(false);
    const [sourceRound, setSourceRound] = useState('r1');
    const [targetRound, setTargetRound] = useState('r2');
    const [targetBoard, setTargetBoard] = useState('b1');
    const { t } = useTranslation('contests');

    // Mock candidates data
    const [candidates, setCandidates] = useState<Candidate[]>([
        {
            id: 'c1',
            display_name: 'Nguyễn Văn A',
            username: 'ts001',
            total_score: 450,
            rank: 1,
            status: 'qualified'
        },
        {
            id: 'c2',
            display_name: 'Trần Thị B',
            username: 'ts002',
            total_score: 420,
            rank: 2,
            status: 'qualified'
        },
        {
            id: 'c3',
            display_name: 'Lê Văn C',
            username: 'ts005',
            total_score: 380,
            rank: 3,
            status: 'qualified'
        }
    ]);

    const executePromotion = () => {
        setPromoting(true);
        setTimeout(() => {
            setPromoting(false);
            toast.success(t('management.promotion.success', { count: candidates.length }));
        }, 1500);
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold tracking-tight">{t('management.promotion.title')}</h2>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{t('management.promotion.subtitle')}</p>
                </div>
            </div>

            {/* Promotion Config */}
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] items-end gap-6">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.sourceRound')}</Label>
                        <Select value={sourceRound} onValueChange={setSourceRound}>
                            <SelectTrigger className="bg-background/50 h-10">
                                <SelectValue placeholder={t('management.promotion.roundPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="r1">{t('management.rounds.r1')}</SelectItem>
                                <SelectItem value="r2">{t('management.rounds.r2')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="h-10 flex items-center justify-center text-muted-foreground/50 pb-1">
                        <ArrowRight className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.targetRound')}</Label>
                        <Select value={targetRound} onValueChange={setTargetRound}>
                            <SelectTrigger className="bg-background/50 h-10 border-primary/20">
                                <SelectValue placeholder={t('management.promotion.roundPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="r2">{t('management.rounds.r2')}</SelectItem>
                                <SelectItem value="r3">{t('management.rounds.r3')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-amber-600">{t('management.promotion.targetBoard')}</Label>
                        <Select value={targetBoard} onValueChange={setTargetBoard}>
                            <SelectTrigger className="bg-background/50 h-10 border-amber-500/20">
                                <SelectValue placeholder={t('management.promotion.boardPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="b1">{t('management.boards.b1')}</SelectItem>
                                <SelectItem value="b2">{t('management.boards.b2')}</SelectItem>
                                <SelectItem value="b3">{t('management.boards.b3')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Candidates List */}
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                <CardHeader className="py-5 px-6 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-bold">{t('management.promotion.proposalTitle')}</CardTitle>
                            <CardDescription className="text-xs">{t('management.promotion.proposalDesc', { count: candidates.length, round: t('management.rounds.r1') })}</CardDescription>
                        </div>
                    </div>
                    <Button
                        onClick={executePromotion}
                        disabled={promoting || candidates.length === 0}
                        className="gap-2 h-10 px-6 bg-primary shadow-lg shadow-primary/20"
                    >
                        {promoting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                        <span>{t('management.promotion.execute')}</span>
                    </Button>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[100px] text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.table.rank')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.table.candidate')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.table.score')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.promotion.table.status')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {candidates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-48 text-center text-muted-foreground italic">
                                        {t('management.promotion.empty')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                candidates.map((c, i) => (
                                    <TableRow key={c.username} className="hover:bg-muted/30 transition-colors border-b border-border/40">
                                        <TableCell className="text-center">
                                            <div className={cn(
                                                "inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs",
                                                i < 3 ? "bg-amber-100 text-amber-600 border border-amber-200" : "bg-muted text-muted-foreground"
                                            )}>
                                                {i + 1}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-bold tracking-tight">{c.display_name}</span>
                                                <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest font-bold">@{c.username}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-lg font-black text-foreground tabular-nums">{c.total_score}</span>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">PTS</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="gap-1.5 border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 text-[10px] uppercase font-bold tracking-widest h-6">
                                                <CheckCircle2 className="h-3 w-3" /> {t('management.promotion.status.qualified')}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </ Table>
                </div>
            </Card>

            {/* Footer info/warning */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                    <strong>{t('management.promotion.note')}</strong> {t('management.promotion.noteDesc')}
                </div>
            </div>
        </div>
    );
}
