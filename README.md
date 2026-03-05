# LearnWell - Comprehensive Educational Management Platform

**LearnWell** is a modern, full-featured Learning Management System (LMS) designed to support Teachers, Students, Parents, and Administrators with a personalized, data-driven educational experience. Built with cutting-edge web technologies and featuring 90+ mock-implemented UI components.

> **Version**: 4.0  
> **Status**: 100% UI Complete (Mock Data) + Phase 9 Features Implemented 🎉  
> **Stack**: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui

---

## 🌟 Platform Overview

LearnWell bridges traditional Learning Management with **Code Education**, **AI-Driven Personalization**, and **Gamified Learning**, offering:

- **4 Role-Based Portals**: Student, Teacher, Parent, Admin
- **90+ Implemented Features**: All with glassmorphism UI and mock data
- **Tech Education Suite**: Code IDE, Problem Library, Contests, ELO System
- **AI Features**: Personalized roadmaps, skill gap analysis, adaptive practice
- **Social Learning**: Study groups, peer review, community forums
- **Gamification**: Dual currency (LearnCoins + Gems), achievements, teams

---

## 🚀 Core Features by Role

### 👨‍🏫 Teacher Portal

#### 📚 Core LMS Features
- **Dashboard**: Real-time class overview, pending tasks, activity feed
- **Class Management**: Rosters, attendance, seating charts, student profiles
- **Content Authoring**:
  - Question Bank with multi-format support (MCQ, Essay, Code)
  - Curriculum builder (Video, Reading, Quiz lessons)
  - Exam creation and scheduling
- **Grading Suite**:
  - Advanced gradebook with spreadsheet view
  - Rubric builder and rubric-based grading
  - Grade distribution analytics
  - Auto-grading simulation
- **Communication**: Direct messages, announcements, office hours scheduler

#### 🎯 Phase 9: Personalized Learning Tools
- **Intervention Dashboard**: Early warning system for at-risk students
- **Formative Assessment**: Quick exit tickets and real-time comprehension checks
- **Learning Path Templates**: Standardized adaptive learning paths 
- **IEP Manager**: Individualized Education Plan tracking for special needs
- **Skill Grouping**: Auto-group students by performance levels
- **Exit Tickets**: End-of-class comprehension checks with analytics

---

### 👨‍🎓 Student Portal

#### 📖 Learning Experience
- **Dashboard**: Personalized upcoming assignments, announcements, progress
- **Assignments**: Submission flow with drag-drop upload, rich text editor
- **Materials**: Access to courses, videos, reading, audio lessons, mind maps
- **Study Tools**: 
  - Flashcard system
  - Interactive note-taking
  - Study guide generator (Mock AI)
  - Study planner calendar

#### 💻 Tech Education (CodeLearn-Inspired)
- **Code Playground**: Monaco-based multi-language IDE (Python, C++, Java, JS)
- **Problem Library**: 100+ coding problems with difficulty filtering
- **Contests**: 
  - Contest arena with live leaderboard
  - Quick Match (1v1 PvP)
  - Team Battle (relay mode)
  - Bot Arena (AI opponents)
- **Coding Profile**: GitHub-style heatmap, language breakdown, skill radar
- **Peer Review**: Code feedback system with reputation rewards

#### 🤖 AI & Personalization
- **AI Tutor Panel**: Context-aware chat with progressive hints
- **Personalized Roadmap**: AI-generated learning path based on skill gaps
- **Adaptive Practice**: Smart difficulty adjustment based on performance
- **Skill Gap Analysis**: Heatmap visualization of weak areas
- **Learning Autonomy**: Time tracking, SMART goal wizard, focus analytics
- **Artifact Repository**: Multimedia portfolio of project work

#### 🎮 Gamification
- **LearnCoin Shop**: Dual currency system (LearnCoins + Gems)
  - Themes, power-ups, real-world rewards
  - Exchange rate: 100 LC = 1 Gem
- **Team System**: Create/join teams, team leaderboard, team battles
- **Achievements**: Badge system with unlockable tiers
- **ELO Leaderboard**: Universal ranking system across all activities
- **Study Buddies**: Match with peers based on interests and skills

#### 🌐 Social Features
- **Forum**: Community Q&A with tag filtering, reputation system, accepted answers
- **Social Feed**: Friend activity stream with likes, shares, achievements
- **Study Groups**: Create/join groups with shared goals and resources
- **Code Gallery**: Showcase and discover featured code solutions

---

### 👪 Parent Portal

#### 📊 Progress Tracking
- **Dashboard**: Multi-child overview with performance trends
- **Child Progress**: Detailed academic tracking per subject
- **Parent Report**: High-fidelity weekly/monthly summaries with AI insights
- **Attendance Tracker**: Calendar-based attendance visualization

#### 📚 Engagement Tools (Phase 9)
- **Curriculum Portal**: Understand learning paths and help at home
- **Home Activities**: Library of parent-led learning activities
- **Portfolio Builder**: Create professional portfolios for scholarships/applications
- **Communication Hub**: Multi-channel communication log with teachers

#### 💬 Communication
- **Teacher Contact**: Direct messaging with teachers
- **Schedule**: View child's timetable and upcoming events
- **Notifications**: Real-time alerts for grades, absences, assignments

---

### 🛠 Admin Portal

#### 🎛️ System Management
- **Dashboard**: System-wide statistics, growth trends, alerts
- **System Health**: Server metrics, error tracking, uptime monitoring
- **User Directory**: Manage all users (students, teachers, admins)
- **Teacher Management**: Workload analytics, subject assignments
- **Class Management**: Oversight of all classes and enrollments

#### 📈 Phase 9: Advanced Analytics
- **Admin Analytics**: Deep behavior analytics and learning effectiveness
- **Resource Optimization**: Data-driven resource allocation
- **Cohort Tracking**: Long-term performance analysis across school years
- **Feature Management**: Role-based access control for 90+ features

#### 🗂️ Operations
- **Timetable Builder**: Interactive drag-drop schedule creator
- **Enrollment Manager**: Class size management, waitlist handling
- **Bulk Operations**: Mass user imports, role changes, notifications

---

## 💻 Technology Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) (Accessible component library)  
  - Custom glassmorphism design system
  - [Lucide React](https://lucide.dev/) (1000+ icons)
- **State Management**: 
  - [React Query](https://tanstack.com/query/latest) (Server state)
  - React Context (Global state: Role, Features, Notifications)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Visualization**: [Recharts](https://recharts.org/) (Charts, heatmaps)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Page transitions, micro-interactions)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Validation)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VSCode engine)
- **Rich Text**: [TipTap](https://tiptap.dev/) (WYSIWYG editor)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)

### Developer Experience
- **Linting**: ESLint with TypeScript rules
- **Type Safety**: Strict TypeScript configuration
- **Hot Reload**: Vite HMR for instant updates
- **Component Development**: Shadcn CLI for rapid prototyping

---

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── layout/          # AppLayout, AppSidebar, AppHeader
│   └── dashboard/       # Dashboard-specific widgets
├── contexts/            # React Contexts
│   ├── RoleContext.tsx      # User role management
│   ├── FeatureFlagContext.tsx  # Feature access control
│   └── NotificationContext.tsx  # Real-time notifications
├── hooks/               # Custom React hooks
│   └── useFeatureAccess.ts  # Check feature permissions
├── lib/                 # Utilities and helpers
│   └── utils.ts         # Tailwind merge, classnames
├── pages/               # Application routes (90+ components)
│   ├── admin/           # Admin pages (15 components)
│   ├── authoring/       # Content creation (8 components)
│   ├── code/            # Programming features (12 components)
│   ├── contests/        # Contest system (8 components)
│   ├── gamification/    # Shop, teams, achievements (6 components)
│   ├── parent/          # Parent pages (11 components)
│   ├── projects/        # Interest-driven projects (4 components)
│   ├── social/          # Community features (6 components)
│   ├── student/         # Student pages (20 components)
│   └── teacher/         # Teacher pages (18 components)
├── types/               # TypeScript definitions
│   └── features.ts      # Feature flag types
└── utils/
    └── featureRegistry.ts  # Central feature configuration (74 routes)
```

---

## 🛠️ Installation & Development

### Prerequisites
- **Node.js**: v18+ (Recommended: Use `nvm`)
- **Package Manager**: npm or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd learnwell
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```
   Application available at `http://localhost:8080`

4. **Build for production**
   ```bash
   npm run build
   ```

### Development Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Check code quality
npx tsc --noEmit    # TypeScript type check
```

---

## 📋 Implementation Status

### ✅ Fully Implemented (UI Complete with Mock Data)

**LMS Core (40+ components)**:
- All dashboards (Admin, Teacher, Student, Parent)
- Class & user management
- Grading suite (Gradebook, Rubric Builder, Grade Analytics)
- Content authoring (Question Bank, Curriculum, Exams)
- Assignment workflow (Submission, Review, Feedback)
- Communication suite (DMs, Announcements, Office Hours)

**Tech Education (20+ components)**:
- Code IDE with multi-language support
- Problem Library (100+ problems)
- Contest system (List, Arena, Leaderboard)
- Competitive features (Quick Match, Team Battle, Bot Arena)
- Coding profile with analytics
- Peer review system

**AI & Personalization (15+ components)**:
- AI Tutor with progressive hints
- Personalized roadmap generator
- Skill gap analysis dashboard
- Adaptive practice engine
- Learning autonomy tools
- Intervention dashboard (teachers)

**Gamification & Social (15+ components)**:
- Dual currency shop (LearnCoins + Gems)
- Team system with battles
- Achievement badges
- ELO leaderboard
- Forum with reputation
- Study groups
- Social feed

**Phase 9: Personalized Learning at Scale (19 components)** ⭐ NEW
- Student: Learning Autonomy, Artifact Repo, Audio Lessons, Mind Maps, Micro-Credentials, Study Buddies
- Teacher: Intervention Dashboard, Formative Assessment, Exit Tickets, Learning Path Templates, IEP Manager, Skill Grouping
- Parent: Curriculum Portal, Communication Hub, Home Activities
- Admin: Admin Analytics, Resource Optimization, Cohort Tracking
- Shared: Rich Materials (Interactive Video, Podcasts, Virtual Labs)

### 🔵 Backend Integration Required

All features currently use **mock data**. To go production:
- **Database**: Supabase / PostgreSQL for data persistence
- **Authentication**: Role-based auth with JWT
- **File Storage**: S3-compatible for uploads (assignments, avatars, artifacts)
- **Real-time**: WebSocket/Supabase Realtime for live updates
- **AI Services**: OpenAI API for tutor, recommendations, roadmap generation
- **Code Execution**: Sandboxed code runner (Judge0, Piston API)
- **Analytics**: Mixpanel / Google Analytics for behavior tracking

### 🔴 Planned Enhancements (Wishlist)

- **Mobile App**: React Native version
- **Offline Mode**: PWA with service workers
- **Video Conferencing**: Integrated Zoom/Meet for virtual classrooms
- **Advanced Analytics**: Predictive modeling for student outcomes
- **Content Marketplace**: Share/sell course content
- **Parent App**: Dedicated mobile experience for parents

---

## 🎨 Design System

LearnWell uses a custom **glassmorphism** design system:

- **Color Palette**: Fresh green primary (#38B56F), coral accent (#FF8066)
- **Light Mode**: Clean white backgrounds with subtle shadows
- **Dark Mode**: Deep navy (#0F172A) with elevated cards
- **Typography**: Plus Jakarta Sans (clean, modern, highly legible)
- **Components**: 40+ accessible shadcn/ui components with custom theming
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **Responsive**: Mobile-first design (breakpoints: sm, md, lg, xl, 2xl)

---

## 📄 Documentation

- **[FEATURES.md](./FEATURES.md)**: Comprehensive feature documentation (v3.4, 1500+ lines)
- **[FEATURES2.md](./FEATURES2.md)**: Phase 9 detailed specifications (v4.0, 2300+ lines)
- **Feature Audit**: [Comprehensive audit report](/.gemini/antigravity/brain/2dc83b99-a34f-43fa-9993-196080460047/comprehensive_feature_audit.md)

---

## 🤝 Contributing

This is a prototype/demo project showcasing modern LMS capabilities. Contributions welcome for:
- Backend integration
- Additional features from FEATURES2.md
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness enhancements

---

## 📜 License

Apache License 2.0

Copyright (c) 2026 LearnWell

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

```text
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

> **Attribution required**: Any distribution or derivative work must include
> a prominent notice crediting **LearnWell** as the original source, along with
> a copy of this license.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful, accessible component library
- **CodeLearn** for inspiration on competitive programming features
- **Plus Jakarta Sans** font by Tokotype
- **Lucide** for the comprehensive icon set

---

**Built with ❤️ for modern education**
