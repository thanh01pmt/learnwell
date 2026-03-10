import React, { useState } from "react";
import {
    Coins,
    ShoppingBag,
    Info,
    Zap,
    Star,
    Shield,
    Sparkles,
    Palette,
    History,
    Check,
    Trophy,
    Gem,
    ArrowRightLeft,
    Monitor,
    MousePointer2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_ITEMS = [
    {
        id: "i1",
        name: "Streak Freeze",
        description: "Bảo vệ chuỗi học tập của bạn nếu bạn lỡ quên học một ngày.",
        price: 200,
        category: "Consumables",
        icon: Zap,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        id: "i2",
        name: "Premium Profile Frame",
        description: "Khung đại diện lấp lánh khẳng định đẳng cấp Chuyên gia.",
        price: 500,
        category: "Cosmetics",
        icon: Palette,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        id: "i3",
        name: "Hint Pack (5 labels)",
        description: "Gợi ý cho những bài tập thuật toán cực khó.",
        price: 150,
        category: "Consumables",
        icon: Info,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10"
    },
    {
        id: "i4",
        name: "Double XP (24h)",
        description: "Nhân đôi kinh nghiệm nhận được trong vòng 24 giờ tới.",
        price: 350,
        category: "Booster",
        icon: Sparkles,
        color: "text-primary",
        bgColor: "bg-primary/10"
    },
    {
        id: "i5",
        name: "Exclusive Team Banner",
        description: "Hình nền rực rỡ cho trang thông tin đội nhóm của bạn.",
        price: 800,
        category: "Cosmetics",
        icon: Shield,
        color: "text-red-500",
        bgColor: "bg-red-500/10"
    },
    {
        id: "i6",
        name: "Master Badge",
        description: "Huy hiệu đặc biệt hiển thị cạnh tên người dùng.",
        price: 1000,
        category: "Cosmetics",
        icon: Star,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
    {
        id: "i7",
        name: "Dracula Pro Theme",
        description: "Giao diện cao cấp cho Code IDE của bạn.",
        price: 150,
        currency: "Gems",
        category: "Themes",
        icon: Palette,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10"
    },
    {
        id: "i8",
        name: "AI Code Review Premium",
        description: "Phân tích mã nguồn chuyên sâu bằng AI (10 lần).",
        price: 100,
        currency: "Gems",
        category: "AI Power-ups",
        icon: Sparkles,
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10"
    },
    {
        id: "i9",
        name: "Mechanical Keyboard",
        description: "Bàn phím cơ thực tế (vận chuyển tận nơi).",
        price: 1000,
        currency: "Gems",
        category: "Real Rewards",
        icon: Monitor,
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10"
    }
];

const LearnCoinShop = () => {
    const { toast } = useToast();
    const [balance, setBalance] = useState(1250);
    const [gems, setGems] = useState(75);
    const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

    const handleExchange = () => {
        if (balance >= 100) {
            setBalance(prev => prev - 100);
            setGems(prev => prev + 1);
            toast({
                title: "Đổi Gem thành công!",
                description: "Bạn đã đổi 100 LearnCoins lấy 1 Gem.",
            });
        } else {
            toast({
                title: "Không đủ số dư",
                description: "Cần tối thiểu 100 LearnCoins để đổi Gem.",
                variant: "destructive"
            });
        }
    };

    const handlePurchase = (item: typeof MOCK_ITEMS[0]) => {
        if (balance >= item.price) {
            setBalance(prev => prev - item.price);
            setPurchasedItems(prev => [...prev, item.id]);
            toast({
                title: "Thanh toán thành công!",
                description: `Bạn đã mua ${item.name} với giá ${item.price} LearnCoins.`,
            });
        } else {
            toast({
                title: "Không đủ số dư",
                description: "Hãy giải thêm bài tập để kiếm thêm LearnCoins!",
                variant: "destructive"
            });
        }
    };

    const ItemCard = ({ item }: { item: typeof MOCK_ITEMS[0] }) => {
        const Icon = item.icon;
        const isOwned = purchasedItems.includes(item.id);

        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden group"
            >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.bgColor)}>
                    <Icon className={cn("w-8 h-8", item.color)} />
                </div>
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed flex-1">
                    {item.description}
                </p>

                <div className="w-full pt-4 border-t border-border flex items-center justify-between">
                    {item.currency === "Gems" ? <Gem className="w-4 h-4 text-cyan-400" /> : <Coins className="w-4 h-4" />}
                    {item.price}
                </div>
                {isOwned ? (
                    <Badge className="bg-primary/20 text-primary border-none px-3 py-1">
                        <Check className="w-3 h-3 mr-1" />
                        Đã sở hữu
                    </Badge>
                ) : (
                    <Button
                        size="sm"
                        onClick={() => {
                            const currentBalance = item.currency === "Gems" ? gems : balance;
                            if (currentBalance >= item.price) {
                                if (item.currency === "Gems") setGems(prev => prev - item.price);
                                else setBalance(prev => prev - item.price);
                                setPurchasedItems(prev => [...prev, item.id]);
                                toast({
                                    title: "Thanh toán thành công!",
                                    description: `Bạn đã mua ${item.name} với giá ${item.price} ${item.currency || 'LearnCoins'}.`,
                                });
                            } else {
                                toast({
                                    title: "Không đủ số dư",
                                    description: `Bạn cần thêm ${item.currency === "Gems" ? "Gems" : "LearnCoins"} để mua vật phẩm này!`,
                                    variant: "destructive"
                                });
                            }
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-4 text-xs font-bold"
                    >
                        Mua ngay
                    </Button>
                )}
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen p-6 md:p-12 space-y-12 pb-24">
            {/* Header / Wallet */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <ShoppingBag className="text-primary w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black">LearnWell <span className="text-primary">Shop</span></h1>
                        <p className="text-muted-foreground">Sử dụng LearnCoins để nâng cấp trải nghiệm học tập.</p>
                    </div>
                </div>

                <div className="glass-card px-8 py-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 flex items-center gap-8 shadow-2xl shadow-primary/10">
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">LearnCoins</div>
                            <div className="text-3xl font-black text-primary flex items-center gap-2">
                                {balance.toLocaleString()}
                                <Coins className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="h-10 w-[1px] bg-border" />
                        <div className="text-right">
                            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Gems</div>
                            <div className="text-3xl font-black text-cyan-400 flex items-center gap-2">
                                {gems.toLocaleString()}
                                <Gem className="w-6 h-6 fill-cyan-400/20" />
                            </div>
                        </div>
                    </div>
                    <div className="h-12 w-[2px] bg-primary/20" />
                    <Button
                        onClick={handleExchange}
                        className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 rounded-xl h-12 px-6 font-bold gap-2 group"
                    >
                        <ArrowRightLeft className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        Đổi 100 LC → 1 Gem
                    </Button>
                </div>
            </div>

            {/* Main Shop Sections */}
            <Tabs defaultValue="all" className="space-y-8">
                <TabsList className="bg-muted p-1 border border-border rounded-xl w-fit flex-wrap">
                    <TabsTrigger value="all" className="rounded-lg px-6 data-[state=active]:bg-primary">Tất cả</TabsTrigger>
                    <TabsTrigger value="Cosmetics" className="rounded-lg px-6 data-[state=active]:bg-primary">Trang trí</TabsTrigger>
                    <TabsTrigger value="Consumables" className="rounded-lg px-6 data-[state=active]:bg-primary">Hỗ trợ</TabsTrigger>
                    <TabsTrigger value="Themes" className="rounded-lg px-6 data-[state=active]:bg-primary">👨‍💻 Giao diện IDE</TabsTrigger>
                    <TabsTrigger value="AI Power-ups" className="rounded-lg px-6 data-[state=active]:bg-primary">🔮 AI Power</TabsTrigger>
                    <TabsTrigger value="Real Rewards" className="rounded-lg px-6 data-[state=active]:bg-primary">🎁 Quà tặng</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {MOCK_ITEMS.map(item => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>

                {["Cosmetics", "Consumables", "Booster", "Themes", "AI Power-ups", "Real Rewards"].map(cat => (
                    <TabsContent key={cat} value={cat} className="m-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {MOCK_ITEMS.filter(i => i.category === cat).map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Special Offer */}
            <div className="glass-card p-12 bg-gradient-to-r from-card to-background border-border relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />

                <div className="flex-1 space-y-6 relative z-10">
                    <Badge className="bg-primary text-primary-foreground italic">Giới hạn thời gian</Badge>
                    <h2 className="text-4xl font-extrabold tracking-tight">Gói Siêu Cấp: <span className="text-primary">Tech Titan</span></h2>
                    <p className="text-muted-foreground text-lg max-w-lg">Nhận ngay bộ vật phẩm độc quyền cho team, 5000 LearnCoins và danh hiệu Tech Titan vĩnh viễn.</p>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-foreground">$19.99</span>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 rounded-xl shadow-xl shadow-primary/20 font-bold">
                            Mở khóa ngay
                        </Button>
                    </div>
                </div>

                <div className="w-80 h-80 relative shrink-0">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-4 bg-primary/30 rounded-full animate-pulse opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Trophy className="w-40 h-40 text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnCoinShop;
