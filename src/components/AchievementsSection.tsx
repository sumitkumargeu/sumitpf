import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import achievements from "@/data/achievements.json";

interface AchievementCardProps {
  title: string;
  icon: string;
  url?: string;
  stats: { label: string; value: string | number; highlight?: boolean }[];
  extraContent?: React.ReactNode;
  index: number;
}

const AchievementCard = ({ title, icon, url, stats, extraContent, index }: AchievementCardProps) => {
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

  const CardWrapper = url ? motion.a : motion.div;
  const cardProps = url ? {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  } : {};

  return (
    <CardWrapper
      {...cardProps}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => !isTouching && setIsExpanded(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="glass-card rounded-2xl p-6 card-hover group cursor-pointer block"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h3>
        {url && <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
      </div>
      
      <div className="space-y-3">
        {stats.slice(0, isExpanded ? stats.length : 3).map((stat, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">{stat.label}</span>
            <span className={stat.highlight ? "stat-highlight text-lg" : "text-foreground"}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && extraContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {extraContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      {url && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <p className="text-xs text-primary flex items-center gap-1">
                {isTouching ? "Tap" : "Click"} to view profile <ExternalLink className="w-3 h-3" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </CardWrapper>
  );
};

const AchievementsSection = () => {
  const leetcode = achievements.leetcode;
  const unstop = achievements.unstop;

  const leetcodeStats = [
    { label: "Contest Rating", value: leetcode.contestRating, highlight: true },
    { label: "Problems Solved", value: leetcode.problemsSolved, highlight: true },
    { label: "Max Streak", value: `${leetcode.maxStreak} days` },
    { label: "Active Days", value: leetcode.activeDays },
    { label: "Main Language", value: leetcode.mainLanguage },
    { label: "Global Rank", value: `#${leetcode.globalRank.toLocaleString()}` },
  ];

  const unstopStats = [
    { label: "Global Rank", value: `#${unstop.globalRank.toLocaleString()}`, highlight: true },
    { label: "Total Points", value: `${unstop.totalPoints.toLocaleString()}+` },
    { label: "Competitions", value: `${unstop.competitions}+ participated` },
    { label: "Courses Completed", value: unstop.coursesCompleted },
    { label: "Skill Assessments", value: unstop.skillAssessments },
    { label: "Average Score", value: unstop.averageScore },
  ];

  const codingStats = [
    { label: "Lines Written", value: achievements.coding.totalLinesWritten, highlight: true },
    { label: "Daily Coding", value: achievements.coding.averageDailyCoding },
    { label: "Consistency", value: achievements.coding.consistencyScore },
    { label: "YoY Growth", value: achievements.coding.yearOverYearGrowth },
  ];

  const LeetCodeExtra = (
    <div className="pt-3 border-t border-border mt-3">
      <p className="text-xs text-muted-foreground mb-2">Problem Breakdown:</p>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-green-500/10 rounded-lg p-2">
          <span className="text-green-400 font-medium">{leetcode.breakdown.easy.solved}</span>
          <span className="text-muted-foreground text-xs block">Easy</span>
        </div>
        <div className="bg-yellow-500/10 rounded-lg p-2">
          <span className="text-yellow-400 font-medium">{leetcode.breakdown.medium.solved}</span>
          <span className="text-muted-foreground text-xs block">Medium</span>
        </div>
        <div className="bg-red-500/10 rounded-lg p-2">
          <span className="text-red-400 font-medium">{leetcode.breakdown.hard.solved}</span>
          <span className="text-muted-foreground text-xs block">Hard</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Achievements & Stats</h2>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AchievementCard
            title="LeetCode"
            icon="💻"
            url={leetcode.profileUrl}
            stats={leetcodeStats}
            extraContent={LeetCodeExtra}
            index={0}
          />

          <AchievementCard
            title="Unstop"
            icon="🎓"
            url={unstop.profileUrl}
            stats={unstopStats}
            index={1}
          />

          <AchievementCard
            title="Coding Stats"
            icon="📊"
            stats={codingStats}
            index={2}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
