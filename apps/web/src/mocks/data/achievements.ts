import { 
  Trophy, 
  Star, 
  Award, 
  Zap, 
  Target, 
  Flame, 
  Code, 
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  Lock
} from "lucide-react";

export const badges = [
  { 
    id: 1, 
    name: "achievements:badges.codeWarrior.name", 
    description: "achievements:badges.codeWarrior.description", 
    icon: Code, 
    earned: true, 
    date: "2024-01-15",
    rarity: "achievements:rarities.common"
  },
  { 
    id: 2, 
    name: "achievements:badges.quickLearner.name", 
    description: "achievements:badges.quickLearner.description", 
    icon: Zap, 
    earned: true, 
    date: "2024-01-10",
    rarity: "achievements:rarities.rare"
  },
  { 
    id: 3, 
    name: "achievements:badges.perfectScore.name", 
    description: "achievements:badges.perfectScore.description", 
    icon: Target, 
    earned: true, 
    date: "2024-01-08",
    rarity: "achievements:rarities.rare"
  },
  { 
    id: 4, 
    name: "achievements:badges.streakMaster.name", 
    description: "achievements:badges.streakMaster.description", 
    icon: Flame, 
    earned: false, 
    progress: 22,
    rarity: "achievements:rarities.legendary"
  },
  { 
    id: 5, 
    name: "achievements:badges.teamPlayer.name", 
    description: "achievements:badges.teamPlayer.description", 
    icon: Users, 
    earned: false, 
    progress: 7,
    rarity: "achievements:rarities.epic"
  },
  { 
    id: 6, 
    name: "achievements:badges.nightOwl.name", 
    description: "achievements:badges.nightOwl.description", 
    icon: Clock, 
    earned: false, 
    progress: 5,
    rarity: "achievements:rarities.common"
  },
];

export const achievements = [
  { 
    id: 1, 
    title: "achievements:items.jsChampion.title", 
    description: "achievements:items.jsChampion.description", 
    xp: 500, 
    completed: true,
    category: "achievements:categories.programming"
  },
  { 
    id: 2, 
    title: "achievements:items.reactMaster.title", 
    description: "achievements:items.reactMaster.description", 
    xp: 750, 
    completed: true,
    category: "achievements:categories.framework"
  },
  { 
    id: 3, 
    title: "achievements:items.debuggerPro.title", 
    description: "achievements:items.debuggerPro.description", 
    xp: 300, 
    completed: false,
    progress: 68,
    category: "achievements:categories.skill"
  },
  { 
    id: 4, 
    title: "achievements:items.cleanCoder.title", 
    description: "achievements:items.cleanCoder.description", 
    xp: 400, 
    completed: false,
    progress: 45,
    category: "achievements:categories.bestPractice"
  },
];

export const leaderboard = [
  { rank: 1, name: "leaderboard:mockup.players.duc", points: 4520, avatar: "duc" },
  { rank: 2, name: "leaderboard:mockup.players.huong", points: 4380, avatar: "huong" },
  { rank: 3, name: "leaderboard:mockup.players.a", points: 4250, avatar: "student", isCurrentUser: true },
  { rank: 4, name: "leaderboard:mockup.players.nam", points: 4100, avatar: "nam" },
  { rank: 5, name: "leaderboard:mockup.players.mai", points: 3980, avatar: "mai" },
];
