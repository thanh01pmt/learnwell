import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "dots" | "gradient";
}

export const SectionDivider = ({ variant = "dots" }: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className="relative h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
            fill="hsl(var(--muted))"
            opacity="0.3"
          />
          <path
            d="M0,40 C300,10 500,50 700,30 C900,10 1100,50 1200,40 L1200,60 L0,60 Z"
            fill="hsl(var(--muted))"
            opacity="0.15"
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="flex items-center justify-center py-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px w-1/2 max-w-md bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    );
  }

  // dots variant
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className={`rounded-full bg-primary/30 ${i === 2 ? "h-2.5 w-2.5" : "h-1.5 w-1.5"}`}
        />
      ))}
    </div>
  );
};
