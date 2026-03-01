import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary/10 text-primary border-primary hover:bg-primary/20 hover:text-primary hover:box-glow-cyan-strong",
      secondary: "bg-secondary/10 text-secondary border-secondary hover:bg-secondary/20 hover:text-secondary hover:box-glow-pink",
      outline: "bg-transparent text-foreground border-muted-foreground hover:border-primary hover:text-primary"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative px-8 py-3 border cyber-clip-path font-display font-bold tracking-widest uppercase transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              PROCESSING...
            </>
          ) : (
            children
          )}
        </span>
      </motion.button>
    );
  }
);

CyberButton.displayName = "CyberButton";
