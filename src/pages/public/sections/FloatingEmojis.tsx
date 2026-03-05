import { motion } from "framer-motion";
import {
  GraduationCap, Code, Trophy, BookOpen, Rocket,
  Gamepad2, Brain, Target, Palette, Lightbulb,
  Star, Sparkles, PenTool, Microscope
} from "lucide-react";
import { ElementType } from "react";

interface FloatingCard {
  icon: ElementType;
  x: string;
  y: string;
  size: number;
  iconSize: number;
  delay: number;
  duration: number;
  rotate?: number;
  color: string;
}

const floatingCards: FloatingCard[] = [
  { icon: Rocket, x: "4%", y: "3%", size: 96, iconSize: 40, delay: 0, duration: 6, rotate: 12, color: "text-primary" },
  { icon: Target, x: "85%", y: "6%", size: 80, iconSize: 32, delay: 1.2, duration: 5, rotate: -5, color: "text-accent" },
  { icon: GraduationCap, x: "10%", y: "18%", size: 110, iconSize: 48, delay: 0.5, duration: 7, rotate: -8, color: "text-success" },
  { icon: Code, x: "88%", y: "22%", size: 110, iconSize: 48, delay: 2, duration: 6, rotate: 10, color: "text-accent" },

  { icon: BookOpen, x: "3%", y: "35%", size: 80, iconSize: 32, delay: 1, duration: 6.5, rotate: 5, color: "text-info" },
  { icon: Star, x: "92%", y: "32%", size: 72, iconSize: 28, delay: 0.8, duration: 5.5, color: "text-warning" },
  { icon: Trophy, x: "15%", y: "48%", size: 96, iconSize: 40, delay: 1.5, duration: 7, rotate: -6, color: "text-warning" },
  { icon: Brain, x: "83%", y: "45%", size: 88, iconSize: 36, delay: 0.3, duration: 6, rotate: 8, color: "text-primary" },

  { icon: Gamepad2, x: "5%", y: "62%", size: 88, iconSize: 36, delay: 2.5, duration: 5.5, rotate: -12, color: "text-info" },
  { icon: Sparkles, x: "90%", y: "58%", size: 72, iconSize: 28, delay: 1.8, duration: 6, color: "text-primary" },
  { icon: Palette, x: "12%", y: "76%", size: 80, iconSize: 32, delay: 0.7, duration: 7, rotate: 6, color: "text-accent" },
  { icon: Lightbulb, x: "86%", y: "72%", size: 96, iconSize: 40, delay: 2.2, duration: 5, rotate: -8, color: "text-warning" },

  { icon: PenTool, x: "8%", y: "88%", size: 72, iconSize: 28, delay: 3, duration: 6, color: "text-info" },
  { icon: Microscope, x: "80%", y: "85%", size: 80, iconSize: 32, delay: 1.3, duration: 5.5, rotate: 10, color: "text-success" },
];

export const FloatingEmojis = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {floatingCards.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -14, 0, 10, 0],
              x: [0, 5, 0, -4, 0],
              rotate: [item.rotate ?? 0, (item.rotate ?? 0) + 6, item.rotate ?? 0, (item.rotate ?? 0) - 5, item.rotate ?? 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <div
              className="rounded-3xl border border-border/40 bg-card/70 backdrop-blur-sm flex items-center justify-center shadow-lg"
              style={{
                width: item.size,
                height: item.size,
                opacity: 0.35,
              }}
            >
              <Icon className={`${item.color}`} style={{ width: item.iconSize, height: item.iconSize, opacity: 0.6 }} />
            </div>
          </motion.div>
        );
      })}

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
