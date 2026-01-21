import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";

interface LinkData {
  demo?: string[];
  repo?: string[];
  certificate?: string;
  course?: string;
}

interface ExpandableCardProps {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string;
  features?: string[];
  tags?: string[];
  date?: string;
  links?: LinkData;
  index: number;
  type: "project" | "tool" | "certificate";
}

const ExpandableCard = ({
  icon,
  title,
  subtitle,
  description,
  details,
  features,
  tags,
  date,
  links,
  index,
  type,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const hasLinks = links && (
    (links.demo && links.demo.length > 0) || 
    (links.repo && links.repo.length > 0) ||
    links.certificate ||
    links.course
  );

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={() => hasLinks && setShowLinks(true)}
        className={`glass-card rounded-2xl p-6 card-hover group cursor-pointer transition-all duration-300 ${
          isExpanded ? "z-10" : "z-0"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl group-hover:scale-110 transition-transform">
            {icon}
          </span>
          {date && (
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              {date}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-sm text-primary/80 mb-2">{subtitle}</p>
        )}

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tags - Always visible */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (details || (features && features.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {details && (
                <p className="text-sm text-foreground/80 mb-3 border-t border-border pt-3">
                  {details}
                </p>
              )}
              
              {features && features.length > 0 && (
                <ul className="text-xs text-muted-foreground space-y-1 border-t border-border pt-3">
                  {features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {hasLinks && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-primary flex items-center gap-1">
                    Click to view links <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Links Modal */}
      <AnimatePresence>
        {showLinks && hasLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLinks(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    {subtitle && (
                      <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowLinks(false)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {links?.demo && links.demo.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Live Demo{links.demo.length > 1 ? "s" : ""}
                    </h4>
                    <div className="space-y-2">
                      {links.demo.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-sm group"
                        >
                          <ExternalLink className="w-4 h-4 text-primary" />
                          <span className="truncate flex-1">
                            {links.demo.length > 1 ? `Demo ${i + 1}` : "View Live Demo"}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {links?.repo && links.repo.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Source Code
                    </h4>
                    <div className="space-y-2">
                      {links.repo.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm group"
                        >
                          <Github className="w-4 h-4" />
                          <span className="truncate flex-1">
                            {links.repo!.length > 1 ? `Repository ${i + 1}` : "View Repository"}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {links?.certificate && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Certificate
                    </h4>
                    <a
                      href={links.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-sm group"
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      <span className="truncate flex-1">View Certificate</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}

                {links?.course && (
                  <a
                    href={links.course}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-sm group"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="truncate flex-1">View Course</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpandableCard;
