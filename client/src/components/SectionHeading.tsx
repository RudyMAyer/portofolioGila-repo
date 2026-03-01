import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({ title, subtitle, align = "left", className }: SectionHeadingProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("mb-12 relative", 
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      <h2 className="text-3xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-widest animate-glitch inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground font-sans mt-2 text-sm md:text-base tracking-widest uppercase flex items-center gap-2 justify-start">
          <span className="w-8 h-[1px] bg-primary/50 block"></span>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
