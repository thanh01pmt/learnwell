import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Users, Save, RefreshCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Student {
    id: string;
    name: string;
    avatar: string;
    position: number;
}

const mockStudents: Student[] = [
    { id: "1", name: "Nguyễn Minh Anh", avatar: "minhanh", position: 0 },
    { id: "2", name: "Trần Tuấn Kiệt", avatar: "tuankiet", position: 1 },
    { id: "3", name: "Lê Mỹ Linh", avatar: "mylinh", position: 2 },
    { id: "4", name: "Phạm Gia Bảo", avatar: "giabao", position: 3 },
    { id: "5", name: "Hoàng Minh Đức", avatar: "minhduc", position: 4 },
    { id: "6", name: "Vũ Phương Thảo", avatar: "phuongthao", position: 5 },
    { id: "7", name: "Đặng Tiến Dũng", avatar: "tiendung", position: 6 },
    { id: "8", name: "Bùi Khánh Huyền", avatar: "khanhhuyen", position: 7 },
    { id: "9", name: "Ngô Quốc Anh", avatar: "quocanh", position: 8 },
    { id: "10", name: "Trịnh Thu Hà", avatar: "thuha", position: 9 },
    { id: "11", name: "Lý Hải Nam", avatar: "hainam", position: 10 },
    { id: "12", name: "Phan Tuyết Mai", avatar: "tuyetmai", position: 11 },
];

export function SeatingChart() {
    const [items, setItems] = useState(mockStudents);

    const handleSave = () => {
        toast.success("Đã lưu sơ đồ lớp học!", {
            description: "Vị trí học sinh đã được cập nhật thành công (Mock).",
        });
    };

    const handleReset = () => {
        setItems([...mockStudents].sort(() => Math.random() - 0.5));
        toast.info("Đã xáo trộn chỗ ngồi!");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <LayoutGrid className="h-5 w-5 text-primary" />
                        Sơ đồ chỗ ngồi
                    </h2>
                    <p className="text-sm text-muted-foreground">Kéo thả để sắp xếp vị trí học sinh trong lớp</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
                        <RefreshCcw className="h-4 w-4" />
                        Xáo trộn
                    </Button>
                    <Button size="sm" className="gap-2" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                        Lưu sơ đồ
                    </Button>
                </div>
            </div>

            <div className="bg-muted/30 rounded-3xl p-6 lg:p-10 border-2 border-dashed border-muted">
                {/* Teacher Desk Area */}
                <div className="flex justify-center mb-12">
                    <div className="w-48 h-12 bg-card border-2 border-primary/20 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Bàn Giáo Viên</span>
                    </div>
                </div>

                {/* Seating Grid */}
                <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={setItems}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    {items.map((student) => (
                        <Reorder.Item
                            key={student.id}
                            value={student}
                            className="touch-none"
                        >
                            <Card className="hover:shadow-md transition-shadow cursor-move border-primary/5 hover:border-primary/20">
                                <CardContent className="p-3 flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="h-10 w-10 border-2 border-background">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.avatar}`} />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center border-2 border-background">
                                            {items.indexOf(student) + 1}
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{student.name}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase opacity-70">Vị trí {items.indexOf(student) + 1}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <div className="mt-12 flex justify-center">
                    <div className="px-6 py-2 bg-muted rounded-full text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
                        Cửa ra vào
                    </div>
                </div>
            </div>
        </div>
    );
}
