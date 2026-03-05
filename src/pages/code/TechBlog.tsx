import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Newspaper,
    Search,
    TrendingUp,
    Clock,
    User,
    MessageCircle,
    ThumbsUp,
    Share2,
    Bookmark,
    ArrowRight,
    Edit3
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_POSTS = [
    {
        id: "b1",
        title: "code:blog.mock.b1.title",
        summary: "code:blog.mock.b1.summary",
        author: "code:blog.mock.b1.author",
        authorRole: "code:roles.expert",
        date: "05/03/2026",

        readTimeCount: 8,
        tags: ["code:blog.tags.algorithms", "code:blog.tags.memory", "code:blog.tags.webdev"],
        likes: 124,
        comments: 18,
        image: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
    },
    {
        id: "b2",
        title: "code:blog.mock.b2.title",
        summary: "code:blog.mock.b2.summary",
        author: "code:blog.mock.b2.author",
        authorRole: "code:roles.teacher",
        date: "03/03/2026",

        readTimeCount: 12,
        tags: ["code:blog.tags.webdev", "code:blog.tags.react", "code:blog.tags.ai"],
        likes: 342,
        comments: 54,
        image: "bg-gradient-to-br from-primary/20 to-cyan-500/20"
    },
    {
        id: "b3",
        title: "code:blog.mock.b3.title",
        summary: "code:blog.mock.b3.summary",
        author: "code:blog.mock.b3.author",
        authorRole: "code:roles.student",
        date: "01/03/2026",

        readTimeCount: 15,
        tags: ["code:blog.tags.memory", "code:blog.tags.junior"],
        likes: 89,
        comments: 12,
        image: "bg-gradient-to-br from-red-500/20 to-orange-500/20"
    }
];

const TechBlog = () => {
    const { t } = useTranslation(["code", "common"]);
    const [searchQuery, setSearchQuery] = useState("");

    const BlogPostCard = ({ post }: { post: typeof MOCK_POSTS[0] }) => (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden flex flex-col group cursor-pointer h-full border-white/5 hover:border-primary/20 transition-all duration-300 shadow-xl shadow-black/5 rounded-[2rem]"
        >
            <div className={cn("h-56 relative overflow-hidden", post.image)}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-6 left-6 flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} className="bg-white/10 backdrop-blur-md text-white border-white/20 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg">
                            {t(tag as any)}
                        </Badge>
                    ))}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs font-black">{t("common:minutes", { count: post.readTimeCount })}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-black tracking-tight">{t(post.author as any)}</p>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{t(post.authorRole as any)}</p>
                    </div>

                    <span className="ml-auto text-[10px] text-muted-foreground font-bold">{post.date}</span>
                </div>

                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {t(post.title as any)}
                </h3>

                <p className="text-sm text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                    {t(post.summary as any)}
                </p>

                <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-4 h-4 shadow-sm" />
                            <span className="text-xs font-black">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <MessageCircle className="w-4 h-4 shadow-sm" />
                            <span className="text-xs font-black">{post.comments}</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-[10px] tracking-widest h-10 px-6">
                        {t("code:blog.readMore")}
                    </Button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="container mx-auto px-4 pt-16 md:pt-24 pb-20 space-y-12 animate-fade-in">
            <Breadcrumbs items={[{ label: t("code:blog.breadcrumbs") }]} />
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                        <Newspaper className="text-primary w-10 h-10" />
                        {t("code:blog.title")} <span className="text-primary">{t("code:blog.titleHighlight")}</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">{t("code:blog.subtitle")}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 px-8 shadow-xl shadow-primary/20 gap-2 font-bold">
                    <Edit3 className="w-5 h-5" />
                    {t("code:blog.writePost")}
                </Button>
            </div>

            {/* Featured Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <TrendingUp className="text-primary w-6 h-6" />
                            {t("code:blog.featuredPosts")}
                        </h2>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={t("code:blog.searchPlaceholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-background border-input pl-10 h-10 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_POSTS.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Categories */}
                    <div className="glass-card p-6">
                        <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">{t("code:blog.hotTopics")}</h3>
                        <div className="flex flex-wrap gap-2">
                            {["algorithms", "mobile", "ai", "backend", "frontend", "career", "devops", "cybersecurity"].map(tag => (
                                <Badge key={tag} variant="outline" className="border-border bg-muted/50 hover:bg-primary/20 hover:border-primary/50 cursor-pointer transition-colors py-1 px-3">
                                    #{t(`code:blog.tags.${tag}` as any)}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="glass-card p-6">
                        <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-muted-foreground">{t("code:blog.topAuthors")}</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold">
                                            U{i}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">User_{i}024</div>
                                            <div className="text-[10px] text-muted-foreground">{t("code:blog.followers", { val: "1.2k" })}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary text-xs font-bold">{t("code:blog.followAction")}</Button>
                                </div>

                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="glass-card p-8 bg-gradient-to-br from-primary/20 to-transparent border-primary/20 space-y-4">
                        <h3 className="text-xl font-bold">{t("code:blog.newsletter.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("code:blog.newsletter.description")}</p>
                        <div className="flex gap-2">
                            <Input placeholder={t("code:blog.newsletter.placeholder")} className="bg-background border-input rounded-xl" />
                            <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-xl shrink-0">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-12 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                <span className="hover:text-primary cursor-pointer transition-colors">{t("code:blog.footer.about")}</span>
                <span>•</span>
                <span className="hover:text-primary cursor-pointer transition-colors">{t("code:blog.footer.guidelines")}</span>
                <span>•</span>
                <span className="hover:text-primary cursor-pointer transition-colors">{t("code:blog.footer.becomeAuthor")}</span>
            </div>
        </div>
    );
};

export default TechBlog;
