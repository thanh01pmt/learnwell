import React from "react";
import {
    FileCode,
    Settings,
    Pencil,
    ChevronRight,
    Sparkles,
    ArrowLeft,
    LayoutDashboard,
    Save,
    Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import GradingConfigForm from "@/components/authoring/GradingConfigForm";

const GradingConfigBuilder = () => {
    const { t } = useTranslation(["authoring", "common"]);
    return (
        <div className="min-h-screen bg-background p-6 space-y-8">
            {/* Header / Breadcrumb */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/authoring/curriculum">{t('common:breadcrumb.curriculum')}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/authoring/curriculum/p123">{t('authoring:grading.project_p123')}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{t('authoring:grading.grading_setup')}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-extrabold tracking-tight">{t('authoring:grading.builder_title')}</h1>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none gap-2">
                        <Play className="w-4 h-4" />
                        {t('common:actions.dry_run')}
                    </Button>
                    <Button className="flex-1 md:flex-none gap-2 bg-primary">
                        <Save className="w-4 h-4" />
                        {t('common:actions.save_all')}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Main Config Area */}
                <div className="xl:col-span-3 space-y-8">
                    <Tabs defaultValue="config" className="w-full">
                        <TabsList className="bg-muted p-1">
                            <TabsTrigger value="config" className="gap-2 px-6">
                                <Settings className="w-4 h-4" />
                                {t('authoring:grading.tabs.params')}
                            </TabsTrigger>
                            <TabsTrigger value="testcases" className="gap-2 px-6">
                                <FileCode className="w-4 h-4" />
                                {t('authoring:grading.tabs.testcases')}
                            </TabsTrigger>
                            <TabsTrigger value="rubric" className="gap-2 px-6">
                                <Sparkles className="w-4 h-4" />
                                {t('authoring:grading.tabs.rubric')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="config" className="pt-6">
                            <GradingConfigForm />
                        </TabsContent>

                        <TabsContent value="testcases" className="pt-6">
                            <div className="bg-card rounded-xl border-2 border-dashed border-border p-12 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="p-4 bg-muted rounded-full">
                                    <FileCode className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold">Chưa có Test Case nào</h3>
                                    <p className="text-sm text-muted-foreground max-w-sm">Tải lên file dữ liệu test (.json/ .csv) hoặc thêm thủ công các cặp Input/Output để hệ thống bắt đầu chấm điểm.</p>
                                </div>
                                <Button className="gap-2">Thêm Test Case đầu tiên</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="rubric" className="pt-6">
                            {/* AI Rubric placeholder */}
                            <div className="bg-gradient-to-br from-primary/5 via-indigo-500/5 to-purple-500/5 rounded-xl border border-primary/20 p-8 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary rounded-lg shadow-sm">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Tiêu chí chấm điểm bằng AI</h3>
                                        <p className="text-xs text-muted-foreground">Định nghĩa cách AI sẽ nhận xét và cho điểm về chất lượng mã nguồn ( readability, performance, logic ).</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-background/80 p-4 rounded-lg border flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                                        <div className="space-y-1">
                                            <div className="font-bold text-sm">Độ sạch của mã (Code Cleanliness)</div>
                                            <div className="text-xs text-muted-foreground">Đặt tên biến, thụt lề, comment chuẩn PEP8/ESLint.</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                    </div>
                                    <div className="bg-background/80 p-4 rounded-lg border flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                                        <div className="space-y-1">
                                            <div className="font-bold text-sm">Tính thuật toán (Algorithm Efficiency)</div>
                                            <div className="text-xs text-muted-foreground">Đánh giá độ phức tạp O(n) và cách xử lý trường hợp biên.</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full border-dashed gap-2">
                                    Thêm tiêu chí mới
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Info / Tips Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-muted/40 border-none shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-black uppercase text-muted-foreground tracking-tighter">Tóm tắt cấu hình</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-xs">
                                <span className="font-medium">Loại bài tập</span>
                                <Badge variant="secondary" className="h-5">Coding Project</Badge>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="font-medium">Nền tảng</span>
                                <Badge variant="outline" className="h-5">Web IDE (Python)</Badge>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="font-medium">Cơ chế chấm</span>
                                <span className="font-bold text-primary">Dynamic VM</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Alert className="border-warning/30 bg-warning/5">
                        <Settings className="h-4 w-4 text-warning" />
                        <AlertTitle className="text-xs font-bold uppercase text-warning">Lưu ý quan trọng</AlertTitle>
                        <AlertDescription className="text-[11px] leading-relaxed text-foreground/80">
                            Các thay đổi trong phần <strong>"Giới hạn hiệu năng"</strong> sẽ áp dụng ngay lập tức cho tất cả bài nộp mới. Đối với các bài đang chấm dở, hệ thống sẽ sử dụng cache cũ.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default GradingConfigBuilder;
