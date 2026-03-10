import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { Layout, Edit, Trophy, Users, Activity, Megaphone, ChevronRight, Layers, Group, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function ContestManagementLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { t: tNav } = useTranslation('navigation');
    const { t: tContest } = useTranslation('contests');

    const getActiveTab = () => {
        if (location.pathname.endsWith('/edit')) return 'edit';
        if (location.pathname.endsWith('/rounds')) return 'rounds';
        if (location.pathname.endsWith('/boards')) return 'boards';
        if (location.pathname.endsWith('/challenges')) return 'challenges';
        if (location.pathname.endsWith('/accounts')) return 'accounts';
        if (location.pathname.endsWith('/live')) return 'live';
        if (location.pathname.endsWith('/promotion')) return 'promotion';
        return 'list';
    };

    const handleTabChange = (value: string) => {
        if (value === 'list') navigate('/admin/contests');
        else if (id) navigate(`/admin/contests/${id}/${value}`);
    };

    return (
        <AppLayout>
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/admin')}>{tNav('admin')}</span>
                                <ChevronRight className="h-4 w-4" />
                                <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/admin/contests')}>{tNav('contests')}</span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{tNav('contestManagement')}</h1>
                        </div>
                    </div>
                </div>

                {id && (
                    <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full overflow-x-auto">
                        <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground min-w-max">
                            <TabsTrigger value="list" className="gap-2">
                                <Layout className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.list')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="edit" className="gap-2">
                                <Edit className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.info')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="rounds" className="gap-2">
                                <Layers className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.rounds')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="boards" className="gap-2">
                                <Group className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.boards')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="challenges" className="gap-2">
                                <Brain className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.challenges')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="accounts" className="gap-2">
                                <Users className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.accounts')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="live" className="gap-2">
                                <Activity className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.live')}</span>
                            </TabsTrigger>
                            <TabsTrigger value="promotion" className="gap-2">
                                <Megaphone className="h-4 w-4" />
                                <span className="hidden lg:inline">{tContest('management.tabs.promotion')}</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}

                <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Outlet />
                </div>
            </div>
        </AppLayout>
    );
}
