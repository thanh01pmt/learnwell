import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Download,
    Activity,
    Trash2,
    ExternalLink,
    MoreVertical,
    Edit2,
    Trophy,
    FileJson
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { JsonImportModal } from "@/components/contests/JsonImportModal";

// Mock data for demonstration purposes as LearnWell schema evolves
const MOCK_CONTESTS = [
    {
        id: 'contest-1',
        title: 'Kỳ thi Lập trình Hè 2026',
        short_code: 'SUMMER26',
        status: 'active',
        roundCount: 3,
        boardCount: 12,
        created_at: '2026-03-01T10:00:00Z'
    },
    {
        id: 'contest-2',
        title: 'Code Quest Challenge #4',
        short_code: 'CQ4',
        status: 'scheduled',
        roundCount: 1,
        boardCount: 4,
        created_at: '2026-03-05T14:30:00Z'
    },
    {
        id: 'contest-3',
        title: 'Kiểm tra thuật toán Lớp 10A1',
        short_code: 'A10A1',
        status: 'draft',
        roundCount: 1,
        boardCount: 1,
        created_at: '2026-03-09T08:15:00Z'
    }
];

export default function ContestListPage() {
    const [contests, setContests] = useState(MOCK_CONTESTS);
    const [loading, setLoading] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation('contests');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none">{t('management.list.status.active')}</Badge>;
            case 'scheduled':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{t('management.list.status.scheduled')}</Badge>;
            case 'draft':
                return <Badge variant="outline" className="text-muted-foreground">{t('management.list.status.draft')}</Badge>;
            case 'ended':
                return <Badge variant="secondary">{t('management.list.status.ended')}</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const createContest = () => {
        const id = `contest-${Date.now()}`;
        // In a real app, this would call Supabase
        navigate(`/admin/contests/${id}/edit`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight">{t('management.list.title')}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => setIsImportOpen(true)}>
                        <FileJson className="h-4 w-4" />
                        {t('management.list.importJson')}
                    </Button>
                    <Button onClick={createContest} className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t('management.list.createContest')}
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[300px]">{t('management.list.table.name')}</TableHead>
                                <TableHead>{t('management.list.table.code')}</TableHead>
                                <TableHead>{t('management.list.table.status')}</TableHead>
                                <TableHead>{t('management.list.table.rounds')}</TableHead>
                                <TableHead>{t('management.list.table.boards')}</TableHead>
                                <TableHead>{t('management.list.table.date')}</TableHead>
                                <TableHead className="text-right">{t('management.list.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        {t('management.list.noContests')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                contests.map((contest) => (
                                    <TableRow key={contest.id} className="cursor-pointer" onClick={() => navigate(`/admin/contests/${contest.id}/edit`)}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-primary hover:underline">{contest.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                                {contest.short_code}
                                            </code>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(contest.status)}</TableCell>
                                        <TableCell className="font-semibold">{contest.roundCount}</TableCell>
                                        <TableCell className="font-semibold">{contest.boardCount}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(contest.created_at).toLocaleDateString('vi-VN')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                                    onClick={() => navigate(`/admin/contests/${contest.id}/live`)}
                                                >
                                                    <Activity className="h-4 w-4" />
                                                    <span className="hidden lg:inline">{t('management.tabs.live')}</span>
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => navigate(`/admin/contests/${contest.id}/edit`)}>
                                                            <Edit2 className="mr-2 h-4 w-4" />
                                                            {t('management.tabs.info')}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => navigate(`/admin/contests/${contest.id}/challenges`)}>
                                                            <Trophy className="mr-2 h-4 w-4" />
                                                            {t('management.tabs.challenges')}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('management.boards.delete')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <JsonImportModal
                open={isImportOpen}
                onOpenChange={setIsImportOpen}
                onImport={(data) => {
                    console.log("Imported data:", data);
                    // Add logic to save to DB or local state
                }}
            />
        </div>
    );
}
