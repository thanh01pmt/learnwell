import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Plus,
    GripVertical,
    Trash2,
    Edit2,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Round {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'scheduled' | 'active' | 'ended';
    start_at: string;
    end_at: string;
}

interface RoundManagerProps {
    contestId: string;
}

export function RoundManager({ contestId }: RoundManagerProps) {
    const { t } = useTranslation('contests');
    // Mock rounds
    const [rounds, setRounds] = useState<Round[]>([
        {
            id: 'r1',
            title: 'Vòng loại - Trực tuyến',
            description: 'Thí sinh làm bài tại nhà qua nền tảng LearnWell',
            status: 'ended',
            start_at: '2026-03-01T08:00:00Z',
            end_at: '2026-03-01T10:00:00Z'
        },
        {
            id: 'r2',
            title: 'Vòng bán kết - Tập trung',
            description: 'Thi tại các điểm trường quy định',
            status: 'active',
            start_at: '2026-03-10T08:00:00Z',
            end_at: '2026-03-10T11:00:00Z'
        },
        {
            id: 'r3',
            title: 'Vòng chung kết',
            description: 'Thi trực tiếp tại hội trường lớn',
            status: 'scheduled',
            start_at: '2026-03-20T09:00:00Z',
            end_at: '2026-03-20T12:00:00Z'
        }
    ]);

    const getStatusBadge = (status: Round['status']) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">{t('management.rounds.status.ongoing')}</Badge>;
            case 'ended':
                return <Badge variant="secondary">{t('management.rounds.status.ended')}</Badge>;
            case 'scheduled':
                return <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-50 dark:bg-blue-900/10">{t('management.rounds.status.upcoming')}</Badge>;
            default:
                return <Badge variant="outline">{t('management.rounds.status.draft')}</Badge>;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{t('management.rounds.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('management.rounds.subtitle')}</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t('management.rounds.add')}
                </Button>
            </div>

            <div className="grid gap-4">
                {rounds.map((round, index) => (
                    <Card key={round.id} className="relative overflow-hidden border-l-4 border-l-primary/50">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground">
                                    <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('management.rounds.label', { index: index + 1 })}</span>
                                            <h4 className="font-bold text-lg">{round.title}</h4>
                                            {getStatusBadge(round.status)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{round.description}</p>
                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {t('management.rounds.startAt', { time: new Date(round.start_at).toLocaleString('vi-VN') })}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {t('management.rounds.endAt', { time: new Date(round.end_at).toLocaleString('vi-VN') })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
