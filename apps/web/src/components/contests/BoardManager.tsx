import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Plus,
    Users,
    Trash2,
    Edit2,
    Monitor,
    Globe,
    Lock,
    Search,
    MoreVertical
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Board {
    id: string;
    name: string;
    description: string;
    is_public: boolean;
    participant_count: number;
}

interface BoardManagerProps {
    contestId: string;
}

export function BoardManager({ contestId }: BoardManagerProps) {
    const { t } = useTranslation('contests');
    const [boards, setBoards] = useState<Board[]>([
        {
            id: 'b1',
            name: 'Cụm thi Miền Bắc',
            description: 'Thí sinh thuộc các tỉnh thành phía Bắc',
            is_public: true,
            participant_count: 450
        },
        {
            id: 'b2',
            name: 'Cụm thi Miền Trung',
            description: 'Thí sinh thuộc các tỉnh thành miền Trung & Tây Nguyên',
            is_public: true,
            participant_count: 280
        },
        {
            id: 'b3',
            name: 'Cụm thi Miền Nam',
            description: 'Thí sinh thuộc các tỉnh thành phía Nam',
            is_public: false,
            participant_count: 520
        }
    ]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">{t('management.boards.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('management.boards.subtitle')}</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={t('management.list.title') + "..."}
                            className="pl-8 h-10"
                        />
                    </div>
                    <Button className="gap-2 whitespace-nowrap">
                        <Plus className="h-4 w-4" />
                        {t('management.boards.add')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((board) => (
                    <Card key={board.id} className="group hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                    <Monitor className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                </div>
                                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                    {board.is_public ? (
                                        <Badge variant="outline" className="gap-1 border-emerald-500/20 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/10">
                                            <Globe className="h-3 w-3" /> {t('management.boards.public')}
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="gap-1 border-amber-500/20 bg-amber-50 text-amber-700 dark:bg-amber-900/10">
                                            <Lock className="h-3 w-3" /> {t('management.boards.private')}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <CardTitle className="mt-2">{board.name}</CardTitle>
                            <CardDescription className="line-clamp-2 min-h-[40px]">{board.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{t('management.boards.participantCount', { count: board.participant_count })}</span>
                                </div>
                                <div className="flex gap-2 w-full pt-4 border-t border-border/50">
                                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 h-8">
                                        <Edit2 className="h-3.5 w-3.5" /> {t('management.tabs.info')}
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>{t('management.boards.manageParticipants')}</DropdownMenuItem>
                                            <DropdownMenuItem>{t('management.boards.exportCodes')}</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">{t('management.boards.delete')}</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
