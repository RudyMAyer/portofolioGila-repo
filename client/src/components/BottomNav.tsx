import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Terminal, Trophy, Mail, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "SYS_ROOT" },
  { id: "about", icon: User, label: "PROFILE" },
  { id: "skills", icon: Terminal, label: "SKILLS" },
  { id: "achievements", icon: Trophy, label: "AWARDS" },
  { id: "contact", icon: Mail, label: "COMMS" },
];

export function BottomNav() {
  const [activeSection, setActiveSection] = useState("home");

  // Intersection observer to update active state based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="bg-background/80 backdrop-blur-md border border-primary/30 p-2 cyber-clip-path box-glow-cyan flex items-center gap-2 sm:gap-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "relative p-3 sm:p-4 rounded-none transition-colors duration-300 group overflow-hidden",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
              )}
              // FITUR UTAMA: Bar di bawah yang naik apabila ditekan/aktif (-10px)
              animate={{ 
                y: isActive ? -10 : 0,
                scale: isActive ? 1.05 : 1
              }}
              whileHover={{ y: -5 }}
              whileTap={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label={item.label}
            >
              {/* Background glow when active */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/20 border-b-2 border-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              
              {/* Tooltip on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-background border border-primary px-2 py-1 text-[10px] font-display text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
