import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import statsData from "@/data/stats.json";

const StatsSection = () => {
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = useCallback((statId: string) => {
    setIsTouching(true);
    setExpandedStat(statId);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouching(false);
      setExpandedStat(null);
    }, 2000);
  }, []);

  // Sort stats by priority
  const sortedStats = [...statsData.stats].sort((a, b) => a.priority - b.priority);

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {sortedStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setExpandedStat(stat.id)}
              onHoverEnd={() => !isTouching && setExpandedStat(null)}
              onTouchStart={() => handleTouchStart(stat.id)}
              onTouchEnd={handleTouchEnd}
              className={`glass-card rounded-2xl p-6 text-center card-hover cursor-pointer transition-all duration-300 ${
                expandedStat === stat.id ? "z-20 scale-[1.02]" : "z-0"
              }`}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold stat-highlight mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground/70 mt-1">
                {stat.subtext}
              </div>

              {/* Expanded Preview */}
              <AnimatePresence>
                {expandedStat === stat.id && stat.preview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border pt-3 mt-3 text-left">
                      <h4 className="text-sm font-semibold mb-2 text-primary">
                        {stat.preview.title}
                      </h4>
                      
                      {stat.preview.details && (
                        <ul className="space-y-1.5">
                          {stat.preview.details.map((detail, i) => (
                            <li key={i} className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{detail.label}</span>
                              <span className="font-medium">{detail.value}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {stat.preview.breakdown && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-500">Easy</span>
                            <span>{stat.preview.breakdown.easy.solved}/{stat.preview.breakdown.easy.total}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-yellow-500">Medium</span>
                            <span>{stat.preview.breakdown.medium.solved}/{stat.preview.breakdown.medium.total}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-red-500">Hard</span>
                            <span>{stat.preview.breakdown.hard.solved}/{stat.preview.breakdown.hard.total}</span>
                          </div>
                        </div>
                      )}

                      {stat.preview.link && (
                        <a
                          href={stat.preview.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-primary mt-3 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Profile <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
