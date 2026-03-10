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
import { Input } from "@/components/ui/input";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Users,
    Key,
    Zap,
    Map as MapIcon,
    Link as LinkIcon,
    List,
    Mail,
    Calendar,
    UserPlus,
    Database,
    Search,
    Download,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Participant {
    id: string;
    username: string;
    display_name: string;
    email: string;
    joined_at: string;
}

interface GeneratedAccount {
    username: string;
    email: string;
    password: string;
}

export default function AccountsPage() {
    const { id: contestId } = useParams<{ id: string }>();
    const { t } = useTranslation('contests');

    // Generation state
    const [prefix, setPrefix] = useState('ts');
    const [count, setCount] = useState(10);
    const [accounts, setAccounts] = useState<GeneratedAccount[]>([]);
    const [generating, setGenerating] = useState(false);

    // Assignment state
    const [selectedRound, setSelectedRound] = useState('r1');
    const [selectedBoard, setSelectedBoard] = useState('');
    const [assigning, setAssigning] = useState(false);

    // Participants data
    const [participants, setParticipants] = useState<Participant[]>([
        {
            id: 'p1',
            username: 'ts001',
            display_name: 'Nguyễn Văn A',
            email: 'ts001@contest.local',
            joined_at: '2026-03-01T10:00:00Z'
        },
        {
            id: 'p2',
            username: 'ts002',
            display_name: 'Trần Thị B',
            email: 'ts002@contest.local',
            joined_at: '2026-03-01T10:05:00Z'
        }
    ]);

    const generateAccounts = () => {
        const generated: GeneratedAccount[] = [];
        for (let i = 1; i <= count; i++) {
            const num = String(participants.length + i).padStart(3, '0');
            const username = `${prefix}${num}`;
            generated.push({
                username,
                email: `${username}@contest.local`,
                password: Math.random().toString(36).slice(-8)
            });
        }
        setAccounts(generated);
        toast.info(t('management.accounts.previewCount', { count }));
    };

    const saveToDatabase = () => {
        setGenerating(true);
        setTimeout(() => {
            const newParticipants = accounts.map((acc, i) => ({
                id: `p-${Date.now()}-${i}`,
                username: acc.username,
                display_name: acc.username.toUpperCase(),
                email: acc.email,
                joined_at: new Date().toISOString()
            }));
            setParticipants([...participants, ...newParticipants]);
            setAccounts([]);
            setGenerating(false);
            toast.success(t('management.accounts.saveSuccess'));
        }, 1500);
    };

    const assignToBoard = () => {
        setAssigning(true);
        setTimeout(() => {
            setAssigning(false);
            toast.success(t('management.accounts.assignSuccess'));
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Generation */}
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                    <CardHeader className="border-b border-border/50 bg-muted/20">
                        <div className="flex items-center gap-2 text-primary">
                            <Key className="h-5 w-5" />
                            <CardTitle className="text-lg">{t('management.accounts.generateTitle')}</CardTitle>
                        </div>
                        <CardDescription>{t('management.accounts.generateDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.accounts.prefix')}</Label>
                                <Input value={prefix} onChange={e => setPrefix(e.target.value)} className="bg-background/50 font-mono font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.accounts.count')}</Label>
                                <Input type="number" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)} className="bg-background/50 font-bold" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button onClick={generateAccounts} className="w-full gap-2 h-11 bg-primary hover:bg-primary/90">
                                <Zap className="h-4 w-4" />
                                {t('management.accounts.preview')}
                            </Button>

                            {accounts.length > 0 && (
                                <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <Button onClick={saveToDatabase} disabled={generating} variant="secondary" className="flex-[2] gap-2 h-11">
                                        {generating ? t('management.accounts.saving') : <><Database className="h-4 w-4" /> {t('management.accounts.saveDb')}</>}
                                    </Button>
                                    <Button onClick={() => setAccounts([])} variant="ghost" className="flex-1 h-11 text-muted-foreground">
                                        {t('management.accounts.cancel')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Board Assignment */}
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                    <CardHeader className="border-b border-border/50 bg-muted/20">
                        <div className="flex items-center gap-2 text-secondary">
                            <MapIcon className="h-5 w-5" />
                            <CardTitle className="text-lg">{t('management.accounts.distributionTitle')}</CardTitle>
                        </div>
                        <CardDescription>{t('management.accounts.distributionDesc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.accounts.targetRound')}</Label>
                                <Select value={selectedRound} onValueChange={setSelectedRound}>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder={t('management.live.roundPlaceholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="r1">{t('management.rounds.r1')}</SelectItem>
                                        <SelectItem value="r2">{t('management.rounds.r2')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('management.live.boardLabel')}</Label>
                                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                                    <SelectTrigger className="bg-background/50">
                                        <SelectValue placeholder={t('management.live.boardPlaceholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="b1">{t('management.boards.b1')}</SelectItem>
                                        <SelectItem value="b2">{t('management.boards.b2')}</SelectItem>
                                        <SelectItem value="b3">{t('management.boards.b3')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                onClick={assignToBoard}
                                disabled={!selectedBoard || assigning || participants.length === 0}
                                className="w-full gap-2 h-11"
                                variant="outline"
                            >
                                {assigning ? t('management.accounts.assigning') : <><LinkIcon className="h-4 w-4" /> {t('management.accounts.assignAll')}</>}
                            </Button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
                                <Users className="h-3 w-3" />
                                <span>{t('management.accounts.dbStats', { count: participants.length })}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Participants List */}
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden">
                <CardHeader className="py-4 px-6 border-b border-border/50 bg-muted/10 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <List className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base font-bold">{t('management.accounts.title')}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-64 hidden md:block">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder={t('management.accounts.search')} className="pl-8 h-9 bg-background/50" />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" /> {t('management.accounts.exportExcel')}
                        </Button>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="w-[200px] text-xs font-bold uppercase tracking-wider">{t('management.accounts.table.uid')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider">{t('management.accounts.table.name')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider">{t('management.accounts.table.email')}</TableHead>
                                <TableHead className="text-xs font-bold uppercase tracking-wider">{t('management.accounts.table.date')}</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {participants.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                                        {t('management.accounts.empty')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                participants.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-primary">
                                                <Key className="h-3 w-3 opacity-50" />
                                                {p.username}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-[10px] font-bold text-primary italic">
                                                    {p.display_name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-sm">{p.display_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                {p.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(p.joined_at).toLocaleDateString('vi-VN')}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
