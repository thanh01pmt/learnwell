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
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Activity,
    Clock,
    Download,
    RefreshCw,
    Trophy,
    MapPin,
    Layers,
    Search,
    Lock,
    MoreVertical,
    ChevronRight,
    Monitor
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
    rank: number;
    display_name: string;
    username: string;
    total_score: number;
    challenges_solved: number;
    status: 'active' | 'submitted' | 'idle' | 'disqualified';
    last_activity: string;
}

export default function LiveMonitorPage() {
    const { id: contestId } = useParams<{ id: string }>();
    const [viewLevel, setViewLevel] = useState('board');
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const { t } = useTranslation('contests');

    // Mock leaderboard data
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
        {
            rank: 1,
            display_name: 'Nguyễn Văn A',
            username: 'ts001',
            total_score: 450,
            challenges_solved: 5,
            status: 'active',
            last_activity: new Date().toISOString()
        },
        {
            rank: 2,
            display_name: 'Trần Thị B',
            username: 'ts002',
            total_score: 420,
            challenges_solved: 4,
            status: 'active',
            last_activity: new Date(Date.now() - 50000).toISOString()
        },
        {
            rank: 3,
            display_name: 'Lê Văn C',
            username: 'ts005',
            total_score: 380,
            challenges_solved: 4,
            status: 'submitted',
            last_activity: new Date(Date.now() - 300000).toISOString()
        }
    ]);

    const refreshData = () => {
        setLoading(true);
        setTimeout(() => {
            setLastUpdate(new Date());
            setLoading(false);
            toast.success(t('management.live.refreshSuccess'));
        }, 800);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Activity className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                            {t('management.live.title')}
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 animate-pulse">
                                {t('management.live.realtime')}
                            </Badge>
                        </h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 font-medium">
                            {t('management.live.lastUpdate', { time: lastUpdate.toLocaleTimeString('vi-VN') })}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={refreshData} disabled={loading} className="gap-2 h-9 border-border/60">
                        <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                        {t('management.live.refresh')}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 h-9 border-border/60">
                        <Download className="h-4 w-4" />
                        {t('management.live.exportScores')}
                    </Button>
                </div>
            </div>

            {/* View Scope Selectors */}
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('management.live.scope')}</Label>
                        <Tabs value={viewLevel} onValueChange={setViewLevel} className="w-full">
                            <TabsList className="bg-muted/50 p-1 rounded-lg w-full md:w-auto h-9">
                                <TabsTrigger value="board" className="gap-2 text-xs rounded-md px-4">
                                    <MapPin className="h-3.5 w-3.5" /> {t('management.live.byBoard')}
                                </TabsTrigger>
                                <TabsTrigger value="round" className="gap-2 text-xs rounded-md px-4">
                                    <Layers className="h-3.5 w-3.5" /> {t('management.live.byRound')}
                                </TabsTrigger>
                                <TabsTrigger value="contest" className="gap-2 text-xs rounded-md px-4">
                                    <Trophy className="h-3.5 w-3.5" /> {t('management.live.comprehensive')}
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="flex-1 space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('management.live.roundLabel')}</Label>
                        <Select defaultValue="r1">
                            <SelectTrigger className="bg-background/50 h-9">
                                <SelectValue placeholder={t('management.promotion.roundPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="r1">{t('management.rounds.r1')}</SelectItem>
                                <SelectItem value="r2">{t('management.rounds.r2')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {viewLevel === 'board' && (
                        <div className="flex-1 space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t('management.live.boardLabel')}</Label>
                            <Select defaultValue="b1">
                                <SelectTrigger className="bg-background/50 h-9">
                                    <SelectValue placeholder={t('management.promotion.boardPlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="b1">{t('management.boards.b1')}</SelectItem>
                                    <SelectItem value="b2">{t('management.boards.b2')}</SelectItem>
                                    <SelectItem value="b3">{t('management.boards.b3')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                <CardHeader className="py-4 px-6 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" /> {t('management.live.leaderboard')}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        <Monitor className="h-4 w-4" />
                        <span>{t('management.live.onlineCount', { count: leaderboard.length })}</span>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[80px] text-center text-xs font-bold uppercase tracking-wider">{t('management.live.table.rank')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider">{t('management.live.table.contestant')}</TableHead>
                                <TableHead className="text-center text-xs font-bold uppercase tracking-wider">{t('management.live.table.score')}</TableHead>
                                <TableHead className="text-center text-xs font-bold uppercase tracking-wider">{t('management.live.table.solved')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider">{t('management.live.table.status')}</TableHead>
                                <TableHead className="text-right text-xs font-bold uppercase tracking-wider">{t('management.live.table.lastActivity')}</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.map((entry, i) => (
                                <TableRow key={entry.username} className="hover:bg-muted/30 transition-colors">
                                    <TableCell className="text-center">
                                        <div className={cn(
                                            "inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold",
                                            i === 0 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30" :
                                                i === 1 ? "bg-slate-200 text-slate-600 dark:bg-slate-700/30" :
                                                    i === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30" :
                                                        "bg-muted text-muted-foreground"
                                        )}>
                                            {i + 1}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{entry.display_name}</span>
                                            <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider font-bold">@{entry.username}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-base font-black text-primary tabular-nums tracking-tighter">{entry.total_score}</span>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-xs tabular-nums">
                                        {entry.challenges_solved}
                                    </TableCell>
                                    <TableCell>
                                        {entry.status === 'active' ? (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[10px] h-5 uppercase font-bold tracking-widest">{t('management.live.status.active')}</Badge>
                                        ) : entry.status === 'submitted' ? (
                                            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 text-[10px] h-5 uppercase font-bold tracking-widest">{t('management.live.status.submitted')}</Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] h-5 uppercase font-bold tracking-widest">{t('management.live.status.left')}</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right text-[10px] font-medium text-muted-foreground">
                                        {new Date(entry.last_activity).toLocaleTimeString('vi-VN')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/80">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
