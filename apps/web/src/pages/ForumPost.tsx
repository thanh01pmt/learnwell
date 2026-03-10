import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Flag,
  CheckCircle,
  Send,
  MoreVertical,
  Award,
  Star,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRole } from "@/contexts/RoleContext";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
    level: number;
    reputation: number;
    badge?: string;
  };
  createdAt: string;
  likes: number;
  isAccepted?: boolean;
  replies?: Comment[];
}

interface PostData {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryName: string;
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
  dislikes: number;
  isPinned?: boolean;
  isSolved?: boolean;
  tags: string[];
  comments: Comment[];
}

const mockPostData: Record<string, PostData> = {
  "1": {
    id: "1",
    title: "Làm sao để giải bài toán chia hết lớp 6 ạ? 🤔",
    content: `Em không hiểu cách tìm số chia hết cho cả 3 và 5. Ai giúp em với!

Cụ thể là bài toán như sau:
- Tìm tất cả các số có 3 chữ số chia hết cho cả 3 và 5

Em đã thử liệt kê từ 100 nhưng thấy rất lâu. Có cách nào nhanh hơn không ạ?

Cảm ơn mọi người! 🙏`,
    category: "homework",
    categoryName: "Hỏi bài tập",
    author: {
      name: "Minh Anh",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
      initials: "MA",
      level: 5,
      reputation: 450,
      badge: "🌟 Học sinh chăm chỉ",
    },
    createdAt: "15 phút trước",
    views: 45,
    likes: 12,
    dislikes: 0,
    isPinned: true,
    isSolved: true,
    tags: ["Toán lớp 6", "Số học"],
    comments: [
      {
        id: "c1",
        content: `Chào em! Đây là một bài toán về chia hết rất hay. Để giải nhanh, em cần nhớ:

1. **Số chia hết cho 3**: Tổng các chữ số chia hết cho 3
2. **Số chia hết cho 5**: Chữ số tận cùng là 0 hoặc 5

Vì số phải chia hết cho **cả 3 và 5**, nên nó phải chia hết cho **15** (BCNN của 3 và 5).

**Cách làm:**
- Số có 3 chữ số nhỏ nhất chia hết cho 15: 105
- Số có 3 chữ số lớn nhất chia hết cho 15: 990
- Các số cần tìm: 105, 120, 135, ..., 990

Số lượng = (990 - 105) / 15 + 1 = **60 số**

Chúc em học tốt! 📚`,
        author: {
          name: "Cô Hương",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=cohuong",
          initials: "CH",
          level: 25,
          reputation: 2500,
          badge: "👩‍🏫 Giáo viên",
        },
        createdAt: "10 phút trước",
        likes: 15,
        isAccepted: true,
      },
      {
        id: "c2",
        content: "Cảm ơn cô ạ! Em hiểu rồi. Vậy là mình dùng BCNN để gộp điều kiện lại phải không ạ? 😊",
        author: {
          name: "Minh Anh",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=minhanh",
          initials: "MA",
          level: 5,
          reputation: 450,
          badge: "🌟 Học sinh chăm chỉ",
        },
        createdAt: "8 phút trước",
        likes: 3,
      },
      {
        id: "c3",
        content: "Đúng rồi em! BCNN giúp gộp nhiều điều kiện chia hết thành một. Cố gắng lên nhé! 💪",
        author: {
          name: "Cô Hương",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=cohuong",
          initials: "CH",
          level: 25,
          reputation: 2500,
          badge: "👩‍🏫 Giáo viên",
        },
        createdAt: "5 phút trước",
        likes: 5,
      },
    ],
  },
  "2": {
    id: "2",
    title: "Share code game đoán số bằng Python 🐍",
    content: `Mình vừa làm xong game đoán số, code đơn giản lắm! Ai muốn học thì vào xem nha.

\`\`\`python
import random

def guess_number_game():
    secret = random.randint(1, 100)
    attempts = 0
    
    print("🎮 Chào mừng đến với game đoán số!")
    print("Mình đang nghĩ một số từ 1 đến 100...")
    
    while True:
        guess = int(input("Bạn đoán số: "))
        attempts += 1
        
        if guess < secret:
            print("📈 Số cần đoán lớn hơn!")
        elif guess > secret:
            print("📉 Số cần đoán nhỏ hơn!")
        else:
            print(f"🎉 Chính xác! Bạn đã đoán đúng sau {attempts} lần thử!")
            break

guess_number_game()
\`\`\`

Mọi người có thể thử và cải tiến thêm nhé! Ví dụ thêm giới hạn số lần đoán, tính điểm, v.v.`,
    category: "coding",
    categoryName: "Lập trình",
    author: {
      name: "Tuấn Kiệt",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
      initials: "TK",
      level: 12,
      reputation: 1280,
      badge: "💻 Cao thủ code",
    },
    createdAt: "1 giờ trước",
    views: 128,
    likes: 45,
    dislikes: 2,
    tags: ["Python", "Game", "Beginner"],
    comments: [
      {
        id: "c1",
        content: "Hay quá! Mình sẽ thử thêm tính năng lưu high score vào file nhé 🏆",
        author: {
          name: "Hà My",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=hamy",
          initials: "HM",
          level: 8,
          reputation: 890,
          badge: "📚 Mọt sách",
        },
        createdAt: "45 phút trước",
        likes: 8,
      },
      {
        id: "c2",
        content: "Mình mới học Python, code này dễ hiểu quá! Cảm ơn bạn nhiều 🙏",
        author: {
          name: "Đức Anh",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ducanh",
          initials: "DA",
          level: 3,
          reputation: 120,
        },
        createdAt: "30 phút trước",
        likes: 4,
      },
    ],
  },
};

function CommentCard({ comment, isAuthor }: { comment: Comment; isAuthor?: boolean }) {
  const [likes, setLikes] = useState(comment.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className={`p-4 rounded-xl ${comment.isAccepted ? "bg-success/10 border border-success/30" : "bg-muted/30"}`}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/20">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
            {comment.author.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <Badge variant="secondary" className="text-xs bg-primary/5 text-primary border-primary/10">
              Lv.{comment.author.level}
            </Badge>
            <Badge variant="outline" className="text-xs border-warning/30 text-warning bg-warning/5 font-bold">
              <Star className="h-3 w-3 mr-1 fill-warning" />
              {comment.author.reputation}
            </Badge>
            {comment.author.badge && (
              <span className="text-xs text-muted-foreground">{comment.author.badge}</span>
            )}
            {comment.isAccepted && (
              <Badge className="bg-success text-success-foreground text-xs gap-1">
                <CheckCircle className="h-3 w-3" />
                Câu trả lời hay nhất
              </Badge>
            )}
          </div>

          <div className="mt-2 text-sm whitespace-pre-wrap">{comment.content}</div>

          <div className="flex items-center gap-3 mt-3">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 gap-1 ${hasLiked ? "text-primary" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span className="text-xs">{likes}</span>
            </Button>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {comment.createdAt}
            </span>
            {isAuthor && !comment.isAccepted && (
              <Button variant="ghost" size="sm" className="h-7 text-xs text-success gap-1">
                <Award className="h-3.5 w-3.5" />
                Đánh dấu hay nhất
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForumPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const post = mockPostData[id || "1"] || mockPostData["1"];

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setHasDisliked(false);
    } else {
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // In a real app, this would send to the backend
      console.log("Submitting comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="gap-2 -ml-2"
          onClick={() => navigate("/forum")}
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại diễn đàn
        </Button>

        {/* Post Content */}
        <div className="card-modern p-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {post.author.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{post.author.name}</span>
                <Badge variant="secondary" className="text-xs bg-primary/5 text-primary border-primary/10">
                  Lv.{post.author.level}
                </Badge>
                <Badge variant="outline" className="text-xs border-warning/30 text-warning bg-warning/5 font-bold">
                  <Star className="h-3 w-3 mr-1 fill-warning" />
                  {post.author.reputation}
                </Badge>
                {post.author.badge && (
                  <span className="text-sm text-muted-foreground">{post.author.badge}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {post.views} lượt xem
                </span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Flag className="h-4 w-4" />
                  Báo cáo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {post.isPinned && (
              <Badge variant="secondary" className="text-xs">
                📌 Ghim
              </Badge>
            )}
            {post.isSolved && (
              <Badge className="bg-success text-success-foreground text-xs">
                ✓ Đã giải quyết
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {post.categoryName}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mt-4">{post.title}</h1>

          {/* Content */}
          <div className="mt-4 prose prose-sm max-w-none whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={hasLiked ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              {post.likes + likes}
            </Button>
            <Button
              variant={hasDisliked ? "destructive" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={handleDislike}
            >
              <ThumbsDown className="h-4 w-4" />
              {post.dislikes + (hasDisliked ? 1 : 0)}
            </Button>
            <Button
              variant={isBookmarked ? "secondary" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              Lưu
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="h-4 w-4" />
              Chia sẻ
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card-modern p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-primary" />
            Bình luận ({post.comments.length})
          </h2>

          {/* New Comment */}
          <div className="flex gap-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=me" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Viết bình luận của bạn..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  className="gap-2"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                  Gửi bình luận
                </Button>
              </div>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                isAuthor={post.author.name === "Minh Anh"} // In real app, check current user
              />
            ))}
          </div>

          {post.comments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
