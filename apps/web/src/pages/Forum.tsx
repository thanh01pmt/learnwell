import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  MessageCircle,
  ThumbsUp,
  Eye,
  Search,
  Plus,
  Clock,
  User,
  Star,
  Sparkles,
  BookOpen,
  Code,
  HelpCircle,
  Lightbulb,
  Trophy,
  Pin,
  Filter,
  Calendar,
  TrendingUp,
  SlidersHorizontal,
  X,
  CheckCircle,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRole } from "@/contexts/RoleContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ForumCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  postCount: number;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
    level: number;
    reputation: number;
    badge?: string;
  };
  createdAt: string;
  views: number;
  likes: number;
  replies: number;
  isPinned?: boolean;
  isSolved?: boolean;
  tags: string[];
}

const categories: ForumCategory[] = [
  {
    id: "general",
    name: "forum:mockup.categories.general.name",
    icon: MessageCircle,
    color: "bg-primary",
    description: "forum:mockup.categories.general.description",
    postCount: 156,
  },
  {
    id: "homework",
    name: "forum:mockup.categories.homework.name",
    icon: HelpCircle,
    color: "bg-warning",
    description: "forum:mockup.categories.homework.description",
    postCount: 89,
  },
  {
    id: "coding",
    name: "forum:mockup.categories.coding.name",
    icon: Code,
    color: "bg-info",
    description: "forum:mockup.categories.coding.description",
    postCount: 234,
  },
  {
    id: "tips",
    name: "forum:mockup.categories.tips.name",
    icon: Lightbulb,
    color: "bg-success",
    description: "forum:mockup.categories.tips.description",
    postCount: 67,
  },
  {
    id: "books",
    name: "forum:mockup.categories.books.name",
    icon: BookOpen,
    color: "bg-accent",
    description: "forum:mockup.categories.books.description",
    postCount: 45,
  },
];

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "forum:mockup.posts.q1.title",
    content: "forum:mockup.posts.q1.content",
    category: "homework",
    author: {
      name: "Minh Anh",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
      initials: "MA",
      level: 5,
      reputation: 450,
      badge: "forum:mockup.posts.q1.badge",
    },
    createdAt: "15 phút trước",
    views: 45,
    likes: 12,
    replies: 8,
    isPinned: true,
    isSolved: true,
    tags: ["Toán lớp 6", "Số học"],
  },
  {
    id: "2",
    title: "forum:mockup.posts.q2.title",
    content: "forum:mockup.posts.q2.content",
    category: "coding",
    author: {
      name: "Tuấn Kiệt",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
      initials: "TK",
      level: 12,
      reputation: 1280,
      badge: "forum:mockup.posts.q2.badge",
    },
    createdAt: "1 giờ trước",
    views: 128,
    likes: 45,
    replies: 23,
    tags: ["Python", "Game", "Beginner"],
  },
  {
    id: "3",
    title: "forum:mockup.posts.q3.title",
    content: "forum:mockup.posts.q3.content",
    category: "tips",
    author: {
      name: "Hà My",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=hamy",
      initials: "HM",
      level: 8,
      reputation: 890,
      badge: "forum:mockup.posts.q3.badge",
    },
    createdAt: "2 giờ trước",
    views: 256,
    likes: 89,
    replies: 34,
    isPinned: true,
    tags: ["Tiếng Anh", "Học tập"],
  },
  {
    id: "4",
    title: "forum:mockup.posts.q4.title",
    content: "forum:mockup.posts.q4.content",
    category: "books",
    author: {
      name: "Đức Anh",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ducanh",
      initials: "DA",
      level: 3,
      reputation: 120,
    },
    createdAt: "3 giờ trước",
    views: 67,
    likes: 8,
    replies: 12,
    tags: ["Scratch", "Sách"],
  },
  {
    id: "5",
    title: "forum:mockup.posts.q5.title",
    content: "forum:mockup.posts.q5.content",
    category: "general",
    author: {
      name: "Thanh Hà",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=thanhha",
      initials: "TH",
      level: 15,
      reputation: 2500,
      badge: "forum:mockup.posts.q5.badge",
    },
    createdAt: "5 giờ trước",
    views: 189,
    likes: 56,
    replies: 28,
    tags: ["Thử thách", "Toán"],
  },
];

function CategoryCard({ category }: { category: ForumCategory }) {
  const { t } = useTranslation();
  const Icon = category.icon;
  return (
    <div className="card-modern p-4 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className={`${category.color} p-2.5 rounded-xl text-white`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {t(category.name as any) as any}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {t(category.description as any) as any}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {category.postCount} {t("forum:posts" as any) as any}
          </p>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: ForumPost }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === post.category);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card p-6 cursor-pointer hover:border-primary/20 transition-all duration-300 group shadow-lg shadow-black/5"
      onClick={() => navigate(`/forum/${post.id}`)}
    >
      <div className="flex gap-6">
        {/* Author Side */}
        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-primary/10 group-hover:border-primary/40 transition-colors">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-black">
                {post.author.initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-primary text-primary-foreground text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background shadow-lg">
              {post.author.level}
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] font-black border-warning/30 text-warning bg-warning/5 px-2 py-0.5">
            <Star className="h-2.5 w-2.5 mr-1 fill-warning" />
            {post.author.reputation}
          </Badge>
          {post.author.badge && (
            <Badge variant="secondary" className="text-[10px] font-black border-primary/20 bg-primary/5 text-primary mt-1 px-2 py-0.5">
              {t(post.author.badge as any) as any}
            </Badge>
          )}
        </div>

        {/* Content Side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            {post.isPinned && (
              <Badge className="bg-primary hover:bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider h-6 px-3 rounded-lg">
                <Pin className="h-3 w-3 mr-1.5" />
                {t("forum:pinned" as any) as any}
              </Badge>
            )}
            {post.isSolved && (
              <Badge className="bg-success hover:bg-success text-success-foreground text-[10px] font-black uppercase tracking-wider h-6 px-3 rounded-lg">
                <CheckCircle className="h-3 w-3 mr-1.5" />
                {t("forum:solved" as any) as any}
              </Badge>
            )}
            {category && (
              <Badge
                variant="outline"
                className="text-[10px] font-black uppercase tracking-wider h-6 px-3 rounded-lg border-border/50 bg-muted/30 text-muted-foreground"
              >
                {t(category.name as any) as any}
              </Badge>
            )}
          </div>

          <h3 className="font-black text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {t(post.title as any) as any}
          </h3>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {t(post.content as any) as any}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold bg-muted/50 px-3 py-1 rounded-full text-muted-foreground border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-colors"
                onClick={(e) => { e.stopPropagation(); /* Filter by tag */ }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 transition-colors group/stat">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/stat:bg-primary transition-colors">
                  <ThumbsUp className="h-4 w-4 text-primary group-hover/stat:text-white" />
                </div>
                <span className="text-sm font-black text-foreground/80">{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-8 w-8 rounded-lg bg-info/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-info" />
                </div>
                <span className="text-sm font-black text-foreground/80">{post.replies}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-bold">{post.views}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="sm:hidden text-right">
                <p className="text-xs font-black leading-none">{post.author.name}</p>
                <p className="text-[10px] text-muted-foreground">{post.createdAt}</p>
              </div>
              <Avatar className="h-8 w-8 sm:hidden border border-primary/20">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-muted-foreground font-bold">{t("forum:lastBy" as any) as any} <span className="text-foreground">{post.author.name}</span></p>
                <p className="text-[10px] text-muted-foreground/60">{post.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Suggested tags based on category and popular tags
const tagSuggestions: Record<string, string[]> = {
  general: ["Thảo luận", "Chia sẻ", "Hỏi đáp", "Thử thách", "Cuộc sống"],
  homework: ["Toán", "Văn", "Tiếng Anh", "Vật lý", "Hóa học", "Sinh học", "Lịch sử", "Địa lý", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
  coding: ["Python", "JavaScript", "Scratch", "HTML", "CSS", "Game", "Thuật toán", "Beginner", "Project"],
  tips: ["Học tập", "Ôn thi", "Ghi nhớ", "Tập trung", "Quản lý thời gian", "Kinh nghiệm"],
  books: ["Sách", "Tài liệu", "Đề thi", "Video", "Khóa học", "Review"],
};

const popularTags = ["Toán", "Tiếng Anh", "Python", "Học tập", "Lớp 6", "Lớp 7", "Thử thách", "Game", "Beginner", "Chia sẻ"];

function NewPostDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get suggestions based on category and input
  const getSuggestions = useMemo(() => {
    const categoryTags = category ? tagSuggestions[category] || [] : [];
    const allSuggestions = [...new Set([...categoryTags, ...popularTags])];

    if (tagInput.trim()) {
      const searchTerm = tagInput.toLowerCase().trim();
      return allSuggestions.filter(
        tag => tag.toLowerCase().includes(searchTerm) && !selectedTags.includes(tag)
      ).slice(0, 8);
    }

    return allSuggestions.filter(tag => !selectedTags.includes(tag)).slice(0, 8);
  }, [category, tagInput, selectedTags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !selectedTags.includes(trimmedTag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (tagInput.trim()) {
        addTag(tagInput);
      }
    } else if (e.key === "Backspace" && !tagInput && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setTagInput("");
    setSelectedTags([]);
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("forum:newPost" as any) as any}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("forum:dialog.title" as any) as any}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">{t("forum:dialog.titleLabel" as any) as any}</Label>
            <Input
              placeholder={t("forum:dialog.titlePlaceholder" as any) as any}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">{t("forum:dialog.categoryLabel" as any) as any}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t("forum:dialog.categoryPlaceholder" as any) as any} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {t(cat.name as any) as any}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">{t("forum:dialog.contentLabel" as any) as any}</Label>
            <Textarea
              placeholder={t("forum:dialog.contentPlaceholder" as any) as any}
              className="min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
            />
          </div>

          {/* Tags with auto-suggest */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{t("forum:dialog.tagsLabel" as any) as any}</Label>
              <span className="text-xs text-muted-foreground">{selectedTags.length}/5</span>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <div className="relative">
              <Input
                placeholder={selectedTags.length >= 5 ? t("forum:dialog.tagLimit" as any, { count: 5 }) as any : t("forum:dialog.tagPlaceholder" as any) as any}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleTagInputKeyDown}
                disabled={selectedTags.length >= 5}
                maxLength={30}
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && getSuggestions.length > 0 && selectedTags.length < 5 && (
                <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg p-2 space-y-1">
                  <p className="text-xs text-muted-foreground px-2 pb-1">
                    {tagInput ? t("forum:dialog.searchResults" as any) as any : category ? t("forum:dialog.categorySuggestions" as any) as any : t("forum:dialog.popularTags" as any) as any}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {getSuggestions.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => addTag(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Tag Suggestions - Always visible */}
            {selectedTags.length < 5 && !showSuggestions && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">{t("forum:dialog.quickSuggest" as any) as any}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(category ? tagSuggestions[category] || popularTags : popularTags)
                    .filter(tag => !selectedTags.includes(tag))
                    .slice(0, 6)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                        onClick={() => addTag(tag)}
                      >
                        + {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => handleClose(false)} className="flex-1">
              {t("forum:dialog.cancel" as any) as any}
            </Button>
            <Button
              className="flex-1 gap-2"
              disabled={!title.trim() || !category || !content.trim()}
            >
              <Sparkles className="h-4 w-4" />
              {t("forum:dialog.submit" as any) as any}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type DateFilter = "all" | "today" | "week" | "month";
type SortOption = "latest" | "popular" | "mostViews" | "mostReplies";

interface AdvancedFilters {
  minLikes: number;
  minReplies: number;
  onlySolved: boolean;
  onlyPinned: boolean;
  tags: string[];
}

const allTags = ["Toán lớp 6", "Số học", "Python", "Game", "Beginner", "Tiếng Anh", "Học tập", "Scratch", "Sách", "Thử thách", "Toán"];

interface ForumProps {
  publicView?: boolean;
}

export default function Forum({ publicView = false }: ForumProps) {
  const { t } = useTranslation(["forum", "common"]);
  const navigate = useNavigate();
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    minLikes: 0,
    minReplies: 0,
    onlySolved: false,
    onlyPinned: false,
    tags: [],
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (dateFilter !== "all") count++;
    if (advancedFilters.minLikes > 0) count++;
    if (advancedFilters.minReplies > 0) count++;
    if (advancedFilters.onlySolved) count++;
    if (advancedFilters.onlyPinned) count++;
    if (advancedFilters.tags.length > 0) count++;
    return count;
  }, [selectedCategory, dateFilter, advancedFilters]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateFilter("all");
    setAdvancedFilters({
      minLikes: 0,
      minReplies: 0,
      onlySolved: false,
      onlyPinned: false,
      tags: [],
    });
  };

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      // Date filter (simulated - in real app would use actual dates)
      const matchesDate = dateFilter === "all" || true; // Always true for demo

      // Advanced filters
      const matchesMinLikes = post.likes >= advancedFilters.minLikes;
      const matchesMinReplies = post.replies >= advancedFilters.minReplies;
      const matchesSolved = !advancedFilters.onlySolved || post.isSolved;
      const matchesPinned = !advancedFilters.onlyPinned || post.isPinned;
      const matchesTags = advancedFilters.tags.length === 0 ||
        advancedFilters.tags.some(tag => post.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesDate &&
        matchesMinLikes && matchesMinReplies && matchesSolved &&
        matchesPinned && matchesTags;
    });
  }, [searchQuery, selectedCategory, dateFilter, advancedFilters]);

  const sortedPosts = useMemo(() => {
    const posts = [...filteredPosts];
    switch (sortOption) {
      case "popular":
        return posts.sort((a, b) => b.likes - a.likes);
      case "mostViews":
        return posts.sort((a, b) => b.views - a.views);
      case "mostReplies":
        return posts.sort((a, b) => b.replies - a.replies);
      case "latest":
      default:
        return posts; // Already in latest order from mock data
    }
  }, [filteredPosts, sortOption]);

  const pinnedPosts = sortedPosts.filter((p) => p.isPinned);
  const regularPosts = sortedPosts.filter((p) => !p.isPinned);

  const Container = publicView ? ({ children }: { children: React.ReactNode }) => <div className="container mx-auto px-4">{children}</div> : AppLayout;

  return (
    <Container>
      <div className="py-16 md:py-24 space-y-6 animate-fade-in">
        {publicView && <Breadcrumbs items={[{ label: t("forum:breadcrumbs") }]} />}
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl lg:text-4xl font-black">{t("forum:title" as any) as any}</h1>
              <MessageCircle className="h-8 w-8 text-primary animate-bounce-subtle" />
            </div>
            <p className="text-muted-foreground">
              {t("forum:subtitle" as any) as any}
            </p>
          </div>
          {publicView ? (
            <Button className="gap-2" onClick={() => navigate("/login")}>
              {t("forum:loginToPost" as any) as any}
            </Button>
          ) : (
            <NewPostDialog />
          )}
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            {t("forum:categories" as any) as any}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Posts Section */}
        <div className="card-modern">
          <div className="p-4 border-b border-border space-y-4">
            {/* Search and Filters Row */}
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("forum:searchPlaceholder" as any) as any}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("forum:filterByCategory" as any) as any} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("forum:allCategories" as any) as any}</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {t(cat.name as any) as any}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date Filter */}
                <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilter)}>
                  <SelectTrigger className="w-[130px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("forum:timeRange" as any) as any} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("forum:allTime" as any) as any}</SelectItem>
                    <SelectItem value="today">{t("forum:today" as any) as any}</SelectItem>
                    <SelectItem value="week">{t("forum:thisWeek" as any) as any}</SelectItem>
                    <SelectItem value="month">{t("forum:thisMonth" as any) as any}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Option */}
                <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
                  <SelectTrigger className="w-[140px]">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t("forum:sortBy" as any) as any} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">{t("forum:latest" as any) as any}</SelectItem>
                    <SelectItem value="popular">{t("forum:mostLiked" as any) as any}</SelectItem>
                    <SelectItem value="mostViews">{t("forum:mostViewed" as any) as any}</SelectItem>
                    <SelectItem value="mostReplies">{t("forum:mostReplied" as any) as any}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Advanced Filters */}
                <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      {t("common:actions.advanced" as any) as any}
                      {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{t("forum:filters.advanced" as any) as any}</h4>
                        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                          {t("forum:filters.clearAll" as any) as any}
                        </Button>
                      </div>

                      {/* Min Likes */}
                      <div className="space-y-2">
                        <Label className="text-sm">{t("forum:filters.minLikes" as any, { count: advancedFilters.minLikes }) as any}</Label>
                        <Slider
                          value={[advancedFilters.minLikes]}
                          onValueChange={([value]) => setAdvancedFilters(prev => ({ ...prev, minLikes: value }))}
                          max={100}
                          step={5}
                        />
                      </div>

                      {/* Min Replies */}
                      <div className="space-y-2">
                        <Label className="text-sm">{t("forum:filters.minReplies" as any, { count: advancedFilters.minReplies }) as any}</Label>
                        <Slider
                          value={[advancedFilters.minReplies]}
                          onValueChange={([value]) => setAdvancedFilters(prev => ({ ...prev, minReplies: value }))}
                          max={50}
                          step={1}
                        />
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="onlySolved"
                            checked={advancedFilters.onlySolved}
                            onCheckedChange={(checked) =>
                              setAdvancedFilters(prev => ({ ...prev, onlySolved: checked === true }))
                            }
                          />
                          <Label htmlFor="onlySolved" className="text-sm flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5 text-success" />
                            {t("forum:filters.onlySolved" as any) as any}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="onlyPinned"
                            checked={advancedFilters.onlyPinned}
                            onCheckedChange={(checked) =>
                              setAdvancedFilters(prev => ({ ...prev, onlyPinned: checked === true }))
                            }
                          />
                          <Label htmlFor="onlyPinned" className="text-sm flex items-center gap-1">
                            <Pin className="h-3.5 w-3.5 text-primary" />
                            {t("forum:filters.onlyPinned" as any) as any}
                          </Label>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label className="text-sm">{t("forum:filters.byTag" as any) as any}</Label>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                          {allTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={advancedFilters.tags.includes(tag) ? "default" : "outline"}
                              className="cursor-pointer text-xs"
                              onClick={() => {
                                setAdvancedFilters(prev => ({
                                  ...prev,
                                  tags: prev.tags.includes(tag)
                                    ? prev.tags.filter(t => t !== tag)
                                    : [...prev.tags, tag]
                                }));
                              }}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || activeFilterCount > 0) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("common:filters.status.filtering" as any) as any}:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    {t("common:filters.status.searching" as any) as any}: "{searchQuery}"
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                  </Badge>
                )}
                {dateFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {dateFilter === "today" ? t("forum:today" as any) as any : dateFilter === "week" ? t("forum:thisWeek" as any) as any : t("forum:thisMonth" as any) as any}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setDateFilter("all")} />
                  </Badge>
                )}
                {advancedFilters.minLikes > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    ≥{advancedFilters.minLikes} likes
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setAdvancedFilters(prev => ({ ...prev, minLikes: 0 }))} />
                  </Badge>
                )}
                {advancedFilters.onlySolved && (
                  <Badge variant="secondary" className="gap-1">
                    {t("forum:solved" as any) as any}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setAdvancedFilters(prev => ({ ...prev, onlySolved: false }))} />
                  </Badge>
                )}
                {advancedFilters.tags.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {advancedFilters.tags.length} tags
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setAdvancedFilters(prev => ({ ...prev, tags: [] }))} />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={clearAllFilters}>
                  {t("forum:filters.clearAll" as any) as any}
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t("common:filters.results" as any, { count: sortedPosts.length }) as any}</span>
            </div>
          </div>

          {/* Posts List */}
          <div className="p-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">{t("assignments:tabs.all") as any} ({sortedPosts.length})</TabsTrigger>
                <TabsTrigger value="pinned">{t("forum:pinned" as any) as any} ({pinnedPosts.length})</TabsTrigger>
                <TabsTrigger value="unanswered">{t("forum:unanswered" as any) as any} ({sortedPosts.filter(p => p.replies === 0).length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {pinnedPosts.length > 0 && (
                  <div className="space-y-3">
                    {pinnedPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
                <div className="space-y-3">
                  {regularPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                {sortedPosts.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t("forum:emptyState.description" as any) as any}
                    </p>
                    <Button variant="link" onClick={clearAllFilters}>
                      {t("forum:filters.clearAll" as any) as any}
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pinned" className="space-y-3">
                {pinnedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                {pinnedPosts.length === 0 && (
                  <div className="text-center py-12">
                    <Pin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">{t("forum:emptyState.noPinned" as any) as any}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-3">
                {sortedPosts
                  .filter((p) => p.replies === 0)
                  .map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                {sortedPosts.filter((p) => p.replies === 0).length === 0 && (
                  <div className="text-center py-12">
                    <Trophy className="h-12 w-12 text-warning mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t("forum:emptyState.allAnswered" as any) as any}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Gamification Leaderboard */}
        <div className="card-modern p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            {t("common:leaderboard.title" as any) as any}
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "Tuấn Kiệt", points: 450, avatar: "tuankiet", rank: 1 },
              { name: "Thanh Hà", points: 380, avatar: "thanhha", rank: 2 },
              { name: "Hà My", points: 325, avatar: "hamy", rank: 3 },
              { name: "Minh Anh", points: 280, avatar: "minhanh", rank: 4 },
              { name: "Đức Anh", points: 210, avatar: "ducanh", rank: 5 },
            ].map((user) => (
              <div
                key={user.name}
                className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3 min-w-[180px]"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.avatar}`}
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -top-1 -left-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.rank === 1
                      ? "bg-warning"
                      : user.rank === 2
                        ? "bg-muted-foreground"
                        : user.rank === 3
                          ? "bg-amber-700"
                          : "bg-primary/50"
                      }`}
                  >
                    {user.rank}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.points} điểm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
