import { motion } from "framer-motion";
import achievements from "@/data/achievements.json";

const AchievementsSection = () => {
  const leetcode = achievements.leetcode;
  const unstop = achievements.unstop;

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* LeetCode Card */}
          <motion.a
            href={leetcode.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-6 card-hover col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💻</span>
              <h3 className="text-xl font-semibold">LeetCode</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Contest Rating</span>
                <span className="stat-highlight text-lg">{leetcode.contestRating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Problems Solved</span>
                <span className="stat-highlight text-lg">{leetcode.problemsSolved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Max Streak</span>
                <span className="text-foreground">{leetcode.maxStreak} days</span>
              </div>
              
              {/* Breakdown */}
              <div className="pt-3 border-t border-border">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <span className="text-green-400 font-medium">{leetcode.breakdown.easy.solved}</span>
                    <span className="text-muted-foreground"> Easy</span>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">{leetcode.breakdown.medium.solved}</span>
                    <span className="text-muted-foreground"> Med</span>
                  </div>
                  <div>
                    <span className="text-red-400 font-medium">{leetcode.breakdown.hard.solved}</span>
                    <span className="text-muted-foreground"> Hard</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Unstop Card */}
          <motion.a
            href={unstop.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎓</span>
              <h3 className="text-xl font-semibold">Unstop</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Global Rank</span>
                <span className="stat-highlight text-lg">#{unstop.globalRank.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Points</span>
                <span className="text-foreground">{unstop.totalPoints.toLocaleString()}+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Competitions</span>
                <span className="text-foreground">{unstop.competitions}+ participated</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Courses</span>
                <span className="text-foreground">{unstop.coursesCompleted} completed</span>
              </div>
            </div>
          </motion.a>

          {/* Coding Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📊</span>
              <h3 className="text-xl font-semibold">Coding Stats</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lines Written</span>
                <span className="stat-highlight text-lg">{achievements.coding.totalLinesWritten}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Daily Coding</span>
                <span className="text-foreground">{achievements.coding.averageDailyCoding}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Consistency</span>
                <span className="text-foreground">{achievements.coding.consistencyScore}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">YoY Growth</span>
                <span className="text-primary">{achievements.coding.yearOverYearGrowth}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
