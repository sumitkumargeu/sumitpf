import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import skills from "@/data/skills.json";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    experience: string;
    proficiency: string;
    proficiencyLevel: number;
    projects?: string[];
    specialties?: string[];
    stats?: { commits?: string; repositories?: string; productionApps?: number };
  };
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
    setIsExpanded(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouching(false);
      setIsExpanded(false);
    }, 3000);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => !isTouching && setIsExpanded(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="glass-card rounded-xl p-5 text-center card-hover group cursor-pointer"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
        {skill.icon}
      </div>
      <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{skill.name}</h4>
      <p className="text-xs text-muted-foreground">{skill.experience}</p>
      
      {/* Proficiency bar */}
      <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiencyLevel * 10}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      <p className="text-xs text-primary mt-1">{skill.proficiency}</p>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (skill.specialties || skill.projects || skill.stats) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-left"
          >
            {skill.specialties && skill.specialties.length > 0 && (
              <div className="pt-3 mt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-1">
                  {skill.specialties.slice(0, 4).map((specialty, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {skill.projects && skill.projects.length > 0 && (
              <div className="pt-3 mt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Used in:</p>
                <ul className="text-xs space-y-1">
                  {skill.projects.slice(0, 3).map((project, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skill.stats && (
              <div className="pt-3 mt-3 border-t border-border flex flex-wrap gap-2 justify-center">
                {skill.stats.commits && (
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {skill.stats.commits} commits
                  </span>
                )}
                {skill.stats.repositories && (
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {skill.stats.repositories} repos
                  </span>
                )}
                {skill.stats.productionApps && (
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {skill.stats.productionApps} prod apps
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <section id="skills" className="py-20 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Tech Stack</h2>
          </motion.div>

          {/* Top Skills */}
          <div className="mb-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-6 flex items-center gap-2">
              <span>⭐</span> Core Technologies
            </h3>
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {skills.topSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Familiar With & Exploring */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <span>🔧</span> Familiar With
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.familiarWith.map((skill) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-2 card-hover cursor-help">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Working knowledge of {skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
                <span>🎯</span> Exploring
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.exploring.map((skill) => (
                  <Tooltip key={skill.name}>
                    <TooltipTrigger asChild>
                      <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-2 card-hover border border-primary/20 cursor-help">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Currently learning {skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default SkillsSection;
