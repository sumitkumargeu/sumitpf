import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactCardProps {
  id: string;
  name: string;
  icon: string;
  url: string;
  username: string;
  description?: string;
  responseTime?: string;
  stats?: {
    connections?: string;
    repos?: string;
    commits?: string;
    languages?: string[];
  };
  index: number;
}

const ContactCard = ({
  name,
  icon,
  url,
  username,
  description,
  responseTime,
  stats,
  index,
}: ContactCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const hasDetails = description || responseTime || stats;

  const handleTouchStart = useCallback(() => {
    setIsTouching(true);
    setIsExpanded(true);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Prevent navigation on first touch, only expand
    if (!isExpanded) {
      e.preventDefault();
    }
    // Keep expanded briefly after touch ends
    setTimeout(() => {
      setIsTouching(false);
    }, 2000);
  }, [isExpanded]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // On mobile, first touch expands, second touch navigates
    if (isTouching && !isExpanded) {
      e.preventDefault();
    }
  }, [isTouching, isExpanded]);

  return (
    <motion.a
      href={url}
      target={url.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => !isTouching && setIsExpanded(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className="glass-card rounded-xl p-5 card-hover group block"
    >
      <div className="text-center">
        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          @{username.split("@")[0]}
        </p>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && hasDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-3"
          >
            <div className="pt-3 border-t border-border space-y-2 text-center">
              {description && (
                <p className="text-xs text-foreground/80">{description}</p>
              )}
              
              {responseTime && (
                <p className="text-xs text-primary">
                  Response: {responseTime}
                </p>
              )}
              
              {stats && (
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  {stats.connections && (
                    <span className="px-2 py-0.5 bg-secondary rounded-full">
                      {stats.connections} connections
                    </span>
                  )}
                  {stats.repos && (
                    <span className="px-2 py-0.5 bg-secondary rounded-full">
                      {stats.repos} repos
                    </span>
                  )}
                  {stats.commits && (
                    <span className="px-2 py-0.5 bg-secondary rounded-full">
                      {stats.commits} commits
                    </span>
                  )}
                </div>
              )}
              
              {stats?.languages && stats.languages.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1">
                  {stats.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default ContactCard;
