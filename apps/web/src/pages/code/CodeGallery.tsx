import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
    Code,
    ThumbsUp,
    ThumbsDown,
    Eye,
    GitFork,
    Search,
    Filter,
    ArrowLeft,
    ChevronRight,
    Sparkles,
    Trophy,
    Star,
    MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Solution {
    id: string;
    problemTitle: string;
    author: {
        name: string;
        avatar: string;
        initials: string;
        level: number;
        reputation: number;
    };
    language: string;
    approach: string;
    likes: number;
    forks: number;
    views: number;
    comments: number;
    code: string;
    tags: string[];
    isWeeklyTop?: boolean;
}

const mockSolutions: Solution[] = [
    {
        id: "s1",
        problemTitle: "Two Sum",
        author: {
            name: "code:gallery.mock.tuankiet",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
            initials: "TK",
            level: 15,
            reputation: 1540,
        },

        language: "JavaScript",
        approach: "Hash Map",
        likes: 245,
        forks: 56,
        views: 1200,
        comments: 12,
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
        tags: ["Array", "Hash Table"],
        isWeeklyTop: true,
    },
    {
        id: "s2",
        problemTitle: "Valid Parentheses",
        author: {
            name: "code:gallery.mock.minhanh",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
            initials: "MA",
            level: 8,
            reputation: 670,
        },

        language: "Python",
        approach: "Stack",
        likes: 189,
        forks: 34,
        views: 890,
        comments: 8,
        code: `def isValid(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
        tags: ["String", "Stack"],
    },
    {
        id: "s3",
        problemTitle: "Merge Sorted Array",
        author: {
            name: "code:gallery.mock.hamy",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=hamy",
            initials: "HM",
            level: 12,
            reputation: 980,
        },

        language: "C++",
        approach: "Two Pointers",
        likes: 156,
        forks: 21,
        views: 650,
        comments: 5,
        code: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1;
    int j = n - 1;
    int k = m + n - 1;
    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
}`,
        tags: ["Array", "Two Pointers"],
    },
];

interface CodeGalleryProps {
    publicView?: boolean;
}

export default function CodeGallery({ publicView = false }: CodeGalleryProps) {
    const { t } = useTranslation(["code", "common"]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("All");

    const filteredSolutions = mockSolutions.filter(s =>
        (selectedLanguage === "All" || s.language === selectedLanguage) &&
        (s.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const Container = publicView ? ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4">{children}</div> : AppLayout;

    return (
        <Container>
            <div className="space-y-12 animate-fade-in pt-16 md:pt-24 pb-20">
                {publicView && <Breadcrumbs items={[{ label: t("code:gallery.breadcrumbs") }]} />}
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl lg:text-4xl font-black">{t("code:gallery.title")} <span className="text-primary">{t("code:gallery.titleHighlight")}</span></h1>
                            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {t("code:gallery.subtitle")}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Trophy className="h-4 w-4 text-warning" />
                            {t("code:gallery.weeklyTop")}
                        </Button>
                        {!publicView && (
                            <Button className="gap-2 rounded-xl bg-primary hover:bg-primary/90">
                                <Code className="h-4 w-4" />
                                {t("code:gallery.shareSolution")}
                            </Button>
                        )}
                        {publicView && (
                            <Button className="gap-2 rounded-xl" onClick={() => navigate("/login")}>
                                {t("code:gallery.loginToShare")}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="glass-card rounded-3xl p-6 border-primary/10 shadow-xl shadow-primary/5 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("code:gallery.searchPlaceholder")}
                            className="pl-12 h-12 rounded-2xl border-primary/10 bg-primary/5 focus-visible:ring-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 md:pb-0">
                        {["All", "JavaScript", "Python", "Java", "C++", "C#"].map(lang => (
                            <Button
                                key={lang}
                                variant={selectedLanguage === lang ? "default" : "outline"}
                                size="sm"
                                className="rounded-xl h-12 px-6 font-bold transition-all"
                                onClick={() => setSelectedLanguage(lang)}
                            >
                                {lang}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Weekly Showcase */}
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-warning" />
                        {t("code:gallery.weeklySpotlight")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockSolutions.filter(s => s.isWeeklyTop).map(solution => (
                            <motion.div
                                key={solution.id}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="glass-card rounded-[2rem] p-8 border-warning/20 bg-gradient-to-br from-warning/10 via-transparent to-transparent relative overflow-hidden group cursor-pointer shadow-2xl shadow-warning/5"
                                onClick={() => navigate(`/solutions/${solution.id}`)}
                            >
                                <div className="absolute -right-6 -top-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                                    <Trophy className="h-32 w-32 text-warning" />
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <Avatar className="h-12 w-12 border-2 border-warning shadow-lg">
                                            <AvatarImage src={solution.author.avatar} />
                                            <AvatarFallback>{solution.author.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-warning text-black rounded-full p-0.5 shadow-sm">
                                            <Trophy className="h-3 w-3" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-sm tracking-tight">{t(solution.author.name as any)}</h3>
                                        <div className="flex items-center gap-1 text-[10px] text-warning font-bold uppercase tracking-wider">

                                            <Star className="h-3 w-3 fill-current" />
                                            <span>{t("code:gallery.points", { count: solution.author.reputation })}</span>
                                        </div>

                                    </div>
                                </div>
                                <h4 className="font-black text-xl mb-3 leading-tight group-hover:text-warning transition-colors">{solution.problemTitle}</h4>
                                <div className="flex items-center gap-2 mb-6">
                                    <Badge className="text-[10px] font-black bg-primary/20 text-primary border-primary/20 rounded-lg px-2">
                                        {solution.language}
                                    </Badge>
                                    <Badge className="text-[10px] font-black bg-accent/20 text-accent border-accent/20 rounded-lg px-2">
                                        {solution.approach}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <ThumbsUp className="h-4 w-4 text-primary" /> {solution.likes}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                                            <GitFork className="h-4 w-4 text-accent" /> {solution.forks}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="rounded-xl bg-warning/10 text-warning hover:bg-warning hover:text-black font-black text-[10px] tracking-widest px-4">
                                        {t("code:gallery.viewNow")}
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Solution Feed */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{t("code:gallery.allSolutions")}</h2>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground">{t("code:gallery.latest")}</Button>
                            <Button variant="ghost" size="sm" className="text-xs font-bold text-primary">{t("code:gallery.popular")}</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {filteredSolutions.map((solution) => (
                            <motion.div
                                key={solution.id}
                                layout
                                whileHover={{ scale: 1.01 }}
                                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all border-white/5 hover:border-primary/20 group"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    {/* Author Info */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-10 w-10 border border-primary/20 group-hover:border-primary/50 transition-colors">
                                                        <AvatarImage src={solution.author.avatar} />
                                                        <AvatarFallback className="bg-primary/10 text-primary font-black">{solution.author.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[8px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-background">
                                                        {solution.author.level}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black flex items-center gap-2">
                                                        {t(solution.author.name as any)}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">

                                                        <Star className="h-2.5 w-2.5 text-warning fill-warning" />
                                                        {t("code:gallery.reputation", { count: solution.author.reputation })}
                                                    </p>

                                                </div>
                                            </div>
                                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase">
                                                {solution.language}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-black group-hover:text-primary transition-colors cursor-pointer leading-tight" onClick={() => navigate(`/solutions/${solution.id}`)}>
                                            {solution.problemTitle} — <span className="text-muted-foreground">{solution.approach}</span>
                                        </h3>

                                        <div className="flex flex-wrap gap-1.5">
                                            {solution.tags.map(tag => (
                                                <Badge key={tag} variant="outline" className="text-[10px] font-bold bg-muted/30 border-border/50">#{tag}</Badge>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-6 pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>{solution.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground hover:text-accent transition-colors cursor-pointer">
                                                <GitFork className="h-4 w-4" />
                                                <span>{solution.forks}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                                                <MessageCircle className="h-4 w-4" />
                                                <span>{solution.comments}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                                                <Eye className="h-4 w-4" />
                                                <span>{solution.views}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Code Preview */}
                                    <div className="lg:w-[350px] space-y-3">
                                        <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs overflow-hidden relative group/code bg-dots-grid">
                                            <div className="absolute top-2 right-2 flex gap-2 overflow-hidden opacity-0 group-hover/code:opacity-100 transition-opacity">
                                                <div className="bg-slate-800 rounded px-2 py-1 text-[10px] text-white">
                                                    {solution.language}
                                                </div>
                                            </div>
                                            <pre className="text-slate-300 leading-relaxed overflow-hidden max-h-[100px]">
                                                {solution.code}
                                            </pre>
                                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1 rounded-xl h-10 text-xs font-bold gap-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                                                variant="outline"
                                                onClick={() => {
                                                    if (publicView) {
                                                        navigate("/login");
                                                    } else {
                                                        toast.success(t("code:gallery.messages.forkSuccess"));
                                                    }

                                                }}
                                            >
                                                <GitFork className="h-3 w-3" />
                                                {publicView ? t("code:gallery.loginToFork") : t("code:gallery.forkAndRemix")}
                                            </Button>
                                            <Button className="flex-1 rounded-xl h-10 text-xs font-bold gap-2" onClick={() => navigate(`/solutions/${solution.id}`)}>
                                                {t("code:gallery.viewDetails")}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center pt-8">
                        <Button variant="outline" className="rounded-full px-8 h-12 font-bold gap-2 border-primary/20 text-primary">
                            {t("code:gallery.loadMore")}
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
