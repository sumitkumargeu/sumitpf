import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aboutData from "@/data/about.json";
import sumitAvatar from "@/assets/sumit.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HeroSection = () => {
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((tagId: string) => {
    setIsTouching(true);
    setExpandedTag(tagId);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouching(false);
      setExpandedTag(null);
    }, 2000);
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 animate-pulse-glow">
                <img
                  src={sumitAvatar}
                  alt="Sumit Kumar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl shadow-lg">
                💻
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left max-w-xl"
            >
              <p className="text-primary font-medium mb-3 text-lg">
                Hi there <span className="wave-emoji">👋</span>
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                I'm <span className="gradient-text">Sumit Kumar</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
                Software Engineer & Data Analyst
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Passionate about building innovative solutions that bridge the gap between technology and real-world problems. Specializing in AI, IoT, and data-driven development with a focus on creating impactful systems.
              </p>

              {/* Dynamic Tags with Hover Tooltips */}
              <motion.div 
                layout
                className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                {aboutData.tags.map((tag) => (
                  <Tooltip key={tag.id}>
                    <TooltipTrigger asChild>
                      <motion.span
                        layout
                        className="skill-badge cursor-help"
                        onHoverStart={() => setExpandedTag(tag.id)}
                        onHoverEnd={() => !isTouching && setExpandedTag(null)}
                        onTouchStart={() => handleTouchStart(tag.id)}
                        onTouchEnd={handleTouchEnd}
                      >
                        {tag.icon} {tag.label}
                      </motion.span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs p-3">
                      <p className="text-sm">{tag.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 border border-primary/50 text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors text-center"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default HeroSection;
