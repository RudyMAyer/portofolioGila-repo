import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export const CyberInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, multiline, ...props }, ref) => {
    const Component = multiline ? "textarea" : "input";
    
    return (
      <div className="relative group">
        <label className="block text-xs font-display text-primary/70 mb-1 uppercase tracking-widest group-focus-within:text-primary group-focus-within:text-glow-cyan transition-colors">
          {label}
        </label>
        {/* @ts-ignore - dynamic component ref typing is tricky but works for this specific use case */}
        <Component
          ref={ref as any}
          className={cn(
            "w-full bg-background/50 border border-primary/30 p-3 text-foreground font-sans",
            "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50",
            "transition-all duration-300 placeholder:text-muted-foreground/50",
            "cyber-clip-path-reverse",
            multiline && "min-h-[120px] resize-y",
            className
          )}
          {...props}
        />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50 group-focus-within:border-primary transition-colors" />
      </div>
    );
  }
);

CyberInput.displayName = "CyberInput";
