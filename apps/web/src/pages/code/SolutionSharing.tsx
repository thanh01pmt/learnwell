import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Code2,
    Search,
    ThumbsUp,
    MessageSquare,
    ChevronRight,
    Clock,
    User,
    Filter,
    Terminal,
    Eye,
    Star,
    ArrowLeft,
    Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_SOLUTIONS = [
    {
        id: "s1",
        title: "code:hub.mock.s1.title",
        problemTitle: "code:hub.mock.s1.problemTitle",
        language: "Python",
        author: "Thanh Pham",
        authorRole: "code:roles.expert",
        likes: 245,

        comments: 32,
        views: "1.2k",
        complexity: "O(n) time, O(n) space",
        code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {} # val : index
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i`,
        explanation: "code:hub.mock.s1.explanation"
    },
    {
        id: "s2",
        title: "code:hub.mock.s2.title",
        problemTitle: "code:hub.mock.s2.problemTitle",
        language: "JavaScript",
        author: "Alex Johnson",
        authorRole: "code:roles.teacher",
        likes: 189,

        comments: 12,
        views: "850",
        complexity: "O(n) time, O(n) space",
        code: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`,
        explanation: "code:hub.mock.s2.explanation"
    },
    {
        id: "s3",
        title: "code:hub.mock.s3.title",
        problemTitle: "code:hub.mock.s3.problemTitle",
        language: "C++",
        author: "Maria Garcia",
        authorRole: "code:roles.student",
        likes: 56,

        comments: 8,
        views: "420",
        complexity: "O(n log n) time, O(1) space",
        code: `vector<int> twoSum(vector<int>& nums, int target) {
    // Note: requires sorting first
    sort(nums.begin(), nums.end());
    // Two pointers approach...
}`,
        explanation: "code:hub.mock.s3.explanation"
    }
];

const SolutionSharing = () => {
    const { t } = useTranslation(["code", "common"]);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSolution, setSelectedSolution] = useState<typeof MOCK_SOLUTIONS[0] | null>(null);

    const filteredSolutions = MOCK_SOLUTIONS.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.problemTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLang = !selectedLanguage || s.language === selectedLanguage;
        return matchesSearch && matchesLang;
    });

    const SolutionDetailView = ({ solution, onBack }: { solution: typeof MOCK_SOLUTIONS[0], onBack: () => void }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground -ml-2 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("code:hub.actions.backToList")}
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-primary text-white">{solution.language}</Badge>
                        <span className="text-muted-foreground text-sm">{t(solution.problemTitle as any)}</span>
                    </div>
                    <h2 className="text-3xl font-black">{t(solution.title as any)}</h2>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="bg-background/50 border-input gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        {t("code:hub.actions.helpful")} ({solution.likes})
                    </Button>
                    <Button variant="outline" className="bg-background/50 border-input gap-2">
                        <Star className="w-4 h-4" />
                        {t("code:hub.actions.save")}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Terminal className="w-5 h-5 text-primary" />
                            {t("code:hub.details.sourceCode")}
                        </h3>
                        <div className="bg-muted p-6 rounded-xl border border-border font-mono text-sm overflow-x-auto whitespace-pre">
                            <code className="text-primary">{solution.code}</code>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold">
                                {solution.author[0]}
                            </div>
                            <div>
                                <div className="font-bold">{solution.author}</div>
                                <div className="text-xs text-muted-foreground">{t(solution.authorRole as any)} • 1.2k {t("code:hub.details.reputation")}</div>
                            </div>


                        </div>
                        <Button className="bg-primary hover:bg-primary/90 text-white px-6">{t("code:hub.actions.askAuthor")}</Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="font-bold flex items-center gap-2 mb-4 text-primary">
                            <Brain className="w-5 h-5" />
                            {t("code:hub.details.algorithmExplanation")}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {t(solution.explanation as any)}
                        </p>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="font-bold flex items-center gap-2 mb-4 text-yellow-500">
                            <Clock className="w-5 h-5" />
                            {t("code:hub.details.complexity")}
                        </h3>
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-mono text-sm">
                            {solution.complexity}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground px-2">{t("code:hub.details.communityFeedback")}</h3>
                        {[1, 2].map(i => (
                            <div key={i} className="glass-card p-4 flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">U{i}</div>
                                <div>
                                    <div className="text-xs font-bold mb-1">User_{i}024</div>
                                    <p className="text-xs text-muted-foreground">{t("code:hub.details.feedbackPlaceholder")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen text-foreground p-6 md:p-12 space-y-12">
            {!selectedSolution ? (
                <>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-border pb-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-2">
                                <Code2 className="w-4 h-4" />
                                {t("code:hub.headerLabel")}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">
                                {t("code:hub.title")} <span className="text-primary italic">{t("code:hub.titleHighlight")}</span>
                            </h1>
                            <p className="text-muted-foreground text-lg">{t("code:hub.subtitle")}</p>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl h-14 px-8 shadow-xl shadow-primary/20 text-lg font-bold gap-2">
                            {t("code:hub.shareAction")}
                        </Button>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between sticky top-0 z-10 py-6 backdrop-blur-md">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={t("code:hub.searchPlaceholder")}
                                className="bg-background border-input h-12 pl-10 rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {[null, "Python", "JavaScript", "C++", "Java"].map(lang => (
                                <Button
                                    key={lang || 'all'}
                                    variant={selectedLanguage === lang ? "default" : "outline"}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className={cn(
                                        "h-10 px-6 rounded-xl border-input whitespace-nowrap",
                                        selectedLanguage === lang ? "bg-primary" : "bg-card hover:bg-muted"
                                    )}
                                >
                                    {lang || t("code:hub.languages.all")}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSolutions.map(s => (
                            <motion.div
                                key={s.id}
                                whileHover={{ y: -5 }}
                                className="glass-card p-6 flex flex-col group cursor-pointer"
                                onClick={() => setSelectedSolution(s)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">{s.language}</Badge>
                                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                                        <span className="flex items-center gap-1">
                                            <ThumbsUp className="w-3 h-3" /> {s.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" /> {s.views}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t(s.title as any)}</h3>
                                <div className="text-xs text-muted-foreground mb-6 uppercase tracking-widest font-bold font-mono">{t("code:problems.table.title")}: {t(s.problemTitle as any)}</div>

                                <div className="bg-muted p-4 rounded-xl border border-border font-mono text-[10px] text-primary overflow-hidden h-24 relative mask-fade-bottom mb-6">
                                    {s.code}
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] border border-border">
                                            {s.author[0]}
                                        </div>
                                        <div className="text-[10px] font-bold">{s.author}</div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredSolutions.length === 0 && (
                        <div className="py-20 text-center text-muted-foreground italic border-2 border-dashed border-border rounded-2xl">
                            {t("code:hub.noSolutions")}
                        </div>
                    )}
                </>
            ) : (
                <SolutionDetailView
                    solution={selectedSolution}
                    onBack={() => setSelectedSolution(null)}
                />
            )}
        </div>
    );
};

export default SolutionSharing;
