import { useState } from "react";
import { LoadingState, EmptyState, ErrorState } from "@/components/StatusStates";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  PiggyBank,
  DollarSign,
  Users,
  BookOpen,
  FileCheck,
  Filter,
  Plus,
  Bell,
  Search,
  Info,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Copy,
  Sun,
  Moon,
  UserPlus,
  AlertCircle,
  MessageSquare,
  Clock,
  GraduationCap,
  MoreHorizontal,
  Trash2,
  Edit,
  UserX,
  Inbox,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Demo data
const areaChartData = [
  { name: '01 Apr', value: 800 },
  { name: '02 Apr', value: 950 },
  { name: '03 Apr', value: 1100 },
  { name: '04 Apr', value: 1250 },
  { name: '05 Apr', value: 1100 },
  { name: '06 Apr', value: 1300 },
  { name: '07 Apr', value: 1200 },
];

const pieChartData = [
  { name: 'Household', value: 43, color: 'hsl(186, 100%, 42%)' },
  { name: 'Food', value: 28, color: 'hsl(142, 76%, 42%)' },
  { name: 'Clothing', value: 16, color: 'hsl(45, 100%, 51%)' },
  { name: 'Entertainment', value: 13, color: 'hsl(142, 76%, 75%)' },
];

const transactions = [
  { id: 1, name: 'Lunch money', date: '06 April 2023', amount: -10, color: 'bg-accent' },
  { id: 2, name: 'April Bonus', date: '05 April 2023', amount: 500, color: 'bg-success' },
  { id: 3, name: 'Allowance', date: '05 April 2023', amount: 500, color: 'bg-success' },
  { id: 4, name: 'Pay David', date: '05 April 2023', amount: -50, color: 'bg-cyan' },
  { id: 5, name: 'Netflix subscription', date: '05 April 2023', amount: -10, color: 'bg-warning' },
];

const colorTokens = [
  { name: 'Primary', var: '--primary', desc: 'Main brand color for primary actions', usage: 'bg-primary, text-primary' },
  { name: 'Accent', var: '--accent', desc: 'Coral/Orange for highlights and attention', usage: 'bg-accent, text-accent' },
  { name: 'Success', var: '--success', desc: 'Green for positive states and confirmations', usage: 'bg-success, text-success' },
  { name: 'Warning', var: '--warning', desc: 'Yellow/Amber for warnings and alerts', usage: 'bg-warning, text-warning' },
  { name: 'Info', var: '--info', desc: 'Blue for informational elements', usage: 'bg-info, text-info' },
  { name: 'Cyan', var: '--cyan', desc: 'Cyan for variety and variety icons', usage: 'bg-cyan, text-cyan' },
  { name: 'Destructive', var: '--destructive', desc: 'Red for errors and destructive actions', usage: 'bg-destructive, text-destructive' },
  { name: 'Muted', var: '--muted', desc: 'Subtle backgrounds and secondary text', usage: 'bg-muted, text-muted-foreground' },
];

// Activity Feed demo data
const demoActivities = [
  {
    id: '1',
    type: 'join_request' as const,
    title: 'Yêu cầu tham gia lớp học',
    description: 'Nguyễn Văn An muốn tham gia lớp Toán 12A1',
    time: '5 phút trước',
    user: { name: 'Nguyễn Văn An', initials: 'NA' },
    actionable: true
  },
  {
    id: '2',
    type: 'submission' as const,
    title: 'Bài tập đã nộp',
    description: 'Trần Thị Bình đã nộp bài kiểm tra Chương 3',
    time: '15 phút trước',
    user: { name: 'Trần Thị Bình', initials: 'TB' }
  },
  {
    id: '3',
    type: 'alert' as const,
    title: 'Cảnh báo tiến độ',
    description: '5 học sinh chưa hoàn thành bài tập tuần này',
    time: '1 giờ trước'
  },
  {
    id: '4',
    type: 'comment' as const,
    title: 'Bình luận mới',
    description: 'Lê Minh Châu đã bình luận về bài giảng Đại số',
    time: '2 giờ trước',
    user: { name: 'Lê Minh Châu', initials: 'LC' }
  },
];

// Students table demo data
const demoStudents = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@school.edu', class: 'Toán 12A1', progress: 85, status: 'active', avatar: 'NA' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@school.edu', class: 'Toán 12A1', progress: 92, status: 'active', avatar: 'TB' },
  { id: 3, name: 'Lê Minh Châu', email: 'chau.le@school.edu', class: 'Vật Lý 11B2', progress: 67, status: 'warning', avatar: 'LC' },
  { id: 4, name: 'Phạm Đức Dũng', email: 'dung.pham@school.edu', class: 'Hoá Học 10A3', progress: 45, status: 'danger', avatar: 'PD' },
  { id: 5, name: 'Hoàng Thị Em', email: 'em.hoang@school.edu', class: 'Toán 12A1', progress: 78, status: 'active', avatar: 'HE' },
];

// Assignments table demo data
const demoAssignments = [
  { id: 1, title: 'Bài tập Chương 3: Hàm số', class: 'Toán 12A1', dueDate: '2024-02-15', submitted: 28, total: 32, status: 'active' },
  { id: 2, title: 'Kiểm tra giữa kỳ', class: 'Vật Lý 11B2', dueDate: '2024-02-10', submitted: 30, total: 30, status: 'completed' },
  { id: 3, title: 'Thực hành: Phản ứng oxi hoá', class: 'Hoá Học 10A3', dueDate: '2024-02-18', submitted: 15, total: 35, status: 'active' },
  { id: 4, title: 'Bài luận: Tác phẩm văn học', class: 'Ngữ Văn 12A1', dueDate: '2024-02-08', submitted: 25, total: 32, status: 'overdue' },
];

const activityIcons = {
  join_request: UserPlus,
  submission: FileCheck,
  alert: AlertCircle,
  comment: MessageSquare
};

const activityColors = {
  join_request: "bg-primary/10 text-primary",
  submission: "bg-success/10 text-success",
  alert: "bg-warning/10 text-warning",
  comment: "bg-secondary text-secondary-foreground"
};

// Stagger Animation Demo Component
function StaggerDemo() {
  const [isVisible, setIsVisible] = useState(true);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const items = [
    { id: 1, label: "Toán học", value: "85%", color: "bg-primary" },
    { id: 2, label: "Vật lý", value: "72%", color: "bg-success" },
    { id: 3, label: "Hoá học", value: "90%", color: "bg-info" },
    { id: 4, label: "Sinh học", value: "68%", color: "bg-warning" },
  ];

  return (
    <div>
      <Button
        variant="outline"
        className="rounded-xl mb-4"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"} Items
      </Button>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {items.map((i) => (
              <motion.div
                key={i.id}
                variants={item}
                className="p-4 bg-muted/50 rounded-xl text-center"
              >
                <div className={`h-2 w-full ${i.color} rounded-full mb-3`}
                  style={{ width: i.value }} />
                <p className="font-medium">{i.label}</p>
                <p className="text-sm text-muted-foreground">{i.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// AnimatePresence Demo Component
function AnimatePresenceDemo() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Nguyễn Văn An đã nộp bài", type: "success" },
    { id: 2, text: "Deadline bài tập sắp hết", type: "warning" },
  ]);

  const addNotification = () => {
    const newId = Date.now();
    const types = ["success", "warning", "info", "error"];
    const messages = [
      "Học sinh mới đăng ký",
      "Bài tập đã được chấm",
      "Có câu hỏi mới",
      "Hệ thống cập nhật",
    ];
    setNotifications([
      ...notifications,
      {
        id: newId,
        text: messages[Math.floor(Math.random() * messages.length)],
        type: types[Math.floor(Math.random() * types.length)],
      },
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const typeColors = {
    success: "border-success/50 bg-success/10",
    warning: "border-warning/50 bg-warning/10",
    info: "border-info/50 bg-info/10",
    error: "border-destructive/50 bg-destructive/10",
  };

  return (
    <div>
      <Button
        variant="outline"
        className="rounded-xl mb-4"
        onClick={addNotification}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Notification
      </Button>

      <div className="space-y-2">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex items-center justify-between p-3 rounded-xl border-2 ${typeColors[n.type as keyof typeof typeColors]}`}
            >
              <span className="text-sm">{n.text}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-lg"
                onClick={() => removeNotification(n.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Demo() {
  const [isDark, setIsDark] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Design System</h1>
            <p className="text-muted-foreground">
              LearnWell Platform - Component Library & Style Guide
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Table of Contents */}
        <div className="card-modern p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2">
            {['Colors', 'Typography', 'VN Typography', 'Layout', 'Glassmorphism', 'Buttons', 'Cards', 'Stat Cards', 'Activity Feed', 'Tables', 'Pagination', 'Dialogs', 'Loading States', 'Toast', 'Animations', 'Form States', 'Charts', 'Icons', 'Forms', 'Transactions'].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {section}
              </a>
            ))}
          </div>
        </div>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Colors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {colorTokens.map((token) => (
              <div key={token.name} className="card-modern p-4">
                <div
                  className="h-20 rounded-xl mb-3"
                  style={{ backgroundColor: `hsl(var(${token.var}))` }}
                />
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{token.name}</h3>
                  <button
                    onClick={() => copyToClipboard(token.usage, token.name)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedToken === token.name ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{token.desc}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">{token.usage}</code>
              </div>
            ))}
          </div>

          {/* Background Gradient */}
          <div className="card-modern p-6">
            <h3 className="font-semibold mb-4">Page Background Gradient</h3>
            <div
              className="h-32 rounded-xl border border-border"
              style={{ background: 'var(--gradient-page)' }}
            />
            <p className="text-sm text-muted-foreground mt-3">
              Sử dụng CSS variable <code className="bg-muted px-2 py-0.5 rounded">var(--gradient-page)</code> cho background trang
            </p>
          </div>
        </section>

        {/* Vietnamese Typography & Clipping Fixes */}
        <section id="vn-typography" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Vietnamese Typography & Clipping Fixes</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-modern p-6 space-y-6">
              <h3 className="font-semibold text-lg mb-4">1. Accents & Line Height</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tiếng Việt có nhiều dấu (hỏi, ngã, nặng, sắc, huyền) và các ký tự đặc biệt (ư, ơ, â, ă).
                Khi sử dụng line-height quá thấp (như <code className="bg-muted px-1.5 py-0.5 rounded">leading-none</code>),
                các dấu này dễ bị cắt mất bởi khung bao của phần tử.
              </p>

              <div className="space-y-8">
                <div className="p-4 bg-muted/20 rounded-xl border border-border">
                  <p className="text-xs text-destructive font-medium mb-2">❌ Bad: leading-none (Clipped Accents)</p>
                  <h1 className="text-4xl font-black italic uppercase leading-none border-t border-b border-destructive/20 py-2">
                    Học tập Vượt mọi giới hạn
                  </h1>
                </div>

                <div className="p-4 bg-success/5 rounded-xl border border-success/20">
                  <p className="text-xs text-success font-medium mb-2">✅ Good: leading-[1.4..1.6] (Safe Accents)</p>
                  <h1 className="text-4xl font-black italic uppercase leading-[1.6] border-t border-b border-success/20 py-2">
                    Học tập Vượt mọi giới hạn
                  </h1>
                </div>
              </div>
            </div>

            <div className="card-modern p-6 space-y-6">
              <h3 className="font-semibold text-lg mb-4">2. Gradient & Italic Clipping (Safe Area)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Khi sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">bg-clip-text</code> với font chữ in nghiêng (italic),
                phần đuôi của các ký tự (như chữ N, H, M) thường bị cắt mất do vượt quá bounding box mặc định.
              </p>

              <div className="space-y-6">
                <div className="p-4 bg-muted/20 rounded-xl">
                  <p className="text-xs text-destructive font-medium mb-3">❌ Clipped Gradient Text</p>
                  <h1 className="text-4xl font-black italic uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      VƯỢT MỌI GIỚI HẠN
                    </span>
                  </h1>
                </div>

                <div className="p-4 bg-success/5 rounded-xl border border-success/20">
                  <p className="text-xs text-success font-medium mb-3">✅ Fixed with Safe Area Padding</p>
                  <h1 className="text-4xl font-black italic uppercase">
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent px-6 -mx-6 py-4 -my-4">
                      VƯỢT MỌI GIỚI HẠN
                    </span>
                  </h1>
                </div>

                <div className="p-4 bg-muted/50 rounded-xl">
                  <h4 className="text-sm font-bold mb-2">Kỹ thuật "Safe Area":</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Sử dụng <code className="font-mono text-primary">inline-block</code></li>
                    <li>Thêm <code className="font-mono text-primary">px-6 py-4</code> (hoặc lớn hơn) để mở rộng vùng vẽ.</li>
                    <li>Sử dụng margin âm tương ứng <code className="font-mono text-primary">-mx-6 -my-4</code> để không làm ảnh hưởng layout.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout & Spacing Patterns */}
        <section id="layout" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Layout & Spacing Patterns</h2>

          <div className="grid grid-cols-1 gap-6">
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Container & Page Spacing</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Quy chuẩn về khoảng cách dọc và căn lề cho các trang Dashboard và Landing Page.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-xl border border-dashed border-border">
                  <p className="text-xs font-mono text-primary mb-2">.container py-10 (Dashboard Standard)</p>
                  <div className="h-20 bg-primary/10 rounded-lg flex items-center justify-center text-xs font-medium border border-primary/20">
                    Nội dung Dashboard
                  </div>
                </div>
                <div className="p-4 bg-muted/20 rounded-xl border border-dashed border-border">
                  <p className="text-xs font-mono text-primary mb-2">.container py-16 lg:py-24 (Landing Page Standard)</p>
                  <div className="h-24 bg-accent/10 rounded-lg flex items-center justify-center text-xs font-medium border border-accent/20">
                    Nội dung Landing Page
                  </div>
                </div>
              </div>
            </div>

            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Responsive Grid System</h3>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-mono text-primary mb-3">grid-cols-1 md:grid-cols-2 lg:grid-cols-4</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 bg-muted rounded-xl flex items-center justify-center text-xs border border-border">
                        Col {i}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-mono text-primary mb-3">grid-cols-1 lg:grid-cols-3 (Main + Sidebar)</p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 h-16 bg-muted rounded-xl flex items-center justify-center text-xs border border-border">Main Content (2/3)</div>
                    <div className="h-16 bg-muted rounded-xl flex items-center justify-center text-xs border border-border">Sidebar (1/3)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Glassmorphism & Effects */}
        <section id="glassmorphism" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Glassmorphism & Effects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-modern p-6 flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-primary shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)] mb-4 flex items-center justify-center">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-semibold">Brand Glow</h3>
              <p className="text-xs text-muted-foreground mt-2">Sử dụng shadow với màu primary và độ mờ cao để tạo hiệu ứng phát sáng.</p>
              <code className="text-[10px] mt-4 bg-muted p-1 rounded">shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]</code>
            </div>

            <div className="card-modern p-6 flex flex-col items-center text-center bg-white/5 backdrop-blur-xl border-white/10">
              <div className="h-20 w-20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl mb-4" />
              <h3 className="font-semibold">Heavy Glass</h3>
              <p className="text-xs text-muted-foreground mt-2">Sử dụng backdrop-blur-xl kết hợp với border mờ để tạo cảm giác kính dày.</p>
              <code className="text-[10px] mt-4 bg-muted p-1 rounded">backdrop-blur-xl bg-white/10 border-white/20</code>
            </div>

            <div className="card-modern p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer group">
              <div className="h-20 w-20 rounded-2xl bg-muted mb-4 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="font-semibold">Dynamic Hover</h3>
              <p className="text-xs text-muted-foreground mt-2">Kết hợp shadow mạnh, scale và transition mượt mà cho các tương tác premium.</p>
              <code className="text-[10px] mt-4 bg-muted p-1 rounded">hover:shadow-2xl transition-all duration-500</code>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>

          <div className="card-modern p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Primary</p>
                <Button className="w-full rounded-xl">
                  <Plus className="h-4 w-4 mr-2" />
                  Add new
                </Button>
                <Button className="w-full rounded-xl" disabled>
                  Disabled
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Outline</p>
                <Button variant="outline" className="w-full rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="w-full rounded-xl" disabled>
                  Disabled
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Ghost</p>
                <Button variant="ghost" className="w-full rounded-xl">
                  View all
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-3">Destructive</p>
                <Button variant="destructive" className="w-full rounded-xl">
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm font-medium mb-4">Button Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" className="rounded-xl">Small</Button>
                <Button className="rounded-xl">Default</Button>
                <Button size="lg" className="rounded-xl">Large</Button>
                <Button size="icon" className="rounded-xl">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-2">Basic Card (.card-modern)</h3>
              <p className="text-sm text-muted-foreground">
                Card cơ bản với bo góc 16px, shadow nhẹ, background trắng.
                Sử dụng class <code className="bg-muted px-1.5 py-0.5 rounded">card-modern</code>
                hoặc shadcn Card component.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Shadcn Card</CardTitle>
                <CardDescription>Card component từ shadcn/ui</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sử dụng Card, CardHeader, CardContent, CardTitle, CardDescription.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stat Cards Section */}
        <section id="stat-cards" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Stat Cards</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stat Card with Trend Up */}
            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="icon-box-info">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="trend-up">
                  <ArrowUpRight className="h-4 w-4" />
                  10.32%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Balance</p>
              <p className="text-2xl font-bold">$12,003.902</p>
            </div>

            {/* Stat Card with Trend Up */}
            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="icon-box-success">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="trend-up">
                  <ArrowUpRight className="h-4 w-4" />
                  16.02%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Incomes This Month</p>
              <p className="text-2xl font-bold">$12,003.902</p>
            </div>

            {/* Stat Card with Trend Down */}
            <div className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className="icon-box-accent">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <span className="trend-down">
                  <ArrowDownRight className="h-4 w-4" />
                  4.32%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Expenses This Month</p>
              <p className="text-2xl font-bold">$12,003.902</p>
            </div>
          </div>

          <div className="mt-6 card-modern p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Usage:</strong> Sử dụng class <code className="bg-muted px-1.5 py-0.5 rounded">stat-card</code>
              cho container, <code className="bg-muted px-1.5 py-0.5 rounded">icon-box-*</code>
              cho icon wrapper (primary, accent, success, warning, info, cyan),
              và <code className="bg-muted px-1.5 py-0.5 rounded">trend-up</code> /
              <code className="bg-muted px-1.5 py-0.5 rounded">trend-down</code> cho trend indicators.
            </p>
          </div>
        </section>

        {/* Activity Feed Section */}
        <section id="activity-feed" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Activity Feed</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Items */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Hoạt động gần đây</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  Xem tất cả
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {demoActivities.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-4 rounded-2xl border-2 border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${activityColors[activity.type]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{activity.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {activity.description}
                            </p>
                          </div>
                          {activity.user && (
                            <Avatar className="h-8 w-8 shrink-0">
                              <AvatarFallback className="text-xs bg-secondary">
                                {activity.user.initials}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.time}</span>
                          </div>
                          {activity.actionable && (
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">
                                Từ chối
                              </Button>
                              <Button size="sm" className="h-7 text-xs">
                                Chấp nhận
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="space-y-6">
              <div className="card-modern p-6">
                <h3 className="font-semibold mb-4">Activity Item Structure</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="icon-box-info h-8 w-8">
                      <Info className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Icon Box</p>
                      <p className="text-xs text-muted-foreground">Sử dụng màu theo loại activity: primary (join), success (submission), warning (alert), secondary (comment)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="icon-box-primary h-8 w-8">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Content Area</p>
                      <p className="text-xs text-muted-foreground">Title (font-medium), description (text-muted-foreground), timestamp với icon Clock</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="icon-box-accent h-8 w-8">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Avatar & Actions</p>
                      <p className="text-xs text-muted-foreground">Avatar bên phải nếu có user, action buttons nếu actionable</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-modern p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Styling:</strong> Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">rounded-2xl border-2 border-border/60</code>
                  cho container, <code className="bg-muted px-1.5 py-0.5 rounded">space-y-4</code> cho khoảng cách giữa các items.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tables Section */}
        <section id="tables" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Tables</h2>

          <Tabs defaultValue="students" className="space-y-6">
            <TabsList>
              <TabsTrigger value="students">Danh sách học sinh</TabsTrigger>
              <TabsTrigger value="assignments">Bài tập</TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <div className="card-modern p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Học sinh</h3>
                    <p className="text-sm text-muted-foreground">Quản lý danh sách học sinh trong lớp</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Tìm kiếm..." className="pl-10 w-64 rounded-xl" />
                    </div>
                    <Button className="rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm học sinh
                    </Button>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Học sinh</TableHead>
                        <TableHead className="font-semibold">Lớp</TableHead>
                        <TableHead className="font-semibold">Tiến độ</TableHead>
                        <TableHead className="font-semibold">Trạng thái</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoStudents.map((student) => (
                        <TableRow key={student.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                  {student.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="rounded-lg">
                              {student.class}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${student.progress >= 80 ? 'bg-success' :
                                    student.progress >= 60 ? 'bg-warning' : 'bg-destructive'
                                    }`}
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={student.status === 'active' ? 'default' : 'secondary'}
                              className={`rounded-lg ${student.status === 'active' ? 'bg-success/10 text-success border-success/20' :
                                student.status === 'warning' ? 'bg-warning/10 text-warning border-warning/20' :
                                  'bg-destructive/10 text-destructive border-destructive/20'
                                }`}
                            >
                              {student.status === 'active' ? 'Đang học' :
                                student.status === 'warning' ? 'Cảnh báo' : 'Cần hỗ trợ'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assignments">
              <div className="card-modern p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Bài tập</h3>
                    <p className="text-sm text-muted-foreground">Quản lý bài tập và deadline</p>
                  </div>
                  <Button className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài tập
                  </Button>
                </div>

                <div className="rounded-xl border-2 border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Bài tập</TableHead>
                        <TableHead className="font-semibold">Lớp</TableHead>
                        <TableHead className="font-semibold">Hạn nộp</TableHead>
                        <TableHead className="font-semibold">Đã nộp</TableHead>
                        <TableHead className="font-semibold">Trạng thái</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoAssignments.map((assignment) => (
                        <TableRow key={assignment.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="icon-box-info h-9 w-9">
                                <GraduationCap className="h-4 w-4" />
                              </div>
                              <p className="font-medium">{assignment.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="rounded-lg">
                              {assignment.class}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(assignment.dueDate).toLocaleDateString('vi-VN')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{assignment.submitted}</span>
                              <span className="text-muted-foreground">/ {assignment.total}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`rounded-lg ${assignment.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                                assignment.status === 'active' ? 'bg-info/10 text-info border-info/20' :
                                  'bg-destructive/10 text-destructive border-destructive/20'
                                }`}
                            >
                              {assignment.status === 'completed' ? 'Hoàn thành' :
                                assignment.status === 'active' ? 'Đang mở' : 'Quá hạn'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 card-modern p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Table Styling:</strong> Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">rounded-xl border-2 border-border</code>
              cho container, <code className="bg-muted px-1.5 py-0.5 rounded">bg-muted/50</code> cho header row,
              và <code className="bg-muted px-1.5 py-0.5 rounded">hover:bg-muted/30</code> cho body rows.
            </p>
          </div>
        </section>

        {/* Pagination Section */}
        <section id="pagination" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Pagination</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Pagination */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Basic Pagination</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Phân trang cơ bản với các nút Previous/Next và số trang
              </p>

              <div className="rounded-xl border-2 border-border p-4 bg-muted/20">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>

            {/* Compact Pagination */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Compact Pagination</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Phiên bản thu gọn cho mobile hoặc không gian hạn chế
              </p>

              <div className="rounded-xl border-2 border-border p-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="rounded-xl gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Trước
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Trang <span className="font-medium text-foreground">2</span> / 10
                  </span>
                  <Button variant="outline" size="sm" className="rounded-xl gap-1">
                    Sau
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination in context */}
          <div className="mt-6 card-modern p-6">
            <h3 className="font-semibold mb-4">Pagination trong Table</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ví dụ pagination được tích hợp vào bảng danh sách học sinh
            </p>

            <div className="rounded-xl border-2 border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Học sinh</TableHead>
                    <TableHead className="font-semibold">Lớp</TableHead>
                    <TableHead className="font-semibold">Tiến độ</TableHead>
                    <TableHead className="font-semibold">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoStudents.slice(0, 3).map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-lg text-xs">
                          {student.class}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-lg text-xs ${student.status === 'active' ? 'bg-success/10 text-success' :
                            student.status === 'warning' ? 'bg-warning/10 text-warning' :
                              'bg-destructive/10 text-destructive'
                            }`}
                        >
                          {student.status === 'active' ? 'Đang học' :
                            student.status === 'warning' ? 'Cảnh báo' : 'Cần hỗ trợ'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  Hiển thị <span className="font-medium">1-3</span> trong <span className="font-medium">50</span> học sinh
                </p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="h-8" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive className="h-8 w-8">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="h-8 w-8">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="h-8 w-8">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" className="h-8" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>

          <div className="mt-6 card-modern p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Usage:</strong> Import từ <code className="bg-muted px-1.5 py-0.5 rounded">@/components/ui/pagination</code>.
              Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">isActive</code> prop để highlight trang hiện tại.
              Đặt pagination trong footer của table với <code className="bg-muted px-1.5 py-0.5 rounded">border-t border-border bg-muted/30</code>.
            </p>
          </div>
        </section>

        {/* Dialogs Section */}
        <section id="dialogs" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Dialogs</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standard Dialog */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Standard Dialog</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dialog cơ bản cho form tạo mới, chỉnh sửa thông tin
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài tập mới
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Tạo bài tập mới</DialogTitle>
                    <DialogDescription>
                      Điền thông tin để tạo bài tập cho lớp học của bạn.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tiêu đề bài tập</label>
                      <Input placeholder="Ví dụ: Bài tập Chương 4" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lớp</label>
                      <Input placeholder="Chọn lớp học" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hạn nộp</label>
                      <Input type="date" className="rounded-xl" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="rounded-xl">Huỷ</Button>
                    <Button className="rounded-xl">Tạo bài tập</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Alert Dialog - Destructive */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Alert Dialog (Destructive)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dialog xác nhận cho các hành động nguy hiểm như xoá
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="rounded-xl">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xoá học sinh
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xoá học sinh?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Dữ liệu học sinh <span className="font-medium text-foreground">Nguyễn Văn An</span> sẽ bị xoá vĩnh viễn khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Huỷ</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-destructive hover:bg-destructive/90">
                      Xoá học sinh
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* More Dialog Examples */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Edit Dialog */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Edit Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa thông tin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa học sinh</DialogTitle>
                    <DialogDescription>
                      Cập nhật thông tin học sinh trong lớp.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">NA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input defaultValue="Nguyễn Văn An" className="rounded-xl mb-2" />
                        <Input defaultValue="an.nguyen@school.edu" className="rounded-xl" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="rounded-xl">Huỷ</Button>
                    <Button className="rounded-xl">Lưu thay đổi</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Confirm Dialog */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Confirm Dialog</h3>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl w-full">
                    <UserX className="h-4 w-4 mr-2" />
                    Khoá tài khoản
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Khoá tài khoản học sinh?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Học sinh sẽ không thể đăng nhập và truy cập lớp học. Bạn có thể mở khoá sau.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Huỷ</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-warning text-warning-foreground hover:bg-warning/90">
                      Khoá tài khoản
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Info Dialog */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Info Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="rounded-xl w-full">
                    <Info className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chi tiết bài tập</DialogTitle>
                    <DialogDescription>
                      Thông tin về bài tập Chương 3: Hàm số
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Lớp</span>
                      <Badge variant="secondary" className="rounded-lg">Toán 12A1</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Hạn nộp</span>
                      <span className="font-medium">15/02/2024</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Đã nộp</span>
                      <span className="font-medium text-success">28/32</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Trạng thái</span>
                      <Badge className="rounded-lg bg-info/10 text-info">Đang mở</Badge>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="rounded-xl">Đóng</Button>
                    <Button className="rounded-xl">Chấm bài</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-6 card-modern p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Usage:</strong> Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">Dialog</code> cho form và thông tin,
              <code className="bg-muted px-1.5 py-0.5 rounded">AlertDialog</code> cho xác nhận hành động.
              Thêm <code className="bg-muted px-1.5 py-0.5 rounded">rounded-xl</code> cho các buttons trong dialog.
              Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">bg-destructive</code> cho action nguy hiểm,
              <code className="bg-muted px-1.5 py-0.5 rounded">bg-warning</code> cho cảnh báo.
            </p>
          </div>
        </section>

        {/* Loading States Section */}
        <section id="loading-states" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Loading States</h2>

          <div className="space-y-8">
            {/* Skeleton Cards */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Skeleton Cards</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">SkeletonCard</code> với variants: stat, class, activity
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">variant="stat"</p>
                  <SkeletonCard variant="stat" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">variant="class"</p>
                  <SkeletonCard variant="class" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">variant="activity"</p>
                  <SkeletonCard variant="activity" />
                </div>
              </div>
            </div>

            {/* Basic Skeletons */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Basic Skeleton Elements</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">Skeleton</code> component cho các phần tử cơ bản
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Text Lines</p>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Avatar + Text</p>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Button</p>
                    <Skeleton className="h-10 w-28 rounded-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Card Header</p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty States */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Empty States</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Hiển thị khi không có dữ liệu để hướng dẫn người dùng
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
                  <div className="icon-box-info mx-auto mb-4">
                    <Inbox className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold mb-2">Chưa có học sinh</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Thêm học sinh vào lớp để bắt đầu theo dõi tiến độ
                  </p>
                  <Button className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm học sinh
                  </Button>
                </div>

                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
                  <div className="icon-box-warning mx-auto mb-4">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold mb-2">Không có bài tập</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tạo bài tập đầu tiên để giao cho học sinh
                  </p>
                  <Button variant="outline" className="rounded-xl">
                    Tạo bài tập
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading Table */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Loading Table</h3>
              <div className="border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Học sinh</TableHead>
                      <TableHead>Lớp</TableHead>
                      <TableHead>Tiến độ</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3].map((i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div className="space-y-1">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-2 w-full rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 rounded-lg" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* Toast Notifications Section */}
        <section id="toast" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Toast Notifications</h2>

          <div className="card-modern p-6">
            <p className="text-sm text-muted-foreground mb-6">
              Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">toast()</code> từ Sonner để hiển thị thông báo phản hồi
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="rounded-xl flex-col h-auto py-4"
                onClick={() => toast.success("Thành công!", { description: "Đã lưu thay đổi thành công" })}
              >
                <CheckCircle className="h-5 w-5 text-success mb-2" />
                <span className="text-sm">Success</span>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl flex-col h-auto py-4"
                onClick={() => toast.error("Lỗi!", { description: "Có lỗi xảy ra, vui lòng thử lại" })}
              >
                <XCircle className="h-5 w-5 text-destructive mb-2" />
                <span className="text-sm">Error</span>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl flex-col h-auto py-4"
                onClick={() => toast.warning("Cảnh báo!", { description: "Hành động này không thể hoàn tác" })}
              >
                <AlertTriangle className="h-5 w-5 text-warning mb-2" />
                <span className="text-sm">Warning</span>
              </Button>

              <Button
                variant="outline"
                className="rounded-xl flex-col h-auto py-4"
                onClick={() => toast.info("Thông tin", { description: "Có 3 học sinh mới đăng ký" })}
              >
                <Info className="h-5 w-5 text-info mb-2" />
                <span className="text-sm">Info</span>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-medium mb-4">Advanced Toasts</h4>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    toast.promise(
                      new Promise((resolve) => setTimeout(resolve, 2000)),
                      {
                        loading: "Đang lưu...",
                        success: "Đã lưu thành công!",
                        error: "Có lỗi xảy ra",
                      }
                    );
                  }}
                >
                  <Loader2 className="h-4 w-4 mr-2" />
                  Promise Toast
                </Button>

                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    toast("Xoá học sinh?", {
                      description: "Nguyễn Văn An sẽ bị xoá khỏi lớp",
                      action: {
                        label: "Xoá",
                        onClick: () => toast.success("Đã xoá học sinh"),
                      },
                      cancel: {
                        label: "Huỷ",
                        onClick: () => { },
                      },
                    });
                  }}
                >
                  Action Toast
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-xl">
              <p className="text-sm font-medium mb-2">Code Example:</p>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
                {`import { toast } from "sonner";

// Basic
toast.success("Thành công!");
toast.error("Lỗi!");
toast.warning("Cảnh báo!");
toast.info("Thông tin");

// With description
toast.success("Thành công!", {
  description: "Đã lưu thay đổi"
});

// Promise
toast.promise(saveData(), {
  loading: "Đang lưu...",
  success: "Đã lưu!",
  error: "Lỗi!"
});`}
              </pre>
            </div>
          </div>
        </section>

        {/* Animations Section */}
        <section id="animations" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Animations (Framer Motion)</h2>

          <div className="space-y-8">
            {/* Hover Effects */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Hover Effects</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sử dụng <code className="bg-muted px-1.5 py-0.5 rounded">motion</code> components với whileHover/whileTap
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="stat-card cursor-pointer"
                >
                  <div className="icon-box-primary mb-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Scale</p>
                  <p className="text-xs text-muted-foreground">Hover to scale</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="stat-card cursor-pointer"
                >
                  <div className="icon-box-success mb-3">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Lift</p>
                  <p className="text-xs text-muted-foreground">Hover to lift</p>
                </motion.div>

                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.3)"
                  }}
                  className="stat-card cursor-pointer"
                >
                  <div className="icon-box-info mb-3">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Glow</p>
                  <p className="text-xs text-muted-foreground">Hover for glow</p>
                </motion.div>

                <motion.div
                  whileHover={{ rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 0.5 }}
                  className="stat-card cursor-pointer"
                >
                  <div className="icon-box-warning mb-3">
                    <Bell className="h-5 w-5" />
                  </div>
                  <p className="font-medium">Wiggle</p>
                  <p className="text-xs text-muted-foreground">Hover to wiggle</p>
                </motion.div>
              </div>
            </div>

            {/* Stagger Animation */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Stagger Animation</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Hiệu ứng xuất hiện tuần tự cho danh sách items
              </p>

              <StaggerDemo />
            </div>

            {/* AnimatePresence */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">AnimatePresence (Enter/Exit)</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Animate items khi thêm/xoá khỏi DOM
              </p>

              <AnimatePresenceDemo />
            </div>

            {/* Code Example */}
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4">Code Examples</h3>
              <div className="p-4 bg-muted/50 rounded-xl">
                <pre className="text-xs text-muted-foreground overflow-x-auto">
                  {`import { motion, AnimatePresence } from "framer-motion";

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Card content
</motion.div>

// Stagger children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section id="charts" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Charts</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart */}
            <div className="lg:col-span-2 card-modern p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Your Balance</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl font-bold">$120,543.43</p>
                    <span className="trend-up text-sm">
                      <ArrowUpRight className="h-4 w-4" />
                      20.32%
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Last 7 days
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mb-6 border-b border-border">
                {['Incomes', 'Expense', 'Savings', 'Investment'].map((tab, index) => (
                  <button
                    key={tab}
                    className={`tab-underline ${index === 1 ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 76%, 42%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 76%, 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-lg)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(142, 76%, 42%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="card-modern p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Analytics</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>

              <Tabs defaultValue="incomes" className="mb-4">
                <TabsList className="w-full">
                  <TabsTrigger value="incomes" className="flex-1">Incomes</TabsTrigger>
                  <TabsTrigger value="expenses" className="flex-1">Expenses</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex justify-center mb-4">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap gap-4 justify-center text-xs">
                {pieChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section id="icons" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Icon Boxes</h2>

          <div className="card-modern p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-accent">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Accent</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-success">
                  <DollarSign className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-warning">
                  <Bell className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-info">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Info</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="icon-box-cyan">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">Cyan</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
              <strong>Usage:</strong> Sử dụng class <code className="bg-muted px-1.5 py-0.5 rounded">icon-box-*</code>
              (primary, accent, success, warning, info, cyan) cho icon wrapper.
              Icon library: <strong>Lucide React</strong>
            </p>
          </div>
        </section>

        {/* Forms Section */}
        <section id="forms" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Form Elements</h2>

          <div className="card-modern p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Input</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 rounded-xl bg-muted/50 border-transparent focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Default Input</label>
                  <Input placeholder="Enter text..." className="rounded-xl" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Disabled Input</label>
                  <Input placeholder="Disabled..." className="rounded-xl" disabled />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Badges</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Avatar</label>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=demo" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher" />
                      <AvatarFallback>GV</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Validation & States */}
        <section id="form-states" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Form Validation & States</h2>

          <div className="card-modern p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Lỗi nhập liệu
                  </label>
                  <Input
                    value="Email không hợp lệ"
                    className="rounded-xl border-destructive focus-visible:ring-destructive bg-destructive/5"
                    readOnly
                  />
                  <p className="text-xs text-destructive">Vui lòng nhập định dạng email chính xác (ví dụ: name@example.com)</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-success flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Hợp lệ
                  </label>
                  <Input
                    value="tony.pham@learnwell.vn"
                    className="rounded-xl border-success focus-visible:ring-success bg-success/5"
                    readOnly
                  />
                  <p className="text-xs text-success">Email này có thể sử dụng.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Đang tải xử lý</label>
                  <div className="relative">
                    <Input
                      placeholder="Đang kiểm tra dữ liệu..."
                      className="rounded-xl pr-10"
                      readOnly
                    />
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Vô hiệu hoá (Disabled)</label>
                  <Input
                    value="Dữ liệu không được phép sửa"
                    className="rounded-xl bg-muted opacity-50 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm font-medium text-primary mb-2">💡 Best Practice:</p>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                <li>Sử dụng <code className="text-primary font-mono">destructive</code> token cho các lỗi và cảnh báo quan trọng.</li>
                <li>Luôn đi kèm icon và text giải thích để hỗ trợ Accessibility (A11y).</li>
                <li>Sử dụng <code className="text-primary font-mono">animate-spin</code> với Loader2 cho cảm giác phản hồi tức thì.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section id="transactions" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Transaction List</h2>

          <div className="card-modern p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Transactions</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <div className="space-y-0">
              {transactions.map((tx) => (
                <div key={tx.id} className="transaction-item">
                  <div className={`h-10 w-10 rounded-full ${tx.color} flex items-center justify-center shrink-0`}>
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Usage Guidelines</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-success" />
                Do's
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sử dụng semantic color tokens (bg-primary, text-muted-foreground, ...)</li>
                <li>• Bo góc cards với rounded-2xl (16px) hoặc rounded-xl (12px)</li>
                <li>• Sử dụng class .card-modern hoặc .stat-card cho cards</li>
                <li>• Sử dụng icon-box-* cho icon wrappers</li>
                <li>• Giữ spacing consistent (gap-4, gap-6, p-4, p-6)</li>
                <li>• Sử dụng font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)</li>
              </ul>
            </div>

            <div className="card-modern p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <X className="h-5 w-5 text-destructive" />
                Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• KHÔNG sử dụng màu trực tiếp (text-white, bg-blue-500, ...)</li>
                <li>• KHÔNG sử dụng inline styles cho colors</li>
                <li>• KHÔNG mix rounded values (giữ consistent)</li>
                <li>• KHÔNG sử dụng quá nhiều gradient borders</li>
                <li>• KHÔNG để spacing quá nhỏ (&lt; gap-2)</li>
                <li>• KHÔNG sử dụng font weight quá nhẹ (&lt; 400)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Status States Section */}
        <section id="states" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Status States</h2>
          <div className="grid grid-cols-1 gap-10">
            <div className="card-modern p-10 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Loading State</h3>
              <div className="w-full max-w-md">
                <LoadingState />
              </div>
            </div>

            <div className="card-modern p-10 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Empty State</h3>
              <div className="w-full max-w-md">
                <EmptyState
                  title="Chưa có khóa học nào"
                  description="Bắt đầu hành trình bằng cách tạo khóa học đầu tiên của bạn."
                  actionLabel="Tạo khóa học"
                  onAction={() => { }}
                />
              </div>
            </div>

            <div className="card-modern p-10 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Error State</h3>
              <div className="w-full max-w-md">
                <ErrorState onAction={() => { }} />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground py-8 border-t border-border">
          <p>LearnWell Platform Design System v1.0</p>
          <p className="mt-1">Built with React, Tailwind CSS, shadcn/ui, and Recharts</p>
        </footer>
      </div>
    </div>
  );
}
