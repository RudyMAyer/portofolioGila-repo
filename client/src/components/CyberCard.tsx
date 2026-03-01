import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "cyan" | "pink";
}

export function CyberCard({ children, className, delay = 0, variant = "cyan" }: CyberCardProps) {
  const borderColors = {
    cyan: "border-primary/50 hover:border-primary box-glow-cyan hover:box-glow-cyan-strong",
    pink: "border-secondary/50 hover:border-secondary box-glow-pink hover:shadow-[0_0_15px_hsl(var(--secondary)/0.4)]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "relative bg-card/80 backdrop-blur-sm border p-6 transition-all duration-300",
        "cyber-clip-path",
        borderColors[variant],
        className
      )}
    >
      {/* Decorative corner accents */}
      <div className={cn("absolute top-0 left-0 w-2 h-2 bg-current opacity-50", variant === "cyan" ? "text-primary" : "text-secondary")} />
      <div className={cn("absolute bottom-0 right-0 w-2 h-2 bg-current opacity-50", variant === "cyan" ? "text-primary" : "text-secondary")} />
      
      {children}
    </motion.div>
  );
}
