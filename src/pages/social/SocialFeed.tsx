import { useState } from "react";
import {
    Heart,
    MessageCircle,
    Share2,
    Trophy,
    Zap,
    Code,
    Star,
    Plus,
    ArrowRight,
    Sparkles,
    Award,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface SocialPost {
    id: string;
    author: {
        name: string;
        avatar: string;
        level: number;
        reputation: number;
    };
    type: "achievement" | "code_share" | "blog_post" | "status";
    title: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    createdAt: string;
    isLiked?: boolean;
}

const mockPosts: SocialPost[] = [
    {
        id: "p1",
        author: {
            name: "classroom:mocks.students.minhanh",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
            level: 15,
            reputation: 1540,
        },
        type: "achievement",
        title: "social:mockup.feed.posts.p1.title",
        content: "social:mockup.feed.posts.p1.content",
        likes: 45,
        comments: 12,
        createdAt: "social:mockup.feed.posts.p1.time",
    },
    {
        id: "p2",
        author: {
            name: "classroom:mocks.students.tuankiet",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
            level: 25,
            reputation: 4500,
        },
        type: "code_share",
        title: "social:mockup.feed.posts.p2.title",
        content: "social:mockup.feed.posts.p2.content",
        likes: 128,
        comments: 34,
        createdAt: "social:mockup.feed.posts.p2.time",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "p3",
        author: {
            name: "classroom:mocks.students.thao",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=hamy",
            level: 12,
            reputation: 890,
        },
        type: "status",
        title: "",
        content: "social:mockup.feed.posts.p3.content",
        likes: 12,
        comments: 5,
        createdAt: "social:mockup.feed.posts.p3.time",
    },
];

export default function SocialFeed() {
    const navigate = useNavigate();
    const { t } = useTranslation(["social", "common", "classroom"]);
    const [posts, setPosts] = useState(mockPosts);

    const toggleLike = (id: string) => {
        setPosts(prev => prev.map(post =>
            post.id === id ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
        ));
        const post = posts.find(p => p.id === id);
        if (post && !post.isLiked) toast.success(t("social:feed.toasts.liked", { name: t(post.author.name as any) }));
    };

    return (
        <AppLayout>
            <div className="space-y-8 animate-fade-in pb-20 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-black">Social <span className="text-primary italic">Feed</span></h1>
                    </div>
                    <Button className="h-12 px-6 rounded-xl font-bold gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <Plus className="h-4 w-4" />
                        {t("social:feed.createPost")}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-3xl p-6 border-primary/5 hover:border-primary/10 transition-all"
                            >
                                {/* Post Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                                            <AvatarImage src={post.author.avatar} />
                                            <AvatarFallback>{t(post.author.name as any)[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold flex items-center gap-2 capitalize">
                                                {t(post.author.name as any)}
                                                {post.type === "achievement" && <Sparkles className="h-3 w-3 text-warning" />}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-black uppercase">
                                                <span className="text-primary">Lv.{post.author.level}</span>
                                                <span>•</span>
                                                <span>{t(post.createdAt as any)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={`
                    text-[10px] font-bold rounded-lg px-2 h-6
                    ${post.type === "achievement" ? "bg-warning/10 text-warning border-warning/20" :
                                            post.type === "code_share" ? "bg-primary/10 text-primary border-primary/20" :
                                                "bg-muted text-muted-foreground border-border"}
                  `}>
                                        {post.type === "achievement" ? t("social:feed.types.achievement") : post.type === "code_share" ? t("social:feed.types.code_share") : t("social:feed.types.status")}
                                    </Badge>
                                </div>

                                {/* Post Body */}
                                <div className="space-y-4">
                                    {post.title && <h3 className="text-xl font-black">{t(post.title as any)}</h3>}
                                    <p className="text-muted-foreground leading-relaxed italic">
                                        {t(post.content as any)}
                                    </p>
                                    {post.image && (
                                        <div className="rounded-2xl overflow-hidden border border-primary/5 shadow-inner">
                                            <img src={post.image} alt="Post content" className="w-full h-auto max-h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    )}
                                </div>

                                {/* Post Footer */}
                                <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/5">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${post.isLiked ? "text-rose-500" : "text-muted-foreground hover:text-rose-500"}`}
                                        >
                                            <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                                            {post.likes}
                                        </button>
                                        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                                            <MessageCircle className="h-5 w-5" />
                                            {post.comments}
                                        </button>
                                    </div>
                                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        <div className="flex justify-center pt-4">
                            <Button variant="ghost" className="text-primary font-black gap-2 hover:bg-primary/5 px-8">
                                {t("social:feed.actions.loadMore")}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Recommendations */}
                        <div className="glass-card rounded-3xl p-6 border-primary/10 space-y-4">
                            <h3 className="font-black text-lg flex items-center gap-2">
                                <Star className="h-5 w-5 text-warning fill-warning" />
                                {t("social:feed.sidebar.recommendations")}
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "classroom:mocks.students.duc", level: 3, avatar: "ducanh" },
                                    { name: "classroom:mocks.students.anhtuan", level: 18, avatar: "thanhha" },
                                    { name: "classroom:mocks.students.huong", level: 9, avatar: "viethung" },
                                ].map((user, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-primary/5 transition-transform group-hover:scale-110">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.avatar}`} />
                                                <AvatarFallback>{t(user.name as any)[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-bold">{t(user.name as any)}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Level {user.level}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-primary hover:text-white transition-all">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full text-[10px] font-black uppercase text-primary p-0 h-auto tracking-widest">{t("social:feed.sidebar.viewAll")}</Button>
                        </div>

                        {/* trending */}
                        <div className="glass-card rounded-3xl p-6 border-accent/10 bg-accent/5">
                            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5 text-accent" />
                                {t("social:feed.sidebar.challenges")}
                            </h3>
                            <div className="p-4 rounded-2xl bg-card border border-accent/20 space-y-3 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/student/adaptive-practice')}>
                                <div className="absolute top-0 right-0 h-1 w-full bg-accent" />
                                <Badge className="bg-accent/10 text-accent border-none text-[8px] font-extrabold px-2">{t("social:feed.sidebar.hotWeekly")}</Badge>
                                <p className="text-sm font-black">{t("social:mockup.feed.challenges.binarySearch.title")}</p>
                                <p className="text-xs text-muted-foreground">{t("social:mockup.feed.challenges.binarySearch.description")}</p>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase pt-2">
                                    <span className="text-accent">{t("social:mockup.feed.challenges.binarySearch.participants", { count: 1245 })}</span>
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
